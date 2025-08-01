import './styles.css'

type Props = {
  onJoin: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (val: string) => void;
};

export const JoinView = ({ onJoin, onChange }: Props) => {
  return (
    <>
      <h1>Join Game</h1>
      <form onSubmit={onJoin}>
        <input
          name="username"
          placeholder="Enter your name"
          required
          onChange={(event) => onChange(event.currentTarget.value)}
        />
        <input type="submit" name="submit" id="submit" value="Join" />
      </form>
    </>
  )
}
