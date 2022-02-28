import {styled, Theme, useTheme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {ReactElement, useContext, useEffect, useState} from 'react';
import DrawerContext from '../../store/drawer-context';
import {Box, CSSObject} from '@mui/material';
import Icon from '@mui/material/Icon';
import {mainDark} from '../../constants/colors';
import {NavList} from './nav-list';

const drawerWidth = 260;

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
  width: `calc(${theme.spacing(7)} + 1px)`
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  height: '64px',
  minHeight: '64px',
  justifyContent: 'space-between',
}));

export default function Sidebar(props: { children: ReactElement }) {
  const theme = useTheme();
  const drawerContext = useContext(DrawerContext);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(localStorage.getItem('sidebar') === 'opened');
  }, []);

  const openSidebar = () => {
    setOpen(true);
    localStorage.setItem('sidebar', 'opened');
  };

  const closeSidebar = () => {
    setOpen(false);
    localStorage.setItem('sidebar', 'closed');
  };

  return (
    <Box sx={{
      marginLeft: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
      transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
    }}>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            top: drawerContext.headerHeight,
            backgroundColor: mainDark,
            color: 'white',
            '&::-webkit-scrollbar': {
              width: 5,
            },
            '&::-webkit-scrollbar-track': {
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 10,
              backgroundColor: 'rgba(100,207,247,0.32)'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              opacity: 0.2
            },
          },
          '& .MuiIconButton-root, .MuiListItemIcon-root': {
            color: 'white'
          }
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Divider />
        <DrawerHeader>
          {open ? (
           <>
             <span style={{
               fontFamily: 'Roboto, Helvetica, Arial ,sans-serif',
               paddingLeft: '8px'
             }}>
              Menü
             </span>
             <IconButton onClick={() => closeSidebar()}>
               {theme.direction === 'ltr' ? <Icon>chevron_left</Icon> : <Icon>chevron_right</Icon>}
             </IconButton>
           </>
          ) : (
            <IconButton onClick={() => openSidebar()}>
              <Icon>menu</Icon>
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <nav>
          <NavList drawerOpen={open} />
        </nav>
      </Drawer>
      {props.children}
    </Box>
  );
}
