import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor() {}

  /**
   * Find single user
   */
  //   findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
  //     return this.userRepository.findOneBy(findData);
  //   }

  //   async findByUsernameOrEmail(
  //     options: Partial<{ username: string; email: string }>,
  //   ): Promise<UserEntity | null> {

  //   }
  //   async createUser(
  //     userRegisterDto: UserRegisterDto,
  //     file?: IFile,
  //   ): Promise<UserEntity> {
  //
  //   }

  //   async getUsers(
  //     pageOptionsDto: UsersPageOptionsDto,
  //   ): Promise<PageDto<UserDto>> {
  //     const queryBuilder = this.userRepository.createQueryBuilder('user');
  //     const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

  //     return items.toPageDto(pageMetaDto);
  //   }

  //   async getUser(userId: Uuid): Promise<UserDto> {
  //
  //   }

  //   async createSettings(
  //     userId: Uuid,
  //     createSettingsDto: CreateSettingsDto,
  //   ): Promise<UserSettingsEntity> {
  //
  //   }
}
