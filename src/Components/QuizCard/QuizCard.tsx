import React, { useEffect, useState } from 'react';
import { KanjiData2 } from '../../types';
import { getRandNum } from '../../utils';
import './QuizCard.css';
import happyPanda from '../../images/panda-happy.png'

interface QuizCardProps {
  quizSet: KanjiData2[],
  correctCards: KanjiData2[],
  sortCards: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentCard: KanjiData2) => void,
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

const QuizCard: React.FC<QuizCardProps>= ({correctCards, quizSet, sortCards, setStart}) => {

  const [remainingCards, setRemainingCards] = useState<KanjiData2[]>(quizSet);
  const [finishedCards, setFinishedCards] = useState<KanjiData2[]>([]);
  const [currentCard, setCurrentCard] = useState<KanjiData2[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<string>("");

  const initialSet = () => {
    if (remainingCards.length > 0) {
      console.log('initalset', remainingCards)
      const num = getRandNum(remainingCards.length)
      setRemainingCards(prev => prev.filter(k => k.k_id !== remainingCards[num].k_id));
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
      sortCards(e, currentCard[0]);
      setIsFinished(true);
    }
  }

  useEffect(()=> {
    initialSet()
  }, [])

  const revealAnswer = () => {
    setShowButtons(true)
  }

  const renderCards = () => {
    console.log('card', currentCard[0].k_utf)
    return (
      <div className='main-kanji'>
        <p className='main-char'>{currentCard[0].k_utf}</p>
        <div className='description'>
          {showButtons && <p>{currentCard[0].meaning}</p>}
          {!showButtons && <button onClick={revealAnswer} className='save-btn'>Reveal Answer</button>}
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log('remaining', remainingCards)
    console.log('finished', finishedCards)
    setFinalScore(calculateScore())
    console.log(correctCards)
  }, [isFinished])

  const restartQuiz = () => {
    setStart(false)
  }

  const calculateScore = () => {
    const total = quizSet.length
    const correct = correctCards.length
    return `You got ${correct}/${total} correct!`
  }

  return (
    <div className='card-page info-cards-box'>
      <article className='card-container'>
        {currentCard.length > 0 && !isFinished && renderCards()}
        {showButtons && !isFinished &&
          <div className='quiz-saved-box'>
            <p className='card-text'>I got this kanji:</p>
            <div className='btn-container'>
            <button value='incorrect' onClick={(e) => { getNextCard(e) }} className='save-btn'>Incorrect</button>
              <button value='correct' onClick={(e) => { getNextCard(e) }} className='save-btn'>Correct</button>
            </div>
        </div>}
        {isFinished && 
        <div className='card-container'>
          <p className='header'>You've Finished This Set!</p>
          <div className='check-container'><p className='score-text'>{finalScore}</p></div>
          <img className='happy-panda' src={happyPanda} alt="Happy panda icon" />
          <button className='again-btn' onClick={restartQuiz}>Try Again?</button>
        </div>}
      </article>
    </div>
  )
}

export default QuizCard