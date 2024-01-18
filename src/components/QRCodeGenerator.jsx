import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    // Create a data URI for the QR code image
    const qrCodeDataUrl = document.getElementById('qrcode').toDataURL('image/png');

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Typography variant="h5">QR Code Generator</Typography>
      <TextField
        label="Text"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
        style={{ margin: '10px 0' }}
      />
      {text && (
        <div>
          <QRCode id="qrcode" value={text} size={200} />
          <Button variant="contained" color="primary" onClick={handleDownload} style={{ marginTop: '10px' }}>
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
