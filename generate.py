#!/usr/bin/env python3
"""
Cadeau- Prompt Generator
Vult placeholders in een prompt-template in met waarden uit config/business.json
en optionele command-line argumenten.

Gebruik:
  python generate.py <pad-naar-prompt> [--key waarde ...]

Voorbeelden:
  python generate.py prompts/google-business/profiel-beschrijving.md --gemeente Brasschaat
  python generate.py prompts/website-seo/dienstenpagina.md --gemeente Schilde --seizoen lente
  python generate.py prompts/klant-communicatie/offerte.md --klant_naam Jan --prijs_schatting "€75"
"""

import json
import re
import sys
from pathlib import Path


BASE_DIR = Path(__file__).parent
CONFIG_PATH = BASE_DIR / "config" / "business.json"


def load_config():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        config = json.load(f)
    flat = {}
    for key, value in config.items():
        if isinstance(value, list):
            flat[key] = ", ".join(str(v) for v in value)
        elif isinstance(value, dict):
            flat[key] = ", ".join(f"{k}: {v}" for k, v in value.items())
            for subkey, subval in value.items():
                flat[f"{key}_{subkey}"] = str(subval)
        else:
            flat[key] = str(value)
    return flat


def parse_extra_args(args):
    extra = {}
    i = 0
    while i < len(args):
        if args[i].startswith("--") and i + 1 < len(args):
            key = args[i][2:]
            extra[key] = args[i + 1]
            i += 2
        else:
            i += 1
    return extra


def fill_placeholders(template, variables):
    def replacer(match):
        key = match.group(1)
        return variables.get(key, match.group(0))

    return re.sub(r"\{\{(\w+)\}\}", replacer, template)


def find_unfilled(text):
    return re.findall(r"\{\{(\w+)\}\}", text)


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    prompt_path = Path(sys.argv[1])
    if not prompt_path.exists():
        print(f"Fout: bestand niet gevonden: {prompt_path}", file=sys.stderr)
        sys.exit(1)

    variables = load_config()
    extra = parse_extra_args(sys.argv[2:])
    variables.update(extra)

    template = prompt_path.read_text(encoding="utf-8")
    result = fill_placeholders(template, variables)

    unfilled = find_unfilled(result)
    if unfilled:
        print(
            f"Waarschuwing: {len(unfilled)} placeholder(s) niet ingevuld: "
            + ", ".join(f"{{{{{k}}}}}" for k in unfilled),
            file=sys.stderr,
        )
        print(
            "Voeg ze toe via --" + " --".join(f"{k} <waarde>" for k in unfilled),
            file=sys.stderr,
        )
        print(file=sys.stderr)

    print(result)


if __name__ == "__main__":
    main()
