import { useState } from "react";

import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";
import { Tasks } from "./components/Task";

import styles from "./App.module.css";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addNewTask(newTaskTitle: string) {
    const id = new Date().getTime().toString();
    const newTask: Task = { id, title: newTaskTitle, isCompleted: false };
    setTasks((state) => [...state, newTask]);
  }

  function removeTask(taskId: string) {
    setTasks((state) => {
      return state.filter((taskItem) => taskItem.id !== taskId);
    });
  }

  function toggleStateCompleteTask(taskId: string) {
    setTasks((state) => {
      return state.map((taskItem) => {
        if (taskItem.id === taskId) {
          return {
            ...taskItem,
            isCompleted: !taskItem.isCompleted,
          };
        }
        return taskItem;
      });
    });
  }

  return { tasks, addNewTask, removeTask, toggleStateCompleteTask };
}

export function App() {
  const { tasks, addNewTask, removeTask, toggleStateCompleteTask } = useTasks();

  return (
    <main className={styles.app}>
      <Header />
      <NewTask onCreateNewTask={addNewTask} />
      <Tasks
        onCompleteTask={toggleStateCompleteTask}
        onRemoveTask={removeTask}
        tasks={tasks}
      />
    </main>
  );
}
