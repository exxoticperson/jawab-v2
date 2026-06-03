---
name: jawab-second-brain
description: >
  Ingests the entire Jawab V2 project into an Obsidian vault with full
  graph connectivity, MOC (Maps of Content), YAML frontmatter, and generates
  AI context files that any LLM (Claude, ChatGPT, Gemini, Antigravity) can
  consume for full project awareness. Includes MCP bridge setup for live
  vault access from AI assistants.
---

# Jawab Second Brain — Obsidian Vault Ingestion System

## Overview

This skill converts the entire `jawab-v2` repository into a fully
interconnected Obsidian knowledge vault — your **Second Brain** — and generates
optimized context files that let any AI assistant operate with complete project
awareness instead of relying on expensive token-based memory.

## What This Builds

```
JAWAB_BRAIN/                          ← Obsidian vault root
├── 🧠 _AI_CONTEXT/                  ← AI consumption layer
│   ├── MEGA_SYSTEM_PROMPT.md         ← One-shot context for any AI
│   ├── PROJECT_MAP.md                ← Full file tree + descriptions
│   ├── CONTEXT_BUNDLE.md             ← Compressed knowledge for token-limited AIs
│   └── MCP_CONFIG.json               ← MCP bridge config for Claude/Cursor
├── 📍 _MOC/                          ← Maps of Content (graph navigation)
│   ├── MOC_Home.md                   ← Master index
│   ├── MOC_Strategy.md               ← Strategy cluster
│   ├── MOC_Outreach.md               ← Outreach & data cluster
│   ├── MOC_Demo_Assets.md            ← Demo & visual assets cluster
│   ├── MOC_System.md                 ← System, skills, automation cluster
│   ├── MOC_Client_Ops.md             ← Client operations cluster
│   └── MOC_AI_Tools.md               ← AI/agentic tools cluster
├── 📂 Strategy/                      ← Converted strategy docs
├── 📂 Outreach/                      ← Converted outreach docs + data
├── 📂 Demo_Assets/                   ← Converted demo & visual docs
├── 📂 System/                        ← Converted system & skill docs
├── 📂 Client_Ops/                    ← Converted client ops docs
├── 📂 Backend/                       ← Converted backend reference
├── 📂 Archive/                       ← Old V2 docs (tagged as archived)
├── 📂 Daily/                         ← Daily notes (empty, for user)
└── 📂 Templates/                     ← Note templates
```

## How To Run

### Step 1: Prerequisites

- Python 3.10+ installed
- Obsidian installed (https://obsidian.md)
- Optional: Obsidian "Local REST API" plugin for MCP bridge

### Step 2: Run the Vault Generator

```powershell
cd c:\Users\krx15\Downloads\tribes\jawab-v2\04_System_and_Skills\second_brain
python vault_generator.py
```

This will:
1. Scan the entire jawab-v2 repository
2. Convert every file into an Obsidian-compatible markdown note with YAML frontmatter
3. Generate bidirectional `[[wiki-links]]` between related files
4. Create Maps of Content (MOCs) for graph navigation
5. Build the AI context files (mega prompt, project map, context bundle)
6. Output everything to `JAWAB_BRAIN/` vault folder

### Step 3: Open in Obsidian

1. Open Obsidian
2. Click "Open folder as vault"
3. Select the `JAWAB_BRAIN` folder
4. Enable Graph View → you'll see your entire project as a connected knowledge graph

### Step 4: Connect AI Assistants (Optional)

#### For Claude Desktop (MCP)
1. Install "Local REST API" plugin in Obsidian
2. Copy the API key from plugin settings
3. Add the MCP config from `_AI_CONTEXT/MCP_CONFIG.json` to your Claude Desktop config

#### For ChatGPT / Claude / Any AI
1. Open `_AI_CONTEXT/MEGA_SYSTEM_PROMPT.md`
2. Paste it as the system prompt or first message
3. The AI now has full project awareness

#### For Antigravity / Gemini
1. The vault is already in your workspace — Antigravity can read it directly
2. Use `_AI_CONTEXT/CONTEXT_BUNDLE.md` for compressed context

## Architecture Decisions

- **YAML Frontmatter**: Every note has `tags`, `type`, `status`, `created`, `related` fields
- **Wiki-Links**: `[[Note Name]]` syntax for Obsidian graph connectivity
- **MOC Pattern**: Maps of Content act as navigation hubs instead of deep folder nesting
- **AI Context Layer**: Separate `_AI_CONTEXT` folder with token-optimized files
- **No Data Loss**: Original file content is preserved; code blocks wrapped properly
- **Smart Tagging**: Auto-tags based on folder origin and content analysis

## Maintenance

After adding new files to jawab-v2, re-run the generator:

```powershell
python vault_generator.py --incremental
```

This will only process new/modified files and update the MOCs and AI context.
