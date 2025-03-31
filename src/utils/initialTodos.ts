export type TodoData = {
  title: string;
  id: number;
  completed: boolean;
};

export const initialTodos: TodoData[] = [
  {
    id: 1,
    title: "task1",
    completed: true,
  },
  {
    id: 2,
    title: "task2",
    completed: false,
  },
  {
    id: 3,
    title: "task3",
    completed: true,
  },
  {
    id: 4,
    title: "task4",
    completed: false,
  },
];
