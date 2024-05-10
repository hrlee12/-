
const getActiveWindow = async () => {
    window.electronAPI.onActiveWindowProcessName((name) => {
        let isName:boolean = false;

        for(let idx:number = 0; idx<name.length-2; idx++) {
            if (Number(name[idx])! < 48 || Number(name[idx])! > 57)
                isName = true;
        }
        if (!isName)
            return;


        let result:string = "";

        for (let idx:number = 0; idx<name.length-2; idx++) {
            result += String.fromCharCode(Number(name[idx]));
        }
        console.log('Active window process name:', result);


    });

    window.electronAPI.getActiveWindowProcessName();


}


export default getActiveWindow