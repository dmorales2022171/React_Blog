import { useState } from "react";
import {postComments } from "../../services/api";
import toast from "react-hot-toast";

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const addComment = async (commentData) => {
      try {
          const response = await postComments(commentData);
          setComments([...comments, response]);
          toast.success("Comment posted successfully");
      } catch (error) {
          console.error("Error posting comment:", error);
          toast.error("Error occurred when posting comment");
      }
  };

  return {
      comments,
      addComment,
  };
};
