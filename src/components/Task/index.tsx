import { ClipboardText, Trash } from "phosphor-react";
import styles from "./Tasks.module.css";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

interface TasksProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}

const TRASH_ICON_SIZE = 24;
const CLIPBOARD_ICON_SIZE = 56;

export function Tasks({ tasks, onCompleteTask, onRemoveTask }: TasksProps) {
  function handleCheckChange(taskId: string) {
    onCompleteTask(taskId);
  }

  function handleRemoveTask(taskId: string) {
    onRemoveTask(taskId);
  }

  const totalTasksCreated = tasks.length;
  const totalTasksDone = tasks.reduce(
    (acc, cur) => acc + Number(cur.isCompleted),
    0,
  );

  return (
    <section className={styles.taskContainer}>
      <header className={styles.taskInfoContainer}>
        <p className={styles.infoTextCreated}>
          Tarefas criadas
          <span className={styles.taskInfoCounter}>{totalTasksCreated}</span>
        </p>
        <p className={styles.infoTextDone}>
          Concluídas
          <span aria-live="polite" className={styles.taskInfoCounter}>
            <>
              {totalTasksCreated === 0
                ? totalTasksCreated
                : `${totalTasksDone} de ${totalTasksCreated}`}
            </>
          </span>
        </p>
      </header>
      {tasks.length === 0 ? (
        <main className={styles.taskListEmpty}>
          <ClipboardText size={CLIPBOARD_ICON_SIZE} />
          <div>
            <p className={styles.boldText}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </main>
      ) : (
        <main className={styles.taskListContainer}>
          {tasks.map((task) => {
            return (
              <article key={task.id} className={styles.taskItemContainer}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={task.isCompleted}
                  aria-checked={task.isCompleted}
                  onChange={() => handleCheckChange(task.id)}
                />
                <p
                  className={
                    task.isCompleted
                      ? styles.titleTaskCompleted
                      : styles.titleTask
                  }
                >
                  {task.title}
                </p>
                {/* <Trash
                  role="button"
                  aria-label="Remover tarefa"
                  className={styles.removeButton}
                  size={TRASH_ICON_SIZE}
                  onClick={() => handleRemoveTask(task.id)}
                /> */}
                <button
                  aria-label="Remover tarefa"
                  className={styles.removeButton}
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <Trash size={TRASH_ICON_SIZE} />
                </button>
              </article>
            );
          })}
        </main>
      )}
    </section>
  );
}
