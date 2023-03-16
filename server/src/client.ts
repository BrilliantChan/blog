// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import {feathers} from '@feathersjs/feathers';
import type {TransportConnection, Application} from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';
import type {AuthenticationClientOptions} from '@feathersjs/authentication-client';

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the mine-blog-server app.
 *
 * @param {TransportConnection<ServiceTypes>} connection The REST or Socket.io Feathers client connection
 * @param {Partial<AuthenticationClientOptions>} authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns {ClientApplication} The Feathers client application
 */
export const createClient = <Configuration = any>(
    connection: TransportConnection<ServiceTypes>,
    authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
    const client: ClientApplication = feathers();

    client.configure(connection);
    client.configure(authenticationClient(authenticationOptions));
    client.set('connection', connection);

    return client;
};
