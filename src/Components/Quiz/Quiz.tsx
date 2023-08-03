import React, { useState, useEffect } from 'react';
import { KanjiData2 } from '../../types';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import quizPanda from '../../images/quiz-panda.png';
import './Quiz.css';
import QuizCard from '../QuizCard/QuizCard';

interface QuizProps {
  pendingKanji: KanjiData2[],
  savedKanji: KanjiData2[],
  setPendingKanji : React.Dispatch<React.SetStateAction<KanjiData2[]>>
}

const Quiz: React.FC<QuizProps> = ({setPendingKanji, pendingKanji, savedKanji}) => {

  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [quizSet, setQuizSet] = useState<KanjiData2[]>([]);
  const [correctCards, setCorrectCards] = useState<KanjiData2[]>([]);
  const [incorrectCards, setIncorrectCards] = useState<KanjiData2[]>([]);

  const sortCards = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentCard:KanjiData2) => {
    const value = (e.target as HTMLInputElement).value;

    if(value === 'correct') {
      console.log('heree')
      setCorrectCards(prev => [...prev, currentCard])
    } else {
      setIncorrectCards(prev => [...prev, currentCard])
    }
  }

  const checkKanjiLength = (): boolean => {
    if (savedKanji.length >= 5) {
      return true
    } else {
      return false;
    }
  }
  
  const startQuiz = () => {
    setQuizMode(true);
  }

  const allSavedMode = () => {
    setQuizSet(savedKanji);
    setStart(true)
  }

  const onlyPendingMode = () => {
    console.log(pendingKanji)
    setQuizSet(pendingKanji)
    setStart(true)
  }

  useEffect(() => {
    setCorrectCards([])
    setIncorrectCards([])
    setPendingKanji(savedKanji.filter(k => k.studied === false))
  },[start])

  return (
    <div className='main-container'>
      <main className='dashboard'>
        <h1 className='header'>Quiz Mode</h1>
        <article className='info-saved-box'>
          <p className='info-text'>Quiz yourself on Kanji English Meanings</p>
        </article>
        {!checkKanjiLength() ? <div className='error-box'><ErrorMsg message={"Must save at least 5 kanji to start quiz!"}/></div>
        : <button className={`start-btn ${quizMode ? 'hidden' : ""}`} onClick={startQuiz}>Start Quiz!</button>}
        {quizMode && !start &&
        <section className='quiz-box'>
          <div className='check-container'><label className='info-text'>Which kanji would you like to study?</label></div>
          <div className='btn-container'>
            <button onClick={allSavedMode} className='save-btn'>ALL SAVED KANJI</button>
            <button onClick={onlyPendingMode} className='save-btn'>KANJI NOT LEARNED YET</button>
          </div>
        </section>}
        {!quizMode && <img className='quiz-panda' src={quizPanda} />}
        {quizSet.length > 0 && start && <QuizCard correctCards={correctCards} setStart={setStart} sortCards={sortCards} quizSet={quizSet}/>}
      </main>
    </div>
  )
}

export default Quiz