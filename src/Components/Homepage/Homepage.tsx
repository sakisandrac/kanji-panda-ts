import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType } from '../../types';

interface HomepageProps {
  studiedKanji: KanjiData2[]
  setStudiedKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  error: ErrorType,
  setKanjiSet: React.Dispatch<React.SetStateAction<KanjiData[]>>,
  mainKanji: KanjiData | undefined,
  kanjiSet: KanjiData[],
  changeMainKanji: (kanji: KanjiData) => void,
  saveKanji:  (kanji: KanjiData) => void,
  savedKanji: KanjiData2[]
}

const Homepage = ({studiedKanji, setStudiedKanji, error, setKanjiSet, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji}: HomepageProps) => {

  return (
    <div className='main-container'>
      <main className='dashboard'>
        <h1 className='header'>Let's Study Kanji!</h1>
        <article className='info-home-box'>Click on a Kanji to see more details, and save!</article>
        {error.error && <ErrorMsg message={error.message} />}
        <RandomKanji studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji}/>
        <KanjiSet setKanjiSet={setKanjiSet} saveKanji={saveKanji}  kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
      </main>
    </div>
  )
}

export default Homepage