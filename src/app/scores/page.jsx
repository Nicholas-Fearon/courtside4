import Link from "next/link";
export default async function Scores() {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
  );

  if (!res.ok) {
    console.error("Failed to fetch scores:", res.status, res.statusText);
    return (
      <>
        <h1>Scores</h1>
        <p>Failed to load scores.</p>
      </>
    );
  }

  const data = await res.json();

  return (
    <>
      <h1>Scores</h1>
      <div className="space-y-4">
        {data.events.map((event) => {
          const competition = event.competitions[0];
          const competitors = competition.competitors;
            console.log("This is my competitors log:", competition)
          return (
            <div key={event.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{event.shortName}</h2>

              <div className="mt-2 space-y-1">
                {competitors.map((team) => (
                  <div key={team.id} className="flex justify-between">
                    <span>{team.team.shortDisplayName}</span>
                    <span className="font-semibold">{team.score ?? "-"}</span>
                  </div>
                ))}
              </div>
              <Link href={`/scores/${event.id}`}>Read more...</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
