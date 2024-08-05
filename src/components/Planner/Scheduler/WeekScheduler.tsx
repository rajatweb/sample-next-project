import { Box, Typography } from '@mui/material';
import moment, { Moment } from 'moment';
import React from 'react'
// import { SchedulerHeader } from './Scheduler.style';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ErrorIcon from '@mui/icons-material/Error';
import { useGetPostsQuery } from '@/lib/api/coreApi';
import UiLoader from '@/components/UiComponents/UiLoader';
import { WeekSchedulerContainer } from './Scheduler.style';
import { Post } from '@/utils/commonTypes';
import { useAppSelector } from '@/lib/hooks';

type IProps = {
  selectedDate: Moment;
  setPreviewPosts: (posts: Post[]) => void;
}

type IWeekDataType = { currentDate: string, data: Post[] };

type IWeekData = {
  dateRange: string[];
  data: Array<{
    label: string;
    labelData: Array<{
      currentDate: string;
      draft: Post[];
      published: Post[];
      scheduled: Post[];
      failed: Post[];
    }>;
  }>;
};


const dayHoursMap = [
  { label: '00.00 AM - 02.59AM', startTime: '00:00', endTime: '02:59' },
  { label: '03.00 AM - 05.59AM', startTime: '03:00', endTime: '05:59' },
  { label: '06.00 AM - 08.59AM', startTime: '06:00', endTime: '08:59' },
  { label: '09.00 AM - 11.59AM', startTime: '09:00', endTime: '11:59' },
  { label: '12.00 PM - 02.59PM', startTime: '12:00', endTime: '14:59' },
  { label: '03.00 PM - 05.59PM', startTime: '15:00', endTime: '17:59' },
  { label: '06.00 PM - 08.59PM', startTime: '18:00', endTime: '20:59' },
  { label: '09.00 PM - 11.59PM', startTime: '21:00', endTime: '23:59' }
]

const findTimeInterver = (timeStamp: string) => {

  const recordIndex = dayHoursMap.findIndex((item) => {

    const startTime = moment(item.startTime, 'HH:mm')
    const endTime = moment(item.endTime, 'HH:mm')
    const myTime = moment(timeStamp).clone().format('HH:mm')
    return moment(myTime, 'HH:mm').isBetween(startTime, endTime)
  })
  return recordIndex
};

const getWeekRange = (firstDate: string, lastDate: string): string[] => {
  let date = moment(firstDate).format('YYYY-MM-DD');
  const dates: string[] = [date];
  do {
    date = moment(date).add(1, 'day').format('YYYY-MM-DD');
    dates.push(date);
  } while (moment(date).isBefore(lastDate));
  return dates;

};

const calculateWeekData = (dateRange: string[], data: Post[]) => {

  const calculateData = dateRange.reduce((accum, initialValue) => {
    const currentDateData = data.filter((item) => moment(item.timestamp).isSame(initialValue, 'day'))
    const payload = { currentDate: initialValue, data: currentDateData }
    return [...accum, payload];
  }, [] as IWeekDataType[]);

  const calculatedData = calculateData.reduce((accum, initValue, index) => {
    if (!index) {
      accum.data = dayHoursMap.map((item) => ({
        label: item.label,
        labelData: []
      }))
    }
    accum.data = accum.data.map(item => ({
      ...item, labelData: [...item.labelData, {
        currentDate: initValue.currentDate,
        draft: [],
        published: [],
        scheduled: [],
        failed: []
      }]
    }))
    accum.dateRange.push(initValue.currentDate)
    initValue.data.map((item) => {
      const invtervalIndex = findTimeInterver(item.timestamp);
      const status = item.status;
      accum.data[invtervalIndex]?.labelData[index][status].push(item)
      return item;
    })

    return accum;

  }, { dateRange: [], data: [] } as IWeekData);

  return calculatedData;


}

const WeekScheduler = ({ selectedDate, setPreviewPosts }: IProps) => {

  const socialFilters = useAppSelector(state => state.filterToolbar.socialFilter);
  const statusFilters = useAppSelector(state => state.filterToolbar.statusFilter);

  const [weekData, setWeekData] = React.useState<IWeekData>({ dateRange: [], data: [] })

  const firstDate = selectedDate.clone().startOf('week').format('YYYY-MM-DD');
  const lastDate = selectedDate.clone().endOf('week').format('YYYY-MM-DD');
  const todayDate = moment();

  const dateRange = getWeekRange(firstDate, lastDate);

  const { data, isLoading } = useGetPostsQuery({ fromDate: firstDate, lastDate: lastDate });

  const onPreviewClick = (e: React.SyntheticEvent<EventTarget>, previewData: Post[]) => {
    e.stopPropagation();
    setPreviewPosts(previewData)
  }

  React.useEffect(() => {

    setWeekData({ dateRange: [], data: [] });

  }, [selectedDate]);

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
        const calculatedData = calculateWeekData(dateRange, filterData)
        setWeekData(calculatedData);

      }
    }

  }, [socialFilters, statusFilters, data])


  return (isLoading || !weekData.dateRange.length ? <UiLoader /> : <WeekSchedulerContainer className="mx-3">
    <Box className="scheduler-header">
      <Box className='basis-48 scheduler-header-col'>
        Hours
      </Box>
      {weekData.dateRange.map((item, idx) => {
        const myDate = moment(item);
        const isToday = todayDate.isSame(myDate, 'day');
        return <Box key={idx} className={`scheduler-header-col cursor-pointer ${isToday && 'calendar-day-today'}`}>
          <h1>{myDate.format('ddd')}</h1>
          <h2 >{myDate.format('DD MMM')}</h2>
        </Box>
      })}
    </Box>
    <Box className="scheduler-content">
      {weekData.data.map((item, key) => {
        return <Box key={key} className='text-center scheduler-content-row min-h-[7rem]'>
          <Box className='basis-48 border-right flex justify-center items-center'><Typography>{item.label}</Typography></Box>
          {item.labelData.map((data, idx) => {
            const isToday = todayDate.isSame(moment(dateRange[idx]), 'day');
            const isAfter = todayDate.isAfter(moment(dateRange[idx]), 'day');
            return <Box key={idx} className={`flex-auto border-right flex flex-col justify-center items-baseline pt-2 ${isAfter && 'calendar-day-not-current'} ${isToday && 'calendar-day-today'}`}>
              {!!data.draft.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, data.draft)}>
                <DraftsIcon fontSize='small' color='warning' />
                <span className="post-count">{data.draft.length}</span>
                <span className='post-type'> Drafts</span>
              </Typography>}
              {!!data.published.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, data.published)}>
                <CheckBoxIcon fontSize='small' color='success' />
                <span className="post-count">{data.published.length} </span>
                <span className='post-type'>Published</span>
              </Typography>}
              {!!data.scheduled.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, data.scheduled)}>
                <AvTimerIcon fontSize='small' color="secondary" />
                <span className="post-count">{data.scheduled.length}</span>
                <span className='post-type'>Scheduled </span>
              </Typography>}
              {!!data.failed.length && <Typography className='cursor-pointer flex pl-1 gap-2 items-center justify-center' onClick={(e) => onPreviewClick(e, data.failed)}>
                <ErrorIcon fontSize='small' color="error" />
                <span className="post-count">{data.failed.length}</span>
                <span className='post-type'>Failed </span>
              </Typography>}
            </Box>
          }
          )}
        </Box>
      })}
    </Box>
  </WeekSchedulerContainer>


  )
}

export default WeekScheduler;
