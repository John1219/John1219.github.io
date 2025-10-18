<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NFL Weekly Predictions</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Chosen Palette: Stadium Night -->
    <!-- Application Structure Plan: The application is designed as a single-page dashboard with two primary, switchable views: "This Week's Predictions" and "Past Weeks' Results". This structure was chosen to provide users with a clear, focused experience. The default view immediately presents the most current and relevant information (this week's games) using a visually scannable card layout. Detailed game analysis is hidden by default within modals, which are triggered by a "View Analysis" button on each card. This prevents information overload and allows users to optionally drill down into specifics without leaving the main view. The secondary view for past results uses a similar card layout for consistency and is controlled by a simple dropdown, making historical exploration intuitive. This separation of current vs. past and summary vs. detail creates a logical user flow that prioritizes ease of navigation and quick information absorption. -->
    <!-- Visualization & Content Choices: 
        - Report Info: Team matchups, predicted scores, and spreads. -> Goal: Inform/Compare -> Presentation: HTML/CSS Game Cards. -> Interaction: None. -> Justification: Cards are a standard, effective UI pattern for presenting discrete, comparable items. They allow for a clean, organized grid layout. -> Method: Tailwind CSS.
        - Report Info: Detailed game-by-game breakdown text. -> Goal: Inform (Detailed) -> Presentation: Text block inside a modal window. -> Interaction: Click "View Analysis" button to open, "Close" button to dismiss. -> Justification: Modals provide detailed context on-demand without disrupting the layout of the main page, focusing the user's attention. -> Method: Vanilla JS.
        - Report Info: All game predictions for the week. -> Goal: Organize/Explore -> Presentation: Interactive Navigation Tabs/Buttons ("This Week", "Past Weeks"). -> Interaction: Click to switch between the main content views. -> Justification: This is the core navigation for the SPA, allowing users to move between the two main content sections cleanly. -> Method: Vanilla JS.
        - Report Info: Historical game data (predicted vs. actual). -> Goal: Compare/Organize -> Presentation: Dropdown selector for week selection and dynamically rendered result cards. -> Interaction: Select a week from the dropdown to load its data. -> Justification: A dropdown is a space-efficient way to handle historical navigation with a potentially growing number of weeks. -> Method: Vanilla JS.
        - Report Info: Predicted score margin vs. consensus spread for each game. -> Goal: Compare/Analyze -> Presentation: Horizontal Bar Chart. -> Interaction: Hover for tooltips with specific values. -> Justification: A bar chart provides a powerful, at-a-glance visualization of performance against the spread, making it easy to see the biggest predicted upsets and safest bets. -> Library: Chart.js (Canvas).
        - Report Info: Week 6 Predictive Scorecard (Table 1). -> Goal: Summarize/Inform -> Presentation: Styled HTML Table. -> Interaction: None. -> Justification: A table is the most direct and clear way to present tabular data, providing a high-level summary before users explore individual game cards. -> Method: Tailwind CSS and dynamic JS rendering.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .team-logo {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.25rem;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.5);
        }
        .modal {
            transition: opacity 0.25s ease;
        }
        .modal-content {
            transition: transform 0.25s ease;
        }
        .nav-active {
            background-color: #4f46e5 !important;
            color: white !important;
        }
    </style>
     <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-900 text-gray-200">

    <header class="bg-gray-800 shadow-lg sticky top-0 z-40">
        <div class="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
            <h1 class="text-2xl md:text-3xl font-black text-white tracking-wider mb-4 sm:mb-0">
                <span class="text-indigo-400">NFL</span> FORECAST
            </h1>
            <nav id="main-nav" class="flex space-x-2 bg-gray-700 p-1 rounded-lg">
                <button data-view="predictions" class="nav-button nav-active px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200">This Week's Predictions</button>
                <button data-view="history" class="nav-button px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 hover:bg-gray-600">Past Weeks' Results</button>
            </nav>
        </div>
    </header>

    <main class="container mx-auto p-4 md:p-8">

        <section id="predictions-view">
            <div class="text-center mb-8">
                <h2 class="text-4xl font-bold text-white">Week 6 Predictions</h2>
                <p class="text-gray-400 mt-2 max-w-2xl mx-auto">Here are the analytical projections for all Week 6 matchups. Each prediction is based on a model synthesizing performance metrics, situational factors, and injury reports. Click on any game's analysis button for a detailed breakdown.</p>
            </div>

            <div id="summary-section" class="mb-12">
                 <div class="text-center mb-6">
                    <h3 class="text-3xl font-bold text-white">Week 6 Predictive Scorecard</h3>
                    <p class="text-gray-400 mt-2 max-w-2xl mx-auto">A quick overview of all projected matchups, spreads, and outcomes for the week.</p>
                </div>
                <div class="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-300">
                            <thead class="text-xs text-gray-400 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Matchup</th>
                                    <th scope="col" class="px-6 py-3">Time (ET)</th>
                                    <th scope="col" class="px-6 py-3">Consensus Spread</th>
                                    <th scope="col" class="px-6 py-3 text-center">Predicted Score</th>
                                    <th scope="col" class="px-6 py-3 text-center">Outcome vs. Spread</th>
                                </tr>
                            </thead>
                            <tbody id="summary-table-body" class="divide-y divide-gray-700">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="game-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
            
            <div class="mt-12 bg-gray-800 p-6 rounded-xl shadow-2xl">
                <h3 class="text-2xl font-bold text-center mb-1 text-white">Predicted Margin vs. Spread</h3>
                 <p class="text-gray-400 mt-1 mb-6 text-center text-sm max-w-2xl mx-auto">This chart visualizes the predicted margin of victory for the winning team compared to the consensus betting spread. Bars extending further to the right indicate a stronger predicted performance against the spread.</p>
                <div class="chart-container relative w-full h-96 max-h-[500px] max-w-4xl mx-auto">
                    <canvas id="spread-chart"></canvas>
                </div>
            </div>
        </section>

        <section id="history-view" class="hidden">
             <div class="text-center mb-8">
                <h2 class="text-4xl font-bold text-white">Past Weeks' Results</h2>
                 <p class="text-gray-400 mt-2 max-w-2xl mx-auto">Review the prediction accuracy from previous weeks. Select a week below to see the projected scores versus the actual final scores for each game.</p>
            </div>
            <div class="flex justify-center mb-6">
                <select id="week-selector" class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full max-w-xs p-2.5">
                    <option value="5">Week 5</option>
                    <option value="4">Week 4</option>
                    <option value="3">Week 3</option>
                </select>
            </div>
            <div id="history-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
        </section>

    </main>
    
    <footer class="text-center py-6 mt-8 border-t border-gray-700">
        <p class="text-gray-500 text-sm">&copy; 2025 NFL Forecast. All data is for entertainment purposes only.</p>
    </footer>

    <div id="analysis-modal" class="modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 opacity-0 pointer-events-none">
        <div class="modal-content bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
            <div class="sticky top-0 bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 id="modal-title" class="text-xl font-bold text-white">Game Analysis</h3>
                <button id="close-modal-btn" class="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div class="p-6">
                <p id="modal-body" class="text-gray-300 leading-relaxed"></p>
            </div>
        </div>
    </div>


    <script>
        const teamData = {
            'Philadelphia Eagles': { logo: 'PHI', color: '#004C54' },
            'New York Giants': { logo: 'NYG', color: '#0B2265' },
            'Denver Broncos': { logo: 'DEN', color: '#FB4F14' },
            'New York Jets': { logo: 'NYJ', color: '#003F2D' },
            'Los Angeles Rams': { logo: 'LAR', color: '#003594' },
            'Baltimore Ravens': { logo: 'BAL', color: '#241773' },
            'Atlanta Falcons': { logo: 'ATL', color: '#A71930' },
            'Buffalo Bills': { logo: 'BUF', color: '#00338D' },
            'Washington Commanders': { logo: 'WAS', color: '#5A1414' },
            'Chicago Bears': { logo: 'CHI', color: '#0B162A' },
        };

        const nflData = {
            week6: [
                { teams: { away: 'Philadelphia Eagles', home: 'New York Giants' }, time: 'Thu. 8:15 PM', spread: 'Eagles -7', prediction: { away: 17, home: 34 }, outcomeVsSpread: 'Giants Cover', analysis: "The Giants pull off a stunning upset against a struggling Eagles team. The Eagles' offensive line has been porous, and their secondary has been susceptible to big plays. The Giants, playing at home with a reinvigorated offense under Daniel Jones, capitalize on these weaknesses. Saquon Barkley finds running lanes, and the defense forces multiple turnovers, leading to a decisive home victory that defies the spread and public expectation." },
                { teams: { away: 'Denver Broncos', home: 'New York Jets' }, time: 'Sun. 9:30 AM', spread: 'Broncos -7.5', prediction: { away: 27, home: 10 }, outcomeVsSpread: 'Broncos Cover', analysis: "Denver's defense proves to be overwhelming for a Jets offense that has failed to find any rhythm. The Broncos' pass rush consistently pressures the quarterback, leading to sacks and rushed throws. Offensively, Denver controls the clock with a balanced attack, exploiting a Jets defense that spends too much time on the field. The game, played in London, becomes a one-sided affair as Denver easily covers the spread." },
                { teams: { away: 'Los Angeles Rams', home: 'Baltimore Ravens' }, time: 'Sun. 1:00 PM', spread: 'Ravens -3.5', prediction: { away: 24, home: 28 }, outcomeVsSpread: 'Ravens Cover', analysis: "In a clash of offensive philosophies, the Ravens' powerful running game, led by Lamar Jackson, wears down the Rams' front seven. While the Rams' passing attack keeps them in the game, Baltimore's ability to sustain long drives and control time of possession is the deciding factor. A late touchdown run by Jackson seals the victory and the cover for the Ravens at home." },
                { teams: { away: 'Atlanta Falcons', home: 'Buffalo Bills' }, time: 'Mon. 8:15 PM', spread: 'Bills -6.5', prediction: { away: 20, home: 31 }, outcomeVsSpread: 'Bills Cover', analysis: "The Bills, stinging from recent criticism and battling injuries, deliver a statement performance on Monday Night Football. Josh Allen is nearly flawless, connecting on deep passes and using his legs to extend plays. The Falcons' offense, despite having talented weapons, cannot keep pace. Buffalo's defense, feeding off the energy of their home crowd, creates key turnovers that put the game out of reach in the second half." },
                { teams: { away: 'Washington Commanders', home: 'Chicago Bears' }, time: 'Mon. 8:15 PM', spread: 'Bears -3', prediction: { away: 17, home: 23 }, outcomeVsSpread: 'Bears Cover', analysis: "This matchup evolves into a defensive slugfest. Both offenses struggle to find consistency, leading to a field-position battle. The Bears' defense, however, makes the one or two game-changing plays necessary, including a crucial late-game interception. Chicago's running game does just enough to set up field goals, allowing them to secure a hard-fought win and cover the small spread at home." }
            ],
            pastWeeks: {
                '5': [
                    { teams: { away: 'New York Jets', home: 'Atlanta Falcons' }, prediction: { away: 13, home: 24 }, actual: { away: 10, home: 27 } },
                    { teams: { away: 'Buffalo Bills', home: 'Kansas City Chiefs' }, prediction: { away: 28, home: 31 }, actual: { away: 38, home: 20 } },
                    { teams: { away: 'Chicago Bears', home: 'Las Vegas Raiders' }, prediction: { away: 17, home: 20 }, actual: { away: 20, home: 9 } },
                    { teams: { away: 'New York Giants', home: 'Dallas Cowboys' }, prediction: { away: 20, home: 34 }, actual: { away: 20, home: 44 } },
                ],
                '4': [
                    { teams: { away: 'Denver Broncos', home: 'Baltimore Ravens' }, prediction: { away: 17, home: 27 }, actual: { away: 7, home: 23 } },
                    { teams: { away: 'Washington Commanders', home: 'Atlanta Falcons' }, prediction: { away: 24, home: 30 }, actual: { away: 34, home: 30 } },
                    { teams: { away: 'Philadelphia Eagles', home: 'Kansas City Chiefs' }, prediction: { away: 31, home: 35 }, actual: { away: 30, home: 42 } },
                ],
                '3': [
                    { teams: { away: 'Los Angeles Rams', home: 'Tampa Bay Buccaneers' }, prediction: { away: 27, home: 31 }, actual: { away: 34, home: 24 } },
                    { teams: { away: 'Atlanta Falcons', home: 'New York Giants' }, prediction: { away: 23, home: 20 }, actual: { away: 17, home: 14 } },
                ]
            }
        };

        document.addEventListener('DOMContentLoaded', () => {
            const gameCardsContainer = document.getElementById('game-cards-container');
            const summaryTableBody = document.getElementById('summary-table-body');
            const historyCardsContainer = document.getElementById('history-cards-container');
            const weekSelector = document.getElementById('week-selector');
            const mainNav = document.getElementById('main-nav');
            const views = {
                predictions: document.getElementById('predictions-view'),
                history: document.getElementById('history-view')
            };
            const modal = document.getElementById('analysis-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            const closeModalBtn = document.getElementById('close-modal-btn');
            
            let spreadChart = null;

            const getTeamInfo = (name) => teamData[name] || { logo: name.substring(0, 3).toUpperCase(), color: '#6B7280' };

            const createGameCard = (game) => {
                const awayInfo = getTeamInfo(game.teams.away);
                const homeInfo = getTeamInfo(game.teams.home);
                const card = document.createElement('div');
                card.className = 'bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col transition-transform transform hover:scale-105';
                
                card.innerHTML = `
                    <div class="flex-grow">
                        <p class="text-xs text-center text-gray-400 mb-3">${game.time} | Spread: ${game.spread}</p>
                        <div class="flex justify-between items-center text-center">
                            <div class="flex-1 flex flex-col items-center">
                                <div class="team-logo" style="background-color: ${awayInfo.color};">${awayInfo.logo}</div>
                                <span class="font-bold mt-2 text-sm">${game.teams.away}</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center">
                                <span class="text-4xl font-black text-gray-400">@</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center">
                                <div class="team-logo" style="background-color: ${homeInfo.color};">${homeInfo.logo}</div>
                                <span class="font-bold mt-2 text-sm">${game.teams.home}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4 border-t-2 border-dashed border-gray-700 pt-4">
                             <div class="flex-1 text-center">
                                <span class="text-3xl font-bold text-indigo-400">${game.prediction.away}</span>
                            </div>
                            <div class="flex-1 text-center">
                                <span class="text-3xl font-bold text-indigo-400">${game.prediction.home}</span>
                            </div>
                        </div>
                    </div>
                    <button class="view-analysis-btn mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-200">View Analysis</button>
                `;
                card.querySelector('.view-analysis-btn').addEventListener('click', () => {
                    modalTitle.textContent = `${game.teams.away} @ ${game.teams.home}`;
                    modalBody.textContent = game.analysis;
                    modal.classList.remove('opacity-0', 'pointer-events-none');
                    modal.querySelector('.modal-content').classList.remove('scale-95');
                });
                return card;
            };

            const createHistoryCard = (game) => {
                const awayInfo = getTeamInfo(game.teams.away);
                const homeInfo = getTeamInfo(game.teams.home);
                const predictedWinner = game.prediction.away > game.prediction.home ? 'away' : 'home';
                const actualWinner = game.actual.away > game.actual.home ? 'away' : 'home';
                const correctPick = predictedWinner === actualWinner;

                return `
                    <div class="bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col">
                        <div class="flex justify-between items-center mb-2">
                             <span class="text-sm font-semibold text-gray-300">${game.teams.away}</span>
                             <span class="text-sm font-semibold text-gray-300">${game.teams.home}</span>
                        </div>
                        <div class="bg-gray-700 rounded p-2 mb-2">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-400">Predicted:</span>
                                <div>
                                    <span class="font-bold ${predictedWinner === 'away' ? 'text-green-400' : ''}">${game.prediction.away}</span>
                                    -
                                    <span class="font-bold ${predictedWinner === 'home' ? 'text-green-400' : ''}">${game.prediction.home}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-900 rounded p-2">
                             <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-400">Actual:</span>
                                <div>
                                    <span class="font-bold ${actualWinner === 'away' ? 'text-white' : ''}">${game.actual.away}</span>
                                    -
                                    <span class="font-bold ${actualWinner === 'home' ? 'text-white' : ''}">${game.actual.home}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-center text-xs font-bold py-1 rounded ${correctPick ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                            ${correctPick ? 'CORRECT PICK' : 'INCORRECT PICK'}
                        </div>
                    </div>
                `;
            };

            const renderSummaryTable = () => {
                summaryTableBody.innerHTML = '';
                nflData.week6.forEach(game => {
                    const outcomeText = game.outcomeVsSpread;
                    const isCover = outcomeText.toLowerCase().includes('cover');
                    const outcomeColorClass = isCover ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300';
                    const outcomeBadge = `<span class="px-2 py-1 font-semibold text-xs rounded-full ${outcomeColorClass}">${outcomeText}</span>`;

                    const row = `
                        <tr class="bg-gray-800 hover:bg-gray-700/50">
                            <td class="px-6 py-4 font-medium text-white">${game.teams.away} @ ${game.teams.home}</td>
                            <td class="px-6 py-4">${game.time}</td>
                            <td class="px-6 py-4">${game.spread}</td>
                            <td class="px-6 py-4 text-center font-mono tracking-wider">${game.prediction.away} - ${game.prediction.home}</td>
                            <td class="px-6 py-4 text-center">${outcomeBadge}</td>
                        </tr>
                    `;
                    summaryTableBody.innerHTML += row;
                });
            };
            
            const renderPredictions = () => {
                gameCardsContainer.innerHTML = '';
                nflData.week6.forEach(game => {
                    gameCardsContainer.appendChild(createGameCard(game));
                });
            };

            const renderHistory = (week) => {
                historyCardsContainer.innerHTML = '';
                const weekData = nflData.pastWeeks[week] || [];
                weekData.forEach(game => {
                    historyCardsContainer.innerHTML += createHistoryCard(game);
                });
            };
            
            const renderSpreadChart = () => {
                const ctx = document.getElementById('spread-chart').getContext('2d');
                
                const chartData = nflData.week6.map(game => {
                    const spreadMatch = game.spread.match(/([A-Za-z\s]+) (-?\d+\.?\d*)/);
                    if (!spreadMatch) return { label: '', value: 0, color: '#4f46e5' };

                    const favTeam = spreadMatch[1].trim();
                    const spreadValue = parseFloat(spreadMatch[2]);
                    
                    const isAwayFav = game.teams.away.includes(favTeam);
                    const homeSpread = isAwayFav ? -spreadValue : spreadValue;
                    
                    const predictedMargin = game.prediction.home - game.prediction.away;
                    const marginVsSpread = predictedMargin - homeSpread;
                    
                    const predictedWinner = game.prediction.home > game.prediction.away ? game.teams.home : game.teams.away;
                    
                    return {
                        label: `${game.teams.away} @ ${game.teams.home}`,
                        value: game.prediction.home > game.prediction.away ? predictedMargin + homeSpread : -predictedMargin - homeSpread,
                        color: marginVsSpread > 0 ? '#10B981' : '#EF4444',
                        winner: predictedWinner
                    };
                }).sort((a, b) => b.value - a.value);

                if (spreadChart) {
                    spreadChart.destroy();
                }

                spreadChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartData.map(d => d.label),
                        datasets: [{
                            label: 'Predicted Margin vs. Spread',
                            data: chartData.map(d => d.value),
                            backgroundColor: chartData.map(d => d.color),
                            borderColor: chartData.map(d => d.color.replace(')', ', 0.5)').replace('rgb', 'rgba')),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                beginAtZero: true,
                                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                ticks: { 
                                    color: '#9CA3AF',
                                    font: {
                                        weight: 'bold'
                                    }
                                }
                            },
                            y: {
                                grid: { display: false },
                                ticks: { 
                                    color: '#D1D5DB',
                                     font: {
                                        size: 10
                                    }
                                 }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const dataPoint = chartData[context.dataIndex];
                                        return `${dataPoint.winner} predicted to cover by ${context.raw.toFixed(1)} points.`;
                                    }
                                }
                            }
                        }
                    }
                });
            };

            mainNav.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-button')) {
                    const view = e.target.dataset.view;
                    
                    Object.values(views).forEach(v => v.classList.add('hidden'));
                    views[view].classList.remove('hidden');

                    mainNav.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('nav-active'));
                    e.target.classList.add('nav-active');
                }
            });

            closeModalBtn.addEventListener('click', () => {
                modal.classList.add('opacity-0', 'pointer-events-none');
                modal.querySelector('.modal-content').classList.add('scale-95');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalBtn.click();
                }
            });

            weekSelector.addEventListener('change', (e) => {
                renderHistory(e.target.value);
            });
            
            renderSummaryTable();
            renderPredictions();
            renderHistory(weekSelector.value);
            renderSpreadChart();
        });

    </script>
</body>
</html>

