import useAuth from "../data/hook/useAuth";
import Image from "next/image";
import loading from "../../public/svgs/loading.svg"
import router from "next/router";
export default function GuardRoute({children}) {
    const {isLoading, user} = useAuth();
    function renderChildren() {
        return <>{children}</>
    }
    function renderLoading() {
        return (
            <div className={`
                flex justify-center items-center
                h-screen bg-white
            `}>
                <Image src={loading} loading={"eager"} alt="Carregando...."/>
            </div>
        );
    }

    if (!isLoading && user?.email) {
        return renderChildren();
    } else if (isLoading) {
        return renderLoading();
    } else {
        router.push('/login');
        return null;
    }
}