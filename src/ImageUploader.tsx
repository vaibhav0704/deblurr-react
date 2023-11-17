// Import the libraries
import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";

interface Props {}

const ImageUploader: React.FC<Props> = () => {
  const [image, setImage] = useState(null);
  const [imagesToDisplay, setImagesToDisplay] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("cdf"); // Initializing the dropdown value to 'cdf'

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = async () => {
    if (image) {
      const form = new FormData();
      form.append("image", image);

      try {
        let url = '';
        if (selectedOption === "cdf") {
          url = 'https://0ab1-2409-40d1-f-6db3-e51a-eb78-f4b7-d068.ngrok.io/cdf';
        } else if (selectedOption === "clahe") {
          url = 'https://0ab1-2409-40d1-f-6db3-e51a-eb78-f4b7-d068.ngrok.io/clahe';
        }

        const response = await axios.post(url, form, {
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

      {/* Dropdown for selecting the operation */}
      <label htmlFor="operation">Select Operation:</label>
      <select id="operation" value={selectedOption} onChange={handleOptionChange}>
        <option value="cdf">CDF</option>
        <option value="clahe">CLAHE</option>
      </select>

      <button onClick={handleUpload}>Upload</button>

      {imagesToDisplay && <img src={imagesToDisplay} alt="Enhanced Image" />}
    </div>
  );
};

export default ImageUploader;


    // const handleUpload = async () => {
    //   if (image) {
    //     const form = new FormData();
    //     form.append("image", image);
    //     try {
    //       const response = await axios.post('https://b2f9-2409-40d1-102d-de49-6f3a-9900-1e88-9407.ngrok.io/enhance', form, {
    //         responseType: 'arraybuffer',
    //       });
  
          // const base64Image = btoa(
          //   new Uint8Array(response.data).reduce(
          //     (data, byte) => data + String.fromCharCode(byte),
          //     ''
          //   )
          // );
          // const dataURL = `data:image/png;base64,${base64Image}`;
  
          // setImagesToDisplay(dataURL);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   } else {
    //     alert("Please select an image file");
    //   }
    // };