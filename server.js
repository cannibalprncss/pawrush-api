const express = require('express');
const app = express();
let data = { leaderboard: [], reviews: [] };

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', (req, res) => res.json(data));

app.post('/', (req, res) => {
  const { name, score, review } = req.body;
  if (review) {
    data.reviews.unshift({ name: name || 'anon~', text: review, ts: Date.now() });
    data.reviews = data.reviews.slice(0, 30);
  }
  data.leaderboard.push({ name, score });
  data.leaderboard.sort((a,b) => b.score - a.score);
  data.leaderboard = data.leaderboard.slice(0, 10);
  res.json({ ok: true });
});

app.listen(3000);
