/*
  ===================================================================
  🚀 MANUAL DATABASE & APP LOGIC
  ===================================================================
*/

// --- 1. DATA: TEAMS ---
// Edit this list to change team names and players
const TEAMS = [
    { id: 't1', name: 'The Smasher Bros', color: 'bg-blue-600', p1: 'Alex Ruiz', p2: 'Mike Torres' },
    { id: 't2', name: 'Net Assets', color: 'bg-red-600', p1: 'Sarah Lee', p2: 'Jenny Kim' },
    { id: 't3', name: 'Court Jesters', color: 'bg-green-600', p1: 'David Beckham', p2: 'Tom Hardy' },
    { id: 't4', name: 'Top Spinners', color: 'bg-purple-600', p1: 'Emily Watson', p2: 'Chris Martin' },
    { id: 't5', name: 'Vibora Vipers', color: 'bg-yellow-500', p1: 'Carlos S.', p2: 'Juan L.' },
    { id: 't6', name: 'Bandeja Bandits', color: 'bg-orange-500', p1: 'Rick Sanchez', p2: 'Morty Smith' },
    { id: 't7', name: 'Glass Breakers', color: 'bg-cyan-500', p1: 'Walter W.', p2: 'Jesse P.' },
    { id: 't8', name: 'Lob Stars', color: 'bg-pink-500', p1: 'Barbie R.', p2: 'Ken D.' }
];

// --- 2. DATA: MATCHES ---
// Status options: 'LIVE', 'SCHEDULED', 'FINISHED'
// Edit this list to add matches and update scores
const MATCHES = [
    // --- Live Matches ---
    {
        id: 'm1', t1: 't1', t2: 't3',
        time: 'Now Playing', court: 'Center Court', status: 'LIVE',
        scores: [{s1: 6, s2: 4}, {s1: 3, s2: 3}], // Team 1 won first set, second set tied
        round: 'Group A'
    },
    {
        id: 'm2', t1: 't2', t2: 't4',
        time: 'Now Playing', court: 'Court 2', status: 'LIVE',
        scores: [{s1: 2, s2: 5}], // First set in progress
        round: 'Group A'
    },

    // --- Upcoming Matches ---
    {
        id: 'm3', t1: 't5', t2: 't7',
        time: 'Tomorrow, 09:00', court: 'Center Court', status: 'SCHEDULED',
        scores: [], round: 'Group B'
    },
    {
        id: 'm4', t1: 't6', t2: 't8',
        time: 'Tomorrow, 10:30', court: 'Court 2', status: 'SCHEDULED',
        scores: [], round: 'Group B'
    },
    {
        id: 'm5', t1: 't1', t2: 't4',
        time: 'Nov 4, 14:00', court: 'Center Court', status: 'SCHEDULED',
        scores: [], round: 'Finals'
    },

    // --- Finished Matches ---
    {
        id: 'm6', t1: 't1', t2: 't2',
        time: 'Yesterday', court: 'Center Court', status: 'FINISHED',
        scores: [{s1: 6, s2: 4}, {s1: 6, s2: 2}],
        winner: 't1', round: 'Group A'
    },
    {
        id: 'm7', t1: 't3', t2: 't4',
        time: 'Yesterday', court: 'Court 2', status: 'FINISHED',
        scores: [{s1: 4, s2: 6}, {s1: 7, s2: 5}, {s1: 3, s2: 6}],
        winner: 't4', round: 'Group A'
    },
    {
        id: 'm8', t1: 't5', t2: 't6',
        time: 'Yesterday', court: 'Center Court', status: 'FINISHED',
        scores: [{s1: 6, s2: 0}, {s1: 6, s2: 1}],
        winner: 't5', round: 'Group B'
    },
    {
        id: 'm9', t1: 't7', t2: 't8',
        time: 'Yesterday', court: 'Court 3', status: 'FINISHED',
        scores: [{s1: 5, s2: 7}, {s1: 4, s2: 6}],
        winner: 't8', round: 'Group B'
    }
];

// --- 3. APP LOGIC (DO NOT TOUCH UNLESS YOU KNOW JS) ---

function getTeam(id) {
    return TEAMS.find(t => t.id === id) || { name: 'Unknown', color: 'bg-gray-500', p1: '', p2: '' };
}

// Helper to create HTML for a single match
function createMatchHTML(match) {
    const team1 = getTeam(match.t1);
    const team2 = getTeam(match.t2);
    
    const isLive = match.status === 'LIVE';
    const isFinished = match.status === 'FINISHED';
    const t1Winner = match.winner === team1.id;
    const t2Winner = match.winner === team2.id;
    
    // Status Badge
    let statusHtml = '';
    if (isLive) {
        statusHtml = `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 animate-pulse border border-red-500/30"><span class="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>LIVE</span>`;
    } else if (isFinished) {
        statusHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">FT</span>`;
    } else {
        statusHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-padel-blue/30 text-blue-200 border border-blue-500/20">${match.time}</span>`;
    }

    // Scores
    const renderScores = (isT1) => {
        if (!match.scores || match.scores.length === 0) return '';
        return `<div class="flex gap-2 text-lg font-mono">
            ${match.scores.map(s => {
                const val = isT1 ? s.s1 : s.s2;
                const opp = isT1 ? s.s2 : s.s1;
                const color = val > opp ? 'text-padel-accent' : 'text-slate-400';
                return `<span class="w-6 text-center ${color}">${val}</span>`;
            }).join('')}
        </div>`;
    };

    return `
    <div class="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-padel-accent/50 transition-colors duration-300">
        <div class="bg-slate-800/80 px-4 py-2 flex justify-between items-center text-xs text-slate-400 border-b border-slate-700/50">
            <div class="flex items-center gap-2">
                <span class="font-semibold text-padel-accent/80">${match.round}</span>
                <span>•</span>
                <span>${match.court}</span>
            </div>
            ${statusHtml}
        </div>
        <div class="p-4">
            <!-- Team 1 -->
            <div class="flex justify-between items-center mb-3 ${t1Winner ? 'font-bold text-white' : 'text-slate-300'}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${team1.color}">
                        ${team1.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base leading-tight">${team1.name}</span>
                        <span class="text-xs text-slate-500 font-normal">${team1.p1} / ${team1.p2}</span>
                    </div>
                </div>
                ${renderScores(true)}
            </div>
            <!-- Team 2 -->
            <div class="flex justify-between items-center ${t2Winner ? 'font-bold text-white' : 'text-slate-300'}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${team2.color}">
                        ${team2.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base leading-tight">${team2.name}</span>
                        <span class="text-xs text-slate-500 font-normal">${team2.p1} / ${team2.p2}</span>
                    </div>
                </div>
                ${renderScores(false)}
            </div>
        </div>
    </div>
    `;
}

// Render Matches Page
function renderSchedule() {
    const container = document.getElementById('view-matches');
    if (!container) return;
    
    let html = '';

    // Live Section
    const live = MATCHES.filter(m => m.status === 'LIVE');
    if (live.length > 0) {
        html += `
        <section>
            <div class="flex items-center gap-2 mb-4">
                <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h2 class="text-xl font-bold text-white uppercase tracking-wider">Happening Now</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${live.map(createMatchHTML).join('')}
            </div>
        </section>`;
    }

    // Scheduled Section
    const scheduled = MATCHES.filter(m => m.status === 'SCHEDULED');
    html += `
    <section>
        <h2 class="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-padel-accent pl-3">Upcoming</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${scheduled.length ? scheduled.map(createMatchHTML).join('') : '<p class="text-slate-400">No upcoming matches.</p>'}
        </div>
    </section>`;

    // Finished Section
    const finished = MATCHES.filter(m => m.status === 'FINISHED');
    if (finished.length > 0) {
        html += `
        <section>
            <h2 class="text-xl font-bold text-slate-400 mb-4 uppercase tracking-wider">Completed</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                ${finished.map(createMatchHTML).join('')}
            </div>
        </section>`;
    }

    container.innerHTML = html;
}

// Render Standings Page
function renderStandings() {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;

    // Calculate points
    const teamStats = TEAMS.map(team => {
        const playedMatches = MATCHES.filter(m => (m.t1 === team.id || m.t2 === team.id) && m.status === 'FINISHED');
        const wins = playedMatches.filter(m => m.winner === team.id).length;
        const losses = playedMatches.length - wins;
        const points = (wins * 3) + (losses * 1);
        return { ...team, played: playedMatches.length, wins, losses, points };
    }).sort((a, b) => b.points - a.points); // Sort highest points first

    tbody.innerHTML = teamStats.map((team, index) => {
        const rank = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;
        return `
            <tr class="hover:bg-slate-700/30 transition-colors">
                <td class="p-4 text-slate-500 font-mono">${rank}</td>
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full ${team.color} flex items-center justify-center text-white text-xs font-bold">
                            ${team.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div class="font-bold text-white">${team.name}</div>
                            <div class="text-xs text-slate-500">${team.p1} & ${team.p2}</div>
                        </div>
                    </div>
                </td>
                <td class="p-4 text-center text-slate-300">${team.played}</td>
                <td class="p-4 text-center text-green-400">${team.wins}</td>
                <td class="p-4 text-center text-red-400">${team.losses}</td>
                <td class="p-4 text-right font-bold text-padel-accent text-lg">${team.points}</td>
            </tr>
        `;
    }).join('');
}

// --- 4. INIT & TAB LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    console.log('App Loaded');
    renderSchedule();
    renderStandings();

    const btnMatches = document.getElementById('btn-matches');
    const btnStandings = document.getElementById('btn-standings');
    const viewMatches = document.getElementById('view-matches');
    const viewStandings = document.getElementById('view-standings');

    // Active/Inactive Classes
    const activeClasses = ['bg-slate-800', 'text-padel-accent', 'shadow-sm', 'ring-1', 'ring-slate-700'];
    const inactiveClasses = ['text-slate-400', 'hover:text-white', 'hover:bg-slate-800/50'];

    btnMatches.onclick = () => {
        viewMatches.classList.remove('hidden');
        viewStandings.classList.add('hidden');
        
        btnMatches.classList.add(...activeClasses);
        btnMatches.classList.remove(...inactiveClasses);
        btnStandings.classList.remove(...activeClasses);
        btnStandings.classList.add(...inactiveClasses);
    };

    btnStandings.onclick = () => {
        viewMatches.classList.add('hidden');
        viewStandings.classList.remove('hidden');
        
        btnStandings.classList.add(...activeClasses);
        btnStandings.classList.remove(...inactiveClasses);
        btnMatches.classList.remove(...activeClasses);
        btnMatches.classList.add(...inactiveClasses);
    };
});