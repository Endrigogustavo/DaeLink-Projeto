import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../Database/Firebase'
import { ref, uploadBytes } from 'firebase/storage'

const Register = () => {
    const [img, setImg] = useState('');

    const handleUpload = async () => {
        if (img) {
            const imgRef = ref(storage, `arquivos/${img.name}`);
            try {
                await uploadBytes(imgRef, img);
                alert("Image uploaded successfully!");
            } catch (error) {
                console.error("Error uploading image: ", error);
                alert("Failed to upload image");
            }
        } else {
            alert("No image selected");
        }
    };
   

  return (
<div>
<input type="file" onChange={(e) => setImg(e.target.files[0])} />
<button onClick={handleUpload}>Upload Image and User Data</button>
    
</div>
  );
};

export default Register;
