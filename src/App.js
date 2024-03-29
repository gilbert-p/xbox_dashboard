import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import './App.css';
import dashboard_style from './dashboard_styles/Dashboard.module.css';

import { debounce } from 'lodash';
import { gsap } from 'gsap';

function App() {

  const [screenOverlay, setScreenOverlay] = useState(null);
  const [isMobileView, setMobileView] = useState(null);

  const xboxBladeContainerRef = useRef(null);

  /*
  useEffect(()=> {
    const makeFullscreen = () => {
      document.querySelector('div').requestFullscreen().then(()=>{
        console.log("Fullscreen enabled");
      },()=>{console.warn("Fullscreen not enabled")});
    }
    makeFullscreen();
    window.screen.orientation.addEventListener("change", makeFullscreen);
  });
  */

  useEffect(()=>{
    const checkDeviceOrientation = () => {

      let orientationType = window.screen.orientation.type;
      console.log(orientationType);

      if(orientationType === "portrait-primary") {
        setScreenOverlay(true);
      }
      else {
        getUpdatedSize(window.innerWidth, window.innerHeight);
        setScreenOverlay(false);
      }
    }
    checkDeviceOrientation();

    window.screen.orientation.addEventListener("change", checkDeviceOrientation);

    return () => {
      window.screen.orientation.addEventListener("change", checkDeviceOrientation);
    }
  }, []);

  const getUpdatedSize = (windowWidth, windowHeight) => {
    let origX = 1190;
    let origY = 765;



    let sizeReduction = 1;

    if(windowWidth > 765){
      
      if(windowHeight < origY) {
        sizeReduction = (windowHeight - 75) / origY;
        console.log("Sized Reduced based on height", sizeReduction);
        document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
      }
      else if(windowWidth < origX) {
        
        sizeReduction = (windowWidth - 90) / origX;
        document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
        console.log("Sized Reduced based on width", windowWidth, sizeReduction);
      }
    }

    else if(windowWidth - 170 < 765) {
      // if(windowHeight < origY) {
      //   sizeReduction = (windowHeight - 75) / origY;
      //   console.log("Sized Reduced based on height", sizeReduction);
      //   document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
      // }
      // else if(windowWidth < origX) {
        

        sizeReduction = (windowWidth -  150) / origX;
        document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
        console.log("Sized Reduced based on small width", windowWidth, sizeReduction);
      // }
    }



  

  }

  //Gets width and height of content container
  useEffect(()=> {
    const updateContainerSize = () => {
        let sizingProperties = {};

        let current_width = window.innerWidth || 0;
        console.log("current window width", current_width);

        


            sizingProperties.width = xboxBladeContainerRef.current.offsetWidth;
            sizingProperties.height = xboxBladeContainerRef.current.offsetHeight; 
            
            sizingProperties.windowWidth = window.innerWidth;
            sizingProperties.windowHeight = window.innerHeight;

            getUpdatedSize(window.innerWidth, window.innerHeight);



    }

    const delayedResize = debounce(updateContainerSize, 50);
    window.addEventListener('resize', delayedResize);

    return () => {
        window.removeEventListener("resize", delayedResize);
    }

}, [window.innerWidth]);




  return (
    
    <div className={dashboard_style.safeBorder}>
            <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef} >
      <XboxDashboard/> 

    </div>
    </div>

  );
}

export default App;