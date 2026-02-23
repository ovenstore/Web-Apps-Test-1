Vue.createApp({
    data() {
        return {
            stickies: [],
            storageKey: "sticky-notes-simple"
        };
    },

    mounted() {
        // ================================
        // COMMIT 2 — Render Notes ONLY
        // ================================
        //
        // For Commit 2:
        // - DO NOT use localStorage yet.
        // - Temporarily hard-code TWO example notes here
        //   so that rendering, v-for, v-model and the
        //   character counter can be tested.
        //
        // Example structure:

        // this.stickies = [
        //   { id: 1, text: "Test note 1" },
        //   { id: 2, text: "Another note" }
        // ];

        // In Commit 3:
        // - REMOVE these hard-coded notes.
        // - DO NOT keep them in the final version.
        //
        // In Commit 4:
        // - Replace this with a call to loadFromStorage().

        this.stickies = loadFromStorage();
    },

    methods: {

        // ================================
        // COMMIT 3 — Add & Delete
        // ================================

        addStickie() {
            // TODO (Commit 3):
            // Add a new object to this.stickies
            //
            // Required structure:
            // { id: ..., text: "" }
            //
            // For id:
            // - Use crypto.randomUUID() if available
            // - Otherwise use a fallback (Date.now() + Math.random())

            this.stickies.push({
                id: (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") ? crypto.randomUUID() : Date.now() + Math.random(), 
                text: ""
            });
        },

        deleteStickie(id) {
            // TODO (Commit 3):
            // Remove the note that matches the provided id.
            //
            // Use Array.filter()
            // Reassign the result back to this.stickies

            this.stickies = this.stickies.filter(sticky => sticky.id != id);
        },

        // ================================
        // COMMIT 5 — Clear All
        // ================================

        clearAll() {
            // TODO (Commit 5):
            // 1. Use confirm("Delete all notes?")
            // 2. If confirmed:
            //    - Clear the stickies array
            //    - Remove the localStorage item using this.storageKey

            if (confirm("Clear all notes?")) {
                localStorage.clear();
                location.reload();
            };
        },

        // ================================
        // Helper — Character Count
        // ================================

        charCount(text) {
            // This is already complete.
            // Returns the length of the text or 0 if empty.
            return (text ?? "").length;
        },

        // ================================
        // COMMIT 4 — Persistence
        // ================================

        saveToStorage() {
            // TODO (Commit 4):
            // Save this.stickies to localStorage.
            //
            // Must use:
            // JSON.stringify(...)

            localStorage.setItem("sticky-notes-simple", JSON.stringify(this.stickies));
        },

        loadFromStorage() {
            // TODO (Commit 4):
            // Load notes from localStorage.
            //
            // Must:
            // - Use JSON.parse(...)
            // - If nothing exists, set this.stickies = []
            //
            // In Commit 4:
            // - Call this method from mounted().
            // - Remove hard-coded notes from Commit 2.

            const notes = localStorage.loadFromStorage(JSON.parse("sticky-notes-simple"));

            if (notes) {
                return notes;
            } else {
                return [];
            };
        }
    },

    watch: {
        stickies: {
            handler() {
                // TODO (Commit 4):
                // Call this.saveToStorage() here so edits
                // auto-save without clicking any button.

                this.saveToStorage();
            },
            deep: true
        }
    }
}).mount("#app");