export default async function GameDetails({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${id}`
  );

  if (!res.ok) {
    return <p>Error loading game details.</p>;
  }

  const data = await res.json();
  console.log("Full data structure:", data);

  // For summary endpoint, data is structured differently
  const competition = data.boxscore?.teams || data.competitions?.[0];
  const header = data.header;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {header?.competitions?.[0]?.competitors?.[0]?.team?.displayName} vs{" "}
        {header?.competitions?.[0]?.competitors?.[1]?.team?.displayName}
      </h1>

      {/* Display teams from boxscore */}
      {data.boxscore?.teams?.map((team) => (
        <div key={team.team.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{team.team.displayName}</h2>
          <p className="text-lg">
            Score:{" "}
            {team.statistics?.find((s) => s.name === "points")?.displayValue}
          </p>
        </div>
      ))}
    </div>
  );
}
