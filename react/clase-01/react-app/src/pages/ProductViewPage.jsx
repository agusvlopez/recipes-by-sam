import { useState } from "react";
import { useParams } from "react-router-dom";
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
            <div>
                <div className="text-center mb-6 py-16 section-product--cover">
                    <h1 className="uppercase section-about--title">Product Detail</h1>
                    <h2 className="pt-2 pb-2 text-4xl font-bold section-about--subtitle ">Find The Perfect Recipe Book For You</h2>
                    <p className="text-xl text-gray-600">
                        There's full of variety of recipes in our recipe books to delight you and everyone.
                    </p>
                </div>
                {product ? (
                    <>
                        <div className="max-w-4xl mx-auto mt-8 p-6 ">
                            <div className="md:flex gap-4">
                                <div>
                                    <img src={product.file} alt="" className="" />
                                </div>
                                <div>
                                    <h3 className="text-3xl section-product-detail--title mb-4 md:mt-0">{product.name}</h3>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="section-product-detail--price">${product.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-8 mb-2 section-product-detail--comments">
                                    <h4 className="section-product-detail--comments-title text-xl font-bold mb-4">Comments</h4>
                                    <ul>
                                        {commentsLoading &&
                                            <Loader />
                                        }
                                        {comments?.map((comment, index) => (

                                            <li key={index} className="mb-2"><span className="block section-product-detail--comment">{comment.user}</span><span className="text-gray-500">{comment.comment}</span></li>
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
                                        className="p-2 border w-full"
                                    />
                                    <button
                                        onClick={handleCommentSubmit}
                                        className="section-product-detail--button mt-2 text-white p-2"
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