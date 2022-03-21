import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {DailyTargetDTO} from '../types/dto/DailyTargetDTO';
import {useKeycloak} from '@react-keycloak/ssr';
import {KeycloakInstance} from 'keycloak-js';
import {useRouter} from 'next/router';
import DialogContext from './dialog-context';
import {IntakeSumResponse} from '../types/response/IntakeSumResponse';
import {getIntakeSumByDate} from '../utils/api/intake-api';
import {getDailyTargetByUserId} from '../utils/api/daily-target-api';

type GlobalContextType = {
  setDailyTarget: (client: DailyTargetDTO) => void
  dailyTarget?: DailyTargetDTO,
  loggedInUserId?: string,
  refreshDailyProgress: () => void,
  dailyProgress?: IntakeSumResponse
}

const GlobalContext = createContext<GlobalContextType>({
  setDailyTarget: (client: DailyTargetDTO) => {},
  refreshDailyProgress: () => {}
});

export function GlobalContextProvider(props: { children: ReactNode }) {
  const {keycloak} = useKeycloak<KeycloakInstance>();
  const dialogContext = useContext(DialogContext);
  const router = useRouter();
  const [dailyTarget, setDailyTarget] = useState<DailyTargetDTO>();
  const [loggedInUserId, setLoggedInUserId] = useState<string>('');
  const [dailyProgress, setDailyProgress] = useState<IntakeSumResponse>();

  useEffect(() => {
    if (keycloak?.authenticated) {
      setLoggedInUserId(keycloak?.subject!);
      getDailyTargetByUserId(keycloak?.subject!)
        .then(response => setDailyTarget(response))
        .catch(error => {
          error.code === '201' ? router.push('/profile') : dialogContext.showRestCallErrorDialog(error);
        });
      refreshDailyProgress();
    }
  }, [keycloak]);

  function refreshDailyProgress() {
    getIntakeSumByDate(new Date().toLocaleDateString())
      .then(response => setDailyProgress(response))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }

  const context = {
    setDailyTarget: setDailyTarget,
    dailyTarget,
    loggedInUserId,
    refreshDailyProgress,
    dailyProgress
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
