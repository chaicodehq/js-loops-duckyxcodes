/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) return [];

  let teamTable = {};

  const createTeam = (teamName) => ({
    team: teamName,
    played: 0,
    won: 0,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 0,
  });

  for (const match of matches) {
    const team1 = match.team1;
    const team2 = match.team2;

    if (!teamTable.hasOwnProperty(team1)) teamTable[team1] = createTeam(team1);
    if (!teamTable.hasOwnProperty(team2)) teamTable[team2] = createTeam(team2);

    const t1 = teamTable[team1];
    const t2 = teamTable[team2];

    t1.played++;
    t2.played++;

    if (match.winner === team1) {
      t1.won++;
      t1.points += 2;
      t2.lost++;
    } else if (match.winner === team2) {
      t2.won++;
      t2.points += 2;
      t1.lost++;
    }

    if (match.result.toLowerCase() === "tie") {
      t1.tied++;
      t1.points++;
      t2.tied++;
      t2.points++;
    }

    if (match.result.toLowerCase() === "no_result") {
      t1.noResult++;
      t1.points++;
      t2.noResult++;
      t2.points++;
    }
  }

  const teamStats = Object.values(teamTable).sort(
    (a, b) => b.points - a.points || a.team.localeCompare(b.team),
  );

  return teamStats;
}
