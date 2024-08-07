import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { updateMobileStatus } from '../redux_slices/xboxSlice';
import debounce from 'lodash.debounce';

interface FullscreenDivElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
}

const useCheckDeviceOrientation = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [screenOverlay, setScreenOverlay] = useState<boolean>(false);
  const [fullscreenMobilePrompt, setFullscreenMobilePrompt] = useState<boolean>(true);
  const fullscreenRef = useRef<FullscreenDivElement | null>(null);
  const dispatch = useDispatch();

  const detectIfMobile = (): string | null => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    const userAgentString = navigator.userAgent;
    let matchedDevice: string | null = null;

    toMatch.some((toMatchItem) => {
      const match = userAgentString.match(toMatchItem);
      if (match) {
        matchedDevice = match[0];
        console.log(match[0]);
        return true;
      }
      return false;
    });

    return matchedDevice;
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen && fullscreenRef.current) {
      if (fullscreenRef.current.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      } else if (fullscreenRef.current?.webkitRequestFullscreen) {
        fullscreenRef.current?.webkitRequestFullscreen(); // Safari
      }
    } else {
      const doc = document as FullscreenDocument;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen(); // Safari
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  const getUpdatedSize = useCallback((windowWidth: number, windowHeight: number) => {
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
      const mobileID = detectIfMobile();

      if (mobileID) {
        setFullscreenMobilePrompt(true);
        dispatch(updateMobileStatus(mobileID));
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
  }, [dispatch, getUpdatedSize]);

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