import { HttpResponse } from '@/app/protocols';
import { Controller } from '../controller';
import { ValidationBuilder } from '@/app/validation/builder';
import { Validator } from '@/app/validation';
import { mock } from '@/main/database/mock';
import fs from 'fs';

export class TasksController extends Controller {
	constructor() {
		super();
	}

	async perform(httpRequest: any): Promise<HttpResponse> {
		try {
			const { title, description, tags, userId } = httpRequest.body;
			let data: any = null;
			let message = '';

			switch (httpRequest.method.value) {
				case 'POST':
					const newTask = {
						id: mock.tasksData.length + 1,
						title,
						description,
						createdAt: new Date().toISOString().substring(0, 10),
						tags,
						userId,
					};

					mock.tasksData.push(newTask);

					message = 'Tarefa cadastrada com sucesso!';
					break;

				case 'GET':
					if (httpRequest.params.id) {
						const taskId = parseInt(httpRequest.params.id);

						const task = mock.tasksData.find((task) => task.id === taskId);

						if (!task) {
							return { statusCode: 404, data: { message: 'Task not found' } };
						}

						const taskWithUser = task.userId
							? {
									...task,
									responsible: mock.usersData.find(
										(user) => user.id === task.userId,
									),
							  }
							: task;

						if (taskWithUser.userId) {
							delete (taskWithUser as { userId?: number }).userId;
						}

						data = taskWithUser;

						if (data.responsible) data.responsible.password = undefined;

						return { statusCode: 200, data };
					} else {
						const tasks = mock.tasksData;

						const tasksWithUser = tasks.map((task) => {
							const responsible = mock.usersData.find(
								(user) => user.id === task.userId,
							);

							const responsibleWithoutPassword = responsible
								? { ...responsible, password: undefined }
								: null;

							return { ...task, responsible: responsibleWithoutPassword };
						});

						tasksWithUser.forEach((task) => {
							if (task.userId) {
								delete (task as { userId?: number }).userId;
							}
						});

						data = tasksWithUser;

						return { statusCode: 200, data: data };
					}

				case 'PUT':
					const task = mock.tasksData.find(
						(task) => task.id.toString() === httpRequest.params.id,
					);

					if (!task) return { statusCode: 404, data: { message: 'Task not found' } };

					// Verificar se veio algo no body

					if (!title && !description && !tags && !userId)
						return { statusCode: 400, data: { message: 'Nenhum dado para atualizar' } };

					const updatedTask = {
						id: task.id,
						title,
						description,
						createdAt: task.createdAt,
						tags,
						userId,
					};

					const taskIndex = mock.tasksData.findIndex(
						(task) => task.id.toString() === httpRequest.params.id,
					);

					mock.tasksData[taskIndex] = updatedTask;

					message = 'Tarefa atualizada com sucesso!';

					break;
				case 'DELETE':
					const taskIndexToDelete = mock.tasksData.findIndex(
						(task) => task.id.toString() === httpRequest.params.id,
					);

					if (taskIndexToDelete === -1)
						return { statusCode: 404, data: { message: 'Task not found' } };

					mock.tasksData.splice(taskIndexToDelete, 1);

					message = 'Tarefa removida com sucesso!';

					break;

				default:
					return { statusCode: 400, data: { message: 'Método não suportado' } };
			}

			// Atualize o arquivo mock.ts com os novos dados
			const updatedMockFileContent = `export const mock = ${JSON.stringify(
				mock,
				null,
				2,
			)};\n`;

			fs.writeFileSync('./src/main/database/mock.ts', updatedMockFileContent, 'utf-8');

			return { statusCode: 200, data: { success: true, message } };
		} catch (error) {
			console.error('Erro ao manipular tarefas:', error);
			return { statusCode: 500, data: { error: 'Erro interno do servidor' } };
		}
	}

	override buildValidators(httpRequest: any): Validator[] {
		if (httpRequest.method.value === 'POST' || httpRequest.method.value === 'PUT') {
			return [
				...ValidationBuilder.of({ value: httpRequest.body['title'], fieldName: 'title' })
					.required()
					.build(),
				...ValidationBuilder.of({
					value: httpRequest.body['description'],
					fieldName: 'description',
				})
					.required()
					.build(),
				...ValidationBuilder.of({ value: httpRequest.body['tags'], fieldName: 'tags' })
					.required()
					.build(),
			];
		}

		return [];
	}
}
