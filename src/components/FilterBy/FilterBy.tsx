import styles from "./FilterBY.module.css";

export default function FilterBy() {
  return (
    <select className={styles.select}>
      <option value="order">New first</option>
    </select>
  );
}
