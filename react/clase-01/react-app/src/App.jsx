import { useEffect, useState } from 'react';
import './App.css' //esto lo resuelve vite
//componente
import ProductsList from '../ProductsList';
import { createBrowserRouter, Link, Outlet, Router, RouterProvider } from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import Contact from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import ProductViewPage from './pages/ProductViewPage';
import LoginPage from './pages/LoginPage';
import RoutePrivate from './components/RoutePrivate';

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

const Navbar = ({ dark, links }) => {

  // const { dark } = props;
  let className = 'nav-principal';

  if (dark) {
    className += ' nav-principal--dark'
  }

  const liLinks = [];

  return (
    <nav>
      <ul className={className}>
        {links.map((element, index) => {
          if (element.private && !localStorage.getItem('token')) {
            return null;
          }
          return <li key={index}>
            <Link to={element.url} className="nav-principal__item" >{element.texto}</Link>
          </li>
        }
        )}
        <p>{links.length}</p>
        {links.length > 6 &&
          <Mensaje show={links.length === 7}
          >
            Hay muchos links ...
          </Mensaje>
        }
      </ul>
    </nav>
  )
}

const Titulo = ({ children }) => {
  return (<h1>{children}</h1>)
}

const Header = () => {
  const [links, setLinks] = useState([
    { url: '/', texto: 'Home' },
    { url: '/about', texto: 'Nosotros' },
    { url: '/products', texto: 'Productos', private: true },
    { url: '/contact', texto: 'Contacto' },
    { url: '/faq', texto: 'FAQ' }
  ]);

  const handleClick = () => {

    setLinks([...links, {
      url: '#', texto: 'Nuevo',
    }]);

  }

  return (
    <header>
      <Titulo>
        <span>Titulo de mi web!</span>
      </Titulo>
      <Navbar dark={true} links={links} />

    </header>
  )
}
//Render(estados):
// Monto el componente y se ejecuta el render

//cambia el estado
//cambia el contexto(hooks)
//cambian las propiedades

// se destruye

function Mensaje({ show = false, children }) {

  useEffect(() => {
    console.log("Se ejecuta cuando se monta el componente");

    return () => {
      console.log("Se ejecuta cuando se desmonta el componente");
    }
  }, []);

  if (show) {
    return <p>{children}</p>
  }

  return null;
}

function AppMain() {

  return (
    <>
      <Header />
      <h1>App Main</h1>
      <Outlet />
    </>
  )
}
export {
  AppMain,
  Header,
  Navbar
}
export default App;