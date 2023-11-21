import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType, SaveKanjiResponse, KanjiResponse } from '../../types';
import panda from '../../images/panda.png';

interface HomepageProps {
  studiedKanji: KanjiData2[]
  setStudiedKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  error: ErrorType,
  setKanjiSet: React.Dispatch<React.SetStateAction<KanjiData[]>>,
  mainKanji: KanjiData | undefined,
  kanjiSet: KanjiData[],
  changeMainKanji: (kanji: KanjiData) => void,
  saveKanji: (user:string, kanji: KanjiData) => Promise<SaveKanjiResponse>,
  user: string
  savedKanji: KanjiData2[],
  setPendingKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  setGetNewSet: React.Dispatch<React.SetStateAction<boolean>>,
  setSavedKanji: React.Dispatch<React.SetStateAction<KanjiData2[] | KanjiResponse[]>>
}

const Homepage: React.FC<HomepageProps> = ({ setGetNewSet, user, setSavedKanji, setPendingKanji, studiedKanji, setStudiedKanji, error, setKanjiSet, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji }) => {
  
  return (
    <div className='main-container'>
      <main className='dashboard'>
        <div className='about-container'>
          <img className='small-panda' src={panda} alt='panda icon' />
        </div>
        <h1 className='header'>Let's Study Kanji!</h1>
        <article className='info-home-box'><p className='info-text'>Click on a Kanji to see more details, and save!</p></article>
        {error.error && <ErrorMsg message={error.message} />}
        <RandomKanji setSavedKanji={setSavedKanji} setPendingKanji={setPendingKanji} studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} saveKanji={saveKanji} user={user} mainKanji={mainKanji} savedKanji={savedKanji} />
        <KanjiSet setGetNewSet={setGetNewSet} setKanjiSet={setKanjiSet} kanjiSet={kanjiSet} changeMainKanji={changeMainKanji} />
      </main>
    </div>
  )
}

export default Homepage