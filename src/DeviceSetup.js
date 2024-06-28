import React, { useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import MobileHomePage from './xbox_dashboard/components/MobileHomepage';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import mobileStyles from './dashboard_styles/mobilePage.module.css';
import transitionStyles from './dashboard_styles/TransitionStyles.module.css';
import checkDeviceOrientation from './custom_hooks/useCheckDeviceOrientation';



function DeviceSetup(props) {
  
  const { mockDbData } = props;

  const xboxBladeContainerRef = useRef(null);

  const {
    isFullscreen,
    screenOverlay,
    fullscreenMobilePrompt : isPortrait,
    handleFullscreenToggle,
    fullscreenRef
  } = checkDeviceOrientation(window.screen.orientation.type);

  // const dashboard_db = process.env.REACT_APP_DATABASE_DASHBOARD;


  return (
    <>
    {screenOverlay ? 
    <MobileHomePage/>
    :
    <div ref={fullscreenRef} className={dashboard_style.safeBorder}>
      <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef}>
        <XboxDashboard mockDbData={mockDbData} /> 

          {isFullscreen ?
          (<div className={!isFullscreen ? mobileStyles.enableFullScreenPrompt: transitionStyles.instantTransparent}>
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

export default DeviceSetup;