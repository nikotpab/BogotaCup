import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [view, setView] = useState("login");

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });
    const [loginMessage, setLoginMessage] = useState("");

    const [forgotState, setForgotState] = useState({
        email: ""
    });
    const [forgotMessage, setForgotMessage] = useState("");

    const handleLoginChange = evt => {
        const value = evt.target.value;
        setLoginState({
            ...loginState,
            [evt.target.name]: value
        });
    };

    const handleForgotChange = evt => {
        const value = evt.target.value;
        setForgotState({
            ...forgotState,
            [evt.target.name]: value
        });
    };

    const handleLoginSubmit = async evt => {
        evt.preventDefault();
        setLoginMessage("Iniciando sesión...");

        const loginCredentials = {
            email: loginState.email,
            password: loginState.password
        };

        const BACKEND_URL = "http://localhost:8080/usuario/login";

        try {
            await axios.post(BACKEND_URL, loginCredentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('userEmail', loginState.email);

            if (loginState.email === "bogotacup@gmail.com") {
                navigate('/dashboard');
            } else {
                navigate('/home');
            }

        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || error.response.data || 'Correo o contraseña incorrectos';
                setLoginMessage(`Error: ${errorMsg}`);
            } else if (error.request) {
                setLoginMessage("Error de conexión: El servidor no responde.");
            } else {
                setLoginMessage(`Error: ${error.message}`);
            }
        }
    };

    const handleForgotSubmit = async evt => {
        evt.preventDefault();
        setForgotMessage("Enviando...");

        const BACKEND_URL = "http://localhost:8080/usuario/recuperar-clave";

        try {
            await axios.post(BACKEND_URL, { email: forgotState.email });
            setForgotMessage("Si tienes una cuenta creada, recibirás una contraseña temporal a través de tu correo.");
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || error.response.data || 'No se pudo procesar la solicitud.';
                setForgotMessage(`Error: ${errorMsg}`);
            } else {
                setForgotMessage("Error de conexión con el servidor.");
            }
        }
    };

    const renderLoginView = () => (
        <form onSubmit={handleLoginSubmit}>
            <h1>Bienvenidx</h1>
            {loginMessage && <p style={{ color: loginMessage.startsWith("Error") ? 'red' : 'green' }}>{loginMessage}</p>}
            <input
                type="email"
                placeholder="Correo"
                name="email"
                value={loginState.email}
                onChange={handleLoginChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={loginState.password}
                onChange={handleLoginChange}
            />
            <a href="#" onClick={(e) => { e.preventDefault(); setView("forgot"); }}>
                ¿Olvidaste tu contraseña?
            </a>
            <button type="submit">Iniciar sesión</button>
        </form>
    );

    const renderForgotView = () => (
        <form onSubmit={handleForgotSubmit}>
            <h1>Recuperar Contraseña</h1>
            <p style={{ margin: '10px 0 10px' }}>Ingresa tu correo para enviar las instrucciones de recuperación.</p>
            {forgotMessage && <p style={{ color: forgotMessage.startsWith("Error") ? 'red' : 'green' }}>{forgotMessage}</p>}
            <input
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={forgotState.email}
                onChange={handleForgotChange}
            />
            <button type="submit">Enviar</button>
            <a href="#" onClick={(e) => { e.preventDefault(); setView("login"); }} style={{ marginTop: '15px' }}>
                Volver a Iniciar Sesión
            </a>
        </form>
    );

    return (
        <div className="form-container sign-in-container">
            {view === "login" ? renderLoginView() : renderForgotView()}
        </div>
    );
}

export default Login;

