import React, {useRef, useState, forwardRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../dashboard_styles/Dashboard.module.css';

import guideMenuStyles from '../../dashboard_styles/GuideMenu.module.css';

import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import itemSelectStyles from "../../dashboard_styles/ItemSelect.module.css";

import profileCardStyles from "../../dashboard_styles/ProfileCard.module.css";

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

    selectNavigationContext,
    selectCommunityCategory,
    navigateCommunityCategory,
    }
from '../menuSlice';

import musicPlaylist from "../../assets/audio/music_playlist.mp3";

import useAudioSound from "../../custom_hooks/useAudioSound";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";



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
            communityDashboardPageRef,
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

    const menuNavigationContext = useSelector(selectNavigationContext);

    const communityCategory = useSelector(selectCommunityCategory);

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
    };

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
    };

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
    };


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
        <div id={guideMenuStyles['guideMenuPanel']} className={guideMenuStyles.guideMenuContainer} ref={guideMenuRef} >
            <div  className={guideMenuStyles[`${'guidePanel' + selected_theme}`]} ref={guidePanelRef}>

                <div className={guideMenuStyles.backButtonContainer} onClick={()=>{backButtonStateSelection(); utilitySound.current.playButtonSound()}}>
                    <p>Back</p>
                    <div className={guideMenuStyles.bControllerImg}></div>
                </div>

                <div className={guideMenuStyles[`${'nameplateEdge' + selected_theme}`]}>
                        <div className={guideMenuStyles.guideControllerIndicatorIcon}></div>
                        <p className={guideMenuStyles.guideNameplateTitle}>Epoxi117</p>
                </div>
                <div className={guideMenuStyles[`${'guidePanelTopBorder' + selected_theme}`]}>
                            <div className={guideMenuStyles.guidePanelClockContainer}>
                                <GuidePanelClock/>
                            </div>
                </div>
                <div className={guideMenuStyles[`${'guidePanelBottomBorder' + selected_theme}`]}>
                </div>
                <div className={guideMenuStyles.guideSettingsView} ref={guideSettingsRef}>
                                <div className={guideMenuStyles.profileContainer} onClick={()=>{ extendGuideMenu('extended_gamer_profile'); dispatch(updateGuideActiveState('extended_gamer_profile')); utilitySound.current.playButtonSound()}}>
                                    <div className={guideMenuStyles.profileImgContainer}>
                                        <div className={guideMenuStyles.profileIcon}>
                                            <div className={guideMenuStyles.iconGloss}></div>
                                        </div>
                                    </div>
                                    <div className={guideMenuStyles.profileDescription}>
                                        <p className={guideMenuStyles.gamerscoreTitle}>Gamerscore</p>
                                        <p className={guideMenuStyles.gamerscoreValue}>21117</p>
                                        <p className={guideMenuStyles.zoneTitle}>Status</p>
                                        <div className={guideMenuStyles.zoneStatus}>Online</div>
                                    </div>
                                </div>

                                <div className={guideMenuStyles.multiButtonListContainer}>
                                    <span className={`${guideMenuStyles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 0 ? "Github": ""}</span>
                                    <span className={`${guideMenuStyles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 1 ? "My Website": ""}</span>
                                    <span className={`${guideMenuStyles.multiButtonTitle}`}>{guideMenuLinkStackIndex == 2 ? "Hmmm": ""}</span>
                                    <div className={guideMenuStyles.buttonGroup}>
                                        <button className={guideMenuStyles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(0));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>


                                            <a href="https://github.com/gilbert-p/xbox_dashboard" target="_blank" rel="noopener noreferrer">
                                                <span id={guideMenuStyles["skewButton_1"]} className={`${guideMenuStyles.buttonIcon} ${iconLibrary.github_logo}`}></span>
                                                <span className={`${isLinkStackHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 0 ? transitionStyles.removeDisplay : ""}`}></span>
                                            </a>

                                           
                                        </button>
                                        <button className={guideMenuStyles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(1));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>


                                            <a href="https://gilbert-p.github.io/" target="_blank" rel="noopener noreferrer">
                                                <span id={guideMenuStyles["skewButton_2"]} className={`${guideMenuStyles.buttonIcon} ${iconLibrary.react_logo}`}></span>
                                                <span className={`${isLinkStackHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 1 ? transitionStyles.removeDisplay : ""}`}></span>
                                            </a>


                                        </button>
                                        <button className={guideMenuStyles.skewmorphButton} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateGuideMenuLinkStack(2));}} onMouseLeave={()=>{dispatch(updateLinkStackHighlight(false))}}>


                                            <a href="https://github.com/gilbert-p/xbox_dashboard" target="_blank" rel="noopener noreferrer">
                                                <span id={guideMenuStyles["skewButton_2"]} className={`${guideMenuStyles.buttonIcon} ${iconLibrary.react_logo}`}></span>
                                                <span className={`${isLinkStackHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMenuLinkStackIndex !== 2 ? transitionStyles.removeDisplay : ""}`}></span>
                                            </a>


                                        </button>
                                    </div>
                                </div>

                                <div id={itemSelectStyles["guideSelectList"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                                    <div id={itemSelectStyles["guideInnerListContainer"]} className={itemSelectStyles.innerListContainer} >
                                        <div  className={itemSelectStyles.listItem} onClick={()=>{extendGuideMenu('extended_about_dashboard'); dispatch(updateGuideActiveState('extended_about_dashboard')); utilitySound.current.playButtonSound()}}
                                                                                    onMouseEnter={()=>{dispatch(navigateGuideMenu(0));}} onMouseLeave={()=>{dispatch(updateGuideMenuHighlight(false))}}>
                                            <p>
                                                
                                                About Dashboard
                                            </p>
                                            <span className={`${isGuideMenuHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                            <div className={itemSelectStyles.listItemBorder}></div>
                                        </div>
                                        <div className={itemSelectStyles.listItem} onClick={()=>{revealThemeSelection(); dispatch(updateShowThemeSelect('true')); dispatch(updateGuideActiveState('theme_select')); utilitySound.current.playButtonSound() }}
                                         onMouseEnter={()=>{dispatch(navigateGuideMenu(1));}} onMouseLeave={()=>{dispatch(updateGuideMenuHighlight(false))}}>
                                            {/* <span className={`${itemSelectStyles.listIcon} ${iconLibrary.download_icon}`}></span> */}
                                            <p>

                                                Dashboard Settings
                                            </p>
                                            <span className={`${isGuideMenuHighlightActive && itemSelectStyles.listItemHighlight} ${guideMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                            <div className={itemSelectStyles.listItemBorder}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={guideMenuStyles.guideMusicPlayer}>
                                    <div className={guideMenuStyles.musicPlayerActionButtonContainer}>
                                        <button id={guideMenuStyles["playButton"]} className={guideMenuStyles.skewmorphButton} onClick={()=>{playSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(0));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={!isSongPlaying ? guideMenuStyles.guidePlayIcon : guideMenuStyles.guidePauseIcon }></span>
                                            <span className={`${isGuideMusicPlayerHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 0 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={guideMenuStyles["previousSelectionButton"]} className={guideMenuStyles.skewmorphButton} onClick={()=>{playPrevSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(1));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={`${isGuideMusicPlayerHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 1 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={guideMenuStyles["nextSelectionButton"]} className={guideMenuStyles.skewmorphButton} onClick={()=>{playNextSong(); utilitySound.current.playButtonSound()}}
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(2));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={`${isGuideMusicPlayerHighlightActive && guideMenuStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 2 ? transitionStyles.removeDisplay : ""}`}></span>
                                        </button>
                                        <button id={guideMenuStyles["arrowSelectionButton"]} className={guideMenuStyles.skewmorphButton} 
                                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(3));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            <span className={guideMenuStyles.arrowPoint}></span>
                                            {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 3 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        </button>
                                        <button id={guideMenuStyles["soundAdjustButton"]} className={guideMenuStyles.skewmorphButton} 
                                        onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(4));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                            {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 4 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        </button>
                                    </div>
                                    <div className={guideMenuStyles.musicPlayerSongTitleContainer}
                                        onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(5));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                        {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.backgroundHighlightGlow} ${guideMusicPlayerIndex !== 5 ? transitionStyles.removeDisplay : ""}`}></span> */}
                                        <p className={guideMenuStyles.guideMusicPlayerTitle}>{`${isSongPlaying ? currentSongTitle : 'Select Music'}`}</p>
                                    </div>
                                </div>

                                <div className={guideMenuStyles.guideMenuXboxLogoContainer}>
                                    <div className={guideMenuStyles.guideMenuXbox360}>
                                        <div className={guideMenuStyles.xboxGuideLogo}></div>
                                    </div>
                                </div>




                </div>

                <div className={guideMenuStyles.guideSelectThemeContainer} ref={guideSelectThemeRef}>
                    <h2 id={guideMenuStyles["themeSelectTitle"]}>
                        Themes
                    </h2>
                    <h3>Select a theme</h3>

                    <div id={itemSelectStyles["guideSelectTheme"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                        <div id={itemSelectStyles["guideInnerListContainer"]} className={itemSelectStyles.innerListContainer} >
                            <div  className={itemSelectStyles.listItem} onClick={()=>{dispatch(updateSelectedTheme('')); utilitySound.current.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateThemeSelectIndex(0)); dispatch(updateThemeSelectHighlight(true))}} onMouseLeave={()=>{dispatch(updateThemeSelectHighlight(false))}}>
                                <p>

                                    Xbox 360 (Default)
                                </p>
                                <span className={`${isThemeSelectHighlightActive && itemSelectStyles.listItemHighlight} ${themeSelectIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{dispatch(updateSelectedTheme('_Carbon')); utilitySound.current.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateThemeSelectIndex(1)); dispatch(updateThemeSelectHighlight(true))}} onMouseLeave={()=>{dispatch(updateThemeSelectHighlight(false))}}>
                                <p>

                                    Carbon
                                </p>
                                <span className={`${isThemeSelectHighlightActive && itemSelectStyles.listItemHighlight} ${themeSelectIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Extensible Content from Guide Menu */}
                <div className={guideMenuStyles.aboutDashboardContainer} ref={aboutDashboardPageRef}>
                    <h2 className={guideMenuStyles.aboutDashboardTitle}>
                        Xbox 360 Dashboard Blade UI
                    </h2>
                    <div className={guideMenuStyles.scrollableContent}>
                        <div id={guideMenuStyles['timeMagazineBillGates']} className={guideMenuStyles.articleImg}></div>
                        <h3>Overview</h3>
                        <p className={guideMenuStyles.articleParagraph}>

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
                        <div id={guideMenuStyles['wmpSkinsImg']} className={guideMenuStyles.articleImg}></div>
                        <p id={guideMenuStyles['wmpParagraph']} className={guideMenuStyles.articleParagraph}>

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

                <div className={guideMenuStyles.gamerProfileContainer} ref={gamerProfilePageRef}>
                {/* <div className={styles.backgroundOverlay}></div> */}

                    <h2 className={guideMenuStyles.aboutDashboardTitle}>
                        Web Developer
                    </h2>

                    <div className={energyCircles.animationContainer}>
                            <div id={energyCircles['r13']} className={energyCircles.ring}></div>
                            <div id={energyCircles['r12']} className={energyCircles.ring}></div>
                            <div id={energyCircles['r11']} className={energyCircles.ring}></div>
                            <div id={energyCircles['r10']} className={energyCircles.ring}></div>
                            <div id={energyCircles['r9']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r8']}  className={energyCircles.ring}></div> 
                            <div id={energyCircles['r7']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r6']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r5']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r4']}  className={energyCircles.ring}></div> 
                            <div id={energyCircles['r3']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r2']}  className={energyCircles.ring}></div>
                            <div id={energyCircles['r1']}  className={energyCircles.ring}></div>
                    </div>

                    <div className={guideMenuStyles.gamerProfileContent}>


                        <div className={guideMenuStyles.backgroundOverlay}></div>

                            <div className={guideMenuStyles.contentContainer}>
                                <div id={guideMenuStyles['toolsSection']} className={guideMenuStyles.blockContent}>
                                    <h3>Tools</h3>

                                    <p>
                                        This dashboard as a web application to practice web development along with animations.
                                        The following tools were used in this project:
                                    </p>

                                    <ul>
                                        <li>React JS</li>
                                        <li>GSAP (Greensock Animation Library)</li>
                                        <li>Figma</li>
                                        <li>Original Xbox 360 Style Guide (Reference)</li>
                                    </ul>
                                </div>

                                <div id={guideMenuStyles['inspirationSection']} className={guideMenuStyles.blockContent}>
                                    <h3>Inspiration</h3>

                                    <p>
                                        Big thanks to <b>Rowland Brown</b> for his heavy influence in making this 
                                        dashboard come to life!
                                    </p>

                                    <ul className={guideMenuStyles.gamecaseList}>
                                        <li id={guideMenuStyles['website_gamecase']} className={guideMenuStyles.gameCaseListItem}>
                                            <a className={guideMenuStyles.gamecaseAnchorTag} href="https://rowlandbrown.com/xbox-360-dashboard-ui-blades" target="_blank" rel="noopener noreferrer">
                                            Rowland Brown Website
                                            </a>
                                        </li>
                                        <li id={guideMenuStyles['behance_gamecase']}>      
                                            <a className={guideMenuStyles.gamecaseAnchorTag} href="https://www.behance.net/rowbrown" target="_blank" rel="noopener noreferrer">
                                            Rowland Brown Behance
                                            </a>
                                        </li>
                                        <li id={guideMenuStyles['styleguide_gamecase']}>
                                            <a className={guideMenuStyles.gamecaseAnchorTag} href="https://digiex.net/threads/xbox-360-style-guide.15469/" target="_blank" rel="noopener noreferrer">
                                            Xbox 360 Style Guide
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className={guideMenuStyles.contentContainer}>
                                <div id={guideMenuStyles['profileCard']} className={guideMenuStyles.blockContent}>
                                    <div id={profileCardStyles['guideProfile']} className={profileCardStyles.profileContainer} >
                                        <p>Epoxi117</p>
                                        <div className={profileCardStyles.profileImgContainer} >
                                            <div className={profileCardStyles.profileIcon}>
                                                <div className={profileCardStyles.iconGloss}></div>
                                            </div>
                                        </div>
                                        <div className={profileCardStyles.profileDescription}>
                                            <p className={profileCardStyles.repTitle}>Rep</p>
                                            <div className={profileCardStyles.reputationStars}>
                                                <div className={profileCardStyles.starIcon}></div>
                                                <div className={profileCardStyles.starIcon}></div>
                                                <div className={profileCardStyles.starIcon}></div>
                                                <div className={profileCardStyles.starIcon}></div>
                                                <div className={profileCardStyles.starIcon}></div>
                                            </div>
                                            <p className={profileCardStyles.gamerscoreTitle}>Gamerscore</p>
                                            <p className={profileCardStyles.gamerscoreValue}>21117</p>
                                            <p className={profileCardStyles.zoneTitle}>Zone</p>
                                            <div className={profileCardStyles.zoneStatus}>Pro</div>
                                        </div>
                                    </div>
                                </div>
                                <div  id={guideMenuStyles['profileDetails']} className={guideMenuStyles.blockContent}>
                                
                                        <p>United States</p>
                                        <p>https://gilbert-p.github.io/</p>
                                    
                                </div>
                            </div>


                    </div>
                </div>


                <div className={guideMenuStyles.communitySectionContainer} ref={communityDashboardPageRef}>
                {/* <div className={styles.backgroundOverlay}></div> */}


                    <h2 className={guideMenuStyles.aboutDashboardTitle}>
                        Community
                    </h2>

                    <div className={guideMenuStyles.communityNavFolders}>
                        <div id={guideMenuStyles[communityCategory === 'messages' ? 'navFolderMessages' : '']}></div>
                        <div id={guideMenuStyles[communityCategory === 'friends' ? 'navFolderFriends' : '']}></div>
                        <div id={guideMenuStyles[communityCategory === 'players' ? 'navFolderPlayers' : '']}></div>
                    </div>

                    <div id={guideMenuStyles[guideMenuStyles.communityMessageSection]} className={`${communityCategory === "messages" ? guideMenuStyles.communitySectionContent: transitionStyles.removeDisplay}`}>
                        
                        <div className={itemSelectStyles.communityPageItemContainer}>
                        <div className={itemSelectStyles.groupContainer}>
                            <p>Create New</p>
                        </div>
                            <div className={itemSelectStyles.groupContainer}>
                                <p>Cortana</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Where is the Chief at? </p>
                                </div>
                            </div>
                            <div className={itemSelectStyles.groupContainer}>
                                <p>Bill Gates Clone</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p> Welcome to the Xbox Experience.</p>
                                </div>
                            </div>
                            <div className={itemSelectStyles.groupContainer}>
                                <p>John-117</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Need backup in the Warthog, ASAP!</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <p>Lara Croft</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Exploring ancient tombs, anyone joining?</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <p>Commander Shepard</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Reapers inbound! Calling all N7 operatives!</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <p>Marcus Fenix</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Locust Horde spotted, grab your Lancers!</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <p>Ezio Auditore</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Assassins, assemble in the shadows.</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <p>Alan Wake</p>
                                <div className={itemSelectStyles.communityMessageContent}>
                                    <div className={itemSelectStyles.messageSelectIcon}></div>
                                    <p>Darkness is closing in, need a flashlight!</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={`${communityCategory === "friends" ? guideMenuStyles.communitySectionContent: transitionStyles.removeDisplay}`}>
                        
                        <div className={itemSelectStyles.communityPageItemContainer}>
                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>MartyTheElder </p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Halo 3</p>
                                </div>
                            </div>
                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>LunaTheGamer</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Halo 3: ODST</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>ShadowPlayerX</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Assassin's Creed</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>EpicGamer23</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Call of Duty: Modern Warfare 2</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>TechNinja76</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Left 4 Dead</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>StealthGaming</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Fallout 3</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>NovaPlayer99</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Gears of War 2</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>SkywalkerGamer</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>Batman: Arkham Asylum</p>
                                </div>
                            </div>

                            <div className={itemSelectStyles.groupContainer}>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.gamerProfileIcon}></div>
                                    <p className={itemSelectStyles.gamerTag}>QuantumPlayer</p>
                                </div>
                                <div className={itemSelectStyles.flexInnerContainer}>
                                    <div className={itemSelectStyles.friendOnlineIcon}></div>
                                    <p className={itemSelectStyles.friendStatus}>BioShock 2</p>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                    <div className={`${communityCategory === "players" ? guideMenuStyles.communitySectionContent: transitionStyles.removeDisplay}`}>
                        
                        <div className={itemSelectStyles.communityPageItemContainer}>
                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            SultanOfSpuzz21
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIconInactive}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Call of Duty 4
                                        </p>
                                        <p>Last met yesterday.</p>
                                    </div>

                                </div>
                                
                            </div>
                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            SultanOfSpuzz21
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIconInactive}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Call of Duty 4
                                        </p>
                                        <p>Last met yesterday.</p>
                                    </div>
                                </div>
                            </div>

                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            PixelWarrior99
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIconInactive}></div>
                                            <div className={itemSelectStyles.starIconInactive}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Call of Duty MW2
                                        </p>
                                        <p>Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            GhostReaper9000
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Gears of War 2
                                        </p>
                                        <p>Last met yesterday.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                        ShadowStrikerX
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Feeding Frenzy
                                        </p>
                                        <p>Last met yesterday.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={itemSelectStyles.playerGroupContainer}>
                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.recentPlayerIcon}></div>
                                    <div className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                        ShadowStrikerX
                                        </p>
                                        <div className={itemSelectStyles.recentPlayerRepStars}>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                            <div className={itemSelectStyles.starIcon}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={itemSelectStyles.playerFlexInnerContainer}>
                                    <div className={itemSelectStyles.playerControllerIcon}></div>
                                    <div id={itemSelectStyles['playerRecentDetails']} className={itemSelectStyles.recentPlayerNameRepList}>
                                        <p className={itemSelectStyles.recentPlayerTitle}>
                                            Geometry Wars
                                        </p>
                                        <p>Last met yesterday.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <nav className={guideMenuStyles.communityNavButtons}>
                            <div id={guideMenuStyles[communityCategory === 'messages' ? '' : 'messageButtonInactive']} onClick={()=>{dispatch(navigateCommunityCategory('messages'))}}
                             className={guideMenuStyles.navButton}>
                                <div id={guideMenuStyles['communityMessageIcon']} className={`${communityCategory === 'messages' ? guideMenuStyles.iconContainerActive : guideMenuStyles.iconContainerInactive}`}></div>
                                <p>Messages</p>
                            </div>
                            <div id={guideMenuStyles[communityCategory === 'friends' ? '' : 'friendsButtonInactive']} onClick={()=>{dispatch(navigateCommunityCategory('friends'))}}
                             className={guideMenuStyles.navButton}>
                                <div id={guideMenuStyles['communityFriendsIcon']} className={`${communityCategory === 'friends' ? guideMenuStyles.iconContainerActive : guideMenuStyles.iconContainerInactive}`}></div>
                                <p>Friends</p>
                            </div>
                            <div id={guideMenuStyles[communityCategory === 'players' ? '' : 'playerButtonInactive']} onClick={()=>{dispatch(navigateCommunityCategory('players'))}}
                             className={guideMenuStyles.navButton}>
                                <div id={guideMenuStyles['communityPlayersIcon']} className={`${communityCategory === 'players' ? guideMenuStyles.iconContainerActive : guideMenuStyles.iconContainerInactive}`}></div>
                                <p>Players</p>
                            </div>
                    </nav>
                </div>



            </div>
        </div>  
        </>

    )
};

export default GuideMenu;