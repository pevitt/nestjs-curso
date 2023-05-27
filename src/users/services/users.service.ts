import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.managers';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(UsersProjectsEntity)
        private readonly userProjectRepository: Repository<UsersProjectsEntity>,
      ) { }

    public async createUser(body: UserDto): Promise<UsersEntity>{
      try {
        body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT); 
        return await this.userRepository.save(body);
      } catch (error) {
          throw new Error(error);
      }
    }

    public async relationToProject(body: UserToProjectDTO){
      try {
        return await this.userProjectRepository.save(body);
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
    }

    public async findUsers(): Promise<UsersEntity[]> {
        try {
          const Users:UsersEntity[] = await this.userRepository.find();
          if(Users.length === 0){
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No se encontro resultados'
            });
          }
          return Users;
        } catch (error) {
          throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    public async findUserById(id: string): Promise<UsersEntity> {
        try {
            const User:UsersEntity = await this.userRepository
            .createQueryBuilder('user')
            .where({ id })
            .leftJoinAndSelect('user.projectsIncludes','projectsIncludes')
            .leftJoinAndSelect('projectsIncludes.project','project')
            .getOne();
            if(!User){
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No se encontro usuario'
              });
            }
            return User;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async updateUser(
        body: UserUpdateDTO,
        id: string,
    ): Promise<UpdateResult | undefined> {
        try {
          const user: UpdateResult = await this.userRepository.update(id, body);
          if (user.affected === 0) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No encontrado'
            });
          }
          return user.raw;
        } catch (error) {
          throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        
        try {
          const user: DeleteResult = await this.userRepository.delete(id);
          if (user.affected === 0) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No encontrado'
            });
          }
          return user;
        } catch (error) {
          throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findBy({ key, value }:{key:keyof UserDto; value}){
      try {
        const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .addSelect('user.password')
          .where({ [key]: value })
          .getOne()
        return user
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
    }

}
