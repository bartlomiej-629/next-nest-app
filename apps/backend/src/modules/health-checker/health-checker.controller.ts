import { Controller, Get } from "@nestjs/common";
import type { HealthCheckResult } from "@nestjs/terminus";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

import { ServiceHealthIndicator } from "./health-indicators/service.indicator";

@Controller("health")
export class HealthCheckerController {
  constructor(
    private healthCheckService: HealthCheckService,
    // private ormIndicator: TypeOrmHealthIndicator, # TODO: Figure out if we need someting like this
    private serviceIndicator: ServiceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      // y() => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
      () => this.serviceIndicator.isHealthy("search-service-health"),
    ]);
  }
}
