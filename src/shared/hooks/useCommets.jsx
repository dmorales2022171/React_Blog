import { useState } from "react";
import {postComments } from "../../services/api";
import toast from "react-hot-toast";

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const addComment = async (commentData) => {
      try {
          const response = await postComments(commentData);
          setComments([...comments, response]);
          toast.success("Comentario publicado exitosamente");
      } catch (error) {
          console.error("Error al publicar comentario:", error);
          toast.error("Se produjo un error al publicar el comentario");
      }
  };

  return {
      comments,
      addComment,
  };
};
