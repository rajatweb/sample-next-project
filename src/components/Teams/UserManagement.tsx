import { useGetTeamUsersQuery } from '@/lib/api/coreApi';
import { useAppSelector, useActions } from '@/lib/hooks';
import { Box } from '@mui/material';
import React from 'react'
import UiButton from '../UiComponents/Button/UiButton';
import UiLoader from '../UiComponents/UiLoader';
import TeamUserModal from '../organisms/Teams/TeamUserModal';
import TeamUsersTable from '../organisms/Teams/TeamUsersTable';
import { TeamsWrapper } from './teams.style';

const UserManagement = () => {
    const isOpen = useAppSelector(state => state.teamUserModal.isOpen);
    const {openCreateTeamUserModal} =useActions();
  
    const id = 'abc';
    const {data:{teamUsers}={},isFetching} = useGetTeamUsersQuery(id);
    return (
      isFetching? <Box className='flex h-screen w-full justify-center items-center'><UiLoader/></Box>:<TeamsWrapper>
        <div className='flex justify-end'>
          <UiButton label="+ invite user" onClick={()=> openCreateTeamUserModal()}/>
        </div>
        <div className='table-container mt-5'>
          {teamUsers && <TeamUsersTable isLoading={isFetching} data={teamUsers||[]}/>}
        </div>
        {isOpen && <TeamUserModal/>}
      </TeamsWrapper>
    )
}

export default UserManagement;