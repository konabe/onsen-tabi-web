import { useEffect, useState } from "react";
import "./App.css";
import { HotelResponse, getHotels } from "./infrastructure/api";

function App() {
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  useEffect(() => {
    getHotels().then((hotels) => setHotels(hotels));
  }, []);
  return (
    <div>
      {hotels.map((v) => (
        <div>
          {v.name}, 和室{v.hasWashitsu ? "あり" : "なし"}
        </div>
      ))}
    </div>
  );
}

export default App;
