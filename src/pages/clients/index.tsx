import Layout from "../../components/templates/layout";
import Table from "../../components/table";
import {Client} from "../../model/client";
import Link from "next/link";
import route from "next/router";
import {useEffect, useState} from "react";
import {ClientRepository} from "../../repository/clientRepository";
export default function ClientsPage() {
    const repo = new ClientRepository();
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        repo.list().then(setClients);
    }, [])
    function edit(client: Client) {
        route.push(`/clients/${client.id}`);
    }

    function exclude(client: Client) {
        repo.remove(client.id);
        setClients(clients.filter(cl => cl.id !== client.id));
    }

    return (
        <Layout title={'Clientes'} subTitle={'Aqui pode visualizar os clientes'}>
            <div className="flex justify-end m-4">
                <Link href="/clients/new">
                    <button type="button" className="bg-blue-500 hover:bg-blue-300 text-white rounded-lg py-2 px-6">Novo Cliente</button>
                </Link>
            </div>

            <div>
                {
                    clients.length ?
                        <Table clients={clients}
                               onEdit={edit}
                               onExclude={exclude}
                        /> :
                    <p className="mt-5 text-center">Não há clientes cadastrados</p>
                }
            </div>
        </Layout>
    )
}
