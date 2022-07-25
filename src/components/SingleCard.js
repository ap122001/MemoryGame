import "./SingleCard.css";

const SingleCard = ({ card, handlechoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) handlechoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" alt="card front" src={card.src} />
        <img
          className="back"
          onClick={handleClick}
          alt="card back"
          src="./img/cover.png"
        />
      </div>
    </div>
  );
};

export default SingleCard;
