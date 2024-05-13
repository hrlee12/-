import {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';

const Drawing = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>();
  // const [nowPanel, setNowPanel] = useState(null);
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState<string>('black');
  const [objectCount, setObjectCount] = useState<number>(0);
  const isInitialMount = useRef(true);


  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: 500,
      height: 500,
      isDrawingMode: true, //드로잉모드 true로 안해주면 기본값 false
      backgroundColor: 'white',
    });
    setCanvas(newCanvas);
    isInitialMount.current = false;

    console.log(canvas);
    //언마운트 시 캔버스 정리, 이벤트 제거
    return () => {
      newCanvas.dispose();
    };
  }, []);


  canvas?.on('object:added', (e)=>{
      console.log("IIIIIIIIIIIi");
          // const objects:fabric.Object[] = canvas!.getObjects();

          // console.log(objects);
          // if (objectCount < objects.length){
          //     const newObjects = objects[objects.length-1];
              e.target!.animate('opacity', '0', {
                  duration: 3000,
                  onChange: canvas!.renderAll.bind(canvas),
                  onComplete: function() {
                      canvas!.remove(e.target!);
                  }
              })
          // }

          // setObjectCount(objects.length)
  })
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

  return (
    <>
      <canvas id='canvas' style={{ border: '1px solid red' }} />
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => handleSelectTool()}
        disabled={activeTool === 'select'}
      >
        선택
      </button>
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => handleColorChange('black')}
        disabled={activeTool === 'pen' && color === 'black'}
      >
        검정
      </button>
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => handleColorChange('blue')}
        disabled={activeTool === 'pen' && color === 'blue'}
      >
        파랑
      </button>
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => handleColorChange('green')}
        disabled={activeTool === 'pen' && color === 'green'}
      >
        초록
      </button>
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => handleColorChange('red')}
        disabled={activeTool === 'pen' && color === 'red'}
      >
        빨강
      </button>
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
