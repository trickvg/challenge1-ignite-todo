import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./NewTask.module.css";

interface NewTaskProps {
  onCreateNewTask: (title: string) => void;
}

const PLUS_CIRCLE_ICON_SIZE = 20;
const placeholderText = "Adicione uma nova tarefa";

export function NewTask({ onCreateNewTask }: NewTaskProps) {
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    onCreateNewTask(newTaskText);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <form className={styles.addTaskContainer} onSubmit={handleCreateNewTask}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholderText}
        value={newTaskText}
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
      />
      <button
        type="submit"
        aria-label="Criar nova tarefa"
        className={styles.button}
        disabled={isNewTaskEmpty}
      >
        Criar <PlusCircle size={PLUS_CIRCLE_ICON_SIZE} />
      </button>
    </form>
  );
}
