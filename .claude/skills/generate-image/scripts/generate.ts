#!/usr/bin/env bun
/**
 * Image Generation Script using Google Gemini 3 Pro API
 *
 * Usage:
 *   bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
 *     --prompt "description" --ratio "16:9" --output "filename.png"
 */

import { GoogleGenAI } from '@google/genai';
import { parseArgs } from 'util';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';

// Configuration
const GEMINI_MODEL = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = 'public';

// Valid aspect ratios
const VALID_RATIOS = ['16:9', '4:3', '1:1', '4:5'] as const;
type AspectRatio = (typeof VALID_RATIOS)[number];

// Parse CLI arguments
const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    prompt: { type: 'string', short: 'p' },
    ratio: { type: 'string', short: 'r', default: '16:9' },
    output: { type: 'string', short: 'o' },
  },
  strict: true,
});

// Validate arguments
if (!values.prompt) {
  console.error('Error: --prompt is required');
  console.error(
    'Usage: bun --env-file=.env.local generate.ts --prompt "description" [--ratio "16:9"] [--output "file.png"]'
  );
  process.exit(1);
}

const prompt = values.prompt;
const ratio = values.ratio as AspectRatio;
const outputFilename =
  values.output || `generated-${Date.now()}.png`;

// Validate aspect ratio
if (!VALID_RATIOS.includes(ratio)) {
  console.error(`Error: Invalid ratio "${ratio}". Valid options: ${VALID_RATIOS.join(', ')}`);
  process.exit(1);
}

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY not found in environment');
  console.error('Ensure .env.local exists with GEMINI_API_KEY=your-key');
  process.exit(1);
}

// Initialize Gemini client
const genai = new GoogleGenAI({ apiKey });

async function generateImage(): Promise<void> {
  console.log(`Generating image with Gemini 3 Pro...`);
  console.log(`  Prompt: ${prompt}`);
  console.log(`  Aspect ratio: ${ratio}`);

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: ['Text', 'Image'],
        imageConfig: {
          aspectRatio: ratio,
        },
      },
    });

    // Extract image from response
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates returned from Gemini API');
    }

    const content = candidates[0].content;
    if (!content?.parts || content.parts.length === 0) {
      throw new Error('No content parts returned from Gemini API');
    }

    // Log any text parts (model reasoning)
    for (const part of content.parts) {
      if (part.text) {
        console.log(`  Model notes: ${part.text}`);
      }
    }

    // Extract base64 image data
    let imageBase64: string | undefined;
    for (const part of content.parts) {
      if (part.inlineData?.data) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      throw new Error('No image data found in Gemini response');
    }

    // Ensure output directory exists
    const outputPath = join(OUTPUT_DIR, outputFilename);
    const outputDirPath = dirname(outputPath);

    if (!existsSync(outputDirPath)) {
      await mkdir(outputDirPath, { recursive: true });
    }

    // Decode base64 and save as PNG
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    await writeFile(outputPath, imageBuffer);

    const sizeKB = Math.round(imageBuffer.length / 1024);
    console.log(`\nImage saved successfully!`);
    console.log(`  Path: ${outputPath}`);
    console.log(`  Size: ${sizeKB} KB`);
  } catch (error) {
    console.error('Image generation failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run
generateImage();
