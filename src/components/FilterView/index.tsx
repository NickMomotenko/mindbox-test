import { Button } from "@vkontakte/vkui";

import "./styles.scss";

type FilterViewProps = {
  filter: string;
  filteredCounter?: string | number;
  onFilterChange: any;
  onClearCompleted: any;
};

export const FilterView: React.FC<FilterViewProps> = ({
  filter,
  filteredCounter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <div className="filter">
      <div className="filter__counter">{filteredCounter} left</div>
      <div className="filter__buttons">
        {["all", "active", "completed"].map((label: string , ind) => {
          return (
            <div className="filter__button" key={ind}>
              <Button
                onClick={() => onFilterChange(label)}
                activated={filter === label}
                mode="secondary"
              >
                {label}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="filter__clear">
        <Button mode="secondary" onClick={onClearCompleted}>
          Clear completed
        </Button>
      </div>
    </div>
  );
};
