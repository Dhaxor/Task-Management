import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Task[]{
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilter(filterDto);
        }
        else{
            return this.taskService.getallTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
        return this.taskService.getTaskById(id)

    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto) : Task{
       return this.taskService.createTask(CreateTaskDto);

    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string,@Body('status', TaskStatusValidationPipe) status: TaskStatus) : Task {
        return this.taskService.updateTask(id,status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) : void{
        this.taskService.deleteTask(id)
    }
}
