import { useState } from 'react';
import './App.css' //esto lo resuelve vite
//componente


const Navbar = ({dark, links}) => {

  // const { dark } = props;
  let className = 'nav-principal';

  if(dark){
    className += ' nav-principal--dark'
  }

  const liLinks = [];

    return (
      <nav>
      <ul className={className}>
        {links.map((element, index) =><li key={index}><a className="nav-principal__item" href={element.url}>{element.texto}</a></li>)}
      </ul>
      </nav>
    )
}

const Titulo = ({children}) => {
  return (<h1>{children}</h1>)
}

const Header = () => {
  const [links, setLinks] = useState([
    {url: '#', texto: 'Home'},
    {url: '#', texto: 'Nosotros'},
    {url: '#', texto: 'Contacto'},
    {url: '#', texto: 'FAQ'}
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
      <p>{links.length}</p>
      <Navbar dark={true} links={links} />
      <button onClick={handleClick}>Agregar</button>
    </header>
  )
}



function App() {

  return (
    <>
    <Header></Header>
    <h1>Hola mundo!</h1>
    </>
  )
}
export {
  App,
  Header,
  Navbar
}
export default App;