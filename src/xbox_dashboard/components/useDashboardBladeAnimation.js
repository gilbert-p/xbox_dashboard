import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from "lodash";
import { gsap } from 'gsap';
import { navigateTo, selectContextIndex } from '../xboxSlice';

export default function useDashboardBladeAnimation() {

    const shiftRightTransition = useRef(null);
    const shiftLeftTransition = useRef(null);

    const current_context_index = useSelector(selectContextIndex) || 0;

    const dispatch = useDispatch();

    const debounceDispatchInput = useCallback(
        debounce((fn) => {
            dispatch(fn);
        }, 200),
        []
    );

    const mountRef = useRef({moveRight:null, moveLeft:null});



    shiftLeftTransition.current = gsap.timeline().to(mountRef.current, {x: "+=40px", duration: 0.3}).pause();
    // shiftRightTransition.current = gsap.timeline().to(mountRef.current, {x: "-=40px", duration: 0.3}).pause();
    mountRef.current.moveRight = gsap.timeline().to(mountRef.current, {x: "-=40px", duration: 0.3}).pause();

    const shiftRight = () => {
        // bladeContainerTransition.current = {};

        mountRef.current.moveRight.play();
    }

    const shiftLeft = () => {
        shiftLeftTransition.current.play();
    }


    //Keyboard event listeners
    useEffect((e)=> {
        const navigateUsingKeys = (e) => {
            if(e !== undefined) {
                switch(e.key) {
                    case "ArrowUp":
                    break;
                    case "ArrowRight":
                        if((current_context_index + 1) < 5) {
                            debounceDispatchInput(shiftRight());
                            debounceDispatchInput(navigateTo(current_context_index + 1));
                        }
                    break;
                    case "ArrowDown":
                    break;
                    case "ArrowLeft":
                        if((current_context_index - 1) >= 0) {
                            debounceDispatchInput(shiftLeft());
                            debounceDispatchInput(navigateTo(current_context_index - 1));
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


    }, [current_context_index]);

    return mountRef;
}