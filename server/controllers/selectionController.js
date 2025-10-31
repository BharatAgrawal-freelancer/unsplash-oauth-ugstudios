import SelectedImage from "../models/SelectedImage.js"

export const saveSelection = async (req, res) => {
  try {
    const { images } = req.body

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "Images array is required" })
    }

    const savedImages = await Promise.all(
      images.map((img) =>
        SelectedImage.findOneAndUpdate(
          { userId: req.user._id, imageId: img.id },
          {
            userId: req.user._id,
            imageId: img.id,
            imageUrl: img.url,
            description: img.description || "",
          },
          { upsert: true, new: true },
        ),
      ),
    )

    res.json({ message: "Images saved", count: savedImages.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getSelectedImages = async (req, res) => {
  try {
    const selected = await SelectedImage.find({ userId: req.user._id }).sort({
      createdAt: -1,
    })

    res.json(selected)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteSelection = async (req, res) => {
  try {
    const { imageId } = req.params

    await SelectedImage.deleteOne({
      userId: req.user._id,
      imageId,
    })

    res.json({ message: "Image removed from selection" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { saveSelection, getSelectedImages, deleteSelection }
