import { KanjiData } from "./types";

const getKanji = async () => {
  const res = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
      'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
    }
  });

  if(!res.ok) {
    console.log('this is　the error', res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}

const getSingleKanji = async (type: string, char: string) => {
  const res = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/${type}/${char}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
      'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
    }
  })

  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}

const saveKanji = async (user: string, kanji: KanjiData) => {
  const res = await fetch(`http://localhost:3003/api/v1/kanji/`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      k_id: kanji._id,
      k_utf: kanji.ka_utf,
      meaning: kanji.meaning,
      kunyomi: kanji.kunyomi,
      onyomi: kanji.onyomi,
      user_id: user
    })
  })

console.log(res)
  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}

const getSavedKanji = async (user: string) => {
  const res = await fetch(`http://localhost:3003/api/v1/kanji/${user}`, {
    method: 'GET',
  })

console.log(res)
  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}


export { getSingleKanji, getKanji, saveKanji, getSavedKanji }