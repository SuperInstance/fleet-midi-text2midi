<div align="center">

# 🎹 fleet-midi-text2midi

> *Text-to-MIDI generation for the fleet*

[![CI](https://img.shields.io/github/actions/workflow/status/SuperInstance/fleet-midi-text2midi/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/SuperInstance/fleet-midi-text2midi/actions)
[![npm](https://img.shields.io/badge/npm-%40superinstance%2Fmidi--text2midi-cb3837?style=flat-square&logo=npm)](https://www.npmjs.com/package/@superinstance/midi-text2midi)
[![Docker](https://img.shields.io/badge/docker-ghcr-2496ed?style=flat-square&logo=docker)](https://github.com/SuperInstance/fleet-midi-text2midi/pkgs/container/fleet-midi-text2midi)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](http://makeapullrequest.com)

---

Transform natural language into playable Standard MIDI Format 1 files via music21. Every prompt — from "C major chord" to "jazz piano vamp in Cmaj7 with walking bass" — produces 3-track MIDI with REMI token sequences delivered as I2I bottles to any fleet agent.

---

## 📦 Installation

```bash
# npm
npm install @superinstance/midi-text2midi

# Docker
docker pull ghcr.io/superinstance/fleet-midi-text2midi:latest

# Clone
git clone https://github.com/SuperInstance/fleet-midi-text2midi.git
```

## 🚀 Quick Start

```bash
# Generate MIDI from text:
node lib/engine.js "jazz piano vamp in Cmaj7 with walking bass"

# Start the API server:
node lib/server.js &
curl -X POST localhost:3001/generate \
  -H "Content-Type: application/json" \
  -d "{\"prompt\":\"minor blues in A, 4 bars, 120bpm\"}"

# Run the zeroshot tests:
bash tests/zeroshot.sh
```

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   "jazz piano in Cmaj7"                                 │
│         │                                                │
│         ▼                                                │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐           │
│   │ music21   │───▶│ REMI    │───▶│ I2I     │           │
│   │ Generator │    │Tokenizer │    │ Bottle  │           │
│   └──────────┘    └──────────┘    └──────────┘           │
│         │              │              │                   │
│         ▼              ▼              ▼                   │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐           │
│   │ MIDI File│    │ Tokens   │    │ Fleet   │           │
│   │ (.mid)  │    │ (JSON)   │    │ Harbor  │           │
│   └──────────┘    └──────────┘    └──────────┘           │
│                                                          │
│   Each → 3 tracks │ 52 notes │ 63 REMI tokens │ I2I bottle│
└──────────────────────────────────────────────────────────┘
```

## 📡 API

### POST /generate
Generate MIDI from a natural language prompt.

```json
{"prompt": "jazz piano in Cmaj7 with walking bass"}
```
→ Returns MIDI file path, REMI token sequence, and I2I bottle confirmation.

### GET /health
```json
{"status": "ok", "service": "rhapsodia"}
```

## 🧪 Beta Tested

Part of the [SuperInstance MIDI Fleet](https://github.com/SuperInstance/construct-coordination/blob/main/FLEET_MIDI.md). Every push verified via CI — zeroshot tests ensure zero-config operation out of the box.

## 🤝 Related

- [fleet-bridge](https://github.com/SuperInstance/fleet-bridge) — I2I bottle transport
- [construct-coordination](https://github.com/SuperInstance/construct-coordination) — Fleet catalog

---

<div align="center">
<sub>Built with 🎹 for the SuperInstance fleet • <a href="https://github.com/SuperInstance">github.com/SuperInstance</a></sub>
</div>
