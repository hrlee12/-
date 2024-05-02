import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

const Drawing = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>();
  const [nowPanel, setNowPanel] = useState(null);

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
    if (canvas) {
      canvas.isDrawingMode = nowPanel === 'brush';
      canvas.renderAll();
    }
  }, [canvas, nowPanel]);

  return (
    <>
      <canvas id='canvas' />
    </>
  );
};
export default Drawing;
