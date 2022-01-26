import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectSystemMainMenuIndex,
    navigateSystemMenu,
} from '../menuSlice';

import pageGridStyles from '../../styles/PageGrid.module.css';
import transitionStyles from '../../styles/TransitionStyles.module.css';
import systemStyles from '../System.module.css';
import gamesStyles from '../Games.module.css';


const XboxlivePage = () => {

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const systemMenuIndex = useSelector(selectSystemMainMenuIndex);

  return (
     <>
        <div id={systemStyles["systemContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 4 ? 1 : -1}`}} >
            <div id={systemStyles["system"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 4 ? transitionStyles.makeTransparent : ""}`}>

                <div className={systemStyles.leftContent}>
                    <div className={systemStyles.selectItemListContainer}>
                        <div className={systemStyles.boxInsetHighlightContainer}>
                            <div className={systemStyles.boxInsetHighlightMaskTop}>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 5 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightTop} ${systemMenuIndex !== 6 ? transitionStyles.makeTransparent : ""}`}></div>
                            </div>
                            <div className={systemStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 5 ? transitionStyles.makeTransparent : ""}`}></div>
                                <div className={`${systemStyles.boxInsetHighlightBottom} ${systemMenuIndex !== 6 ? transitionStyles.makeTransparent : ""}`}></div>
                            </div>
                        </div>
                        <div className={systemStyles.innerListContainer} >
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Console Settings
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Family Settings
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Memory
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Network Settings
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(4));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Computers
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(5));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 5 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Xbox Live Vision
                                </p>
                            </div>
                            <div className={systemStyles.listItem} onMouseEnter={()=>{dispatch(navigateSystemMenu(6));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${systemStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${systemStyles.listItemHighlight} ${systemMenuIndex !== 6 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Initial Setup
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={systemStyles.rightContent}>
                    <div className={systemStyles.containerReset}>
                        <div id="console-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descTitle}>
                                Edit your Xbox 360 system settings, including:
                            </div>
                            <div className={systemStyles.descContent}>
                                <ul>
                                    <li>Display</li>
                                    <li>Audio</li>
                                    <li>Language</li>
                                    <li>Remote Control</li>
                                    <li>and more</li>
                                </ul>
                            </div>
                        </div>
                        <div id="family-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Protect younger family members by customizing content, communications, and online
                                    interactions. Adjust settings on the console or at the individual profile level.
                                </p>
                            </div>
                        </div>
                        <div id="memory-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Move or delete saved games, profiles, and other items on Xbox 360 storage devices.</p>
                            </div>
                        </div>
                        <div id="network-settings" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Connect your console to your home network or Xbox Live. Set up wireless network connections and test network settings.</p>
                            </div>
                        </div>
                        <div id="computers" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Manage your connections to Windows XP or Media Center PC.</p>
                            </div>
                        </div>
                        <div id="xboxlive-vision" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 5 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Change the settings for your Xbox Live Vision camera.</p>
                            </div>
                        </div>
                        <div id="initial-setup" className={`${systemStyles.itemSelectDescription} ${systemMenuIndex !== 6 ? transitionStyles.makeTransparent : ""}`}>
                            <div className={systemStyles.descContent}>
                                <p>Run the system setup that you saw the first time you started the console.</p>
                            </div>
                        </div>
                    </div>

                    
                </div>

            </div>
        </div>
  </>);
};

export default XboxlivePage;
