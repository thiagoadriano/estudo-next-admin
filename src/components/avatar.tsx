import useAuth from "../data/hook/useAuth";
import Link from "next/link";
import Image from "next/image";

export default function Avatar() {
    const {user} = useAuth();
    return (
        <Link href="/profile">
            <div className="h-10 w-10 rounded-full cursor-pointer ml-3 overflow-hidden">
                <img
                    referrerPolicy="no-referrer"
                    src={user?.imageProfile ?? '/svgs/user-anonymous.svg'}
                    alt="Foto do usuário"/>
            </div>
        </Link>
    )
}