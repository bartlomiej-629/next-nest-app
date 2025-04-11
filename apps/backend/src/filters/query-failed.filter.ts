import type { ExceptionFilter } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// @Catch(...)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch() {
    // host: ArgumentsHost, // exception: QueryFailedError & { constraint?: string },
    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    // const status = exception.constraint?.startsWith('UQ')
    //   ? HttpStatus.CONFLICT
    //   : HttpStatus.INTERNAL_SERVER_ERROR;
    // response.status(status).json({
    //   statusCode: status,
    //   error: STATUS_CODES[status],
    //   message: exception.constraint
    //     ? constraintErrors[exception.constraint]
    //     : undefined,
    // });
  }
}
