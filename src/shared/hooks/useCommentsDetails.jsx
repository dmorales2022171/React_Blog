import { useState } from "react";
import { getComments as getCommentsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useCommentsDetails = () =>  {
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        const commentsData = await getCommentsRequest();
        
        if(commentsData.error){
            return toast.error(
                commentsData.error,
                commentsData.e?.response?.data || "An error occurred while reading comments."

            )
        }

        setComments(commentsData.data.comments)
        return commentsData.data;
    }

    return{
        comments,
        getComments,
        allComments: comments?.comments
    }
}