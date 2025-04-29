#!/usr/bin/env bash
echo "🔍 Scanning for hard-coded secrets…"

# If any line in src/ matches (password|token|secret|clientId|apiKey) followed by = or :
if grep -REn "(password|token|secret|clientId|apiKey)\s*[:=]\s*['\"]).+" src/; then
  echo
  echo "❌ Potential hard-coded secrets detected!"
  exit 1
fi

echo "✅ No obvious secrets found."
