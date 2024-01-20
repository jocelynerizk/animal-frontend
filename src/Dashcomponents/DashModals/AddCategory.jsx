import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Grid, Modal, Backdrop, Fade } from '@mui/material';

function AddCategory({ fetchCategories, closeAddCategoryModal }) {
    const [name, setName] = useState('');
    const [namea, setNamea] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        closeAddCategoryModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || namea.trim() === '') {
            setErrorMessage('Fill in both names for the new category');
            return;
        }

        const newCategory = new FormData();
        newCategory.append('name', name);
        newCategory.append('namea', namea);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/category/add`, newCategory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Category added:', response.data);
            fetchCategories();
            handleClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        outline: 'none',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h5" align="center" color="primary" gutterBottom>
                        ADD CATEGORY
                    </Typography>
                    <Grid container justifyContent="center">
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <TextField
                                    label="Category Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        marginBottom: '15px',
                                    }}

                                />
                                <TextField
                                    label="Category Arabic Name"
                                    variant="outlined"
                                    fullWidth
                                    value={namea}
                                    onChange={(e) => setNamea(e.target.value)}
                                    style={{
                                        marginBottom: '15px',
                                    }}
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                />
                            </div>
                            {errorMessage !== '' && (
                                <Typography variant="body2" color="error" gutterBottom>
                                    {errorMessage}
                                </Typography>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClose}
                                    style={{ marginRight: '8px', color: 'blue' }}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    style={{ color: 'blue' }}
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    );
}

export default AddCategory;
