const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const stories = [
  { id: 1, name: 'أحمد', avatar: 'أ', accent: 'linear-gradient(135deg, #ff7a18, #ff3d81, #7c3aed)' },
  { id: 2, name: 'سارة', avatar: 'س', accent: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  { id: 3, name: 'يوسف', avatar: 'ي', accent: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { id: 4, name: 'ليلى', avatar: 'ل', accent: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { id: 5, name: 'محمد', avatar: 'م', accent: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }
];

const reels = [
  {
    id: 1,
    user: 'أحمد',
    handle: '@ahmed',
    time: 'الآن',
    title: 'رحلة يومية تبدأ بتمرين 10 دقائق',
    description: 'مستوى الطاقة يرتفع عندما تبدأ يومك بحركة بسيطة.',
    likes: 12400,
    comments: 482,
    shares: 96,
    accent: 'linear-gradient(135deg, #1d4ed8, #7c3aed 42%, #0f172a 100%)'
  },
  {
    id: 2,
    user: 'سارة',
    handle: '@sara',
    time: 'منذ 3 دقائق',
    title: 'صنع خطة أفضل في 5 دقائق فقط',
    description: 'ابدأ بمهامك الأساسية ثم أضف وقتًا ممتعًا لاحقًا.',
    likes: 8800,
    comments: 241,
    shares: 44,
    accent: 'linear-gradient(135deg, #0f766e, #1d4ed8 45%, #111827 100%)'
  }
];

const live = {
  label: 'مباشر الآن',
  viewers: 12840,
  rooms: 7,
  active: true
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'server ready' });
});

app.get('/api/feed', (req, res) => {
  res.json({ stories, reels, live });
});

app.post('/api/reels/:id/react', (req, res) => {
  const { type } = req.body || {};
  const reelId = Number(req.params.id);
  const reel = reels.find(item => item.id === reelId);

  if (!reel) {
    return res.status(404).json({ error: 'reel not found' });
  }

  if (!['likes', 'comments', 'shares'].includes(type)) {
    return res.status(400).json({ error: 'invalid reaction type' });
  }

  reel[type] += 1;
  res.json({ success: true, reel });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Social app running at http://localhost:${PORT}`);
});
