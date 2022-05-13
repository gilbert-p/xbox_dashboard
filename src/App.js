import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import './App.css';

function App() {

  const [screenOverlay, setScreenOverlay] = useState(null);

  const windowChange = useRef(null);

  useEffect(()=> {
    const makeFullscreen = () => {
      document.querySelector('div').requestFullscreen();
    }
    makeFullscreen();
    window.screen.orientation.addEventListener("change", makeFullscreen);
  });


  useEffect(()=>{
    const checkDeviceOrientation = () => {

      let orientationType = window.screen.orientation.type;
      console.log(orientationType);

      if(orientationType === "portrait-primary") {
        setScreenOverlay(true);
      }
      else {
        setScreenOverlay(false);
      }
    }
    checkDeviceOrientation();

    window.screen.orientation.addEventListener("change", checkDeviceOrientation);

    return () => {
      window.screen.orientation.addEventListener("change", checkDeviceOrientation);
    }
  }, []);

  return (
    <div className="App" ref={windowChange}>
      {!!screenOverlay === false ?
      <XboxDashboard/> :
      <div className="mobile-container">
        <div className="center-container">
          <h3>Rotate device!</h3>
        </div>
      </div> }

    </div>
  );
}

export default App;