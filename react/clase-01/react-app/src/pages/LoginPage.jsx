import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSessionMutation } from "../features/apiSlice";

function LoginPage() {
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('1234');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [createSession] = useCreateSessionMutation();

    //En los handle se podrian hacer las validaciones
    const handleEmailChange = (e) => {
        setEmail(e.target.value); //Establece el valor del input entonces fuerza el renderizado 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createSession({ email, password }).unwrap();
            localStorage.setItem('token', result.session.token);
            localStorage.setItem('email', result.session.account.email);
            localStorage.setItem('role', result.session.account.role);

            navigate('/', { state: { successMessage: 'Login successful! Welcome back.' }, replace: true });
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please try again.');
            setPassword("");
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleFormSubmit} className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Iniciar sesión</h2>
                    {error && (
                        <div className="text-red-500 mb-4 text-center">{error}</div>
                    )}
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
                        className="mt-6 bg-indigo-500 p-2 rounded-md text-white w-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;