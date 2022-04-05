import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });

  //   async createOne(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
  //     const { title, description } = createTaskDTO;
  //     const task = await this.create({
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //       user,
  //     });
  //     await this.save(task);
  //     return task;
  //   }

  async fetchOne(id: string, user: User): Promise<Task> {
    return await this.findOne({ where: { id, user } });
  }

  async fetchAll(user: User, filterDto?: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}, error: ${error.stack}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
