
import { ITeamFormProps } from '@/utils/commonTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ITeamModalProps {
  isOpen: boolean;
  modalType:'create'|'edit';
  initialValues:ITeamFormProps
}

const initialState: ITeamModalProps = {
    isOpen: false,
    modalType:'create',
    initialValues:{
        name:'',
        id:''
    }
};

const teamModalSlice = createSlice({
  name: 'teamModal',
  initialState,
  reducers: {
    closeTeamModal: (state) => {
      state.isOpen = false;
      state.initialValues = initialState.initialValues;
    },
    openCreateTeamModal: (state) => {
      state.isOpen= true;
      state.modalType ='create';
    },
    openEditTeamModal:(state,action:PayloadAction<ITeamFormProps>)=>{
        state.isOpen=true;
        state.modalType='edit';
        state.initialValues=action.payload;
    }
  },
});

export const teamModalActions = teamModalSlice.actions;
export const teamModalReducer = teamModalSlice.reducer;