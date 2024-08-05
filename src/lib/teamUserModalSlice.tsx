import { ITeamUserFormProps } from '@/utils/commonTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ITeamUserModalProps {
  isOpen: boolean;
  modalType:'create'|'edit';
  initialValues:ITeamUserFormProps
}

const initialState: ITeamUserModalProps = {
    isOpen: false,
    modalType:'create',
    initialValues:{
        name:'',
        email:'',
        status:'',
        team:'',
        role:''
    }
};

const teamUserModalSlice = createSlice({
  name: 'teamUserModal',
  initialState,
  reducers: {
    closeTeamUserModal: (state) => {
      state.isOpen = false;
      state.initialValues = initialState.initialValues;
    },
    openCreateTeamUserModal: (state) => {
      state.isOpen= true;
      state.modalType ='create';
    },
    openEditTeamUserModal:(state,action:PayloadAction<ITeamUserModalProps['initialValues']>)=>{
        state.isOpen=true;
        state.modalType='edit';
        state.initialValues=action.payload;
    }
  },
});

export const teamUserModalActions = teamUserModalSlice.actions;
export const teamUserModalReducer = teamUserModalSlice.reducer;