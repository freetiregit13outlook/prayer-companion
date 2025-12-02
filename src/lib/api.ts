// AlQuran Cloud API
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: string;
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export async function fetchAllSurahs(): Promise<Surah[]> {
  const response = await fetch('https://api.alquran.cloud/v1/surah');
  const data = await response.json();
  return data.data;
}

export async function fetchSurah(surahNumber: number): Promise<SurahDetail> {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  const data = await response.json();
  return data.data;
}

export async function fetchSurahWithTranslation(surahNumber: number): Promise<{ arabic: SurahDetail; english: SurahDetail }> {
  const [arabicRes, englishRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`),
  ]);
  
  const arabicData = await arabicRes.json();
  const englishData = await englishRes.json();
  
  return {
    arabic: arabicData.data,
    english: englishData.data,
  };
}
