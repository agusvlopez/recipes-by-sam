import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const URL = "https://vercel-api-ten-tau.vercel.app";
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

        fetch(`${URL}/api/account`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                localStorage.setItem('token', result.account.token);
                localStorage.setItem('email', email);
                navigate('/', { replace: true });
                console.log(result);
            });
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleFormSubmit} className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>

                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        required
                        onChange={handleEmailChange}
                        value={email}
                        className="mt-1 p-2 w-full border rounded-md"
                    />

                    <label htmlFor="pass" className="block mt-4 text-gray-700">Password:</label>
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
                        className="mt-6 bg-indigo-500 p-2 rounded-md text-white w-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;