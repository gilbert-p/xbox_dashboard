import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    selectGamesMenuIndex,
    navigateGamesMenu,
} from '../menuSlice';

import profileCardStyles from '../../styles/ProfileCard.module.css';
import pageGridStyles from '../../styles/PageGrid.module.css';
import transitionStyles from '../../styles/TransitionStyles.module.css';
import itemSelectStyles from '../../styles/ItemSelect.module.css';
import gamesStyles from '../Games.module.css';
import descriptionContentStyles from "../../styles/DescriptionContainer.module.css";


const XboxlivePage = (props) => {

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const gamesMenuIndex = useSelector(selectGamesMenuIndex);

  return (
     <>
        <div id={gamesStyles["gamesContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 2 ? 1 : -1}`}}>
            <div id={gamesStyles["games"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 2 ? transitionStyles.makeTransparent : ""}`}>
                <div className={pageGridStyles.leftContent}>
                    <div className={profileCardStyles.profileContainer}>
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
                    <div id={itemSelectStyles["gamesSelection"]} className={itemSelectStyles.selectItemListContainer}>
                        <div className={itemSelectStyles.boxInsetHighlightContainer}>
                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 0 ? transitionStyles.instantTransparent : ""}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 1 ? transitionStyles.instantTransparent : ""}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && gamesMenuIndex !== 2 ? transitionStyles.instantTransparent : ""}`}></div>
                            </div>
                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 0 ? transitionStyles.instantTransparent : ""}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 1 ? transitionStyles.instantTransparent : ""}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && gamesMenuIndex !== 2 ? transitionStyles.instantTransparent : ""}`}></div>
                            </div>
                        </div>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Music
                                </p>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Pictures
                                </p>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateGamesMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Videos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={pageGridStyles.rightContent}>
                    <div className={gamesStyles.xbox360Logo}></div>
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

export default XboxlivePage;
