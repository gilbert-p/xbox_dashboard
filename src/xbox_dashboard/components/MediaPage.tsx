import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import iconLibrary from "../../dashboard_styles/IconStyling.module.css";
import profileCardStyles from '../../dashboard_styles/ProfileCard.module.css';
import pageGridStyles from '../../dashboard_styles/PageGrid.module.css';
import transitionStyles from '../../dashboard_styles/TransitionStyles.module.css';
import itemSelectStyles from '../../dashboard_styles/ItemSelect.module.css';
import mediaStyles from '../../dashboard_styles/Media.module.css';
import gamesStyles from '../../dashboard_styles/Games.module.css';
import descriptionContentStyles from "../../dashboard_styles/DescriptionContainer.module.css";
import musicPlayerStyles from '../../dashboard_styles/MediaMusicPlayer.module.css';
import bladeStyles from "../../dashboard_styles/BladeStyling.module.css";
import useUtilitySfx from "../../custom_hooks/useUtilitySfx";
import ReactPlayer from 'react-player';

//Placeholder images

import image1 from '../../assets/media_pics_placeholder/astronaut.jpg';
import image2 from '../../assets/media_pics_placeholder/distant_city.jpg';
import image3 from '../../assets/media_pics_placeholder/dog_van_gogh.jpg';
import image4 from '../../assets/media_pics_placeholder/fish_tank.jpg';
import image5 from '../../assets/media_pics_placeholder/geometric_cat.jpg';
import image6 from '../../assets/media_pics_placeholder/geometry_titan.jpg';
import image7 from '../../assets/media_pics_placeholder/hexagon_art.jpg';
import image8 from '../../assets/media_pics_placeholder/keanu_spartan.jpg';
import image9 from '../../assets/media_pics_placeholder/planet_rings.jpg';

import windowsMediaVisual from "../../assets/video/windows_media_compressed_40.flv";

import {
  selectHighlightState,
  selectMediaMenuIndex,
  selectNavigationContext,
  selectMarketplaceSpotlightMenuIndex,
  selectMarketplaceSpotlightCategoryTitle,
 
  navigateMediaMenu,
  navigateMarketplaceSpotlightMenu,
  navigateGuideMusicPlayer,
 
  updateSelectionHighlight,
  updateNavigateContext,
  updateGuideMusicPlayerHighlight,
 
  selectMusicState,
  selectCurrentSong,
  selectGuideMusicPlayerIndex,
  selectGuideMusicPlayerHighlight,
 } from '../../redux_slices/menuSlice';
 import { updateDiscTrayState } from '../../redux_slices/xboxSlice';

 import { CustomRootVars, MediaPageProps } from 'src/custom_types/utilityTypes';


const MediaPage: React.FC<MediaPageProps> = (props) => {

  const { current_context_index,
    foreignExtendGamerProfile,
    mediaSubPageAnimation,
    mediaSubPageExit } = props;

  const [displayImage, setDisplayImage] = useState(false);
  const [imageViewIndex, setImageViewIndex] = useState(0);
  const [displaySlideshow, setDisplaySlideshow] = useState(false);

  const imageArray = [image1, image2, image3, image4, image5,
                      image6, image7, image8, image9];

  const dispatch = useDispatch();


  const utilitySound = useUtilitySfx();

  const playerRef = useRef(null);


  //Menu state variables
  const navigationContext = useSelector(selectNavigationContext);
  const isHighlightActive = useSelector(selectHighlightState);
  const mediaMenuIndex = useSelector(selectMediaMenuIndex);

  //TODO: Need to change to media music player redux variables
  const guideMusicPlayerIndex = useSelector(selectGuideMusicPlayerIndex);
  const isGuideMusicPlayerHighlightActive = useSelector(selectGuideMusicPlayerHighlight);

  
  const isSongPlaying = useSelector(selectMusicState);
  const currentSongTitle = useSelector(selectCurrentSong);

  const listItemHighlight = (current_menu_index: number|null, target_index:number) => {
      
      let highlight_state = false;

      highlight_state = target_index !== current_menu_index ? true: false;

      if(highlight_state) {
          return transitionStyles.instantTransparent;
      }
      else {
          return "";
      }
  };

  const playNextSong = async () => {


  };

  const playPrevSong = async () => {

  };

  type mediaDisplayState = 'main_menu_media' | 'media_videos';
  const revealUnderlayMedia = (state: mediaDisplayState): true|false => {
    switch(state) {
      case 'main_menu_media':
        return true; 
      case 'media_videos':
        return true;
      default: return false;
    }
  }

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
          ]
        }
    };

  const DisplayPicture = () => {
    if(!displayImage) {
      return <></>;
    }

    return <div className={mediaStyles.displayContainer}>
              <div className={mediaStyles.growBox}>
                <div className={mediaStyles.closeButtonContainer} onClick={()=>{setDisplayImage(false)}}>
                  <div className={mediaStyles.closeButton}></div>
                </div>
                <img className={mediaStyles.mediaPictureImg} src={imageArray[imageViewIndex]} alt="Portrait astronaut" />
              </div>
           </div>
  }

  const ReloadImage = () => {

    useEffect(() => {
      const interval = setTimeout(() => {
        setImageViewIndex((imageViewIndex + 1) % imageArray.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);

    return <img className={mediaStyles.mediaPictureImg} src={imageArray[imageViewIndex]} alt="Portrait astronaut" />;
  }

    const PlaySlideShow = () => {
      if (!displaySlideshow) {
        return null;
      }
  
      return (
        <div className={mediaStyles.displaySlideshowContainer}>
          <div className={mediaStyles.slideshowContent}>
            <div className={mediaStyles.closeButtonContainer} onClick={() => { setDisplaySlideshow(false) }}>
              <div className={mediaStyles.closeButton}></div>
            </div>
            <ReloadImage/>
          </div>
        </div>
      );
    }
  
  

  return (
     <>
        <div id={mediaStyles["mediaContextContainer"]} className={pageGridStyles.outerContextContainer} style={{"--z-depth": `${current_context_index === 3 ? 1 : -1}`} as CustomRootVars}>


            <div className={` ${bladeStyles.dashboardWhiteUnderlay}   ${revealUnderlayMedia(navigationContext as mediaDisplayState) ? (bladeStyles.dashboardUnderlayImage + ' ' + bladeStyles.dashboardUnderlayActive) : '' }`}></div> 


            <div id={mediaStyles["media"]} className={`${pageGridStyles.mainGridContent} ${navigationContext == "main_menu_media" ? '' : transitionStyles.removeDisplay}`}>
                <div className={pageGridStyles.leftContent}>
                    <div className={profileCardStyles.profileContainer} onClick={()=>{foreignExtendGamerProfile(); utilitySound.current?.playButtonSound()}}>
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
                    <div id={itemSelectStyles["mediaSelection"]} className={itemSelectStyles.selectItemListContainer}>
                        <div id={itemSelectStyles["mediaHighlightContainer"]} className={itemSelectStyles.boxInsetHighlightContainer}>
                            <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(mediaMenuIndex, 0)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(mediaMenuIndex, 1)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(mediaMenuIndex, 2)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(mediaMenuIndex, 3)}`}></div>
                            </div>
                            <div className={itemSelectStyles.boxInsetHighlightMaskBottom}>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(mediaMenuIndex, 0)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(mediaMenuIndex, 1)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(mediaMenuIndex, 2)}`}></div>
                                <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(mediaMenuIndex, 3)}`}></div>
                            </div>
                        </div>
                        <div className={itemSelectStyles.innerListContainer} >
                            <div className={itemSelectStyles.listItem} onClick={()=>{mediaSubPageAnimation(); dispatch(updateNavigateContext('media_music_player')); dispatch(updateDiscTrayState(false)); utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMediaMenu(0));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.music_icon}`}></span>
                                <p>

                                    Music
                                </p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{mediaSubPageAnimation(); dispatch(updateNavigateContext('media_pictures')); dispatch(updateDiscTrayState(false)); utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMediaMenu(1));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.camera_icon}`}></span>
                                <p>

                                    Pictures
                                </p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                <div className={itemSelectStyles.listItemBorder}></div>
                            </div>
                            <div className={itemSelectStyles.listItem} onClick={()=>{mediaSubPageAnimation(); dispatch(updateNavigateContext('media_videos')); dispatch(updateDiscTrayState(false)); utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMediaMenu(2));dispatch(updateSelectionHighlight(true));}} onMouseLeave={()=>{dispatch(updateSelectionHighlight(false))}}>
                                <span className={`${itemSelectStyles.listIcon} ${iconLibrary.film_icon}`}></span>
                                <p>

                                    Videos
                                </p>
                                <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${mediaMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
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

            <div id={pageGridStyles["mediaMusicPlayer"]} className={`${pageGridStyles.mainGridContent} ${navigationContext == "media_music_player" ? '' : transitionStyles.removeDisplay}`}>
                <div className={pageGridStyles.mediaMusicPlayerContentView}>
                  <h2>Music Player</h2>

                  <div className={pageGridStyles.musicPlayerControls}>
                    <div className={musicPlayerStyles.guideMusicPlayer}>
                        <div className={musicPlayerStyles.musicPlayerActionButtonContainer}>
                            <button id={musicPlayerStyles["playButton"]} className={musicPlayerStyles.skewmorphButton} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(0));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                <span className={!isSongPlaying ? musicPlayerStyles.guidePlayIcon : musicPlayerStyles.guidePauseIcon }></span>
                                <span className={`${isGuideMusicPlayerHighlightActive && musicPlayerStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 0 ? transitionStyles.removeDisplay : ""}`}></span>
                            </button>
                            <button id={musicPlayerStyles["previousSelectionButton"]} className={musicPlayerStyles.skewmorphButton} onClick={()=>{playPrevSong(); utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(1));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                <span className={`${isGuideMusicPlayerHighlightActive && musicPlayerStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 1 ? transitionStyles.removeDisplay : ""}`}></span>
                            </button>
                            <button id={musicPlayerStyles["nextSelectionButton"]} className={musicPlayerStyles.skewmorphButton} onClick={()=>{playNextSong(); utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(2));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                <span className={`${isGuideMusicPlayerHighlightActive && musicPlayerStyles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 2 ? transitionStyles.removeDisplay : ""}`}></span>
                            </button>
                            <button id={musicPlayerStyles["arrowSelectionButton"]} className={musicPlayerStyles.skewmorphButton} 
                                onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(3));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                <span className={musicPlayerStyles.arrowPoint}></span>
                                {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 3 ? transitionStyles.removeDisplay : ""}`}></span> */}
                            </button>
                            <button id={musicPlayerStyles["soundAdjustButton"]} className={musicPlayerStyles.skewmorphButton} 
                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(4));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                                {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.skewmorphButtonHighlight} ${guideMusicPlayerIndex !== 4 ? transitionStyles.removeDisplay : ""}`}></span> */}
                            </button>
                        </div>
                        <div className={musicPlayerStyles.musicPlayerSongTitleContainer}
                            onMouseEnter={()=>{dispatch(navigateGuideMusicPlayer(5));}} onMouseLeave={()=>{dispatch(updateGuideMusicPlayerHighlight(false))}}>
                            {/* <span className={`${isGuideMusicPlayerHighlightActive && styles.backgroundHighlightGlow} ${guideMusicPlayerIndex !== 5 ? transitionStyles.removeDisplay : ""}`}></span> */}
                            <p className={musicPlayerStyles.guideMusicPlayerTitle}>{`${isSongPlaying ? currentSongTitle : 'Select Music'}`}</p>
                        </div>

                        <div className={musicPlayerStyles.musicVisualContainer}>
                          <p className={musicPlayerStyles.artistTitle}>Album</p>
                          <p className={musicPlayerStyles.songTitle}>Artist</p>

                          {/* <div className={musicPlayerStyles.musicVisualizer}></div> */}

                          <ReactPlayer
                            ref={playerRef}
                            url={windowsMediaVisual}
                            stopOnUnmount={true}
                            controls={false}
                            playing={true}
                            width="100%"
                            height="auto"
                            loop={true}
                            muted={true}
                          />


                        </div>
                    </div>


                  </div>

                  <div className={pageGridStyles.musicSelectionList}>
                    <h3> Current Playlist </h3>
                    <div className={`${itemSelectStyles.gamesPlayedListContainer} ${itemSelectStyles.musicPlayerSelectItemList}`}>
                        <div  className={itemSelectStyles.innerListContainer} > 
                            <div className={itemSelectStyles.roundListItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(0));dispatch(updateSelectionHighlight(true));}} >
                                <p>
                                    {spotlightContent[spotlightCategoryTitle].listItems['0'].title}
                                </p>
                                
                            </div>
                            <div className={itemSelectStyles.roundListItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(1));dispatch(updateSelectionHighlight(true));}} >
                                <p>
                                        
                                {spotlightContent[spotlightCategoryTitle].listItems['1'].title}
                                </p>
                                
                                
                                
                            </div>
                            <div className={itemSelectStyles.roundListItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(2));dispatch(updateSelectionHighlight(true));}} >
                                <p>
                                    
                                {spotlightContent[spotlightCategoryTitle].listItems['2'].title}
                                </p>
                                
                                
                                
                            </div>
                            <div className={itemSelectStyles.roundListItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(3));dispatch(updateSelectionHighlight(true));}} >
                                <p>
                                    
                                {spotlightContent[spotlightCategoryTitle].listItems['3'].title}
                                </p>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                  </div>





                </div>
                <div className={pageGridStyles.gamesSubNavButton}>
                        <div className={pageGridStyles.subMenuBackButtonContainer} onClick={()=>{mediaSubPageExit(); dispatch(updateNavigateContext('main_menu_media')); dispatch(updateDiscTrayState(true)); utilitySound.current?.playButtonSound()}}>
                            <p>Back</p>
                            <div className={pageGridStyles.bControllerImg}></div>
                        </div>
                </div>

            </div>

            <div id={pageGridStyles["mediaPictures"]}  className={`${pageGridStyles.mainGridContent} ${navigationContext == "media_pictures" ? '' : transitionStyles.removeDisplay}`}>
                <div className={pageGridStyles.mediaPicturesContentView}>
                  <h2>Pictures</h2>

                  <div className={pageGridStyles.scrollList}>
                    <div id={itemSelectStyles["picturesSelectContainer"]} className={itemSelectStyles.groupContainer} onClick={()=>{setDisplaySlideshow(true)}}>
                                  <div className={itemSelectStyles.flexInnerContainer}>
                                      <p className={itemSelectStyles.gamerTag}>Play Slideshow</p>
                                  </div>
                    </div>
                  </div>

                  <div className={pageGridStyles.mediaPicturesView}>
                    <div className={pageGridStyles.mediaPictureContainer} onClick={()=>{setDisplayImage(true); setImageViewIndex(0)}}>
                      <p>astronaut.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image1} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(1)}}>
                      <p>distant_city.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image2} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(2)}}>
                      <p>dog_van_gogh.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image3} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(3)}}>
                      <p>fish_tank.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image4} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(4)}}>
                      <p>geometric_cat.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image5} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(5)}}>
                      <p>geometry_titan.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image6} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(6)}}>
                      <p>hexagon_art.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image7} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(7)}}>
                      <p>keanu_spartan.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image8} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(8)}}>
                      <p>planet_rings.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image9} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(0)}}>
                      <p>astronaut.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image1} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(1)}}>
                      <p>distant_city.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image2} alt="Portrait astronaut" />
                    </div>
                    <div className={pageGridStyles.mediaPictureContainer}  onClick={()=>{setDisplayImage(true); setImageViewIndex(2)}}>
                      <p>dog_van_gogh.jpg</p>
                      <img className={pageGridStyles.mediaPictureImg} src={image3} alt="Portrait astronaut" />
                    </div>
                  </div>

                  <DisplayPicture/>

                  <PlaySlideShow/>



                </div>
                <div className={pageGridStyles.gamesSubNavButton}>
                        <div className={pageGridStyles.subMenuBackButtonContainer} onClick={()=>{mediaSubPageExit(); dispatch(updateNavigateContext('main_menu_media')); dispatch(updateDiscTrayState(true)); utilitySound.current?.playButtonSound()}}>
                            <p>Back</p>
                            <div className={pageGridStyles.bControllerImg}></div>
                        </div>
                </div>

            </div>

            <div id={pageGridStyles["mediaVideos"]} className={`${pageGridStyles.mediaLayoutContent} ${navigationContext == "media_videos" ? '' : transitionStyles.removeDisplay}`}>
                <div className={pageGridStyles.mediaContentView}>
                  <h2>Videos</h2>

                    <div className={pageGridStyles.scrollList}>
                        <div className={`${itemSelectStyles.gamesPlayedListContainer} ${itemSelectStyles.selectItemListContainer}`}>
                            <div id={itemSelectStyles["gamesPlayedHighlightContainer"]}   className={itemSelectStyles.boxInsetHighlightContainer}>
                                <div className={itemSelectStyles.boxInsetHighlightMaskTop}>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 0)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 1)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 2)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightTop} ${listItemHighlight(spotlightMenuIndex, 3)}`}></div>
                                </div>
                                <div className={isHighlightActive ? itemSelectStyles.boxInsetHighlightMaskBottom: ''}>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 0)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 1)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 2)}`}></div>
                                    <div className={`${isHighlightActive && itemSelectStyles.boxInsetHighlightBottom} ${listItemHighlight(spotlightMenuIndex, 3)}`}></div>
                                </div>
                            </div>
                            <div  className={itemSelectStyles.innerListContainer} > 
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(0));dispatch(updateSelectionHighlight(true));}} >
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 0 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <p>
                                        {spotlightContent[spotlightCategoryTitle].listItems['0'].title}
                                    </p>
                                    
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(1));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                            
                                    {spotlightContent[spotlightCategoryTitle].listItems['1'].title}
                                    </p>
                                    
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 1 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(2));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                        
                                    {spotlightContent[spotlightCategoryTitle].listItems['2'].title}
                                    </p>
                                    
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 2 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                                <div className={itemSelectStyles.listItem} onClick={()=>{utilitySound.current?.playButtonSound()}}
                                    onMouseEnter={()=>{dispatch(navigateMarketplaceSpotlightMenu(3));dispatch(updateSelectionHighlight(true));}} >
                                    <p>
                                        
                                    {spotlightContent[spotlightCategoryTitle].listItems['3'].title}
                                    </p>
                                    
                                    <span className={`${isHighlightActive && itemSelectStyles.listItemHighlight} ${spotlightMenuIndex !== 3 ? transitionStyles.makeTransparent : ""}`}></span>
                                    <div className={itemSelectStyles.listItemBorder}></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={pageGridStyles.gamesDescriptionBox}>
                        <div className={pageGridStyles.gamesdDescriptionTitleContainer}>
                          <h3 className={pageGridStyles.gamesDescriptionTitle}>
                          {spotlightMenuIndex && spotlightContent[spotlightCategoryTitle].listItems[spotlightMenuIndex].title}
                          </h3>
                        </div>
                        <div className={pageGridStyles.gamesDescriptionContent}>
                            <p>
                            {spotlightMenuIndex && spotlightContent[spotlightCategoryTitle].listItems[spotlightMenuIndex].description}
                            </p>
                        </div>
                    </div>


                </div>
                <div className={pageGridStyles.mediaSubNavButton}>
                        <div className={pageGridStyles.subMenuBackButtonContainer} onClick={()=>{mediaSubPageExit(); dispatch(updateNavigateContext('main_menu_media')); dispatch(updateDiscTrayState(true)); utilitySound.current?.playButtonSound()}}>
                            <p>Back</p>
                            <div className={pageGridStyles.bControllerImg}></div>
                        </div>
                </div>

            </div>
            
        </div>
  </>);
};

export default MediaPage;
