import {useEffect, useRef, useState} from "react";
import {fetchForecastById, fetchIndicesById} from "@/app/lib/data";
import BarGraph from "@/app/ui/homepage/bar-graph";
import {Panel} from "@/app/ui/homepage/panel";
import {ForecastIcon, IndicesIcon} from "@/app/lib/icons";

const fetchList = [fetchForecastById, fetchIndicesById]
const buttonList = ['dataList', 'indices'];
const iconList = [ForecastIcon, IndicesIcon];
const typeLists = [
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
  ]
]

// dataList and dataType actually needs to update together.
// one to store data, one to control data shown on the graph, both necessary.
// But not witchToShow, which can be calculated by dataList, so it's redundant.
export default function LongBoard({id}){
  const beginFrom = 0;
  const [dataList, setDataList] = useState([]);
  const [dataType, setDataType] = useState(typeLists[beginFrom][0].type)
  const witchToShow = matchStructure(dataList, typeLists);

  async function setTwoStates(ind=0){
    const data = await fetchList[ind](id);
    await setDataList(data);                                // async first, then the sync one
    await setDataType(typeLists[ind][0].type);
  }

  if (dataList.length===0 && id!==void 0){
    setTwoStates();
  }

  if (dataList.length===0) {return <p>Loading in longBoard</p>}
  return (
    <div className='flex  pt-4 gap-4'>
      <BarGraph dataList={dataList}
                dataType={dataType}
                setDataType={setDataType}
                typeList={typeLists[witchToShow]}
                witchToShow={witchToShow}
      > </BarGraph>
      <Panel setter={setTwoStates} buttonList={buttonList} iconList={iconList}></Panel>
    </div>
  );
}


function matchStructure(dataList, typeLists){
  if (dataList.length===0) {return -1;}
  return typeLists.findIndex((types)=>{return types.every(ob=>dataList[0][ob.type] !== void 0)});
}
/*



*/
