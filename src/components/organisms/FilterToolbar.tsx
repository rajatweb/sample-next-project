import ButtonDropdown from '@/components/UiComponents/Button/ButtonDropdown';
import UiIconButton from '@/components/UiComponents/Button/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { ClickAwayListener } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import moment from 'moment-timezone';
import React, { useState } from 'react'
import StyledCalendar from '@/components/UiComponents/Calendar';
import UiButton from '@/components/UiComponents/Button/UiButton';
import FilterDropdown from '@/components/UiComponents/Dropdown/FilterDropdown';
import { postStatusDropdown } from '@/utils/dataFeed';
import { useActions, useAppSelector } from '@/lib/hooks';
import { useGetUserInfoQuery } from '@/lib/api/coreApi';


type IProps = {
    showStatusDropdown?: boolean;
}


const calculateDates = (identifier: 'month' | 'week', currentDate: Moment) => {

    if (identifier === 'month') {

        return currentDate.format('MMM YYYY');
    }

    const fromDate = moment(currentDate.startOf(identifier));
    const toDate = moment(currentDate.endOf(identifier));
    let weekDate = '';
    if (fromDate.year() === toDate.year()) {

        if (fromDate.month() === toDate.month()) weekDate = `${fromDate.format('MMM DD')} - ${toDate.format('DD YYYY')}`;
        else weekDate = `${fromDate.format('MMM DD')} - ${toDate.format('MMM DD YYYY')}`;

    } else {
        weekDate = `${fromDate.format('MMM DD YYYY')} - ${toDate.format('MMM DD YYYY')}`;
    }
    return weekDate;

}

const FilterToolbar = ({ showStatusDropdown }: IProps) => {

    const [toggleCalendar, setCalendar] = useState(false);

    const socialFilter = useAppSelector(state => state.filterToolbar.socialFilter);
    const statusFilter = useAppSelector(state => state.filterToolbar.statusFilter);
    const calendarType = useAppSelector(state => state.filterToolbar.calendarType);
    const selectedDate = useAppSelector(state => state.filterToolbar.selectedDate);

    const {
        socialFilterAction,
        statusFilterAction,
        calendarTypeAction,
        selectedDateAction
    } = useActions();

    const { data: { socialDropdown } = {}, isLoading } = useGetUserInfoQuery('12345');


    const nextHandle = () => {
        const calendarView = calendarType === 'week' ? 'weeks' : 'months'
        selectedDateAction(moment(selectedDate).clone().add(1, calendarView));
    };

    const prevHandle = () => {
        const calendarView = calendarType === 'week' ? 'weeks' : 'months'
        selectedDateAction(moment(selectedDate).clone().subtract(1, calendarView));
    };


    return (
        isLoading ? <></>: <div className="flex justify-between px-3 py-3.5">
            <div className='flex items-center gap-2'>
                <UiIconButton onClick={() => prevHandle()}><ChevronLeft /></UiIconButton>
                <div className='relative'>
                    <ButtonDropdown onClick={() => setCalendar(!toggleCalendar)}>{calculateDates(calendarType, selectedDate.clone())}</ButtonDropdown>
                    {toggleCalendar && <ClickAwayListener onClickAway={() => setCalendar(false)}>
                        <div className='absolute z-50'>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                {calendarType === 'week' ? <StyledCalendar
                                    value={selectedDate}
                                    onChange={(value) => selectedDateAction(value)}
                                /> : <StyledCalendar
                                    value={selectedDate}
                                    views={['month', 'year']}
                                    openTo="month"
                                    onChange={(value) => selectedDateAction(value)}
                                />}
                            </LocalizationProvider>
                        </div>
                    </ClickAwayListener>}
                </div>

                <UiIconButton onClick={() => nextHandle()}><ChevronRight /></UiIconButton>
                <UiButton label="today" disabled={selectedDate.isSame(moment(), 'day')} onClick={() => selectedDateAction(moment())} />
            </div>
            <div className='flex gap-2'>
                <FilterDropdown
                    dropdownItems={socialDropdown || []}
                    placeholder='Social Accounts'
                    defaultSelected={socialFilter}
                    onSubmitHandler={(items) => socialFilterAction(items)}
                />
                {showStatusDropdown && <FilterDropdown
                    dropdownItems={postStatusDropdown}
                    placeholder='Post Status'
                    defaultSelected={statusFilter}
                    onSubmitHandler={(items) => statusFilterAction(items)}
                />}
            </div>
            <div className='flex gap-2'>
                <UiButton label="week" onClick={() => calendarTypeAction('week')} active={calendarType === 'week'} />
                <UiButton label="month" onClick={() => calendarTypeAction('month')} active={calendarType === 'month'} />
            </div>
        </div>
    )
}

export default FilterToolbar;