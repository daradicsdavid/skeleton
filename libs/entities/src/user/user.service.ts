import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import UserRepository from "./user.repository";
import {InjectRepository} from "@mikro-orm/nestjs";
import User from "./user.entity";
import {PageOptionsDto} from "@skeleton/common/pagination/page.options.dto";
import {PageDto} from "@skeleton/common/pagination/page.dto";
import UserDto from "./user.dto";
import {PageMetaDto} from "@skeleton/common/pagination/page.meta.dto";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {Roles} from "@skeleton/common/constants/roles.enum";

@Injectable()
export default class UserService {
  constructor(@InjectRepository(User) readonly repository: UserRepository, @InjectMapper() readonly mapper: Mapper) {
  }

  find(id: string) {
    return this.repository.findOne({id});
  }

  async update(id: string, name: string) {
    const user = await this.find(id);
    if (!user) {
      throw new BadRequestException();
    }
    user.name = name;
    await this.repository.flush();
    return user;
  }


  async create(name: string, role: Roles) {
    const user = await this.repository.findOne({name});
    if (user) {
      throw new BadRequestException();
    }
    const newUser = new User().assign({name, role})
    this.repository.persist(newUser)
    await this.repository.flush();
    return newUser;
  }


  public async getUsers(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.repository.createQueryBuilder("user");

    queryBuilder
      .orderBy({createdAt: pageOptionsDto.order})
      .offset(pageOptionsDto.offset)
      .limit(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const users = await queryBuilder.getResultList();

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

    return new PageDto(this.mapper.mapArray(users, User, UserDto), pageMetaDto);
  }

  public async getUser(id: string): Promise<UserDto> {
    const user = await this.repository.findOne({id});
    return this.mapper.map(user, User, UserDto);
  }

  async removeUser(id: string) {
    const user = await this.repository.findOne({id});
    if (user)
      await this.repository.removeAndFlush(user);
  }

  async findByName(name: string) {
    const user = await this.repository.findOne({name});
    if (!user)
      throw new UnauthorizedException()
    return user
  }
}
