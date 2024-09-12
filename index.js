// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://project-get-control.web.app/' // อนุญาตการร้องขอจาก Firebase Hosting
}));

app.post('/api/register', async (req, res) => {
  const { registrationData } = req.body;

  try {
    // ส่ง POST request ไปยัง API ของบุคคลที่สาม
    const response = await axios.post('https://v3apptst1.owsth.com/api/v1.0/api_kiosk_json/app_api', registrationData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // ส่งการตอบกลับกลับไปยัง Firebase Hosting
    res.json({
      message: 'Registration successful',
      data: response.data
    });
  } catch (error) {
    console.error('Error registering:', error.message);
    res.status(500).json({ error: 'Failed to register' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
