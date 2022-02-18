import Link from 'next/link';
import styles from '../../styles/header.module.css';
import Icon from '@mui/material/Icon';
import {Button, ListItemIcon, Menu, MenuItem} from '@mui/material';
import React, {useContext, useEffect, useRef, useState} from 'react';
import DrawerContext from '../../store/drawer-context';
import {useKeycloak} from '@react-keycloak/ssr';
import {KeycloakInstance} from 'keycloak-js';

export const Header = () => {
  const drawerContext = useContext(DrawerContext);
  const {keycloak} = useKeycloak<KeycloakInstance>();
  const headerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    keycloak?.logout();
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
            <Button
              className={styles.profileMenu}
              variant="text"
              startIcon={<Icon>account_circle</Icon>}
              endIcon={<Icon>keyboard_arrow_down</Icon>}
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Név
            </Button>
            <Menu
              disableScrollLock
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              transformOrigin={{horizontal: 'left', vertical: 'top'}}>
              <MenuItem onClick={() => {
                logout();
                handleClose();
              }}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                Kilépés
              </MenuItem>
              <MenuItem onClick={() => {keycloak?.login();handleClose();}}>
                <ListItemIcon>
                  <Icon>login</Icon>
                </ListItemIcon>
                Belépés
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};
