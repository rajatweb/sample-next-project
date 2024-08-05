import React from 'react';
import { Box, IconButton,Divider, List, ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader, Drawer } from './styledComponents';


const PlannerSidebar =()=>{

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState('posts')

    const handleDrawerAction = () => {
        setOpen((value) => !value);
    };

    return         <Drawer variant="permanent" open={open}>
    <DrawerHeader>
        {open && <Box className="header-label">Planner</Box>}
        <IconButton onClick={handleDrawerAction}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </DrawerHeader>
    <Divider />
    {open && <>
        <Box className="drawer-section">
            Posts
        </Box>
        <List>
            <ListItem sx={{
                background: 'transparent',
                '& :hover': { 
                    background: "rgb(254, 238, 209)", 
                    cursor: "pointer" 
                }
            }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={() => setSelectedOption('posts')}
                >
                    <ListItemText primary={'All Posts'} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
    </>}
</Drawer>
}

export default PlannerSidebar;