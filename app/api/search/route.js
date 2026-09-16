import { scrapeMangaList } from '../../../src/doujindesu.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const kataKunci = searchParams.get('q');

  const hasil = await scrapeMangaList({
    query: kataKunci || '',
    page: 1
  });

  return Response.json(hasil);
}