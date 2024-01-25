import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "../features/apiSlice";
import { Loader } from "../components/Loader";

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [createAccount] = useCreateAccountMutation();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await createAccount({ email, password }).unwrap();
            localStorage.setItem('token', result.account.token);
            localStorage.setItem('role', result.account.role);
            localStorage.setItem('email', email);

            navigate('/', { state: { successMessage: 'Account created successfully! Welcome.' }, replace: true });
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please try again.');
            setPassword("");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleFormSubmit} className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
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

                    <label htmlFor="pass" className="block mt-4 text-gray-700">Password <span className="text-gray-500">(minimum 4 characters)</span>:</label>
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
                        {isLoading ? <Loader loaderType="loader-button" /> : "Register"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;