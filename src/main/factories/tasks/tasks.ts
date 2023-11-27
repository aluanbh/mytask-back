import { TasksController } from "@/app/controllers/tasks/tasksController"

export const tasksController = (): TasksController => {
  return new TasksController()
}