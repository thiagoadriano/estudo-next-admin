import Layout from "../../components/templates/layout";
import ClientForm from "../../components/clientForm";
import {Client} from "../../model/client";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import {ClientRepository} from "../../repository/clientRepository";

export default function EditClientPage() {
    const [client, setClient] = useState(Client.emptyInstance());
    const repo = new ClientRepository();
    const router = useRouter();

    useEffect(() => {
        if (!router.query?.id) {
            router.push('/clients');
        } else {
            const id = router.query.id;
            repo.findOne(id as string).then(setClient);
        }
    },[]);
    async function saveClient(client: Client) {
       await repo.save(client);
       await router.push('/clients');
    }

    return (
        <Layout title={'Editar Cliente'} subTitle={'Altere os dados do cliente'}>
            <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-16 px-60 rounded-xl">
                    <h1 className="m-0">Altere os dados do cliente</h1>
                    <ClientForm client={client} onSave={saveClient} isEditing={true}/>
                    <Link href="/clients">
                        <p className="cursor-pointer hover:underline text-center mt-6 text-sm p-2 text-blue-400">Voltar a listagem</p>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}