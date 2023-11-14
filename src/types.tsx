export interface KanjiData {
  _id: string,
  ka_utf: string,
  meaning: string,
  kunyomi: string,
  onyomi: string
}

export interface ErrorType {
  error: boolean, 
  message: string
}

export interface KanjiData2 {
  _id?: string,
  k_id?: string,
  ka_utf?: string,
  k_utf?: string,
  meaning: string,
  kunyomi: string,
  onyomi: string,
  studied: boolean
}

export interface KanjiResponse {
  k_id: string,
  k_utf: string,
  meaning: string,
  kunyomi: string,
  onyomi: string,
  studied: boolean,
  updated_at: string,
  created_at: string
}

export interface SaveKanjiResponse {
  data: KanjiResponse[]
}