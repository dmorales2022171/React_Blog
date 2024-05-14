import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/opinionApi/v1/',
    timeout: 5000
})


export const getPublications = async () => {
    try{
        return await apiClient.get('/publications')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

export const postComments = async (data) => {
    try{
        return await apiClient.post('/comments', data);
    }catch(e){
        console.log(data);
        return{
            error: true,
            e
            
        }
    }

}

export const getComments = async () => {
    try{
        return await apiClient.get('/comments')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

export const getCommentByPublication = async(publicationId) => {
    try{
        return await apiClient.get(`/comments/publication/${publicationId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}