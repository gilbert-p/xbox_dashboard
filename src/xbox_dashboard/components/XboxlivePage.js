import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    navigateXboxliveMenu,
    selectXboxliveMenuIndex,
} from '../menuSlice';

import profileCardStyles from '../../styles/ProfileCard.module.css';
import pageGridStyles from '../../styles/PageGrid.module.css';
import descriptionContentStyles from "../../styles/DescriptionContainer.module.css";
import transitionStyles from '../../styles/TransitionStyles.module.css';
import xboxliveStyles from '../../styles/Xboxlive.module.css';
import itemSelectStyles from '../../styles/ItemSelect.module.css';
import gamesStyles from '../Games.module.css';
import ringAnim from '../../styles/ringAnimation.module.css';


const XboxlivePage = () => {

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const xboxliveMenuIndex = useSelector(selectXboxliveMenuIndex);

  return (
     <>
        <div id={xboxliveStyles["xboxliveContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 1 ? 1 : -1}`}}>
        <div id={xboxliveStyles["xboxlive"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 1 ? transitionStyles.makeTransparent : ""}`}>
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
                <div id={itemSelectStyles["xboxliveSection"]} className={itemSelectStyles.selectItemListContainer}>
                    <div className={itemSelectStyles.boxInsetHighlightContainer}>
                        <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 0 ? transitionStyles.instantTransparent : ""}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 1 ? transitionStyles.instantTransparent : ""}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${isHighlightActive && xboxliveMenuIndex !== 2 ? transitionStyles.instantTransparent : ""}`}></div>
                        </div>
                        <div className={isHighlightActive && itemSelectStyles.boxInsetHighlightMaskBottom}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 0 ? transitionStyles.instantTransparent : ""}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 1 ? transitionStyles.instantTransparent : ""}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${isHighlightActive && xboxliveMenuIndex !== 2 ? transitionStyles.instantTransparent : ""}`}></div>
                        </div>
                    </div>
                    <div className={itemSelectStyles.innerListContainer} >
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                Messages
                            </p>
                        </div>
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                Friends
                            </p>
                        </div>
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                Chat
                            </p>
                        </div>
                    </div>
                </div>
                <div className={xboxliveStyles.xboxliveAnimationContainer}>
                    <div className={xboxliveStyles.circleAnimation}>
                        <div className={`${ringAnim.ring}`} style={{"--i": 0}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 1}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 2}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 3}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 4}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 5}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 6}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 7}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 8}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 9}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 10}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                        <div className={`${ringAnim.ring}`} style={{"--i": 11}}>
                            <div className={ringAnim.ringInner}></div>
                        </div>
                    </div>
                    <div className={xboxliveStyles.logoContainer}></div>
                </div>
            </div>
            <div className={pageGridStyles.rightContent}>
                <div className={xboxliveStyles.xboxliveLogo}></div>
                <div className={descriptionContentStyles.descriptionContainer}>
                    <div className={descriptionContentStyles.descriptionTitle}>Xbox LIVE</div>
                    <div className={descriptionContentStyles.descriptionContent}>
                        <p>                                        Games. Tournaments. Entertainment. 
                        All the rewards. Endless possibilities. What are you waiting for?</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </>);
};

export default XboxlivePage;
