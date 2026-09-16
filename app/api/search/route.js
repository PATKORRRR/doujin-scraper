import { NextResponse } from 'next/server';
import { scrapeMangaList } from '../../../src/doujindesu.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // Kalau ada query ketikan pakai search, kalau kosong ambil list default
    const data = await scrapeMangaList(query ? { query } : {});

    const results = (data?.mangas || data?.list || data || []).map((item) => ({
      title: item.title || item.name || 'Tanpa Judul',
      thumb: item.thumb || item.image || item.cover || '',
      chapter: item.chapter || item.latestChapter || '',
      type: item.type || 'Manga',
      endpoint: item.endpoint || item.url || '',
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}