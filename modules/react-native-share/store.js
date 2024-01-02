import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "share",
  initialState: {
    count: 0
  },
  reducers: {
    increment(state) {
      state.count++
    }
  }
})
