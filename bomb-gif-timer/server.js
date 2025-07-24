const express = require('express');
const path = require('path');
const app = express();
const PORT = 4001;

const buildPath = path.join(__dirname, 'bomb-gif-timer', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});