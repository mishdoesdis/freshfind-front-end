const express = require('express');
const cors = require('cors');
const stores = require('./data/stores.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/stores', (req, res) => {
  res.json(stores);
});

app.get('/api/stores/nearby', (req, res) => {
  const { lat, lng, radiusKm } = req.query;
  if (!lat || !lng) return res.json(stores);
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const r = radiusKm ? parseFloat(radiusKm) : 5;
  function haversine(aLat,aLng,bLat,bLng){
    const toRad = x=> x*Math.PI/180;
    const R = 6371;
    const dLat = toRad(bLat-aLat);
    const dLon = toRad(bLng-aLng);
    const A = Math.sin(dLat/2)**2 + Math.cos(toRad(aLat))*Math.cos(toRad(bLat))*Math.sin(dLon/2)**2;
    const C = 2*Math.atan2(Math.sqrt(A), Math.sqrt(1-A));
    return R*C;
  }
  const result = stores.filter(s => {
    const d = haversine(userLat,userLng,s.lat,s.lng);
    return d <= r;
  });
  res.json(result);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`FreshFind backend listening on ${PORT}`));