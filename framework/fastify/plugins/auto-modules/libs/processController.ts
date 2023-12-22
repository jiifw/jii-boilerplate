// @ts-ignore
import merge from 'deepmerge';

// utils
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { sanitizeRoute } from '@framework/utils/string';
// @ts-ignore
import { rootDir } from '@framework/utils/alias-resolver';
// @ts-ignore
import { isObject } from '@framework/utils/object';
import { validateRouteArgs } from '../utils';

// types
import { ControllerMapping, ModuleConfiguration } from '../types';
import { RouteOptions } from 'fastify';

export default async (controller: ControllerMapping, server: ServerInstance, config: ModuleConfiguration) => {
  const processor = await import(rootDir(controller.path));
  const controllerRoutes = await processor.default(server);

  if (!Array.isArray(controllerRoutes)) {
    throw new Error(`Controller routes must be an array`);
  }

  if (!controllerRoutes.length) {
    return;
  }

  const routePrefix: string = sanitizeRoute(String(config?.routeOptions?.prefix || '').trim());

  for await (const route of controllerRoutes) {
    validateRouteArgs(route);

    const urlMap: Array<string> = [];

    /** @type {string} */
    routePrefix && urlMap.push(routePrefix);

    urlMap.push(...config.id.split('/'));

    if (!['default'].includes(controller.name)) {
      urlMap.push(controller.name);
    }

    const [method = 'GET', uri = ''] = route[0].split(' ');
    const hasMethod = Boolean(uri.trim());

    urlMap.push(...(hasMethod ? uri : method).split('/'));

    const modRouteOptions = isObject(config?.routeOptions?.options)
      ? config?.routeOptions?.options : {};

    let url = urlMap.filter(v => v.trim()).join('/').trim();
    !url.startsWith('*') && (url = `/${url}`);

    if (url === '/') {
      url = `/${config.id}/${controller.name}`;
    }

    // clean up trailing slashes
    url = url.replace(/\/$/, '');

    let routeOptions = <RouteOptions>merge(modRouteOptions, {
      method: hasMethod ? method : 'GET',
      url,
      handler: route[1],
      ...(route[2] || {}),
    });

    if ('function' === typeof config?.routeOptions?.onRegister) {
      routeOptions = <RouteOptions>await config?.routeOptions?.onRegister(routeOptions.url, routeOptions);
    }

    server.route(routeOptions);
  }
};
