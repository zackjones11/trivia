import classnames from 'classnames'

import styles from './ButtonGroup.module.css'

type Props = {
  suffix?: string;
  selected: string | number | undefined;
  items: (string | number)[];
  onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonGroup = ({ suffix, items, selected, onChange }: Props) => (
  <div className={styles.container}>
    {items.map((item) => (
      <button
        key={item}
        value={item}
        onClick={onChange}
        className={classnames({
          [styles.button]: item !== selected,
          [styles.buttonSelected]: item === selected,
        })}
      >
        <span className={styles.content}>
          <span className="truncate">
            {item}
            {suffix}
          </span>
        </span>
      </button>
    ))}
  </div>
)
