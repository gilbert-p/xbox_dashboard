import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';
import marketplaceStyles from '../../dashboard_styles/Marketplace.module.css';
import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";

import useFetchDatabase from '../../custom_hooks/useFetchDatabase';
import useDelayedFetchDatabase from '../../custom_hooks/useDelayedFetchDatabase';


//Temp spotlight images
import halo3Cover from '../../assets/temp_media/halo_3_boxshot.jpg';
import gtaIVCover from '../../assets/temp_media/gtaiv_cover.png';
import eaSkateCover from '../../assets/temp_media/easkate_cover.png';
import deadRisingCover from '../../assets/temp_media/deadrising_coverart.png';
import left4DeadCover from '../../assets/temp_media/left4dead_coverart.png';
import crackdownCover from '../../assets/temp_media/crackdown_coverart.png';
import devilMayCry4Cover from '../../assets/temp_media/devilmaycry4_coverart.png';
import assassinsCreedCover from '../../assets/temp_media/assassins_creed_coverart.png';
import bombermanLiveCover from '../../assets/temp_media/bomberman_live_coverart.png';
import bioshockCover from '../../assets/temp_media/bioshock_coverart.png';
import h3BelieveThumbnail from '../../assets/temp_media/halo3_believe_thumbnail.png';
import digitalph33rGuideThumbnail from '../../assets/temp_media/digitalPh33r_guide_to_machinima_thumbnail.png';
import xboxWelcomeThumbnail from '../../assets/temp_media/xbox360_welcome_thumbnail.png';
import massEffectLaunchThumbnail from '../../assets/temp_media/mass_effect_trailer_thumbnail.png';
import haloThemepackThumbnail from '../../assets/temp_media/halo_themepack_thumbnail.png';

import { selectContextIndex } from '../../redux_slices/xboxSlice';



import {
  updateSelectionHighlight,
  selectHighlightState,
  selectMarketplaceMenuIndex,
  navigateMarketplaceMenu,
  navigateMarketplaceSpotlightMenu,
  selectMarketplaceSpotlightMenuIndex,
  selectMarketplaceSpotlightCategoryTitle,
  updateMarketplaceSpotlightCategory,

  updateNavigateContext,
  selectNavigationContext,
} from '../../redux_slices/menuSlice';





const MarketplacePage = (props) => {

  // const { data: spotlightInfo, loading, error } = useFetchDatabase('https://xb-dashboard-server.netlify.app/api/marketplace/games');
  const { data: spotlightInfo, loading, error } = useDelayedFetchDatabase('http://localhost:8080/marketplace/games', 8000);

  console.log("marketplace data");
  console.log(spotlightInfo);


// Define a state to store the fetched data
const [spotlightData, setSpotlightData] = useState(null);

useEffect(() => {
  const spotlightObj = {
    games: [],
    demos: [],
    videos: [],
    themes: [],
    featured: [],
  };

  const organizeSpotlightContent = (data) => {
    if (!data) {
      return;
    }

    data.forEach(item => {
      switch (item.category) {
        case 'games':
          spotlightObj.games.push({ id: item.id, title: item.title, subtitle: item.subtitle, description: item.description });
          break;
        case 'demos':
          spotlightObj.demos.push({ id: item.id, title: item.title, subtitle: item.subtitle, description: item.description });
          break;
        case 'videos':
          spotlightObj.videos.push({ id: item.id, title: item.title, subtitle: item.subtitle, description: item.description });
          break;
        case 'themes':
          spotlightObj.themes.push({ id: item.id, title: item.title, subtitle: item.subtitle, description: item.description });
          break;
        case 'featured':
          spotlightObj.featured.push({ id: item.id, title: item.title, subtitle: item.subtitle, description: item.description });
          break;
        default:
          break;
      }
    });
    setSpotlightData(spotlightObj);
  }

  if (!loading && spotlightInfo) {
    organizeSpotlightContent(spotlightInfo);
  }

}, [loading, spotlightInfo]); 



    const { slideBladesAway, slideBladesBack} = props;

    const dispatch = useDispatch();

    const current_context_index = useSelector(selectContextIndex);

    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const marketplaceMenuIndex = useSelector(selectMarketplaceMenuIndex);

    const navigationContext = useSelector(selectNavigationContext);


    //Spotlight nav
    const spotlightMenuIndex = useSelector(selectMarketplaceSpotlightMenuIndex);
    const spotlightCategoryTitle = useSelector(selectMarketplaceSpotlightCategoryTitle) || "games";

    /* Utility SFX specific function */

    const utilitySound = useUtilitySfx();


    const listItemHighlight = (current_menu_index, target_index) => {
        
        let highlight_state = false;

        highlight_state = target_index == current_menu_index ? true: false;

        if(!highlight_state) {
            return transitionStyles.instantTransparent;
        }
        else {
            return null;
        }
    };

    const spotlightImageList = {
      games: [halo3Cover, gtaIVCover, eaSkateCover, deadRisingCover],
      demos: [left4DeadCover, crackdownCover, devilMayCry4Cover, bioshockCover],
      videos: [h3BelieveThumbnail, digitalph33rGuideThumbnail, xboxWelcomeThumbnail, massEffectLaunchThumbnail],
      themes: [haloThemepackThumbnail, massEffectLaunchThumbnail, assassinsCreedCover, bombermanLiveCover],
      featured: [deadRisingCover, digitalph33rGuideThumbnail, massEffectLaunchThumbnail,assassinsCreedCover]
    };

    function RenderRowItemSkeleton({children, count}) {
      const skeletonItems = Array.from({ length: count }, (_, index) => (
          <Fragment key={index}>
              {children}
          </Fragment>
        ));
      
        return <>{skeletonItems}</>;
    
    
      }


    function RenderSpotlightRowItem() {
      if (!spotlightData) {
        return (
          <RenderRowItemSkeleton count={4}>
            <div className={`${itemSelectStyles.listItem} ${itemSelectStyles.animatedGradient}`}>
            <div className={itemSelectStyles.listItemBorder}></div>
            </div>
          </RenderRowItemSkeleton>
        );
      }
    
      return spotlightData[spotlightCategoryTitle].map((category, index) => {
        switch (spotlightCategoryTitle) {
          case 'games':
            return (
              <div key={category.id} className={itemSelectStyles.listItem} onClick={() => { utilitySound.current.playButtonSound() }} onMouseEnter={() => { dispatch(navigateMarketplaceSpotlightMenu(index)); dispatch(updateSelectionHighlight(true)); }}>
                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== index ? transitionStyles.makeTransparent : ""}`}></span>
                <img className={itemSelectStyles.spotlightIcon} src={spotlightImageList[spotlightCategoryTitle][index]} alt="Halo 3 Cover Art Boxshot" />
                <div className={itemSelectStyles.titleInfoStack}>
                  <p className={itemSelectStyles.spotlightTitle}>
                    {spotlightData ? spotlightData[spotlightCategoryTitle][index].title : null}
                  </p>
                  <p className={itemSelectStyles.listItemSubText}>
                      {spotlightData ? spotlightData[spotlightCategoryTitle][index].subtitle: null}
                  </p>
                </div>
                <div className={itemSelectStyles.listItemBorder}></div>
              </div>
            );
          case 'demos':
            return (
              <div key={category.id} className={itemSelectStyles.listItem} onClick={() => { utilitySound.current.playButtonSound() }} onMouseEnter={() => { dispatch(navigateMarketplaceSpotlightMenu(index)); dispatch(updateSelectionHighlight(true)); }}>
                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== index ? transitionStyles.makeTransparent : ""}`}></span>
                <img className={itemSelectStyles.spotlightIcon} src={spotlightImageList[spotlightCategoryTitle][index]} alt="Halo 3 Cover Art Boxshot" />
                <div className={itemSelectStyles.titleInfoStack}>
                  <p className={itemSelectStyles.spotlightTitle}>
                    {spotlightData ? spotlightData[spotlightCategoryTitle][index].title : null}
                  </p>
                  <p className={itemSelectStyles.listItemSubText}>
                      {spotlightData ? spotlightData[spotlightCategoryTitle][index].subtitle: null}
                  </p>
                </div>
                <div className={itemSelectStyles.listItemBorder}></div>
              </div>
            );
          case 'videos':
            return (
              <div key={category.id} className={itemSelectStyles.listItem} onClick={() => { utilitySound.current.playButtonSound() }} onMouseEnter={() => { dispatch(navigateMarketplaceSpotlightMenu(index)); dispatch(updateSelectionHighlight(true)); }}>
                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== index ? transitionStyles.makeTransparent : ""}`}></span>
                <img className={itemSelectStyles.spotlightIcon} src={spotlightImageList[spotlightCategoryTitle][index]} alt="Halo 3 Cover Art Boxshot" />
                <div className={itemSelectStyles.titleInfoStack}>
                  <p className={itemSelectStyles.spotlightTitle}>
                    {spotlightData ? spotlightData[spotlightCategoryTitle][index].title : null}
                  </p>
                  <p className={itemSelectStyles.listItemSubText}>
                      {spotlightData ? spotlightData[spotlightCategoryTitle][index].subtitle: null}
                  </p>
                </div>
                <div className={itemSelectStyles.listItemBorder}></div>
              </div>
            );
          case 'themes':
            return (
              <div key={category.id} className={itemSelectStyles.listItem} onClick={() => { utilitySound.current.playButtonSound() }} onMouseEnter={() => { dispatch(navigateMarketplaceSpotlightMenu(index)); dispatch(updateSelectionHighlight(true)); }}>
                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== index ? transitionStyles.makeTransparent : ""}`}></span>
                <img className={itemSelectStyles.spotlightIcon} src={spotlightImageList[spotlightCategoryTitle][index]} alt="Halo 3 Cover Art Boxshot" />
                <div className={itemSelectStyles.titleInfoStack}>
                  <p className={itemSelectStyles.spotlightTitle}>
                    {spotlightData ? spotlightData[spotlightCategoryTitle][index].title : null}
                  </p>
                  <p className={itemSelectStyles.listItemSubText}>
                      {spotlightData ? spotlightData[spotlightCategoryTitle][index].subtitle: null}
                  </p>
                </div>
                <div className={itemSelectStyles.listItemBorder}></div>
              </div>
            );
          case 'featured':
            return (
              <div key={category.id} className={itemSelectStyles.listItem} onClick={() => { utilitySound.current.playButtonSound() }} onMouseEnter={() => { dispatch(navigateMarketplaceSpotlightMenu(index)); dispatch(updateSelectionHighlight(true)); }}>
                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== index ? transitionStyles.makeTransparent : ""}`}></span>
                <img className={itemSelectStyles.spotlightIcon} src={spotlightImageList[spotlightCategoryTitle][index]} alt="Halo 3 Cover Art Boxshot" />
                <div className={itemSelectStyles.titleInfoStack}>
                  <p className={itemSelectStyles.spotlightTitle}>
                    {spotlightData ? spotlightData[spotlightCategoryTitle][index].title : null}
                  </p>
                  <p className={itemSelectStyles.listItemSubText}>
                      {spotlightData ? spotlightData[spotlightCategoryTitle][index].subtitle: null}
                  </p>
                </div>
                <div className={itemSelectStyles.listItemBorder}></div>
              </div>
            );
          default:
            return null; // Handle unknown category
        }
      });
    }

  return (
     <>
        <div id={marketplaceStyles["marketplaceContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 0 ? 1 : -1}`}}>


            <div className={`${(navigationContext == 'main_menu_marketplace') ? pageGridStyles.marketplaceMainContent: transitionStyles.removeDisplay}`}>
                <div className={` ${bladeStyles.dashboardWhiteUnderlay}  ${current_context_index === 0 ? (bladeStyles.dashboardUnderlayImage + ' ' + bladeStyles.dashboardUnderlayActive) : null }`}>
                </div> 

                <div id={pageGridStyles["marketplaceGrid"]} className={`${pageGridStyles.mainGridContent} ${current_context_index !== 0 ? transitionStyles.makeTransparent : ""}`}>
                    <div className={pageGridStyles.leftContent}>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('games')); utilitySound.current.playButtonSound()}}>
                            <div className={marketplaceStyles.textHighlight}></div>
                            <p>Games</p>
                        </div>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('videos')); utilitySound.current.playButtonSound()}}>
                            <div className={marketplaceStyles.textHighlight}></div>
                            <p>Media and Entertainment</p>
                        </div>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('demos')); utilitySound.current.playButtonSound()}}>
                            <div className={marketplaceStyles.textHighlight}></div>
                            <p>Game Demos</p>
                        </div>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('videos')); utilitySound.current.playButtonSound()}}>
                            <p>Game Videos</p>
                            <div className={marketplaceStyles.textHighlight}></div>
                        </div>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('themes')); utilitySound.current.playButtonSound()}}>
                            <div className={marketplaceStyles.textHighlight}></div>
                            <p>Themes and Gamer Pictures</p>
                        </div>
                        <div className={marketplaceStyles.selectOption} onClick={()=>{slideBladesAway(); dispatch(updateNavigateContext('marketplace_spotlight')); dispatch(updateMarketplaceSpotlightCategory('featured')); utilitySound.current.playButtonSound()}}>
                            <div className={marketplaceStyles.textHighlight}></div>
                            <p>Featured Downloads</p>
                        </div>
                    </div>
                    <div className={pageGridStyles.rightContent}>
                        <div className={marketplaceStyles.imageHeaderContainer}></div>
                        <div id={itemSelectStyles["marketSelectList"]} className={`${itemSelectStyles.selectItemListContainer}`} >
                            <div className={itemSelectStyles.innerListContainer} >
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                    <span className={`${itemSelectStyles.listIcon} ${iconLibrary.card_icon}`}></span>
                                    <p>
                                        <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                        Redeem Code
                                    </p>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                    <span className={`${itemSelectStyles.listIcon} ${iconLibrary.download_icon}`}></span>
                                    <p>
                                        <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${marketplaceMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                        Active Downloads
                                    </p>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                        onMouseEnter={()=>{dispatch(navigateMarketplaceMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
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



            <div className={`${(navigationContext == 'marketplace_spotlight') ? pageGridStyles.marketplaceSpotlightPage : transitionStyles.makeTransparent}`}>

                <div className={pageGridStyles.subMenuUnderlay}></div>

                <div className={pageGridStyles.spotlightHeading}>
                    <h2>Spotlight</h2>
                    <div className={pageGridStyles.marketplaceBannerContainer}>
                        <div id={pageGridStyles['marketplaceBanner']} ></div>
                    </div>
                </div>

                <div className={pageGridStyles.marketplaceNavSelectContainer}>
                    <menu className={pageGridStyles.marketplaceNavSelectList}>
                        
                        <li id={pageGridStyles[spotlightCategoryTitle === "games" ? 'marketplaceNavItemActive' : '']} className={pageGridStyles.marketplaceNavSelectListItem} onClick={()=>{dispatch(updateMarketplaceSpotlightCategory("games"))}}>Games</li>
                        <li id={pageGridStyles[spotlightCategoryTitle === "demos" ? 'marketplaceNavItemActive' : '']} className={pageGridStyles.marketplaceNavSelectListItem} onClick={()=>{dispatch(updateMarketplaceSpotlightCategory("demos"))}}>Demos</li>
                        <li id={pageGridStyles[spotlightCategoryTitle === "videos" ? 'marketplaceNavItemActive' : '']} className={pageGridStyles.marketplaceNavSelectListItem} onClick={()=>{dispatch(updateMarketplaceSpotlightCategory("videos"))}}>Videos</li>
                        <li id={pageGridStyles[spotlightCategoryTitle === "themes" ? 'marketplaceNavItemActive' : '']} className={pageGridStyles.marketplaceNavSelectListItem} onClick={()=>{dispatch(updateMarketplaceSpotlightCategory("themes"))}}>Themes</li>
                        <li id={pageGridStyles[spotlightCategoryTitle === "featured" ? 'marketplaceNavItemActive' : '']} className={pageGridStyles.marketplaceNavSelectListItem} onClick={()=>{dispatch(updateMarketplaceSpotlightCategory("featured"))}}>Featured</li>
                    </menu>
                </div>

                <div className={pageGridStyles.marketplaceContentView}>


                    <div className={pageGridStyles.scrollList}>
                      <div className={`${itemSelectStyles.marketplaceSpotlightContainer} ${itemSelectStyles.selectItemListContainer}`}>
                          <div id={itemSelectStyles['marketplaceSpotlightInsetHighlightContainer']} className={itemSelectStyles.boxInsetHighlightContainer}>
                              <div id={itemSelectStyles['marketplaceSpotlightMaskTop']} className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 0)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 1)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 2)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 3)}`}></div>
                              </div>
                              <div id={itemSelectStyles['marketplaceSpotlightMaskBottom']} className={isHighlightActive && itemSelectStyles.boxInsetHighlightMaskBottom}>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 0)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 1)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 2)}`}></div>
                                  <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 3)}`}></div>
                              </div>
                          </div>
                          <div id={itemSelectStyles[`marketplaceSpotlightInnerList`]} className={itemSelectStyles.innerListContainer} > 
                              <RenderSpotlightRowItem/>
                          </div>
                      </div>
                    </div>


                    <div className={pageGridStyles.descriptionBox}>
                        <h3 className={pageGridStyles.descriptionTitle}>
                        {spotlightData && spotlightData[spotlightCategoryTitle][spotlightMenuIndex].title}
                        </h3>
                        <div className={pageGridStyles.descriptionContent}>
                            <p>
                            {spotlightData && spotlightData[spotlightCategoryTitle][spotlightMenuIndex].description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={pageGridStyles.navButtonContainer}>
                    <div className={pageGridStyles.subMenuBackButtonContainer} onClick={()=>{slideBladesBack(); dispatch(updateNavigateContext('main_menu_marketplace')); utilitySound.current.playButtonSound()}}>
                        <p>Back</p>
                        <div className={pageGridStyles.bControllerImg}></div>
                    </div>
                </div>
            </div>

        </div>
  </>);
};

export default MarketplacePage;
