import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../components/moduleToolbar';

const CreatePost2 = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    const handleImageUpload = (acceptedFiles) => {
        const file = acceptedFiles[0]; // Prendre le premier fichier accepté

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:3000/api/posts/addPost', {
            title,
            content,
            image,
            // other data to send
          });
    
          // Handle success, show a toast or redirect
          console.log('Response:', response.data);
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      };

  return (
    <>
    <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
        <Typography variant='h5' sx={{ pb: 4 }}> Create post  </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField sx={{ mb: 3 }}
                fullWidth
                id="title"
                label=" titre du Post"
                name='title'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="titre du post"
                value={title}
                onChange={handleChange}
                // onBlur={handleBlur}
            />


            <Box sx={{ mb: 3 }}>
                <ReactQuill
                    theme="snow"
                    placeholder={'Write the post content...'}
                    // modules={modules}
                    value={content}
                    onChange={handleContentChange}
                />
                {/* <Box component='span' sx={{ color: '#d32f2f', fontSize: "12px", pl: 2 }}>{touched.content && errors.content}</Box> */}
            </Box>

            <Box border='2px dashed blue' sx={{ p: 1 }}>
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={handleImageUpload}
                >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                    <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" }, bgcolor: isDragActive ? "#cceffc" : "#fafafa" }}
                    >
                        <input name="banner" {...getInputProps()} />
                        {isDragActive ? (
                        <>
                            <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                            <p style={{ textAlign: "center", fontSize: "12px" }}>Drop here!</p>
                        </>
                        ) : (
                        image === null ? (
                            <>
                            <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                            <p style={{ textAlign: "center", fontSize: "12px" }}>Drag and Drop here or click to choose</p>
                            </>
                        ) : (
                            <>
                            <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                                <Box ><img style={{ maxWidth: "100px" }} src={image} alt="" /></Box>
                            </Box>
                            </>
                        )
                        )}
                    </Box>
                    )}
                </Dropzone>
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                elevation={0}
                sx={{ mt: 3, p: 1, mb: 2, borderRadius: '25px' }}
                onClick={handleSubmit}
            >
                Create post
            </Button>
        </Box>
    </Box>
    </>
  )
}

export default CreatePost2
