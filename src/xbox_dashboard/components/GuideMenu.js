import React, {useRef, useState, forwardRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../dashboard_styles/Dashboard.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import itemSelectStyles from "../../dashboard_styles/ItemSelect.module.css";

import useGuidePanelAnimation from '../../custom_hooks/useGuidePanelAnimation';
import useCurrentTime from '../../custom_hooks/useCurrentTime';

import energyCircles from '../../dashboard_styles/EnergyCirclesAnimation.module.css';


import {
    updateGuideMenuHighlight,

    navigateGuideMenu,
    navigateGuideMenuLinkStack,
    selectGuideMenuIndex,
    selectGuideMenuLinkStackIndex,
    selectGuideMenuHighlightState,
    selectGuideMenuLinkStackHighlight,
    updateGuideActiveState,
    updateLinkStackHighlight,

    updateGuideMusicPlayerHighlight,
    selectGuideMusicPlayerIndex,
    selectGuideMusicPlayerHighlight,
    navigateGuideMusicPlayer,
    selectGuideActiveState,

    playMusic,
    selectMusicState,
    updateSelectedSong,
    selectCurrentSong,
    navigateSongIndex,
    selectSongIndex,
    updateMusicListSize,
    selectMusiclistSize,

    updateShowThemeSelect,
    selectShowThemeSelect,
    updateSelectedTheme,
    selectThemeSelection,
    navigateThemeSelectIndex,
    selectThemeIndex,
    updateThemeSelectHighlight,
    selectThemeHighlightState,
    }
from '../menuSlice';

import musicPlaylist from "../../assets/audio/music_playlist.mp3";

import useAudioSound from "../../custom_hooks/useAudioSound";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";

import { debounce } from "lodash";


const GuideMenu = (props) => {

    const { guidePanelRef, 
            guideMenuRef,
            guideSelectThemeRef, 
            guideSettingsRef, 
            aboutDashboardPageRef,
            gamerProfilePageRef, 
            extendGuideMenu, 
            revealThemeSelection,
            backButtonStateSelection,
          } = props['guideAnimationRef'];



    const dispatch = useDispatch();

    
    // const guidePanelAnimation = useGuidePanelAnimation();

    const guideMenuIndex = useSelector(selectGuideMenuIndex);
    const guideMenuLinkStackIndex = useSelector(selectGuideMenuLinkStackIndex);
    const isGuideMenuHighlightActive = useSelector(selectGuideMenuHighlightState);
    const isLinkStackHighlightActive = useSelector(selectGuideMenuLinkStackHighlight);


    const guideMusicPlayerIndex = useSelector(selectGuideMusicPlayerIndex);
    const isGuideMusicPlayerHighlightActive = useSelector(selectGuideMusicPlayerHighlight);

    
    const isSongPlaying = useSelector(selectMusicState);
    const currentSongTitle = useSelector(selectCurrentSong);
    const currentSongIndex = useSelector(selectSongIndex);
    const musicListSizeMax = useSelector(selectMusiclistSize);


    const selected_theme = useSelector(selectThemeSelection);
    const themeSelectIndex = useSelector(selectThemeIndex);
    const isThemeSelectHighlightActive = useSelector(selectThemeHighlightState);


    const guideMenuActiveState = useSelector(selectGuideActiveState);

    //TODO: Utility SFX needs to be included in a separate hook function because
    //the soudns are used in for every button selection including clicking on any menu item




    const musicSprite = {
        overture:[0,15000],
        heavy_price_paid:[16000, 15000],
    };


    /* Utility SFX specific function */

    const utilitySound = useUtilitySfx();




    const musicList = useAudioSound(musicPlaylist, musicSprite);
    dispatch(updateMusicListSize(2));


    const musicTitles = ['overture', 'heavy_price_paid'];


    const playSong = () => {

        if(!isSongPlaying){
            dispatch(updateSelectedSong(musicTitles[currentSongIndex]));
            musicList.current['play']({id: musicTitles[currentSongIndex]});
            dispatch(playMusic(true));
        }
        else {
            musicList.current['exposedData'].stop();
            dispatch(playMusic(false));
            dispatch(updateSelectedSong(''));
        }
    }

    const playNextSong = async () => {

        const pauseCurrentSongPlaying = async () => {
            musicList.current['exposedData'].stop();
            await new Promise((resolve) => setTimeout(resolve, 150));
        }

        const playNext = async () => {
            let nextIndex = (currentSongIndex + 1) % musicListSizeMax;

            dispatch(navigateSongIndex(nextIndex));
            dispatch(updateSelectedSong(musicTitles[nextIndex]));
            musicList.current['play']({id: musicTitles[nextIndex]});
            await new Promise((resolve) => setTimeout(resolve, 0));

        }

        await pauseCurrentSongPlaying();
        await playNext();
    }

    const playPrevSong = async () => {
        const pauseCurrentSongPlaying = async () => {
            musicList.current['exposedData'].stop();
            await new Promise((resolve) => setTimeout(resolve, 150));
        }

        const playPrevious = async () => {
            let nextIndex = Math.abs((currentSongIndex - 1) % musicListSizeMax);

            dispatch(navigateSongIndex(nextIndex));
            dispatch(updateSelectedSong(musicTitles[nextIndex]));
            musicList.current['play']({id: musicTitles[nextIndex]});
            await new Promise((resolve) => setTimeout(resolve, 0));

        }

        await pauseCurrentSongPlaying();
        await playPrevious();
    }


    const GuidePanelClock = () => {
        const currentTime = useCurrentTime();
    
        const hours = currentTime.getHours() % 12 || 12;
        const minutes = currentTime.getMinutes();
        const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
    
        return (
            <>
              <span>{hours}</span>
              <span>:</span>
              <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
              <span>{ampm}</span>
            </>
          );
    };



    return (
        <>
        {/* Guide Menu that is opened/closed by home button */}
        <div id={styles['guideMenuPanel']} className={styles.guideMenuContainer} ref={guideMenuRef} >
            <div  className={styles[`${'guidePanel' + selected_theme}`]} ref={guidePanelRef}>

                <div className={styles.backButtonContainer} onClick={()=>{backButtonStateSelection(); utilitySound.current.playButtonSound()}}>
                    <p>Back</p>
                    <div className={styles.bControllerImg}></div>
                </div>

                <div className={styles[`${'nameplateEdge' + selected_theme}`]}>
                        <div className={styles.guideControllerIndicatorIcon}></div>
                        <p className={styles.guideNameplateTitle}>Epoxi117</p>
                </div>
                <div className={styles[`${'guidePanelTopBorder' + selected_theme}`]}>
                            <div className={styles.guidePanelClockContainer}>
                                <GuidePanelClock/>
                            </div>
                </div>
                <div className={styles[`${'guidePanelBottomBorder' + selected_theme}`]}>
                </div>
                <div className={styles.guideSettingsView} ref={guideSettingsRef}>
                                <div className={styles.profileContainer} onClick={()=>{ extendGuideMenu('extended_gamer_profile'); dispatch(updateGuideActiveState('extended_gamer_profile')); utilitySound.current.playButtonSound()}}>
                                    <div className={styles.profileImgContainer}>
                                        <div className={styles.profileIcon}>
                                            <div className={styles.iconGloss}></div>
                                        </div>
                                    </div>
                                    <div className={styles.profileDescription}>
                                        <p className={styles.gamerscoreTitle}>Gamerscore</p>
                                        <p className={styles.gamerscoreValue}>21117</p>
                                        <p className={styles.zoneTitle}>Status</p>
                                        <div className={styles.zoneStatus}>Online</div>
                                    </div>
                                </div>

                                <div className={styles.multiButtonListContainer}>
                                    <span className={`${styles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 0 ? "Github": ""}</span>
                                    <span className={`${styles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 1 ? "My Website": ""}</span>
                                    <span className={`${styles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 2 ? "Hmmm": ""}</span>
                                    <div className={styles.buttonGroup}>
                                        <button className={styles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(0));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>
                                            <span id={styles["skewButton_1"]} className={`${styles.buttonIcon} ${iconLibrary.github_logo}`}></span>
                                            <span className={`${isLinkStackHighlightActive && styles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 0 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button className={styles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(1));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>
                                            <span id={styles["skewButton_2"]} className={`${styles.buttonIcon} ${iconLibrary.react_logo}`}></span>
                                            <span className={`${isLinkStackHighlightActive && styles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 1 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button className={styles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(2));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>
                                            <span id={styles["skewButton_2"]} className={`${styles.buttonIcon} ${iconLibrary.react_logo}`}></span>
                                            <span className={`${isLinkStackHighlightActive && styles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 2 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                    </div>
                                </div>

                                <div id={itemSelectStyles["guideSelectList"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                                    <div id={itemSelectStyles["guideInnerListContainer"]} className={itemSelectStyles.innerListContainer} >
                                        <div  className={itemSelectStyles.listItem} onClick={()=>{extendGuideMenu('extended_about_dashboard'); dispatch(updateGuideActiveState('extended_about_dashboard')); utilitySound.current.playButtonSound()}}
                                                                                    onMouseEnter={()=>{dispatch(navigateGuideMenu(0));}} onMouseLeave={()=>{dispatch(updateGuideMenuHighlight(false))}}>
                                            <p>
                                                <span className={`${isGuideMenuHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                                About Dashboard
                                            </p>
                                            <div className={itemSelectStyles.listItemBorder}></div>
                                        </div>
                                        <div className={itemSelectStyles.listItem} onClick={()=>{revealThemeSelection(); dispatch(updateShowThemeSelect('true')); dispatch(updateGuideActiveState('theme_select')); utilitySound.current.playButtonSound() }}
                                         onMouseEnter={()=>{dispatch(navigateGuideMenu(1));}} onMouseLeave={()=>{dispatch(updateGuideMenuHighlight(false))}}>
                                            {/* <span className={`${itemSelectStyles.listIcon} ${iconLibrary.download_icon}`}></span> */}
                                            <p>
                                                <span className={`${isGuideMenuHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                                Dashboard Settings
                                            </p>
                                            <div className={itemSelectStyles.listItemBorder}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.guideMusicPlayer}>
                                    <div className={styles.musicPlayerActionButtonContainer}>
                                        <button id={styles["playButton"]} className={styles.skewmorphButton} onClick={()=>{playSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(0));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={!isSongPlaying ? styles.guidePlayIcon : styles.guidePauseIcon }></span>
                                            <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 0 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={styles["previousSelectionButton"]} className={styles.skewmorphButton} onClick={()=>{playPrevSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(1));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 1 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={styles["nextSelectionButton"]} className={styles.skewmorphButton} onClick={()=>{playNextSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(2));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 2 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={styles["arrowSelectionButton"]} className={styles.skewmorphButton} 
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(3));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={styles.arrowPoint}></span>
                                            {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 3 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        </button>
                                        <button id={styles["soundAdjustButton"]} className={styles.skewmorphButton} 
                                        onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(4));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 4 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        </button>
                                    </div>
                                    <div className={styles.musicPlayerSongTitleContainer}
                                        onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(5));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                        {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.backgroundHighlightGlow} ${guideMusicPlayerIndex !== 5 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        <p className={styles.guideMusicPlayerTitle}>{`${isSongPlaying ? currentSongTitle : 'Select Music'}`}</p>
                                    </div>
                                </div>

                                <div className={styles.guideMenuXboxLogoContainer}>
                                    <div className={styles.guideMenuXbox360}>
                                        <div className={styles.xboxGuideLogo}></div>
                                    </div>
                                </div>




                </div>

                <div className={styles.guideSelectThemeContainer} ref={guideSelectThemeRef}>
                    <h2 id={styles["themeSelectTitle"]}>
                        Themes
                    </h2>
                    <h3>Select a theme</h3>

                    <div id={itemSelectStyles["guideSelectTheme"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                        <div id={itemSelectStyles["guideInnerListContainer"]} className={itemSelectStyles.innerListContainer} >
                            <div  className={itemSelectStyles.listItem} onClick={()=>{dispatch(updateSelectedTheme('')); utilitySound.current.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateThemeSelectIndex(0)); dispatch(updateThemeSelectHighlight(true))}} onMouseLeave={()=>{dispatch(updateThemeSelectHighlight(false))}}>
                                <p>
                                    <span className={`${isThemeSelectHighlightActive && itemSelectStyles.listItemHighlight} ${themeSelectIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Xbox 360 (Default)
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{dispatch(updateSelectedTheme('_Carbon')); utilitySound.current.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateThemeSelectIndex(1)); dispatch(updateThemeSelectHighlight(true))}} onMouseLeave={()=>{dispatch(updateThemeSelectHighlight(false))}}>
                                <p>
                                    <span className={`${isThemeSelectHighlightActive && itemSelectStyles.listItemHighlight} ${themeSelectIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Carbon
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Extensible Content from Guide Menu */}
                <div className={styles.aboutDashboardContainer} ref={aboutDashboardPageRef}>
                    <h2 className={styles.aboutDashboardTitle}>
                        Xbox 360 Dashboard Blade UI
                    </h2>
                    <div className={styles.scrollableContent}>
                        <div id={styles['timeMagazineBillGates']} className={styles.articleImg}></div>
                        <h3>Overview</h3>
                        <p className={styles.articleParagraph}>

                            The foundational concept behind the original Xbox 360 Dashboard design was centered on evoking a sense of 
                            infinite energy and power. The incorporation of curved elements, such as the blades and buttons, serves to 
                            harmonize with the console's inherent characteristics, drawing inspiration from the Nexus logo and the industrial 
                            design of the hardware. The sound effects compliment the interface as they were envisioned as a powerful force 
                            waiting to be unleashed, aligning with the overall Xbox experience. This cohesive approach is designed to instill a 
                            feeling of tranquility in the user experience. The elegantly curved blades not only mirror the aesthetics of the 
                            console but also establish a symbiotic connection between the hardware and software, reinforcing the bond between 
                            the two facets of the gaming experience.

                        </p>
                        <h3>Design Era of Early 2000s</h3>
                        <div id={styles['wmpSkinsImg']} className={styles.articleImg}></div>
                        <p id={styles['wmpParagraph']} className={styles.articleParagraph}>

                            An exemplary illustration of design trends from the early 2000s is embodied in the Windows Media Player (WMP) skins
                            designed for Windows XP. These skins epitomized a period when customization and personalization were paramount
                            considerations. The themes developed for the media player showcased a wide spectrum of design choices, with each
                            iteration presenting a distinctive visual identity. Notably, this occurred prior to the industry's shift towards
                            minimalistic design, a transformation prompted by the advent of mobile devices. As these devices entered the market,
                            the challenge arose for interfaces to seamlessly operate on both mobile and desktop environments, marking a
                            significant shift in design preferences.

                        </p>
                    </div>
                </div>

                <div className={styles.gamerProfileContainer} ref={gamerProfilePageRef}>
                    <h2 className={styles.aboutDashboardTitle}>
                        Xbox 360 Dashboard Blade UI
                    </h2>

                    <div className={styles.gamerProfileContent}>
                        <div className={energyCircles.animationContainer}>
                            <div id={energyCircles['r13']} class={energyCircles.ring}></div>
                            <div id={energyCircles['r12']} class={energyCircles.ring}></div>
                            <div id={energyCircles['r11']} class={energyCircles.ring}></div>
                            <div id={energyCircles['r10']} class={energyCircles.ring}></div>
                            <div id={energyCircles['r9']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r8']}  class={energyCircles.ring}></div> 
                            <div id={energyCircles['r7']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r6']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r5']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r4']}  class={energyCircles.ring}></div> 
                            <div id={energyCircles['r3']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r2']}  class={energyCircles.ring}></div>
                            <div id={energyCircles['r1']}  class={energyCircles.ring}></div>
                        </div>
                        <styles className={styles.backgroundOverlay}></styles>
                    </div>
                </div>



            </div>
        </div>  
        </>

    )
};

export default GuideMenu;