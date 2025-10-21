import React, { useState } from "react";
import "../styles/Login.css";
import SignInForm from "./Login"
import SignUpForm from "./Register";


export default function App() {
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };
    const containerClass =
        "container " + (type === "signUp" ? "right-panel-active" : "");
    return (
        <div className="App">
            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>¿Ya nos conocemos?</h1>
                            <p>
                                Si ya tienes una cuenta, inicia sesión para que permanezcamos conectados
                            </p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                               Iniciar sesión
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hola!</h1>
                            <p>Si todavía no tienes cuenta, puedes registrarte para empezar a vivir el fútbol de barrio</p>
                            <button
                                className="ghost "
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Registrarme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
