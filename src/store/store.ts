import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import shoppingListReducer from '../features/shoppingList/shoppingListSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    shoppingList: shoppingListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
