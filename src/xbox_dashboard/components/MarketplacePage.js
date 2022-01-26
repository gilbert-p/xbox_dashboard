import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    selectMarketplaceMenuIndex,
    navigateMarketplaceMenu,
} from '../menuSlice';

import pageGridStyles from '../../styles/PageGrid.module.css';
import transitionStyles from '../../styles/TransitionStyles.module.css';
import itemSelectStyles from '../../styles/ItemSelect.module.css';
import marketplaceStyles from '../Marketplace.module.css';
import gamesStyles from '../Games.module.css';


const XboxlivePage = () => {

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const marketplaceMenuIndex = useSelector(selectMarketplaceMenuIndex);

  return (
     <>
        <div id={marketplaceStyles["marketplaceContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>
            <div id={marketplaceStyles["marketplace"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 0 ? transitionStyles.makeTransparent : ""}`}>
                <div className={pageGridStyles.leftContent}>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Games</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Media and Entertainment</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Game Demos</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Game Videos</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Themes and Gamer Pictures</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Featured Downloads</p>
                    </div>
                </div>
                <div className={pageGridStyles.rightContent}>
                    <div className={marketplaceStyles.imageHeaderContainer}></div>
                    <div id={itemSelectStyles["marketplaceSection"]} className={itemSelectStyles.selectItemListContainer}>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.joystick_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Redeem Code
                                </p>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.trophy_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Active Downloads
                                </p>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${gamesStyles.controller_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Account Management
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
  </>);
};

export default XboxlivePage;
