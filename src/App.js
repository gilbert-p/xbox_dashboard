import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import mobileStyles from './dashboard_styles/mobilePage.module.css';
import ReactPlayer from 'react-player';

import { debounce } from 'lodash';
import { updateMobileStatus, selectMobileDeviceStatus }
from './redux_slices/xboxSlice';

import transitionStyles from './dashboard_styles/TransitionStyles.module.css';
import guideMenuStyles from './dashboard_styles/GuideMenu.module.css';

import dashboardOverviewVideo from './assets/video/dashboard_intro_media.flv';
import dynamicBackgroundVideo from './assets/video/dynamic_circles_background.flv';
import testVid from './assets/video/windows_media_compressed_40.flv';
import rotatePhoneIcon from './assets/images/rotate_phone_icon.png';
import enableFullscreenImg from './assets/images/enable_fullscreen_img.png';
import fruitgerAeroXboxImg from './assets/images/frutiger_aero_xbox_360.png';
import glowingXboxLogoDarkImg from './assets/images/glowing-xbox-logo-dark.png';
import glowingXboxLogoLightImg from './assets/images/glowing-xbox-logo-light.png';



function App() {
  

  const [screenOverlay, setScreenOverlay] = useState(true);
  const [isMobileDeivce, setIsMobileDevice] = useState(null);
  const [fullScreenMobilePrompt, setFullscreenMobilePrompt] = useState(null);

  const xboxBladeContainerRef = useRef(null);

  const fullscreenRef = useRef(null);

  const dashboardIntroMediaRef = useRef(null);


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


            // if(xboxBladeContainerRef.current){
            //   sizingProperties.width = xboxBladeContainerRef.current.offsetWidth;
            //   sizingProperties.height = xboxBladeContainerRef.current.offsetHeight; 
            // }

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
    <>


    <div className={mobileStyles.mobileViewContainer}>
      <ReactPlayer
      className={mobileStyles.reactPlayer}
      ref={dashboardIntroMediaRef}
      url={dynamicBackgroundVideo}
      stopOnUnmount={true}
      controls={false}
      playing={true}
      width="100%"
      height="auto"
      loop={true}
      muted={true}
      />



{/* <div className={mobileStyles.animatedBackground}></div> */}

<div className={mobileStyles.mobileContent}>
<div className={mobileStyles.welcomeMessage}>
    <h2>WELCOME</h2>
    <div className={mobileStyles.accentContainer}>
      <div className={mobileStyles.welcomeAccentLeft}></div>
      <div className={mobileStyles.welcomeAccentRight}></div>
    </div>
    <div className={mobileStyles.xboxWelcome}></div>
</div>
<div className={mobileStyles.videoPlayerIntro}>
    <h3>Xbox 360 Web Application</h3>
  <ReactPlayer
                        ref={dashboardIntroMediaRef}
                        url={dashboardOverviewVideo}
                        stopOnUnmount={true}
                        controls={false}
                        playing={true}
                        width="100%"
                        height="auto"
                        loop={true}
                        muted={true}
  />
</div>

<section className={mobileStyles.mobileInstructions}>
  <h3>Steps to View on Mobile</h3>
  <p>Rotate Screen to Enable Dashboard</p>

  <img src={rotatePhoneIcon} alt="Rotate Phone Icon" />

  <p>Accept Fullscreen Prompt Upon Rotating</p>

  <img src={enableFullscreenImg} alt="Rotate Phone Icon" />
</section>

<section className={mobileStyles.aboutSection}>
  <h2>Frutiger Aero Trend</h2>
  <p>
    The era of Frutiger Aero was marked by aesthetics that revolved around the idea
    of technology with nature in mind. With the internet still gaining traction in
    the early 2000s, a bright idealistic future was built into the design trend. 
  </p>
  <div className={mobileStyles.imageParallaxContainer}>
    <img src={fruitgerAeroXboxImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
  </div>

  <p>
    The Original Xbox 360 Dashboard encompassed this trend by designing around pure
    energy with a seamless synchronization of motion, sound, and color. With
    skeuomorphic elements in vogue - a striking contrast to the flat design of
    today’s landscape - this dashboard still holds as one of the more notable
    gaming dashboard designs of the mid-2000s.
  </p>
</section>

<section className={mobileStyles.aboutSection}>
  <h2>Dashboard Design</h2>
  <p>
  The incorporation of curved elements, such as the blades and buttons, serves to harmonize with the console's inherent characteristics, drawing inspiration from the Nexus logo and the industrial design of the hardware. The sound effects compliment the interface as they were envisioned as a powerful force waiting to be unleashed, aligning with the overall Xbox experience. 
  </p>
  <div className={mobileStyles.glowAnimated}>
    <img src={glowingXboxLogoLightImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
    <img id={mobileStyles['xbox_logo_glow']} src={glowingXboxLogoDarkImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
  </div>

  <p>
  This cohesive approach is designed to instill a feeling of tranquility in the user experience. The elegantly curved blades not only mirror the aesthetics of the console but also establish a symbiotic connection between the hardware and software, reinforcing the bond between the two facets of the gaming experience.
  </p>
</section>

<section className={mobileStyles.aboutSection}>
  <h2>Web App Development</h2>
  <p>
  The Following tools were used to develop the dashboard as a web application:
  </p>

  <ul className={mobileStyles.toolsList}>
    <li>React Js</li>
    <li>GSAP - Greensock Animation Library</li>
    <li>Figma</li>
    <li>Xbox 360 Style Guide</li>
  </ul>
</section>

<section className={mobileStyles.linkSection}>
  <h2>Relevant Links</h2>
  <ul className={mobileStyles.gamecaseList}>
    <li id={mobileStyles['link_1']} className={mobileStyles.gameCaseListItem}>
        <a className={mobileStyles.gamecaseAnchorTag} href="https://rowlandbrown.com/xbox-360-dashboard-ui-blades" target="_blank" rel="noopener noreferrer">
        Rowland Brown Website
        </a>
    </li>
    <li id={mobileStyles['link_2']}>      
        <a className={mobileStyles.gamecaseAnchorTag} href="https://www.behance.net/rowbrown" target="_blank" rel="noopener noreferrer">
        Rowland Brown Behance
        </a>
    </li>
    <li id={mobileStyles['link_3']}>
        <a className={mobileStyles.gamecaseAnchorTag} href="https://digiex.net/threads/xbox-360-style-guide.15469/" target="_blank" rel="noopener noreferrer">
        Xbox 360 Style Guide
        </a>
    </li>
  </ul>
</section>
</div>




</div>
    </>

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