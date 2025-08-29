import classnames from 'classnames'

import styles from './ButtonGroup.module.css'

type Props = {
  suffix?: string;
  selected: string | number | undefined;
  items: (string | number)[];
  disabled?: boolean;
  onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonGroup = ({
  suffix,
  items,
  selected,
  onChange,
  disabled = false,
}: Props) => (
  <div
    className={classnames(styles.container, { [styles.disabled]: disabled })}
  >
    {items.map((item) => (
      <button
        key={item}
        value={item}
        onClick={onChange}
        disabled={disabled}
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
