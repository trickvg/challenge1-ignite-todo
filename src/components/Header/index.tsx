import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="ToDo App Logo" />
    </header>
  );
}
