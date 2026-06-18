#!/usr/bin/env python3
"""Fetch Figma file structure for reference documentation."""
import json
import os
import sys
import urllib.request
from pathlib import Path

FILE_KEY = "0rZLBP3GFqnhpygeh9XjRU"
ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env.local"
OUT_DIR = ROOT / "references" / "figma" / "exports"


def load_token() -> str:
    if not ENV_FILE.exists():
        sys.exit(f"Missing {ENV_FILE}")
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if line.startswith("FIGMA_ACCESS_TOKEN="):
            return line.split("=", 1)[1].strip()
    sys.exit("FIGMA_ACCESS_TOKEN not found in .env.local")


def api_get(path: str) -> dict:
    token = load_token()
    req = urllib.request.Request(
        f"https://api.figma.com/v1{path}",
        headers={"X-Figma-Token": token},
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


def walk(node: dict, depth: int = 0, max_depth: int = 4, lines: list | None = None):
    if lines is None:
        lines = []
    indent = "  " * depth
    name = node.get("name", "")
    ntype = node.get("type", "")
    nid = node.get("id", "")
    size = ""
    if node.get("absoluteBoundingBox"):
        bb = node["absoluteBoundingBox"]
        w, h = int(bb.get("width", 0)), int(bb.get("height", 0))
        size = f" [{w}×{h}]"

    if ntype in ("CANVAS", "FRAME", "SECTION", "COMPONENT", "COMPONENT_SET", "GROUP"):
        lines.append(f"{indent}- **{name}** `{ntype}` `{nid}`{size}")

    if depth >= max_depth:
        return lines

    for child in node.get("children", []):
        walk(child, depth + 1, max_depth, lines)
    return lines


def main():
    depth = int(sys.argv[1]) if len(sys.argv) > 1 else 3
    data = api_get(f"/files/{FILE_KEY}?depth={depth}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    meta = {
        "name": data.get("name"),
        "lastModified": data.get("lastModified"),
        "version": data.get("version"),
        "fileKey": FILE_KEY,
    }

    inventory: dict[str, list[str]] = {}
    for canvas in data["document"]["children"]:
        cname = canvas["name"]
        inventory[cname] = walk(canvas, 0, depth - 1)

    summary_path = OUT_DIR / "file-structure.json"
    summary_path.write_text(
        json.dumps({"meta": meta, "pages": inventory}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    md_lines = [
        f"# Figma structure dump",
        "",
        f"- File: {meta['name']}",
        f"- Last modified: {meta['lastModified']}",
        f"- Depth: {depth}",
        "",
    ]
    for page, items in inventory.items():
        md_lines.append(f"## {page}")
        md_lines.append("")
        md_lines.extend(items or ["_(no frames at this depth)_"])
        md_lines.append("")

    (OUT_DIR / "file-structure.md").write_text("\n".join(md_lines), encoding="utf-8")
    print(f"Wrote {summary_path}")
    print(f"Pages: {len(inventory)}")


if __name__ == "__main__":
    main()
