import {useEffect, useState} from "react";
import BarGraphContainer from "@/app/ui/home/middle-borad-widgets/bar-graph-container";
import {Panel} from "@/app/ui/home/middle-borad-widgets/panel";
import {MiddleLoading} from "@/app/ui/home/loading";
import {fetchList, iconList, buttonList, typeInfoTable, calWitchFetch} from "@/app/lib/middleInfo";

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

  const witchFetch = calWitchFetch(dataMatrix);
  const typeInfoList = typeInfoTable[witchFetch];

  return (
    <div className='grid grid-cols-3 pt-4 gap-4 h-52'>
      <BarGraphContainer
        dataMatrix={dataMatrix}
        column={column}
        setDataType={setColumn}
        typeInfoList={typeInfoList}
        witchFetch={witchFetch}
        calWitchFetch={calWitchFetch}
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




/*



*/
