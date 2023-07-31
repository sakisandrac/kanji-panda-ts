import Homepage from '../Homepage/Homepage';
import SavedKanji from '../SavedKanji/SavedKanji';
import Nav from '../Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { singleKanjiInfo } from '../../apiCalls';
import SearchPage from '../SearchPage/SearchPage';
import './App.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType } from '../../types';

const App: React.FC = () => {
  const [mainKanji, setMainKanji] = useState<KanjiData>();
  const [kanjiSet, setKanjiSet] = useState<KanjiData[]>([]);
  const [savedKanji, setSavedKanji] = useState<KanjiData2[]>([]);
  const [error, setError] = useState<ErrorType>({error: false, message: ""});
  const [studiedKanji, setStudiedKanji] = useState<KanjiData2[]>([]);

  useEffect(()=> {
    if (kanjiSet.length < 5) {
      singleKanjiInfo().then(data => {
        setKanjiSet(prev => [...prev, data]);
        setMainKanji(kanjiSet[0]);
        setError({error: false, message: ""});
      })
      .catch(err => {
        setError({error: true, message: `${err}`});
      })
    }

    setFiveKanji();

  }, [kanjiSet])

  const setFiveKanji = () => {
    if(kanjiSet.length === 6) {
      setKanjiSet(prev => {
        const copy = [...prev]
        prev.splice(5, 1)
        return copy
      })
    }
  }

  const changeMainKanji = (kanji: KanjiData) => {
    setMainKanji(kanji);
  }
  
  const saveKanji = (kanji: KanjiData) => {
    const isSaved = savedKanji.find(saved => {
      return saved._id === kanji._id;
    })

    const kanjiData = {...kanji, studied: false}
    if (!isSaved) {
      setSavedKanji(prev => [...prev, kanjiData]);
    } else {
      setSavedKanji(() => {
        const filteredKanji = savedKanji.filter(k => k._id !== kanji._id);
        return filteredKanji;
      })
    }
  }

  return (
    <>
    <div className="App">
      <Nav />
    </div>
    <Routes>
      <Route path="/" element={
        <Homepage
          studiedKanji={studiedKanji} 
          setStudiedKanji={setStudiedKanji}
          error={error}
          setKanjiSet={setKanjiSet} 
          savedKanji={savedKanji} 
          saveKanji={saveKanji} 
          kanjiSet={kanjiSet} 
          mainKanji={mainKanji} 
          changeMainKanji={changeMainKanji}/>} />
      <Route path="/saved" element={<SavedKanji studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} savedKanji={savedKanji} saveKanji={saveKanji}/>}/>
      <Route path="/search" element={<SearchPage saveKanji={saveKanji} savedKanji={savedKanji}/>}/>
      <Route path="*" element={<ErrorMsg message={"404"} />}/>
    </Routes>
  </>
  );
}

export default App;
