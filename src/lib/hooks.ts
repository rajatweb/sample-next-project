import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from './store'
import { bindActionCreators } from '@reduxjs/toolkit';
import { userInfoModalActions } from './userInfoModalSlice';
import { userInfoActions } from './userInfoSlice';
import { mediaGalleryModalActions } from './mediaGalleryModalSlice';
import { createPostContentActions } from './createPostContentSlice';
import { filterToolbarActions } from './filterToolbarSlice';
import { teamUserModalActions } from './teamUserModalSlice';
import { snackbarActions } from './snackBarSlice';
import { teamModalActions } from './teamModalSlice';

const actions = {
    ...userInfoModalActions,
    ...userInfoActions,
    ...mediaGalleryModalActions,
    ...createPostContentActions,
    ...filterToolbarActions,
    ...teamUserModalActions,
    ...snackbarActions,
    ...teamModalActions
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;