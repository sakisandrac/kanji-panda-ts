import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType } from '../../types';
import panda from '../../images/panda.png';

interface HomepageProps {
  studiedKanji: KanjiData2[]
  setStudiedKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  error: ErrorType,
  setKanjiSet: React.Dispatch<React.SetStateAction<KanjiData[]>>,
  mainKanji: KanjiData | undefined,
  kanjiSet: KanjiData[],
  changeMainKanji: (kanji: KanjiData) => void,
  saveKanji: (kanji: KanjiData) => void,
  savedKanji: KanjiData2[],
  setPendingKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>
}

const Homepage: React.FC<HomepageProps> = ({ setPendingKanji, studiedKanji, setStudiedKanji, error, setKanjiSet, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji }) => {

  const openModal = () => {
    const modal: HTMLDialogElement = document.querySelector('#aboutModal') as HTMLDialogElement
    modal.showModal()
  }

  const closeModal = () => {
    const modal: HTMLDialogElement = document.querySelector('#aboutModal') as HTMLDialogElement
    modal.close()
  }

  return (
    <div className='main-container'>
      <main className='dashboard'>
        <div className='about-container'>
          <button className='save-btn' onClick={openModal}>About this App</button>
          <img className='small-panda' src={panda} alt='panda icon' />
        </div>
        <h1 className='header'>Let's Study Kanji!</h1>
        <article className='info-home-box'><p className='info-text'>Click on a Kanji to see more details, and save!</p></article>
        <dialog id="aboutModal">
          <div className='modal-container'>
            <p className='chart-header'>About This Application</p>
            <p className='info-text'>
              Kanji Panda is the ultimate study companion for Japanese learners. Designed with a focus on enhancing your Japanese learning journey, Kanji Panda empowers users to delve into the fascinating world of kanji characters effortlessly. Whether you're a beginner or an advanced learner, this app offers a seamless experience to explore, study, and master kanji. With the ability to load random kanji or conduct targeted searches, you can effortlessly build a personalized kanji collection, saving them for future reference. As you progress, mark off each kanji you've studied, and easily track your learning achievements. The app also provides valuable insights, showcasing the number of kanji you've mastered, as well as those that still await your exploration. To further solidify your knowledge, an interactive quiz feature challenges you to test your understanding of the saved kanji. Embrace the Kanji Panda experience today and happy learning! 🐼</p>
              <p className='info-text'>Created by <a href="https://www.linkedin.com/in/saki-c-a7306b259/"><span className='linked'>Saki C</span></a></p>
              <button className='save-btn' onClick={closeModal}>Close</button>
          </div>
        </dialog>
        {error.error && <ErrorMsg message={error.message} />}
        <RandomKanji setPendingKanji={setPendingKanji} studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji} />
        <KanjiSet setKanjiSet={setKanjiSet} kanjiSet={kanjiSet} changeMainKanji={changeMainKanji} />
      </main>
    </div>
  )
}

export default Homepage