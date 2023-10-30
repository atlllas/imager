import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const handleDirectoryChange = (e) => {
    const files = [...e.target.files];
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setImageList(imageFiles);
    setCurrentIndex(0);
  };

  const handleImageClick = () => {
    if (isPlaying) {
      togglePlay();
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleImageClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageList]);

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(handleImageClick, 500);
      setIntervalId(id);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="App">
      <div id="display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label className="customFileInput">
          Choose Files
          <input type="file" directory="" webkitdirectory="" onChange={handleDirectoryChange} style={{ display: 'none' }} />
        </label>
        <button className="play" onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</button>
      </div>

      {imageList.length > 0 && (
        <img
          src={URL.createObjectURL(imageList[currentIndex])}
          alt="Selected directory content"
          style={{ width: '50%', margin: '20px auto', display: 'block' }}
          onClick={handleImageClick}
        />
      )}

      {imageList.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '5%',
          width: '100%',
          textAlign: 'center',
          color: 'black'
        }}>
          {currentIndex + 1} of {imageList.length}
        </div>
      )}
    </div>
  );
}

export default App;
