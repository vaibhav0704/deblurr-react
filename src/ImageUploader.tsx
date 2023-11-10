// Import the libraries
import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";

interface Props {}

const ImageUploader: React.FC<Props> = () => {
  const [image, setImage] = useState(null);
  const [imagesToDisplay, setImagesToDisplay] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      const form = new FormData();
      form.append("image", image);
      try {
        const response = await axios.post('https://b2f9-2409-40d1-102d-de49-6f3a-9900-1e88-9407.ngrok.io', form, {
          responseType: 'arraybuffer',
        });

        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const dataURL = `data:image/png;base64,${base64Image}`;

        setImagesToDisplay(dataURL);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please select an image file");
    }
  };

  return (
    <div>
      <h1>Upload Your Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imagesToDisplay && <img src={imagesToDisplay} alt="Enhanced Image" />}
    </div>
  );
};

export default ImageUploader;
