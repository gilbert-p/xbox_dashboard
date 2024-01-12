import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import { navigateTo , selectContextIndex} from '../xboxSlice';

export default function useDashboardBladeAnimation() {

    const mountRef = useRef(null);
    const shiftRightTransition = useRef(null);
    const shiftLeftTransition = useRef(null);
    const initializeRef = useRef(null);

    const current_context_index = useSelector(selectContextIndex) || 0;

    const [isInitialized, setIsInitialized] = useState(false);

    const dispatch = useDispatch();

    const debounceDispatchInput = useCallback(
        debounce((fn) => {
            dispatch(fn);
        }, 200),
        []
    );




    initializeRef.current = gsap.timeline().to(mountRef.current, {opacity: 1, duration: 0}).pause();

    shiftLeftTransition.current = gsap.timeline().to(mountRef.current, {x: "+=40px", duration: 0.3}).pause();
    // shiftRightTransition.current = gsap.timeline().to(mountRef.current, {x: "-=40px", duration: 0.3}).pause();
    shiftRightTransition.current = gsap.timeline().to(mountRef.current, {x: "-=40px", duration: 0.3}).pause();

    const shiftRight = () => {
        if(!isInitialized){
            setIsInitialized(true);
            shiftLeftTransition.current.pause();
            shiftRightTransition.current.pause();
        }
        else {
            if((current_context_index + 1) < 5) {
                shiftRightTransition.current.play();
                debounceDispatchInput(navigateTo(current_context_index + 1));
            }
        }

    }

    const shiftLeft = () => {
        if(!isInitialized){
            setIsInitialized(true);
            shiftLeftTransition.current.pause();
            shiftRightTransition.current.pause();
        }
        else{
            if((current_context_index - 1) >= 0) {
                shiftLeftTransition.current.play();
                debounceDispatchInput(navigateTo(current_context_index - 1));
            }
        }

    }


    //Keyboard event listeners
    useEffect((e)=> {
        const navigateUsingKeys = (e) => {
            if(e !== undefined) {
                switch(e.key) {
                    case "ArrowUp":
                    break;
                    case "ArrowRight":
                        if(!isInitialized){
                            setIsInitialized(true);
                            shiftLeftTransition.current.pause();
                            shiftRightTransition.current.pause();
                        }
                        else{
                            if((current_context_index + 1) < 5) {
                                shiftRightTransition.current.play();
                                debounceDispatchInput(navigateTo(current_context_index + 1));
                            }
                        }
                        
                        
                    break;
                    case "ArrowDown":
                    break;
                    case "ArrowLeft":
                        if(!isInitialized){
                            setIsInitialized(true);
                            shiftLeftTransition.current.pause();
                            shiftRightTransition.current.pause();
                        }
                        else {
                            if((current_context_index - 1) >= 0) {
                                shiftLeftTransition.current.play();
                                debounceDispatchInput(navigateTo(current_context_index - 1));
                            }
                        }

                    break;
                    default:
                    break;
                }
            }
        }
        navigateUsingKeys(e);

        window.addEventListener("keydown", navigateUsingKeys);


        return () => {
            window.removeEventListener("keydown", navigateUsingKeys);
        }


    }, [current_context_index, isInitialized]);

    return {mountRef, shiftRight, shiftLeft,};
}