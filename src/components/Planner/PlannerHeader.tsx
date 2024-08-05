import React, { SetStateAction } from 'react';
import { StyledPlannerHeader } from './styledComponents';
import { Box } from '@mui/material';
import TabMenu from '../UiComponents/Tab/TabMenu';
import TabMenuItem from '../UiComponents/Tab/TabMenuItem';

type IProps ={
    setPlannerTab:React.Dispatch<SetStateAction<number>>
}

const PlannerHeader = ({setPlannerTab}:IProps) => {
    const [tabValue,setTabValue] = React.useState(0)
    const handleTabChange = (event:React.SyntheticEvent,newValue:number)=>{
        setTabValue(newValue)
        setPlannerTab(newValue);
    }
    return <StyledPlannerHeader>
        <Box className="tab-nav">
            <TabMenu value={tabValue} onChange={handleTabChange}>
                <TabMenuItem index={0} label="Calendar" />
            </TabMenu>
        </Box>
    </StyledPlannerHeader>
}

export default PlannerHeader