import {useEffect, useState} from "react";
import {IcoWarn} from "../icons";

interface iNotifyErrorProps {
    error: string|null;
    delayInSeconds?: number
}
export default function NotifyError({error, delayInSeconds}: iNotifyErrorProps) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (error) {
            let timeout = setTimeout(() => setIsVisible(false), delayInSeconds ?? 5 * 1000);
            setIsVisible(true);
            return () => {
                clearTimeout(timeout);
            }
        } else {
            setIsVisible(false);
        }
    }, [error]);

    return isVisible ? (
        <div className="flex items-center bg-red-400 py-3 px-3 color-white border border-red-700 rounded-md">
            {IcoWarn()} <span className="ml-3">{error}</span>
        </div>
    ) : <></>;
}