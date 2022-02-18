import {KeycloakConfig} from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
    realm: 'MAG',
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    clientId: 'login'
};
