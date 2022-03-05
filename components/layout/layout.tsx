import {Header} from './header';
import {ReactElement} from 'react';
import styles from '../../styles/layout.module.css';
import Sidebar from './sidebar';
import {DrawerContextProvider} from '../../store/drawer-context';
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKecyloakInstance} from '../../types/CCKecyloakInstance';

export const Layout = (props: { children: ReactElement }) => {
  const {keycloak} = useKeycloak<CCKecyloakInstance>();

  return (
    <div className={styles.pageContainer}>
      {keycloak?.authenticated ? (
        <DrawerContextProvider>
          <>
            <header>
              <Header/>
            </header>
            <Sidebar>
              <main className={styles.mainContainer}>
                {props.children}
              </main>
            </Sidebar>
          </>
        </DrawerContextProvider>
      ) : (
        <>
          <header>
            <Header/>
          </header>
          <main className={styles.mainContainer}>
            {props.children}
          </main>
        </>
      )}
    </div>
  );
};
