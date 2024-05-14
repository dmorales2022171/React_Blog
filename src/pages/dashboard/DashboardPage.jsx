import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import { usePublications } from "../../shared/hooks/usePublications";
import { useComments } from "../../shared/hooks/useCommets";
import { useCommentsDetails } from "../../shared/hooks/useCommentsDetails";
import toast from "react-hot-toast";

const PublicationModal = ({ publication, onClose, onAddComment, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddComment = async () => {
    try {
      await onAddComment(author, publication._id, newComment);
      toast.success("Comentario publicado exitosamente");
      setNewComment("");
      setAuthor("");
    } catch (error) {
      console.error("Error al publicar comentario:", error);
      toast.error("Se produjo un error al publicar el comentario");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{publication.title}</h2>
        <p>{publication.content}</p>
        <div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario..."
          />
          <button className="button-85" onClick={handleAddComment}>
            Agregar comentario
          </button>
        </div>
        <div>
          <h3>Comentarios:</h3>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <strong>Autor:</strong> {comment.author}
              </p>
              <p>
                <strong>Descripción:</strong> {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const { publications, getPublications } = usePublications();
  const { comments, getCommentsByPublication } = useCommentsDetails();
  const { addComment } = useComments();
  useEffect(() => {
    getPublications();
  }, []);

  const [selectedPublication, setSelectedPublication] = useState(null);

  const handleAddComment = async (author, publicationId, content) => {
    await addComment({ author, publicationId, content });
    getCommentsByPublication(publicationId);
  };

  const handleViewMore = async (publication) => {
    setSelectedPublication(publication);
    await getCommentsByPublication(publication._id);
  };

  const handleCloseModal = () => {
    setSelectedPublication(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Mi Blog</h1>
      </header>
      <section className="main-content">
        <article>
          <h2>Hello world</h2>
          <p>
            ¡Hola a todos! Soy Diego, un joven apasionado por la programación y
            la tecnología. Hoy, estoy emocionado de compartir con ustedes un
            vistazo a las asignaturas que estoy explorando en mi área técnica.
            Para mí, la programación no es solo una carrera, sino una forma de
            vida en la que cada línea de código es una oportunidad para crear,
            innovar y resolver problemas. En este viaje de aprendizaje, he
            estado inmerso en una variedad de asignaturas que abarcan desde los
            fundamentos esenciales hasta los conceptos más avanzados de la
            informática. Desde que comencé este viaje, he descubierto que cada
            asignatura es como un pilar que sustenta mi crecimiento y desarrollo
            como programador.
          </p>
        </article>
        <section className="main-content">
          {publications.map((publication) => (
            <article key={publication.id}>
              <h2>{publication.title}</h2>
              <p>{publication.description}</p>
              <p>
                Este curso pretende implementar proyectos y
                actividades que enfoquen al alumno a un ambiente práctico de la
                programación. En este curso el estudiante tendrá la capacidad de
                desarrollar aplicaciones con tecnologia Web y móvil, mediante
                los conocimientos tanto teóricos como prácticos de Node.js,
                ReactJs, Railway y utilizando el lenguaje de programación
                JavaScript, esto implica que el estudiante tendrá la capacidad
                de poder instalar y configurar un Web Api, una página web,
                conjunto a la capacidad de conectar sus aplicaciones a bases de
                datos NoSQL y conexión en la nube.
              </p>
              <button
                className="button-85"
                onClick={() => handleViewMore(publication)}
              >
                Ver más
              </button>
            </article>
          ))}
        </section>
      </section>
      <footer>
        <p>dmorales-2022171 &copy; 2024 Mi Blog</p>
      </footer>

      {/* Modal para mostrar la publicación completa */}
      {selectedPublication && (
        <PublicationModal
          publication={selectedPublication}
          onClose={handleCloseModal}
          onAddComment={handleAddComment}
          comments={comments}
        />
      )}
    </div>
  );
};
