import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Datas() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [list, setList] = useState([]);

  // 方案 A：直接打後端完整 URL（後端在 8080）
  const API_BASE = 'http://127.0.0.1:8080';
  // 方案 B（代理）：改成 ''，並把下面 GET 換成 '/api/datas'

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_BASE}/api/datas`);
        setList(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
        setError('访问数据有误');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: 'tomato' }}>Error: {error}</div>;
  if (!list.length) return <div>目前沒有資料</div>;

  const first = list[0];

  return (
    <div style={{ lineHeight: 1.6 }}>
      <h3>第一筆資料</h3>
      <div>Name：{first?.name ?? 'N/A'}</div>
      <div>Age：{first?.age ?? 'N/A'}</div>

      <hr />

      <h3>全部資料（共 {list.length} 筆）</h3>
      <ul>
        {list.map(doc => (
          <li key={doc._id}>{doc.name} — {doc.age ?? 'n/a'}</li>
        ))}
      </ul>
    </div>
  );
}
