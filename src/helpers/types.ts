export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoFilterTypes = "all" | "active" | "completed";
