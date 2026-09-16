import { NextResponse } from 'next/server';
import { scrapeMangaList, searchManga } from '../../../src/doujindesu.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    let rawData;

    // Jika pengguna melakukan pencarian
    if (query) {
      rawData = await searchManga(query);
    } else {
      // Jika pertama kali dibuka (mengambil list awal)
      rawData = await scrapeMangaList({});
    }

    // Normalisasi struktur data
    const list = Array.isArray(rawData)
      ? rawData
      : rawData?.mangas || rawData?.list || rawData?.data || [];

    const results = list.map((item) => ({
      title: item.title || item.name || 'Tanpa Judul',
      thumb: item.thumb || item.image || item.cover || '',
      type: item.type || 'MANHWA',
      rating: item.rating || '8.8',
      chapter: item.chapter || item.latestChapter || '',
      endpoint: item.endpoint || item.url || '',
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}