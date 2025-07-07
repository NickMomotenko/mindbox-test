import { Button } from "@vkontakte/vkui";

type FilterViewProps = {
  onFilterChange: any;
};

export const FilterView: React.FC<FilterViewProps> = ({ onFilterChange }) => {
  return (
    <div className="filter">
      {["all", "active", "completed"].map((label: string) => {
        return (
          <div className="filter__buttons">
            <div className="filter__button">
              <Button>{label}</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
