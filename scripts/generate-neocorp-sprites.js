/**
 * NeoCorp Lead Sprite Generator
 *
 * Generates 128x128 pixel art character portraits for 20 NeoCorp leads
 * using Gemini 3 Pro Image (Nano Banana Pro).
 *
 * Style: LimeZu / Stardew Valley, chibi proportions, warm shading
 *
 * Usage:
 *   GEMINI_API_KEY="your-key" node scripts/generate-neocorp-sprites.js
 */

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBxl9ggsRuVx3N12X20_ucJOJ2f8A2Jsk0';
const MODEL = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = '/Users/mark/openclaw-office/public/pixel/characters/generated';

// Base style prompt prefix
const STYLE_PREFIX = 'Pixel art character sprite, LimeZu RPG Maker style, 128x128 pixels, chibi proportions with big head and small body, front-facing view, warm pixel shading, clean transparent background, single character centered on canvas, retro 16-bit aesthetic, crisp pixel edges, NO anti-aliasing, game-ready sprite';

// NeoCorp Lead definitions
const LEADS = [
  {
    name: 'cassian',
    description: 'male CEO executive, dark navy blazer over white shirt, short slicked-back dark hair, strong jawline, commanding confident posture, steel gray eyes, slight smirk'
  },
  {
    name: 'severin',
    description: 'male auditor, crisp white button-up shirt with rolled sleeves, military buzz cut hair, thin rectangular glasses, cold calculating expression, pale skin, arms crossed'
  },
  {
    name: 'bruce',
    description: 'male strategist, royal blue blazer over light blue shirt, neat medium brown hair parted to the side, analytical sharp gaze, clean-shaven, standing straight'
  },
  {
    name: 'alfred',
    description: 'older male manager, gray hair combed back, round gold-rimmed glasses, charcoal vest over white dress shirt, institutional dignified look, gentle but firm expression'
  },
  {
    name: 'marshall',
    description: 'male military commander, olive green button-up shirt with epaulettes, precision buzz cut, dark brown skin, broad shoulders, stern disciplined expression, standing at attention'
  },
  {
    name: 'elias',
    description: 'male product lead, curly medium brown hair slightly messy, bright orange polo shirt, casual but sharp appearance, hazel eyes, friendly enthusiastic smile, relaxed posture'
  },
  {
    name: 'armand',
    description: 'male engineer, blue tech hoodie with subtle circuit pattern, short dark hair with fade, dark brown skin, focused intelligent expression, slight confident smile'
  },
  {
    name: 'werner',
    description: 'male infrastructure lead, heather gray cable-knit sweater, light brown hair pulled back in a small bun, stubble beard, calm methodical expression, thoughtful gaze'
  },
  {
    name: 'vera',
    description: 'female org architect, long straight dark hair past shoulders, purple button-up blouse, slim dark-framed glasses, serious analytical expression, olive skin, poised stance'
  },
  {
    name: 'mira',
    description: 'female AR specialist, long dark braids with colorful beads, teal knit sweater, warm genuine smile, brown skin, bright expressive eyes, welcoming open posture'
  },
  {
    name: 'kael',
    description: 'male security lead, deep red hoodie with hood down, short black hair, dark brown skin, intense piercing gaze, strong build, vigilant alert stance, slight frown'
  },
  {
    name: 'soren',
    description: 'male design lead, long flowing blonde hair past shoulders, pastel pink polo shirt, round tortoiseshell glasses, creative dreamy expression, fair skin, artistic vibe'
  },
  {
    name: 'leona',
    description: 'female content director, long wavy dark hair, deep purple button-up with rolled sleeves, editorial sharp look, red lipstick, confident knowing smile, elegant posture'
  },
  {
    name: 'taro',
    description: 'male growth hacker, voluminous curly black hair, bright orange hoodie, wide energetic grin, tan skin, dynamic excited posture, hands slightly raised'
  },
  {
    name: 'cade',
    description: 'male revenue lead, short neat brown hair, teal fitted blazer over black turtleneck, sharp focused expression, light stubble, business-sharp appearance'
  },
  {
    name: 'sable',
    description: 'female operations lead, dark hair in neat braids pinned up, indigo wool sweater, rectangular dark glasses, calm composed expression, dark skin, organized efficient look'
  },
  {
    name: 'linden',
    description: 'male finance director, short silver-gray hair neatly trimmed, dark charcoal button-up shirt, thin wire-frame glasses, precise meticulous expression, pale skin, upright posture'
  },
  {
    name: 'lysander',
    description: 'male legal counsel, short wavy brown hair, dark navy blazer over gray shirt, composed neutral expression, clean-shaven, measured dignified stance, steady gaze'
  },
  {
    name: 'orion',
    description: 'male intelligence analyst, short dark hair with slight wave, slate blue hoodie, round dark-framed glasses, analytical curious expression, slight head tilt, thoughtful'
  },
  {
    name: 'kira',
    description: 'female PM lead, sharp black bob cut hair, lime green t-shirt with subtle logo, energetic bright expression, light skin, dynamic confident stance, ready for action'
  }
];

/**
 * Generate a single character sprite
 */
async function generateSprite(lead) {
  const prompt = `${STYLE_PREFIX}. Character: ${lead.description}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `Generate an image of: ${prompt}` }]
      }
    ]
  };

  const startTime = Date.now();

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `HTTP ${response.status}`);
  }

  const duration = Date.now() - startTime;

  // Extract image from response
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData);

  if (!imagePart) {
    // Check if there's a text response explaining refusal
    const textPart = parts.find(p => p.text);
    if (textPart) {
      throw new Error(`No image generated. Model said: ${textPart.text.substring(0, 200)}`);
    }
    throw new Error('No image in response');
  }

  // Save the image
  const outputPath = path.join(OUTPUT_DIR, `${lead.name}.png`);
  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
  fs.writeFileSync(outputPath, buffer);

  return { success: true, path: outputPath, duration, size: buffer.length };
}

/**
 * Main batch generation with retry logic
 */
async function main() {
  console.log('================================================================');
  console.log('  NEOCORP LEAD SPRITE GENERATOR');
  console.log('  Nano Banana Pro (Gemini 3 Pro Image)');
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Characters: ${LEADS.length}`);
  console.log('================================================================\n');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Check which sprites already exist (skip them)
  const existing = new Set();
  for (const lead of LEADS) {
    const filePath = path.join(OUTPUT_DIR, `${lead.name}.png`);
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.size > 1000) { // Skip if file exists and is non-trivial
        existing.add(lead.name);
      }
    }
  }

  if (existing.size > 0) {
    console.log(`Skipping ${existing.size} already generated: ${[...existing].join(', ')}\n`);
  }

  const toGenerate = LEADS.filter(l => !existing.has(l.name));

  if (toGenerate.length === 0) {
    console.log('All sprites already generated! Delete files to regenerate.');
    return;
  }

  const results = { success: 0, failed: 0, errors: [] };
  const MAX_RETRIES = 3;

  for (let i = 0; i < toGenerate.length; i++) {
    const lead = toGenerate[i];
    const progress = `[${i + 1}/${toGenerate.length}]`;

    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES && !success) {
      try {
        if (retries > 0) {
          console.log(`  Retry ${retries}/${MAX_RETRIES}...`);
        }

        console.log(`${progress} Generating ${lead.name}...`);
        const result = await generateSprite(lead);
        console.log(`  OK - ${(result.duration / 1000).toFixed(1)}s, ${(result.size / 1024).toFixed(0)}KB`);
        results.success++;
        success = true;

      } catch (error) {
        retries++;
        const msg = error.message || String(error);

        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          const waitTime = Math.min(60 * retries, 120);
          console.log(`  Rate limited. Waiting ${waitTime}s before retry...`);
          await new Promise(r => setTimeout(r, waitTime * 1000));
        } else if (msg.includes('500') || msg.includes('503')) {
          console.log(`  Server error. Waiting 10s before retry...`);
          await new Promise(r => setTimeout(r, 10000));
        } else {
          console.error(`  FAILED: ${msg}`);
          if (retries >= MAX_RETRIES) {
            results.failed++;
            results.errors.push({ name: lead.name, error: msg });
          } else {
            await new Promise(r => setTimeout(r, 3000));
          }
        }
      }
    }

    // Small delay between successful generations to avoid rate limits
    if (success && i < toGenerate.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Summary
  console.log('\n================================================================');
  console.log('  GENERATION COMPLETE');
  console.log(`  Success: ${results.success}/${toGenerate.length}`);
  console.log(`  Failed:  ${results.failed}/${toGenerate.length}`);
  if (results.errors.length > 0) {
    console.log('\n  Failed characters:');
    for (const err of results.errors) {
      console.log(`    - ${err.name}: ${err.error}`);
    }
  }
  console.log('================================================================');

  // List all generated files
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\nTotal sprites in output directory: ${files.length}`);
  for (const f of files.sort()) {
    const stat = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stat.size / 1024).toFixed(0)}KB)`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
