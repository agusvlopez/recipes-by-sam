import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { Loader } from "../../components/Loader";
import { useGetProductsQuery } from "../../features/apiSlice";

function AdminProductsPage({ }) {
    const { data: products, isLoading } = useGetProductsQuery();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setShowSuccessMessage(true);

            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [location.state]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = () => {
        const filtered = searchQuery.trim() !== "" ?
            products?.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) : products;

        setFilteredProducts(filtered);
    };

    return (
        <>
            <div className="container mx-auto mt-8 p-4">
                {showSuccessMessage && (
                    <div className="success-alert-products">
                        {location.state.successMessage}
                    </div>
                )}
                <Title>Products List</Title>
                <div className="mb-6">
                    <Link to={'./newProduct'}><button className="p-2 text-white rounded">Add a product +</button></Link>
                </div>
                <div className="flex mb-4 max-w-md">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={handleQuery}
                        className="p-2 border rounded-l-md flex-grow"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-2 text-white rounded-r-md"
                    >
                        Search
                    </button>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts?.map((product) => (
                            <Link to={`./${product._id}`} key={product._id}>
                                <div key={product._id} className="bg-white p-4 rounded-md shadow-md product-card--admin">
                                    <img src={product.file} alt="" />
                                    <h3 className="text-xl font-bold mb-2 mt-2">{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="text-gray-700 mt-2">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-4 text-white rounded-full shadow-md"
                >
                    &#8593;
                </button>
            </div>

        </>
    )
}

export default AdminProductsPage;