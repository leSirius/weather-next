import {useEffect, useState} from "react";
import {fetchDailyById, fetchHourlyById, fetchIndicesById} from "@/app/lib/data";
import BarGraphContainer from "@/app/ui/home/middle-borad-widgets/bar-graph-container";
import {Panel} from "@/app/ui/home/middle-borad-widgets/panel";
import {ForecastIcon, IndicesIcon} from "@/app/lib/icons";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import {MiddleLoading} from "@/app/ui/home/loading";

const fetchList = [fetchHourlyById, fetchIndicesById, fetchDailyById];
const buttonList = ['Forecast next 24 hours', 'Weather indices', '7-day hourly'];
const iconList = [ForecastIcon, IndicesIcon, CalendarDaysIcon];
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

// 4 states under this component, dataList, dataType, colorList and colorSetter.
// separately for storing rows of data(Matrix), to control which column of data shown on the graph,
// to support color change in graph, and to open or close colorSetter.
// one ref for left select, so button can control it.
// There is a dependency, whenever dataMatrix updates according fetch, column needs to follow.
// witchToShow can be calculated by dataList, so it's redundant.
//
export default function MiddleBoard({id}){
  const beginFromFetch = 0;
  const [dataMatrix, setDataMatrix] = useState([]);
  const [column, setColumn] = useState(typeInfoTable[beginFromFetch][0].type);

  async function asyncSetTwoStates(ind=0){
    if (id!==void 0 && id!==''){
      const data = await fetchList[ind](id);
      if (data!==void 0){
        setDataMatrix(data);
        setColumn(typeInfoTable[ind][0].type);
      }
    }
  }

  useEffect(() => {
    asyncSetTwoStates(beginFromFetch);
  }, []);

  if (dataMatrix===void 0||dataMatrix.length===0) { return <MiddleLoading></MiddleLoading>; }

  const witchFetch = getWitchFetch(dataMatrix, typeInfoTable);
  if (witchFetch===-1){
    return <MiddleLoading></MiddleLoading>
  }
  const typeInfoList = typeInfoTable[witchFetch];

  return (
    <div className='flex pt-4 gap-4'>
      <BarGraphContainer
        dataMatrix={dataMatrix}
        column={column}
        setDataType={setColumn}
        typeInfoList={typeInfoList}
        witchFetch={witchFetch}
      > </BarGraphContainer>

      <Panel
        setter={asyncSetTwoStates}
        buttonList={buttonList}
        iconList={iconList}
        typeInfoList={typeInfoList}
        column={column}
        setColumn={setColumn}
      ></Panel>
    </div>
  );
}

function getWitchFetch(dataMatrix, typeTable){
  if (dataMatrix===void 0||dataMatrix.length===0 || dataMatrix[0]===void 0) {return -1;}
  return typeTable.findIndex((types)=>{return types.every(ob=>dataMatrix[0][ob.type] !== void 0)});
}


/*



*/
