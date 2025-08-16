import styles from './ButtonGroup.module.css'

type Props = { items: string[] };

export const ButtonGroup = ({ items }: Props) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <button key={item} className={styles.button}>
        <span className={styles.content}>
          <span className="truncate">{item}</span>
        </span>
      </button>
    ))}
  </div>
)
