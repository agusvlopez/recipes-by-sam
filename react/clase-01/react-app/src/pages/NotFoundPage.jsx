import notFoundImage from '../covers/not-found.png';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-brown">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">Oops! Looks like the page you are looking for does not exist.</p>
            <img className="max-w-xs w-full p-4" src={notFoundImage} alt="404 Image" />
        </div>
    )
}