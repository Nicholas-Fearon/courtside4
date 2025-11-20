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
    <div>
      {fights.length === 0 && <p>No Figts Found</p>}
      {fights.map((fight) => {
        return (
          <div key={fight.id}>
            <Image
              src={fight.poster_image_url}
              height={100}
              width={100}
              alt="Fight Poster"
            />
            <h1 className="text-white">{fight.title}</h1>
            <p>{fight.date}</p>
            <p>{fight.venue}</p>
            <p>{fight.promotion}</p>
          </div>
        );
      })}
    </div>
  );
}
