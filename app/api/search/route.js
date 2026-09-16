import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // 1. Import modul scraper secara dinamis
    const scraper = await import('../../../src/doujindesu.js').catch(async () => {
      // Fallback jika path ../.. salah
      return await import('../../src/doujindesu.js');
    });

    let rawData = [];

    // 2. Cek fungsi pencarian atau list yang tersedia di modul
    if (query) {
      if (typeof scraper.searchManga === 'function') {
        rawData = await scraper.searchManga(query);
      } else if (typeof scraper.search === 'function') {
        rawData = await scraper.search(query);
      } else if (typeof scraper.default === 'function') {
        rawData = await scraper.default(query);
      }
    } else {
      if (typeof scraper.scrapeMangaList === 'function') {
        rawData = await scraper.scrapeMangaList({});
      } else if (typeof scraper.getLatest === 'function') {
        rawData = await scraper.getLatest();
      } else if (typeof scraper.latest === 'function') {
        rawData = await scraper.latest();
      }
    }

    // 3. Normalisasi hasil response
    const list = Array.isArray(rawData)
      ? rawData
      : rawData?.mangas || rawData?.list || rawData?.data || rawData?.results || [];

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
    console.error('API Error Details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}