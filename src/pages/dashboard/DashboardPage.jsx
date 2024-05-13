import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import { usePublications } from "../../shared/hooks/usePublications";
import { useComments } from "../../shared/hooks/useCommets";
import { useCommentsDetails } from "../../shared/hooks/useCommentsDetails";
import toast from "react-hot-toast";

// Nuevo componente para mostrar el contenido completo de la publicación
const PublicationModal = ({ publication, onClose, onAddComment, comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    try {
      await onAddComment(publication._id, newComment);
      toast.success("Comentario publicado exitosamente");
      setNewComment("");
    } catch (error) {
      console.error("Error al publicar comentario:", error);
      toast.error("Se produjo un error al publicar el comentario");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{publication.title}</h2>
        <p>{publication.content}</p>
        <div>
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
          {comments
            //.filter((comment) => comment.publication === publication._id)
            .map((comment) => (
              <div key={comment._id}>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const { publications, getPublications } = usePublications();
  const { comments, getComments } = useCommentsDetails();
  const { addComment } = useComments();
  useEffect(() => {
    getPublications();
    getComments();
  }, []);

  const [selectedPublication, setSelectedPublication] = useState(null);

  const handleAddComment = async (publicationId, content) => {
    await addComment({ publicationId, content });
  };

  const handleViewMore = (publication) => {
    setSelectedPublication(publication);
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
            Hola mi nombre es Diego un joven programador el cual el día de hoy
            les mostrará a continuación acerca de mis asignaturas de mi área
            técnica
          </p>
        </article>
        <section className="main-content">
          {publications.map((publication) => (
            <article key={publication.id}>
              <h2>{publication.title}</h2>
              <p>{publication.description}</p>
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
