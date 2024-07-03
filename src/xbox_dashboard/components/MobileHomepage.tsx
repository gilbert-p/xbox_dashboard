import { useRef } from 'react';
import ReactPlayer from 'react-player';
import mobileStyles from '../../dashboard_styles/mobilePage.module.css';

import dashboardOverviewVideo from '../../assets/video/dashboard_intro_media.flv';
import dynamicBackgroundVideo from '../../assets/video/dynamic_circles_background.flv';
import rotatePhoneIcon from '../../assets/images/rotate_phone_icon.png';
import enableFullscreenImg from '../../assets/images/enable_fullscreen_img.png';
import fruitgerAeroXboxImg from '../../assets/images/frutiger_aero_xbox_360.png';
import glowingXboxLogoDarkImg from '../../assets/images/glowing-xbox-logo-dark.png';
import glowingXboxLogoLightImg from '../../assets/images/glowing-xbox-logo-light.png';

// Define a type for the useRef hook
const MobileViewPrompt: React.FC = () => {
  const dashboardIntroMediaRef = useRef<ReactPlayer>(null);

  return (
    <div className={mobileStyles.mobileViewContainer}>
      <div className={mobileStyles.videoPlayerContainer}>
        <div className={mobileStyles.videoScreenOverlay}></div>
        <ReactPlayer
          className={mobileStyles.reactPlayer}
          ref={dashboardIntroMediaRef}
          url={dynamicBackgroundVideo}
          stopOnUnmount={true}
          controls={false}
          playing={true}
          width="100%"
          height="auto"
          loop={true}
          muted={true}
        />
      </div>

      <div className={mobileStyles.mobileContent}>
        <div className={mobileStyles.welcomeMessage}>
          <h2>WELCOME</h2>
          <div className={mobileStyles.accentContainer}>
            <div className={mobileStyles.welcomeAccentLeft}></div>
            <div className={mobileStyles.welcomeAccentRight}></div>
          </div>
          <div className={mobileStyles.xboxWelcome}></div>
        </div>

        <div className={mobileStyles.videoPlayerIntro}>
          <h3>Xbox 360 Web Application</h3>
          <ReactPlayer
            ref={dashboardIntroMediaRef}
            url={dashboardOverviewVideo}
            stopOnUnmount={true}
            controls={false}
            playing={true}
            width="100%"
            height="auto"
            loop={true}
            muted={true}
          />
          <div className={mobileStyles.borderSeparatorBottom}></div>
        </div>

        <section className={mobileStyles.mobileInstructions}>
          <h3>Steps to View on Mobile</h3>
          <p>Rotate Screen to Enable Dashboard</p>
          <img src={rotatePhoneIcon} alt="Rotate Phone Icon" />
          <p>Accept Fullscreen Prompt Upon Rotating</p>
          <img src={enableFullscreenImg} alt="Rotate Phone Icon" />
          <div className={mobileStyles.borderSeparatorBottom}></div>
        </section>

        <section className={mobileStyles.aboutSection}>
          <h2>Frutiger Aero Trend</h2>
          <p>
            The era of Frutiger Aero was marked by aesthetics that revolved around the idea
            of technology with nature in mind. With the internet still gaining traction in
            the early 2000s, a bright idealistic future was built into the design trend.
          </p>
          <div className={mobileStyles.imageParallaxContainer}>
            <img src={fruitgerAeroXboxImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
          </div>
          <p>
            The Original Xbox 360 Dashboard encompassed this trend by designing around pure
            energy with a seamless synchronization of motion, sound, and color. With
            skeuomorphic elements in vogue - a striking contrast to the flat design of
            today’s landscape - this dashboard still holds as one of the more notable
            gaming dashboard designs of the mid-2000s.
          </p>
          <div className={mobileStyles.borderSeparatorBottom}></div>
        </section>

        <section className={mobileStyles.aboutSection}>
          <h2>Dashboard Design</h2>
          <p>
            The incorporation of curved elements, such as the blades and buttons, serves to harmonize with the console's inherent characteristics, drawing inspiration from the Nexus logo and the industrial design of the hardware. The sound effects complement the interface as they were envisioned as a powerful force waiting to be unleashed, aligning with the overall Xbox experience.
          </p>
          <div className={mobileStyles.glowAnimated}>
            <img src={glowingXboxLogoLightImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
            <img id={mobileStyles['xbox_logo_glow']} src={glowingXboxLogoDarkImg} alt="Stock Image of Xbox 360 Themed Frutiger Aero Design" />
          </div>
          <p>
            This cohesive approach is designed to instill a feeling of tranquility in the user experience. The elegantly curved blades not only mirror the aesthetics of the console but also establish a symbiotic connection between the hardware and software, reinforcing the bond between the two facets of the gaming experience.
          </p>
          <div className={mobileStyles.borderSeparatorBottom}></div>
        </section>

        <section className={mobileStyles.aboutSection}>
          <h2>Web App Development</h2>
          <p>
            The Following tools were used to develop the dashboard as a web application:
          </p>
          <ul className={mobileStyles.toolsList}>
            <li>React Js</li>
            <li>GSAP - Greensock Animation Library</li>
            <li>Figma</li>
            <li>Xbox 360 Style Guide</li>
          </ul>
          <div className={mobileStyles.borderSeparatorBottom}></div>
        </section>

        <section className={mobileStyles.linkSection}>
          <h2>Relevant Links</h2>
          <ul className={mobileStyles.gamecaseList}>
            <li id={mobileStyles['link_1']} className={mobileStyles.gameCaseListItem}>
              <a className={mobileStyles.gamecaseAnchorTag} href="https://rowlandbrown.com/xbox-360-dashboard-ui-blades" target="_blank" rel="noopener noreferrer">
                Rowland Brown Website
              </a>
            </li>
            <li id={mobileStyles['link_2']}>
              <a className={mobileStyles.gamecaseAnchorTag} href="https://www.behance.net/rowbrown" target="_blank" rel="noopener noreferrer">
                Rowland Brown Behance
              </a>
            </li>
            <li id={mobileStyles['link_3']}>
              <a className={mobileStyles.gamecaseAnchorTag} href="https://digiex.net/threads/xbox-360-style-guide.15469/" target="_blank" rel="noopener noreferrer">
                Xbox 360 Style Guide
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MobileViewPrompt;