//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";

//const client = new MongoClient('mongodb://127.0.0.1:27017');
import dotenv from 'dotenv'; // Agrega esta línea

// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

//const client = new MongoClient('mongodb://127.0.0.1:27017');
const client = new MongoClient(mongoURI);

const db = client.db("test");
const ProductReviewsCollection = db.collection('products_reviews');
const ProductCollection = db.collection('products');
console.log("products collection:", ProductCollection);

async function findReviews(idProduct) {
    await client.connect();

    return ProductReviewsCollection.find({ product_id: new ObjectId(idProduct) }).toArray();
}

async function createReview(idProduct, review) {
    await client.connect();

    const newReview = {
        ...review,
        product_id: new ObjectId(idProduct),
    }

    await ProductReviewsCollection.insertOne(newReview);

    return newReview;
}

async function getReviewsStadistic() {
    await client.connect();

    const reviewsStadistics = await ProductReviewsCollection.aggregate([
        {
            $group: {
                _id: "$product_id",
                totalComments: { $sum: 1 }
            }
        },
        {
            $sort: { totalComments: -1 }
        }
    ]).toArray();

    const productStadisticsWithNames = await Promise.all(reviewsStadistics.map(async (stadistic) => {
        const product = await ProductCollection.findOne({ _id: new ObjectId(stadistic._id) });
        if (product) {
            return { _id: stadistic._id, name: product.name, totalComments: stadistic.totalComments };
        } else {
            return { _id: stadistic._id, name: 'Producto desconocido', totalComments: stadistic.totalComments };
        }
    }));

    return productStadisticsWithNames;
}

export default {
    findReviews,
    createReview,
    getReviewsStadistic
}