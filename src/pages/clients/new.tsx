import Link from "next/link";
import {Client} from "../../model/client";
import Layout from "../../components/templates/layout";
import ClientForm from "../../components/clientForm";
import {ClientRepository} from "../../repository/clientRepository";
import route from "next/router";
export default function NewClientPage() {
    const repo = new ClientRepository();
    async function saveClient(client: Client) {
        await repo.save(client);
        await route.push('/clients');
    }

    return (
        <Layout title={'Novo Cliente'} subTitle={'Informe os dados do novo cliente'}>
            <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-16 px-60 rounded-xl">
                    <h1 className="m-0">Informe os dados do novo cliente</h1>
                    <ClientForm onSave={saveClient} isEditing={false}/>
                    <Link href="/clients">
                        <p className="cursor-pointer hover:underline text-center mt-6 text-sm p-2 text-blue-400">Voltar a listagem</p>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}