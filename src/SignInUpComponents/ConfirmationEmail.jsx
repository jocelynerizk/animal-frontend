import React from "react";
import { Typography, Button, Container } from "@material-ui/core";

function ConfirmationEmail({ closeModal }) {
  return (
    <Container maxWidth="sm" className="flex items-center justify-center">
      <div className="text-center">
        <Typography variant="h5" className="m-4">
          We sent you a confirmation email.
        </Typography>
        <Typography variant="body1" className="mb-8">
          Please follow it to verify your email, then you can log in.
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

export default ConfirmationEmail;
