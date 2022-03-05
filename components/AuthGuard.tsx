import {useKeycloak} from '@react-keycloak/ssr';
import {KeycloakInstance} from 'keycloak-js';
import {useEffect, useState} from 'react';
import { PageLoading } from './layout/page-loading';
import {useRouter} from 'next/router';

export default function AuthGuard(props: {children: JSX.Element}) {
  const {keycloak} = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!keycloak?.authenticated && url !== '/') {
        router.events.emit('routeChangeError');
        router.push('/').then(() => setLoading(false));
        throw 'Protected route, this error is thrown on purpose';
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    if (router.route === '/') {
      setLoading(false);
    } else {
      if (keycloak?.authenticated) {
        setLoading(false);
      } else {
        router.push('/').then(() => setLoading(false));
      }
    }

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [keycloak]);

  if (loading) {
    return <PageLoading/>;
  }

  return (
    <>
      {props.children}
    </>
  );
}
