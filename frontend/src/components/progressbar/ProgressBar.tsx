import styles from '@/components/progressbar/ProgressBar.module.css'; // CSS 모듈 사용

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  // 퍼센테이지 계산
  const percentage = (value / max) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${percentage}%` }} />
      <span
        className={styles.progressLabel}
      >{`${percentage.toFixed(0)}%`}</span>
    </div>
  );
};

export default ProgressBar;
