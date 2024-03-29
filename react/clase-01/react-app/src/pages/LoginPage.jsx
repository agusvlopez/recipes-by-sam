import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSessionMutation } from "../features/apiSlice";
import { Loader } from "../components/Loader";

function LoginPage() {
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('1234');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [createSession] = useCreateSessionMutation();

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
            const result = await createSession({ email, password }).unwrap();
            localStorage.setItem('token', result.session.token);
            localStorage.setItem('email', result.session.account.email);
            localStorage.setItem('role', result.session.account.role);

            navigate('/', { state: { successMessage: 'Login successful! Welcome back.' }, replace: true });
        } catch (error) {
            console.log(error);
            if (error.data.errors) {
                setError(`Error! ${error.data.errors}.`);
            } else {
                setError(`Email and password do not match. Please try again.`);
            }

            setPassword("");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleFormSubmit} className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                    {error && (
                        <div className="border border-red-500 rounded-lg p-4 flex items-center justify-center gap-2 mb-4 text-sm">
                            <span className="error-icon"></span>
                            <p className="text-red-500">{error}</p>
                        </div>
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
                        {isLoading ? <Loader loaderType="loader-button" /> : "Login"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;