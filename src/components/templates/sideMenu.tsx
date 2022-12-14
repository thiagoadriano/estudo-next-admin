import MenuItem from "./menuItem";
import {IcoHome, IcoNotify, IcoSettings, IcoExit, IcoClients} from "../../icons"
import Logo from './logo';
import useAuth from "../../data/hook/useAuth";
export default function SideMenu() {
    const {logout} = useAuth();
    return (
        <aside className="flex flex-col dark:bg-gray-900 bg-gray-200">
            <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20">
                <Logo/>
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" text="Início" ico={IcoHome} />
                <MenuItem url="/notifications" text="Notificações" ico={IcoNotify} />
                <MenuItem url="/clients" text="Clientes" ico={IcoClients} />
                <MenuItem url="/configuration" text="Configurações" ico={IcoSettings} />
            </ul>
            <ul>
                <MenuItem onClick={logout}
                          className="dark:text-red-400 dark:hover:text-white text-red-600 hover:bg-red-400 hover:text-white"
                          text="Sair"
                          ico={IcoExit} />
            </ul>
        </aside>
    )
}