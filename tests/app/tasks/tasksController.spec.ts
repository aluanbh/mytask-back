import { TasksController } from "@/app/controllers/tasks/tasksController";
import { mock } from "@/main/database/mock";

import validator from "validator";

describe('TasksController', () => {
  let tasksController: TasksController;
  let fakeValidator: jest.Mocked<typeof validator>;

  beforeEach(() => {
    tasksController = new TasksController();
  });

  test('should create a new task', async () => {
    const response = await tasksController.perform({
      method: { value: 'POST' },
      body: { title: 'Nova Tarefa', description: 'Descrição da tarefa', tags: ['tag1'], userId: 1 || null },
    });

    expect(response.statusCode).toBe(200);
    expect(response.data.success).toBe(true);
  });
});
