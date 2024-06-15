'use client'
import {fetchList, iconList, buttonList, typeInfoTable} from "@/app/lib/middleInfo";
import BarGraphContainer from "@/app/ui/home/middle-borad-widgets/bar-graph-container";
import PanelServer from "@/app/ui/search/weather-info/middle-board/panel-server";
import useCachedFetch from "@/app/lib/useCachedFetch";
import {MiddleLoadingServer} from "@/app/ui/search/loading";

// 4 states under this component, dataList, dataType, colorList and colorSetter.
// separately for storing rows of data(Matrix), to control which column of data shown on the graph,
// to support color change in graph, and to open or close colorSetter.
// one ref for left select, so button can control it.
// There is a dependency, whenever dataMatrix updates according fetch, column needs to follow.
// witchToShow can be calculated by dataList, so it's redundant.
//
export default function MiddleBoardServer({id, data}){

  const [dataMatrix, witchFetch, sWitch, column, setColumn] =
    useCachedFetch(id, data, fetchList, calWitchFetch(data), calColumn);
  const typeInfoList = typeInfoTable[witchFetch];

  if (dataMatrix===void 0||dataMatrix.length===0) { return <MiddleLoadingServer></MiddleLoadingServer>; }

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

function calWitchFetch(dataMatrix){
  if (dataMatrix===void 0||dataMatrix.length===0 || dataMatrix[0]===void 0) {return -1;}
  return typeInfoTable.findIndex((types)=>{return types.every(ob=>dataMatrix[0][ob.type] !== void 0)});
}

function calColumn(witch, ind=0) {
  return typeInfoTable[witch][ind].type
}

/*



*/
