import React, { useState, useEffect } from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './SavedKanji.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2 } from '../../types';
import { Link } from 'react-router-dom';
import Charts from '../Charts/Charts';

interface SavedKanjiProps {
  studiedKanji: KanjiData2[],
  setStudiedKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  saveKanji: (user: string, kanji: KanjiData) => Promise<void>,
  savedKanji: KanjiData2[],
  pendingKanji: KanjiData2[],
  setPendingKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>
  user: string
}

const SavedKanji: React.FC<SavedKanjiProps> = ({ pendingKanji, setPendingKanji, user, studiedKanji, setStudiedKanji, saveKanji, savedKanji }) => {
  const [viewMode, setViewMode] = useState<string>("saved");

  // useEffect(() => {
  //   console.log('studied', studiedKanji)
  //   console.log('peding', pendingKanji)
  // }, [studiedKanji, pendingKanji])

  const displayKanji = (view: string): any[] => {
    let kanjiSet: any[] = []

    if (view === "saved") {
      kanjiSet = savedKanji;
    };

    if (view === 'pending') {
      kanjiSet = pendingKanji;
    };

    if (view === 'learned') {
      kanjiSet = studiedKanji;
    };

    return kanjiSet;
  }

  const renderSaved = (view: string) => {
    if (displayKanji(view).length === 0) {
      return <ErrorMsg message={"Sorry! No Kanji here yet"} />
    }

    return displayKanji(view).map(k => {
      return (
        <RandomKanji key={k._id} setPendingKanji={setPendingKanji} setStudiedKanji={setStudiedKanji} studiedKanji={studiedKanji} mainKanji={k} saveKanji={saveKanji} user={user} savedKanji={savedKanji} />
      )
    })
  }

  const setView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMode(e.target.value);
    setPendingKanji(savedKanji.filter(k => k.studied === false));
  }

  const renderChart = () => {
    return (<Charts labels={['Studied', 'Not Studied Yet']} title={'Kanji Studied'} variables={[studiedKanji, pendingKanji]} />)
  }

  return (
    <div className='saved-page'>
      <main className='dashboard'>
        <h1 className='header'>My Kanji Learning</h1>
        <div className='saved-chart-container'>
          <article className='info-saved-box'>
            <p className='info-text'>Study your saved Kanji and check them off when you're done learning!</p>
            <Link className='quiz-link' to='/quiz'><button className='quiz-btn'>When you're ready, try our QUIZ</button></Link>
          </article>
          {savedKanji.length > 0 && renderChart()}
        </div>
        <div className='select-container'>
          <label className='select-label' htmlFor='view-select'>Currently Viewing:</label>
          <select id='view-select' onChange={(e) => { setView(e) }} className='type-select'>
            <option value='saved'>All Saved Kanji</option>
            <option value='pending'>To Study</option>
            <option value='learned'>Already Learned</option>
          </select>
        </div>
        <div className='saved-container'>
          {savedKanji.length > 0 ? renderSaved(viewMode) : <ErrorMsg message="You have not saved any kanji yet!" />}
        </div>
      </main>
    </div>
  )
}


export default SavedKanji