import React, { createContext, useContext, useState } from 'react';

const CurrentAuthContext = createContext(null);

export default function Auth() {
    const [currentAuth, setCurrentAuth] = useState(<SignIn/>);

    return (
        <div className="Auth-page">
            <div className="Auth-card">
                <CurrentAuthContext.Provider value={{currentAuth, setCurrentAuth}}>
                </CurrentAuthContext.Provider>
            </div>
            <button onClick={() => {setCurrentAuth(<SignIn/>)}}>Вход</button>
            <button onClick={() => {setCurrentAuth(<SignUp/>)}}>Регистрация</button>
        </div>
    )
}

function SignIn({children}) {
    return (
        <div className="Auth-page">
            <form>
                <input name="SignIn" />
                <button type="submit">SignIn</button>
            </form>
        </div>
    )
}

function SignUp({children}) {
    return (
        <div className="Auth-page">
            <form>
                <input name="SignUp" />
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}



