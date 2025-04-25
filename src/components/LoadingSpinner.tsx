import styles from "../styles/loading.module.scss";

const LoadingSpinner = ({ progress }: { progress: number }) => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner} />
      <div className={styles.progress}>{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingSpinner;
