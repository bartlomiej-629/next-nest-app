import { Inject, Injectable, Logger, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { ApiConfigService } from "shared/services/api-config.service";
import { ExtractJwt } from "passport-jwt";

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance!: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ApiConfigService,
  ) {}

  getClient() {
    this.logger.log("getting supabase client...");
    if (this.clientInstance) {
      this.logger.log("client exists - returning for current Scope.REQUEST");
      return this.clientInstance;
    }

    this.logger.log("initialising new supabase client for new Scope.REQUEST");

    const { url, anonKey } = this.configService.supabaseConfig;
    this.clientInstance = createClient(url, anonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(this.request)}`,
        },
      },
    });

    this.logger.log("auth has been set!");

    return this.clientInstance;
  }
}
