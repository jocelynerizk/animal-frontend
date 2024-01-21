import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Grid, Modal, Backdrop, Fade } from '@mui/material';

function AddRequirement({ fetchrequirements, closeAddrequirementModal }) {
    const [desc, setName] = useState('');
    const [desc_a, setNamea] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        closeAddrequirementModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (desc.trim() === '' || desc_a.trim() === '') {
            setErrorMessage('Fill in both names for the new Requirement');
            return;
        }

        const newRequirement = new FormData();
        newRequirement.append('desc', desc);
        newRequirement.append('desc_a', desc_a);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/Requiremen/add`, newRequirement, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Requirement added:', response.data);
            fetchrequirements();
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
                        ADD REQUIREMENT
                    </Typography>
                    <Grid container justifyContent="center">
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <TextField
                                    label="REQUIREMENT Name"
                                    variant="outlined"
                                    fullWidth
                                    value={desc}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        marginBottom: '15px',
                                    }}

                                />
                                <TextField
                                    label="REQUIREMENT Arabic Name"
                                    variant="outlined"
                                    fullWidth
                                    value={desc_a}
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

export default AddRequirement;
