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
import Login from '../Login/Login';
import { gapi } from 'gapi-script';

const App: React.FC = () => {
  const [mainKanji, setMainKanji] = useState<KanjiData>();
  const [kanjiSet, setKanjiSet] = useState<KanjiData[]>([]);
  const [savedKanji, setSavedKanji] = useState<KanjiData2[] | KanjiResponse[]>([]);
  const [error, setError] = useState<ErrorType>({ error: false, message: "" });
  const [studiedKanji, setStudiedKanji] = useState<KanjiData2[]>([]);
  const [pendingKanji, setPendingKanji] = useState<KanjiData2[]>([]);
  const [getNewSet, setGetNewSet] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const clientId = "456181940726-60n8bgi8imq894m1j12u2frbp8me07po.apps.googleusercontent.com";

  useEffect(() => {
    if (user) {
      getSavedKanji(user).then(data => {
        setSavedKanji(data.data)
        setStudiedKanji(data.data.filter((k: KanjiResponse) => k.studied))
        setPendingKanji(data.data.filter((k: KanjiResponse) => !k.studied))
      })
    }
  }, [user])

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

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const logIn = (userID: string) => {
    setUser(userID);
  }

  const getKanjiSet = async () => {
    const kData = await getKanji();
    const set = [];
    for (let i = 0; i < 5; i++) {
      set.push(kData[getRandNum(kData.length)].kanji.character);
    }
    return set;
  }

  const getKanjiDetails = async (k: any) => {
    const data = await getSingleKanji('kanji', k);
    setKanjiSet(prev => [...prev, cleanUpData(data)]);
    setMainKanji(data);
  }

  const changeMainKanji = (kanji: KanjiData) => {
    setMainKanji(kanji);
  }

  return (
    <>
      <div className="App">
        <Nav logIn={logIn} user={user} />
      </div>
      <Routes>
        <Route path="/" element={user ?
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
            changeMainKanji={changeMainKanji}
            setSavedKanji={setSavedKanji} />
          : <Login logIn={logIn} />} />
        <Route path="/saved" element={user ? <SavedKanji setSavedKanji={setSavedKanji} pendingKanji={pendingKanji} user={user} setPendingKanji={setPendingKanji} studiedKanji={studiedKanji} setStudiedKanji={setStudiedKanji} savedKanji={savedKanji} saveKanji={saveKanji} /> : <Login logIn={logIn} />} />
        <Route path="/search" element={user ? <SearchPage setSavedKanji={setSavedKanji} user={user} saveKanji={saveKanji} savedKanji={savedKanji} /> : <Login logIn={logIn} />} />
        <Route path="/quiz" element={user ? <Quiz setPendingKanji={setPendingKanji} savedKanji={savedKanji} pendingKanji={pendingKanji} /> : <Login logIn={logIn} />} />
        <Route path="*" element={<ErrorMsg message={"404"} />} />
      </Routes>
    </>
  );
}

export default App;
