'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [ketikan, setKetikan] = useState('');
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kategoriAktif, setKategoriAktif] = useState('Semua');

  // Ambil komik saat pertama kali web dibuka
  useEffect(() => {
    loadManga();
  }, []);

  const loadManga = async (queryStr = '') => {
    setLoading(true);
    try {
      const url = queryStr 
        ? `/api/search?q=${encodeURIComponent(queryStr)}`
        : '/api/manga';
      
      const res = await fetch(url);
      const data = await res.json();
      setDaftarKomik(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setDaftarKomik([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadManga(ketikan);
  };

  // Filter daftar komik berdasarkan tab yang dipilih
  const filteredKomik = daftarKomik.filter((item) => {
    if (kategoriAktif === 'Semua') return true;
    return (item.type || '').toLowerCase() === kategoriAktif.toLowerCase();
  });

  return (
    <div style={{ backgroundColor: '#12100e', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '70px' }}>
      
      {/* Container Utama */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Header Judul */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', fontFamily: 'serif', letterSpacing: '-0.5px' }}>
            Doujin & Manga
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            Koleksi doujin, manga, dan manhwa dari berbagai genre — diperbarui setiap jam.
          </p>
        </div>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Cari komik, manga, manhwa..." 
            value={ketikan}
            onChange={(e) => setKetikan(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #2a2723',
              backgroundColor: '#1c1917',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#e11d48',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cari
          </button>
        </form>

        {/* Filter Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', backgroundColor: '#1c1917', padding: '4px', borderRadius: '14px', border: '1px solid #2a2723', gap: '4px' }}>
            {['Semua', 'Doujinshi', 'Manga', 'Manhwa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setKategoriAktif(tab)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: kategoriAktif === tab ? '#e11d48' : 'transparent',
                  color: kategoriAktif === tab ? '#fff' : '#a1a1aa',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <button style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #2a2723', backgroundColor: '#1c1917', color: '#d4d4d8', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📍 Genre <span>⌄</span>
          </button>

          <button style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #2a2723', backgroundColor: '#1c1917', color: '#d4d4d8', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
            ⇄ Terbaru <span>⌄</span>
          </button>
        </div>

        {/* Sub-header Genre */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0', fontFamily: 'serif' }}>
            Genre [{kategoriAktif}]
          </h2>
          <p style={{ color: '#71717a', fontSize: '13px', margin: 0 }}>
            Koleksi lengkap genre ini
          </p>
        </div>

        {/* State Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a1a1aa' }}>
            <p>⚡ Memuat koleksi...</p>
          </div>
        )}

        {/* State Kosong */}
        {!loading && filteredKomik.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#71717a', border: '1px dashed #2a2723', borderRadius: '16px' }}>
            <p>Tidak ada komik yang ditemukan.</p>
          </div>
        )}

        {/* Grid Card Komik (Mirip Gambar) */}
        {!loading && filteredKomik.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {filteredKomik.map((komik, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  backgroundColor: '#1c1917',
                  border: '1px solid #2a2723',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                {/* Gambar Sampul */}
                <img 
                  src={komik.thumb || '/placeholder.png'} 
                  alt={komik.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Overlay Gradien Bawah */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)' }} />

                {/* Badge Atas: Type & Rating */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', textTransform: 'uppercase' }}>
                    {komik.type || 'MANHWA'}
                  </span>
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fbbf24', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    ★ {komik.rating || '8.8'}
                  </span>
                </div>

                {/* Judul & Chapter Bawah */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', margin: '0 0 4px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {komik.title}
                  </h3>
                  {komik.chapter && (
                    <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: '600' }}>
                      {komik.chapter}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#12100e', borderTop: '1px solid #2a2723', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
        <button style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
          🏠 <span>Beranda</span>
        </button>
        <button style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontWeight: 'bold' }}>
          📖 <span>Doujin</span>
        </button>
        <button style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
          🐱 <span>Neko</span>
        </button>
        <button style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
          🎥 <span>Porno</span>
        </button>
        <button style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
          📺 <span>Hentai</span>
        </button>
      </nav>

    </div>
  );
}