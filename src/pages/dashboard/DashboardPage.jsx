import { useEffect } from "react";
import "./dashboardPage.css";
import {usePublications} from '../../shared/hooks/usePublications'

export const DashboardPage = () => {
  const { publications, getPublications } = usePublications();

  useEffect(() => {
    getPublications();
  }, []); 
  return (
    <div className="container">
    <nav className="main-nav">
      <ul>
        <h1>Mi Blog</h1>
        <li>
          <a href="#">Inicio</a>
        </li>
        <li>
          <a href="#">Acerca de</a>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>
    </nav>
    <section className="main-content">
        <article>
          <h2>Hello world</h2>
          <p>Hola mi nombre es Diego un joven programador el cual el dia de hoy les mostrara a continuacion acerca de mis asignaturas de mi area tecnica</p>
        </article>
        <section className="main-content">
        {publications.map((publications) => (
          <article key={publications.id}>
            <h2>{publications.title}</h2>
            <p>{publications.content}</p>
          </article>
        ))}
      </section>        
    </section>
    <footer>
      <p>dmorales-2022171 &copy; 2024 Mi Blog</p>
    </footer>
  </div>
);
};