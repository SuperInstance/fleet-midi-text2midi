# fleet-midi-text2midi 🎹

> *Text-to-MIDI fleet agent. Speak music, receive MIDI.*

Takes natural language prompts ("jazz piano vamp in Cmaj7 with walking bass, 4 bars, 120bpm") and produces Standard MIDI Format 1 files via music21. Output is tokenized into REMI-style sequences and delivered as I2I bottles to any fleet agent.

## Why

Every fleet agent should be able to **compose**. A tensor state isn't just strategy data — it's a melody waiting to be heard. text2midi gives every ensign a voice.

## Quick Start

```bash
npx @superinstance/midi-text2midi "Jazz progression in C major"
```

## Architecture

```
text prompt → music21 generator → MIDI file → REMI tokenizer → I2I bottle → fleet
```

- **music21** (Python): Music theory-aware MIDI generation
- **REMI tokens**: H:header, K:key, S:time_sig, T:tempo, E:track, P:program, N:note_on, F:note_off
- **I2I vessel**: Bottles delivered to fleet harbor for agent pickup

## Debugging

```bash
node lib/engine.js "C major chord" --verbose
```

## Related

- [fleet-midi-tokenizer](https://github.com/SuperInstance/fleet-midi-tokenizer) — MIDI tokenization pipeline
- [fleet-midi-tidalcycles](https://github.com/SuperInstance/fleet-midi-tidalcycles) — Rhythmic pattern engine
- [fleet-bridge](https://github.com/SuperInstance/fleet-bridge) — I2I bottle transport
