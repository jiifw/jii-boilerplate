// types
import { I181Decorator } from '@framework/plugins/i18n';
import { JWTRequestDecorator } from '@framework/plugins/jwt';
import { AccessTokenRequestDecorator } from '@framework/plugins/access-token';

export type ServerInstance = Partial<{
}>;

export type ServerRequest = Partial<{
  accessToken: AccessTokenRequestDecorator;
  jwt: JWTRequestDecorator;
  i18n: I181Decorator;
}>;

export type ServerReply = Partial<{
  i18n: I181Decorator;
}>;

export type ServerHTTPOptions = Partial<{}>;
