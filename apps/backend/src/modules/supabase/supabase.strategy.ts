import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";
import { AuthUser } from "@supabase/supabase-js";
import { ApiConfigService } from "shared/services/api-config.service";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, "jwt") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private readonly logger = new Logger(SupabaseStrategy.name);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(private readonly configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.supabaseConfig.jwtSecret,
    });
  }

  async validate(user: AuthUser) {
    return user;
  }
}
