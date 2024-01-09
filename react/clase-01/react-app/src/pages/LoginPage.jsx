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
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleFormSubmit} className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Iniciar sesión</h2>

                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        required
                        onChange={handleEmailChange}
                        value={email}
                        className="mt-1 p-2 w-full border rounded-md"
                    />

                    <label htmlFor="pass" className="block mt-4 text-gray-700">Contraseña:</label>
                    <input
                        id="pass"
                        type="password"
                        required
                        onChange={handlePasswordChange}
                        value={password}
                        className="mt-1 p-2 w-full border rounded-md"
                    />

                    <button
                        type="submit"
                        className="mt-6 bg-indigo-600 p-2 rounded-md text-white w-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;