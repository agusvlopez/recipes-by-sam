import { useGetProductsQuery } from '../features/apiSlice';
import coverHome from '../covers/home.jpg';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';

export default function HomePage() {

    const { data: products, isLoading } = useGetProductsQuery();
    const latestProducts = products ? products.slice(-4) : [];

    return (
        <>
            <section className="pt-12 bg-gray-100">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Welcome to Recipes by Sam
                        </h1>
                        <p className="text-xl text-gray-600">
                            Find out delicius recipes and create incredible dishes with my recipe books.
                        </p>
                    </div>
                </div>
                <div className='pt-6'>
                    <img src={coverHome} alt="" className='h-1/4' />
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                            Favorite Recipes
                        </h2>
                        <p className="text-lg text-gray-600">
                            Explore our most popular recipes and surprise your loved ones.
                        </p>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {latestProducts.map((product) => (
                                    <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
                                        <img src={product.file} alt="" />
                                        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-8">
                                <Link to="./products" className="textBrown font-bold text-lg hover:underline">
                                    See more recipes
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}