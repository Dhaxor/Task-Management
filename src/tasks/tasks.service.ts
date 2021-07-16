import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  // private tasks : Task[] = [];

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with  id ${id} Not Found`);
    }

    return found;
  }

  async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto, user);
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
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

  async deleteTask(id: number, user: User): Promise<void> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    const result = await this.taskRepository.delete(found);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
