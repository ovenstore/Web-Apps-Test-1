## Q1
The v-model of `<textarea>` links the input field to the stickies.text data property, so that the stickies.text changes when the input changes. Vue's reactivity detects the change and updates the stickies.text property automatically. 

## Q2
`deep: true` means that Vue watches for changes in the properties of the stickes elements, not the whole stickies objects themselves. That way, we detect changes in stickies.text. Without `deep: true`, we would not detect changes in stickies.text and the notes would not be saved to localStorage when the text changes. 

## Q3
Local storage can only store strings, so we use `JSON.stringify()` to convert JSON to strings in a consistent format that can be parsed upon retrieval. If we forgot to use `JSON.parse()`, then we would retrieve strings and our stickies would not display because they rely on being stored with an `id` and `text` value. 

## Q4
- `.filter()` returns an array of elements from an original array which meet a certain condition. 
- We have to assign this back to `this.stickies` because `.filter()` does not modify the array it is called on, it only returns an array. 
- We use `!==` because `.filter()` only returns the items in an array which meet the condition, and if we want to remove one element from the array based on a specified `id`, then we only want to keep the elements which don't have the specified `id`. If we used `===`, then we would get an array with a single element which has the same ID as the specified `id`. 

## Q5 
This is done so that we can call `saveToStorage()` from other places and don't need to rewrite the `localStorage.setItem(...)` call. This may not affect our current code, but having better modularity can help in the future in case we want to add a `save` button or something similar. 