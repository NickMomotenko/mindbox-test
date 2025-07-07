import { FilterView } from "../components/FilterView";
import { Input } from "../components/Input";
import { TodoList } from "../components/TodoList";

import { useInput } from "../hooks/useInput";
import { useTodos } from "../hooks/useTodos";

export const TodoContainer = () => {
  const { value, setValue } = useInput();
  const { todos, addTodo, toggleTodo , changeFilter } = useTodos();

  const handleAddTodo = () => {
    if (!value.trim()) return;

    addTodo(value);

    setValue("");
  };

  return (
    <div className="todo">
      <div className="todo__input">
        <Input value={value} onChange={setValue} onKeyDown={handleAddTodo} />
      </div>
      <div className="todo__list">
        <TodoList data={todos} onCheckboxToggle={toggleTodo} />
      </div>
      <div className="todo__filters">
        <FilterView onFilterChange={changeFilter} />
      </div>
    </div>
  );
};
