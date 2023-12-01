import axios from "axios";

const options = {
  method: "GET",
  url: "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
  params: { list: "ap:c3" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_APP_SITE,
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}

const Learn = () => {
  return <div>Fetched kanji: </div>;
};

export default Learn;
