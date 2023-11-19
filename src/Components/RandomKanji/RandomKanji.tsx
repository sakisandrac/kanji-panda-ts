import React, { useEffect, useState } from 'react';
import './RandomKanji.css';
import unchecked from '../../images/check.png';
import checked from '../../images/check-filled.png';
import { useLocation } from 'react-router-dom';
import { KanjiData, KanjiData2, KanjiResponse, SaveKanjiResponse } from '../../types';
import { getSavedKanji, patchStudied } from '../../apiCalls';

interface RandomKanjiProps {
  studiedKanji?: KanjiData2[],
  setStudiedKanji?: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  mainKanji: any,
  saveKanji: (user: string, kanji: KanjiData) => Promise<SaveKanjiResponse>,
  savedKanji: KanjiData2[],
  setPendingKanji?: React.Dispatch<React.SetStateAction<KanjiData2[]>>,
  user: string,
  setSavedKanji: React.Dispatch<React.SetStateAction<KanjiData2[] | KanjiResponse[]>>
}

const RandomKanji: React.FC<RandomKanjiProps> = ({ setPendingKanji, user, setSavedKanji, setStudiedKanji, studiedKanji, mainKanji, saveKanji, savedKanji }) => {
  const location = useLocation();
  const studied = studiedKanji?.some(k => k.k_id === mainKanji?.k_id);
  const [error, setError] = useState<boolean>(false);
  const [unsave, setUnsave] = useState<boolean>(false);

  const handleClick = () => {
    saveKanji(user, mainKanji).then(data => {
      setSavedKanji(data.data)
      setUnsave(true);
    })
  }

  useEffect(() => {
    return () => setUnsave(false);
  }, [mainKanji])

  const toggleStudied = () => {
    patchStudied(user, mainKanji.k_id).then(data => {
      setError(false);
      console.log('data?', data.data)
      setSavedKanji(data.data)
      setStudiedKanji && setStudiedKanji(data.data.filter((k: KanjiResponse) => k.studied));
      setPendingKanji && setPendingKanji(data.data.filter((k: KanjiResponse) => !k.studied));
    })
      .catch(err => {
        setError(true);
      })
  }

  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
        {location.pathname.includes('saved') &&
          <div className='check-container'>
            {error && <p>An error occured, please refresh!</p>}
            <p className='studied-text'><b>Studied?</b></p>
            <img onClick={toggleStudied} className='check-icon' src={studied ? checked : unchecked} alt="check button icon" />
          </div>}
        <p className='main-char'>{mainKanji?.k_utf ? mainKanji?.k_utf : mainKanji?.ka_utf}</p>
        <div className='description'>
          <p><b>Meaning:</b> <i>{mainKanji?.meaning}</i></p>
          <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{mainKanji?.onyomi}</i></p>
          <p className='mainKanji-text'><b>Kunyomi Pronounciation:</b> <i>{mainKanji?.kunyomi}</i></p>
        </div>
        {mainKanji && <button className='save-btn' onClick={handleClick}>{savedKanji?.some(k => k.k_id === mainKanji.k_id) ? "Unsave" : "Save"} Kanji</button>}
        {unsave && <p>Kanji Saved!</p>}
      </div>
    </section>
  )
}

export default RandomKanji