import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectsEntity } from '../entities/projects.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectServices: ProjectsService){}

    @Get()
    async getAlls(): Promise<ProjectsEntity[]>{
        return await this.projectServices.findProjects();
    }

}
