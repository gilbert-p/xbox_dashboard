import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectSystemMainMenuIndex,
    navigateSystemMenu,
} from '../menuSlice';


import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import systemStyles from '../../dashboard_styles/System.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';

import styles from "../../dashboard_styles/Dashboard.module.css";

import backgroundAnimation from "../../dashboard_styles/BackgroundPulse.module.css";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";


const XboxlivePage = (props) => {

    const dispatch = useDispatch();

    const utilitySound = useUtilitySfx();

    //Menu state variables
    const systemMenuIndex = useSelector(selectSystemMainMenuIndex);

    const { systemBackgroundRef, current_context_index } = props;

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
        <div id={systemStyles["systemContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 4 ? 1 : -1}`}} >

            <div id={pageGridStyles["system"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 4 ? transitionStyles.makeTransparent : ""}`}>

                <div className={pageGridStyles.leftContent}>
                    <div className={`${itemSelectStyles.systemListContainer} ${itemSelectStyles.selectItemListContainer}`}>
                        <div id={itemSelectStyles["systemHighlightContainer"]} className={itemSelectStyles.boxInsetHighlightContainer}>
                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 0)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 1)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 2)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 3)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 4)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 5)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(systemMenuIndex, 6)}`}></div>
                            </div>
                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 0)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 1)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 2)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 3)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 4)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 5)}`}></div>
                                <div className={`${itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(systemMenuIndex, 6)}`}></div>
                            </div>
                        </div>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.console_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Console Settings
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.family_settings_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Family Settings
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.mu_storage_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Memory
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.adhoc_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Network Settings
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(4));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.computer_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 4 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Computers
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(5));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.xboxlive_vision}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 5 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Xbox Live Vision
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateSystemMenu(6));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.console_controller_icon}`}></span>
                                <p>
                                    <span className={`${itemSelectStyles.listItemHighlight} ${systemMenuIndex !== 6 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Initial Setup
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={pageGridStyles.rightContent}>
                    <div className={itemSelectStyles.containerReset}>
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
