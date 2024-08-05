import { configureStore } from '@reduxjs/toolkit'
import { userInfoModalReducer } from './userInfoModalSlice'
import { userInfoReducer } from './userInfoSlice'
import { mediaGalleryModalReducer } from './mediaGalleryModalSlice'
import { createPostContentReducer } from './createPostContentSlice'
import { coreApi } from './api/coreApi'
import { makeServer } from './mockServer'
import { filterToolbarReducer } from './filterToolbarSlice'
import { teamUserModalReducer } from './teamUserModalSlice'
import { snackbarReducer } from './snackBarSlice'
import { teamModalReducer } from './teamModalSlice'
import { streamsApi } from './api/streamsApi'

makeServer({ environment: "development" })

export const makeStore = () => {
  return configureStore({
    reducer: {
      [coreApi.reducerPath]: coreApi.reducer,
      [streamsApi.reducerPath]: streamsApi.reducer,
      snackbar: snackbarReducer,
      userInfoModal:userInfoModalReducer,
      userInfoDropdown:userInfoReducer,
      mediaGalleryModal:mediaGalleryModalReducer,
      createPostContent:createPostContentReducer,
      filterToolbar:filterToolbarReducer,
      teamUserModal:teamUserModalReducer,
      teamModal:teamModalReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([coreApi.middleware,streamsApi.middleware])
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

