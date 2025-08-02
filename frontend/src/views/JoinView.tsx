import './styles.css'

type Props = {
  onJoin: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const JoinView = ({ onJoin }: Props) => {
  return (
    <>
      <h1>Join Game</h1>
      <form onSubmit={onJoin}>
        <input name="username" placeholder="Enter your name" required />
        <input type="submit" name="submit" id="submit" value="Join" />
      </form>
    </>
  )
}
