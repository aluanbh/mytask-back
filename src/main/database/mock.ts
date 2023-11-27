export const mock = {
  usersData: [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
      createdAt: '2023-11-22',
      password: '$2b$10$AURgXzIhzKv5f8QyL/2RE.h0DKJ7C00ID1WdrW7qKgJh3n2.oRjPi',
    },
    {
      id: 2,
      name: 'Pedro Duarte',
      email: 'pedroduarte@gmail.com',
      createdAt: '2023-11-27',
      password: '$2b$10$ug6npgCs4myJvH5npn.sVOwkImQPOLtcf885BwNWM4lRTVFwhvcee',
    },
  ],
  tasksData: [
    {
      id: 1,
      title: 'Tarefa 1',
      description: 'Descrição da Tarefa 1',
      createdAt: '2023-11-25',
      tags: ['tag1', 'tag2'],
      userId: 1,
    },
  ],
};
