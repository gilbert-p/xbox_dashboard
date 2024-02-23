import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    selectGamesMenuIndex,
    navigateGamesMenu,
} from '../menuSlice';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import profileCardStyles from '../../dashboard_styles/ProfileCard.module.css';
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';
import gamesStyles from '../../dashboard_styles/Games.module.css';
import descriptionContentStyles from "../../dashboard_styles/DescriptionContainer.module.css";

import styles from "../../dashboard_styles/Dashboard.module.css";

import backgroundAnimation from "../../dashboard_styles/BackgroundPulse.module.css";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";


const GamesPage = (props) => {

    const dispatch = useDispatch();

    const utilitySound = useUtilitySfx();


    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const gamesMenuIndex = useSelector(selectGamesMenuIndex);

    const {current_context_index } = props;

    const listItemHighlight = (current_menu_index, target_index) => {
        
        let highlight_state = false;

        highlight_state = target_index !== current_menu_index ? true: false;

        if(highlight_state) {
            return transitionStyles.instantTransparent;
        }
        else {
            return "";
        }
    };
    

  return (
     <>
        <div id={gamesStyles["gamesContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 2 ? 1 : -1}`}}>

            <div id={gamesStyles["games"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 2 ? transitionStyles.makeTransparent : ""}`}>
                <div className={pageGridStyles.leftContent}>
                    <div className={profileCardStyles.profileContainer} onClick={()=>{utilitySound.current.playButtonSound()}}>
                        <p>Epoxi117</p>
                        <div className={profileCardStyles.profileImgContainer}>
                            <div className={profileCardStyles.profileIcon}></div>
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
                    <div className={itemSelectStyles.selectItemListContainer}>
                        <div id={itemSelectStyles["gamesHighlightContainer"]} className={itemSelectStyles.boxInsetHighlightContainer}>
                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(gamesMenuIndex, 0)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(gamesMenuIndex, 1)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(gamesMenuIndex, 2)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(gamesMenuIndex, 3)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(gamesMenuIndex, 4)}`}></div>
                            </div>
                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 0)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 1)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 2)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 3)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 4)}`}></div>
                            </div>
                        </div>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.trophy_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Achievements
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.controller_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Played Games
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.joystick_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Xbox Live Arcade
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.demos_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Demos
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(4));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.film_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Trailers
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={pageGridStyles.rightContent}>
                    <div className={gamesStyles.xbox360Logo}>
                        <div className={gamesStyles.boxShadow}></div>
                    </div>
                    <div className={descriptionContentStyles.descriptionContainer}>
                        <div className={descriptionContentStyles.descriptionTitle}>Xbox LIVE</div>
                        <div className={descriptionContentStyles.descriptionContent}>
                            Games. Tournaments. Entertainment. 
                            All the rewards. Endless possibilities. What are you waiting for?
                        </div>
                    </div>
                </div>

            </div>
        </div>
  </>);
};

export default GamesPage;
