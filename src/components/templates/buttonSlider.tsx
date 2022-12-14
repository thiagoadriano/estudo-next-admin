import {IcoMoon, IcoSun} from "../../icons";

interface iButtonSliderProps {
    currentTheme: string,
    onChange: () => void
}

export default function ButtonSlider({currentTheme, onChange}: iButtonSliderProps) {
    const ico = currentTheme === 'dark' ? IcoSun : IcoMoon;
    const label = currentTheme === 'dark' ? 'Claro' : 'Escuro';
    return (
        <button type="button" onClick={onChange} className={`
            bg-gradient-to-r from-gray-500  to-gray-700
            dark:from-yellow-300 dark:to-yellow-600
            w-15 lg:w-25 h-8 p-1 rounded-full
            sm:flex items-center justify-end flex-row-reverse
            dark:flex-row dark:justify-start
            hidden 
        `}>
            <div className={`
                w-6 h-6 rounded-full
                flex items-center justify-center
                bg-black text-yellow-300
                dark:bg-white dark:text-yellow-600
            `}>
                {ico(4)}
            </div>
            <div className={`
               mr-2 hidden text-gray-300
               ml-2 dark:text-white
               lg:flex items-center
            `}>
                <span className="text-sm">{label}</span>
            </div>
        </button>
    );
}