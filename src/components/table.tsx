import {Client} from "../model/client";
import {IcoEdit, IcoTrash} from "../icons";
interface iTableProps {
    clients: Client[],
    onEdit?: (client: Client) => void;
    onExclude?: (client: Client) => void;
}

export default function Table({clients, onEdit, onExclude}: iTableProps) {
    const hasAction = onEdit || onExclude;

    function renderHead() {
        return (
            <tr>
                <th className="text-left p-4">#</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {hasAction && <th className="text-center p-4">Ações</th>}
            </tr>
        );
    }

    function renderActions(client: Client) {
        const classBtns = 'rounded-full hover:bg-amber-900 hover:text-white p-3';
        return hasAction && (
            <td className="text-left p-4">
                <div className="flex justify-around">
                    {onEdit &&
                        <button
                            type="button"
                            onClick={(_) => onEdit(client)}
                            className={`${classBtns} text-orange-400`}
                        >
                            {IcoEdit}
                        </button>
                    }
                    {onExclude &&
                        <button
                            type="button"
                            onClick={(_) => onExclude(client)}
                            className={`${classBtns} text-red-400`}
                        >
                            {IcoTrash}
                        </button>
                    }
                </div>
            </td>
        );
    }

    function renderBody() {
        return clients?.map((client, idx) => (
            <tr key={client.id} className={idx % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                <td className="text-left p-4">{client.id}</td>
                <td className="text-left p-4">{client.name}</td>
                <td className="text-left p-4">{client.yearOld}</td>
                {hasAction && renderActions(client)}
            </tr>
        ));
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="bg-gray-300">
                {renderHead()}
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    );
}