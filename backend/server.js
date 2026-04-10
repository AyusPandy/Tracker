import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, 'db.json');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

let data = {
  pageViews: {},
  timeSpent: {},
  navigationFlow: {},
  entrySources: {},
  contacts: []
};

if (fs.existsSync(dbFile)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    if (Array.isArray(parsed.pageViews)) {
      parsed.pageViews.forEach(view => {
        data.pageViews[view.path] = (data.pageViews[view.path] || 0) + 1;
      });
    } else {
      data.pageViews = parsed.pageViews || {};
    }
    
    if (Array.isArray(parsed.navigationFlow)) {
      parsed.navigationFlow.forEach(nav => {
        const key = `${nav.from} -> ${nav.to}`;
        data.navigationFlow[key] = (data.navigationFlow[key] || 0) + 1;
      });
    } else {
      data.navigationFlow = parsed.navigationFlow || {};
    }
    
    data.timeSpent = parsed.timeSpent || {};
    data.entrySources = parsed.entrySources || {};
    data.contacts = parsed.contacts || [];
  } catch (e) {}
}

const saveData = () => {
  fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
    if (err) console.error('Failed to save data:', err);
  });
};

let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('activeUsers', activeUsers);
  
  socket.on('disconnect', () => {
    activeUsers--;
    io.emit('activeUsers', activeUsers);
  });
});

app.post('/api/track', (req, res) => {
  const { type, payload } = req.body;
  if (!type || !payload) return res.sendStatus(400);

  if (type === 'page_view') {
    data.pageViews[payload.path] = (data.pageViews[payload.path] || 0) + 1;
    if (payload.referrer !== undefined) {
      const source = payload.referrer || 'direct';
      data.entrySources[source] = (data.entrySources[source] || 0) + 1;
    }
  } else if (type === 'time_spent') {
    const { path, time } = payload;
    data.timeSpent[path] = (data.timeSpent[path] || 0) + time;
  } else if (type === 'navigation') {
    const key = `${payload.from} -> ${payload.to}`;
    data.navigationFlow[key] = (data.navigationFlow[key] || 0) + 1;
  }
  
  saveData();
  res.sendStatus(200);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.sendStatus(400);
  data.contacts.push({ name, email, message, date: new Date().toISOString() });
  saveData();
  res.sendStatus(200);
});

app.get('/api/contacts', (req, res) => {
  res.json(data.contacts || []);
});

app.get('/api/analytics', (req, res) => {
  res.json({
    timeSpent: data.timeSpent,
    navigationFlow: data.navigationFlow,
    mostVisitedPages: data.pageViews,
    entrySources: data.entrySources
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
