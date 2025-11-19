import Image from "next/image";

export default async function GameDetails({ params }) {
  // params is an object — no await
  const { id } = await params;

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p>Error loading game details.</p>;
  }

  const data = await res.json();
  const header = data.header;
  const teams = data.boxscore?.teams || [];
  const playerGroups = data.boxscore?.players || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {header?.competitions?.[0]?.competitors?.[0]?.team?.displayName} vs{" "}
        {header?.competitions?.[0]?.competitors?.[1]?.team?.displayName}
      </h1>

      {/* Teams Section */}
      <div>
        {teams.map((team) => (
          <div key={team.team?.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{team.team?.shortDisplayName}</h2>

            {/* Note: remote image domains must be configured in next.config.js or use unoptimized */}
            <Image
              src={team.team?.logo || ""}
              alt={`${team.team?.shortDisplayName ?? "Team"} logo`}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>

      {/* Player Stats Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Player Stats</h2>

        {playerGroups.map((teamGroup) => {
          const teamId = teamGroup.team?.id ?? teamGroup.team?.shortDisplayName;
          const teamName = teamGroup.team?.shortDisplayName ?? "Team";
          const statistics0 = teamGroup.statistics?.[0] ?? {};
          const descriptions = statistics0.descriptions || []; // labels
          const athletes = statistics0.athletes || [];

          return (
            <div key={teamId} className="mb-6">
              <h3 className="font-semibold mb-2">{teamName}</h3>

              {/* Table for readable label ↔ value alignment */}
              <div className="overflow-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border">Player</th>
                      {descriptions.map((label, i) => (
                        <th key={i} className="text-left p-2 border">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {athletes.map((playerEntry) => {
                      const playerId = playerEntry.athlete?.id ?? playerEntry.athlete?.displayName;
                      const playerName = playerEntry.athlete?.displayName ?? "Unknown";
                      const statsArray = playerEntry.stats || [];

                      return (
                        <tr key={playerId}>
                          <td className="p-2 border font-medium">{playerName}</td>

                          {descriptions.map((_, i) => (
                            <td key={i} className="p-2 border">
                              {statsArray[i] ?? "-"}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}