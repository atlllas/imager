import React, { useState } from 'react';
import './App.css';

function App() {
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDirectoryChange = (e) => {
    const files = [...e.target.files];
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setImageList(imageFiles);
    setCurrentIndex(0);
  };

  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  return (
    <div className="App">
      <input type="file" directory="" webkitdirectory="" onChange={handleDirectoryChange} />

      {imageList.length > 0 && (
        <img 
          src={URL.createObjectURL(imageList[currentIndex])} 
          alt="Selected directory content" 
          style={{width: '50%', margin: '20px auto', display: 'block'}} 
          onClick={handleImageClick}
        />
      )}
    </div>
  );
}

export default App;
