import {ATTACK_SHIPS, LOOT_SHIPS, Player, stringToColour, TRADE_SHIPS, Turn} from "./observer";

function sum(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0);
}

export function leaderboard(players: Player[], turn: Turn) {
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
        const ships = Object.values(turn.ships).filter((ship) => {
            return ship.player_index === player.index && !ship.is_wreck;
        }).map((ship) => {
            return {
                ship: ship,
                ship_type: turn.ship_types[ship.index],
            };
        })
        const trade_ships = ships.filter((ship) => {
            return TRADE_SHIPS.includes(ship.ship_type);
        });
        const attack_ships = ships.filter((ship) => {
            return ATTACK_SHIPS.includes(ship.ship_type);
        });
        const loot_ships = ships.filter((ship) => {
            return LOOT_SHIPS.includes(ship.ship_type);
        });
        const trade_ship_count = trade_ships.length;
        const attack_ship_count = attack_ships.length;
        const loot_ship_count = loot_ships.length;
        
        const average_money_per_trade_ship = sum(trade_ships.map((ship) => {
            return ship.ship.resources.gold;
        })) / trade_ship_count;
        const average_money_per_loot_ship = sum(loot_ships.map((ship) => {
            return ship.ship.resources.gold;
        })) / loot_ship_count;
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
                    <p>Gold on ships: ${player.score.current_gold - player.gold}</p>
                    <p>Earned: ${player.score.gold_earned}</p>
                    <p>Kills: ${player.score.kills}</p>
                    <p>Sells: ${player.score.sells_to_harbor}</p>
                    <p>Purchases: ${player.score.purchases_from_harbor}</p>
                </div>
                <div class="data">
                    <p>avg money / trade ship ${average_money_per_trade_ship.toFixed(3)}</p>
                    <p>avg money / loot ship: ${average_money_per_loot_ship.toFixed(3)}</p>
                </div>
                <div class="data">
                    <p>Ships: ${ships.length}</p>
                    <p>Trade: ${trade_ship_count}</p>
                    <p>Attack: ${attack_ship_count}</p>
                    <p>Loot: ${loot_ship_count}</p>
                </div>
            </div>
            `
    }).join('')}
    </div>
    `
}