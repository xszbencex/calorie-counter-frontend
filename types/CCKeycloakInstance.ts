import {KeycloakInstance, KeycloakTokenParsed} from 'keycloak-js';

export type CCKeycloakInstance = KeycloakInstance & {
  tokenParsed: KeycloakTokenParsed & {
    email?: string
    given_name?: string
    family_name?: string
  }
}
