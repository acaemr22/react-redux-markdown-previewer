import mdReducer from "./mdSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        md: mdReducer
    }
})