#!/usr/bin/env bash
set -euo pipefail
echo "══════════════════════════════════════════════════════"
echo "  MIDI TEXT2MIDI — Zeroshot Test Suite"
echo "══════════════════════════════════════════════════════"
PASS=0; FAIL=0
for prompt in "C major chord arpeggio" "Jazz piano in Fmaj7, 2 bars" "Minor blues in A, 4 bars, 120bpm"; do
  echo ""
  echo "🟢 Testing: \"$prompt\"..."
  RESULT=$(node lib/engine.js "$prompt" 2>&1) || true
  if echo "$RESULT" | grep -q "✅"; then
    echo "   ✅ PASS"
    PASS=$((PASS+1))
  else
    echo "   ❌ FAIL"
    FAIL=$((FAIL+1))
  fi
done
echo ""
echo "══════════════════════════════════════════════════════"
echo "  RESULTS: $PASS/$((PASS+FAIL)) passed"
[ "$FAIL" -eq 0 ]
