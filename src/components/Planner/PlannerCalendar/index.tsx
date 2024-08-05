import React, { useState } from 'react';
import FilterToolbar from '../../organisms/FilterToolbar';
import { Box } from '@mui/material';
import Scheduler from '../Scheduler';

const PlannerCalendar = () => {
  const previewRef = React.useRef<HTMLDivElement | null>(null);

  return <Box ref={previewRef} sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }} >
    <FilterToolbar
      showStatusDropdown
    />
    <Scheduler parentRef={previewRef} />
  </Box>;
}

export default PlannerCalendar;