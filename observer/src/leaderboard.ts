import { Player, stringToColour } from "./observer";

export function leaderboard(players: Player[]) {
    const parent = document.querySelector<HTMLDivElement>('#leaderboard')!;
    parent.innerHTML = `
    <div class="leaderboard">
        <h1>Leaderboard</h1>
        ${players.sort((a, b) => {
            if (a.name === 'M7M') return -1;
            if (b.name === 'M7M') return 1;
            if (a.name.includes('Piracy')) return -1;
            if (b.name.includes('Piracy')) return 1;
            return a.name.localeCompare(b.name);
      }
    ).map((player) => {
        return `
            <div class="player">
                <header>
                    <div class="player-name">
                        <div class="player-pill" style="background-color: ${stringToColour(player.name)}"></div>
                        <p>${player.name}</p>
                    </div>
                    <p>${player.score.final_score}</p>
                </header>
                <div class="data">
                    <p>Base Gold: ${player.gold}</p>
                    <p>Gold: ${player.score.current_gold}</p>
                    <p>Earned: ${player.score.gold_earned}</p>
                    <p>Kills: ${player.score.kills}</p>
                    <p>Sells: ${player.score.sells_to_harbor}</p>
                    <p>Purchases: ${player.score.purchases_from_harbor}</p>
                </div>
            </div>
            `
    }).join('')}
    </div>
    `
}