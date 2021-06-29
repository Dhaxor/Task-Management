import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks : Task[] = [];




    getallTasks() : Task[]{
      return this.tasks;
    }

    getTasksWithFilter(filterDto:GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getallTasks();

        if (status) {
         tasks = tasks.filter( task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter( task =>
                task.title.includes(search) || task.description.includes(search)
            )
            
        }
        return tasks;
    }

    getTaskById(id : string): Task{
        const found =  this.tasks.find( task => task.id === id)
        if(!found){
            throw new NotFoundException(`Task with  id ${id} Not Found`);
        } 
         return found
    }


    createTask(CreateTaskDto:CreateTaskDto) : Task {
        const {title,description} = CreateTaskDto
        const task: Task = {
            id:uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
        
    }
   //Get the status by Id, Update and return a new status
    updateTask(id:string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id : string): void{
        const found = this.getTaskById(id);
        this.tasks =  this.tasks.filter( task => task.id !== found.id)
     }
  
}
