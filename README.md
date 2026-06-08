# 🎹 text2midi

**Type "jazz piano in Cmaj7" and get a real MIDI file.**

---

## Wait, show me

```bash
node lib/engine.js "Jazz piano vamp in Cmaj7 with walking bass, 4 bars, 120bpm"
```

Three seconds later you have a Standard MIDI Format 1 file with 3 tracks, 52 notes, properly voiced in C major with a walking bass line — because music21 understands music theory.

---

## Starting points — pick one

### 1. A single line of code

```bash
node lib/engine.js "Minor blues in A, 4 bars, 120bpm"
```

### 2. A REST API endpoint

```bash
curl -X POST localhost:3001/generate \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"EDM synth lead in G minor, 128bpm"}'
```

Returns: MIDI file path, REMI token sequence, and an I2I bottle dropped in the fleet harbor for any other agent to pick up.

### 3. Import as a library

```bash
npm install @superinstance/midi-text2midi
```

```javascript
const { generate } = require('@superinstance/midi-text2midi');
const result = generate("Bossa nova guitar in Dm7, medium swing, 100bpm");
// result.midi → playable .mid file
// result.tokens → 79 REMI tokens the fleet can process
```

### 4. Docker — no install at all

```bash
docker pull ghcr.io/superinstance/fleet-midi-text2midi
docker run -p 3001:3001 ghcr.io/superinstance/fleet-midi-text2midi
curl -X POST localhost:3001/generate -d '{"prompt":"Classical string quartet in G"}'
```

---

## What you can build with this

| You have | You need | One line |
|----------|----------|----------|
| A text description | A MIDI file to open in a DAW | `node lib/engine.js "lofi hip hop beat, 85bpm"` |
| A web app | A generative music endpoint | `POST /generate { "prompt": "..." }` |
| A fleet of AI agents | Musical output they can share | Auto-bottles to I2I harbor |
| A game | Dynamic background music | `generate("Dungeon ambient, Dmin, 60bpm")` |
| A live coding session | Musical seeds | 3 seconds per idea |

---

## What happens inside

```
"jazz piano in Cmaj7 with walking bass, 4 bars, 120bpm"
         │
         ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ music21  │ ────▶│  REMI    │ ────▶│   I2I    │
  │Generator │      │Tokenizer  │      │  Bottle  │
  └──────────┘      └──────────┘      └──────────┘
         │                │                │
         ▼                ▼                ▼
   MIDI Format 1      63 tokens      Fleet harbor
   3 tracks           52 notes       Any agent can pick up
```

The prompt is parsed by music21 — a music theory library that understands terms like "Cmaj7", "walking bass", "120 BPM", and "4 bars". It generates a proper 3-track score: chord voicings, bass line, and a structural guide track.

Then the MIDI is tokenized into REMI tokens (H=header, T=tempo, K=key, S=time_sig, E=track, N=note_on, F=note_off).

Then the whole thing is dropped as an I2I bottle into the fleet harbor — any other ensign agent can pick it up, analyze it, extend it, or play it.

---

## A dozen ways you'll use this

1. Generate backing tracks for practice sessions
2. Create ambient music for games programmatically
3. Feed MIDI into a DAW for production
4. Seed a live coding session with melodic material
5. Build a web app that lets users describe and hear music
6. Generate variations of existing compositions
7. Bridge text-to-MIDI to neural audio generation
8. Create educational tools for music theory
9. Quickly prototype musical ideas
10. Generate MIDI for algorithmic composition systems
11. Feed into fleet-music-theorist for analysis
12. Route through fleet-midi-player for audio rendering

---

## Where this fits in the fleet

You are looking at **Rhapsodia** — the Fleet Music Weaving Agent.

This is one of 49 SuperInstance repos. Your MIDI output flows through the I2I bottle system. Rhythmica (tidalcycles) can add percussion. Harmonia (musiclang) can analyze the harmony. Glyph (tokenizer) can transport it. Pulse (sonicpi) can play it live.

**Next:** [fleet-music-theorist](https://github.com/SuperInstance/fleet-music-theorist) — analyze what you just made  
**Next:** [fleet-jam-engine](https://github.com/SuperInstance/fleet-jam-engine) — full band from one prompt  
**Next:** [fleet-ternary-music](https://github.com/SuperInstance/fleet-ternary-music) — understand the math behind it

---

## The file you get

```bash
file output.mid
# → Standard MIDI data (format 1) using 3 tracks at 1/10080
```

Open it in any DAW. Play it. Edit it. Feed it back into the fleet.

**Zero AI hype. Just MIDI.**
