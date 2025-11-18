import Link from "next/link";


export default async function Home() {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
  );

  if (!res.ok) {
    console.error("Failed to fetch news:", res.status, res.statusText);
    return (
      <>
        <h1>Home</h1>
        <p>Failed to load news.</p>
      </>
    );
  }

  const data = await res.json();

  return (
    <>
      <h1>Home</h1>
      <div className="space-y-4">
        {data.articles.map((article) => (
          <article key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{article.headline}</h2>
            <p className="text-gray-600">{article.description}</p>

            <Link
              href={article.links?.web?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Read more
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
