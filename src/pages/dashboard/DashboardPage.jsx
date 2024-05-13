import { useEffect, useState } from "react";
import "./dashboardPage.css";
import { usePublications } from "../../shared/hooks/usePublications";
import { useComments } from "../../shared/hooks/useCommets";

export const DashboardPage = () => {
  const { publications, getPublications } = usePublications();
  const { addComment } = useComments();

  useEffect(() => {
    getPublications();
  }, []);

  const [newComment, setNewComment] = useState(""); // State for the new comment text

  const handleAddComment = (publicationId) => {
    // Assuming you have comment data ready, you can pass it to the addComment function
    const commentData = {
      publicationId: publicationId,
      content: newComment, // Pass the new comment content
      // Add other comment data here
    };
    addComment(commentData);
    // Clear the input field after adding comment
    setNewComment("");
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
                onClick={() => handleAddComment(publication.id)}
              >
                Agregar comentario
              </button>
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
