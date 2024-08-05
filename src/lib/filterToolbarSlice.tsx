
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { Moment } from "moment";

type ICalendarType = 'week'|'month';

type IFilterToolbarType = {
    socialFilter:string[];
    statusFilter:string[];
    calendarType:ICalendarType;
    selectedDate:Moment;
} 

const initialState: IFilterToolbarType = {
    socialFilter:[],
    statusFilter:[],
    calendarType:'week',
    selectedDate:moment()
};

const filterToolbarSlice = createSlice({
  name: 'filterToolbar',
  initialState,
  reducers: {
    socialFilterAction:(state,action: PayloadAction<Array<string>>)=>{
        state.socialFilter = action.payload;
    },
    statusFilterAction:(state,action: PayloadAction<Array<string>>)=>{
        state.statusFilter = action.payload;
    },
    calendarTypeAction:(state,action:PayloadAction<ICalendarType>)=>{
      state.calendarType = action.payload;
    },
    selectedDateAction:(state,action:PayloadAction<Moment>)=>{
      state.selectedDate = action.payload;
    }
  },
});

export const filterToolbarActions = filterToolbarSlice.actions;
export const filterToolbarReducer = filterToolbarSlice.reducer;