import React, { useState } from 'react';
import AiwithText from '../components/AIwithText';
import AiwithImage from '../components/AIwithImage';


const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  return (
    <div>
      <h1>TripTuner AI App!</h1>
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

      {
        aiWith == 'text' ?
          <AiwithText />
          :
          <AiwithImage />
      }
    </div>
  );
};

export default Home;