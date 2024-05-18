import {useEffect, useState} from 'react';
import { fabric } from 'fabric';
import {Socket} from "@/apis/websocket/fabricSocket.ts";
import {useParams} from "react-router-dom";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import './index.css';


const Drawing = () => {
    const {groupId} = useParams();
    const partyId = Number(groupId);
    const token = useAuthStore.getState().accessToken

  const [canvas, setCanvas] = useState<fabric.Canvas | null>();
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState<string>('black');
  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: window.screen.width,
      height: window.screen.height,
      isDrawingMode: true, //드로잉모드 true로 안해주면 기본값 false
    });
    setCanvas(newCanvas);



    window.electronAPI.fullscreen()


    //언마운트 시 캔버스 정리, 이벤트 제거
    return () => {
      newCanvas.dispose();
    };
  }, []);

    const chatWsUrl = `https://mogaknyang-back.duckdns.org/ws`;
    const socket = new Socket();
    socket.connect(chatWsUrl, partyId, token);



    canvas?.on('object:added',  (e)=> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (e.target?.flag !== null && e.target?.flag === true) {
            console.log("HI");
            return;
        }
        console.log("ADD@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222");

        e.target!.animate('opacity', '0', {
            duration: 3000,
            onChange: canvas!.renderAll.bind(canvas),
            onComplete: function () {
                canvas!.remove(e.target!);
            }
        })

        const data = JSON.stringify(e.target?.toJSON());
        socket.sendMessage(partyId, data, chatWsUrl, token!);


    });

    socket.onMessage((data:string) => {

        // canvas?.off('object:added', onObjectAdded);
        const replace = JSON.stringify(JSON.parse(data).object).slice(1, -1).replace(/\\"/g, '"');

        fabric.util.enlivenObjects([JSON.parse(replace)], function(objects:fabric.Object[]) {
            const origRenderOnAddRemove = canvas?.renderOnAddRemove;
            if (canvas == undefined) return;
            canvas!.renderOnAddRemove = false;

            objects.forEach(function(o) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                o.flag = true;
                o.animate('opacity', '0', {
                    duration: 3000,
                    onChange: canvas!.renderAll.bind(canvas),
                    onComplete: function () {
                        canvas!.remove(o);
                    }
                });
                canvas?.add(o);
            });

            if(canvas == undefined) return;
            canvas!.renderOnAddRemove = origRenderOnAddRemove;
            canvas?.renderAll();
        }, "fabric");
    })



  const handleColorChange = (newColor: string) => {
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor;
      canvas.freeDrawingBrush.width = 7;
      canvas.isDrawingMode = true;
      setColor(newColor);
      setActiveTool('pen');
    }
  };



  const handleSelectTool = () => {
    if (canvas) {
      setActiveTool('select');
      canvas.isDrawingMode = false;
    }
  };


  return (
      <div className = "drawing-container" style={{position: 'relative'}}>
         <canvas id='canvas' />
          {/*<button*/}
          {/*    style={{width: '48px', height: '48px', border: '1px solid black'}}*/}
          {/*    onClick={() => handleSelectTool()}*/}
          {/*    disabled={activeTool === 'select'}*/}
          {/*>*/}
          {/*    선택*/}
          {/*</button>*/}
          <button
              style={{width: '48px', height: '48px', border: '5px solid white', borderRadius: '180px', backgroundColor: 'black', position: 'absolute', bottom: '40px' , right:'260px'}}
              onClick={() => handleColorChange('black')}
              disabled={activeTool === 'pen' && color === 'black'}
          >
          </button>
          <button
              style={{width: '48px', height: '48px', border: '5px solid white', borderRadius: '180px', backgroundColor: 'blue', position: 'absolute', bottom: '40px', right: '180px'}}
              onClick={() => handleColorChange('blue')}
              disabled={activeTool === 'pen' && color === 'blue'}
          >
          </button>
          <button
              style={{width: '48px', height: '48px', border: '5px solid white', borderRadius: '180px', backgroundColor: 'green', position: 'absolute', bottom: '40px', right: '100px' }}
              onClick={() => handleColorChange('green')}
              disabled={activeTool === 'pen' && color === 'green'}
          >
          </button>
          <button
              style={{width: '48px', height: '48px', border: '5px solid white', borderRadius: '180px', backgroundColor: 'red', position: 'absolute', bottom: '40px', right: '20px' }}
              onClick={() => handleColorChange('red')}
              disabled={activeTool === 'pen' && color === 'red'}
          >

          </button>

      </div>
  );
};
export default Drawing;
