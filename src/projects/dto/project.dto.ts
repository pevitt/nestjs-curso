import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IProject } from "src/interfaces/project.interface";

export class ProjectDto implements IProject{
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}

export class UpdateProjectDto implements IProject{

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

}