import requests
from bs4 import BeautifulSoup
import csv
import time

# List of NFL team codes as used by Ourlads
TEAM_CODES = [
    'BUF', 'MIA', 'NE', 'NYJ',  # AFC East
    'BAL', 'CIN', 'CLE', 'PIT',  # AFC North
    'HOU', 'IND', 'JAX', 'TEN',  # AFC South
    'DEN', 'KC', 'LV', 'LAC',    # AFC West
    'DAL', 'NYG', 'PHI', 'WAS',  # NFC East
    'CHI', 'DET', 'GB', 'MIN',   # NFC North
    'ATL', 'CAR', 'NO', 'TB',    # NFC South
    'ARZ', 'LAR', 'SF', 'SEA'    # NFC West
]

BASE_URL = 'https://www.ourlads.com/nfldepthcharts/depthchart/'

with open('data/NFL_depth_charts.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Team', 'Position', 'Starter', '2nd', '3rd', '4th'])
    for team in TEAM_CODES:
        url = f'{BASE_URL}{team}'
        print(f'Fetching {team} depth chart...')
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Find all tables (offense, defense, special teams)
        tables = soup.find_all('table')
        if not tables:
            print(f'No table found for {team}.')
            continue

        def get_player(cells, idx):
            num = cells[idx].get_text(strip=True) if idx < len(cells) else ''
            name = cells[idx+1].get_text(strip=True) if idx+1 < len(cells) else ''
            if num and name:
                return f"{num} {name}"
            elif name:
                return name
            elif num:
                return num
            else:
                return ''

        for table in tables:
            rows = table.find_all('tr')
            for row in rows[1:]:  # Skip header row
                cells = row.find_all('td')
                if len(cells) >= 9:
                    position = cells[0].get_text(strip=True)
                    starter = get_player(cells, 1)
                    second = get_player(cells, 3)
                    third = get_player(cells, 5)
                    fourth = get_player(cells, 7)
                    writer.writerow([team, position, starter, second, third, fourth])
        time.sleep(1)  # Be polite to the server

print('Combined depth chart saved as data/NFL_depth_charts.csv.')