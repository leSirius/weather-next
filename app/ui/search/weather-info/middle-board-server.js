'use client'
import {iconList, buttonList, typeInfoTable, calWitchFetch} from "@/app/lib/middleInfo";
import BarGraphContainer from "@/app/ui/home/middle-borad-widgets/bar-graph-container";
import PanelServer from "@/app/ui/search/weather-info/middle-board/panel-server";
import useSWRFetch from "@/app/lib/useSWRFetch";
import {MiddleLoadingServer} from "@/app/ui/search/loading";

export default function MiddleBoardServer({id, data}){
  if (data===void 0 || Object.keys(data).length===0) { return <MiddleLoadingServer></MiddleLoadingServer>; }
  const [dataMatrix, witchFetch, sWitch, column, setColumn] =
    useSWRFetch(id, data, calColumn);
  const typeInfoList = typeInfoTable[witchFetch];

  return (
    <div className='grid grid-cols-3 gap-4 h-full'>
      <BarGraphContainer
        dataMatrix={dataMatrix}
        column={column}
        setDataType={setColumn}
        typeInfoList={typeInfoList}
        witchFetch={witchFetch}
        calWitchFetch={calWitchFetch}
      > </BarGraphContainer>

      <PanelServer
        buttonList={buttonList}
        iconList={iconList}
        typeInfoList={typeInfoList}
        column={column}
        setColumn={setColumn}
        witchFetch={witchFetch}
        sWitch={sWitch}
      ></PanelServer>
    </div>
  );
}

function calColumn(witch, ind=0) {
  return typeInfoTable[witch][ind].type
}
