import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigateTo, 
    selectContextIndex,
    selectXboxPos,
    selectGamesPos,
    selectMediaPos,
    selectSystemPos,
} from '../xboxSlice';
    
import bladeStyles from "../../styles/BladeStyling.module.css";
import transitionStyles from '../../styles/TransitionStyles.module.css';

const NavBladesContainer = (props) => {
    
    const dispatch = useDispatch();

    //Dashboard state variables
    const current_context_index = useSelector(selectContextIndex);
    const xbox_blade_position = useSelector(selectXboxPos);
    const games_position = useSelector(selectGamesPos);
    const media_position = useSelector(selectMediaPos);
    const system_pos = useSelector(selectSystemPos);

    const { 
        xboxBladeContainerRef, 
        xboxliveRef, 
        marketplaceRef, 
        gamesRef, 
        mediaRef, 
        systemRef } = props;


  return <>
        <div className={bladeStyles.bladeContainer} ref={xboxBladeContainerRef}>
            <div id={bladeStyles["marketplaceBlade"]} className={`${bladeStyles.blade} `}  style={{"--index": 0}} ref={marketplaceRef} >
                <div className={`${bladeStyles.bladeShrink}`}>
                    <svg  className={bladeStyles.bladeBase}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path onClick={()=> {dispatch(navigateTo(0));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                        <defs>
                            <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                            <stop offset="1" stop-color="#8B8B8B"/>
                            </radialGradient>
                        </defs>
                    </svg>

                    <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 0  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMarketplaceJewelFill}`} onClick={()=> {dispatch(navigateTo(0));}} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                        <defs>
                            {/* Active gradient */}
                            <radialGradient id="paint0_radial_217_185" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                <stop offset="0.968864" stop-color="#B35F2D"/>
                                <stop offset="0.968964" stop-color="#BE6B32"/>
                                <stop offset="0.982838" stop-color="#FF9D42"/>
                                <stop offset="1" stop-color="#CB8536"/>
                            </radialGradient>

                            {/* Inactive gradient */}
                            <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                <stop offset="1" stop-color="#848484"/>
                            </radialGradient>
                        </defs>
                    </svg>


                </div>
            </div>        
            <div id={bladeStyles["xboxliveBlade"]}    className={`${bladeStyles.blade}`}   style={{"--index": 1}} ref={xboxliveRef}>


                    {/* Left Blade */}
                    <div className={`${bladeStyles.bladeShrink} ${!xbox_blade_position ? transitionStyles.instantTransparent : ""}`}>
                            <svg className={bladeStyles.bladeBase}   viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(1));}}  d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                                <defs>
                                    <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                    <stop offset="0.946467" stop-color="#C1C1C1"/>
                                    <stop offset="0.973669" stop-color="#DBDBDB"/>
                                    <stop offset="1" stop-color="#8B8B8B"/>
                                    </radialGradient>
                                </defs>
                            </svg>

                            <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`}  viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                <path onClick={()=> {dispatch(navigateTo(1));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                                <defs>
                                    {/* Active gradient */}
                                    <radialGradient id="paint0_radial_217_189" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                        <stop offset="0.901042" stop-color="#DB9C43"/>
                                        <stop offset="0.968864" stop-color="#C79042"/>
                                        <stop offset="0.968964" stop-color="#BE6B32"/>
                                        <stop offset="0.982838" stop-color="#FDC04F"/>
                                        <stop offset="1" stop-color="#EAA162"/>
                                    </radialGradient>

                                    {/* Inactive gradient */}
                                    <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                        <stop offset="0.885417" stop-color="#5B5B5B"/>
                                        <stop offset="0.96875" stop-color="#D3D3D3"/>
                                        <stop offset="1" stop-color="#848484"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                    </div>
                    
                    {/* Right Blade */}
                    <div className={`${bladeStyles.bladeShrink} ${xbox_blade_position ? transitionStyles.instantTransparent : ""}`}>
                            <svg className={bladeStyles.bladeBaseRight}  viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path onClick={()=> {dispatch(navigateTo(1));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                                <defs>
                                    <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                    <stop offset="0.946467" stop-color="#C1C1C1"/>
                                    <stop offset="0.973669" stop-color="#DBDBDB"/>
                                    <stop offset="1" stop-color="#8B8B8B"/>
                                    </radialGradient>
                                </defs>
                            </svg>

                            <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`}  viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                                <path onClick={()=> {dispatch(navigateTo(1));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                                <defs>
                                    <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                    <stop offset="0.885417" stop-color="#5B5B5B"/>
                                    <stop offset="0.96875" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                    </radialGradient>
                                </defs>
                            </svg>


                    </div>

                {/* Transition blade for mid animation */}
                {/* <div className={`${bladeStyles.transitionBlade} ${!transition_state ? transitionStyles.instantTransparent : "" } `}></div> */}
            </div>
            <div id={bladeStyles["gamesBlade"]}       className={`${bladeStyles.blade}`}   style={{"--index": 2}} ref={gamesRef}>
                {/* Left Blade */}
                <div className={`${bladeStyles.bladeShrink} ${!games_position ? transitionStyles.instantTransparent : ""}`}>
                        <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(2));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                            <defs>
                                <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                <stop offset="1" stop-color="#8B8B8B"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 2  ? bladeStyles.inactiveBladeFill : bladeStyles.activeGamesJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(2));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                            <defs>
                                {/* Active gradient */}
                                <radialGradient id="paint0_radial_217_181" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                    <stop offset="0.968964" stop-color="#4CA63A"/>
                                    <stop offset="0.982838" stop-color="#68CE3C"/>
                                    <stop offset="1" stop-color="#4D9E3C"/>
                                </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                    <stop offset="0.885417" stop-color="#5B5B5B"/>
                                    <stop offset="0.96875" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                            </defs>
                        </svg>


                </div>

                {/* Right Blade */}
                <div className={`${bladeStyles.bladeShrink} ${games_position ? transitionStyles.instantTransparent : ""}`}>
                        <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(2));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                            <defs>
                                <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                <stop offset="1" stop-color="#8B8B8B"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(2));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                            <defs>
                                <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                                <stop offset="0.885417" stop-color="#5B5B5B"/>
                                <stop offset="0.96875" stop-color="#D3D3D3"/>
                                <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                            </defs>
                        </svg>


                </div>
            </div>
            <div id={bladeStyles["mediaBlade"]}       className={`${bladeStyles.blade}`}   style={{"--index": 3}} ref={mediaRef}>
                {/* Left Blade */}
                <div className={`${bladeStyles.bladeShrink} ${!media_position ? transitionStyles.instantTransparent : ""}`}>
                        <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(3));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                            <defs>
                                <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                <stop offset="1" stop-color="#8B8B8B"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        <svg id={``} className={`${bladeStyles.bladeJewel} ${current_context_index !== 3  ? bladeStyles.inactiveBladeFill : bladeStyles.activeMediaJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(3));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                            <defs>
                                {/* Active gradient */}
                                <radialGradient id="paint0_radial_217_193" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                    <stop offset="0.968864" stop-color="#356DA7"/>
                                    <stop offset="0.968964" stop-color="#3872AB"/>
                                    <stop offset="0.982838" stop-color="#5CB2FF"/>
                                    <stop offset="1" stop-color="#3E7FBD"/>
                                </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                    <stop offset="0.885417" stop-color="#5B5B5B"/>
                                    <stop offset="0.96875" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                            </defs>
                        </svg>


                </div>

                {/* Right Blade */}
                <div className={`${bladeStyles.bladeShrink} ${media_position ? transitionStyles.instantTransparent : ""}`}>
                    <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(3));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                        <defs>
                            <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                            <stop offset="1" stop-color="#8B8B8B"/>
                            </radialGradient>
                        </defs>
                    </svg>

                    <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(3));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                        <defs>
                            <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                            <stop offset="0.885417" stop-color="#5B5B5B"/>
                            <stop offset="0.96875" stop-color="#D3D3D3"/>
                            <stop offset="1" stop-color="#848484"/>
                            </radialGradient>
                        </defs>
                    </svg>


                </div>
            </div>
            <div id={bladeStyles["systemBlade"]}      className={`${bladeStyles.blade}`}   style={{"--index": 4}} ref={systemRef}>
                {/* Left Blade */}
                <div className={`${bladeStyles.bladeShrink} ${!system_pos ? transitionStyles.instantTransparent : ""}`}>
                        <svg className={bladeStyles.bladeBase} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(4));}} d="M87.5336 223.5C74.4543 125.593 44.4364 1.78581 42.5 1H1C74.5065 274.735 68.8105 685.347 1.5 993H47.5C47.5 993 85.034 777 87.034 718.5C87.6341 700.947 89.1623 689.05 82.534 672.5L64.5338 627C60.7944 618.167 59.0914 612.731 59.0339 599.5C60.9846 461.497 61.331 384.246 49.5338 248.5C48.8828 238.935 55.7883 238.041 61.0333 238H71.5334C82.0173 237.749 88.9083 234.663 87.5336 223.5Z" />
                            <defs>
                                <radialGradient id="paint0_radial_216_168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1802 580.5) rotate(91.4838) scale(2490.84 1932.87)">
                                <stop offset="0.946467" stop-color="#C1C1C1"/>
                                <stop offset="0.973669" stop-color="#DBDBDB"/>
                                <stop offset="1" stop-color="#8B8B8B"/>
                                </radialGradient>
                            </defs>
                        </svg>

                        <svg id={bladeStyles["marketplaceJewel"]} className={`${bladeStyles.bladeJewel} ${current_context_index !== 4  ? bladeStyles.inactiveBladeFill : bladeStyles.activeSystemJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                            <path onClick={()=> {dispatch(navigateTo(4));}} d="M46.5337 223.5C31.3573 133.45 21.4962 84.7244 1.5 1H11C85.6261 216.115 86.3422 646.731 16.5 992.997H6.5C4.11556 994.666 42.7546 777.895 46.0342 718.5C47.0024 700.964 48.1624 689.05 41.5342 672.5L23.5342 627C19.7947 618.167 18.0917 612.731 18.0342 599.5C19.9849 461.497 20.3312 384.246 8.53405 248.5C7.88298 238.934 14.7887 238.041 20.0336 238H30.5337C41.0177 237.749 47.9085 234.662 46.5337 223.5Z" stroke="black" stroke-opacity="0.5"/>
                            <defs>
                                {/* Active gradient */}
                                <radialGradient id="paint0_radial_217_197" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(93.0164) scale(4133.23 1726.2)">
                                    <stop offset="0.968864" stop-color="#8664B4"/>
                                    <stop offset="0.982838" stop-color="#A983FA"/>
                                    <stop offset="1" stop-color="#8E6FCB"/>
                                </radialGradient>

                                {/* Inactive gradient */}
                                <radialGradient id="paint0_radial_216_167" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1678.5 947.5) rotate(92.9619) scale(4170.57 1758.58)">
                                    <stop offset="0.885417" stop-color="#5B5B5B"/>
                                    <stop offset="0.96875" stop-color="#D3D3D3"/>
                                    <stop offset="1" stop-color="#848484"/>
                                </radialGradient>
                            </defs>
                        </svg>


                </div>

                {/* Right Blade */}
                <div className={`${bladeStyles.bladeShrink} ${system_pos ? transitionStyles.instantTransparent : ""}`}>
                    <svg className={bladeStyles.bladeBaseRight} viewBox="0 0 87 992" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(4));}} d="M1.41757 223.5C14.4969 125.593 44.5148 1.78581 46.4512 1H87.9512C14.4446 274.735 20.1407 685.347 87.4512 993H41.4512C41.4512 993 3.91713 777 1.91713 718.5C1.31705 700.947 -0.211121 689.05 6.41713 672.5L24.4173 627C28.1568 618.167 29.8597 612.731 29.9173 599.5C27.9665 461.497 27.6202 384.246 39.4173 248.5C40.0684 238.935 33.1628 238.041 27.9179 238H17.4178C6.93388 237.749 0.0428619 234.663 1.41757 223.5Z" fill="url(#paint0_radial_216_179)" stroke="black" stroke-opacity="0.5"/>
                        <defs>
                            <radialGradient id="paint0_radial_216_179" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1890.95 580.5) rotate(88.5162) scale(2490.84 1932.87)">
                            <stop offset="0.946467" stop-color="#C1C1C1"/>
                            <stop offset="0.973669" stop-color="#DBDBDB"/>
                            <stop offset="1" stop-color="#8B8B8B"/>
                            </radialGradient>
                        </defs>
                    </svg>

                    <svg id={``} className={`${bladeStyles.bladeJewelRight} ${current_context_index !== 1  ? bladeStyles.inactiveBladeFill : bladeStyles.activeXboxliveJewelFill}`} viewBox="0 0 66 993" xmlns="http://www.w3.org/2000/svg">
                        <path onClick={()=> {dispatch(navigateTo(4));}} d="M22.4174 223.5C37.5938 133.45 47.4549 84.7244 67.4512 1H57.9512C-16.6749 216.115 -17.391 646.731 52.4512 992.997H62.4512C64.8356 994.666 26.1966 777.895 22.917 718.5C21.9487 700.964 20.7887 689.05 27.417 672.5L45.417 627C49.1565 618.167 50.8595 612.731 50.917 599.5C48.9662 461.497 48.62 384.246 60.4171 248.5C61.0682 238.934 54.1625 238.041 48.9175 238H38.4174C27.9335 237.749 21.0427 234.662 22.4174 223.5Z" fill="url(#paint0_radial_216_177)" stroke="black" stroke-opacity="0.5"/>
                        <defs>
                            <radialGradient id="paint0_radial_216_177" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1747.45 947.5) rotate(87.0381) scale(4170.57 1758.58)">
                            <stop offset="0.885417" stop-color="#5B5B5B"/>
                            <stop offset="0.96875" stop-color="#D3D3D3"/>
                            <stop offset="1" stop-color="#848484"/>
                            </radialGradient>
                        </defs>
                    </svg>


                </div>
            </div>
        </div>
  </>;
};

export default NavBladesContainer;
