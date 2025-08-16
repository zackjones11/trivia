import styles from './RecapPopup.module.css'

export const RecapPopup = () => (
  <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.count}>Q1</div>
      <div className={styles.incorrect}>-</div>
      <div className={styles.crossIcon}>✗</div>
    </div>
    <div className={styles.item}>
      <div className={styles.count}>Q2</div>
      <div className={styles.incorrect}>Ten</div>
      <div className={styles.crossIcon}>✗</div>
    </div>
    <div className={styles.item}>
      <div className={styles.count}>Q3</div>
      <div className={styles.correct}>Richard Branson</div>
      <div className={styles.checkIcon}>✓</div>
    </div>
    <div className={styles.item}>
      <div className={styles.count}>Q4</div>
      <div className={styles.correct}>A body pillow</div>
      <div className={styles.checkIcon}>✓</div>
    </div>
    <div className={styles.item}>
      <div className={styles.count}>Q5</div>
      <div className={styles.correct}>India Pale Ale</div>
      <div className={styles.checkIcon}>✓</div>
    </div>
  </div>
)
