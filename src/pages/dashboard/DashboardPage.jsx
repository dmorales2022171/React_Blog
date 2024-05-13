import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import { usePublications } from "../../shared/hooks/usePublications";
import { useComments } from "../../shared/hooks/useCommets";
import { useCommentsDetails } from "../../shared/hooks/useCommentsDetails";
import toast from "react-hot-toast";

export const DashboardPage = () => {
  const { publications, getPublications } = usePublications();
  const { comments, getComments } = useCommentsDetails();
  const { addComment } = useComments();
  useEffect(() => {
    getPublications();
    getComments();
  }, []);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = async (publicationId) => {
    try {
      const commentData = {
        publicationId: publicationId,
        content: newComment,
      };
      await addComment(commentData);
      toast.success("Comentario publicado exitosamente");
      setNewComment("");
    } catch (error) {
      console.error("Error al publicar comentario:", error);
      toast.error("Se produjo un error al publicar el comentario");
    }
  };

  return (
    <div className="container">
      <h1>Mi Blog</h1>
      <section className="main-content">
        <article>
          <h2>Hello world</h2>
          <p>
            Hola mi nombre es Diego un joven programador el cual el dia de hoy
            les mostrara a continuacion acerca de mis asignaturas de mi area
            tecnica
          </p>
        </article>
        <section className="main-content">
          {publications.map((publication) => (
            <article key={publication.id}>
              <h2>{publication.title}</h2>
              <p>{publication.content}</p>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
              />
              <button
                className="button-85"
                onClick={() => handleAddComment(publication._id)}
              >
                Agregar comentario
              </button>
              <div>
                <h3>Comentarios:</h3>
                {comments
                 // .filter((comment) => comment.publication.toString() === publication._id.toString())
                  .map((comment) => (
                    <div key={comment._id}>
                      <p>{comment.content}</p>
                    </div>
                  ))}
              </div>            
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
