// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';
import cors from 'cors';

const app = express();
const port = 3001;

let corsOptions = { 
  origin : ['https://qrcode-two-lilac.vercel.app/'], 
} 
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/api/generate-qr-code', async (req, res) => {
  const { url } = req.body;

  try {
    const qrCode = await QRCode.toDataURL(url);
    res.send({ qrCode });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate QR code' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
