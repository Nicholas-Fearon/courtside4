export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">About</h1>
          <p className="mt-2 text-gray-600">Learn more about this project</p>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-100 rounded-lg p-8 space-y-6">
          {/* Update Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">UPDATE</h2>
            <p className="text-gray-600 leading-relaxed">
              Due to recent changes in the API, I have had to modify the site to focus solely on game score updates. 
              In the future, I plan to reintroduce team and roster information once the API restrictions are lifted 
              or an alternative data source is found.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Additionally, I will be implementing user authentication using Clerk to provide a more personalized 
              and secure experience.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Welcome Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Welcome to Courtside3</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Courtside3, an enhancement of my previous two web applications, Courtside and Courtside2, 
              both of which I developed during my Software Development Bootcamp. The aim behind this project is to 
              bring fans closer to the players and teams they admire.
            </p>
          </section>

          {/* Development Journey */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Development Journey</h2>
            <p className="text-gray-600 leading-relaxed">
              After gaining a deeper understanding of key concepts such as dynamic routes and{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">params</code>{" "}
              from Courtside2, I wanted to explore how to integrate an API rather than relying on my own Supabase 
              database. To achieve this, I used the BalldontlieAPI to retrieve live game data, including today's 
              games and last night's final scores. Rebuilding this web app has greatly expanded my knowledge of 
              how APIs work and how to manipulate the data to suit my specific needs.
            </p>
          </section>

          {/* Future Plans */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Future Plans</h2>
            <p className="text-gray-600 leading-relaxed">
              Looking ahead, I plan to enhance Courtside3 further by adding features such as user authentication 
              and the ability for users to post about past and live games, making it even more engaging for 
              basketball fans.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="pt-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Built With</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Next.js
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                React
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                ESPN API
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                TypeScript
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}