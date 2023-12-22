// types
import { I181Decorator } from '@plugins/i18n';
import { JWTRequestDecorator } from '@plugins/jwt';
import { AccessTokenRequestDecorator } from '@plugins/access-token';

export type ServerInstance = Partial<{}>;

export type ServerRequest = Partial<{
  accessToken: AccessTokenRequestDecorator;
  jwt: JWTRequestDecorator;
  i18n: I181Decorator;
}>;

export type ServerReply = Partial<{
  i18n?: I181Decorator;
}>;

export type ServerHTTPOptions = Partial<{}>;
