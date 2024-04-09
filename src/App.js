import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import mobileStyles from './dashboard_styles/mobilePage.module.css';

import { debounce } from 'lodash';
import { updateMobileStatus, selectMobileDeviceStatus }
from './redux_slices/xboxSlice';

import transitionStyles from './dashboard_styles/TransitionStyles.module.css';


function App() {
  

  const [screenOverlay, setScreenOverlay] = useState(false);
  const [isMobileDeivce, setIsMobileDevice] = useState(null);
  const [fullScreenMobilePrompt, setFullscreenMobilePrompt] = useState(null);

  const xboxBladeContainerRef = useRef(null);

  const fullscreenRef = useRef(null);


  const [isFullscreen, setIsFullscreen] = useState(false);

  const isFullscreenActive = useSelector(selectMobileDeviceStatus);

  const dispatch = useDispatch();


  const detectIfMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      dispatch(updateMobileStatus(navigator.userAgent.match(toMatchItem)));
      return navigator.userAgent.match(toMatchItem);
    });
  };
  

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (fullscreenRef.current) {
        if (fullscreenRef.current.requestFullscreen) {
          fullscreenRef.current.requestFullscreen();
        } else if (fullscreenRef.current.webkitRequestFullscreen) {
          fullscreenRef.current.webkitRequestFullscreen(); // Safari
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Safari
      }
    }

    setIsFullscreen(!isFullscreen);
  };


  useEffect(()=>{
    const checkDeviceOrientation = () => {

      let orientationType = window.screen.orientation.type;

      let isMobileDevice = detectIfMobile();

      if(isMobileDeivce) {
        setFullscreenMobilePrompt(true);
      }


      if(orientationType === "portrait-primary") {
        setScreenOverlay(true);
      }
      else {
        getUpdatedSize(window.innerWidth, window.innerHeight);
        // handleFullscreenToggle();
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
    const origX = 1190;
    const origY = 765;
  
    let sizeReduction = 1;
    let smallerDimension = '';
  
    const minDimension = Math.min(windowWidth, windowHeight);
    smallerDimension = minDimension === windowHeight ? 'height' : 'width';
  
    if (minDimension < 765) {
      if (minDimension === windowHeight) {
        sizeReduction = Math.max(0, (windowHeight - 65) / origY);
        console.log("Size reduced based on height", sizeReduction);
      } else {
        sizeReduction = Math.max(0, (windowWidth - 90) / origX);
        console.log("Size reduced based on width", sizeReduction);
      }
    }
    //  else {
    //   sizeReduction = Math.max(0, (minDimension) / origX);
    //   console.log("Size reduced based on smaller dimension", sizeReduction);
    // }
  
    document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
  };

  //Gets width and height of content container
  useEffect(()=> {
    const updateContainerSize = () => {
        let sizingProperties = {};

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

}, [window.innerWidth, window.innerHeight]);

const MobileViewPrompt = () => {
  return (
    <div className={mobileStyles.mobileViewContainer}>
      <div className={mobileStyles.animatedBackground}></div>
      <div className={mobileStyles.welcomeMessage}>
        <h2>WELCOME</h2>
        <div className={mobileStyles.accentContainer}>
          <div className={mobileStyles.welcomeAccentLeft}></div>
          <div className={mobileStyles.welcomeAccentRight}></div>
        </div>
        <div className={mobileStyles.xboxWelcome}></div>

      </div>

    </div>
  );
}


  return (
    <>
    {screenOverlay ? 
    <MobileViewPrompt/>
    :
    <div ref={fullscreenRef} className={dashboard_style.safeBorder}>
      <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef} >
        <XboxDashboard handleFullScreen={handleFullscreenToggle}/> 

          {isFullscreenActive ? 
            (        <div className={!isFullscreen ? mobileStyles.enableFullScreenPrompt: transitionStyles.instantTransparent}>
              <div className={mobileStyles.fullscreenButtonContainer}>
                  <p>Click to Enable Fullscreen</p>
                  <button id={mobileStyles['fullscreenButton']} onClick={()=>{handleFullscreenToggle();}}>
                      Enable
                  </button>
              </div>
          </div>
          )
          :
          ''
          }

      </div>
    </div>
    }


    </>

  );
}

export default App;