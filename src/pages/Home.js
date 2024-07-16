import React, { useState } from 'react';



const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  return (
    <div>
      <h1>Getaway Genius AI App!</h1>
      <p>Built using ReactJS + Redux + Google Gemini</p>

      <div style={{ margin: '30px 0' }}>
        <button
          onClick={() => handleAiWith('text')}
          className={aiWith == 'text' ? 'aiWithActive' : ''}>
          AI with Text
        </button>

        <button
          style={{ marginLeft: '20px' }}
          className={aiWith == 'image' ? 'aiWithActive' : ''}
          onClick={() => handleAiWith('image')}>
          AI with Image
        </button>
      </div>
    </div>
  );
};

export default Home;