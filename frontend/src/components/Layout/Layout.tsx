import styles from './Layout.module.css'

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
  <div className={styles.container}>{children}</div>
)
