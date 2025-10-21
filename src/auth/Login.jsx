import React from "react";
function SignInForm() {
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { email, password } = state;
        alert(`You are login with email: ${email} and password: ${password}`);

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Bienvenidx</h1>


                <input
                    type="user"
                    placeholder="Usuario"
                    name="user"
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
                <button>Iniciar sesión</button>
            </form>
        </div>
    );
}

export default SignInForm;
