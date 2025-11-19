import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // Fetch both news and scores in parallel
  const [newsRes, scoresRes] = await Promise.all([
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"),
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard")
  ]);

  // Handle errors
  const newsData = newsRes.ok ? await newsRes.json() : null;
  const scoresData = scoresRes.ok ? await scoresRes.json() : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">NBA Dashboard</h1>
          <p className="mt-2 text-gray-600">Latest news and scores from around the league</p>
        </div>

        {/* Latest News Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Latest News
          </h2>
          
          {!newsData ? (
            <p className="text-gray-500">Failed to load news.</p>
          ) : (
            <div className="space-y-3">
              {newsData.articles.slice(0, 5).map((article) => (
                <article 
                  key={article.id} 
                  className="bg-white border border-gray-100 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                    {article.headline}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <Link
                    href={article.links?.web?.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
                  >
                    Read article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Latest Scores Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Latest Scores
          </h2>
          
          {!scoresData ? (
            <p className="text-gray-500">Failed to load scores.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scoresData.events.map((event) => {
                const competition = event.competitions[0];
                const competitors = competition.competitors;
                const status = competition.status?.type?.description || "";

                return (
                  <Link
                    key={event.id}
                    href={`/scores/${event.id}`}
                    className="block bg-white border border-gray-100 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {competitors.map((team) => (
                        <div key={team.id} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Image
                              src={team.team.logo || ""}
                              alt={`${team.team.shortDisplayName} logo`}
                              width={32}
                              height={32}
                              className="object-contain flex-shrink-0"
                            />
                            <span className="text-gray-900 font-medium truncate">
                              {team.team.shortDisplayName}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900 flex-shrink-0">
                            {team.score ?? "-"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                        View details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}