import React from 'react'

import logic from '../../logic'

function Topbar({ onGoToHome, onGoToProfile, onGoToNotifications, onGoToServices, onLogOut, onCreatingNewLink, onGoToClosedServices }) {

    return <section className="topbar">
        <img className="topbar__button--icon" onClick={onGoToHome}/>
        <button className="topbar__button" onClick={onGoToProfile}>Profile</button>
        <button className="topbar__button" onClick={onGoToNotifications}>Notifications</button>
        <button className="topbar__button" onClick={onGoToServices}>Create Service</button>
        <button className="topbar__button" onClick={onGoToClosedServices}>Services to Close</button>
        {(logic.isUserAdmin && <button className="topbar__button" onClick={onCreatingNewLink}>Generate new user link</button>)}
        <button className="topbar__button--logout" onClick={onLogOut}>Log Out</button>
    </section>
}

export default Topbar