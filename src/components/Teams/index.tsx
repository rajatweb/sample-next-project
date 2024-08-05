'use client';
import { Box, styled } from '@mui/material';
import React from 'react';
import TabMenu from '../UiComponents/Tab/TabMenu';
import TabMenuItem from '../UiComponents/Tab/TabMenuItem';
import TabContent from '../UiComponents/Tab/TabContent';
import TeamsManagement from './TeamsManagement';
import UserManagement from './UserManagement';

const StyledTeamsContainer = styled(Box)({
  display: 'block',
  padding: '10px'
});

const Teams = () => {

  const [tabValue, setTabValue] = React.useState(0)

  return (<StyledTeamsContainer>
    <Box className="tab-nav">
      <TabMenu value={tabValue} onChange={(e, tabNumber) => setTabValue(tabNumber)}>
        <TabMenuItem index={0} label="Teams" />
        <TabMenuItem index={1} label="Users" />
      </TabMenu>
    </Box>
    <Box>
      <TabContent index={0} value={tabValue}>
        <TeamsManagement />
      </TabContent>
      <TabContent index={1} value={tabValue}>
        <UserManagement />
      </TabContent>
    </Box>
  </StyledTeamsContainer>);
}

export default Teams;