/**
 * Generate 4-frame walk cycle sprite strips for NeoCorp leads via Gemini.
 * Each output is a horizontal strip: idle | walk1 | walk2 | walk3
 * at 64x64 per frame = 256x64 total strip.
 *
 * Usage: GEMINI_API_KEY="key" node scripts/generate-walk-sheets.js
 */

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBxl9ggsRuVx3N12X20_ucJOJ2f8A2Jsk0';
const MODEL = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = '/Users/mark/openclaw-office/public/pixel/characters/walks';

const STYLE = `pixel art game sprite sheet, 4 frames in a horizontal strip showing a walk cycle, each frame 64x64 pixels, LimeZu/Stardew Valley chibi style, big head small body, front-facing view, warm pixel shading, transparent background, retro 16-bit, clean pixel edges, game-ready. Frame 1: standing idle. Frame 2: left foot forward. Frame 3: standing. Frame 4: right foot forward. All 4 frames must show the SAME character in consistent style, only the leg position changes.`;

const LEADS = [
  { name: 'cassian', desc: 'male CEO in dark navy blazer, white shirt, red tie, short dark hair, commanding smirk' },
  { name: 'severin', desc: 'male auditor in dark gray button-up, buzz cut, glasses, cold serious expression, dark skin' },
  { name: 'bruce', desc: 'male strategist in blue blazer, short brown hair, analytical focused expression' },
  { name: 'alfred', desc: 'male manager in dark gray suit, short gray hair, glasses, institutional composure' },
  { name: 'marshall', desc: 'male commander in olive military uniform with epaulettes, buzz cut, dark skin, stern' },
  { name: 'elias', desc: 'male product officer in orange polo shirt, curly brown hair, sharp casual look' },
  { name: 'armand', desc: 'male CTO in blue hoodie, short dark hair, dark skin, pragmatic expression' },
  { name: 'werner', desc: 'male infra officer in gray sweater, hair in bun, calm reliable look' },
  { name: 'vera', desc: 'female org architect in purple button-up, long dark hair, glasses, precise expression' },
  { name: 'mira', desc: 'female AR lead in teal sweater, braids, warm friendly smile, fair skin' },
  { name: 'kael', desc: 'male security officer in red hoodie, short black hair, dark skin, intense vigilant gaze' },
  { name: 'soren', desc: 'male design officer in pink polo, long blonde hair, glasses, creative thoughtful look' },
  { name: 'leona', desc: 'female content officer in purple button-up, long dark hair, editorial sharp expression' },
  { name: 'taro', desc: 'male growth officer in orange hoodie, curly black hair, dark skin, energetic wide grin' },
  { name: 'cade', desc: 'male revenue officer in teal blazer, short brown hair, sharp business look' },
  { name: 'sable', desc: 'female ops officer in indigo sweater, braids dark hair, glasses, steady focus' },
  { name: 'linden', desc: 'male CFO in dark button-up, short gray hair, glasses, precise controlled expression' },
  { name: 'lysander', desc: 'male legal officer in dark blazer, short brown hair, composed measured look' },
  { name: 'orion', desc: 'male intelligence officer in blue hoodie, short dark hair, glasses, analytical deep gaze, dark skin' },
  { name: 'kira', desc: 'female PM in lime green t-shirt, black bob cut, energetic dynamic pose, warm skin' },
];

async function generateImage(prompt, outputPath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: `Generate an image of: ${prompt}` }] }],
    generationConfig: { responseMimeType: 'application/json' },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imgPart) {
    throw new Error('No image in response');
  }

  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buf);
  return buf.length;
}

async function main() {
  console.log(`Generating walk cycle strips for ${LEADS.length} leads...\n`);

  for (let i = 0; i < LEADS.length; i++) {
    const lead = LEADS[i];
    const outPath = path.join(OUTPUT_DIR, `${lead.name}.png`);

    if (fs.existsSync(outPath)) {
      console.log(`[${i + 1}/${LEADS.length}] ${lead.name} — already exists, skipping`);
      continue;
    }

    const prompt = `${STYLE} Character: ${lead.desc}`;
    console.log(`[${i + 1}/${LEADS.length}] ${lead.name}...`);

    try {
      const size = await generateImage(prompt, outPath);
      console.log(`  ✓ ${(size / 1024).toFixed(0)}KB`);
    } catch (err) {
      console.log(`  ✗ ${err.message}`);
      if (err.message.includes('429')) {
        console.log('  Rate limited, waiting 60s...');
        await new Promise(r => setTimeout(r, 60000));
        i--; // retry
        continue;
      }
    }

    // Rate limit: ~2s between requests
    if (i < LEADS.length - 1) {
      await new Promise(r => setTimeout(r, 2500));
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
