/**
 * Fastify i18n Plugin
 */

import { I18n, ConfigurationOptions } from 'i18n';

// types
// @ts-ignore
import { ServerInstance, ServerReply, ServerRequest } from '@typings/server';
// @ts-ignore
import { RenameByT } from '@typings/utility';
// @ts-ignore
import { plugin } from '@typings/plugin';
// @ts-ignore
import { getBoolValue, getArrayValue, getValue } from '@framework/env';
// @ts-ignore
import { importPluginConfig, rootDir, resolveAliasDir } from '@framework/utils/alias-resolver';

export type I181Options = ConfigurationOptions;
export type I181Decorator = RenameByT<{
  __: 't',
  __n: 'tn',
  __h: 'tl',
  __l: 'th',
  __mf: 'tmf',
}, I18n>

const i18n = new I18n();

export const info: plugin.Info = {
  id: 'i18n',
  name: 'fastify-i18n',
};

export const handler: plugin.Handler = async (server, options) => {
  const I18N_LOGGING_MISSING = getBoolValue('I18N_LOGGING_MISSING', false);
  const I18N_LOGGING_OTHER = getBoolValue('I18N_LOGGING_OTHER', false);

  const config = await importPluginConfig<I181Options>(info.id, server, {
    locales: getArrayValue('I18N_LANGUAGES', ['en']),
    defaultLocale: getValue<string>('I18N_DEFAULT_LANGUAGE', 'en'),
    directory: await resolveAliasDir('@app/locales'),
    directoryPermissions: '0775',
    autoReload: true,
    updateFiles: false,
    missingKeyFn(locale, value) {
      I18N_LOGGING_MISSING && console.log('[i18n.missing]:', value, locale);
      return value;
    },
    logDebugFn(msg) {
      I18N_LOGGING_OTHER && console.log('[i18n.debug]:', msg);
    },

    logWarnFn(msg) {
      I18N_LOGGING_OTHER && console.log('[i18n.warn]:', msg);
    },

    logErrorFn(msg) {
      I18N_LOGGING_OTHER && console.log('[i18n.error]:', msg);
    },
    api: {
      __: 't',
      __n: 'tn',
      __h: 'tl',
      __l: 'th',
      __mf: 'tmf',
    },
  });

  const i18nDecorator = {};

  i18n.configure({
    ...config,
    register: i18nDecorator,
  });

  server.decorateRequest('i18n', null);
  server.decorateReply('i18n', null);

  server.addHook('onRequest', async (request: ServerRequest, reply: ServerReply) => {
    // @ts-ignore
    request.i18n = i18nDecorator;
    // @ts-ignore
    reply.i18n = i18nDecorator;
  });
};
