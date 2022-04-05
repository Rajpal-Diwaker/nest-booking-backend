import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  private logger = new Logger('TaskService', { timestamp: true });
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async getTasks(user: User, filterDto?: GetTasksFilterDto): Promise<Task[]> {
    try {
      return await this.taskRepository.fetchAll(user, filterDto);
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}, error: ${error.stack}`,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.fetchOne(id, user);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return found;
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    await this.taskRepository.update(id, { status });
    return await this.getTaskById(id, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
  }

  //   async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
  //     return await this.taskRepository.createOne(createTaskDTO, user);
  //   }
}
