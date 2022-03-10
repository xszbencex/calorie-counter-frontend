import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/header.module.css';
import {Button} from '@mui/material';
import React, {useContext, useEffect, useRef} from 'react';
import DrawerContext from '../../store/drawer-context';
import {useKeycloak} from '@react-keycloak/ssr';
import {CCKecyloakInstance} from '../../types/CCKecyloakInstance';
import {primaryColor} from '../../constants/colors';

export const Header = () => {
  const drawerContext = useContext(DrawerContext);
  const {keycloak} = useKeycloak<CCKecyloakInstance>();
  const headerRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    keycloak?.logout({redirectUri: `${location.origin}/`});
  };

  const login = () => {
    keycloak?.login({redirectUri: `${location.origin}/home`});
  };

  const register = () => {
    keycloak?.register({redirectUri: `${location.origin}/home`});
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
                <Image src={'/logo2 copy.png'} width={80} height={60} alt={'Logo'}/>
              </a>
            </Link>
          </div>

          <div className={styles.profile}>
            {keycloak?.authenticated ? (
              <>
                <span style={{textTransform: 'capitalize', fontSize: 'large'}}>
                  {`${keycloak.tokenParsed?.family_name} ${keycloak.tokenParsed?.given_name}`}
                </span>
                <Button onClick={() => logout()} sx={{ml: 2}}>Kilépés</Button>
              </>
            ): (
              <>
                <Button onClick={() => register()}>Regisztrálás</Button>
                <Button onClick={() => login()} sx={{ml: 2}}>Belépés</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
