// global.d.ts
export {};

// declare global {
//     interface Window {
//         electronAPI: {
//             getActiveWindow: () => Promise<WindowInfo>;
//         }
//     }
// }

declare global {
    interface Window {
        electronAPI: {
            getActiveWindowProcessName: () => void;
            onActiveWindowProcessName: (callback: (name: string) => void) => void;
            fullscreen: ()=>void;
        };
    }
}