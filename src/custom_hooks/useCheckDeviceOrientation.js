import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const useCheckDeviceOrientation = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [screenOverlay, setScreenOverlay] = useState(false);
  const [fullscreenMobilePrompt, setFullscreenMobilePrompt] = useState(true);
  const fullscreenRef = useRef(null);
  const dispatch = useDispatch();

  const detectIfMobile = useCallback(() => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
  }, []);

  const handleFullscreenToggle = useCallback(() => {
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

    setIsFullscreen(prevIsFullscreen => !prevIsFullscreen);
  }, [isFullscreen]);

  const getUpdatedSize = useCallback((windowWidth, windowHeight) => {
    const origX = 1190;
    const origY = 765;

    let sizeReduction = 1;

    const minDimension = Math.min(windowWidth, windowHeight);

    if (minDimension < 765) {
      if (minDimension === windowHeight) {
        sizeReduction = Math.max(0, (windowHeight - 65) / origY);
      } else {
        sizeReduction = Math.max(0, (windowWidth - 90) / origX);
      }
    }

    document.documentElement.style.setProperty('--scaling', `${sizeReduction}`);
  }, []);

  useEffect(() => {
    const checkDeviceOrientation = () => {
      const orientationType = window.screen.orientation.type;
      const isMobileDevice = detectIfMobile();

      if (isMobileDevice) {
        setFullscreenMobilePrompt(true);
      }

      if (orientationType === "portrait-primary") {
        setScreenOverlay(true);
        setFullscreenMobilePrompt(true);
      } else {
        getUpdatedSize(window.innerWidth, window.innerHeight);
        setScreenOverlay(false);
      }
    };
    checkDeviceOrientation();

    window.screen.orientation.addEventListener("change", checkDeviceOrientation);

    return () => {
      window.screen.orientation.removeEventListener("change", checkDeviceOrientation);
    };
  }, [detectIfMobile, getUpdatedSize]);

  useEffect(() => {
    const updateContainerSize = () => {
      getUpdatedSize(window.innerWidth, window.innerHeight);
    };

    const delayedResize = debounce(updateContainerSize, 50);
    window.addEventListener('resize', delayedResize);

    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, [getUpdatedSize]);

  return {
    isFullscreen,
    screenOverlay,
    fullscreenMobilePrompt,
    handleFullscreenToggle,
    fullscreenRef
  };
};

export default useCheckDeviceOrientation;