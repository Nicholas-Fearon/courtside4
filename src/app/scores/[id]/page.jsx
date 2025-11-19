import Image from "next/image";
import Link from "next/link";

export default async function GameDetails({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Error loading game details.</p>
      </div>
    );
  }

  const data = await res.json();
  const header = data.header;
  const competition = header?.competitions?.[0];
  const competitors = competition?.competitors || [];
  const teams = data.boxscore?.teams || [];
  const playerGroups = data.boxscore?.players || [];
  const status = competition?.status?.type?.description || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Game Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {competitors[0]?.team?.displayName} vs {competitors[1]?.team?.displayName}
          </h1>
        </div>

        {/* Teams Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {teams.map((team, index) => {
            const competitor = competitors[index];
            const score = competitor?.score;
            
            return (
              <div
                key={team.team?.id}
                className="bg-white border border-gray-100 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {team.team?.shortDisplayName}
                  </h2>
                  <span className="text-3xl font-bold text-gray-900">
                    {score ?? "-"}
                  </span>
                </div>

                <div className="flex items-center justify-center py-4">
                  <Image
                    src={team.team?.logo || ""}
                    alt={`${team.team?.shortDisplayName ?? "Team"} logo`}
                    width={120}
                    height={120}
                    className="object-contain opacity-90"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Player Stats Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Player Stats
          </h2>

          <div className="space-y-8">
            {playerGroups.map((teamGroup) => {
              const teamId = teamGroup.team?.id;
              const teamName = teamGroup.team?.shortDisplayName ?? "Team";
              const statistics0 = teamGroup.statistics?.[0] ?? {};
              const descriptions = statistics0.descriptions || [];
              const athletes = statistics0.athletes || [];

              return (
                <div key={teamId}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {teamName}
                  </h3>

                  <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50">
                            Player
                          </th>
                          {descriptions.map((label, i) => (
                            <th 
                              key={i} 
                              className="text-left px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50"
                            >
                              {label}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {athletes.map((playerEntry) => {
                          const playerId = playerEntry.athlete?.id;
                          const playerName = playerEntry.athlete?.displayName ?? "Unknown";
                          const statsArray = playerEntry.stats || [];

                          return (
                            <tr
                              key={playerId}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {playerName}
                              </td>

                              {statsArray.map((value, i) => (
                                <td 
                                  key={i} 
                                  className="px-4 py-3 text-sm text-gray-600"
                                >
                                  {value ?? "-"}
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
      </div>
    </div>
  );
}