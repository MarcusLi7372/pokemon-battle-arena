// ============================================================
// POKEMON BATTLE ARENA - Game Logic
// Supports: Local 2-Player, 1v1 Online, 2v2 Online
// ============================================================

// ============================================================
// GAME STATE
// ============================================================
const GEN_RANGES = [
  [1,151],[152,251],[252,386],[387,493],
  [494,649],[650,721],[722,809],[810,905],[906,1025]
];

// Current game mode: 'local' | 'online-1v1' | 'online-2v2'
let gameMode = 'local';

// Online: the "battle player" this device controls (1 or 2)
// In 2v2: slot 1&2 control battle-player 1, slot 3&4 control battle-player 2
let myBattlePlayer = 1;

// Waiting for online opponent's move?
let onlineWaiting = false;

// For online 2v2: which pokemon indices this device "owns" (0-2 or 3-5)
let myPokemonRange = [0, 5];

let state = {
  phase: 'title',
  currentPlayer: 1,
  teams: { 1: [], 2: [] },
  battle: {
    active: { 1: 0, 2: 0 },
    hp:     { 1: [], 2: [] },
    stages: { 1: [], 2: [] },
    status: { 1: [], 2: [] },
    turn: 1,
    phase: 'select-move',
    log: []
  }
};

let searchQuery = '';
let activeTypeFilter = 'All';
let activeGenFilter  = 0;
let filteredPokemon  = [...POKEMON_LIST];

// ============================================================
// DOM REFERENCES
// ============================================================
let dom = {};

function initDom() {
  dom = {
    screens: {
      login:         document.getElementById('login-screen'),
      mode:          document.getElementById('mode-screen'),
      onlineLobby:   document.getElementById('online-lobby-screen'),
      selection:     document.getElementById('selection-screen'),
      battle:        document.getElementById('battle-screen'),
      victory:       document.getElementById('victory-screen')
    },
    // Login
    tabLogin:       document.getElementById('tab-login'),
    tabRegister:    document.getElementById('tab-register'),
    loginForm:      document.getElementById('login-form'),
    registerForm:   document.getElementById('register-form'),
    loginUsername:  document.getElementById('login-username'),
    loginPassword:  document.getElementById('login-password'),
    loginError:     document.getElementById('login-error'),
    regUsername:    document.getElementById('reg-username'),
    regPassword:    document.getElementById('reg-password'),
    regConfirm:     document.getElementById('reg-confirm'),
    regError:       document.getElementById('reg-error'),
    // Mode
    modeUsername:   document.getElementById('mode-username'),
    modeStats:      document.getElementById('mode-stats'),
    logoutBtn:      document.getElementById('logout-btn'),
    // Online Lobby
    lobbyModeBadge: document.getElementById('lobby-mode-badge'),
    lobbyBackBtn:   document.getElementById('lobby-back-btn'),
    lobbyTabCreate: document.getElementById('lobby-tab-create'),
    lobbyTabJoin:   document.getElementById('lobby-tab-join'),
    lobbyCreatePanel:document.getElementById('lobby-create-panel'),
    lobbyJoinPanel: document.getElementById('lobby-join-panel'),
    roomCodeText:   document.getElementById('room-code-text'),
    copyCodeBtn:    document.getElementById('copy-code-btn'),
    lobbyWaitingMsg:document.getElementById('lobby-waiting-msg'),
    lobbySlots:     document.getElementById('lobby-slots'),
    lobbyStartBtn:  document.getElementById('lobby-start-btn'),
    lobbyStartHint: document.getElementById('lobby-start-hint'),
    joinCodeInput:  document.getElementById('join-code-input'),
    joinConnectBtn: document.getElementById('join-connect-btn'),
    joinLobbySlots: document.getElementById('join-lobby-slots'),
    joinError:      document.getElementById('join-error'),
    teamPicker:     document.getElementById('team-picker'),
    // Selection
    selectionHeader: document.getElementById('selection-header'),
    playerLabel:    document.getElementById('player-label'),
    teamCounter:    document.getElementById('team-counter'),
    searchBox:      document.getElementById('search-box'),
    pokemonGrid:    document.getElementById('pokemon-grid'),
    teamSlots:      document.getElementById('team-slots'),
    teamPanelTitle: document.getElementById('team-panel-title'),
    confirmReadyBtn:document.getElementById('confirm-ready-btn'),
    randomTeamBtn:  document.getElementById('random-team-btn'),
    clearTeamBtn:   document.getElementById('clear-team-btn'),
    // Battle
    battleTurnIndicator: document.getElementById('battle-turn-indicator'),
    onlineWaitingBadge:  document.getElementById('online-waiting-badge'),
    battleSubtitle:      document.getElementById('battle-subtitle'),
    p1PlayerLabel:  document.getElementById('p1-player-label'),
    p2PlayerLabel:  document.getElementById('p2-player-label'),
    p1Name:  document.getElementById('p1-name'),  p2Name:  document.getElementById('p2-name'),
    p1Sprite:document.getElementById('p1-sprite'), p2Sprite:document.getElementById('p2-sprite'),
    p1Types: document.getElementById('p1-types'),  p2Types: document.getElementById('p2-types'),
    p1HpBar: document.getElementById('p1-hp-bar'), p2HpBar: document.getElementById('p2-hp-bar'),
    p1HpText:document.getElementById('p1-hp-text'),p2HpText:document.getElementById('p2-hp-text'),
    p1Atk:   document.getElementById('p1-atk'),   p2Atk:   document.getElementById('p2-atk'),
    p1Def:   document.getElementById('p1-def'),   p2Def:   document.getElementById('p2-def'),
    p1Spd:   document.getElementById('p1-spd'),   p2Spd:   document.getElementById('p2-spd'),
    p1Status:document.getElementById('p1-status'),p2Status:document.getElementById('p2-status'),
    p1Remaining:document.getElementById('p1-remaining'),p2Remaining:document.getElementById('p2-remaining'),
    p1FighterPanel:document.getElementById('p1-fighter-panel'),
    p2FighterPanel:document.getElementById('p2-fighter-panel'),
    battleLog:  document.getElementById('battle-log'),
    moveArea:   document.getElementById('move-area'),
    moveAreaTitle:document.getElementById('move-area-title'),
    movesGrid:  document.getElementById('moves-grid'),
    switchArea: document.getElementById('switch-area'),
    switchPokemon:document.getElementById('switch-pokemon'),
    // Victory
    victoryTitle:        document.getElementById('victory-title'),
    victoryWinner:       document.getElementById('victory-winner'),
    victorySubtitle:     document.getElementById('victory-subtitle'),
    victoryTeamShowcase: document.getElementById('victory-team-showcase'),
    // Overlays
    confirmOverlay: document.getElementById('confirm-overlay'),
    confirmMsg:     document.getElementById('confirm-msg'),
    confirmBtn:     document.getElementById('confirm-btn')
  };
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(name) {
  Object.values(dom.screens).forEach(s => s && s.classList.remove('active'));
  if (dom.screens[name]) dom.screens[name].classList.add('active');
  state.phase = name;
}

// ============================================================
// ===  LOGIN SCREEN  =========================================
// ============================================================
function showLogin() {
  showScreen('login');
  // Reset form state
  dom.loginError.classList.add('hidden');
  dom.regError.classList.add('hidden');
  dom.loginUsername.value = '';
  dom.loginPassword.value = '';
}

function initLogin() {
  // Tab switching
  dom.tabLogin.addEventListener('click', () => {
    dom.tabLogin.classList.add('active');
    dom.tabRegister.classList.remove('active');
    dom.loginForm.classList.remove('hidden');
    dom.registerForm.classList.add('hidden');
    dom.loginError.classList.add('hidden');
  });
  dom.tabRegister.addEventListener('click', () => {
    dom.tabRegister.classList.add('active');
    dom.tabLogin.classList.remove('active');
    dom.registerForm.classList.remove('hidden');
    dom.loginForm.classList.add('hidden');
    dom.regError.classList.add('hidden');
  });

  // Login submit
  dom.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = Auth.login(dom.loginUsername.value, dom.loginPassword.value);
    if (result.ok) {
      showModeScreen(result.user);
    } else {
      dom.loginError.textContent = result.error;
      dom.loginError.classList.remove('hidden');
    }
  });

  // Register submit
  dom.registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (dom.regPassword.value !== dom.regConfirm.value) {
      dom.regError.textContent = "Passwords don't match";
      dom.regError.classList.remove('hidden');
      return;
    }
    const result = Auth.register(dom.regUsername.value, dom.regPassword.value);
    if (result.ok) {
      showModeScreen(result.user);
    } else {
      dom.regError.textContent = result.error;
      dom.regError.classList.remove('hidden');
    }
  });
}

// ============================================================
// ===  MODE SELECTION SCREEN  ================================
// ============================================================
function showModeScreen(user) {
  const u = user || Auth.getCurrentUser();
  if (!u) { showLogin(); return; }

  const stats = Auth.getStats(u.username);
  dom.modeUsername.textContent = u.username;
  dom.modeStats.textContent =
    `W: ${stats.wins || 0}  L: ${stats.losses || 0}  Battles: ${stats.battles || 0}` +
    (stats.onlineWins ? `  Online: ${stats.onlineWins}W/${stats.onlineLosses || 0}L` : '');

  showScreen('mode');
}

function initModeScreen() {
  // Logout
  dom.logoutBtn.addEventListener('click', () => {
    Auth.logout();
    showLogin();
  });

  // Local 2-Player
  document.getElementById('mode-local').addEventListener('click', () => {
    gameMode = 'local';
    state.teams = { 1: [], 2: [] };
    startPlayerSelection(1);
  });

  // 1v1 Online
  document.getElementById('mode-online-1v1').addEventListener('click', () => {
    gameMode = 'online-1v1';
    showOnlineLobby('1v1');
  });

  // 2v2 Online
  document.getElementById('mode-online-2v2').addEventListener('click', () => {
    gameMode = 'online-2v2';
    showOnlineLobby('2v2');
  });
}

// ============================================================
// ===  ONLINE LOBBY SCREEN  ==================================
// ============================================================
function showOnlineLobby(mode) {
  showScreen('onlineLobby');
  dom.lobbyModeBadge.textContent = mode === '1v1' ? '1v1 Online' : '2v2 Online';

  // Reset UI
  dom.roomCodeText.textContent = 'Generating…';
  dom.lobbyStartBtn.disabled = true;
  dom.lobbyStartHint.classList.remove('hidden');
  dom.lobbyWaitingMsg.textContent = 'Waiting for players to join…';
  dom.joinError.classList.add('hidden');
  dom.joinCodeInput.value = '';
  dom.teamPicker.classList.toggle('hidden', mode !== '2v2');

  // Show/hide lobby panels (default: create)
  showLobbyTab('create');

  // Render empty slot rows
  renderLobbySlots(dom.lobbySlots, mode, {});
  renderLobbySlots(dom.joinLobbySlots, mode, {});

  // Back button
  dom.lobbyBackBtn.onclick = () => {
    OnlineGame.destroy();
    showModeScreen(null);
  };

  // Tab switching
  dom.lobbyTabCreate.onclick = () => showLobbyTab('create');
  dom.lobbyTabJoin.onclick   = () => showLobbyTab('join');

  // ---- CREATE GAME ----
  const user = Auth.getCurrentUser();
  OnlineGame.createRoom(mode, user.username, {
    onCode(code) {
      dom.roomCodeText.textContent = code;
    },
    onLobbyUpdate(slots) {
      renderLobbySlots(dom.lobbySlots, mode, slots);
      const needed = mode === '1v1' ? 2 : 4;
      const filled = Object.keys(slots).length;
      const ready  = filled >= needed;
      dom.lobbyStartBtn.disabled = !ready;
      dom.lobbyWaitingMsg.textContent = ready
        ? 'All players joined! Click Start Battle.'
        : `Waiting for players… (${filled}/${needed})`;
      dom.lobbyStartHint.classList.toggle('hidden', ready);
    },
    onTeamReceived(slot, team) {
      if (OnlineGame.getIsHost()) checkAllOnlineTeamsReady(mode);
    },
    onMoveReceived(slot, index) {
      if (OnlineGame.getIsHost()) handleGuestMove(slot, index);
    },
    onSwitchReceived(slot, index) {
      if (OnlineGame.getIsHost()) handleGuestSwitch(slot, index);
    },
    onTurnResult(logs, bState) { /* host doesn't receive its own broadcast */ },
    onSwitchRequired(player, slot) { /* host handles this */ },
    onGameOver(winner) { /* host broadcasts, doesn't receive */ },
    onDisconnect(slot) { addLog(`Player ${slot} disconnected!`, 'log-faint'); },
    onError(msg) { alert('Connection error: ' + msg); }
  });

  // Copy code button
  dom.copyCodeBtn.onclick = () => {
    navigator.clipboard.writeText(dom.roomCodeText.textContent).then(() => {
      dom.copyCodeBtn.textContent = '✅';
      setTimeout(() => dom.copyCodeBtn.textContent = '📋', 2000);
    });
  };

  // Start battle (host only)
  dom.lobbyStartBtn.onclick = () => {
    // Notify all guests to start team selection, then start locally
    OnlineGame.send({ type: 'START_SELECTION', mode });
    startOnlineTeamSelection(mode);
  };

  // ---- JOIN GAME ----
  let chosenTeam = null;

  // 2v2 team picker
  document.querySelectorAll('.team-pick-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.team-pick-btn').forEach(b => b.classList.remove('selected-A','selected-B'));
      const t = btn.dataset.team;
      btn.classList.add('selected-' + t);
      chosenTeam = t;
    };
  });

  dom.joinConnectBtn.onclick = () => {
    const code = dom.joinCodeInput.value.trim().toUpperCase();
    if (code.length < 6) {
      dom.joinError.textContent = 'Enter the 6-character room code';
      dom.joinError.classList.remove('hidden');
      return;
    }
    if (mode === '2v2' && !chosenTeam) {
      dom.joinError.textContent = 'Choose a team (A or B) first';
      dom.joinError.classList.remove('hidden');
      return;
    }
    dom.joinError.classList.add('hidden');
    dom.joinConnectBtn.textContent = 'Connecting…';
    dom.joinConnectBtn.disabled = true;

    // Determine slot
    let wantedSlot = 2; // default for 1v1 and 2v2 Team A
    if (mode === '2v2' && chosenTeam === 'B') wantedSlot = 3; // first Team B slot

    const user = Auth.getCurrentUser();
    OnlineGame.joinRoom(code, wantedSlot, user.username, {
      onConnected() {
        dom.joinConnectBtn.textContent = 'Connected!';
      },
      onSlotAssigned(slot) {
        myBattlePlayer = slot <= 2 ? 1 : 2;
        addLog('Connected as Player ' + slot, 'log-system');
      },
      onLobbyUpdate(slots) {
        renderLobbySlots(dom.joinLobbySlots, mode, slots);
      },
      onStartSelection(m) {
        startOnlineTeamSelection(m || mode);
      },
      onTeamReceived(slot, team) {
        // Non-host: received another player's team
        checkAllOnlineTeamsReady(mode);
      },
      onMoveReceived(slot, index) { /* guests don't receive moves */ },
      onSwitchReceived(slot, index) { /* guests don't receive switches */ },
      onTurnResult(logs, bState) {
        applyOnlineTurnResult(logs, bState);
      },
      onSwitchRequired(player, slot) {
        if (slot === OnlineGame.getMySlot()) {
          const bp = myBattlePlayer;
          showSwitchRequired(bp, (chosenIdx) => {
            OnlineGame.sendSwitch(chosenIdx);
          });
        }
      },
      onGameOver(winner) {
        endBattle(winner);
      },
      onDisconnect(slot) { addLog('A player disconnected!', 'log-faint'); },
      onError(msg) {
        dom.joinError.textContent = msg;
        dom.joinError.classList.remove('hidden');
        dom.joinConnectBtn.textContent = 'Retry';
        dom.joinConnectBtn.disabled = false;
      }
    });
  };
}

function showLobbyTab(tab) {
  if (tab === 'create') {
    dom.lobbyTabCreate.classList.add('active');
    dom.lobbyTabJoin.classList.remove('active');
    dom.lobbyCreatePanel.classList.remove('hidden');
    dom.lobbyJoinPanel.classList.add('hidden');
  } else {
    dom.lobbyTabJoin.classList.add('active');
    dom.lobbyTabCreate.classList.remove('active');
    dom.lobbyJoinPanel.classList.remove('hidden');
    dom.lobbyCreatePanel.classList.add('hidden');
  }
}

function renderLobbySlots(container, mode, slots) {
  if (!container) return;
  const slotCount = mode === '1v1' ? 2 : 4;
  const labels    = ['Player 1 (Host)', 'Player 2', 'Player 3', 'Player 4'];
  const teamTags  = ['Team A', 'Team A', 'Team B', 'Team B'];
  container.innerHTML = '';
  for (let i = 1; i <= slotCount; i++) {
    const row = document.createElement('div');
    row.className = 'lobby-slot-row';
    const name = slots[i] || null;
    row.innerHTML = `
      <div class="lobby-slot-num p${i}">${i}</div>
      <div class="lobby-slot-name">${labels[i-1]}${mode === '2v2' ? ' · ' + teamTags[i-1] : ''}</div>
      <div class="lobby-slot-status ${name ? 'joined' : 'waiting'}">${name || 'Waiting…'}</div>
    `;
    container.appendChild(row);
  }
}

// ---- Online team selection (each player on own device) ----
function startOnlineTeamSelection(mode) {
  const slot   = OnlineGame.getMySlot();
  const maxPer = mode === '2v2' ? 3 : 6;
  const user   = Auth.getCurrentUser();

  state.teams = { 1: [], 2: [] };
  state.currentPlayer = myBattlePlayer;

  showScreen('selection');
  dom.playerLabel.textContent = user ? user.username : `Player ${slot}`;
  dom.playerLabel.style.background = slot <= 2 ? 'var(--p1-color)' : 'var(--p2-color)';
  dom.teamPanelTitle.textContent = `Your Team (pick ${maxPer})`;
  dom.teamCounter.textContent = `0/${maxPer} Selected`;

  // Override max team size for 2v2
  window._onlineMaxPer = maxPer;

  // Swap confirm button handler for online
  dom.confirmReadyBtn.onclick = null;
  dom.confirmReadyBtn.addEventListener('click', onOnlineTeamConfirmed, { once: true });

  renderPokemonGrid();
  renderTeamSlots();
  updateSelectionUI();
}

function onOnlineTeamConfirmed() {
  const team = state.teams[state.currentPlayer];
  OnlineGame.sendMyTeam(team);
  // Show waiting overlay
  dom.confirmReadyBtn.disabled = true;
  dom.confirmReadyBtn.textContent = '⏳ Waiting for others…';
}

function checkAllOnlineTeamsReady(mode) {
  const teams  = OnlineGame.getTeams();
  const needed = mode === '1v1' ? 2 : 4;
  if (Object.keys(teams).length < needed) return;
  // All teams in — assemble and start battle
  if (mode === '1v1') {
    state.teams[1] = teams[1];
    state.teams[2] = teams[2];
  } else {
    // 2v2: combine slot 1+2 → team 1, slot 3+4 → team 2
    state.teams[1] = [...(teams[1] || []), ...(teams[2] || [])];
    state.teams[2] = [...(teams[3] || []), ...(teams[4] || [])];
    // Figure out which pokemon range I own
    const slot = OnlineGame.getMySlot();
    myPokemonRange = (slot === 1 || slot === 3) ? [0, 2] : [3, 5];
  }
  startBattle();
}

// ============================================================
// ===  SELECTION SCREEN  =====================================
// ============================================================
function startPlayerSelection(player) {
  state.currentPlayer = player;
  showScreen('selection');
  window._onlineMaxPer = 6;

  const color = player === 1 ? 'var(--p1-color)' : 'var(--p2-color)';
  dom.playerLabel.textContent = `Player ${player}`;
  dom.playerLabel.style.background = color;
  dom.teamPanelTitle.textContent = `Player ${player}'s Team`;
  dom.teamCounter.textContent = '0/6 Selected';

  // Reset filters
  searchQuery      = '';
  activeTypeFilter = 'All';
  activeGenFilter  = 0;
  dom.searchBox.value = '';
  document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
  const allBtn = document.getElementById('type-filter-all');
  if (allBtn) allBtn.classList.add('active');
  document.querySelectorAll('.gen-btn').forEach(b => b.classList.remove('active'));
  const genAllBtn = document.getElementById('gen-filter-all');
  if (genAllBtn) genAllBtn.classList.add('active');

  // Restore confirm button
  dom.confirmReadyBtn.textContent = '✓ Lock Team & Continue';
  dom.confirmReadyBtn.onclick = null;

  renderPokemonGrid();
  renderTeamSlots();
  updateSelectionUI();
}

function renderPokemonGrid() {
  const team  = state.teams[state.currentPlayer];
  const query = searchQuery.toLowerCase();
  const max   = window._onlineMaxPer || 6;

  filteredPokemon = POKEMON_LIST.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(query);
    const typeMatch = activeTypeFilter === 'All' || p.type1 === activeTypeFilter || p.type2 === activeTypeFilter;
    let genMatch = true;
    if (activeGenFilter > 0) {
      const [min, mx] = GEN_RANGES[activeGenFilter - 1];
      genMatch = p.id >= min && p.id <= mx;
    }
    return nameMatch && typeMatch && genMatch;
  });

  dom.pokemonGrid.innerHTML = '';
  const other = state.teams[state.currentPlayer === 1 ? 2 : 1] || [];

  filteredPokemon.forEach(pokemon => {
    const inMyTeam    = team.some(t => t.id === pokemon.id);
    const inOtherTeam = gameMode === 'local' && other.some(t => t.id === pokemon.id);
    const full        = team.length >= max;
    const typeColor   = TYPE_COLORS[pokemon.type1] || '#888';

    const card = document.createElement('div');
    card.className = 'poke-card';
    if (inMyTeam)   card.classList.add(`selected-p${state.currentPlayer}`);
    if (!inMyTeam && (full || inOtherTeam)) card.classList.add('disabled');

    card.innerHTML = `
      <div class="select-check">✓</div>
      <img src="${pokemon.sprite}" alt="${pokemon.name}" loading="lazy"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><text y=%2250%22 font-size=%2250%22>⚫</text></svg>'">
      <div class="poke-name">${pokemon.name}</div>
      <div class="poke-id">#${String(pokemon.id).padStart(4,'0')}</div>
      <div>
        <span class="type-badge" style="background:${typeColor}">${pokemon.type1}</span>
        ${pokemon.type2 ? `<span class="type-badge" style="background:${TYPE_COLORS[pokemon.type2]}">${pokemon.type2}</span>` : ''}
      </div>
    `;

    if (!card.classList.contains('disabled')) {
      card.addEventListener('click', () => togglePokemonSelection(pokemon));
    }
    dom.pokemonGrid.appendChild(card);
  });
}

function togglePokemonSelection(pokemon) {
  const team = state.teams[state.currentPlayer];
  const max  = window._onlineMaxPer || 6;
  const idx  = team.findIndex(t => t.id === pokemon.id);

  if (idx >= 0) {
    state.teams[state.currentPlayer].splice(idx, 1);
  } else {
    if (team.length >= max) return;
    state.teams[state.currentPlayer].push({
      ...pokemon, moves: getMovesForPokemon(pokemon.type1, pokemon.type2)
    });
  }
  renderPokemonGrid();
  renderTeamSlots();
  updateSelectionUI();
}

function renderTeamSlots() {
  const team = state.teams[state.currentPlayer];
  const p    = state.currentPlayer;
  const max  = window._onlineMaxPer || 6;
  dom.teamSlots.innerHTML = '';

  for (let i = 0; i < max; i++) {
    const slot = document.createElement('div');
    slot.className = 'team-slot';
    if (team[i]) {
      const pk = team[i];
      slot.classList.add('filled', `filled-p${p}`);
      slot.innerHTML = `
        <div class="slot-number">${i + 1}</div>
        <img src="${pk.sprite}" alt="${pk.name}" onerror="this.style.display='none'">
        <div class="team-slot-info">
          <div class="team-slot-name">${pk.name}</div>
          <div class="team-slot-stats">HP:${pk.maxHp} ATK:${pk.attack} DEF:${pk.defense} SPD:${pk.speed}</div>
          <div style="margin-top:3px">
            <span class="type-badge" style="background:${TYPE_COLORS[pk.type1]};font-size:0.6rem">${pk.type1}</span>
            ${pk.type2 ? `<span class="type-badge" style="background:${TYPE_COLORS[pk.type2]};font-size:0.6rem">${pk.type2}</span>` : ''}
          </div>
        </div>
        <button class="team-slot-remove" data-id="${pk.id}">✕</button>
      `;
      slot.querySelector('.team-slot-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.target.dataset.id);
        state.teams[state.currentPlayer] = state.teams[state.currentPlayer].filter(t => t.id !== id);
        renderPokemonGrid(); renderTeamSlots(); updateSelectionUI();
      });
    } else {
      slot.innerHTML = `<div class="slot-number">${i+1}</div><span class="empty-slot-text">Empty</span>`;
    }
    dom.teamSlots.appendChild(slot);
  }
}

function updateSelectionUI() {
  const max   = window._onlineMaxPer || 6;
  const count = state.teams[state.currentPlayer].length;
  dom.teamCounter.textContent = `${count}/${max} Selected`;
  dom.confirmReadyBtn.disabled = count < max;
}

function pickRandomTeam() {
  const max   = window._onlineMaxPer || 6;
  const other = state.teams[state.currentPlayer === 1 ? 2 : 1] || [];
  const avail = POKEMON_LIST.filter(p => gameMode !== 'local' || !other.some(o => o.id === p.id));
  const shuf  = [...avail].sort(() => Math.random() - 0.5);
  state.teams[state.currentPlayer] = shuf.slice(0, max).map(p => ({
    ...p, moves: getMovesForPokemon(p.type1, p.type2)
  }));
  renderPokemonGrid(); renderTeamSlots(); updateSelectionUI();
}

function initSelectionScreen() {
  // Search
  dom.searchBox.addEventListener('input', e => { searchQuery = e.target.value; renderPokemonGrid(); });

  // Type filters
  const typeFilterContainer = document.getElementById('type-filter-row');
  ['All', ...Object.keys(TYPE_COLORS)].forEach(type => {
    const btn = document.createElement('button');
    btn.className = 'type-filter-btn';
    btn.textContent = type;
    if (type === 'All') { btn.id = 'type-filter-all'; btn.classList.add('active'); btn.style.background = '#666'; }
    else btn.style.background = TYPE_COLORS[type];
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTypeFilter = type;
      renderPokemonGrid();
    });
    typeFilterContainer.appendChild(btn);
  });

  // Gen filters
  const genContainer = document.getElementById('gen-filter-row');
  const allGenBtn = document.createElement('button');
  allGenBtn.className = 'gen-btn active'; allGenBtn.id = 'gen-filter-all'; allGenBtn.textContent = 'All';
  allGenBtn.addEventListener('click', () => {
    document.querySelectorAll('.gen-btn').forEach(b => b.classList.remove('active'));
    allGenBtn.classList.add('active'); activeGenFilter = 0; renderPokemonGrid();
  });
  genContainer.appendChild(allGenBtn);
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'gen-btn'; btn.textContent = `Gen ${i}`;
    const gen = i;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gen-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); activeGenFilter = gen; renderPokemonGrid();
    });
    genContainer.appendChild(btn);
  }

  dom.randomTeamBtn.addEventListener('click', pickRandomTeam);
  dom.clearTeamBtn.addEventListener('click', () => {
    state.teams[state.currentPlayer] = [];
    renderPokemonGrid(); renderTeamSlots(); updateSelectionUI();
  });

  // Local mode confirm ready
  dom.confirmReadyBtn.addEventListener('click', () => {
    if (gameMode !== 'local') return; // online has its own handler
    if (state.currentPlayer === 1) {
      showHandoffOverlay(2, () => startPlayerSelection(2));
    } else {
      showHandoffOverlay('battle', () => startBattle());
    }
  });
}

function showHandoffOverlay(next, callback) {
  if (gameMode !== 'local') { callback(); return; } // Skip for online
  if (next === 2) {
    dom.confirmMsg.innerHTML = `<strong>Player 1</strong> locked their team!<br><br>Pass the device to <strong>Player 2</strong>.`;
    dom.confirmBtn.textContent = 'Ready, Player 2!';
    dom.confirmBtn.className   = 'btn btn-red';
  } else {
    dom.confirmMsg.innerHTML = `Both teams are ready!<br><br>Let the battle begin!`;
    dom.confirmBtn.textContent = 'Start Battle! ⚔️';
    dom.confirmBtn.className   = 'btn btn-gold';
  }
  dom.confirmOverlay.classList.remove('hidden');
  const handler = () => {
    dom.confirmOverlay.classList.add('hidden');
    dom.confirmBtn.removeEventListener('click', handler);
    callback();
  };
  dom.confirmBtn.addEventListener('click', handler);
}

// ============================================================
// ===  BATTLE INITIALIZATION  ================================
// ============================================================
function startBattle() {
  state.battle = {
    active:  { 1: 0, 2: 0 },
    hp:      { 1: state.teams[1].map(p => p.maxHp), 2: state.teams[2].map(p => p.maxHp) },
    stages:  { 1: state.teams[1].map(() => ({ atk:0,def:0,spd:0 })), 2: state.teams[2].map(() => ({ atk:0,def:0,spd:0 })) },
    status:  { 1: state.teams[1].map(() => null), 2: state.teams[2].map(() => null) },
    turn:  1,
    phase: 'select-move',
    log:   []
  };

  // Label player panels
  if (gameMode === 'local') {
    dom.p1PlayerLabel.textContent = 'Player 1';
    dom.p2PlayerLabel.textContent = 'Player 2';
    dom.battleSubtitle.textContent = 'HP · ATK · DEF shown with stage modifiers';
  } else {
    const slot = OnlineGame.getMySlot();
    dom.battleSubtitle.textContent = `You are Player ${slot}`;
  }

  showScreen('battle');
  updateBattleUI();
  addLog(`⚔️ Battle Start! P1 sends ${activePokemon(1).name}! P2 sends ${activePokemon(2).name}!`, 'log-system');

  if (gameMode === 'local') {
    showBattleHandoff(1, () => { updateBattleUI(); showMoveButtons(); });
  } else {
    // Online: host picks first, others wait
    if (OnlineGame.getIsHost()) {
      myBattlePlayer = 1;
      showMoveButtons();
    } else {
      showOnlineWaiting();
    }
  }
}

// ============================================================
// ===  BATTLE HELPERS  =======================================
// ============================================================
function activePokemon(player) { return state.teams[player][state.battle.active[player]]; }
function activeHp(player)      { return state.battle.hp[player][state.battle.active[player]]; }
function setActiveHp(player, hp){ state.battle.hp[player][state.battle.active[player]] = Math.max(0, hp); }
function activeStatus(player)  { return state.battle.status[player][state.battle.active[player]]; }
function setActiveStatus(p, s) { state.battle.status[p][state.battle.active[p]] = s; }
function activeStages(player)  { return state.battle.stages[player][state.battle.active[player]]; }

function getStatModified(base, stage) {
  const m = [2/8,2/7,2/6,2/5,2/4,2/3,1,3/2,4/2,5/2,6/2,7/2,8/2];
  return Math.floor(base * m[stage + 6]);
}
function getEffectiveAtk(p)  { return getStatModified(activePokemon(p).attack,  activeStages(p).atk); }
function getEffectiveDef(p)  { return getStatModified(activePokemon(p).defense, activeStages(p).def); }
function getEffectiveSpd(p)  {
  let spd = getStatModified(activePokemon(p).speed, activeStages(p).spd);
  if (activeStatus(p) === 'paralysis') spd = Math.floor(spd * 0.5);
  return spd;
}

function isAlive(player, index) { return state.battle.hp[player][index] > 0; }
function hasLivingPokemon(player) { return state.battle.hp[player].some(hp => hp > 0); }

// ============================================================
// ===  BATTLE LOG  ===========================================
// ============================================================
function addLog(msg, cssClass = 'log-normal') {
  state.battle.log.push({ msg, cssClass });
  const entry = document.createElement('div');
  entry.className = `log-entry ${cssClass}`;
  entry.textContent = msg;
  dom.battleLog.prepend(entry);
  while (dom.battleLog.children.length > 60) dom.battleLog.removeChild(dom.battleLog.lastChild);
}

// ============================================================
// ===  DAMAGE CALCULATION  ===================================
// ============================================================
function calcDamage(attackerPlayer, defenderPlayer, move) {
  if (move.power === 0) return { dmg: 0, effective: 1, isCrit: false, recoil: 0, moveType: 'Normal' };

  let power = move.power;
  if (move.effect === 'multi_hit')    power = power * 3;
  if (move.effect === 'revenge_boost' && Math.random() > 0.4) power *= 2;

  const atk = getEffectiveAtk(attackerPlayer);
  const def = getEffectiveDef(defenderPlayer);
  let dmg = Math.floor(((2*50/5+2) * power * atk / def) / 50 + 2);
  dmg = Math.floor(dmg * (0.85 + Math.random() * 0.15));

  const moveType = detectMoveType(move, activePokemon(attackerPlayer));
  const stab     = (moveType === activePokemon(attackerPlayer).type1 || moveType === activePokemon(attackerPlayer).type2) ? 1.5 : 1;
  dmg = Math.floor(dmg * stab);

  const effective = getTypeEffectiveness(moveType, activePokemon(defenderPlayer).type1, activePokemon(defenderPlayer).type2);
  dmg = Math.floor(dmg * effective);

  if (activeStatus(attackerPlayer) === 'burn') dmg = Math.floor(dmg * 0.5);

  const isCrit = move.effect === 'crit_boost' ? Math.random() < 0.25 : Math.random() < 0.0625;
  if (isCrit) dmg = Math.floor(dmg * 1.5);

  const recoil = move.effect === 'recoil' ? Math.floor(dmg / 3) : 0;
  return { dmg, effective, isCrit, recoil, stab, moveType };
}

function detectMoveType(move, pokemon) {
  for (const [type, moves] of Object.entries(MOVE_POOLS)) {
    if (moves.some(m => m.name === move.name)) return type;
  }
  return pokemon.type1;
}

function applyMoveEffect(effect, attackerPlayer, defenderPlayer) {
  const msgs = [];
  if (!effect) return msgs;
  const chance = Math.random();

  const statuses = {
    burn_10:    ['burn',      0.10], burn_30:    ['burn',     0.30], burn_100:   ['burn',    1.0],
    poison_10:  ['poison',   0.10], poison_30:  ['poison',  0.30],
    paralysis_10:['paralysis',0.10], paralysis_30:['paralysis',0.30],
    freeze_10:  ['freeze',   0.10]
  };
  if (statuses[effect]) {
    const [status, prob] = statuses[effect];
    if (chance < prob && !activeStatus(defenderPlayer)) {
      setActiveStatus(defenderPlayer, status);
      msgs.push({ msg: `${activePokemon(defenderPlayer).name} was ${status}ed!`, css: 'log-status' });
    }
  }

  // Stat drops on defender
  if (effect === 'spdef_down' && chance < 0.10) modStage(defenderPlayer,'def',-1,msgs,activePokemon(defenderPlayer).name);
  if (effect === 'def_down'   && chance < 0.20) modStage(defenderPlayer,'def',-1,msgs,activePokemon(defenderPlayer).name);
  if (effect === 'atk_down'   && chance < 0.10) modStage(defenderPlayer,'atk',-1,msgs,activePokemon(defenderPlayer).name);
  if (effect === 'speed_down')                   modStage(defenderPlayer,'spd',-1,msgs,activePokemon(defenderPlayer).name);
  if (effect === 'spatk_down')                   modStage(defenderPlayer,'atk',-1,msgs,activePokemon(defenderPlayer).name);
  // Stat boosts on attacker
  if (effect === 'atk_up'     && chance < 0.10) modStage(attackerPlayer,'atk', 1,msgs,activePokemon(attackerPlayer).name);
  // Self drops
  if (effect === 'def_down_self')  modStage(attackerPlayer,'def',-1,msgs,activePokemon(attackerPlayer).name+' (self)');
  if (effect === 'stat_down_self') { modStage(attackerPlayer,'atk',-1,msgs,activePokemon(attackerPlayer).name+' (self)'); modStage(attackerPlayer,'def',-1,msgs,''); }
  if (effect === 'spatk_down_self') modStage(attackerPlayer,'atk',-1,msgs,activePokemon(attackerPlayer).name+' (self)');

  if (effect === 'acc_down') msgs.push({ msg: `${activePokemon(defenderPlayer).name}'s accuracy fell!`, css: 'log-normal' });

  return msgs;
}

function modStage(player, stat, delta, msgs, label) {
  const s = activeStages(player);
  const old = s[stat];
  s[stat] = Math.max(-6, Math.min(6, s[stat] + delta));
  if (s[stat] !== old && label) {
    msgs.push({ msg: `${label}'s ${stat.toUpperCase()} ${delta > 0 ? 'rose' : 'fell'}!`, css: delta > 0 ? 'log-effective' : 'log-resist' });
  }
}

function applyStatusDamage(player) {
  const status = activeStatus(player);
  const pk     = activePokemon(player);
  const msgs   = [];
  if (status === 'burn') {
    const d = Math.max(1, Math.floor(pk.maxHp / 16));
    setActiveHp(player, activeHp(player) - d);
    msgs.push({ msg: `${pk.name} is hurt by burn! (-${d})`, css: 'log-status' });
  }
  if (status === 'poison') {
    const d = Math.max(1, Math.floor(pk.maxHp / 8));
    setActiveHp(player, activeHp(player) - d);
    msgs.push({ msg: `${pk.name} is hurt by poison! (-${d})`, css: 'log-status' });
  }
  return msgs;
}

function checkStatusBeforeMove(player) {
  const status = activeStatus(player);
  const pk     = activePokemon(player);
  if (status === 'freeze') {
    if (Math.random() < 0.2) { setActiveStatus(player, null); return { canMove: true, msg: `${pk.name} thawed out!` }; }
    return { canMove: false, msg: `${pk.name} is frozen!` };
  }
  if (status === 'paralysis' && Math.random() < 0.25)
    return { canMove: false, msg: `${pk.name} is paralyzed and can't move!` };
  if (status === 'sleep') {
    if (Math.random() < 0.33) { setActiveStatus(player, null); return { canMove: true, msg: `${pk.name} woke up!` }; }
    return { canMove: false, msg: `${pk.name} is fast asleep!` };
  }
  return { canMove: true };
}

// ============================================================
// ===  EXECUTE A MOVE  =======================================
// ============================================================
function executeMove(player, moveIndex) {
  if (state.battle.phase !== 'select-move') return;
  const defender   = player === 1 ? 2 : 1;
  const move       = activePokemon(player).moves[moveIndex];
  state.battle.phase = 'animating';
  disableMoveButtons();

  const atkSprite = player === 1 ? dom.p1Sprite : dom.p2Sprite;
  const defSprite = player === 1 ? dom.p2Sprite : dom.p1Sprite;
  atkSprite.classList.add('attack-anim');
  setTimeout(() => atkSprite.classList.remove('attack-anim'), 500);

  setTimeout(() => {
    const sc = checkStatusBeforeMove(player);
    if (!sc.canMove) {
      addLog(sc.msg, 'log-status');
    } else {
      if (sc.msg) addLog(sc.msg, 'log-status');
      const attackerPk = activePokemon(player);
      const defenderPk = activePokemon(defender);
      addLog(`${attackerPk.name} used ${move.name}!`, player === 1 ? 'log-p1' : 'log-p2');

      if (move.power === 0) {
        applyMoveEffect(move.effect, player, defender).forEach(e => addLog(e.msg, e.css));
      } else {
        const res = calcDamage(player, defender, move);
        if (res.effective === 0) {
          addLog(`It doesn't affect ${defenderPk.name}!`, 'log-immune');
        } else {
          defSprite.classList.add('hit-anim');
          setTimeout(() => defSprite.classList.remove('hit-anim'), 500);
          setActiveHp(defender, activeHp(defender) - res.dmg);
          if (res.isCrit)       addLog('A critical hit!', 'log-effective');
          if (res.effective > 1) addLog("It's super effective!", 'log-effective');
          if (res.effective < 1) addLog("It's not very effective…", 'log-resist');
          addLog(`${defenderPk.name} took ${res.dmg} damage! (${activeHp(defender)}/${defenderPk.maxHp} HP)`,
            player === 1 ? 'log-p1' : 'log-p2');
          if (res.recoil > 0) {
            setActiveHp(player, activeHp(player) - res.recoil);
            addLog(`${attackerPk.name} is hurt by recoil! (-${res.recoil})`, 'log-normal');
          }
          applyMoveEffect(move.effect, player, defender).forEach(e => addLog(e.msg, e.css));
          if (move.effect === 'drain') {
            const d = Math.floor(res.dmg / 2);
            setActiveHp(player, Math.min(activePokemon(player).maxHp, activeHp(player) + d));
            addLog(`${attackerPk.name} drained ${d} HP!`, 'log-effective');
          }
        }
      }
    }

    applyStatusDamage(player).forEach(m => addLog(m.msg, m.css));
    updateBattleUI();

    // Broadcast state for online
    if (gameMode !== 'local' && OnlineGame.getIsHost()) {
      OnlineGame.broadcastTurnResult(state.battle.log.slice(0, 20), serializeBattleState());
    }

    setTimeout(() => {
      if (activeHp(player) <= 0)   handleFaint(player);
      else if (activeHp(defender) <= 0) handleFaint(defender);
      else switchTurn();
    }, 400);
  }, 200);
}

// ============================================================
// ===  TURN SWITCHING  =======================================
// ============================================================
function switchTurn() {
  state.battle.turn  = state.battle.turn === 1 ? 2 : 1;
  state.battle.phase = 'select-move';

  if (gameMode === 'local') {
    showBattleHandoff(state.battle.turn, () => { updateBattleUI(); showMoveButtons(); });
  } else {
    updateBattleUI();
    const nextTurn = state.battle.turn;
    // In 2v2, determine who actually controls the next move
    const controller = OnlineGame.getActiveController(
      nextTurn,
      state.battle.active[nextTurn],
      gameMode === 'online-2v2'
    );
    const mySlot = OnlineGame.getMySlot();

    if (OnlineGame.getIsHost() && nextTurn === 1) {
      // Host controls battle-player 1 (or in 2v2, slots 1 and 2)
      if (gameMode === 'online-2v2' && mySlot !== controller) {
        showOnlineWaiting();
        // Host waits for their own teammate (slot 2) to send move
      } else {
        showMoveButtons();
      }
    } else if (!OnlineGame.getIsHost() && mySlot === controller) {
      showMoveButtons();
    } else {
      showOnlineWaiting();
    }
  }
}

function showBattleHandoff(player, callback) {
  if (gameMode !== 'local') { callback(); return; }
  dom.confirmMsg.innerHTML = `
    <strong>Player ${player}'s Turn!</strong><br><br>
    Your active Pokemon: <strong>${activePokemon(player).name}</strong><br>
    <small style="color:#aaa">Look away, Player ${player === 1 ? 2 : 1}!</small>
  `;
  dom.confirmBtn.textContent = `Ready, Player ${player}!`;
  dom.confirmBtn.className   = player === 1 ? 'btn btn-blue' : 'btn btn-red';
  dom.confirmOverlay.classList.remove('hidden');
  const handler = () => {
    dom.confirmOverlay.classList.add('hidden');
    dom.confirmBtn.removeEventListener('click', handler);
    callback();
  };
  dom.confirmBtn.addEventListener('click', handler);
}

function showOnlineWaiting() {
  dom.moveArea.classList.add('hidden');
  dom.switchArea.classList.add('hidden');
  dom.onlineWaitingBadge.classList.remove('hidden');
  onlineWaiting = true;
}

function hideOnlineWaiting() {
  dom.onlineWaitingBadge.classList.add('hidden');
  onlineWaiting = false;
}

// ============================================================
// ===  ONLINE MOVE HANDLING  =================================
// ============================================================
function handleGuestMove(slot, index) {
  // Host received a move from a guest — apply it
  const guestBattlePlayer = slot <= 2 ? 1 : 2;
  if (guestBattlePlayer !== state.battle.turn) return; // out-of-order, ignore
  executeMove(guestBattlePlayer, index);
}

function handleGuestSwitch(slot, index) {
  const guestBattlePlayer = slot <= 2 ? 1 : 2;
  const oldName = activePokemon(guestBattlePlayer).name;
  state.battle.active[guestBattlePlayer] = index;
  addLog(`Player ${slot} switched ${oldName} → ${activePokemon(guestBattlePlayer).name}!`, `log-p${guestBattlePlayer}`);
  if (state.battle.phase === 'switch-required') {
    state.battle.phase = 'select-move';
  }
  updateBattleUI();
  OnlineGame.broadcastTurnResult(state.battle.log.slice(0, 20), serializeBattleState());
  switchTurn();
}

function applyOnlineTurnResult(logs, bState) {
  // Guests: apply state sent by host
  if (bState) {
    state.battle.hp     = bState.hp;
    state.battle.active = bState.active;
    state.battle.status = bState.status;
    state.battle.stages = bState.stages;
    state.battle.turn   = bState.turn;
  }
  if (logs) {
    logs.forEach(({ msg, cssClass }) => addLog(msg, cssClass || 'log-normal'));
  }
  updateBattleUI();
  hideOnlineWaiting();

  // Check faint
  const t = state.battle.turn === 1 ? 2 : 1; // who just moved
  const def = state.battle.turn;
  if (state.battle.hp[def][state.battle.active[def]] <= 0) {
    if (!hasLivingPokemon(def)) {
      // Let host handle endBattle broadcast
      return;
    }
    // Show switch required for this device
    if (myBattlePlayer === def) {
      showSwitchRequired(def, (idx) => { OnlineGame.sendSwitch(idx); });
    }
  } else {
    // Our turn?
    const mySlot = OnlineGame.getMySlot();
    const controller = OnlineGame.getActiveController(
      state.battle.turn, state.battle.active[state.battle.turn], gameMode === 'online-2v2'
    );
    if (mySlot === controller) showMoveButtons();
    else showOnlineWaiting();
  }
}

function serializeBattleState() {
  return {
    hp:     { 1: [...state.battle.hp[1]], 2: [...state.battle.hp[2]] },
    active: { ...state.battle.active },
    status: { 1: [...state.battle.status[1]], 2: [...state.battle.status[2]] },
    stages: {
      1: state.battle.stages[1].map(s => ({ ...s })),
      2: state.battle.stages[2].map(s => ({ ...s }))
    },
    turn:  state.battle.turn
  };
}

// ============================================================
// ===  FAINT HANDLING  =======================================
// ============================================================
function handleFaint(faintedPlayer) {
  addLog(`${activePokemon(faintedPlayer).name} fainted!`, 'log-faint');
  updateBattleUI();

  if (!hasLivingPokemon(faintedPlayer)) {
    const winner = faintedPlayer === 1 ? 2 : 1;
    setTimeout(() => {
      if (gameMode !== 'local' && OnlineGame.getIsHost()) OnlineGame.broadcastGameOver(winner);
      endBattle(winner);
    }, 800);
    return;
  }

  state.battle.phase = 'switch-required';
  setTimeout(() => {
    if (gameMode === 'local') {
      showSwitchRequired(faintedPlayer, (idx) => {
        state.battle.active[faintedPlayer] = idx;
        addLog(`Sent out ${activePokemon(faintedPlayer).name}!`, `log-p${faintedPlayer}`);
        updateBattleUI();
        state.battle.phase = 'select-move';
        switchTurn();
      });
    } else {
      const mySlot = OnlineGame.getMySlot();
      const myBP   = myBattlePlayer;
      if (myBP === faintedPlayer) {
        // It's our pokemon that fainted — we switch
        showSwitchRequired(faintedPlayer, (idx) => {
          if (OnlineGame.getIsHost()) {
            state.battle.active[faintedPlayer] = idx;
            addLog(`Sent out ${activePokemon(faintedPlayer).name}!`, `log-p${faintedPlayer}`);
            OnlineGame.broadcastTurnResult(state.battle.log.slice(0,20), serializeBattleState());
            updateBattleUI();
            state.battle.phase = 'select-move';
            switchTurn();
          } else {
            OnlineGame.sendSwitch(idx);
            showOnlineWaiting();
          }
        });
      } else {
        showOnlineWaiting();
      }
    }
  }, 600);
}

function showSwitchRequired(player, callback, forced = true) {
  dom.moveArea.classList.add('hidden');
  dom.switchArea.classList.remove('hidden');
  if (!forced) addLog(`Player ${player} must switch Pokemon!`, 'log-system');
  renderSwitchButtons(player, callback, forced);
}

function renderSwitchButtons(player, callback, forced = false) {
  const team = state.teams[player];
  dom.switchPokemon.innerHTML = '';

  team.forEach((pk, idx) => {
    const hp       = state.battle.hp[player][idx];
    const isActive = idx === state.battle.active[player];
    const isDead   = hp <= 0;
    const btn      = document.createElement('button');
    btn.className  = 'switch-poke-btn' + (isDead || isActive ? ' fainted' : '');
    btn.innerHTML  = `
      <img src="${pk.sprite}" alt="${pk.name}" onerror="this.style.display='none'">
      <span>${pk.name}</span>
      <span style="font-size:0.65rem;color:${hp > pk.maxHp*0.5 ? '#2ecc71' : hp > pk.maxHp*0.25 ? '#f39c12' : '#e74c3c'}">${hp}/${pk.maxHp}</span>
    `;
    if (!isDead && !isActive) {
      btn.addEventListener('click', () => {
        dom.switchArea.classList.add('hidden');
        callback(idx);
      });
    }
    dom.switchPokemon.appendChild(btn);
  });

  if (!forced) {
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary btn-sm';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
      dom.switchArea.classList.add('hidden');
      dom.moveArea.classList.remove('hidden');
    });
    dom.switchPokemon.appendChild(cancelBtn);
  }
}

// ============================================================
// ===  MOVE BUTTONS  =========================================
// ============================================================
function showMoveButtons() {
  hideOnlineWaiting();
  dom.moveArea.classList.remove('hidden');
  dom.switchArea.classList.add('hidden');

  const player = state.battle.turn;
  const pk     = activePokemon(player);
  dom.moveAreaTitle.textContent = gameMode === 'local'
    ? `Player ${player}'s Turn — ${pk.name}:`
    : `Your turn — ${pk.name}:`;

  dom.movesGrid.innerHTML = '';
  pk.moves.forEach((move, i) => {
    const moveType = detectMoveType(move, pk);
    const color    = TYPE_COLORS[moveType] || '#555';
    const btn      = document.createElement('button');
    btn.className  = 'move-btn';
    btn.style.background    = `linear-gradient(135deg, ${color}dd, ${color}88)`;
    btn.style.borderColor   = `${color}55`;
    btn.innerHTML  = `
      <span class="move-btn-name">${move.name}</span>
      <span class="move-btn-info">${moveType} · ${move.power > 0 ? 'Power: ' + move.power : 'Status'} · ${move.accuracy ? move.accuracy + '% acc' : '—'}</span>
    `;
    btn.addEventListener('click', () => {
      disableMoveButtons();
      if (gameMode !== 'local') {
        OnlineGame.sendMove(i);
        if (!OnlineGame.getIsHost()) { showOnlineWaiting(); return; }
      }
      executeMove(player, i);
    });
    dom.movesGrid.appendChild(btn);
  });

  // Switch option
  const switchBtn = document.createElement('button');
  switchBtn.className = 'move-btn';
  switchBtn.style.background = 'linear-gradient(135deg, #555,#333)';
  switchBtn.innerHTML = `<span class="move-btn-name">🔄 Switch Pokemon</span><span class="move-btn-info">Counts as your turn</span>`;
  switchBtn.addEventListener('click', () => {
    dom.moveArea.classList.add('hidden');
    dom.switchArea.classList.remove('hidden');
    renderSwitchButtons(player, (chosenIdx) => {
      const oldPk = activePokemon(player);
      state.battle.active[player] = chosenIdx;
      addLog(`Player ${player} switched ${oldPk.name} → ${activePokemon(player).name}!`, `log-p${player}`);
      if (gameMode !== 'local' && !OnlineGame.getIsHost()) {
        OnlineGame.sendSwitch(chosenIdx);
        showOnlineWaiting(); return;
      }
      if (gameMode !== 'local' && OnlineGame.getIsHost()) {
        OnlineGame.broadcastTurnResult(state.battle.log.slice(0,20), serializeBattleState());
      }
      updateBattleUI();
      switchTurn();
    }, false);
  });
  dom.movesGrid.appendChild(switchBtn);
}

function disableMoveButtons() {
  dom.movesGrid.querySelectorAll('button').forEach(b => b.disabled = true);
}

// ============================================================
// ===  BATTLE UI  ============================================
// ============================================================
function updateBattleUI() {
  updateFighterPanel(1);
  updateFighterPanel(2);
  dom.battleTurnIndicator.textContent = gameMode === 'local'
    ? `Player ${state.battle.turn}'s Turn`
    : `Turn: Player ${state.battle.turn}`;
  dom.battleTurnIndicator.className = `turn-indicator p${state.battle.turn}-turn`;
}

function updateFighterPanel(player) {
  const pk  = activePokemon(player);
  const hp  = activeHp(player);
  const pct = Math.max(0, (hp / pk.maxHp) * 100);

  const els = player === 1
    ? { name:dom.p1Name,sprite:dom.p1Sprite,hpBar:dom.p1HpBar,hpText:dom.p1HpText,types:dom.p1Types,
        atk:dom.p1Atk,def:dom.p1Def,spd:dom.p1Spd,status:dom.p1Status,rem:dom.p1Remaining,panel:dom.p1FighterPanel }
    : { name:dom.p2Name,sprite:dom.p2Sprite,hpBar:dom.p2HpBar,hpText:dom.p2HpText,types:dom.p2Types,
        atk:dom.p2Atk,def:dom.p2Def,spd:dom.p2Spd,status:dom.p2Status,rem:dom.p2Remaining,panel:dom.p2FighterPanel };

  els.name.textContent      = pk.name;
  els.sprite.src            = pk.sprite;
  els.hpText.textContent    = `${hp} / ${pk.maxHp}`;
  els.hpBar.style.width     = pct + '%';
  els.hpBar.className       = 'hp-bar-fill ' + (pct > 50 ? 'hp-high' : pct > 20 ? 'hp-mid' : 'hp-low');
  els.types.innerHTML       = renderTypes(pk);
  els.atk.textContent       = getEffectiveAtk(player);
  els.def.textContent       = getEffectiveDef(player);
  els.spd.textContent       = getEffectiveSpd(player);
  els.status.innerHTML      = renderStatus(activeStatus(player));
  els.rem.innerHTML         = renderRemaining(player);
  els.panel.classList.toggle('active', state.battle.turn === player && state.battle.phase === 'select-move');
}

function renderTypes(pk) {
  let html = `<span class="type-badge" style="background:${TYPE_COLORS[pk.type1]}">${pk.type1}</span>`;
  if (pk.type2) html += ` <span class="type-badge" style="background:${TYPE_COLORS[pk.type2]}">${pk.type2}</span>`;
  return html;
}
function renderStatus(status) {
  if (!status) return '';
  const labels = { burn:'BRN',poison:'PSN',paralysis:'PAR',freeze:'FRZ',sleep:'SLP' };
  return `<span class="status-badge status-${status}">${labels[status]||status}</span>`;
}
function renderRemaining(player) {
  const activeIdx = state.battle.active[player];
  return state.teams[player].map((pk, i) => {
    const hp  = state.battle.hp[player][i];
    const cls = i === activeIdx ? 'active' : hp > 0 ? 'alive' : 'fainted';
    return `<div class="remaining-dot ${cls}" title="${pk.name}: ${hp}/${pk.maxHp}HP"></div>`;
  }).join('');
}

// ============================================================
// ===  VICTORY  ==============================================
// ============================================================
function endBattle(winner) {
  state.battle.phase = 'victory';
  showScreen('victory');

  const user = Auth.getCurrentUser();
  if (user) {
    if (gameMode === 'local') {
      // Update stats for both? We only know the logged-in user
      Auth.updateStats(user.username, winner === 1 ? 'win' : 'loss');
    } else {
      const myBP = myBattlePlayer;
      Auth.updateStats(user.username, winner === myBP ? 'online-win' : 'online-loss');
    }
  }

  const loser    = winner === 1 ? 2 : 1;
  const winColor = winner === 1 ? 'var(--p1-color)' : 'var(--p2-color)';
  dom.victoryTitle.textContent    = '🏆 Victory!';
  dom.victoryWinner.innerHTML     = `<span style="color:${winColor}">Player ${winner}</span> Wins!`;
  dom.victorySubtitle.textContent = `Player ${loser}'s team has been defeated!`;

  dom.victoryTeamShowcase.innerHTML = '';
  state.teams[winner].forEach((pk, i) => {
    const hp  = state.battle.hp[winner][i];
    const div = document.createElement('div');
    div.className = 'victory-poke' + (hp <= 0 ? ' fainted' : '');
    div.innerHTML = `
      <img src="${pk.sprite}" alt="${pk.name}">
      <span class="poke-name-small">${pk.name}</span>
      <span style="font-size:0.6rem;color:#aaa">${hp}/${pk.maxHp}</span>
    `;
    dom.victoryTeamShowcase.appendChild(div);
  });

  document.getElementById('rematch-btn').onclick = () => {
    OnlineGame.destroy();
    state.teams = { 1: [], 2: [] };
    showModeScreen(null);
  };
  document.getElementById('new-game-btn').onclick = () => {
    OnlineGame.destroy();
    showModeScreen(null);
  };
}

// ============================================================
// ===  INIT  =================================================
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initDom();
  initLogin();       // set up event listeners once
  initModeScreen();
  initSelectionScreen();

  // Check if already logged in
  const user = Auth.getCurrentUser();
  if (user) {
    showModeScreen(user);
  } else {
    showLogin();
  }
});
