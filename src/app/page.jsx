import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // Fetch all data in parallel
  const [newsRes, scoresRes, boxingRes] = await Promise.all([
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"),
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"),
    fetch("https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7&past_hours=12&date_sort=ASC&page_num=1&page_size=25", {
      headers: {
        "x-rapidapi-key": "b1fee7ba25msh62e74e52f71644ep1bfbfcjsn75e40c5f60d7",
        "x-rapidapi-host": "boxing-data-api.p.rapidapi.com",
      },
    }),
  ]);

  // Handle errors
  const newsData = newsRes.ok ? await newsRes.json() : null;
  const scoresData = scoresRes.ok ? await scoresRes.json() : null;
  const boxingData = boxingRes.ok ? await boxingRes.json() : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Sports Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Live scores, latest news, and upcoming events
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Left Column - NBA Scores */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-lg p-4 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              NBA Scores
            </h2>
            <div className="overflow-y-auto flex-1 space-y-2 pr-2">
              {!scoresData ? (
                <p className="text-gray-500 text-sm">Failed to load scores.</p>
              ) : (
                scoresData.events.slice(0, 8).map((event) => {
                  const competition = event.competitions[0];
                  const competitors = competition.competitors;
                  const status = competition.status?.type?.shortDetail || "";

                  return (
                    <Link
                      key={event.id}
                      href={`/scores/${event.id}`}
                      className="block border border-gray-100 rounded-lg p-3 hover:border-gray-300 transition-colors"
                    >
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {status}
                      </div>
                      <div className="space-y-2">
                        {competitors.map((team) => (
                          <div key={team.id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Image
                                src={team.team.logo || ""}
                                alt={`${team.team.shortDisplayName} logo`}
                                width={24}
                                height={24}
                                className="object-contain shrink-0"
                              />
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {team.team.abbreviation}
                              </span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                              {team.score ?? "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Middle Column - Latest News */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-lg p-4 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              Latest News
            </h2>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2">
              {!newsData ? (
                <p className="text-gray-500 text-sm">Failed to load news.</p>
              ) : (
                newsData.articles.slice(0, 6).map((article) => (
                  <article
                    key={article.id}
                    className="border border-gray-100 rounded-lg p-3 hover:border-gray-300 transition-colors"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">
                      {article.headline}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <Link
                      href={article.links?.web?.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium inline-flex items-center gap-1"
                    >
                      Read more
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Boxing Events */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-lg p-4 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              Boxing Events
            </h2>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2">
              {boxingData.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming fights</p>
              ) : (
                boxingData.slice(0, 6).map((fight) => (
                  <div
                    key={fight.id}
                    className="border border-gray-100 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    {fight.poster_image_url && (
                      <div className="relative w-full h-32 bg-gray-100">
                        <Image
                          src={fight.poster_image_url}
                          fill
                          alt={fight.title || "Fight Poster"}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                        {fight.title}
                      </h3>
                      <div className="space-y-1 text-xs text-gray-600">
                        {fight.date && (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{fight.date}</span>
                          </div>
                        )}
                        {fight.venue && (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{fight.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}