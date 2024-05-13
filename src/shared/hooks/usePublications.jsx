import { useState } from "react"
import { getPublications as getPublicationsRequest } from "../../services/api"
import toast from "react-hot-toast"

export const usePublications = () => {
  const [publications, setPublications] = useState([])

  const getPublications = async () => {
      const publicationsData = await getPublicationsRequest();
      
      if (publicationsData.error) {
          return toast.error(
              publicationsData.error,
              publicationsData.e?.response?.data || 'Error ocurred when reading publications'
          )
      }
      setPublications(publicationsData.data.publications)
      return publicationsData.data;
  }
  return {
      publications,
      getPublications,
      allPublications: publications?.publications,
  }
}
