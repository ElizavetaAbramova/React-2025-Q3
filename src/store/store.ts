import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import selectedItemsListReducer from '../features/selectedItemsList/selectedItemsListSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectedItemsList: selectedItemsListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
