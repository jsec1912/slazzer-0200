import './App.css';
import React, { useState } from 'react';
import ImageEditorWrapper from './ImageEditorWrapper';

function App() {

  // const [src, setSrc] = useState('')

  // const handleReceivedImg = (val) => {
  //   setSrc(val)
  // }

  const src = 'https://cdn.scaleflex.it/demo/stephen-walker-unsplash.jpg';

  return (
    <>
      <div className="root">
        <ImageEditorWrapper
          show={true}
          src={src}
          onComplete={(props) => { console.log(props) }}
          onBeforeComplete={(props) => { console.log(props); return false; }}
        /*  handleReceivedImg={handleReceivedImg} */
        />
      </div>
    </>
  );
}

export default App;
