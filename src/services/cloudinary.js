export default function cloudinaryUpload(setFile) {
  window.cloudinary.openUploadWidget(
    {
      cloud_name: 'vendme',
      upload_preset: 'jdm3qonc',
      tags: ['profile_pic']
    },
    function(error, result) {
      if (result) setFile(result[0].secure_url)
    }
  )
}
