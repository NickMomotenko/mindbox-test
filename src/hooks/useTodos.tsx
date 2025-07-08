import { useMemo, useState } from "react";

import type { Todo, TodoFilterTypes } from "../helpers/types";

import { useLocalStorage } from "./useLocalStorage";

import { mockedData } from "../helpers/mockedData";

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", mockedData);
  const [filter, setFilter] = useState<TodoFilterTypes>("all");

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const changeFilter = (value: TodoFilterTypes) => {
    setFilter(value);
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return {
    todos,
    filtered,
    filter,
    addTodo,
    toggleTodo,
    changeFilter,
    clearCompleted,
  };
};
