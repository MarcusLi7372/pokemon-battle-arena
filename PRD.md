# Product Requirements Document
## Pokemon Battle Arena

**Version:** 1.0
**Date:** March 1, 2026
**Status:** Live

---

## 1. Overview

Pokemon Battle Arena is a browser-based, peer-to-peer Pokemon battle simulator supporting local and online multiplayer. It requires zero installation, runs entirely in the browser, and covers all 1,025 Pokemon across 9 generations. The game is a fully self-contained static web application — no backend, no database, no build pipeline.

---

## 2. Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Markup | HTML5 (single-page application) |
| Logic | Vanilla JavaScript (ES6+) |
| Styling | Vanilla CSS3 (no frameworks) |

### Networking
| Component | Technology |
|---|---|
| P2P Signaling | PeerJS 1.5.2 via `0.peerjs.com:443` |
| NAT Traversal | Google STUN (`stun:stun.l.google.com:19302`) |
| Transport | WebRTC DataChannel (browser-native) |

### Persistence
| Data | Storage |
|---|---|
| User accounts | `localStorage` (`pkbattle_accounts`) |
| Active session | `localStorage` (`pkbattle_session`) |
| Battle stats | In-memory (wins/losses persisted to localStorage) |

### Build & Deployment
- No build tool (no Webpack, Vite, Rollup, etc.)
- No package manager dependency
- Deploy as 6 static files to any web host (GitHub Pages, Netlify, Vercel, etc.)
- Total asset size: ~170 KB unminified
- Requires a modern browser with WebRTC support

### File Structure
```
pokemon-battle-arena/
├── index.html          (352 lines)  — App shell & all screen templates
├── game.js             (1,423 lines) — Core game engine & state management
├── pokemon-data.js     (709 lines)  — Pokemon data, move pool, type chart
├── auth.js             (102 lines)  — Authentication module
├── online.js           (347 lines)  — P2P networking engine
└── style.css           (1,352 lines) — Full design system
```

---

## 3. Game Modes

### 3.1 Local 2-Player
Two players share one device. A handoff overlay hides the screen between turns to prevent the current player from seeing the opponent's team. No network connection required.

### 3.2 1v1 Online
Two players connect over WebRTC using a 6-character room code. The host player generates the code and shares it out-of-band. Guest connects and the match begins. Host acts as the authoritative game state resolver.

### 3.3 2v2 Online (Team Battle)
Four players form two teams (Team A / Team B). Each team of two players controls 3 Pokemon each (6 total per side). Players coordinate moves within their team each turn. Uses a star topology: host broadcasts validated state to all three guests.

---

## 4. Core Features

### 4.1 Authentication
- Register and login with username/password
- Passwords hashed client-side using djb2-style hash (non-cryptographic)
- Session persisted across page refreshes via localStorage
- Per-user battle stats: total battles, wins, losses, online wins, online losses

### 4.2 Pokemon Roster
- All 1,025 Pokemon from Generations 1–9
- Each Pokemon has:
  - Primary (and optional secondary) type
  - Generation of origin
  - Tier rating: baby (1) → legendary (6)
  - 4 moves auto-selected from its type's move pool
  - Stats (HP, ATK, DEF, SPD) generated deterministically from tier and ID seed

### 4.3 Team Builder
- Searchable, filterable Pokemon grid
- Filter by type (18 types) and generation (1–9)
- Team size: 6 Pokemon for 1v1, 3 Pokemon per player for 2v2
- Live team panel sidebar showing selected Pokemon with stat summaries

### 4.4 Battle Engine

**Turn Resolution**
- Both players select a move simultaneously (online) or sequentially (local)
- Turn order determined by Pokemon speed stat
- Priority moves always act first regardless of speed

**Damage Formula**
```
base_dmg = ((2 * level / 5 + 2) * power * atk / def) / 50 + 2
final_dmg = base_dmg × random(0.85–1.0) × STAB × type_effectiveness × crit
```
- STAB (Same-Type Attack Bonus): 1.5× if move type matches user type
- Type effectiveness: 0× (immune), 0.5× (resisted), 1× (neutral), 2× (super effective)
- Critical hit: 6.25% base chance (1.5× damage); boosted to 25% by certain moves
- Dual-type effectiveness multiplied together

**Status Conditions**
| Status | Effect |
|---|---|
| Burn | −50% ATK; 1/16 max HP damage per turn |
| Poison | 1/8 max HP damage per turn |
| Paralysis | −50% SPD; 25% chance to skip turn |
| Freeze | Cannot attack; 20% thaw chance each turn |
| Sleep | Cannot attack; 33% wake chance each turn |

**Stat Stages**
- Modifiable stats: ATK, DEF, SPD
- Range: −6 to +6 stages
- Multipliers: 0.25× at −6 up to 4× at +6

### 4.5 Move System

**18 type pools × 6 moves = 108 unique moves.** Each move has power (0–150), accuracy (50%–100% or always-hit), and one of 26 effect categories including:

- Damage only
- Status infliction (burn, poison, paralysis, freeze)
- Stat boosts/drops (ATK, DEF, SPD — self or opponent)
- Recoil (1/3 damage dealt returned to user)
- Drain (recover 50% of damage dealt)
- Multi-hit (3× power equivalent)
- Priority (always goes first)
- Revenge (2× power if user was hit this turn)
- Flinch (chance opponent skips their turn)
- Accuracy reduction

### 4.6 Online Networking (PeerJS / WebRTC)

- Host-authoritative model: host resolves all game state, guests are display-only
- Room codes: 6-character alphanumeric, generated by host
- Connection flow: host opens peer → guest dials room code → handshake → team sync → battle start
- Message types: `join`, `team`, `move`, `state`, `chat`, `disconnect`
- Reconnection and error handling surfaced via status messages in lobby UI

### 4.7 Battle UI
- Per-Pokemon HP bars with color thresholds (green → yellow → red)
- Sprite attack animation and hit-flash on damage
- Move buttons display power, accuracy, and type
- Scrollable battle log with color-coded event messages
- "Team remaining" counter per side
- Stat stage display (ATK / DEF / SPD deltas)

### 4.8 Victory Screen
- Declares winner with trophy display
- Shows final team roster for both sides
- Links back to mode selection or rematch

---

## 5. Design System

### Color Palette
| Role | Value |
|---|---|
| Background dark | `#1a1a2e` |
| Background mid | `#16213e` |
| Card background | `#0f3460` |
| Accent red | `#e94560` |
| Accent gold | `#f7d02c` |
| Player 1 blue | `#4da6ff` |
| Player 2 red | `#ff6b6b` |

### Visual Features
- Full dark theme throughout
- CSS keyframe animations: logo pulse, loading spinner, attack flash, damage flash
- Gradient buttons with hover states
- Responsive layout (mobile / tablet / desktop) via flexbox
- Type badge chips with per-type color coding
- No external CSS framework — all 1,352 lines are hand-written

---

## 6. Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Frontend framework | None (Vanilla JS) | Zero build overhead, direct browser execution |
| Multiplayer transport | WebRTC (PeerJS) | Serverless P2P; no game server costs |
| State authority | Host-authoritative | Simple conflict resolution without a server |
| Data persistence | localStorage | No backend required for core functionality |
| Pokemon data | Hardcoded in JS | Eliminates API dependency and network latency |
| Styling | Vanilla CSS3 | No framework bloat; full design control |

---

## 7. Known Limitations

| Area | Limitation |
|---|---|
| Security | Password hash is non-cryptographic (djb2); accounts are client-side only |
| Reconnection | No automatic reconnect if P2P connection drops mid-battle |
| Persistence | Battle replays and match history are not saved |
| Sprites | Pokemon sprites are placeholder/text-based; no actual sprite assets |
| Testing | No automated test suite; manual QA only |
| Move animations | No per-move visual effects; only sprite flash on hit |
| Account portability | Accounts exist only in the browser that created them |

---

## 8. Potential Enhancements

- Sprite asset integration (PokeAPI or custom sprites)
- Spectator mode for online battles
- Persistent leaderboard via lightweight backend (e.g., Supabase, PocketBase)
- Reconnection / match resume on connection drop
- Sound effects and music
- AI single-player mode
- Draft / ban phase for competitive matches
- Move animations per type
- Mobile touch optimization
- Replays and shareable battle links
