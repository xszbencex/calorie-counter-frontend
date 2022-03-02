import {KeycloakInstance, KeycloakTokenParsed} from 'keycloak-js';

export type CCKecyloakInstance = KeycloakInstance & {
  tokenParsed: KeycloakTokenParsed & {
    email?: string
    given_name?: string
    family_name?: string
  }
}
