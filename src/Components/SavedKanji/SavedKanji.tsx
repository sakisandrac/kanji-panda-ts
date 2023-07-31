import React, { useState } from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './SavedKanji.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType } from '../../types';

interface SavedKanjiProps {
  studiedKanji: KanjiData2[]
  setStudiedKanji: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  saveKanji:  (kanji: KanjiData) => void,
  savedKanji: KanjiData2[]
}

const SavedKanji: React.FC<SavedKanjiProps> = ({studiedKanji, setStudiedKanji, saveKanji, savedKanji}) => {

  const [viewMode, setViewMode] = useState<string>("saved");
  const [pendingKanji, setPendingKanji] = useState<KanjiData2[]>([])

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
        <RandomKanji key={k._id} setStudiedKanji={setStudiedKanji} studiedKanji={studiedKanji} mainKanji={k} saveKanji={saveKanji} savedKanji={savedKanji} />
      )
    }
    )
  }

  const setView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMode(e.target.value);
    setPendingKanji(savedKanji.filter(k => k.studied === false));
  }

  return (
    <div className='saved-page'>
      <main className='dashboard'>
        <h1 className='header'>My Saved Kanji</h1>
        <article className='info-home-box'>Study your saved Kanji and check them off when you're done learning!</article>
        <div className='select-container'>
          <label className='select-label' htmlFor='view-select'>Currently Viewing:</label>
          <select id='view-select' onChange={(e) => { setView(e) }} className='type-select'>
            <option value='saved'>All Saved Kanji</option>
            <option value='pending'>To Study</option>
            <option value='learned'>Already Learned</option>
          </select>
        </div>
        <div className='saved-container'>
          {savedKanji.length > 0 ? renderSaved(viewMode) : <ErrorMsg message="You have not saved any kanji yet!"/>}
        </div>
      </main>
    </div>
  )
}


export default SavedKanji