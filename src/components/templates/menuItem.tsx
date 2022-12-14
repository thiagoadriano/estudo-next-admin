import {ReactNode} from "react";
import Link from "next/link";
interface iMenuItemProps {
    url?:string;
    text:string;
    ico: ReactNode;
    className?: string;
    onClick?: (evt: any) => void
}
export default function MenuItem ({url, ico, text, className, onClick}: iMenuItemProps) {
    function renderLink() {
        return (
            <span title={text} className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200  ${className ?? ''}`}>
                <div className="w-1/4">{ico}</div>
                <span className="text-xs font-light">{text}</span>
            </span>
        );
    }
    return (
        <li onClick={onClick} className='hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer'>
            {url ?
                (
                    <Link href={url}>
                        {renderLink()}
                    </Link>
                ) :
                renderLink()
            }
        </li>
    )
}