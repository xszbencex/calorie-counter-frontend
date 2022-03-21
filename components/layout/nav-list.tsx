import {routes, CCRoute} from '../../constants/routes';
import Link from 'next/link';
import {Box, Collapse, ListItem, ListItemButton, ListItemIcon, Tooltip} from '@mui/material';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import {useRouter} from 'next/router';
import {useContext, useState} from 'react';
import DrawerContext from '../../store/drawer-context';
import {NutrientsProgress} from '../NutrientsProgress';
import {WaterProgress} from '../WaterProgress';
import GlobalContext from '../../store/global-context';

const LinkItem = (props: { route: CCRoute, routerPath: string, subRoute?: boolean, drawerOpen?: boolean }) => {
  const {route, routerPath, subRoute, drawerOpen} = props;
  const padding: number = !subRoute ? 2 : drawerOpen ? 4 : 2;

  return (
    <Link href={route.path!} passHref>
      <a>
        <Tooltip title={drawerOpen ? '' : route.label} placement="right">
          <ListItemButton selected={routerPath === route.path} sx={{
            pl: padding, transition: 'all 0.2s',

          }}>
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

const DailyProgress = (props: {drawerOpen?: boolean }) => {
  const {drawerOpen} = props;
  const globalContext = useContext(GlobalContext);

  return (
    <>
      {globalContext.dailyTarget?.targetCalories && (
        <ListItem sx={{justifyContent: 'center'}}>
          <NutrientsProgress
            target={globalContext.dailyTarget?.targetCalories} current={globalContext.dailyProgress?.calorieSum}
            size={drawerOpen ? 160 : 40} thickness={2} color={'#00790e'}
          >
            {drawerOpen ? (
              <Box sx={{mt: -1, fontSize: 'large', color: 'white'}}>
                Kalória<br/>
                {`${globalContext.dailyProgress?.calorieSum ?? 0}/${globalContext.dailyTarget?.targetCalories}kcal`}<br/>
                {((globalContext.dailyProgress?.calorieSum ?? 0) / globalContext.dailyTarget?.targetCalories ?? 1) > 1.4 && (
                  <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                    <Icon color={'error'} fontSize={'medium'}>info_outlined</Icon>
                  </Tooltip>
                )}
              </Box>
            ) : <></>}

          </NutrientsProgress>
        </ListItem>
      )}
      {globalContext.dailyTarget?.targetCarbohydrate && (
        <ListItem sx={{justifyContent: 'center'}}>
          <NutrientsProgress
            target={globalContext.dailyTarget?.targetCarbohydrate} current={globalContext.dailyProgress?.carbohydrateSum}
            size={drawerOpen ? 160 : 40} thickness={2} color={'#ff8800'}
          >
            {drawerOpen ? (
              <Box sx={{mt: -1, fontSize: 'large', color: 'white'}}>
                Szénhidrát<br/>
                {`${globalContext.dailyProgress?.carbohydrateSum ?? 0}/${globalContext.dailyTarget?.targetCarbohydrate}g`}<br/>
                {((globalContext.dailyProgress?.carbohydrateSum ?? 0) / globalContext.dailyTarget?.targetCarbohydrate ?? 1) > 1.4 && (
                  <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                    <Icon color={'error'} fontSize={'medium'}>info_outlined</Icon>
                  </Tooltip>
                )}
              </Box>
            ) : <></>}

          </NutrientsProgress>
        </ListItem>
      )}
      {globalContext.dailyTarget?.targetProtein && (
        <ListItem sx={{justifyContent: 'center'}}>
          <NutrientsProgress
            target={globalContext.dailyTarget?.targetProtein} current={globalContext.dailyProgress?.proteinSum}
            size={drawerOpen ? 160 : 40} thickness={2} color={'#b34a02'}
          >
            {drawerOpen ? (
            <Box sx={{mt: -1, fontSize: 'large', color: 'white'}}>
              Fehérje<br/>
              {`${globalContext.dailyProgress?.proteinSum ?? 0}/${globalContext.dailyTarget?.targetProtein}g`}<br/>
              {((globalContext.dailyProgress?.proteinSum ?? 0) / globalContext.dailyTarget?.targetProtein ?? 1) > 1.4 && (
                <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                  <Icon color={'error'} fontSize={'medium'}>info_outlined</Icon>
                </Tooltip>
              )}
            </Box>

            ) : <></>}
          </NutrientsProgress>
        </ListItem>
      )}
      {globalContext.dailyTarget?.targetFat && (
        <ListItem sx={{justifyContent: 'center'}}>
          <NutrientsProgress
            target={globalContext.dailyTarget?.targetFat} current={globalContext.dailyProgress?.fatSum}
            size={drawerOpen ? 160 : 40} thickness={2} color={'#ffc100'}
          >
            {drawerOpen ? (
            <Box sx={{mt: -1, fontSize: 'large', color: 'white'}}>
              Zsír<br/>
              {`${globalContext.dailyProgress?.fatSum ?? 0}/${globalContext.dailyTarget?.targetFat}g`}<br/>
              {((globalContext.dailyProgress?.fatSum ?? 0) / globalContext.dailyTarget?.targetFat ?? 1) > 1.4 && (
                <Tooltip title={'Az napi érték jelentősen meghaladja a célértéket!'}>
                  <Icon color={'error'} fontSize={'medium'}>info_outlined</Icon>
                </Tooltip>
              )}
            </Box>

            ) : <></>}
          </NutrientsProgress>
        </ListItem>
      )}
      {globalContext.dailyTarget?.targetWater && (
        <ListItem sx={{justifyContent: 'center'}}>
          <WaterProgress
            target={globalContext.dailyTarget?.targetWater} current={globalContext.dailyProgress?.waterSum}
            width={70}
          >
            {drawerOpen ? (
              <>
                Víz<br/>
                {`${globalContext.dailyProgress?.waterSum ?? 0}/${globalContext.dailyTarget?.targetWater}l`}
              </>

            ) : <></>}
          </WaterProgress>
        </ListItem>
      )}
    </>
  );
};

export const NavList = (props: { drawerOpen: boolean }) => {
  const {drawerOpen} = props;
  const router = useRouter();
  const drawerContext = useContext(DrawerContext);
  const [quickProgressOpen, setQuickProgressOpen] = useState<boolean>(localStorage.getItem('quickProgressOpen') === 'true');

  const handleClick = () => {
    setQuickProgressOpen(prevState => {
      localStorage.setItem('quickProgressOpen', !prevState ? 'true' : 'false');
      return !prevState;
    });
  };

  return (
    <List sx={{padding: `0 0 ${drawerContext.headerHeight}px 0`}}>
      {routes.map((route: CCRoute, index: number) =>
          <LinkItem key={index} route={route} routerPath={router.route} drawerOpen={drawerOpen}/>
      )}
      {router.route !== '/daily-progress' && (
        <>
          <Tooltip title={drawerOpen ? '' : 'Gyorsmenü'} placement="right">
            <ListItemButton onClick={() => handleClick()}>
              <ListItemIcon>
                <Icon>{quickProgressOpen ? 'expand_less' : 'expand_more'}</Icon>
              </ListItemIcon>
              <ListItemText primary={'Gyorsmenü'}/>
            </ListItemButton>
          </Tooltip>
          <Collapse in={quickProgressOpen} timeout="auto" unmountOnExit>
            <DailyProgress drawerOpen={drawerOpen}/>
          </Collapse>
        </>
      )}
    </List>
  );
};
