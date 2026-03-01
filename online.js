// ============================================================
// POKEMON BATTLE ARENA - Online Multiplayer Module
// PeerJS WebRTC — star topology, host-authoritative
// Supports 1v1 (2 players) and 2v2 (4 players)
// ============================================================

const OnlineGame = (() => {
  // ---- State ------------------------------------------------
  let peer        = null;
  let conns       = {};      // { 2: conn, 3: conn, 4: conn } keyed by slot
  let hostConn    = null;    // for guests: single connection to host
  let isHost      = false;
  let mySlot      = 1;       // 1-4
  let roomCode    = null;
  let mode        = '1v1';   // '1v1' | '2v2'
  let teams       = {};      // { 1: [...], 2: [...], 3: [...], 4: [...] }
  let lobbySlots  = {};      // { 1: username, 2: username, ... }
  let callbacks   = {};

  // ---- Helpers ----------------------------------------------
  const PEER_CONFIG = {
    host: '0.peerjs.com', port: 443, path: '/', secure: true,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:openrelay.metered.ca:80' },
        {
          urls: 'turn:openrelay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        },
        {
          urls: 'turn:openrelay.metered.ca:443',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        },
        {
          urls: 'turn:openrelay.metered.ca:443?transport=tcp',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        }
      ]
    }
  };

  function genCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
  function peerId(code) {
    return 'pkbattle2025-' + code.toLowerCase();
  }
  function parse(raw) {
    try { return typeof raw === 'string' ? JSON.parse(raw) : raw; }
    catch { return null; }
  }

  // ---- Sending ----------------------------------------------
  function sendTo(conn, data) {
    if (conn && conn.open) conn.send(JSON.stringify(data));
  }

  /** Host → broadcast to all guests. Guest → send to host. */
  function send(data) {
    if (isHost) {
      Object.values(conns).forEach(c => sendTo(c, data));
    } else {
      sendTo(hostConn, data);
    }
  }

  /** Host only — send to specific slot */
  function sendToSlot(slot, data) {
    if (conns[slot]) sendTo(conns[slot], data);
  }

  // ---- Message handling -------------------------------------
  function handleData(data, fromSlot) {
    if (!data || !data.type) return;
    switch (data.type) {
      // ---- Lobby phase ----
      case 'HELLO': {
        if (!isHost) break;
        const wantedSlot = data.slot;
        // Assign the slot (host validates it's free)
        if (!lobbySlots[wantedSlot] || lobbySlots[wantedSlot] === data.username) {
          lobbySlots[wantedSlot] = data.username;
          conns[wantedSlot] = conns[fromSlot];
          if (wantedSlot !== fromSlot) delete conns[fromSlot];
          // Acknowledge
          sendTo(conns[wantedSlot], { type: 'SLOT_ASSIGNED', slot: wantedSlot, lobbySlots });
          // Broadcast lobby state to all
          send({ type: 'LOBBY_STATE', lobbySlots, mode });
          callbacks.onLobbyUpdate && callbacks.onLobbyUpdate({ ...lobbySlots });
        } else {
          sendTo(conns[fromSlot], { type: 'SLOT_DENIED', reason: 'Slot taken' });
        }
        break;
      }
      case 'SLOT_ASSIGNED': {
        mySlot = data.slot;
        lobbySlots = data.lobbySlots || {};
        callbacks.onSlotAssigned && callbacks.onSlotAssigned(mySlot);
        callbacks.onLobbyUpdate && callbacks.onLobbyUpdate({ ...lobbySlots });
        break;
      }
      case 'SLOT_DENIED': {
        callbacks.onError && callbacks.onError('Slot taken — choose another or refresh.');
        break;
      }
      case 'LOBBY_STATE': {
        lobbySlots = data.lobbySlots || {};
        if (data.mode) mode = data.mode;
        callbacks.onLobbyUpdate && callbacks.onLobbyUpdate({ ...lobbySlots });
        break;
      }
      // ---- Team selection phase ----
      case 'START_SELECTION': {
        callbacks.onStartSelection && callbacks.onStartSelection(data.mode);
        break;
      }
      case 'TEAM_READY': {
        teams[data.slot] = data.team;
        callbacks.onTeamReceived && callbacks.onTeamReceived(data.slot, data.team);
        // Host re-broadcasts to all so everyone knows state
        if (isHost) send({ type: 'TEAM_READY', slot: data.slot, team: data.team });
        break;
      }
      // ---- Battle phase ----
      case 'MOVE': {
        callbacks.onMoveReceived && callbacks.onMoveReceived(data.slot, data.index);
        break;
      }
      case 'SWITCH': {
        callbacks.onSwitchReceived && callbacks.onSwitchReceived(data.slot, data.index);
        break;
      }
      case 'TURN_RESULT': {
        callbacks.onTurnResult && callbacks.onTurnResult(data.logs, data.battleState);
        break;
      }
      case 'SWITCH_REQUIRED': {
        callbacks.onSwitchRequired && callbacks.onSwitchRequired(data.player, data.slot);
        break;
      }
      case 'GAME_OVER': {
        callbacks.onGameOver && callbacks.onGameOver(data.winner);
        break;
      }
      case 'CHAT': {
        callbacks.onChat && callbacks.onChat(data.username, data.msg);
        break;
      }
    }
  }

  function setupGuestConnection(conn, slot) {
    conn.on('data', (raw) => {
      const data = parse(raw);
      handleData(data, slot);
    });
    conn.on('close', () => {
      callbacks.onDisconnect && callbacks.onDisconnect(slot);
    });
    conn.on('error', (e) => {
      callbacks.onError && callbacks.onError('Connection error: ' + e.message);
    });
  }

  // ---- Public API -------------------------------------------

  /**
   * HOST: Create a room.
   * @param {string} gameMode '1v1' | '2v2'
   * @param {string} username host's username
   */
  function createRoom(gameMode, username, { onCode, onLobbyUpdate, onSlotAssigned, onStartSelection,
      onTeamReceived, onMoveReceived, onSwitchReceived, onTurnResult, onSwitchRequired, onGameOver,
      onDisconnect, onError } = {}) {
    isHost = true;
    mySlot = 1;
    mode   = gameMode;
    roomCode = genCode();
    teams    = {};
    lobbySlots = { 1: username };
    conns    = {};

    callbacks = { onCode, onLobbyUpdate, onSlotAssigned, onStartSelection, onTeamReceived,
      onMoveReceived, onSwitchReceived, onTurnResult, onSwitchRequired, onGameOver,
      onDisconnect, onError };

    peer = new Peer(peerId(roomCode), PEER_CONFIG);

    peer.on('open', () => {
      callbacks.onCode && callbacks.onCode(roomCode);
    });

    peer.on('connection', (conn) => {
      // Temporarily assign a numeric key until we get HELLO
      const tempKey = Date.now();
      conns[tempKey] = conn;
      conn.on('open', () => {
        conn.on('data', (raw) => {
          const data = parse(raw);
          handleData(data, tempKey);
        });
        conn.on('close', () => {
          // Find which slot this was
          for (const [slot, c] of Object.entries(conns)) {
            if (c === conn) {
              delete conns[slot];
              delete lobbySlots[slot];
              send({ type: 'LOBBY_STATE', lobbySlots, mode });
              callbacks.onLobbyUpdate && callbacks.onLobbyUpdate({ ...lobbySlots });
              break;
            }
          }
        });
      });
    });

    peer.on('error', (err) => {
      const msg = err.message || String(err);
      if (msg.includes('unavailable') || msg.includes('taken')) {
        // Room code collision — retry with new code
        roomCode = genCode();
        peer.destroy();
        createRoom(gameMode, username, callbacks);
      } else {
        callbacks.onError && callbacks.onError('Connection failed: ' + msg + '\nCheck firewall/VPN.');
      }
    });
  }

  /**
   * GUEST: Join a room.
   * @param {string} code 6-char room code
   * @param {number} wantedSlot 2, 3, or 4
   * @param {string} username
   */
  function joinRoom(code, wantedSlot, username, { onConnected, onSlotAssigned, onLobbyUpdate,
      onStartSelection, onTeamReceived, onMoveReceived, onSwitchReceived, onTurnResult,
      onSwitchRequired, onGameOver, onDisconnect, onError } = {}) {
    isHost   = false;
    mySlot   = wantedSlot;
    roomCode = code.trim().toUpperCase();
    teams    = {};

    callbacks = { onConnected, onSlotAssigned, onLobbyUpdate, onStartSelection, onTeamReceived,
      onMoveReceived, onSwitchReceived, onTurnResult, onSwitchRequired, onGameOver,
      onDisconnect, onError };

    peer = new Peer(null, PEER_CONFIG);

    peer.on('open', () => {
      hostConn = peer.connect(peerId(roomCode), { reliable: true });
      hostConn.on('open', () => {
        // Announce ourselves
        sendTo(hostConn, { type: 'HELLO', slot: wantedSlot, username });
        callbacks.onConnected && callbacks.onConnected();
      });
      setupGuestConnection(hostConn, 1);
    });

    peer.on('error', (err) => {
      const msg = err.message || String(err);
      if (msg.includes('not found') || msg.includes('Could not connect')) {
        callbacks.onError && callbacks.onError('Room not found. Check the code and try again.');
      } else {
        callbacks.onError && callbacks.onError('Connection failed: ' + msg);
      }
    });
  }

  // ---- Team management --------------------------------------
  function sendMyTeam(team) {
    teams[mySlot] = team;
    const data = { type: 'TEAM_READY', slot: mySlot, team };
    if (isHost) {
      // Re-broadcast so guests see host's team too
      send(data);
      // Also handle locally
      callbacks.onTeamReceived && callbacks.onTeamReceived(mySlot, team);
    } else {
      sendTo(hostConn, data);
    }
  }

  function getTeams() { return { ...teams }; }
  function getTeam(slot) { return teams[slot]; }

  // ---- Battle actions ---------------------------------------
  function sendMove(index) {
    const data = { type: 'MOVE', slot: mySlot, index };
    if (isHost) {
      callbacks.onMoveReceived && callbacks.onMoveReceived(mySlot, index);
    } else {
      sendTo(hostConn, data);
    }
  }

  function sendSwitch(index) {
    const data = { type: 'SWITCH', slot: mySlot, index };
    if (isHost) {
      callbacks.onSwitchReceived && callbacks.onSwitchReceived(mySlot, index);
    } else {
      sendTo(hostConn, data);
    }
  }

  /** Host only — broadcast resolved turn to all guests */
  function broadcastTurnResult(logs, battleState) {
    send({ type: 'TURN_RESULT', logs, battleState });
  }

  /** Host only — tell a guest their Pokemon fainted and they need to switch */
  function broadcastSwitchRequired(player, slot) {
    send({ type: 'SWITCH_REQUIRED', player, slot });
  }

  /** Host only — broadcast game over */
  function broadcastGameOver(winner) {
    send({ type: 'GAME_OVER', winner });
  }

  // ---- Getters ----------------------------------------------
  function getIsHost()   { return isHost; }
  function getMySlot()   { return mySlot; }
  function getRoomCode() { return roomCode; }
  function getMode()     { return mode; }
  function getLobby()    { return { ...lobbySlots }; }

  /** In 2v2: slot 1&2 are Team A, slot 3&4 are Team B */
  function getMyTeamSide() {
    return mySlot <= 2 ? 'A' : 'B';
  }

  /** Battle-phase: given a battle-team player (1 or 2) and active pokemon index,
   *  return which slot (1-4) should be picking the move. */
  function getActiveController(battlePlayer, activePokemonIndex, gameMode2v2) {
    if (!gameMode2v2) return battlePlayer; // 1v1: player is the controller
    // 2v2: each player picks 6 pokemon, first 6 = lead slot, last 6 = support slot
    if (battlePlayer === 1) return activePokemonIndex < 6 ? 1 : 2;
    else                    return activePokemonIndex < 6 ? 3 : 4;
  }

  // ---- Cleanup ----------------------------------------------
  function destroy() {
    Object.values(conns).forEach(c => { try { c.close(); } catch {} });
    if (hostConn) { try { hostConn.close(); } catch {} }
    if (peer)     { try { peer.destroy();   } catch {} }
    peer = null; hostConn = null; conns = {};
    teams = {}; lobbySlots = {}; callbacks = {};
    isHost = false; mySlot = 1; roomCode = null;
  }

  return {
    createRoom, joinRoom,
    sendMyTeam, getTeams, getTeam,
    sendMove, sendSwitch,
    broadcastTurnResult, broadcastSwitchRequired, broadcastGameOver,
    send, sendToSlot,
    getIsHost, getMySlot, getRoomCode, getMode, getLobby,
    getMyTeamSide, getActiveController,
    destroy
  };
})();
