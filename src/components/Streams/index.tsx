'use client';
import React from 'react'
import { Box } from '@mui/material';
import { useGetUserStreamsQuery } from '@/lib/api/streamsApi';
import FilterToolbar from '../organisms/FilterToolbar';
import UiLoader from '../UiComponents/UiLoader';
import { useAppSelector } from '@/lib/hooks';
import StreamPost from './StreamPost';


const StreamsComponent = () => {


  const calendarType = useAppSelector(state => state.filterToolbar.calendarType);
  const selectedDate = useAppSelector(state => state.filterToolbar.selectedDate);
  const fromDate = selectedDate.clone().startOf(calendarType).format('YYYY-MM-DD');
  const lastDate = selectedDate.clone().endOf(calendarType).format('YYYY-MM-DD');

  const { data, isFetching } = useGetUserStreamsQuery({ userId: 123, fromDate, lastDate });

  console.log(data, 'data');

  return (
    <Box className="min-h-screen w-full">
      <FilterToolbar />
      {isFetching ? <UiLoader /> :
        <Box component="main" className="w-full grid grid-cols-4 gap-4 p-4">
          {data && data.length ? data.map((item) => <StreamPost
            id={item.id}
            userInfo={item.userInfo}
            timestamp={item.timestamp}
            postContent={item.postContent}
            postImages={item.postImages}
            postComments={item.postComments}
            youLike={item.youLike}
          />) : <h2>No Data Found</h2>}
        </Box>}
    </Box>
  )
}

export default StreamsComponent;