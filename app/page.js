'use client';
import { useState } from 'react';

export default function Home() {
  const [ketikan, setKetikan] = useState('');
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [loading, setLoading] = useState(false);

  const cariKomik = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(ketikan)}`);
    const data = await res.json();
    setDaftarKomik(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Manga Reader Clone 🚀</h1>

      <form onSubmit={cariKomik} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Cari judul komik..." 
          value={ketikan}
          onChange={(e) => setKetikan(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px' }}>
          {loading ? 'Mencari...' : 'Cari'}
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
        {daftarKomik.map((komik, index) => (
          <div key={index} style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px' }}>
            <img src={komik.thumb} alt={komik.title} style={{ width: '100%', borderRadius: '5px' }} />
            <p style={{ fontSize: '14px', marginTop: '8px' }}>{komik.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}