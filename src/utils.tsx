const getRandNum = (num: number) => {
  return Math.floor(Math.random() * num)
}

const cleanUpData = (data: any) => {
  return {
    _id: data._id,
    ka_utf: data.ka_utf,
    meaning: data.meaning,
    kunyomi: data.kunyomi,
    onyomi: data.onyomi
  }
}

export { getRandNum, cleanUpData }