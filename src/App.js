import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import './App.css';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import backgroundStyle from "./site_styling/DashboardBackground.module.css";

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
    let origX = 1020;
    let origY = 765;

    // let calc_new_width = (4*windowHeight)/3;
    // let calc_new_height = (3*windowWidth)/4;


    let sizeReduction = 0;


    if(windowHeight < origY) {
      sizeReduction = (windowHeight - 75) / origY;
      console.log("Sized Reduced based on height", sizeReduction);
      document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
    }
    else if(windowWidth < origX) {
      console.log("called");
      sizeReduction = (windowWidth- 75) / origX;
      document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
    }
  

  }

  //Gets width and height of content container
  useEffect(()=> {
    const updateContainerSize = () => {
        let sizingProperties = {};

        if(xboxBladeContainerRef.current) {
            sizingProperties.width = xboxBladeContainerRef.current.offsetWidth;
            sizingProperties.height = xboxBladeContainerRef.current.offsetHeight; 
            
            sizingProperties.windowWidth = window.innerWidth;
            sizingProperties.windowHeight = window.innerHeight;

            getUpdatedSize(window.innerWidth, window.innerHeight);

        }
    }

    const delayedResize = debounce(updateContainerSize, 200);
    window.addEventListener('resize', delayedResize);

    return () => {
        window.removeEventListener("resize", delayedResize);
    }

}, [xboxBladeContainerRef.current]);


  return (
    <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef} >
      <XboxDashboard/> 
    </div>
  );
}

export default App;