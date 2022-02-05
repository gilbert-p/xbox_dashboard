import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigateTo, 
    selectContextIndex,
    selectXboxPos,
    selectGamesPos,
    selectMediaPos,
    selectSystemPos,
    selectBladeContainerHeight
} from '../xboxSlice';
    
import bladeStyles from "../../styles/BladeStyling.module.css";
import transitionStyles from '../../styles/TransitionStyles.module.css';

const NavBladesContainer = (props) => {
    
    const dispatch = useDispatch();

    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const is_xboxlive_rightside = useSelector(selectXboxPos);
    const is_games_rightside = useSelector(selectGamesPos);
    const is_media_rightside = useSelector(selectMediaPos);
    const is_system_rightside = useSelector(selectSystemPos);

    const container_height = useSelector(selectBladeContainerHeight);

    const { 
        xboxBladeContainerRef, 
        xboxliveRef, 
        marketplaceRef, 
        gamesRef, 
        mediaRef, 
        systemRef,
        bladeRef } = props;


  return <>
        <div className={bladeStyles.bladeContainer} ref={xboxBladeContainerRef}>
            
        </div>
  </>;
};

export default NavBladesContainer;


// <div className={`${bladeStyles.leftBlades}`}>
//             <div id={bladeStyles["marketplaceBlade"]} className={`${bladeStyles.blade}`}>
//                 <div className={`${bladeStyles.singleBladeGroup}`}>
//                     <svg ref={bladeRef} className={bladeStyles.bladeBase}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path onClick={``} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
//                         <defs>
//                             <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
//                             <stop offset="0.946467" stop-color="#C1C1C1"/>
//                             <stop offset="0.973669" stop-color="#DBDBDB"/>
//                             <stop offset="1" stop-color="#8B8B8B"/>
//                             </radialGradient>
//                         </defs>
//                     </svg>

//                     <svg className={`${bladeStyles.bladeJewel} ${current_context_index !== 0  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMarketplaceJewelFill}`} onClick={``} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
//                         <defs>
//                             {/* Active gradient */}
//                             <radialGradient id="paint0_radial_217_185" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
//                                 <stop offset="0.968864" stop-color="#B35F2D"/>
//                                 <stop offset="0.968964" stop-color="#BE6B32"/>
//                                 <stop offset="0.982838" stop-color="#FF9D42"/>
//                                 <stop offset="1" stop-color="#CB8536"/>
//                             </radialGradient>

//                             {/* Inactive gradient */}
//                             <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
//                                 <stop offset="0.885417" stop-color="#5B5B5B"/>
//                                 <stop offset="0.96875" stop-color="#D3D3D3"/>
//                                 <stop offset="1" stop-color="#848484"/>
//                             </radialGradient>
//                         </defs>
//                     </svg>


//                 </div>
//             </div>
//             <div id={bladeStyles["xboxliveBladeLeft"]} className={`${bladeStyles.blade}`}>
//                 <div className={`${bladeStyles.singleBladeGroup}`}>
//                     <svg ref={bladeRef} className={bladeStyles.bladeBase}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path onClick={``} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
//                         <defs>
//                             <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
//                             <stop offset="0.946467" stop-color="#C1C1C1"/>
//                             <stop offset="0.973669" stop-color="#DBDBDB"/>
//                             <stop offset="1" stop-color="#8B8B8B"/>
//                             </radialGradient>
//                         </defs>
//                     </svg>

//                     <svg className={`${bladeStyles.bladeJewel} ${current_context_index !== 0  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMarketplaceJewelFill}`} onClick={``} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
//                         <defs>
//                             {/* Active gradient */}
//                             <radialGradient id="paint0_radial_217_185" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
//                                 <stop offset="0.968864" stop-color="#B35F2D"/>
//                                 <stop offset="0.968964" stop-color="#BE6B32"/>
//                                 <stop offset="0.982838" stop-color="#FF9D42"/>
//                                 <stop offset="1" stop-color="#CB8536"/>
//                             </radialGradient>

//                             {/* Inactive gradient */}
//                             <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
//                                 <stop offset="0.885417" stop-color="#5B5B5B"/>
//                                 <stop offset="0.96875" stop-color="#D3D3D3"/>
//                                 <stop offset="1" stop-color="#848484"/>
//                             </radialGradient>
//                         </defs>
//                     </svg>


//                 </div>
//             </div>
//             </div>
//             <div className={`${bladeStyles.rightBlades}`}></div>