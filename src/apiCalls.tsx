const getKanji = async () => {
  const res = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
      'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
    }
  });

  if(!res.ok) {
    console.log('this i sthe error', res.statusText);
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

export { getSingleKanji, getKanji }