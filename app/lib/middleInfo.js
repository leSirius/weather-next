import {fetchDailyById, fetchHourlyById, fetchIndicesById} from "@/app/lib/data-home";
import {ForecastIcon, IndicesIcon} from "@/app/lib/icons";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";

export const fetchList = [fetchHourlyById, fetchIndicesById, fetchDailyById];
export const buttonList = ['Forecast next 24 hours', 'Weather indices', '7-day hourly'];
export const iconList = [ForecastIcon, IndicesIcon, CalendarDaysIcon];
// typeList stores more info than merely type names, or it can be calculated by dataList.
export const typeInfoTable = [
  [
    {type: "temp", text: 'Temperature', unit: '°C'},
    {type: "windSpeed", text: 'WindSpeed', unit: 'km/h'},
    {type: "humidity", text: "Humidity", unit: "%"},
    {type: "pop", text: 'ProbOfPrecip', unit: "%"},
    {type: "precip", text: "Precipitation", unit: "mm"},
    {type: "pressure", text: "Pressure", unit: "hPa"},
    {type: "cloud", text: "Cloud", unit:"%"},
    {type: "dew", text: "DewPoint", unit:"°C"}
  ], [
    {type: "level", text: 'Indices', unit: 'Level'}
  ], [
    {type: 'tempMax', text: 'MaxTemp', unit: '°C'},
    {type: 'tempMin', text: 'MinTemp', unit: '°C'},
    {type: 'humidity', text: 'Humidity', unit: "%"},
    {type: 'uvIndex', text: 'UVIndex', unit: 'unit'},
    {type: 'pressure', text: 'Pressure', unit: "hPa"},
    {type: 'vis', text: 'Visibility', unit: 'km'},
    {type: 'cloud', text: 'Cloud', unit: '%'},
    {type: "precip", text: "Precipitation", unit: "mm"}
  ]
]

export const witchList = [
  {baseUrl:'/api/hourly', genre:'hourly'},
  {baseUrl:'/api/indices', genre:'indices'},
  {baseUrl:'/api/daily', genre:'daily'}
];

export function calWitchFetch(dataMatrix){
  if (dataMatrix===void 0||dataMatrix.length===0 || dataMatrix[0]===void 0) {return -1;}
  return typeInfoTable.findIndex((types)=>{return types.every(ob=>dataMatrix[0][ob.type] !== void 0)});
}

export function calColumn(witch, ind = 0) {
  return witch === -1 ? void 0 : typeInfoTable[witch][ind]?.type
}