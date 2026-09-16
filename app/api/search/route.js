import { NextResponse } from 'next/server';
import { scrapeMangaList } from '../../../src/doujindesu.js';

export async function GET() {
  try {
    // Memanggil scraper doujindesu untuk list manga utama
    const data = await scrapeMangaList({});

    // Ekstrak array dari berbagai kemungkinan struktur response scraper
    const rawList = Array.isArray(data) 
      ? data 
      : (data?.mangas || data?.list || data?.data || []);

    const results = rawList.map((item) => ({
      title: item.title || item.name || 'Tanpa Judul',
      thumb: item.thumb || item.image || item.cover || '',
      chapter: item.chapter || item.latestChapter || '',
      type: item.type || 'Manga',
      endpoint: item.endpoint || item.url || '',
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Manga fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}