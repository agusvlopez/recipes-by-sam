import express from 'express';
import ProductsRoute from './routes/products.js';
import ProductsReviews from './routes/productsReviews.js';
import cors from 'cors';
import AccountRoute from './routes/account.js'
//import path from 'path';

const app = express();
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(cors()); //cualquiera puede acceder a la API(lo ideal es limitarlo, dice como en la documentacion de cors)
app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(ProductsRoute);
app.use(ProductsReviews);
app.use('/api', AccountRoute);

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.originalname.split('.').pop();
//         cb(null, `${Date.now()}.${ext}`);
//     }
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send({ data: 'Imagen cargada' });
// })
app.listen(2023, function () {
    console.log("El servidor esta levantado! http://localhost:2023");
});
