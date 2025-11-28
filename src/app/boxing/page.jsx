import Image from "next/image";

export default async function Boxing() {
  const url =
    "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7&past_hours=12&date_sort=ASC&page_num=1&page_size=25";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b1fee7ba25msh62e74e52f71644ep1bfbfcjsn75e40c5f60d7",
      "x-rapidapi-host": "boxing-data-api.p.rapidapi.com",
    },
  };

  let fights = [];

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("This is my fight log:", data);
    fights = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Boxing Events
          </h1>
          <p className="mt-2 text-gray-600">Upcoming fights and events</p>
        </div>

        {/* Fights Section */}
        {fights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No fights found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fights.map((fight) => (
              <div
                key={fight.id}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {/* Fight Poster */}
                {fight.poster_image_url && (
                  <div className="relative w-full h-64 bg-gray-100">
                    <Image
                      src={fight.poster_image_url}
                      fill
                      alt={fight.title || "Fight Poster"}
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Fight Details */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {fight.title}
                  </h2>

                  <div className="space-y-2 text-sm text-gray-600">
                    {fight.date && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{fight.date}</span>
                      </div>
                    )}

                    {fight.venue && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">{fight.venue}</span>
                      </div>
                    )}

                    {fight.promotion && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        <span className="truncate">{fight.promotion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
