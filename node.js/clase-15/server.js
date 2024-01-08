import express from 'express';
import ProductsRoute from './routes/products.js';
import ProductsReviews from './routes/productsReviews.js';
import cors from 'cors';
import AccountRoute from './routes/account.js'

const app = express();
app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(cors()); //cualquiera puede acceder a la API(lo ideal es limitarlo, dice como en la documentacion de cors)
app.use(ProductsRoute);
app.use(ProductsReviews);
app.use('/api', AccountRoute);


app.listen(2023, function () {
    console.log("El servidor esta levantado! http://localhost:2023");
});
