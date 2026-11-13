import { useState, useEffect } from "react";
import WeatherTableSkeleton from "@/codebooks/WeatherTableSkeleton";


interface WeatherData {
    daily:{    
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        };
    daily_units: {
    temperature_2m_max: string; 
    temperature_2m_min: string;
  };    
}
interface City{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country_code?: string;    
}

interface SelectableCity {
  name: string;
  lat: number;
  lon: number;
}

const CITIES: SelectableCity[] = [
  { name: "Beograd", lat: 44.7866, lon: 20.4489 },
  { name: "Novi Sad", lat: 45.2671, lon: 19.8335 },
  { name: "Niš", lat: 43.3209, lon: 21.8958 },
  { name: "Kragujevac", lat: 44.0128, lon: 20.9114 },
];
const UNITS = [
  { label: "°C (Celzijus)", value: "celsius" },
  { label: "°F (Farenhajt)", value: "fahrenheit" },
] as const;

 <WeatherTableSkeleton />

export default function WeatherScreens() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<string>(UNITS[0].value);
  const [forecastDays, setForecastDays] = useState<number>(7);
  const [cityInput, setCityInput] = useState(CITIES[0].name);
  const [searchedCities, setSearchedCities] = useState<City[]>([]);
  const [cities, setCities] = useState<SelectableCity[]>(() => {
    const savedCities = localStorage.getItem("weather_cities");
    return savedCities ? JSON.parse(savedCities) : CITIES;
  });
  const [selectedCity, setSelectedCity] = useState<SelectableCity>(() => {
    const savedSelected = localStorage.getItem("weather_selected_city");
    return savedSelected ? JSON.parse(savedSelected) : CITIES[0];
  });
  const cityToAdd = searchedCities.find(
    (city) => city.name.toLowerCase() === cityInput.trim().toLowerCase()
  );


const searchCitiesFromApi = async (query: string) => {
  if (!query || query.trim().length === 0) {
    setSearchedCities([]);
    return;
  }
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=sr&format=json`
    );
    const data = await response.json();

    if (data && data.results) {
      const serbianCities = data.results.filter(
        (city: City) => city.country_code === "RS"
      );
      setSearchedCities(serbianCities);
    } else {
      setSearchedCities([]);
    }
  } catch (err) {
    console.error("Greška pri pretrazi gradova:", err);
  }
}; 
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(          
           `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${unit}&forecast_days=${forecastDays}&timezone=auto`
        );

        if (!response.ok) {
          throw new Error("Error while downloading..");
        }

        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
        setError("An error occurred while loading the forecast.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchWeather();
    }, [selectedCity, unit, forecastDays]);
        useEffect(() => {
        localStorage.setItem("weather_cities", JSON.stringify(cities));
    }, [cities]);

    useEffect(() => {
        localStorage.setItem("weather_selected_city", JSON.stringify(selectedCity));
    }, [selectedCity]);

    const addCity = () => {
      if (!cityToAdd) return;

      const newCity = {
        name: cityToAdd.name,
        lat: cityToAdd.latitude,
        lon: cityToAdd.longitude,
      };
      const existingCity = cities.find(
        (item) => item.name.toLowerCase() === newCity.name.toLowerCase()
      );

      if (existingCity) {
        setSelectedCity(existingCity);
        setCityInput(existingCity.name);
        return;
      }
      setCities((currentCities) => [...currentCities, newCity]);
      setSelectedCity(newCity);
      setCityInput(newCity.name);
     setSearchedCities([]);
    };
    
    
  return (
    <div className="p-6 max-w-4xl mx-auto text-foreground">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 p-6">
            <label className="text-sm font-medium text-muted-foreground">City:</label>
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = cities.find(c => c.name === e.target.value);
                if (found) {
                    setSelectedCity(found);
                    setCityInput(found.name)}
              }}
              className="border border-border py-1.5 px-3 pr-8 rounded focus:outline-none focus:border-ring bg-background text-foreground"
              >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-muted-foreground">Unit:</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border border-border py-1.5 px-3 pr-8 rounded focus:outline-none focus:border-ring bg-background text-foreground "
            >
              <option value="celsius">°C</option>
              <option value="fahrenheit">°F</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-muted-foreground">Days:</label>
            <select
                value={forecastDays}
                onChange={(e) => setForecastDays(Number(e.target.value))}
                className=" border border-border py-1.5 px-3 pr-8 rounded focus:outline-none focus:border-ring bg-background text-foreground"
                >
                <option value={3}>3 day</option>
                <option value={7}>7 day</option>
                <option value={14}>14 day</option>
            </select>
        </div>
        
        <div className="flex items-center gap-1">
  <label className="text-sm font-medium text-muted-foreground">Search:</label>
  <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => {
                const value = e.target.value;
                setCityInput(value);
                searchCitiesFromApi(value);
              }}
              placeholder="Unesi novi grad..."
              className="border border-border py-1.5 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground text-sm shadow-sm w-48"
            />
            
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">
              ▼
            </span>

            {searchedCities.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-card border border-border rounded-lg shadow-md z-50 text-sm divide-y divide-border">
                {searchedCities.map((city) => (
                  <li
                    key={city.id || city.name}
                    onClick={() => {
                      setCityInput(city.name);
                    }}
                    className="px-3 py-2 text-card-foreground hover:bg-muted cursor-pointer transition-colors"
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
     <button
     type="button"
     onClick={addCity}
     disabled={!cityToAdd}
     className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium cursor-pointer"
     >Add</button>
    </div>
      </div>
      {error && <div className="p-4 text-red-500">{error}</div>}
      {loading ? (
        <WeatherTableSkeleton rowsCount={forecastDays} />
      ) : weather ? (
        <div className="overflow-x-auto border border-border rounded-lg shadow-sm transition-opacity duration-700 ease-in-out opacity-100 mt-6 bg-card">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-center text-black">Date</th>
                <th className="p-3 text-center text-black">Maximum temperature ({weather.daily_units.temperature_2m_max})</th>
                <th className="p-3 text-center text-black">Minimum temperature ({weather.daily_units.temperature_2m_min})</th>
              </tr>
            </thead>
            <tbody>
              {weather.daily.time.map((date, index) => (
                <tr key={date} className="border-b">
                  <td className="p-3 text-center">{date}</td>
                  <td className="p-3 text-red-600 font-semibold text-center">
                    {weather.daily.temperature_2m_max[index]} {weather.daily_units.temperature_2m_max}
                  </td>
                  <td className="p-3 text-blue-600 font-semibold text-center">
                    {weather.daily.temperature_2m_min[index]} {weather.daily_units.temperature_2m_min}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className=" px-4 py-2 m-5 bg-blue-600 text-white p-5 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
            {loading ? "Osvežavanje..." : "REFRESH"}
          </button>
        </div>       
      ): null}
    </div>
  );
}