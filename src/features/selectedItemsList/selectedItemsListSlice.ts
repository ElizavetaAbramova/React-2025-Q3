import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types&interfaces/Item'

export interface SelectedItemsListState {
  list: Item[]
}

const initialState: SelectedItemsListState = {
  list: [],
}

const SelectedItemsListSlice = createSlice({
  name: 'selectedItemsList',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const isItemInList = state.list.find((item) => item.id === action.payload.id)
      if (!isItemInList) {
        state.list.push(action.payload)
      }
    },
    deleteItem(state, action: PayloadAction<Item>) {
      state.list = state.list.filter((item) => item.id !== action.payload.id)
    },
    clearList(state) {
      state.list = []
    },
  },
})

export const { addItem, deleteItem, clearList } = SelectedItemsListSlice.actions

export default SelectedItemsListSlice.reducer
