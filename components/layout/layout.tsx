import {Header} from './header';
import {ReactElement} from 'react';
import styles from '../../styles/layout.module.css';
import Sidebar from './sidebar';
import {DrawerContextProvider} from '../../store/drawer-context';

export const Layout = (props: { children: ReactElement }) => {
  return (
    <div className={styles.pageContainer}>
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
    </div>
  );
};
