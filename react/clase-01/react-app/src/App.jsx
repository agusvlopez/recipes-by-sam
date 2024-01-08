import './App.css' //esto lo resuelve vite
//componente
import ProductsList from '../ProductsList';
import { createBrowserRouter, Link, Outlet, Router, RouterProvider, useNavigate } from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import Contact from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import ProductViewPage from './pages/ProductViewPage';
import LoginPage from './pages/LoginPage';
import RoutePrivate from './components/RoutePrivate';
import { AppMain } from './components/AppMain';

const route = createBrowserRouter([
  {
    path: '/',
    element: <AppMain />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'products',
        element: <RoutePrivate><Outlet /></RoutePrivate>,
        children: [
          {
            path: '',
            element: <ProductsList />
          },
          {
            path: ':idProduct',
            element: <ProductViewPage />
          }
        ],
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <Contact />
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

function App() {
  return (
    <RouterProvider router={route} />
  )
}

//Render(estados):
// Monto el componente y se ejecuta el render

//cambia el estado
//cambia el contexto(hooks)
//cambian las propiedades

// se destruye

// function Mensaje({ show = false, children }) {

//   useEffect(() => {
//     console.log("Se ejecuta cuando se monta el componente");

//     return () => {
//       console.log("Se ejecuta cuando se desmonta el componente");
//     }
//   }, []);

//   if (show) {
//     return <p>{children}</p>
//   }

//   return null;
// }

export default App;