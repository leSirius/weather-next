'use client'
import {useEffect, useRef} from "react";

export default function Canvas({riseOb, setOb}){
  const canvasRef=useRef();
  const range = 24;
  const temporal = mapDateToNumber(new Date());
  const riseNum = mapDateToNumber(riseOb);
  const setNum = mapDateToNumber(setOb);
  const imagePath = riseNum<temporal&&temporal<setNum?' icons/100.svg':'icons/150.svg';

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', {willReadFrequently:true});
    context.lineWidth = 2;
    const [height, width] = [canvas.height, canvas.width];
    const leftZeroX=riseNum*width/range, rightZeroX=setNum*width/range;
    const middleX = (leftZeroX+rightZeroX)/2;
    function calY(x) { return height/4*Math.cos((x-middleX)*Math.PI/(rightZeroX-leftZeroX)-Math.PI)+height/2;}

    let imgX = mapDateToNumber(new Date())*width/range;
    const img = new Image();
    img.src = imagePath;
    let winkId;
    let unMounted = false;
    img.onload = ()=>{
      const size = 30;
      context.drawImage(img, imgX-size/2, calY(imgX)-size/2, size, size);
      const savedImgData = context.getImageData(imgX-size/2, calY(imgX)-size/2, size, size).data;
      (()=>{
        let fading = true;
        let count = 0, round = 0;
        let scale = 0.8;
        const curveList = getPointsOnCurve()
        if (!unMounted) {
          winkId = requestAnimationFrame(wink);
        }

        function wink() {
          count = fading? count+1: count-1;
          fading = count===30? false: count===0? true : fading;
          round = count===0? round+1:round;
          if (count%6===0){
            const imgInfo = context.getImageData(imgX-size/2, calY(imgX)-size/2, size, size);
            imgInfo.data.forEach((val, ind)=>{
              if (round===6) {val=savedImgData[ind];}
              if ((ind+1)%4===0&&!curveList[ind]&&val>35){
                imgInfo.data[ind] = fading? val*scale:val/scale;
              }
            })
            context.putImageData(imgInfo, imgX-size/2, calY(imgX)-size/2);
          }
          round = round===6? 1:round;
          winkId = requestAnimationFrame(wink);
        }

        function getPointsOnCurve(){
          const temp = new Map();
          savedImgData.forEach((val, ind)=>{
            const x = imgX-size/2+Math.floor(ind/4)%size;
            const y = calY(imgX)-size/2+Math.floor(Math.floor(ind/4)/size);
            if (
              (y>=calY(Math.floor(x-1))&&y<=calY(Math.ceil(x+1))) ||
              (y<=calY(Math.floor(x-1))&&y>=calY(Math.ceil(x+1)))
            ) {
              temp[ind] = true;
            }
          });
          return temp;
        }
      })();

    }

    const recHeight = 5;
    fillRecursive(context, 0, 0, width, recHeight, 0.12, height);
    drawXAxis(context, width, height)

    let drawId;
    (()=>{
      let startTime;
      let prevX = 0;
      const duration = 1800;
      const baseColor = 20;
      const topColor = 255;

      if (!unMounted){
        drawId = requestAnimationFrame(drawCurve);
      }

      function drawCurve(current) {
        startTime = startTime||current;
        const progress = Math.min(1, (current-startTime)/duration);
        const tempOffset = progress<0.5?
          (progress/0.5)*(topColor-baseColor) :
          ((1-progress)/0.5)*(topColor-baseColor)
        const color =  baseColor+tempOffset

        context.beginPath();
        context.strokeStyle = `rgba(${color},${color},${color}, 1)`;
        const x = width * progress;
        context.moveTo(prevX, calY(prevX));
        context.lineTo(x, calY(x));
        context.stroke();
        prevX = x;
        if (progress<1) {drawId = requestAnimationFrame(drawCurve);}
      }
    })();

    return ()=>{
      unMounted = true;
      cancelAnimationFrame(drawId);
      cancelAnimationFrame(winkId);
    }
  }, []);

  return (
    <canvas ref={canvasRef} height='300' className='w-full'></canvas>
  )
}

function drawXAxis(context, width, height){
  context.beginPath();
  context.strokeStyle = 'rgba(200,200,200,0.3)';
  context.moveTo(0, height/2);
  context.lineTo(width, height/2);
  context.stroke();
}

function fillRecursive(context, x, y, w, h, alpha, limit){
  if (y>=limit||alpha<=0) {return ;}
  context.fillStyle = `rgba(200, 200, 200, ${alpha})`
  context.fillRect(x, y, w, h);
  return fillRecursive(context, x, y+h, w, h, Math.max(0,alpha-0.003))
}

function mapDateToNumber(date) {
  const hour = Number(date.getHours());
  const minute = Number(date.getMinutes())/60;
  return Number((hour+minute).toFixed(2));
}

/*
function drawRecursive(context, x, func, middleX, colorNum, reachTop=false, count=0) {
  if (x<0) {return ;}
  const y = func(x);
  context.lineTo(x, y);
  context.stroke();

  context.beginPath()
  context.strokeStyle = `rgba(${colorNum}, ${colorNum}, ${colorNum}, 1)`;
  context.moveTo(x, y);
  if (!reachTop) {reachTop=x<=middleX}
  reachTop?
    drawRecursive(context, x-4, func, middleX, Math.max(0,colorNum-4), reachTop, count+1):
    drawRecursive(context, x-4, func, middleX, Math.min(255,colorNum+4), reachTop, count+1);
}

 */