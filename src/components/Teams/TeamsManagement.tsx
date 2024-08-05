'use client';

import { useGetTeamsQuery } from '@/lib/api/coreApi';
import { useAppSelector, useActions } from '@/lib/hooks';
import { Box } from '@mui/material';
import React from 'react'
import UiButton from '../UiComponents/Button/UiButton';
import UiLoader from '../UiComponents/UiLoader';
import TeamModal from '../organisms/Teams/TeamModal';
import TeamTable from '../organisms/Teams/TeamTable';
import { TeamsWrapper } from './teams.style';

const TeamsManagement = () => {
  const isOpen = useAppSelector(state => state.teamModal.isOpen);
  const {openCreateTeamModal} =useActions();

  const id = 'abc';
  const {data:{data:teams}={},isFetching} = useGetTeamsQuery(id);
  return (
    isFetching? <Box className='flex h-screen w-full justify-center items-center'><UiLoader/></Box>:<TeamsWrapper>
      <div className='flex justify-end'>
        <UiButton label="+ Add New Team" onClick={()=> openCreateTeamModal()}/>
      </div>
      <div className='table-container mt-5'>
        {teams && <TeamTable isLoading={isFetching} data={teams||[]}/>}
      </div>
      {isOpen && <TeamModal/>}
    </TeamsWrapper>
  )
}

export default TeamsManagement;