import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dayKeyFromTitle, extractImages, buildDays } from './extract.mjs';

test('dayKeyFromTitle parses giscus pathname titles', () => {
  assert.equal(dayKeyFromTitle('/days/day-4.html'), 'day-4');
  assert.equal(dayKeyFromTitle('days/day-12.html'), 'day-12');
  assert.equal(dayKeyFromTitle('/index.html'), null);
  assert.equal(dayKeyFromTitle(''), null);
});

test('extractImages pulls markdown + html image urls on github hosts only', () => {
  const md = [
    '![sunset](https://github.com/user-attachments/assets/abc-123)',
    'text <img alt="dome" src="https://user-images.githubusercontent.com/1/x.png">',
    '[not an image](https://example.com/page)',
    '![offsite](https://example.com/not-github.txt)'
  ].join('\n');
  const imgs = extractImages(md);
  assert.equal(imgs.length, 2);
  assert.deepEqual(imgs[0], { url: 'https://github.com/user-attachments/assets/abc-123', alt: 'sunset' });
  assert.equal(imgs[1].alt, 'dome');
});

test('buildDays maps discussions to day keys with attribution, dedups, sorts', () => {
  const discussions = [
    {
      title: '/days/day-4.html',
      url: 'https://github.com/o/r/discussions/7',
      author: { login: 'leo', avatarUrl: 'https://a/leo.png' },
      createdAt: '2026-07-01T10:00:00Z',
      body: '![cliff](https://github.com/user-attachments/assets/one)',
      comments: { nodes: [
        { body: '![pier](https://github.com/user-attachments/assets/two)',
          url: 'https://github.com/o/r/discussions/7#c1',
          author: { login: 'alrisha', avatarUrl: 'https://a/al.png' },
          createdAt: '2026-07-01T11:00:00Z',
          replies: { nodes: [
            { body: 'dup ![again](https://github.com/user-attachments/assets/one)',
              url: 'https://github.com/o/r/discussions/7#r1',
              author: { login: 'x', avatarUrl: null }, createdAt: '2026-07-01T12:00:00Z' }
          ] } }
      ] }
    },
    { title: 'General chatter', url: 'x', author: null, createdAt: null,
      body: '![x](https://github.com/user-attachments/assets/three)', comments: { nodes: [] } }
  ];
  const days = buildDays(discussions);
  assert.deepEqual(Object.keys(days), ['day-4']);
  assert.equal(days['day-4'].discussionUrl, 'https://github.com/o/r/discussions/7');
  assert.equal(days['day-4'].photos.length, 2);            // dup dropped
  assert.equal(days['day-4'].photos[0].author, 'leo');     // sorted by postedAt
  assert.equal(days['day-4'].photos[1].author, 'alrisha');
});
