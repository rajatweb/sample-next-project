import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function MainSidebar() {

    return (<Box role="presentation">
        <List>
            <ListItem>
                <ListItemButton component="a" href="/create">
                    <ListItemText primary="Create" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton component="a" href="/planner">
                    <ListItemText primary="Planner" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton component="a" href="/teams">
                    <ListItemText primary="Teams" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton component="a" href="/streams">
                    <ListItemText primary="Streams" />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
    );
}