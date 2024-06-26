import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import MobileHomePage from './xbox_dashboard/components/MobileHomepage';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import mobileStyles from './dashboard_styles/mobilePage.module.css';

import transitionStyles from './dashboard_styles/TransitionStyles.module.css';

import checkDeviceOrientation from './custom_hooks/useCheckDeviceOrientation';

import useDelayedFetchDatabase from './custom_hooks/useDelayedFetchDatabase';

import useFetchMockDatabase from './custom_hooks/useFetchMockDatabase';



function App() {
  
  const [mockDbData, setMockDbData] = useState(null);

  const xboxBladeContainerRef = useRef(null);

  const {
    isFullscreen,
    screenOverlay,
    fullscreenMobilePrompt : isPortrait,
    handleFullscreenToggle,
    fullscreenRef
  } = checkDeviceOrientation(window.screen.orientation.type);

  // const dashboard_db = process.env.REACT_APP_DATABASE_DASHBOARD;




  // const { data: liveData } = useDelayedFetchDatabase('https://xb-dashboard-server.netlify.app/api/dashboard_db}', 0);
  const { data: mockResponse } = useFetchMockDatabase(1000, false);

    function organizeByCategory(data) {
      return data.reduce((acc, item) => {
          const { category } = item;
          if (!acc[category]) {
              acc[category] = [];
          }
          acc[category].push(item);
          return acc;
      }, {});
    }


    useEffect(() => {
      if (mockResponse) {
        setMockDbData(organizeByCategory(mockResponse));
      }
    }, [mockResponse]);



  return (
    <>
    {screenOverlay ? 
    <MobileHomePage/>
    :
    <div ref={fullscreenRef} className={dashboard_style.safeBorder}>
      <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef} >
        <XboxDashboard mockDbData={mockDbData} /> 

          {isFullscreen && mockDbData ? 
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

export default App;