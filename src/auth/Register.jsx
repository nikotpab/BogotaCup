import React from "react";
import axios from "axios";

function SignUpForm() {
    const [state, setState] = React.useState({
        nombre: "",
        apellido: "",
        correo: "",
        clave: "",
        rol: "",
        numeroCamiseta: "",
        fechaNacimiento: ""
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

        const usuarioData = {
            nombre: state.nombre,
            apellido: state.apellido,
            correo: state.correo,
            clave: state.clave,
            rol: state.rol,
            numeroCamiseta: state.numeroCamiseta || 0,
            fechaNacimiento: state.fechaNacimiento
        };

        const BACKEND_URL = "http://localhost:8080/usuario/crear";

        try {
            const response = await axios.post(BACKEND_URL, usuarioData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setMessage(`Éxito: ${response.data}`);

            setState({
                nombre: "",
                apellido: "",
                correo: "",
                clave: "",
                rol: "",
                numeroCamiseta: "",
                fechaNacimiento: ""
            });

        } catch (error) {
            if (error.response) {
                setMessage(`Error al registrar: ${error.response.data || 'El servidor devolvió un error.'}`);
            } else if (error.request) {
                setMessage("Error de conexión: No se pudo conectar con el servidor.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Crear cuenta</h1>
                {message && <p style={{ color: message.startsWith("Error") ? 'red' : 'green' }}>{message}</p>}

                <input
                    type="text"
                    name="nombre"
                    value={state.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    type="text"
                    name="apellido"
                    value={state.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                />
                <input
                    type="email"
                    name="correo"
                    value={state.correo}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                />
                <input
                    type="password"
                    name="clave"
                    value={state.clave}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />
                <input
                    type="text"
                    name="rol"
                    value={state.rol}
                    onChange={handleChange}
                    placeholder="Rol (ej: JUGADOR, ADMIN)"
                />
                <input
                    type="number"
                    name="numeroCamiseta"
                    value={state.numeroCamiseta}
                    onChange={handleChange}
                    placeholder="Número de Camiseta"
                />
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={state.fechaNacimiento}
                    onChange={handleChange}
                    placeholder="Fecha de Nacimiento"
                />

                <button type="submit">Registrarme</button>
            </form>
        </div>
    );
}

export default SignUpForm;