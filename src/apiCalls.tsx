import { KanjiData, KanjiResponse, SaveKanjiResponse } from "./types";

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

const saveKanji = async (user: string, kanji: any): Promise<SaveKanjiResponse> => {
  console.log(kanji)
  const res = await fetch(`https://kanji-panda-be.onrender.com/api/v1/kanji/`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      k_id: kanji._id || kanji.k_id,
      k_utf: kanji.ka_utf || kanji.k_utf,
      meaning: kanji.meaning,
      kunyomi: kanji.kunyomi,
      onyomi: kanji.onyomi,
      user_id: user
    })
  })

  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}

const getSavedKanji = async (user: string) => {
  console.log(user)
  const res = await fetch(`https://kanji-panda-be.onrender.com/api/v1/kanji/${user}`, {
    method: 'GET',
  })

  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}

const patchStudied = async (user: string, k_id: string) => {
  console.log(user, k_id)
  const res = await fetch(`https://kanji-panda-be.onrender.com/api/v1/kanji/`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user_id: user,
      k_id,
    })
  })


  if(!res.ok) {
    console.log(res.statusText);
    throw new Error(`${res.statusText} - Please Try Again`);
  };

  const data = await res.json();
  return data;
}


export { getSingleKanji, getKanji, saveKanji, getSavedKanji, patchStudied }