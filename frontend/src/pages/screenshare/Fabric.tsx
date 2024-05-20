import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "fabric/fabric-impl";
import {fabric} from "fabric";
import './fabric.css';

const Fabric:React.FC = ()=>{

    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<fabric.Canvas|null>();
    const [activeTool, setActiveTool] = useState<string>('select');
    const [canvasStyle, setCanvasStyle] = useState<string>("");
    useEffect(() => {
        console.log()
        const newCanvas:Canvas = new fabric.Canvas(canvasRef.current, {
            width: 500,
            height: 500
        });
        setCanvas(newCanvas);

        return ()=>{
            newCanvas.dispose();
        }
    }, []);



    useEffect(()=>{
        if (canvas) {
            canvas.isDrawingMode = true;
            canvas.renderAll();
        }
    }, [canvas]);

    useEffect(()=>{
        if (!canvasRef.current || !canvas) return;

        switch (activeTool){
            case "select":
                handleSelectTool();
                break;
            case "pen":
                handlePenTool();
                break;
            case "eraser":
                handleEraseTool();
                break;
        }
    }, [activeTool])

    const handleSelectTool = () => {
        canvas!.isDrawingMode = false;
        setCanvasStyle("");
    }

    const handlePenTool = () =>{
        canvas!.freeDrawingBrush.width = 5;
        canvas!.isDrawingMode = true;
        setCanvasStyle("");
    }

    const handleEraseTool = () => {
        canvas!.isDrawingMode = false;
        setCanvasStyle("erase-mode");
    }
    const useEraser = () => {
        if (activeTool === 'eraser' && canvas!.getActiveObject())
            canvas!.remove(canvas!.getActiveObject()!);
    }
    return (
        <>
            <canvas id='canvas' className={canvasStyle} ref={canvasRef} onClick={useEraser}/>
            <button
                style={{width: '48px', height: '48px', border: '1px solid black'}}
                onClick={() => setActiveTool('select')}
                disabled={activeTool === 'select'}
            >
                선택
            </button>
            <button
                style={{width: '48px', height: '48px', border: '1px solid black'}}
                onClick={() => setActiveTool('pen')}
                disabled={activeTool === 'pen'}
            >
                펜
            </button>
            <button
                style={{width: '48px', height: '48px', border: '1px solid black'}}
                onClick={() => setActiveTool('eraser')}
                disabled={activeTool === 'pen'}
            >
                펜
            </button>
            <canvas id='canvas'/>

        </>
    )
}


export default Fabric;
