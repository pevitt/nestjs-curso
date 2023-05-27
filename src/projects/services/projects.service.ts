import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectRepository: Repository<ProjectsEntity>,
    ){}

    public async createProject(body: ProjectDto): Promise<ProjectsEntity>{
        try {
            return await this.projectRepository.save(body);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async findProjects(): Promise<ProjectsEntity[]>{
        try {
            return this.projectRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    public async findProjectsById(id:string): Promise<ProjectsEntity>{
        try {
            return this.projectRepository
            .createQueryBuilder('project')
            .where({ id })
            .leftJoinAndSelect('project.usersIncludes','usersIncludes')
            .leftJoinAndSelect('usersIncludes.user','user')
            .getOne();
        } catch (error) {
            throw new Error(error);
        }
    }

    public async updateProject(
        body: UpdateProjectDto,
        id: string,
    ): Promise<UpdateResult | undefined> {
        try {
          const project: UpdateResult = await this.projectRepository.update(id, body);
          if (project.affected === 0) {
            return undefined;
          }
          return project;
        } catch (error) {
          throw new Error(error);
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        
        try {
          const project: DeleteResult = await this.projectRepository.delete(id);
          if (project.affected === 0) {
            return undefined;
          }
          return project;
        } catch (error) {
          throw new Error(error);
        }
    }

}
