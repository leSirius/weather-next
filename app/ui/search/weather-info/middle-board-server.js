'use client'
import {buttonList, calWitchFetch, iconList, typeInfoTable} from "@/app/lib/middleInfo";
import BarGraphContainer from "@/app/ui/home/middle-borad-widgets/bar-graph-container";
import PanelServer from "@/app/ui/search/weather-info/middle-board/panel-server";
import useSWRFetch from "@/app/lib/useSWRFetch";
import {MiddleLoadingServer} from "@/app/ui/search/loading";

let prev;

export default function MiddleBoardServer({id, data}){

  const [dataMatrix, witchFetch, onWitchChange, column, setColumn] =
    useSWRFetch(id, data);
  const typeInfoList = typeInfoTable[witchFetch];

  prev = dataMatrix;

  return (
    <div className='grid grid-cols-3 gap-4 h-full'>
      {
        dataMatrix===void 0 || column===void 0?
          <MiddleLoadingServer></MiddleLoadingServer>:
          <BarGraphContainer
            dataMatrix={dataMatrix}
            column={column}
            setDataType={setColumn}
            typeInfoList={typeInfoList}
            witchFetch={witchFetch}
            calWitchFetch={calWitchFetch}
          > </BarGraphContainer>
      }
      <PanelServer
        buttonList={buttonList}
        iconList={iconList}
        typeInfoList={typeInfoList}
        column={column}
        setColumn={setColumn}
        witchFetch={witchFetch}
        onWitchChange={onWitchChange}
      ></PanelServer>
    </div>
  );
}

