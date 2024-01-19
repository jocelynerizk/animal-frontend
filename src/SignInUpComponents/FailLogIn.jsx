import React from "react";
import { Typography, Button, Container } from "@material-ui/core";

function FailLogIn({ closeModal, message }) {
  return (
    <Container maxWidth="sm" className="flex items-center justify-center">
      <div className="text-center">
        <Typography variant="h5" className="m-4">
          {message}
        </Typography>
        <div className="flex justify-end bg-gray-100 p-4 items-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={closeModal}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default FailLogIn;
