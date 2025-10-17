// Load shared menu from menu.html into #shared-menu
document.addEventListener('DOMContentLoaded', function() {
	var menuContainer = document.getElementById('shared-menu');
	if (menuContainer) {
		fetch('menu.html')
			.then(response => response.text())
			.then(html => {
				// Extract only the <nav>...</nav> part if menu.html contains extra markup
				var tempDiv = document.createElement('div');
				tempDiv.innerHTML = html;
				var nav = tempDiv.querySelector('nav');
				if (nav) {
					menuContainer.innerHTML = '';
					menuContainer.appendChild(nav);
				} else {
					menuContainer.innerHTML = html;
				}
			});
	}

	// Load news module if present
	var newsModule = document.getElementById('news-module');
	if (newsModule) {
		fetch('news-module.html')
			.then(response => response.text())
			.then(html => {
				newsModule.innerHTML = html;
				fetchNFLNews();
			});
	}
});

// Fetch and display ESPN NFL RSS feed headlines
function fetchNFLNews() {
	const rssUrl = 'https://www.espn.com/espn/rss/nfl/news?null';
	fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl))
		.then(response => response.json())
		.then(data => {
			const newsList = document.getElementById('nfl-news-list');
			if (newsList && data.items) {
				newsList.innerHTML = '';
				data.items.slice(0, 10).forEach(item => {
					const li = document.createElement('li');
					li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
					newsList.appendChild(li);
				});
			}
		})
		.catch(() => {
			const newsList = document.getElementById('nfl-news-list');
			if (newsList) {
				newsList.innerHTML = '<li>Unable to load news at this time.</li>';
			}
		});
}

// --- NFL Depth Chart Module ---
document.addEventListener('DOMContentLoaded', function() {
	const teamSelect = document.getElementById('team-select');
	const tableContainer = document.getElementById('depthchart-table-container');
	const linkContainer = document.getElementById('depthchart-link');
	if (teamSelect && tableContainer) {
		fetch('data/NFL_depth_charts.csv')
			.then(response => response.text())
			.then(csvText => {
				const rows = csvText.split(/\r?\n/).filter(r => r.trim().length > 0);
				const header = rows[0].split(',');
				const data = rows.slice(1).map(row => {
					// Handle quoted fields and commas
					const regex = /(?:"([^"]*)")|([^,]+)/g;
					let match, fields = [];
					let i = 0;
					while ((match = regex.exec(row)) !== null) {
						fields.push(match[1] || match[2]);
						i++;
					}
					while (fields.length < header.length) fields.push('');
					return fields;
				});
				// Get unique teams
				const teams = Array.from(new Set(data.map(d => d[0])));
				// Team name mapping
				const teamNames = {
					BUF: 'Buffalo Bills', MIA: 'Miami Dolphins', NE: 'New England Patriots', NYJ: 'New York Jets',
					BAL: 'Baltimore Ravens', CIN: 'Cincinnati Bengals', CLE: 'Cleveland Browns', PIT: 'Pittsburgh Steelers',
					HOU: 'Houston Texans', IND: 'Indianapolis Colts', JAX: 'Jacksonville Jaguars', TEN: 'Tennessee Titans',
					DEN: 'Denver Broncos', KC: 'Kansas City Chiefs', LV: 'Las Vegas Raiders', LAC: 'Los Angeles Chargers',
					DAL: 'Dallas Cowboys', NYG: 'New York Giants', PHI: 'Philadelphia Eagles', WAS: 'Washington Commanders',
					CHI: 'Chicago Bears', DET: 'Detroit Lions', GB: 'Green Bay Packers', MIN: 'Minnesota Vikings',
					ATL: 'Atlanta Falcons', CAR: 'Carolina Panthers', NO: 'New Orleans Saints', TB: 'Tampa Bay Buccaneers',
					ARZ: 'Arizona Cardinals', LAR: 'Los Angeles Rams', SF: 'San Francisco 49ers', SEA: 'Seattle Seahawks'
				};
				// Populate select
				teamSelect.innerHTML = teams.map(code => `<option value="${code}">${teamNames[code] || code}</option>`).join('');
				// Render table for selected team
				function renderTable(teamCode) {
					const teamRows = data.filter(d => d[0] === teamCode);
					let html = `<table class="depthchart-table"><thead><tr>`;
					html += header.slice(1).map(h => `<th>${h}</th>`).join('');
					html += `</tr></thead><tbody>`;
					teamRows.forEach(row => {
						html += '<tr>' + row.slice(1).map((cell, i) => `<td${i === 1 ? ' class="starter"' : ''}>${cell || '-'}</td>`).join('') + '</tr>';
					});
					html += '</tbody></table>';
					tableContainer.innerHTML = html;
					// Add Ourlads link
					linkContainer.innerHTML = `<a class="depthchart-link-btn" href="https://www.ourlads.com/nfldepthcharts/depthchart/${teamCode}" target="_blank">View on Ourlads</a>`;
				}
				teamSelect.addEventListener('change', e => renderTable(e.target.value));
				renderTable(teams[0]);
			});
	}
});
