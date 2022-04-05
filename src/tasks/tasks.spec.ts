import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

const mockTasksReposiotry = () => ({});

describe('TaskService', () => {
  let tasksService: TasksService;
  let taskRepository: Repository<Task>;

  //   beforeEach(async () => {
  //     const module = await Test.createTestingModule({
  //       providers: [TasksService, {
  //           provide: Repository<Task>, useFactory: mockTasksReposiotry
  //       }],
  //     });
  //   });
});
