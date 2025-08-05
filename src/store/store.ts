import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import selectedItemsListReducer from '../features/selectedItemsList/selectedItemsListSlice'
import { api } from '../api/api'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectedItemsList: selectedItemsListReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
