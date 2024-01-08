import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //En los handle se podrian hacer las validaciones
    const handleEmailChange = (e) => {
        setEmail(e.target.value); //Establece el valor del input entonces fuerza el renderizado 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:2023/api/session', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem('token', result.session.token);
                navigate('/', { replace: true });
                console.log(result);
            });
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" required onChange={handleEmailChange} value={email} />
                <label htmlFor="pass">Contraseña:</label>
                <input id="pass" type="password" required onChange={handlePasswordChange} value={password} />
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    )
}

export default LoginPage;