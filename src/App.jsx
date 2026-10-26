import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AUREX Week 2: API Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        value5={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}
      />
      {loading && <p>Loading data from API...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && filteredData.length === 0 && <p>No records found.</p>}
      {!loading && !error && filteredData.length > 0 && (
        <div style={{ display: 'grid', gap: '15px', maxWidth: '600px' }}>
          {filteredData.map((user) => (
            <div key={user.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
      
