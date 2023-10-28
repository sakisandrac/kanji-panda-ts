import Homepage from '../Homepage/Homepage';
import SavedKanji from '../SavedKanji/SavedKanji';
import Nav from '../Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKanji, getSingleKanji, saveKanji } from '../../apiCalls';
import { cleanUpData, getRandNum } from '../../utils';
import SearchPage from '../SearchPage/SearchPage';
import './App.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType } from '../../types';
import Quiz from '../Quiz/Quiz';

const App: React.FC = () => {
  const [mainKanji, setMainKanji] = useState<KanjiData>();
  const [kanjiSet, setKanjiSet] = useState<KanjiData[]>([]);
  const [savedKanji, setSavedKanji] = useState<KanjiData2[]>(JSON.parse(localStorage.getItem("savedKanji")!) || []);
  const [error, setError] = useState<ErrorType>({error: false, message: ""});
  const [studiedKanji, setStudiedKanji] = useState<KanjiData2[]>(JSON.parse(localStorage.getItem("studiedKanji")!) || []);
  const [pendingKanji, setPendingKanji] = useState<KanjiData2[]>(JSON.parse(localStorage.getItem("pendingKanji")!) || []);
  const [getNewSet, setGetNewSet] = useState<boolean>(false);
  const [user, setUser] = useState<string>("user2");

  useEffect(() => {
    localStorage.setItem("savedKanji", JSON.stringify(savedKanji))
    localStorage.setItem("studiedKanji", JSON.stringify(studiedKanji))
    localStorage.setItem("pendingKanji", JSON.stringify(pendingKanji))
}, [savedKanji, pendingKanji, studiedKanji])

const getKanjiSet = async () => {
  const kData = await getKanji()
  const set = []
  for (let i = 0; i < 5; i++) {
    set.push(kData[getRandNum(kData.length)].kanji.character);
  }
  return set
}

const getKanjiDetails = async (k: any) => {
  const data = await getSingleKanji('kanji', k);
  setKanjiSet(prev => [...prev, cleanUpData(data)]);
  setMainKanji(data);
  console.log(data)
}

useEffect(() => {

  getKanjiSet().then(set => {
    set.forEach(k => {
      try {
        getKanjiDetails(k)
      } catch (err) {
        setError({ error: true, message: `${err}` });
      }
    })
  }).catch(err => setError({ error: true, message: `${err}` }))
}, [getNewSet])

  const changeMainKanji = (kanji: KanjiData) => {
    setMainKanji(kanji);
  }
  
  // const saveKanji = (kanji: KanjiData) => {
  //   const isSaved = savedKanji.find(saved => {
  //     return saved._id === kanji._id;
  //   })

  //   const kanjiData = {...kanji, studied: false}
  //   if (!isSaved) {
  //     setSavedKanji(prev => [...prev, kanjiData]);
  //     setPendingKanji(prev => [...prev, kanjiData]);
  //   } else {
  //     const filteredKanji = savedKanji.filter(k => k._id !== kanji._id);
  //     setSavedKanji(filteredKanji);
  //     setPendingKanji(filteredKanji);
  //   }
  // }

  return (
    <>
    <div className="App">
      <Nav />
    </div>
    <Routes>
      <Route path="/" element={
        <Homepage
          setPendingKanji={setPendingKanji}
          studiedKanji={studiedKanji} 
          setStudiedKanji={setStudiedKanji}
          error={error}
          setKanjiSet={setKanjiSet} 
          savedKanji={savedKanji} 
          saveKanji={saveKanji}
          user={user} 
          kanjiSet={kanjiSet} 
          mainKanji={mainKanji}
          setGetNewSet={setGetNewSet}
          changeMainKanji={changeMainKanji}/>} />
      <Route path="/saved" element={<SavedKanji pendingKanji={pendingKanji} user={user} setPendingKanji={setPendingKanji} studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} savedKanji={savedKanji} saveKanji={saveKanji}/>}/>
      <Route path="/search" element={<SearchPage user={user} saveKanji={saveKanji} savedKanji={savedKanji}/>}/>
      <Route path="/quiz" element={<Quiz setPendingKanji={setPendingKanji} savedKanji={savedKanji} pendingKanji={pendingKanji} />}/>
      <Route path="*" element={<ErrorMsg message={"404"} />}/>
    </Routes>
  </>
  );
}

export default App;
