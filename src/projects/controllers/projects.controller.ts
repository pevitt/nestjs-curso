import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectServices: ProjectsService){}


    @Post('register')
    public async registerUser(@Body() body: ProjectDto) {
        return await this.projectServices.createProject(body);
    }

    @Get('all')
    public async getAlls(): Promise<ProjectsEntity[]>{
        return await this.projectServices.findProjects();
    }
    
    @Get(':id')
    public async getById(@Param('id',new ParseUUIDPipe()) id: string){
        return await this.projectServices.findProjectsById(id);
    }

    @Put('edit/:id')
    public async updateProjects(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateProjectDto,
    ) {
        return await this.projectServices.updateProject(body, id);
    }
}
