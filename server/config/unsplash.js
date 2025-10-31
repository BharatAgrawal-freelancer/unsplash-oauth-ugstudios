import axios from "axios"

const unsplashClient = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
})

export const searchPhotos = async (term, page = 1, perPage = 20) => {
  try {
    const response = await unsplashClient.get("/search/photos", {
      params: {
        query: term,
        page,
        per_page: perPage,
        order_by: "relevant",
      },
    })

    return {
      total: response.data.total,
      totalPages: response.data.total_pages,
      results: response.data.results.map((photo) => ({
        id: photo.id,
        alt: photo.alt_description || "Image",
        urls: {
          thumb: photo.urls.thumb,
          small: photo.urls.small,
          regular: photo.urls.regular,
        },
        author: {
          name: photo.user.name,
          username: photo.user.username,
        },
        likes: photo.likes,
        links: {
          html: photo.links.html,
          download: photo.links.download,
        },
      })),
    }
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.")
    }
    throw error
  }
}

export default unsplashClient
