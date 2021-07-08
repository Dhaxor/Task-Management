import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Injectable()
export class TasksService {
  // private tasks : Task[] = [];

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
    }
  //     getallTasks() : Task[]{
  //       return this.tasks;
  //     }

  //     getTasksWithFilter(filterDto:GetTasksFilterDto): Task[] {
  //         const { status, search } = filterDto;

  //         let tasks = this.getallTasks();

  //         if (status) {
  //          tasks = tasks.filter( task => task.status === status);
  //         }
  //         if (search) {
  //             tasks = tasks.filter( task =>
  //                 task.title.includes(search) || task.description.includes(search)
  //             )

  //         }
  //         return tasks;
  //     }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with  id ${id} Not Found`);
    }

    return found;
  }

  //     getTaskById(id : string): Task{
  //         const found =  this.tasks.find( task => task.id === id)
  //         if(!found){
  //             throw new NotFoundException(`Task with  id ${id} Not Found`);
  //         }
  //          return found
  //     }

  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto);
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
  //    //Get the status by Id, Update and return a new status
  //     updateTask(id:string, status: TaskStatus): Task{
  //         const task = this.getTaskById(id);
  //         task.status = status;
  //         return task;
  //     }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with  id ${id} Not Found`);
    }
  }
}
