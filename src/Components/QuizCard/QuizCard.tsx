import React, { useEffect, useState } from 'react';
import { KanjiData2 } from '../../types';
import { getRandNum } from '../../utils';
import './QuizCard.css';

interface QuizCardProps {
  quizSet: KanjiData2[],
  sortCards: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentCard: KanjiData2) => void,
}

const QuizCard: React.FC<QuizCardProps>= ({quizSet, sortCards}) => {

  const [remainingCards, setRemainingCards] = useState<KanjiData2[]>(quizSet);
  const [finishedCards, setFinishedCards] = useState<KanjiData2[]>([]);
  const [currentCard, setCurrentCard] = useState<KanjiData2[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);

  const initialSet = () => {
    if (remainingCards.length > 0) {
      const num = getRandNum(remainingCards.length)
      setRemainingCards(prev => prev.filter(k => k._id !== remainingCards[num]._id));
      setFinishedCards(prev => [...prev, remainingCards[num]]);
      setCurrentCard([remainingCards[num]]);
    }
  }

  const getNextCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (remainingCards.length > 0) {
      initialSet();
      sortCards(e, currentCard[0]);
      setShowButtons(false)
    } else {
      setIsFinished(true);
    }
  }

  useEffect(()=> {
    initialSet()
    console.log('here')
  }, [])

  const revealAnswer = () => {
    console.log('answer')
    setShowButtons(true)
  }

  const renderCards = () => {
    return (
      <div className='main-kanji'>
        <p className='main-char'>{currentCard[0].ka_utf}</p>
        <div className='description'>
          {showButtons && <p>{currentCard[0].meaning}</p>}
          {!showButtons && <button onClick={revealAnswer} className='save-btn'>Reveal Answer</button>}
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log('r', remainingCards)
    console.log('f', finishedCards)
  }, [remainingCards, finishedCards])

  return (
    <div className='card-page info-cards-box'>
      <article className='card-container'>
        {currentCard.length > 0 && renderCards()}
        {showButtons && !isFinished &&
          <div className='info-saved-box'>
            <p className='card-text'>I got this kanji:</p>
            <div className='btn-container'>
              <button value='correct' onClick={(e) => { getNextCard(e) }} className='save-btn'>Correct</button>
              <button value='incorrect' onClick={(e) => { getNextCard(e) }} className='save-btn'>Incorrect</button>
            </div>
        </div>}
        {isFinished && 
        <div className='card-container'>
          <p className='header'>You've Finished This Set!</p>
          <button className='again-btn'>Try Again?</button>
        </div>}

      </article>
    </div>
  )
}

export default QuizCard