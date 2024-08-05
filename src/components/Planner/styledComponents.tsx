import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Box } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '50px',
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    '& .header-label': { fontSize: "28px", fontWeight: 900, lineHeight: "35px" },
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        '& .MuiPaper-root': {
            position: 'unset',
            backgroundColor: "rgb(238, 235, 232)",
        },
        '& .drawer-section': {
            color: "rgb(36, 31, 33)",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: 700,
            textTransform: "uppercase",
            padding: "12px 16px",
            '& .section-text':{ fontSize: "1em", margin: "8px 0px 11px 24px" }
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const StyledPlannerHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding:'0px 10px',
    width: "100%",
    flexFlow: "wrap",
    alignItems: "center",
    background: "rgb(253, 253, 253)",
    borderBottom: "1px solid rgb(211, 210, 211)",
    height:'64px',
    '& .tab-nav':{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "64px",
        width: "100%",
        backgroundColor: "rgb(253, 253, 253)",
        '& .nav-label':{
            fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial',
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "30px",
            color: "rgb(36, 31, 33)"
          }
    }
  })
