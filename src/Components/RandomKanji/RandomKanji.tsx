import React, { useEffect, useState } from 'react';
import './RandomKanji.css';
import unchecked from'../../images/check.png';
import checked from '../../images/check-filled.png';
import { useLocation } from 'react-router-dom';
import { KanjiData, KanjiData2, KanjiResponse} from '../../types';
import { getSavedKanji, patchStudied } from '../../apiCalls';

interface RandomKanjiProps {
  studiedKanji?: KanjiData2[],
  setStudiedKanji?: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  mainKanji: any,
  saveKanji: ( user:string, kanji: KanjiData ) => Promise<void>,
  savedKanji: KanjiData2[],
  setPendingKanji?: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  user: string 
}

const RandomKanji: React.FC<RandomKanjiProps> = ({setPendingKanji, user, setStudiedKanji, studiedKanji, mainKanji, saveKanji, savedKanji}) => {
 const location = useLocation();
 const studied = studiedKanji?.some(k => k.k_id === mainKanji?.k_id);

 useEffect(() => {
  console.log(studiedKanji?.some(k => {
    // console.log('kid', k.k_)
    return k.k_id === mainKanji?.k_id
  }))
},[])


useEffect(() => {
  console.log('studied', studiedKanji)
console.log('min', mainKanji)
}, [studiedKanji])


 const handleClick = (user: string, mainKanji: KanjiData)=> {
  saveKanji(user, mainKanji)
 }

 const toggleStudied = () => {
  patchStudied(user, mainKanji.k_id).then(data => {
    console.log(data)
    setStudiedKanji && setStudiedKanji(data.data.filter((k: KanjiResponse) => k.studied));
    setPendingKanji && setPendingKanji(data.data.filter((k: KanjiResponse) => !k.studied));
  })

 }
 
  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
      {location.pathname.includes('saved') && 
          <div className='check-container'>
            <p className='studied-text'><b>Studied?</b></p>
            <img onClick={toggleStudied} className='check-icon' src={studied ? checked : unchecked} alt="check button icon"/>
          </div>}
        <p className='main-char'>{mainKanji?.k_utf ? mainKanji?.k_utf : mainKanji?.ka_utf}</p>
        <div className='description'>
          <p><b>Meaning:</b> <i>{mainKanji?.meaning}</i></p>
          <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{mainKanji?.onyomi}</i></p>
          <p className='mainKanji-text'><b>Kunyomi Pronounciation:</b> <i>{mainKanji?.kunyomi}</i></p>
        </div>
        {mainKanji && <button className='save-btn' onClick={() => {handleClick(user, mainKanji)}}>{savedKanji?.some(k => k._id === mainKanji._id) ? "Unsave" : "Save"} Kanji</button>}
      </div>
    </section>
  )
}

export default RandomKanji