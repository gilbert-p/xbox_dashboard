import React, { useRef, MutableRefObject } from 'react';
import XboxDashboard from "./xbox_dashboard/Xbox";
import MobileHomePage from './xbox_dashboard/components/MobileHomepage';
import dashboard_style from './dashboard_styles/Dashboard.module.css';
import mobileStyles from './dashboard_styles/mobilePage.module.css';
import transitionStyles from './dashboard_styles/TransitionStyles.module.css';
import checkDeviceOrientation from './custom_hooks/useCheckDeviceOrientation';

import { OrganizedData, DashboardDataItem } from './ts_types/apiDataTypes';


interface DeviceSetupProps {
  mockDbData: OrganizedData;
}

const DeviceSetup: React.FC<DeviceSetupProps> = ({ mockDbData }) => {
  const xboxBladeContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const {
    isFullscreen,
    screenOverlay,
    fullscreenMobilePrompt: isPortrait,
    handleFullscreenToggle,
    fullscreenRef
  } = checkDeviceOrientation();

  return (
    <>
      {screenOverlay ? (
        <MobileHomePage />
      ) : (
        <div ref={fullscreenRef} className={dashboard_style.safeBorder}>
          <div className={dashboard_style.appContainer} ref={xboxBladeContainerRef}>
            <XboxDashboard mockDbData={mockDbData} />
            {!isFullscreen ? (
              <div className={!isFullscreen ? mobileStyles.enableFullScreenPrompt : transitionStyles.instantTransparent}>
                <div className={mobileStyles.fullscreenButtonContainer}>
                  <p>Click to Enable Fullscreen</p>
                  <button id={mobileStyles['fullscreenButton']} onClick={handleFullscreenToggle}>
                    Enable
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceSetup;