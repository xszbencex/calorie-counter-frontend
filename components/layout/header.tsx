import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/header.module.css';
import {Button, Icon} from '@mui/material';
import React, {useContext, useEffect, useRef} from 'react';
import DrawerContext from '../../store/drawer-context';
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKeycloakInstance} from '../../types/CCKeycloakInstance';
import {primaryColor} from '../../constants/stlyes';

export const Header = () => {
  const drawerContext = useContext(DrawerContext);
  const {keycloak} = useKeycloak<CCKeycloakInstance>();
  const headerRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    keycloak?.logout({redirectUri: `${location.origin}/`});
  };

  const login = () => {
    keycloak?.login({redirectUri: `${location.origin}/daily-progress`});
  };

  const register = () => {
    keycloak?.register({redirectUri: `${location.origin}/daily-progress`});
  };

  useEffect(() => {
    if (headerRef.current) {
      drawerContext.setHeaderHeight(headerRef.current.clientHeight);
    }
  });

  return (
    <>
      <div className={styles.fixed} ref={headerRef}>
        <div className={styles.headerContainer} style={{backgroundColor: primaryColor}}>
          <div className={styles.logo}>
            <Link href={'/'} passHref>
              <a>
                <Image src={'/logo_white.png'} width={80} height={60} alt={'Logo'}/>
              </a>
            </Link>
          </div>

          <div className={styles.profile}>
            {keycloak?.authenticated ? (
              <>
                <span style={{textTransform: 'capitalize', fontSize: 'large'}}>
                  {`${keycloak.tokenParsed?.family_name} ${keycloak.tokenParsed?.given_name}`}
                </span>
                <Button onClick={() => logout()} sx={{ml: 2}} startIcon={<Icon>logout</Icon>}>Kilépés</Button>
              </>
            ): (
              <>
                <Button onClick={() => register()} startIcon={<Icon>person_add</Icon>}>Regisztráció</Button>
                <Button onClick={() => login()} sx={{ml: 2}} startIcon={<Icon>login</Icon>}>Belépés</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
