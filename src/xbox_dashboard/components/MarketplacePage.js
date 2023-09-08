import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    selectMarketplaceMenuIndex,
    navigateMarketplaceMenu,
} from '../menuSlice';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';
import marketplaceStyles from '../Marketplace.module.css';
import gamesStyles from '../Games.module.css';
import styles from '../Dashboard.module.css';

import backgroundAnimation from "../../dashboard_styles/BackgroundPulse.module.css";


const MarketplacePage = (props) => {

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const marketplaceMenuIndex = useSelector(selectMarketplaceMenuIndex);


  return (
     <>
        <div id={marketplaceStyles["marketplaceContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>
        <div className={styles.marketplaceBackground}></div>
            <div id={pageGridStyles["marketplaceGrid"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 0 ? transitionStyles.makeTransparent : ""}`}>
                <div className={pageGridStyles.leftContent}>
                    <div className={marketplaceStyles.selectOption}>
                        <div className={marketplaceStyles.textHighlight}></div>
                        <p>Games</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <div className={marketplaceStyles.textHighlight}></div>
                        <p>Media and Entertainment</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <div className={marketplaceStyles.textHighlight}></div>
                        <p>Game Demos</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <p>Game Videos</p>
                        <div className={marketplaceStyles.textHighlight}></div>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <div className={marketplaceStyles.textHighlight}></div>
                        <p>Themes and Gamer Pictures</p>
                    </div>
                    <div className={marketplaceStyles.selectOption}>
                        <div className={marketplaceStyles.textHighlight}></div>
                        <p>Featured Downloads</p>
                    </div>
                </div>
                <div className={pageGridStyles.rightContent}>
                    <div className={marketplaceStyles.imageHeaderContainer}></div>
                    <div id={itemSelectStyles["marketSelectList"]} className={`${itemSelectStyles.selectItemListContainer}`}>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.card_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Redeem Code
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.download_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Active Downloads
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.crown_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Account Management
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
  </>);
};

export default MarketplacePage;
