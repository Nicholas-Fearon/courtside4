import Link from "next/link";

export default async function Scores() {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
  );

  if (!res.ok) {
    console.error("Failed to fetch scores:", res.status, res.statusText);
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Scores</h1>
        <p className="text-gray-600">Failed to load scores.</p>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Scores</h1>

      <div className="space-y-4">
        {data.events.map((event) => {
          const competition = event.competitions[0];
          const competitors = competition.competitors;

          return (
            <div
              key={event.id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white"
            >
              <h2 className="text-xl font-semibold">{event.shortName}</h2>

              <div className="mt-4 space-y-2">
                {competitors.map((team) => (
                  <div key={team.id} className="flex justify-between text-gray-700">
                    <span>{team.team.shortDisplayName}</span>
                    <span className="font-semibold">{team.score ?? "-"}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/scores/${event.id}`}
                className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
              >
                View game details →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}