import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import ProductPage from "./ProductPage";

function NewProductPage({ }) {

    return (
        <>
            <ProductPage />
        </>
    )
}

export default NewProductPage;