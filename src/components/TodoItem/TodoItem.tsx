import styles from "./style.module.css";
import CheckMark from "../../assets/checkmark.svg?react";
import { memo, useCallback, } from "react";

type TodoItemProps = {
  title: string;
  completed: boolean;
  id: number;
  setStatus: (todoId: number) => void;
};

function TodoItem({ title, completed, id, setStatus }: TodoItemProps) {

  //console.log(`${id} rerendered`)
  const onButtonClick = useCallback(() => {
    setStatus(id)
  }, [setStatus])

  return (
    <div className={styles.todoWrapper}>
      <button className={styles.todoButton} onClick={onButtonClick}>
        {completed  && <CheckMark className={styles.checkMark} />}
      </button>
      <p
        className={
          styles.todoTitle +
          " " +
          (completed ? styles.todoTitleCompleted : "")
        }
      >
        {title}
      </p>
    </div>
  );
}

export default memo(TodoItem);
