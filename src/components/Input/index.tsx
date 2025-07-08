import { Input as InputUI } from "@vkontakte/vkui";

type InputType = {
  onChange: (value: string) => void;
  onKeyDown: () => void;
  value: string;
};

export const Input: React.FC<InputType> = ({ value, onChange , onKeyDown }) => {
  return (
    <div>
      <InputUI
        type="text"
        placeholder="Add a new task..."
        data-testid="new-task-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
        disabled={false}
      />
    </div>
  );
};
