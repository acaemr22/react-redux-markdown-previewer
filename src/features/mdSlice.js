import { createSlice } from "@reduxjs/toolkit";

const mdSlice = createSlice({
  name: "md",
  initialState: {
    fullEditor: false,
    fullPreviewer: false,
    text: `# H1
## H2
[title](https://www.google.com)
![image](vite.svg)
\`console.log("")\`
\`\`\`
console.log()
\`\`\`
- First item
> blockquote
**bold text**
`,
  },
  reducers: {
    toggleFullEditor: (state, action) => {
      state.fullEditor = !state.fullEditor;
    },
    toggleFullPreviewer: (state, action) => {
      state.fullPreviewer = !state.fullPreviewer;
    },
    changeText: (state, action) => {
      state.text = action.payload.text;
    },
  },
});

export default mdSlice.reducer;
export const { toggleFullEditor, toggleFullPreviewer, changeText } =
  mdSlice.actions;
