import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignInForm() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = React.useState("");

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = async evt => {
        evt.preventDefault();
        setMessage("Iniciando sesión...");

        const loginCredentials = {
            email: state.email,
            password: state.password
        };

        const BACKEND_URL = "http://localhost:8080/usuario/login";

        try {
            const response = await axios.post(BACKEND_URL, loginCredentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate('/dashboard');

        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || error.response.data || 'Correo o contraseña incorrectos';
                setMessage(`Error: ${errorMsg}`);
            } else if (error.request) {
                setMessage("Error de conexión: El servidor no responde.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Bienvenidx</h1>

                {message && <p style={{ color: message.startsWith("Error") ? 'red' : 'green' }}>{message}</p>}

                <input
                    type="email"
                    placeholder="Correo"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={state.password}
                    onChange={handleChange}
                />
                <a href="#">¿Olvidaste tu contraseña?</a>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default SignInForm;