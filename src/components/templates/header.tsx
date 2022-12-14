import Title from "./title";
import ButtonSlider from "./buttonSlider";
import useAppData from "../../data/hook/useAppData";
import Avatar from "../avatar";

interface iHeaderProps {
    title: string;
    subTitle: string;
}

export default function Header({subTitle, title}: iHeaderProps) {
    const {tema, alternarTema} = useAppData();
    return (
        <header className="flex">
            <Title title={title} subTitle={subTitle}/>
            <div className="flex flex-grow justify-end">
                <ButtonSlider currentTheme={tema!} onChange={alternarTema!}/>
                <Avatar/>
            </div>
        </header>
    );
}