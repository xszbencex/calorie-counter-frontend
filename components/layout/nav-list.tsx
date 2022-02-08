import {routes, CCRoute} from '../../constants/routes';
import Link from 'next/link';
import {Collapse, ListItemButton, ListItemIcon, Tooltip} from '@mui/material';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import List from '@mui/material/List';
import {useRouter} from 'next/router';
import {Fragment, useContext, useState} from 'react';
import DrawerContext from '../../store/drawer-context';

const LinkItem = (props: { route: CCRoute, routerPath: string, subRoute?: boolean, drawerOpen?: boolean }) => {
  const {route, routerPath, subRoute, drawerOpen} = props;
  const padding: number = !subRoute ? 2 : drawerOpen ? 4 : 2;
  return (
    <Link href={route.path!} passHref>
      <a>
        <Tooltip title={drawerOpen ? '' : route.label} placement="right">
          <ListItemButton selected={routerPath === route.path} sx={{pl: padding, transition: 'all 0.2s'}}>
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={route.label} sx={{whiteSpace: drawerOpen ? 'break-spaces' : 'nowrap'}}/>
          </ListItemButton>
        </Tooltip>
      </a>
    </Link>
  );
};

export const NavList = (props: { drawerOpen: boolean }) => {
  const {drawerOpen} = props;
  const router = useRouter();
  const drawerContext = useContext(DrawerContext);
  const [submenusOpenState, setSubmenusOpenState] = useState<boolean[]>(new Array(routes.length).fill(true));

  const handleClick = (position: number) => {
    setSubmenusOpenState(prevState => prevState.map((item, index) => index === position ? !item : item));
  };

  return (
    <List sx={{padding: `0 0 ${drawerContext.headerHeight}px 0`}}>
      {routes.map((route: CCRoute, index: number) => {
        return !route.subRoutes ? (
          <LinkItem key={route.label} route={route} routerPath={router.route} drawerOpen={drawerOpen}/>
        ) : (
          <Fragment key={route.label}>
            <Tooltip title={drawerOpen ? '' : `${route.label} ${submenusOpenState[index] ? '\u25B2' : '\u25BC'}`}
                     placement="right">
              <ListItemButton onClick={() => handleClick(index)}>
                <ListItemIcon>
                  <Icon>{route.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={route.label}/>
                {submenusOpenState[index] ? <ExpandLess/> : <ExpandMore/>}
              </ListItemButton>
            </Tooltip>
            <Collapse in={submenusOpenState[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {route.subRoutes.map((subRoute) =>
                  <LinkItem
                    key={subRoute.label}
                    route={subRoute}
                    routerPath={router.route}
                    subRoute
                    drawerOpen={drawerOpen}/>)}
              </List>
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
};
