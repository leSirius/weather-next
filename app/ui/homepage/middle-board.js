import {useEffect, useRef, useState} from "react";
import {fetchForecastById, fetchIndicesById} from "@/app/lib/data";
import BarGraphContainer from "@/app/ui/homepage/middle-borad-widges/bar-graph-container";
import {Panel} from "@/app/ui/homepage/middle-borad-widges/panel";
import {ForecastIcon, IndicesIcon} from "@/app/lib/icons";

const fetchList = [fetchForecastById, fetchIndicesById]
const buttonList = ['dataList', 'indices'];
const iconList = [ForecastIcon, IndicesIcon];
// typeList stores more info than merely type names, or it can be calculated by dataList.
const typeInfoTable = [
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

// 3 states under this component, dataList, dataType and colorList.
// one to store rows of data, one to control which column of data shown on the graph, another for color setting
// There is one dependency, whenever dataList updates, dataList needs to follow.
// witchToShow can be calculated by dataList, so it's redundant.
//
export default function MiddleBoard({id}){
  const beginFromFetch = 1;
  const [dataMatrix, setDataMatrix] = useState([]);
  const [column, setColumn] = useState(typeInfoTable[beginFromFetch][0].type)

  async function asyncSetTwoStates(ind=0){
    const data = await fetchList[ind](id);
    await setDataMatrix(data);                                // async first, then the sync one
    await setColumn(typeInfoTable[ind][0].type);
  }

  if (dataMatrix.length===0 && id!==void 0){ asyncSetTwoStates(beginFromFetch); }
  if (dataMatrix.length===0) { return <p>Loading in longBoard</p>; }

  const typeInfoList = getTypeList(dataMatrix, typeInfoTable);
  return (
    <div className='flex  pt-4 gap-4'>
      <BarGraphContainer dataMatrix={dataMatrix}
                         column={column}
                         setDataType={setColumn}
                         typeInfoList={typeInfoList}
      > </BarGraphContainer>
      <Panel setter={asyncSetTwoStates} buttonList={buttonList} iconList={iconList}></Panel>
    </div>
  );
}

function getTypeList(dataList, typeLists){
  if (dataList.length===0) {return -1;}
  return typeLists.find((types)=>{return types.every(ob=>dataList[0][ob.type] !== void 0)});
}

/*



*/
