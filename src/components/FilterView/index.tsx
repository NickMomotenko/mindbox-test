import { Button } from "@vkontakte/vkui";

import "./styles.scss";

type FilterViewProps = {
  filter: string;
  onFilterChange: any;
};

export const FilterView: React.FC<FilterViewProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="filter">
      <div className="filter__counter">2 left</div>
      <div className="filter__buttons">
        {["all", "active", "completed"].map((label: string) => {
          return (
            <div className="filter__button">
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
        <Button mode="secondary">Clear completed</Button>
      </div>
    </div>
  );
};
