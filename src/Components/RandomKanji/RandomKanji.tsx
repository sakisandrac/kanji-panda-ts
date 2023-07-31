import React from 'react';
import './RandomKanji.css';
import unchecked from'../../images/check.png';
import checked from '../../images/check-filled.png';
import { useLocation } from 'react-router-dom';
import { KanjiData, KanjiData2} from '../../types';

interface RandomKanjiProps {
  studiedKanji?: KanjiData2[],
  setStudiedKanji?: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  mainKanji: KanjiData | KanjiData2 | undefined,
  saveKanji:  (kanji: KanjiData) => void,
  savedKanji: KanjiData2[]
}

const RandomKanji: React.FC<RandomKanjiProps> = ({setStudiedKanji, studiedKanji, mainKanji, saveKanji, savedKanji}) => {
 const location = useLocation();

 const studied = studiedKanji?.some(k => k._id === mainKanji?._id);

 const addToStudied = (mainKanji: any) => {
   if (setStudiedKanji) {
     if (!studied) {
       mainKanji.studied = true;
       setStudiedKanji(prev => [...prev, mainKanji]);
     } else {
       mainKanji.studied = false;
       setStudiedKanji(prev => prev.filter(k => k._id !== mainKanji._id));
     }
   }
 }
 
  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
      {location.pathname.includes('saved') && 
          <div className='check-container'>
            <p className='studied-text'><b>Studied?</b></p>
            <img onClick={() => addToStudied(mainKanji)} className='check-icon' src={studied ? checked : unchecked} alt="check button icon"/>
          </div>}
        <p className='main-char'>{mainKanji?.ka_utf}</p>
        <div className='description'>
          <p><b>Meaning:</b> <i>{mainKanji?.meaning}</i></p>
          <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{mainKanji?.onyomi}</i></p>
          <p className='mainKanji-text'><b>Kunyomi Pronounciation:</b> <i>{mainKanji?.kunyomi}</i></p>
        </div>
        {mainKanji && <button className='save-btn' onClick={() => {saveKanji(mainKanji)}}>{savedKanji?.some(k => k._id === mainKanji._id) ? "Unsave" : "Save"} Kanji</button>}
      </div>
    </section>
  )
}

export default RandomKanji