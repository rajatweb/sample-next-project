'use client';
import React from 'react';
import { Box } from "@mui/material";
import PlannerSidebar from './PlannerSidebar';
import PlannerHeader from './PlannerHeader';
import PlannerCalendar from './PlannerCalendar';

const PlannerComponent = () => {


    const [plannerTab,setPlannerTab] = React.useState(0);

    return <Box sx={{ display: 'flex' }} className="min-h-screen w-full">
        <PlannerSidebar />
        <Box component="main" className="w-full overflow-hidden">
            <PlannerHeader setPlannerTab={setPlannerTab} />
            <PlannerCalendar/>
        </Box>
    </Box>

};

export default PlannerComponent;