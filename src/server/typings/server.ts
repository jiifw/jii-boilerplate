// types
import { I181Decorator } from '@framework/plugins/i18n';
import { JWTRequestDecorator } from '@framework/plugins/jwt';
import { AccessTokenRequestDecorator } from '@framework/plugins/access-token';
import IdentityDecorator from '@framework/plugins/authenticate/classes/IdentityDecorator';
import { User } from '@app/sequelize/models';

export type ServerInstance = Partial<{
  auth: IdentityDecorator<typeof User>;
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
