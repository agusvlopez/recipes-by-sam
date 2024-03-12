import { useGetProductsQuery } from '../features/apiSlice';
import coverHome from '../covers/home.jpg';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import AboutPage from './AboutPage';
import About from '../components/About';

export default function HomePage() {

    const { data: products, isLoading } = useGetProductsQuery();
    const latestProducts = products ? products.slice(-4) : [];

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Recupera el estado de la ubicación
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setShowSuccessMessage(true);

            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [location.state]);

    return (
        <>
            <section className="pt-8 bg-gray-100">
                {showSuccessMessage && (
                    <div className="success-alert">
                        {location.state.successMessage}
                    </div>
                )}
                <div className="container mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold textBrown leading-tight mb-4">
                            Welcome to Recipes by Sam
                        </h1>
                        <p className="text-xl text-gray-600">
                            Find out delicius recipes and create incredible dishes with my recipe books.
                        </p>
                    </div>
                </div>
                <div className='pt-6'>
                    <img src={coverHome} alt="" className='h-1/4 mx-auto' />
                </div>
            </section>
            <section className="py-12 container max-w-5xl mx-auto mt-6 mb-6 p-4 gap-8 h-full md:h-screen">
                <div className="w-[50%]">
                    <h2 className="pl-6 pt-6 uppercase section-about--title">About Us</h2>
                    <h3 className="pl-6 pt-2 text-4xl font-bold section-about--subtitle ">The Beginning Of Your Healthy Lifestyle</h3>
                </div>
                <About />
            </section>
            <section className="py-12 bg-white">
                <div className="container mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-extrabold textBrown leading-tight mb-4">
                            Latest Recipe Books
                        </h2>
                        <p className="text-lg text-gray-600">
                            Explore our most popular recipe books and surprise your loved ones.
                        </p>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {latestProducts.map((product) => (
                                    <Link to={`./products/${product._id}`} key={product._id} className="bg-white p-4 rounded-md shadow-md home--card">
                                        <img src={product.file} alt="" />
                                        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex justify-end mt-8">
                                <Link to="./products" className="textBrown font-bold text-lg hover:underline">
                                    See more recipe books »
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section className="newsletter--section py-12">
                <div className="relative max-w-4xl mx-auto">
                    <span className="newsletter--icon-skillet"></span>
                    <h2 className="newsletter--title">Get the Latest Recipe Books!</h2>
                    <h3 className="newsletter--description">Join our newsletter.</h3>
                    <form className="newsletter--form">
                        <input type="email" placeholder="Your Email" className="newsletter--input" />
                        <button type="submit" className="newsletter--submit">Subscribe</button>
                    </form>
                    <span className="newsletter--icon-whisk"></span>
                </div>
            </section>
        </>
    )
}