import { useSelector, useDispatch } from 'react-redux';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import profileCardStyles from '../../dashboard_styles/ProfileCard.module.css';
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import descriptionContentStyles from "../../dashboard_styles/DescriptionContainer.module.css";
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import xboxliveStyles from '../../dashboard_styles/Xboxlive.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';
import ringAnim from '../../dashboard_styles/ringAnimation.module.css';
import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";
import useUtilitySfx from "../../custom_hooks/useUtilitySfx";

import { updateSelectionHighlight,
    selectHighlightState,
    navigateXboxliveMenu,
    selectXboxliveMenuIndex,
    navigateCommunityCategory,
} from '../../redux_slices/menuSlice';

import { XboxlivePageProps, CustomRootVars } from '../../custom_types/utilityTypes';



const XboxlivePage: React.FC<XboxlivePageProps> = (props) => {

    const dispatch = useDispatch();

    /* Utility SFX specific function */

    const utilitySound = useUtilitySfx();

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const xboxliveMenuIndex = useSelector(selectXboxliveMenuIndex);

    const {current_context_index, foreignExtendGamerProfile, foreignExtendCommunityPage } = props;



    const listItemHighlight = (current_menu_index: number | null, target_index: number): string | null => {
        
        let highlight_state = false;

        highlight_state = target_index == current_menu_index ? true: false;

        if(!highlight_state) {
            return transitionStyles.instantTransparent;
        }
        else {
            return null;
        }
    };



    
  return (
     <>
        <div id={xboxliveStyles["xboxliveContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 1 ? 1 : -1}`} as CustomRootVars}>

        <div  className={` ${bladeStyles.dashboardWhiteUnderlay}   ${current_context_index === 1 ? (bladeStyles.dashboardUnderlayImage + ' ' + bladeStyles.dashboardUnderlayActive) : '' }`}></div> 



        <div id={xboxliveStyles["xboxlive"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 1 ? transitionStyles.removeDisplay : ""}`}>
            <div className={pageGridStyles.leftContent}>
                <div className={profileCardStyles.profileContainer} onClick={()=>{foreignExtendGamerProfile(); utilitySound.current?.playButtonSound();}} >
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
                <div className={`${itemSelectStyles.xboxliveListContainer} ${itemSelectStyles.selectItemListContainer}`}>
                    <div id={itemSelectStyles["xboxliveHighlightContainer"]} className={itemSelectStyles.boxInsetHighlightContainer}>
                        <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 0)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 1)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(xboxliveMenuIndex, 2)}`}></div>
                        </div>
                        <div className={isHighlightActive ? itemSelectStyles.boxInsetHighlightMaskBottom: ''}>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 0)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 1)}`}></div>
                            <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(xboxliveMenuIndex, 2)}`}></div>
                        </div>
                    </div>
                    <div className={itemSelectStyles.innerListContainer} > 
                        <div className={itemSelectStyles.listItem} onClick={()=>{foreignExtendCommunityPage(); dispatch(navigateCommunityCategory('messages')); utilitySound.current?.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateXboxliveMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.mail_shadow_icon}`}></span>
                            <p>

                                Messages
                            </p>
                            <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                        <div className={itemSelectStyles.listItem} onClick={()=>{foreignExtendCommunityPage(); dispatch(navigateCommunityCategory('friends')); utilitySound.current?.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateXboxliveMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.friends_icon}`}></span>
                            <p>

                                Friends
                            </p>
                            <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                        <div className={itemSelectStyles.listItem} onClick={()=>{foreignExtendCommunityPage(); dispatch(navigateCommunityCategory('players')); utilitySound.current?.playButtonSound()}}
                            onMouseEnter={()=>{dispatch(navigateXboxliveMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                            <span className={`${itemSelectStyles.listIcon} ${iconLibrary.chat_icon}`}></span>
                            <p>

                                Recent
                            </p>
                            <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${xboxliveMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                            <div className={itemSelectStyles.listItemBorder}></div>
                        </div>
                    </div>
                </div>
                <div className={xboxliveStyles.insetContainer}>
                    <div className={xboxliveStyles.xboxliveAnimationContainer}>
                        <div className={xboxliveStyles.circleAnimation}>
                            <div className={`${ringAnim.ring}`} style={{"--i": 0} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 1} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 2} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 3} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 4} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 5} as CustomRootVars}>
                                <div className={ringAnim.ringInner}></div>
                            </div>
                            <div className={`${ringAnim.ring}`} style={{"--i": 6} as CustomRootVars}>
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
