import styles from './JoinView.module.css'

type Props = {
  onJoin: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const JoinView = ({ onJoin }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.crown}>👑</div>
      <h1 className={styles.logo}>Wild Trivia</h1>

      <form className={styles.form} onSubmit={onJoin}>
        <input
          className={styles.input}
          name="username"
          placeholder="Your name"
          required
        />
        <input
          className={styles.button}
          type="submit"
          name="submit"
          id="submit"
          value="Join Game"
        />
      </form>
    </div>
  )
}
