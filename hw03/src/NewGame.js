const NewGame = ({ resetSecret }) => (
  <button onClick={resetSecret}>Reset Game</button>
);
NewGame.displayName = 'NewGame';

export default NewGame;
