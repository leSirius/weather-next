import CardRow from "@/app/ui/homepage/cardrow";
import WeatherLoc from "@/app/ui/homepage/weatherloc";
import {Suspense} from "react";

export default function Page() {
  return (
    <div className="flex  min-h-screen flex-col items-center justify-between pl-24 pt-16">
      <WeatherLoc></WeatherLoc>
      <CardRow></CardRow>
      <CardRow></CardRow>
      <CardRow></CardRow>
      <CardRow></CardRow>
    </div>
  );
}
