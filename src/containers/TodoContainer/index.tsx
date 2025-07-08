import { FilterView } from "../../components/FilterView";
import { Input } from "../../components/Input";
import { TodoList } from "../../components/TodoList";

import { useInput } from "../../hooks/useInput";
import { useTodos } from "../../hooks/useTodos";

import "./styles.scss";

export const TodoContainer = () => {
  const { value, setValue } = useInput();
  const {
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    changeFilter,
    clearCompleted,
  } = useTodos();

  const handleAddTodo = () => {
    if (!value.trim()) return;

    addTodo(value);

    setValue("");
    setFilter("all");
  };

  return (
    <div className="todo">
      <div className="todo__input">
        <Input value={value} onChange={setValue} onKeyDown={handleAddTodo} />
      </div>
      <div className="todo__list">
        <TodoList data={filtered} onCheckboxToggle={toggleTodo} />
      </div>
      <div className="todo__filters">
        <FilterView
          filteredCounter={
            filter === "all"
              ? filtered.filter((todo) => !todo.completed).length
              : filtered.length
          }
          filter={filter}
          onFilterChange={changeFilter}
          onClearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
};
