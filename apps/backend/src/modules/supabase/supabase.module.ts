import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SupabaseStrategy } from "./supabase.strategy";
import { SupabaseGuard } from "./supabase.guard";
import { Supabase } from "./supabase";
import { ApiConfigService } from "shared/services/api-config.service";

@Module({
  imports: [ConfigModule],
  providers: [Supabase, SupabaseStrategy, SupabaseGuard, ApiConfigService],
  exports: [Supabase, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
