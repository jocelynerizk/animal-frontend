import React from 'react';

const useStyles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '12px',
    width: '2/3',
    margin: '0 auto',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '8px 16px',
    border: '1px solid #FF0000',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#FF0000',
    },
  },
};

function ConfirmationEmail({ closeModal }) {
  const classes = useStyles;

  return (
    <div style={classes.flexContainer}>
      <div style={classes.textCenter}>
        <p style={classes.textCenter}>
          We sent you a confirmation email. Please follow it to verify your email, then you can log in.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', background: '#F0F0F0', padding: '12px' }}>
          <button onClick={closeModal} style={classes.cancelButton}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationEmail;
