import Link from 'next/link';
import styles from '../../styles/header.module.css';
import {Button} from '@mui/material';
import React, {useContext, useEffect, useRef} from 'react';
import DrawerContext from '../../store/drawer-context';
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKecyloakInstance} from '../../types/CCKecyloakInstance';

export const Header = () => {
  const drawerContext = useContext(DrawerContext);
  const {keycloak} = useKeycloak<CCKecyloakInstance>();
  const headerRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    keycloak?.logout();
  };

  const login = () => {
    keycloak?.login();
  };

  const register = () => {
    keycloak?.register();
  };

  useEffect(() => {
    if (headerRef.current) {
      drawerContext.setHeaderHeight(headerRef.current.clientHeight);
    }
  });

  return (
    <>
      <div className={styles.fixed} ref={headerRef}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Link href={'/'} passHref>
              <a>
                Kezdőlap
              </a>
            </Link>
          </div>

          <div className={styles.profile}>
            {keycloak?.authenticated ? (
              <>
                {`${keycloak.tokenParsed?.family_name} ${keycloak.tokenParsed?.given_name}`}
                <Button onClick={() => logout()}>Kilépés</Button>
              </>
            ): (
              <>
                <Button onClick={() => register()}>Regisztrálás</Button>
                <Button onClick={() => login()}>Belépés</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
