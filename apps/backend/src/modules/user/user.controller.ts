import {
  Controller,
  //   Get,
  //   HttpCode,
  //   HttpStatus,
  //   Query,
  //   ValidationPipe,
} from "@nestjs/common";
import {
  // ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

// import { RoleType } from '../../constants';
// import {
//   // ApiPageResponse,
//   Auth,
//   AuthUser, // UUIDParam
// } from '../../decorators';
// import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service';
// // import { TranslationService } from '../../shared/services/translation.service';
// // import { UserDto } from './dtos/user.dto';
// import { UserEntity } from './user.entity';
// // import { UserService } from './user.service';

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor() {} // private readonly translationService: TranslationService, // private userService: UserService,

  //   @Get('admin')
  //   @Auth([RoleType.USER])
  //   @HttpCode(HttpStatus.OK)
  //   @UseLanguageInterceptor()
  //   async admin(@AuthUser() user: UserEntity) {
  //     const translation = await this.translationService.translate(
  //       'admin.keywords.admin',
  //     );

  //     return {
  //       text: `${translation} ${user.firstName}`,
  //     };
  //   }

  //   @Get()
  //   @Auth([RoleType.USER])
  //   @HttpCode(HttpStatus.OK)
  //   @ApiPageResponse({
  //     description: 'Get users list',
  //     type: PageDto,
  //   })
  //   getUsers(
  //     @Query(new ValidationPipe({ transform: true }))
  //     pageOptionsDto: UsersPageOptionsDto,
  //   ): Promise<PageDto<UserDto>> {
  //     return this.userService.getUsers(pageOptionsDto);
  //   }

  //   @Get(':id')
  //   @Auth([RoleType.USER])
  //   @HttpCode(HttpStatus.OK)
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     description: 'Get users list',
  //     type: UserDto,
  //   })
  //   getUser(@UUIDParam('id') userId: Uuid): Promise<UserDto> {
  //     return this.userService.getUser(userId);
  //   }
}
