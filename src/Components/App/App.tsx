import Homepage from '../Homepage/Homepage';
import SavedKanji from '../SavedKanji/SavedKanji';
import Nav from '../Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKanji, getSavedKanji, getSingleKanji, saveKanji } from '../../apiCalls';
import { cleanUpData, getRandNum } from '../../utils';
import SearchPage from '../SearchPage/SearchPage';
import './App.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { KanjiData, KanjiData2, ErrorType, KanjiResponse } from '../../types';
import Quiz from '../Quiz/Quiz';

const App: React.FC = () => {
  const [mainKanji, setMainKanji] = useState<KanjiData>();
  const [kanjiSet, setKanjiSet] = useState<KanjiData[]>([]);
  const [savedKanji, setSavedKanji] = useState<KanjiData2[]>([]);
  const [error, setError] = useState<ErrorType>({error: false, message: ""});
  const [studiedKanji, setStudiedKanji] = useState<KanjiData2[]>([]);
  const [pendingKanji, setPendingKanji] = useState<KanjiData2[]>([]);
  const [getNewSet, setGetNewSet] = useState<boolean>(false);
  const [user, setUser] = useState<string>("user2");

  useEffect(() => {
    getSavedKanji(user).then(data => {
      setSavedKanji(data.data)
      console.log(data.data)
      setStudiedKanji(data.data.filter((k: KanjiResponse) => k.studied))
      setPendingKanji(data.data.filter((k: KanjiResponse) => !k.studied))
    })
}, [])

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
