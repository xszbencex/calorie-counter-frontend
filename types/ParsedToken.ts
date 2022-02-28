import {KeycloakTokenParsed} from 'keycloak-js';

export type ParsedToken = KeycloakTokenParsed & {
  email?: string
  given_name?: string
  family_name?: string
}
