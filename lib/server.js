#!/usr/bin/env node
/**
 * fleet-midi-text2midi — Server Mode
 * Express API that accepts text prompts and returns MIDI
 * Orchestrates text2midi engine -> REMI tokenizer -> I2I bottle
 */
const express = require('express');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const app = express();
app.use(express.json());

const ENGINE = path.join(__dirname, 'engine.js');
const OUTPUT = path.join(__dirname, '..', 'generated');
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

app.post('/generate', (req, res) => {
  const prompt = req.body.prompt || 'C major chord';
  try {
    const result = execSync(`node "${ENGINE}" "${prompt.replace(/"/g,'\\"')}"`, {
      cwd: path.join(__dirname, '..'),
      timeout: 30000,
      encoding: 'utf8'
    });
    const latest_midi = fs.readdirSync(OUTPUT)
      .filter(f => f.endsWith('.mid'))
      .sort()
      .pop();
    const latest_json = fs.readdirSync(OUTPUT)
      .filter(f => f.endsWith('.json'))
      .sort()
      .pop();
    res.json({
      status: 'ok',
      prompt,
      midi_file: latest_midi ? path.join(OUTPUT, latest_midi) : null,
      sequence: latest_json ? JSON.parse(fs.readFileSync(path.join(OUTPUT, latest_json), 'utf8')) : null,
      log: result
    });
  } catch(e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'rhapsodia' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🎹 Rhapsodia text2midi server on :${PORT}`);
});
