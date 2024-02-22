import { useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../components/Title";
import { useCreateReviewMutation, useGetProductQuery, useGetReviewsQuery } from "../features/apiSlice";
import { Loader } from "../components/Loader";

function ProductViewPage({ }) {
    const [newComment, setNewComment] = useState("");
    const { idProduct } = useParams();

    const { data: product } = useGetProductQuery(idProduct);
    const { data: comments, isLoading: commentsLoading } = useGetReviewsQuery(idProduct);

    const [createReview, { isLoading: createReviewLoading }] = useCreateReviewMutation();

    const handleCommentSubmit = () => {
        createReview({ comment: newComment, user: localStorage.getItem('email'), idProduct: idProduct });
        setNewComment("");
    };

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

    return (
        <>
            <div className="container mx-auto mt-6 p-4">
                <Title>Product Detail</Title>
                {product ? (
                    <>
                        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                            <div className="md:flex gap-4">
                                <div>
                                    <img src={product.file} alt="" />
                                </div>
                                <div>
                                    <h2 className="text-2xl product-detail--title mb-4 mt-2 md:mt-0">{product.name}</h2>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="product-detail--price">Price: ${product.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-8 mb-2">
                                    <h3 className="text-xl font-bold mb-4">Comments</h3>
                                    <ul>
                                        {commentsLoading &&
                                            <Loader />
                                        }
                                        {comments?.map((comment, index) => (

                                            <li key={index} className="mb-2"><span className="block product-detail--comment">{comment.user}</span><span className="text-gray-500">{comment.comment}</span></li>
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
                                        className="mt-2 text-white p-2 rounded-md"
                                    >
                                        {createReviewLoading ? <Loader loaderType="loader-button" /> : "Send Comment"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    )
}

export default ProductViewPage;