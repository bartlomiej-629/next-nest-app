import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// import type { RoleType } from '../constants';
// import type { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(private readonly reflector: Reflector) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(context: ExecutionContext): boolean {
    // will be fixed
    // const roles = this.reflector.get<RoleType[] | undefined>(
    //   'roles',
    //   context.getHandler(),
    // );

    // if (!roles?.length) {
    //   return true;
    // }

    // const request = context.switchToHttp().getRequest<{ user: UserEntity }>();
    // const user = request.user;

    // return roles.includes(user.role);
    return true;
  }
}
