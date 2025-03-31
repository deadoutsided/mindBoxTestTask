import styles from "./style.module.css";
import { memo, useCallback } from "react";

type RadioButtonProps = {
  title: string;
  value: string;
  name: string;
  id: number;
  setActiveValue: (radioName: string) => void;
};

function RadioButton({ title, value, name, id, setActiveValue }: RadioButtonProps) {
  //console.log(`${id} rerendered`)
  const onClick = useCallback(() => {
    setActiveValue(value)
  }, [setActiveValue])

  return (
    <label className={styles.RadioLabel} htmlFor={`${id}`} onClick={onClick}>
      <input
        id={`${id}`}
        type="radio"
        value={value}
        name={name}
        className={styles.RadioInput}
        defaultChecked={value === 'All'}
      />
      {title}
    </label>
  );
}

export default memo(RadioButton);
