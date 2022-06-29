import { REQUEST_CONTEXT_KEY } from '@common/constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Permission } from '@vendure/common/lib/generated-types';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';

// import { ConfigService } from '../../config/config.service';
// import { CachedSession } from '../../config/session-cache/session-cache-strategy';
// import { Customer } from '../../entity/customer/customer.entity';
// import { ChannelService } from '../../service/services/channel.service';
// import { CustomerService } from '../../service/services/customer.service';
// import { SessionService } from '../../service/services/session.service';
// import { extractSessionToken } from '../common/extract-session-token';
import { parseContext } from '../common/parse-context';
import { RequestContext } from '../common/request-context';
import { RequestContextService } from '../common/request-context.service';
// import { setSessionToken } from '../common/set-session-token';
// import { PERMISSIONS_METADATA_KEY } from '../decorators/allow.decorator';

/**
 * @description
 * A guard which:
 *
 * 1. checks for the existence of a valid session token in the request and if found,
 * attaches the current User entity to the request.
 * 2. enforces any permissions required by the target handler (resolver, field resolver or route),
 * and throws a ForbiddenError if those permissions are not present.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  strategy: any;

  constructor(private reflector: Reflector, private requestContextService: RequestContextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res, info } = parseContext(context);
    const isFieldResolver = this.isFieldResolver(info);
    // const permissions = this.reflector.get<Permission[]>(
    //   PERMISSIONS_METADATA_KEY,
    //   context.getHandler(),
    // );
    // if (isFieldResolver && !permissions) {
    //   return true;
    // }

    //todo fix it
    const authDisabled = true; //this.configService.authOptions.disableAuth;
    // const isPublic = !!permissions && permissions.includes(Permission.Public);
    // const hasOwnerPermission = !!permissions && permissions.includes(Permission.Owner);
    let requestContext: RequestContext;
    if (isFieldResolver) {
      requestContext = (req as any)[REQUEST_CONTEXT_KEY];
    } else {
      //   const session = await this.getSession(req, res, hasOwnerPermission);
      requestContext = await this.requestContextService.fromRequest(req);

      (req as any)[REQUEST_CONTEXT_KEY] = requestContext;
    }

    if (authDisabled) {
      return true;
    } else {
      return true;
      //   const canActivate =
      //     requestContext.userHasPermissions(permissions) || requestContext.authorizedAsOwnerOnly;
      //   if (!canActivate) {
      //     // throw new ForbiddenError();
      //   } else {
      //     return canActivate;
      //   }
    }
  }

  //   private async getSession(
  //     req: Request,
  //     res: Response,
  //     hasOwnerPermission: boolean,
  //   ): Promise<CachedSession | undefined> {
  //     const sessionToken = extractSessionToken(req, this.configService.authOptions.tokenMethod);
  //     let serializedSession: CachedSession | undefined;
  //     if (sessionToken) {
  //       serializedSession = await this.sessionService.getSessionFromToken(sessionToken);
  //       if (serializedSession) {
  //         return serializedSession;
  //       }
  //       // if there is a token but it cannot be validated to a Session,
  //       // then the token is no longer valid and should be unset.
  //       setSessionToken({
  //         req,
  //         res,
  //         authOptions: this.configService.authOptions,
  //         rememberMe: false,
  //         sessionToken: '',
  //       });
  //     }

  //     if (hasOwnerPermission && !serializedSession) {
  //       serializedSession = await this.sessionService.createAnonymousSession();
  //       setSessionToken({
  //         sessionToken: serializedSession.token,
  //         rememberMe: true,
  //         authOptions: this.configService.authOptions,
  //         req,
  //         res,
  //       });
  //     }
  //     return serializedSession;
  //   }

  /**
   * Returns true is this guard is being called on a FieldResolver, i.e. not a top-level
   * Query or Mutation resolver.
   */
  private isFieldResolver(info?: GraphQLResolveInfo): boolean {
    if (!info) {
      return false;
    }
    const parentType = info?.parentType?.name;
    return parentType !== 'Query' && parentType !== 'Mutation';
  }
}
