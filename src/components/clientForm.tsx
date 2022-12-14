import {Client} from "../model/client";
import {FormEvent, useEffect, useState} from "react";
import NotifyError from "./notifyError";
import InputGroup from "./inputGroup";

interface iClientFormProps {
    client?: Client;
    onSave: (client: Client) => void;
    isEditing: boolean;
}
export default function ClientForm({isEditing, onSave, client}:iClientFormProps) {
    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>('');
    const [yearOld, setYearOld] = useState<string>('');
    const [msgError, setMsgError] = useState<string>();

    useEffect(() => {
        if (client) {
            setId(client.id);
            setName(client.name);
            setYearOld(client.yearOld.toString());
        }
    }, [client]);

    function submit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setMsgError('');
        if (!name || !yearOld) {
            setMsgError('Os campos são obrigatórios.');
        } else if(isNaN(Number(yearOld)) || Number(yearOld) < 0) {
            setMsgError('Informe uma idade válida');
        } else {
            onSave(new Client(name!, Number(yearOld!), id));
        }
    }

    return (
        <form onSubmit={submit} className="w-full">
            <NotifyError error={msgError!}/>
            {isEditing && <InputGroup label="ID" value={id!} onChange={setId} readonly/>}
            <InputGroup label="Nome" value={name!} type="text" onChange={setName} required/>
            <InputGroup label="Idade" value={yearOld!} type="number" onChange={setYearOld} required/>
            <div className="flex flex-col">
                <button type="submit" className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
            </div>
        </form>
    );
}