import {createContext, useEffect, useState} from "react";

type Tema = 'dark' | '';
interface iAppContext {
    tema?: Tema
    alternarTema?: () => void
}


const AppContext = createContext<iAppContext>({});

export const AppConsumer =  AppContext.Consumer;
export function AppProvider({children}: any) {
    const [tema, setTema] = useState<Tema>('');
    const provider = {
        alternarTema: () => {
            const newTheme  = !tema ? 'dark' : '';
            setTema(newTheme);
            localStorage.setItem('theme', newTheme);
        },
        tema,
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === '' || theme === 'dark') setTema(theme);
    }, []);

    return (
       <AppContext.Provider value={provider}>
           {children}
       </AppContext.Provider>
   );
}
export default AppContext;