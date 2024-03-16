import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextIndex } from '../xboxSlice';

import { updateSelectionHighlight,
    selectHighlightState,
    selectMarketplaceMenuIndex,
    navigateMarketplaceMenu,
    navigateMarketplaceSpotlightMenu,
    selectMarketplaceSpotlightMenuIndex,
    selectMarketplaceSpotlightCategoryTitle,
    updateMarketplaceSpotlightCategory,


    updateNavigateContext,
    selectSubMenuNavActive,
    selectNavigationContext,
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

import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";

import backgroundAnimation from "../../dashboard_styles/BackgroundPulse.module.css";

import useUtilitySfx from "../../custom_hooks/useUtilitySfx";


const GamesPage = (props) => {

    const dispatch = useDispatch();
    const navigationContext = useSelector(selectNavigationContext);

    const utilitySound = useUtilitySfx();


    //Menu state variables
    const isHighlightActive = useSelector(selectHighlightState);
    const gamesMenuIndex = useSelector(selectGamesMenuIndex);

    const {current_context_index, slideBladesAway, slideBladesBack, gamesSubPageAnimation } = props;

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
    

        //Spotlight nav
        const spotlightMenuIndex = useSelector(selectMarketplaceSpotlightMenuIndex);
        const spotlightCategoryTitle = useSelector(selectMarketplaceSpotlightCategoryTitle) || "games";

    const spotlightContent = {
        games: {
          listItems: [
            {
              title: "Halo 3",
              subtitle: "Game",
              description: "The Covenant controls Earth, the all-consuming Flood is unleashed and the fate of the galaxy hangs in the balance. An ancient secret, buried under the sands of Africa for untold milennia may hold the key to our salvation or our doom. Spartan-117, the Master Chief, a biologically augmented super-soldier, must uncover that secret and stop the forces that threaten us once and for all. He is the last of his kind, a warrior born for combat, bred for war... and humanity's only hope.",
            },
            {
              title: "Grand Theft Auto IV",
              subtitle: "Game",
              description: "Niko Bellic, an immigrant from Eastern Europe, arrives in Liberty City with hopes of achieving the American Dream. However, the reality is far from his expectations. Caught in the criminal underworld, Niko becomes entangled in a web of violence, betrayal, and intrigue. As he navigates the dangerous streets, he must make choices that will shape his destiny and determine the course of those around him. Liberty City is a sprawling metropolis where power and corruption go hand in hand, and every decision has consequences. In this urban jungle, Niko seeks redemption or may succumb to the darkness that lurks in the shadows.",
            },
            {
              title: "EA Skate",
              subtitle: "Game",
              description: "The city is your playground, and the skateboard is your weapon of choice. Immerse yourself in the world of skateboarding, where the streets become your canvas and every trick is an expression of style. EA Skate takes the sport to new heights with its realistic physics and open-world environment. From the bustling downtown streets to the hidden skate spots, explore the city and leave your mark on every surface. Customize your deck, master the art of grinds and flips, and compete with other skaters to prove you're the best. It's not just a game; it's a lifestyle. Grab your board and ride the streets with confidence.",
            },
            {
              title: "Dead Rising",
              subtitle: "Game",
              description: "In the midst of a zombie apocalypse, photojournalist Frank West finds himself trapped in a shopping mall with hordes of the undead. As chaos ensues, Frank must uncover the truth behind the outbreak and survive the relentless onslaught of zombies. Armed with an array of improvised weapons, Frank battles his way through the mall's stores and corridors, confronting not only the undead but also deranged survivors. Time is ticking, and every decision counts. Will Frank uncover the dark secrets behind the outbreak, or become another victim in a world gone mad? Survival is not just a goal; it's the only option.",
            }
            // Add more games as needed
          ]
        },
        demos: {
            listItems: [
              {
                title: "Left 4 Dead",
                subtitle: "Demo",
                description: "In the midst of a zombie apocalypse, cooperate with other survivors to fight off hordes of the undead. Left 4 Dead offers intense, cooperative gameplay where teamwork is the key to survival. Face the relentless onslaught, utilize various weapons, and navigate through a world overrun by zombies. Will you make it out alive, or become another casualty of the zombie horde?"
              },
              {
                title: "Crackdown",
                subtitle: "Demo",
                description: "Welcome to Pacific City, where chaos reigns and crime is rampant. Assume the role of an elite agent with superhuman abilities and bring justice to the city. Crackdown combines open-world exploration with explosive action. Leap across buildings, toss vehicles, and take down criminal organizations. The demo gives you a taste of the power at your fingertips and the challenges that await in the bustling metropolis."
              },
              {
                title: "Devil May Cry 4",
                subtitle: "Demo",
                description: "Step into the shoes of Nero, a young demon hunter, and experience the stylish and fast-paced combat of Devil May Cry 4. Unleash a variety of weapons and powerful abilities as you face demonic foes in a gothic world. The demo showcases the intense action, fluid combos, and epic boss battles that define the Devil May Cry series. Are you ready to embrace the demon within and confront the forces of darkness?"
              },
              {
                title: "Bioshock",
                subtitle: "Demo",
                description: "Descend into the underwater city of Rapture, a dystopian paradise gone awry. In Bioshock, you'll unravel the mysteries of this submerged world while battling mutated enemies and uncovering the dark history of Rapture. The demo introduces you to the atmospheric storytelling, unique setting, and immersive gameplay that define the Bioshock experience. Immerse yourself in a narrative-driven journey filled with moral choices and unexpected twists."
              }
              // Add more demos as needed
            ]
          },
          videos: {
            listItems: [
              {
                title: "Halo 3: Believe",
                subtitle: "Video",
                description: "Immerse yourself in the making of the iconic 'Believe' campaign for Halo 3. Witness the behind-the-scenes process, from concept to execution, as the creators bring the epic tale of the Master Chief to life. Delve into the world of filmmaking and discover the dedication and creativity that shaped one of the most memorable video game advertisements."
              },
              {
                title: "DigitalPh33r's Guide To Machinima",
                subtitle: "Video",
                description: "Join DigitalPh33r as he takes you on a journey through the world of Machinima. Learn the art of creating animated films using video game engines. From scriptwriting to animation techniques, this guide covers the essentials of Machinima production. Whether you're a seasoned creator or a beginner, explore the possibilities of storytelling through the lens of video games."
              },
              {
                title: "Xbox 360 Welcome",
                subtitle: "Video",
                description: "Experience the official welcome video for the Xbox 360 console. Take a visual tour of the features and capabilities that make the Xbox 360 a gaming powerhouse. From cutting-edge graphics to an expansive game library, this video provides an introduction to the world of Xbox gaming. Get ready to embark on a gaming journey like no other."
              },
              {
                title: "Mass Effect Launch Trailer",
                subtitle: "Video",
                description: "Prepare for an intergalactic adventure with the launch trailer for Mass Effect. Immerse yourself in the epic sci-fi universe created by BioWare. Witness stunning visuals, captivating storytelling, and the promise of a role-playing experience unlike any other. The Mass Effect launch trailer sets the stage for a journey that will shape the fate of the galaxy."
              }
              // Add more videos as needed
            ]
          },
          themes: {
            listItems: [
              {
                title: "Halo",
                subtitle: "Theme",
                description: "Immerse your Xbox 360 in the iconic world of Halo with this theme. Featuring stunning visuals, custom icons, and background music inspired by the game's epic soundtrack, this theme transforms your console into a tribute to the Master Chief and the legendary Halo universe."
              },
              {
                title: "Mass Effect",
                subtitle: "Theme",
                description: "Bring the immersive universe of Mass Effect to your Xbox 360 with this theme. Customized icons, dynamic backgrounds, and atmospheric music capture the essence of Commander Shepard's journey. Whether you're a fan of the Normandy or the Citadel, this theme lets you showcase your love for the Mass Effect series."
              },
              {
                title: "Assassin's Creed",
                subtitle: "Theme",
                description: "Embark on a stealthy and adventurous journey with this Assassin's Creed theme for your Xbox 360. Featuring dynamic backgrounds, unique icons, and music that echoes the rooftops of historic cities, this theme lets you embody the spirit of the Assassin's Creed Brotherhood. Customize your console and embrace the creed."
              },
              {
                title: "Bomberman LIVE",
                subtitle: "Theme",
                description: "Add a touch of explosive fun to your Xbox 360 with this Bomberman LIVE theme. Colorful graphics, playful icons, and lively music capture the excitement of the classic Bomberman experience. Whether you're a fan of multiplayer mayhem or solo bomb-dropping, this theme celebrates the timeless appeal of Bomberman."
              }
              // Add more themes as needed
            ]
          },
          featured: {
            listItems: [
              {
                title: "Dead Rising",
                subtitle: "Game",
                description: "Survive the zombie apocalypse in Dead Rising. Photojournalist Frank West must uncover the truth behind the outbreak while battling hordes of the undead. Armed with improvised weapons, navigate the mall, confront deranged survivors, and make decisions that impact your survival. Time is ticking, and every choice counts. Will you uncover the dark secrets or become another victim in a world gone mad?",
              },
              {
                title: "DigitalPh33r's Guide To Machinima",
                subtitle: "Demo",
                description: "Join DigitalPh33r's Guide To Machinima and explore the art of creating animated films using video game engines. From scriptwriting to animation techniques, this guide covers the essentials of Machinima production. Whether you're a seasoned creator or a beginner, immerse yourself in the possibilities of storytelling through the lens of video games.",
              },
              {
                title: "Mass Effect Launch Trailer",
                subtitle: "Video",
                description: "Embark on an intergalactic adventure with the launch trailer for Mass Effect. Immerse yourself in the epic sci-fi universe created by BioWare. Witness stunning visuals, captivating storytelling, and the promise of a role-playing experience unlike any other. The Mass Effect launch trailer sets the stage for a journey that will shape the fate of the galaxy.",
              },
              {
                title: "Assassin's Creed",
                subtitle: "Theme",
                description: "Embrace the spirit of the Assassin's Creed Brotherhood with this featured theme. Customize your Xbox 360 with dynamic backgrounds, unique icons, and music that echoes the rooftops of historic cities. Embark on a stealthy and adventurous journey as you embody the creed and showcase your love for the Assassin's Creed series.",
              }
              // Add more featured items as needed
            ]
          }
      };
    

  return (
     <>

        <div id={gamesStyles["gamesContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 2 ? 1 : -1}`}}>


            <div className={` ${bladeStyles.dashboardWhiteUnderlay}   ${current_context_index === 2 ? (bladeStyles.dashboardUnderlayImage + ' ' + bladeStyles.dashboardUnderlayActive) : '' }`}></div> 


            <div id={gamesStyles["games"]} className={`${pageGridStyles.mainGridContent} ${navigationContext == "main_menu_games" ? '' : transitionStyles.removeDisplay}`}>
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
                            </div>
                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 0)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 1)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 2)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(gamesMenuIndex, 3)}`}></div>
                            </div>
                        </div>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onClick={()=>{gamesSubPageAnimation(); dispatch(updateNavigateContext('games_played_games')); utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.controller_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Played Games
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.joystick_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Xbox Live Arcade
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.demos_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    Demos
                                </p>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGamesMenu(3));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.film_icon}`}></span>
                                <p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${gamesMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
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

            <div id={pageGridStyles["playedGames"]} className={`${pageGridStyles.mainGridContent} ${navigationContext == "games_played_games" ? '' : transitionStyles.makeTransparent}`}>
                <div className={pageGridStyles.playedGamesContentView}>


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
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(0));dispatch(updateSelectionHighlight(true));}} >
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <p>
                                        {spotlightContent[spotlightCategoryTitle].listItems['0'].title}
                                    </p>
                                    <p className={itemSelectStyles.listItemSubText}>
                                        {spotlightContent[spotlightCategoryTitle].listItems['0'].subtitle}
                                    </p>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(1));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                            
                                    {spotlightContent[spotlightCategoryTitle].listItems['1'].title}
                                    </p>
                                    <p className={itemSelectStyles.listItemSubText}>
                                        {spotlightContent[spotlightCategoryTitle].listItems['1'].subtitle}
                                    </p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(2));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                        
                                    {spotlightContent[spotlightCategoryTitle].listItems['2'].title}
                                    </p>
                                    <p className={itemSelectStyles.listItemSubText}>
                                        {spotlightContent[spotlightCategoryTitle].listItems['2'].subtitle}
                                    </p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(3));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                        
                                    {spotlightContent[spotlightCategoryTitle].listItems['3'].title}
                                    </p>
                                    <p className={itemSelectStyles.listItemSubText}>
                                        {spotlightContent[spotlightCategoryTitle].listItems['3'].subtitle}
                                    </p>
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={pageGridStyles.descriptionBox}>
                        <h3 className={pageGridStyles.descriptionTitle}>
                        {spotlightContent[spotlightCategoryTitle].listItems[spotlightMenuIndex].title}
                        </h3>
                        <div className={pageGridStyles.descriptionContent}>
                            <p>
                            {spotlightContent[spotlightCategoryTitle].listItems[spotlightMenuIndex].description}
                            </p>
                        </div>
                    </div>


                </div>
                <div className={pageGridStyles.navButtonContainer}>
                        <div className={pageGridStyles.subMenuBackButtonContainer} onClick={()=>{slideBladesBack(); dispatch(updateNavigateContext('main_menu_games')); utilitySound.current.playButtonSound()}}>
                            <p>Back</p>
                            <div className={pageGridStyles.bControllerImg}></div>
                        </div>
                </div>

            </div>
        </div>
  </>);
};

export default GamesPage;
