import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Modal, Backdrop, Fade } from '@material-ui/core';

function EditRequirement({
  fetchRequirements,
  closeEditRequirementModal,
  requirementID,
  requirement,
}) {
  const [desc, setName] = useState(requirement.desc || '');
  const [desc_a, setNamea] = useState(requirement.desc_a || '');

  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e, categoryID) => {
    e.preventDefault();

    const updatedRequirement = new FormData();

    updatedRequirement.append('desc', desc);
    updatedRequirement.append('desc_a', desc_a);

    try {
      const response = await axios.put(
        `http://127.0.01:8000/requirement/update/${requirementID}`,
        updatedRequirement,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response after update request:', response);
      console.log('Requirement updated successfully');

      await fetchRequirements();
      closeEditRequirementModal();
    } catch (error) {
      console.error('Error updating category data: ', error);
      console.log('Error response:', error.response);
      if (error.response) {
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
      }
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    outline: 'none',
    width: '50%',
  };

  return (
    <Modal
      open={true} // Vous devez spécifier le statut open pour que la modal soit visible
      onClose={closeEditRequirementModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div style={modalStyle}>
          <p className="text-red-700 text-3xl text-center underline my-5">
            EDIT REQUIREMENT
          </p>
          <div className="text-center">
            <form className="py-4" onSubmit={(e) => handleSubmit(e, requirementID)}>
              <div className="flex mb-4">
                <div className="flex-1 h-12">
                  <TextField
                    label="Requirement Name"
                    variant="outlined"
                    fullWidth
                    value={desc}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '15px',marginTop: '15px'}} 
                  />
                </div>
                <div className="flex-1 h-12">
                  <TextField
                    label="Requirement Arabic Name"
                    variant="outlined"
                    fullWidth
                    value={desc_a}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '15px',marginTop: '15px'}} 
                  />
                </div>
              </div>

              {errorMessage !== '' && (
                <p className="text-red-700 text-sm">{errorMessage}</p>
              )}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100"
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default EditRequirement;
