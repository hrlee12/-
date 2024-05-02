import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

const Drawing = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>();
  // const [nowPanel, setNowPanel] = useState(null);
  const [activeTool, setActiveTool] = useState('select');

  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: 500,
      height: 500,
      isDrawingMode: true, //드로잉모드 true로 안해주면 기본값 false
    });
    setCanvas(newCanvas);
    //언마운트 시 캔버스 정리, 이벤트 제거
    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    switch (activeTool) {
      case 'select':
        handleSelectTool();
        break;

      case 'pen':
        handlePenTool();
        break;
    }
  }, [activeTool]);

  const handleSelectTool = () => {
    if (canvas) {
      canvas.isDrawingMode = false;
    }
  };

  const handlePenTool = () => {
    if (canvas) {
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
    }
  };

  // useEffect(() => {
  //   if (canvas) {
  //     canvas.isDrawingMode = nowPanel === 'brush';
  //     canvas.renderAll();
  //   }
  // }, [canvas, nowPanel]);

  return (
    <>
      <canvas id='canvas' style={{ border: '1px solid red' }} />
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => setActiveTool('select')}
        disabled={activeTool === 'select'}
      >
        선택
      </button>
      <button
        style={{ width: '48px', height: '48px', border: '1px solid black' }}
        onClick={() => setActiveTool('pen')}
        disabled={activeTool === 'pen'}
      >
        펜
      </button>
    </>
  );
};
export default Drawing;
