import { useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../components/Title";
import { useCreateReviewMutation, useGetProductQuery, useGetReviewsQuery } from "../features/apiSlice";

function ProductViewPage({ }) {
    const [newComment, setNewComment] = useState("");
    const { idProduct } = useParams();

    const { data: product } = useGetProductQuery(idProduct);
    const { data: comments } = useGetReviewsQuery(idProduct);

    const [createReview] = useCreateReviewMutation();

    const handleCommentSubmit = () => {
        createReview({ comment: newComment, user: localStorage.getItem('email'), idProduct: idProduct });
        setNewComment("");
    };

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

    return (
        <>
            <div className="container mx-auto mt-8 p-4">
                <Title>Product Detail</Title>
                {product ? (
                    <>
                        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                            <div className="md:flex gap-4">
                                <div>
                                    <img src={product.file} alt="" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 mt-2 md:mt-0">{product.name}</h2>
                                    <p className="text-gray-700 mb-4">{product.description}</p>

                                    {/* Puedes agregar más detalles del producto según sea necesario */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-600">Price: ${product.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-8 mb-2">
                                    <h3 className="text-xl font-bold mb-4">Comments</h3>
                                    <ul>
                                        {comments?.map((comment, index) => (

                                            <li key={index} className="mb-2 text-gray-800"><span className="block font-bold">{comment.user}</span>{comment.comment}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-4 mt-4">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={handleNewComment}
                                        className="p-2 border rounded-md w-full"
                                    />
                                    <button
                                        onClick={handleCommentSubmit}
                                        className="mt-2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                                    >
                                        Send Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default ProductViewPage;