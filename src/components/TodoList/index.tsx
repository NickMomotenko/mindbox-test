import { Checkbox } from "@vkontakte/vkui";

import type { Todo } from "../../helpers/types";

import "./styles.scss";

type TodoListProps = {
  data: Todo[] | [];
  onCheckboxToggle: (id: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  data,
  onCheckboxToggle,
}) => {
  return (
    <div className="todo-list">
      <ul className="todo-list__body" data-testid="todo-list">
        {data?.map(({ id, completed, text }) => (
          <li
            className={`todo-list__item ${completed ? "completed" : ""}`}
            key={id}
          >
            <label className="todo-list__label">
              <div className="todo-list__checkbox">
                <Checkbox
                  checked={completed}
                  onChange={() => onCheckboxToggle(id)}
                />
              </div>
              <span className="todo-list__text">{text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
