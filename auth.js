// ============================================================
// POKEMON BATTLE ARENA - Authentication System
// localStorage-based accounts (no backend required)
// ============================================================

const Auth = (() => {
  const ACCOUNTS_KEY = 'pkbattle_accounts';
  const SESSION_KEY  = 'pkbattle_session';

  // djb2-style hash — not cryptographically secure; fine for a class project
  function hashPassword(password) {
    let hash = 5381;
    for (let i = 0; i < password.length; i++) {
      hash = ((hash << 5) + hash + password.charCodeAt(i)) >>> 0;
    }
    return hash.toString(36);
  }

  function getAccounts() {
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  function register(username, password) {
    username = (username || '').trim();
    password = (password || '');
    if (!username || !password)       return { ok: false, error: 'Both fields are required' };
    if (username.length < 3)          return { ok: false, error: 'Username: min 3 characters' };
    if (username.length > 20)         return { ok: false, error: 'Username: max 20 characters' };
    if (!/^[a-zA-Z0-9_]+$/.test(username))
                                      return { ok: false, error: 'Letters, numbers and _ only' };
    if (password.length < 4)          return { ok: false, error: 'Password: min 4 characters' };

    const accounts = getAccounts();
    const key = username.toLowerCase();
    if (accounts[key])                return { ok: false, error: 'Username already taken' };

    accounts[key] = {
      username,
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
      stats: { wins: 0, losses: 0, battles: 0, onlineWins: 0, onlineLosses: 0 }
    };
    saveAccounts(accounts);

    // Auto-login after register
    const session = { username, loginTime: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, user: accounts[key] };
  }

  function login(username, password) {
    username = (username || '').trim();
    if (!username || !password) return { ok: false, error: 'Both fields are required' };

    const accounts = getAccounts();
    const account  = accounts[username.toLowerCase()];
    if (!account)                                      return { ok: false, error: 'Account not found' };
    if (account.passwordHash !== hashPassword(password)) return { ok: false, error: 'Wrong password' };

    const session = { username: account.username, loginTime: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, user: account };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  function updateStats(username, type) {
    const accounts = getAccounts();
    const account  = accounts[(username || '').toLowerCase()];
    if (!account) return;
    const s = account.stats;
    s.battles      = (s.battles || 0) + 1;
    if (type === 'win')          s.wins        = (s.wins || 0) + 1;
    if (type === 'loss')         s.losses      = (s.losses || 0) + 1;
    if (type === 'online-win')  { s.onlineWins  = (s.onlineWins || 0) + 1; }
    if (type === 'online-loss') { s.onlineLosses= (s.onlineLosses || 0) + 1; }
    saveAccounts(accounts);
  }

  function getStats(username) {
    const accounts = getAccounts();
    const account  = accounts[(username || '').toLowerCase()];
    return account
      ? { ...account.stats }
      : { wins: 0, losses: 0, battles: 0, onlineWins: 0, onlineLosses: 0 };
  }

  return { register, login, logout, getCurrentUser, updateStats, getStats };
})();
