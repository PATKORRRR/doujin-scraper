import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // Memanggil API publik doujindesu / target secara langsung
    const targetUrl = query
      ? `https://doujindesu.tv/?s=${encodeURIComponent(query)}`
      : `https://doujindesu.tv/manga/page/1/`;

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return NextResponse.json([]);
    }

    const html = await res.text();
    const results = [];

    // Parsing sederhana judul & gambar dari HTML
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)];
    const titleMatches = [...html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/g)];

    const limit = Math.min(imgMatches.length, titleMatches.length);
    for (let i = 0; i < limit; i++) {
      const thumb = imgMatches[i][1];
      const title = titleMatches[i][1].replace(/<[^>]*>/g, '').trim();

      if (title && thumb && !thumb.includes('logo') && !thumb.includes('avatar')) {
        results.push({
          title,
          thumb,
          type: 'MANHWA',
          rating: '8.8',
        });
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json([]);
  }
}