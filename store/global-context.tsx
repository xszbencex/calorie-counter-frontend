import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ClientDTO} from '../types/dto/ClientDTO';
import {useKeycloak} from '@react-keycloak/ssr';
import {KeycloakInstance} from 'keycloak-js';
import {getClientByUserId} from '../utils/api/client-api';
import {useRouter} from 'next/router';
import DialogContext from './dialog-context';
import {IntakeSumResponse} from '../types/response/IntakeSumResponse';
import {getIntakeSumByDate} from '../utils/api/intake-api';

type GlobalContextType = {
  setClient: (client: ClientDTO) => void
  client?: ClientDTO,
  loggedInUserId?: string,
  refreshDailyProgress: () => void,
  dailyProgress?: IntakeSumResponse
}

const GlobalContext = createContext<GlobalContextType>({
  setClient: (client: ClientDTO) => {},
  refreshDailyProgress: () => {}
});

export function GlobalContextProvider(props: { children: ReactNode }) {
  const {keycloak} = useKeycloak<KeycloakInstance>();
  const dialogContext = useContext(DialogContext);
  const router = useRouter();
  const [client, setClient] = useState<ClientDTO>();
  const [loggedInUserId, setLoggedInUserId] = useState<string>('');
  const [dailyProgress, setDailyProgress] = useState<IntakeSumResponse>();

  useEffect(() => {
    if (keycloak?.authenticated) {
      setLoggedInUserId(keycloak?.subject!);
      getClientByUserId(keycloak?.subject!)
        .then(response => setClient(response))
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
    setClient,
    client,
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
