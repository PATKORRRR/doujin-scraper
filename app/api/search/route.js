import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // Kalau query kosong, ambil dari /manga. Kalau ada query, panggil pencarian
    const targetUrl = query 
      ? `https://gaktahu-ten.vercel.app/api/search?q=${encodeURIComponent(query)}`
      : `https://gaktahu-ten.vercel.app/api/manga`;

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!res.ok) throw new Error('Gagal mengambil data dari sumber');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}