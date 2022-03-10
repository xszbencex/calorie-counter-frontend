import '../styles/globals.css';
import cookie from 'cookie';
import type {AppContext, AppProps} from 'next/app';
import Head from 'next/head';
import {createTheme, ThemeProvider} from '@mui/material';
import {green, primaryColor, primaryDarkColor, secondary, white} from '../constants/colors';
import 'moment/locale/hu';
import moment from 'moment';
import DateAdapter from '@mui/lab/AdapterMoment';
import {huHU} from '@mui/material/locale';
import {LocalizationProvider} from '@mui/lab';
import {Layout} from '../components/layout/layout';
import {SSRCookies, SSRKeycloakProvider} from '@react-keycloak/ssr';
import {PageLoading} from '../components/layout/page-loading';
import {keycloakConfig} from '../constants/keycloakConfig';
import {IncomingMessage} from 'http';
import AuthGuard from '../components/AuthGuard';
import {DialogContextProvider} from '../store/dialog-context';

function MyApp({Component, pageProps, cookies}: AppProps & { cookies: unknown }) {
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: primaryColor,
          contrastText: white,
          dark: primaryDarkColor
        },
        secondary: {
          main: secondary,
          contrastText: white
        },
        success: {
          main: green
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: 'contained'
          }
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              backgroundColor: primaryColor,
              '&.Mui-selected': {
                backgroundColor: secondary
              },
              '&:hover': {
                backgroundColor: secondary,
                opacity: 0.95
              },
              '&.Mui-selected:hover': {
                backgroundColor: secondary,
                opacity: 0.95
              }
            },
          }
        }
      }
    },
    huHU,
  );

  return (
    <SSRKeycloakProvider
      persistor={SSRCookies(cookies)}
      keycloakConfig={keycloakConfig}
      LoadingComponent={<PageLoading/>}
    >
      <Head>
        <title>Kalória számláló</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale('hu')}>
          <DialogContextProvider>
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          </DialogContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SSRKeycloakProvider>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || '');
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req)
  };
};

export default MyApp;
