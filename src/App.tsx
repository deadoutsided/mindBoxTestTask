import { TodoItem } from "./components/TodoItem";
import { initialTodos, TodoData } from "./utils/initialTodos";
import styles from "./App.module.css";
import {
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { RadioButton } from "./components/RadioButton";
import { TodoInfo } from "./components/TodoInfo";
import { sortVariants } from "./utils/filterData";

function App() {
  const createTodoRef = useRef<HTMLInputElement>(null);

  const [todosData, setTodoData] = useState<TodoData[]>(initialTodos);
  const [sort, setSort] = useState("All");

  const todosLeft = useMemo(
    () =>
      todosData.reduce((prev, curr) => {
        if (curr.completed === false) prev += 1;
        return prev;
      }, 0),
    [todosData]
  );

  const callbacks = {

    setTodoStatus: useCallback<(todoId: number) => void>((todoId) => {
      setTodoData((prevTodos: TodoData[]) => {
        const newTodos = prevTodos.map((el) => {
          const newItem = { ...el };
          if (el.id === todoId) {
            newItem.completed = !newItem.completed;
          }
          return { ...newItem };
        });
        return newTodos;
      });
    }, []),

    addTodo: useCallback(
      (todo: TodoData) => {
        setTodoData((prev) => [...prev, todo]);
      },
      [setTodoData]
    ),

    deleteCompleted: useCallback(() => {
      setTodoData((prev) => prev.filter((el) => el.completed !== true))
    }, [setTodoData]),

    onInputEnter: useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.currentTarget.value) {
        const newTodo: TodoData = {
          title: e.currentTarget.value,
          completed: false,
          id: todosData.reduce((prev, curr) => {
            if (prev <= curr.id) return curr.id + 1;
            else return prev
          }, 0),
        };
        callbacks.addTodo(newTodo)
        e.currentTarget.value = ''
      }
    }, [todosData]),
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.mainInput}
        ref={createTodoRef}
        type="text"
        placeholder="What needs to be done?"
        onKeyUp={callbacks.onInputEnter}
      />
      <div className={styles.todosList}>
      {todosData.filter((el) => {
        if(sort === 'All') return el;
        if(sort === 'Active' && !el.completed) return el
        if(sort === 'Completed' && el.completed) return el
      }).map((el) => {
        return (
          <TodoItem
            title={el.title}
            id={el.id}
            completed={el.completed}
            setStatus={callbacks.setTodoStatus}
            key={el.id}
          />
        );
      })}
      </div>
      <TodoInfo todosLeft={todosLeft} deleteCompleted={callbacks.deleteCompleted}>
        {sortVariants.map((el) => {
          return <RadioButton 
          title={el.title}
          id={el.id}
          value={el.value}
          name={el.name}
          setActiveValue={setSort} 
          key={el.id} />
        })}
      </TodoInfo>
    </div>
  );
}

export default App;
