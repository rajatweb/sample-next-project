import UiLoader from '@/components/UiComponents/UiLoader';
import { useGetPostsQuery } from '@/lib/api/coreApi';
import { Box, Typography } from '@mui/material';
import moment, { Moment } from 'moment';
import React from 'react';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import DraftsIcon from '@mui/icons-material/Drafts';
import { StyledMonthScheduler } from './Scheduler.style';
import { Post } from '@/utils/commonTypes';
import { useAppSelector } from '@/lib/hooks';

type IProps = {
  selectedDate: Moment;
  setPreviewPosts: (posts:Post[])=>void;
}
type IDateData = {
  draft: Post[],
  published: Post[],
  scheduled: Post[],
  failed:Post[]
}
type IMonthData = {
  currentDate: string;
  dateData: IDateData
}

const getMonthDates = (firstDate: string, lastDate: string): string[][] => {

  const firstWeek = moment(firstDate).clone().startOf('week');
  const endDate = moment(lastDate).clone();

  const day = firstWeek.clone().subtract(1, "day");

  const calendar: string[][] = [];
  while (day.isBefore(endDate, "day")) {
    calendar.push(Array(7)
      .fill(0)
      .map(() => day.add(1, "day").clone().format('YYYY-MM-DD')));
  }

  return calendar;

}

const calculateData =(data:Post[],calculatedDates:string[][]): IMonthData[][]=>{

  const parseData = calculatedDates.reduce((accum, init) => {

    const calculatedData = init.map((item) => {

      const itemData = data.filter((filterItem) => moment(filterItem.timestamp).isSame(item, 'day'))

      const dateData = itemData.reduce((acc, initValue) => {
        if (initValue.status === 'draft') {
          acc.draft.push(initValue)
        }
        if (initValue.status === 'published') {
          acc.published.push(initValue)
        }
        if (initValue.status === 'scheduled') {
          acc.scheduled.push(initValue)
        }
        if (initValue.status === 'failed') {
          acc.failed.push(initValue)
        }
        return acc;

      }, { draft: [], scheduled: [], published: [],failed:[] } as IDateData)
      return { currentDate: item, dateData }

    })
    accum.push(calculatedData);

    return accum;

  }, [] as IMonthData[][]);

  return parseData;

}

const MonthScheduler = ({ selectedDate, setPreviewPosts }: IProps) => {

  const socialFilters = useAppSelector(state => state.filterToolbar.socialFilter);
  const statusFilters = useAppSelector(state => state.filterToolbar.statusFilter);

  const [monthData, setMonthData] = React.useState<IMonthData[][]>([])
  const firstDate = selectedDate.clone().startOf('month').format('YYYY-MM-DD');
  const lastDate = selectedDate.clone().endOf('month').format('YYYY-MM-DD');
  const todayDate = moment();

  const calculatedDates = getMonthDates(firstDate, lastDate);
  const rangeLength = calculatedDates.length;
  const endDate = calculatedDates[rangeLength - 1][6];

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const { data, isLoading } = useGetPostsQuery({ fromDate: calculatedDates[0][0], lastDate: endDate });

  React.useEffect(() => {

    setMonthData([])
  }, [selectedDate])

  React.useEffect(() => {
    if (data && data.length) {
      let filterData: Post[] = [];
      if (socialFilters.length && statusFilters.length) {
        filterData = data.filter((item)=> socialFilters.includes(item.account.id))
        filterData = filterData.filter((item)=> statusFilters.includes(item.status))

      } else if (socialFilters.length) {

        filterData = data.filter((item)=> socialFilters.includes(item.account.id))

      } else if (statusFilters.length) {
        filterData = data.reduce((acc, initValue) => {
          if (statusFilters.includes(initValue.status)) acc.push(initValue);
          return acc;
        }, [] as Post[])

      }else {
        filterData = data;
      }
      if (filterData.length) {
        const calculatedData = calculateData(filterData,calculatedDates)
        setMonthData(calculatedData);

      }
    }

  }, [socialFilters, statusFilters, data])

  const onPreviewClick = (e: React.SyntheticEvent<EventTarget>, previewData: Post[]) => {
    e.stopPropagation();
    setPreviewPosts(previewData)
  }

  return (isLoading || !monthData.length ? <UiLoader /> :
    <StyledMonthScheduler className="mx-3">
      <ol id="days-of-week" className="day-of-week">{
        WEEKDAYS.map((day, key) => <li className='flex items-center justify-center' key={key}>{day}</li>)
      }</ol>
      <div className='calendar-day-content'>

        {monthData.map((monthWeek, index) => <ol key={index} id="calendar-days" className="days-grid">
          {monthWeek.map((monthDay, idx) => {
            const currentDate = moment(monthDay.currentDate)
            const isToday = todayDate.isSame(currentDate, 'day');
            const isGrey = currentDate.isBefore(firstDate, 'day') || currentDate.isAfter(lastDate, 'day')
            return <li className={`calendar-day cursor-pointer ${isToday && 'calendar-day-today'} ${isGrey && 'calendar-day-not-current'}`} key={idx}>
              <Box className='flex justify-end'> <span className='calendar-date'>{currentDate.format('DD')}</span></Box>
              <Box key={idx} className='flex-auto border-right flex flex-col items-baseline justify-center items-center pt-2'>
                {!!monthDay.dateData.draft.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, monthDay.dateData.draft)}>
                  <DraftsIcon fontSize='small' color='warning' />
                  <span className="post-count">{monthDay.dateData.draft.length}</span>
                  <span className='post-type'> Drafts</span>
                </Typography>}
                {!!monthDay.dateData.published.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, monthDay.dateData.published)}>
                  <CheckBoxIcon fontSize='small' color='success' />
                  <span className="post-count">{monthDay.dateData.published.length}  </span>
                  <span className='post-type'>Published</span>
                </Typography>}
                {!!monthDay.dateData.scheduled.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, monthDay.dateData.scheduled)}>
                  <AvTimerIcon fontSize='small' color="secondary" />
                  <span className="post-count">{monthDay.dateData.scheduled.length} </span>
                  <span className='post-type'>Scheduled </span>
                </Typography>}
                {!!monthDay.dateData.failed.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, monthDay.dateData.failed)}>
                  <ErrorIcon fontSize='small' color="error" />
                  <span className="post-count">{monthDay.dateData.failed.length} </span>
                  <span className='post-type'>Failed </span>
                </Typography>}
              </Box>
            </li>
          })}
        </ol>)}

      </div>

    </StyledMonthScheduler>)
}

export default MonthScheduler;