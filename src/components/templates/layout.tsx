import SideMenu from "./sideMenu";
import Header from "./header";
import Content from "./content";
import useAppData from "../../data/hook/useAppData";
import GuardRoute from "../../components/guardRoute";

interface iLayoutProps {
    title: string,
    subTitle: string,
    children?: any
}

export default function Layout({children, subTitle, title}: iLayoutProps) {
    const {tema} = useAppData();
    return (
        <GuardRoute>
            <div className={`${tema} flex h-screen w-screen`}>
                <SideMenu/>
                <div className="flex flex-col w-full p-7 bg-gray-200 dark:bg-gray-800">
                    <Header title={title} subTitle={subTitle}/>
                    <Content>{children}</Content>
                </div>
            </div>
        </GuardRoute>
    )
}