import { module } from '../auto-modules/types';

// types
import { HTTPMethods } from 'fastify';
// @ts-ignore
import { ServerInstance } from '@framework/types/server';

export const processRoutes = async (routes: module.Controller, server: ServerInstance): Promise<void> => {
  for await (const route of routes) {
    const urlMap: Array<string> = [];

    const [method = 'GET', uri = ''] = <[HTTPMethods, string]>route[0].split(' ');
    const hasMethod = Boolean(uri.trim());

    urlMap.push(...(hasMethod ? uri : method).split('/'));

    let url = urlMap.filter(v => v.trim()).join('/').trim();
    !url.startsWith('*') && (url = `/${url}`);

    server.route({
      method: <any>hasMethod ? method : 'GET',
      url,
      handler: route[1],
      ...(route[2] || {}),
    });
  }
};
