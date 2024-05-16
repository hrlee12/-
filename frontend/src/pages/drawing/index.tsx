import {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import {Socket} from "@/apis/websocket/fabricSocket.ts";
import {useParams} from "react-router-dom";
import {useAuthStore} from "@/stores/useAuthStore.ts";

const Drawing = () => {
    const {groupId} = useParams();
    const partyId = Number(groupId);
    const token = 1

  const [canvas, setCanvas] = useState<fabric.Canvas | null>();
  const [canvas2, setCanvas2] = useState<fabric.Canvas | null>();
  // const [nowPanel, setNowPanel] = useState(null);
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState<string>('black');
  // const [objectCount, setObjectCount] = useState<number>(0);
const [test, setTest] = useState<string|null>(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: 500,
      height: 500,
      isDrawingMode: true, //드로잉모드 true로 안해주면 기본값 false
      backgroundColor: 'white',
    });
    setCanvas(newCanvas);

      const newCanvas2 = new fabric.Canvas('canvas2', {
          width: 500,
          height: 500,
          isDrawingMode: true, //드로잉모드 true로 안해주면 기본값 false
          backgroundColor: 'white',
      });
      setCanvas2(newCanvas2);



      console.log(canvas);
    //언마운트 시 캔버스 정리, 이벤트 제거
    return () => {
      newCanvas.dispose();
    };
  }, []);

    const chatWsUrl = `https://mogaknyang-back.duckdns.org/ws`;
    const socket = new Socket();
    socket.connect(chatWsUrl, partyId, token);

//     canvas?.on('object:modified', (e)=>{
//         console.log("IIIIIIIIIIIi");
//         // const objects:fabric.Object[] = canvas!.getObjects();
//
//         // console.log(objects);
//         // if (objectCount < objects.length){
//         //     const newObjects = objects[objects.length-1];
//
//         const json = JSON.stringify(e.target?.toJSON());
//         const data = JSON.parse(json);
//         console.log(json);
// // canvas2?.loadFromJSON(data, canvas2.renderAll.bind(canvas2));        // canvas2?.loadFromJSON(data, canvas2.renderAll.bind(canvas2));
// canvas2?.add(data);
//
//         // }

        // setObjectCount(objects.length)
    // })

    canvas?.on('object:added', (e)=>{
        e.target!.animate('opacity', '0', {
            duration: 3000,
            onChange: canvas!.renderAll.bind(canvas),
            onComplete: function() {
                canvas!.remove(e.target!);
            }
        })

        const data = JSON.stringify(e.target?.toJSON());
        console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
        console.log("before : " + data);
        socket.sendMessage(partyId, data);


    })

    // socket.onMessage((data:string) => {
    //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    //
    //     const replace = JSON.stringify(JSON.parse(data).object).slice(1).replace(/\\"/g, '"');
    //     console.log(replace);
    //     if (test !== null) {
    //         if (test === null){
    //             console.log("same");
    //             console.log(test);
    //             // console.log(replace);
    //
    //         } else {
    //             console.log("heart");
    //             // console.log(replace);
    //             console.log(test);
    //
    //
    //         }
    //     } else {
    //         console.log("test is null");
    //     }
    //     //
    //     // console.log("replace : " + replace);
    //     // console.log("after : " + data);
    //     // console.log('delete object : ' + JSON.parse(data).object);
    //     fabric.util.enlivenObjects([JSON.parse(data).object], function(objects:fabric.Object[]) {
    //         const origRenderOnAddRemove = canvas2?.renderOnAddRemove;
    //         if (canvas2 == undefined) return;
    //         canvas2!.renderOnAddRemove = false;
    //
    //         objects.forEach(function(o) {
    //             o.animate('opacity', '0', {
    //                 duration: 3000,
    //                 onChange: canvas2!.renderAll.bind(canvas2),
    //                 onComplete: function () {
    //                     canvas2!.remove(o);
    //                 }
    //             });
    //             canvas2?.add(o);
    //         });
    //
    //         if(canvas2 == undefined) return;
    //         canvas2!.renderOnAddRemove = origRenderOnAddRemove;
    //         canvas2?.renderAll();
    //     }, "fabric");
    // })
    canvas?.on('object:added', (e)=>{
    //     console.log("hi");
    //     // const objects:fabric.Object[] = canvas!.getObjects();
    //
    //     // console.log(objects);
    //     // if (objectCount < objects.length){
    //     //     const newObjects = objects[objects.length-1];
    //     // console.log(typeof e.target!);
    //     // console.log(e.target);
    //     // console.log("canvas : ", canvas);
    //     e.target!.animate('opacity', '0', {
    //         duration: 3000,
    //         onChange: canvas!.renderAll.bind(canvas),
    //         onComplete: function() {
    //             canvas!.remove(e.target!);
    //         }
    //     })
        const json = JSON.stringify(e.target?.toJSON());
    //     // const data = JSON.parse(json);
    //     // console.log(json);
    //     // canvas2?.add(data);
    //     // canvas2?.loadFromJSON(data!, ()=>{});
    //     // canvas2?.loadFromJSON(data, canvas2.renderAll.bind(canvas2));
    //     console.log("json : " + JSON.parse(json));
        setTest(json);
    //     //
    //     // fabric.util.enlivenObjects([JSON.parse(json)], function(objects:fabric.Object[]) {
    //     //     const origRenderOnAddRemove = canvas2?.renderOnAddRemove;
    //     //     canvas2!.renderOnAddRemove = false;
    //     //
    //     //     objects.forEach(function(o) {
    //     //         o.animate('opacity', '0', {
    //     //             duration: 3000,
    //     //             onChange: canvas2!.renderAll.bind(canvas2),
    //     //             onComplete: function () {
    //     //                 canvas2!.remove(o);
    //     //             }
    //     //         });
    //     //         canvas2?.add(o);
    //     //     });
    //     //
    //     //     canvas2!.renderOnAddRemove = origRenderOnAddRemove;
    //     //     canvas2?.renderAll();
    //     // }, "fabric");
    //
    //     // }
    //
    //     // setObjectCount(objects.length)
    })

    // canvas3?.on('object:added', (e)=>{
    //     console.log("hi");
    //     // const objects:fabric.Object[] = canvas!.getObjects();
    //
    //     // console.log(objects);
    //     // if (objectCount < objects.length){
    //     //     const newObjects = objects[objects.length-1];
    //     // console.log(typeof e.target!);
    //     // console.log(e.target);
    //     // console.log("canvas : ", canvas);
    //     e.target!.animate('opacity', '0', {
    //         duration: 3000,
    //         onChange: canvas!.renderAll.bind(canvas),
    //         onComplete: function() {
    //             canvas!.remove(e.target!);
    //         }
    //     })
    //     const json = JSON.stringify(e.target?.toJSON());
    //     // const data = JSON.parse(json);
    //     // console.log(json);
    //     // canvas2?.add(data);
    //     // canvas2?.loadFromJSON(data!, ()=>{});
    //     // canvas2?.loadFromJSON(data, canvas2.renderAll.bind(canvas2));
    //
    //     fabric.util.enlivenObjects([JSON.parse(json)], function(objects:fabric.Object[]) {
    //         const origRenderOnAddRemove = canvas2?.renderOnAddRemove;
    //         canvas2!.renderOnAddRemove = false;
    //
    //         objects.forEach(function(o) {
    //             o.animate('opacity', '0', {
    //                 duration: 3000,
    //                 onChange: canvas2!.renderAll.bind(canvas2),
    //                 onComplete: function () {
    //                     canvas2!.remove(e.target!);
    //                 }
    //             });
    //             canvas2?.add(o);
    //         });
    //
    //         canvas2!.renderOnAddRemove = origRenderOnAddRemove;
    //         canvas2?.renderAll();
    //     }, "fabric");
    //
    //     // }
    //
    //     // setObjectCount(objects.length)
    // })

    // canvas2?.on('object:modified', (e)=>{
    //     console.log("IIIIIIIIIIIi");
    //     // const objects:fabric.Object[] = canvas!.getObjects();
    //
    //     // console.log(objects);
    //     // if (objectCount < objects.length){
    //     //     const newObjects = objects[objects.length-1];
    //
    //     const json = JSON.stringify(canvas2.toJSON());
    //     const data = JSON.parse(json);
    //     console.log(json);
    //
    //     canvas?.loadFromJSON(data, canvas.renderAll.bind(canvas));
    //
    //
    //     // }
    //
    //     // setObjectCount(objects.length)
    // })
    // canvas2?.on('object:added', (e)=>{
    //     console.log("IIIIIIIIIIIi");
    //     // const objects:fabric.Object[] = canvas!.getObjects();
    //
    //     // console.log(objects);
    //     // if (objectCount < objects.length){
    //     //     const newObjects = objects[objects.length-1];
    //     e.target!.animate('opacity', '0', {
    //         duration: 3000,
    //         onChange: canvas2!.renderAll.bind(canvas2),
    //         onComplete: function() {
    //             canvas2!.remove(e.target!);
    //         }
    //     })
    //     const json = JSON.stringify(canvas2.toJSON());
    //     const data = JSON.parse(json);
    //     console.log(json);
    //
    //     canvas?.loadFromJSON(data, canvas.renderAll.bind(canvas));
    //
    //
    //     // }
    //
    //     // setObjectCount(objects.length)
    // })


    // canvas?.on
  // useEffect(()=>{
  //     console.log(canvas);
  //     // if (isInitialMount.current)
  //     //     return;
  //     //
  //     // const objects:fabric.Object[] = canvas!.getObjects();
  //     //
  //     // console.log(objects);
  //     // if (objectCount < objects.length){
  //     //     const newObjects = objects[objects.length-1];
  //     //     newObjects.animate('opacity', '0', {
  //     //         duration: 5000,
  //     //         onChange: canvas!.renderAll.bind(canvas),
  //     //         onComplete: function() {
  //     //             canvas!.remove(newObjects);
  //     //         }
  //     //     })
  //     // }
  //     //
  //     // setObjectCount(objects.length)
  // }, [canvas?.targets])


  const handleColorChange = (newColor: string) => {
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor;
      canvas.freeDrawingBrush.width = 7;
      canvas.isDrawingMode = true;
      setColor(newColor);
      setActiveTool('pen');
    }
  };

  // const setEraser = () => {
  //   if (canvas) {
  //     setActiveTool('pen');
  //     canvas.isDrawingMode = true;
  //     canvas.freeDrawingBrush.color = canvas.backgroundColor as string;
  //     canvas.freeDrawingBrush.width = 15;
  //   }
  // };

  const handleSelectTool = () => {
    if (canvas) {
      setActiveTool('select');
      canvas.isDrawingMode = false;
    }
  };
    //
    // let isDrawing = false;
    // let currentLine :fabric.Line|null = null;
    //
    // canvas?.on('mouse:down', function(options) {
    //     isDrawing = true;
    //     const pointer = canvas!.getPointer(options.e);
    //     const points = [pointer.x, pointer.y, pointer.x, pointer.y];
    //     currentLine = new fabric.Line(points, {
    //         strokeWidth: 5,
    //         fill: 'red',
    //         stroke: 'red',
    //         originX: 'center',
    //         originY: 'center',
    //     });
    //     canvas!.add(currentLine);
    // });
    //
    // canvas?.on('mouse:move', function(options) {
    //     if (!isDrawing) return;
    //     const pointer = canvas!.getPointer(options.e);
    //     currentLine!.set({ x2: pointer.x, y2: pointer.y });
    //     canvas!.renderAll();
    //
    //     const newLine = new fabric.Line([currentLine!.x1!, currentLine!.y1!, pointer.x, pointer.y], {
    //         strokeWidth: currentLine!.strokeWidth,
    //         fill: currentLine!.stroke,
    //         stroke: currentLine!.stroke,
    //         originX: 'center',
    //         originY: 'center',
    //         borderColor: 'red'
    //     });
    //     canvas?.add(newLine);
    //
    //     canvas?.renderAll();
    //
    // });
    //
    // canvas?.on('mouse:up', function() {
    //     isDrawing = false;
    //     currentLine = null;
    // });



  return (
      <>

          <canvas id='canvas2' style={{border: '1px solid red'}}/>
         <canvas id='canvas' style={{border: '1px solid red'}}/>
          <button
              style={{width: '48px', height: '48px', border: '1px solid black'}}
              onClick={() => handleSelectTool()}
              disabled={activeTool === 'select'}
          >
              선택
          </button>
          <button
              style={{width: '48px', height: '48px', border: '1px solid black'}}
              onClick={() => handleColorChange('black')}
              disabled={activeTool === 'pen' && color === 'black'}
          >
              검정
          </button>
          <button
              style={{width: '48px', height: '48px', border: '1px solid black'}}
              onClick={() => handleColorChange('blue')}
              disabled={activeTool === 'pen' && color === 'blue'}
          >
              파랑
          </button>
          <button
              style={{width: '48px', height: '48px', border: '1px solid black'}}
              onClick={() => handleColorChange('green')}
              disabled={activeTool === 'pen' && color === 'green'}
          >
              초록
          </button>
          <button
              style={{width: '48px', height: '48px', border: '1px solid black'}}
              onClick={() => handleColorChange('red')}
              disabled={activeTool === 'pen' && color === 'red'}
          >
              빨강
          </button>
          {/*<button*/}
          {/*    style={{width: '48px', height: '48px', border: '1px solid black'}}*/}
          {/*    onClick={newLine}*/}
          {/*    disabled={activeTool === 'pen' && color === 'red'}*/}
          {/*>*/}
          {/*    테스트*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  style={{ width: '48px', height: '48px', border: '1px solid black' }}*/}
          {/*  onClick={() => setEraser()}*/}
          {/*>*/}
          {/*  지우개*/}
          {/*</button>*/}
      </>
  );
};
export default Drawing;
