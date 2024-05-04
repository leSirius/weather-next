import {useState} from "react";
import {fetchForecastById} from "@/app/lib/data";
import BarGraph from "@/app/ui/homepage/bar-graph";

export default function LongBoard({id}){
  const [forecast, setForecast] = useState([]);

  if (forecast.length===0 && id){
    (async ()=>{
      const data = await fetchForecastById(id);
      setForecast(data);
    })();
  }

  if (forecast.length===0) {return <p>Loading in longBoard</p>}

  return <BarGraph forecast={forecast}> </BarGraph>;
}

