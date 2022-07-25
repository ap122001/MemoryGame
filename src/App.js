import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceone, setchoiceone] = useState(null);
  const [choicetwo, setchoicetwo] = useState(null);
  const [disabled, setdisabled] = useState(false);

  useEffect(() => {
    if (choiceone && choicetwo) {
      setdisabled(true);
      if (choiceone.src === choicetwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetdefault();
      } else {
        setTimeout(() => {
          resetdefault();
        }, 1000);
      }
    }
  }, [choiceone, choicetwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledcards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCards(shuffledcards);
    setTurns(0);
    setchoiceone(null);
    setchoicetwo(null);
  };

  //handle choice
  const handlechoice = (card) => {
    choiceone ? setchoicetwo(card) : setchoiceone(card);
  };

  //resetdefault
  const resetdefault = () => {
    setchoiceone(null);
    setchoicetwo(null);
    setTurns((prev) => prev + 1);
    setdisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handlechoice={handlechoice}
              flipped={card === choiceone || card === choicetwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p>{turns} turns</p>
    </div>
  );
}

export default App;
