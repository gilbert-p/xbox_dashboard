import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Dashboard.module.css';
import { navigateTo, selectCurrentContext } from './xboxSlice';

const Xbox = () => {

    const dispatch = useDispatch();
    const [current_context, setCurrentContext] = useState("games");
    const current_dashboard_context = useSelector(selectCurrentContext);

    return (
        <div>
            <h2>{current_dashboard_context}</h2>
            <div className={styles.mainContainer}>
                <div className={styles.bladeContainer}>
                    <div className={styles.blade} onClick={()=> dispatch(navigateTo("marketplace"))}><p>marketplace</p></div>
                    <div className={styles.blade} onClick={()=> dispatch(navigateTo("xbox_live"))}><p>xbox live</p></div>
                    <div className={styles.blade} onClick={()=> dispatch(navigateTo("games"))}><p>games</p></div>
                    <div className={styles.blade} onClick={()=> dispatch(navigateTo("media"))}><p>media</p></div>
                    <div className={styles.blade} onClick={()=> dispatch(navigateTo("system"))}><p>system</p></div>
                </div>
                <section className={styles.gamesContainer}>
                    <div className={styles.whiteRadial}></div>
                    <div className={styles.topBorder}></div>
                    <h2 className={styles.sectionHeading}>Games</h2>
                    <div className={styles.contentContainer}>
                        <div className={styles.leftContent}>
                            <div className={styles.profileContainer}>
                                <div className={styles.highlight}></div>
                                <p>Sign In</p>
                                <div className={styles.profileImgContainer}>
                                    <div className={styles.profileIcon}></div>
                                </div>
                                <div className={styles.profileDescription}>
                                    <p>2 Profiles Found</p>
                                </div>
                            </div>
                            <div className={styles.selectItemListContainer}>
                                <div className={styles.innerListContainer}>
                                    <div><p>Join Xbox LIVE</p></div>
                                    <div><p>Recover Gamertag from Xbox LIVE</p></div>
                                </div>
                            </div>
                            <div className={styles.xboxliveAnimation}></div>
                        </div>
                        <div className={styles.rightContent}>
                            <div className={styles.xboxliveLogo}>asdf</div>
                            <div className={styles.descriptionContainer}>
                                <div className={styles.descriptionTitle}>Xbox LIVE</div>
                                <div className={styles.descriptionContent}>
                                    Games. Tournaments. Entertainment. 
                                    All the rewards. Endless possibilities. What are you waiting for?
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomContent}></div>
                    </div>
                    <div className={styles.controllerButtons}></div>
                </section>
                
            </div>
        </div>
    )
}

export default Xbox

