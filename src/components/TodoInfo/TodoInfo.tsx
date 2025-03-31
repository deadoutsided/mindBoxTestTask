import plural from "../../utils/plural";
import styles from "./style.module.css";
import { JSX, memo, useCallback } from "react";

type TodoInfoProps = {
  todosLeft: number;
  deleteCompleted: () => void;
  children: JSX.Element | JSX.Element[];
};

function TodoInfo({ todosLeft, deleteCompleted, children }: TodoInfoProps) {
  //console.log(`${id} rerendered`)
  const onClick = useCallback(() => {
    deleteCompleted()
  }, [deleteCompleted])

  return (
    <div className={styles.infoWrapper} >
      <p className={styles.infoParagraph}>{todosLeft} {plural(todosLeft, {one: 'item', other: 'items'})} left</p>
      {children}
      <button className={styles.infoButtonClear} type='button' onClick={onClick}>Clear completed</button>
    </div>
  );
}

export default memo(TodoInfo);
