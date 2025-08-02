import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types&interfaces/Item'

export interface ShoppingListState {
  list: Item[]
}

const initialState: ShoppingListState = {
  list: [],
}

const shoppingListSlice = createSlice({
  name: 'shoppingList',
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

export const { addItem, deleteItem, clearList } = shoppingListSlice.actions

export default shoppingListSlice.reducer
