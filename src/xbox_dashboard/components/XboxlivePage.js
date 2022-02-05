import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    navigateXboxliveMenu,
    selectXboxliveMenuIndex,
} from '../menuSlice';


import iconLibrary from "../../styles/IconStyling.module.css";
import profileCardStyles from '../../styles/ProfileCard.module.css';
import pageGridStyles from '../../styles/PageGrid.module.css';
import descriptionContentStyles from "../../styles/DescriptionContainer.module.css";
import transitionStyles from '../../styles/TransitionStyles.module.css';
import xboxliveStyles from '../../styles/Xboxlive.module.css';
import itemSelectStyles from '../../styles/ItemSelect.module.css';
import gamesStyles from '../Games.module.css';
import ringAnim from '../../styles/ringAnimation.module.css';

import styles from "../Dashboard.module.css";

import backgroundAnimation from "../../styles/BackgroundPulse.module.css";


const XboxlivePage = (props) => {

    const dispatch = useDispatch();

    // const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const xboxliveMenuIndex = useSelector(selectXboxliveMenuIndex);

    const { xboxBackgroundRef, current_context_index } = props;


    const listItemHighlight = (current_menu_index, target_index) => {
        
        let highlight_state = false;

        if(isHighlightActive) {
            highlight_state = target_index !== current_menu_index ? true: false;
        }

        if(highlight_state) {
            return transitionStyles.instantTransparent;
        }
        else {
            return "";
        }


    };

  return (
     <>
        <div id={xboxliveStyles["xboxliveContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 1 ? 1 : -1}`}}>

        <div className={styles.xboxliveBackground} ref={xboxBackgroundRef} >
            <div id={backgroundAnimation["xboxlivePulse"]} className={`${backgroundAnimation.pulseContainer} ${current_context_index !== 1 ? transitionStyles.makeTransparent : ""}`}>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 1}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 2}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 3}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 4}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 5}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 6}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 7}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 8}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 9}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
                <div className={backgroundAnimation.pulseRing} style={{"--ring-index": 10}}>
                    <div className={backgroundAnimation.pulseRingInner}></div>
                </div>
            </div>
        </div>

        <div id={xboxliveStyles["xboxlive"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 1 ? transitionStyles.makeTransparent : ""}`}>
            <div className={pageGridStyles.leftContent}>
                <div className={profileCardStyles.profileContainer}>
                    <p>Epoxi117</p>
                    <div className={profileCardStyles.profileImgContainer}>
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
                <div className={`${itemSelectStyles.xboxliveListContainer} ${itemSelectStyles.selectItemListContainer}`}>
                    <div id={itemSelectStyles["xboxliveHighlightContainer"]} className={itemSelectStyles.boxInsetHighlightContainer}>
                        <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 0)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 1)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 2)}`}></div>
                        </div>
                        <div className={isHighlightActive && itemSelectStyles.boxInsetHighlightMaskBottom}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 0)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 1)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 2)}`}></div>
                        </div>
                    </div>
                    <div className={itemSelectStyles.innerListContainer} >
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(true))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.messages_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                Messages
                            </p>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(true))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.friends_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                Friends
                            </p>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                        <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateXboxliveMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(true))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.chat_icon}`}></span>
                            <p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                Chat
                            </p>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                    </div>
                </div>
                <div className={xboxliveStyles.insetContainer}>
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
                        </div>
                        <div className={xboxliveStyles.logoContainer}></div>
                    </div>
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
