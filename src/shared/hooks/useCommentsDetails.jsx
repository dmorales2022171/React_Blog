import { useState } from "react";
import { getCommentByPublication } from "../../services/api";
import toast from "react-hot-toast";

export const useCommentsDetails = () =>  {
    const [comments, setComments] = useState([]);

    const getCommentsByPublication = async (publicationId) => {
        try {
          const response = await getCommentByPublication(publicationId);
          setComments(response.data.comments);
        } catch (error) {
          console.error("Error al obtener comentarios:", error);
          toast.error("Se produjo un error al obtener los comentarios");
        }
      };

    return {
        comments,
        getCommentsByPublication
    };
};
