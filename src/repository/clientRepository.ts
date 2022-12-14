import {Client} from "../model/client";
import firebase from '../firebase/config';
export class ClientRepository {
    #converter = {
        toFirestore(client: Client) {
            return {
                nome: client.name,
                idade: client.yearOld
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
            const data = snapshot.data(options);
            return new Client(data.nome, data.idade, snapshot.id);
        }
    }

    save(client: Client) {
        if (client?.id) {
            return this.update(client);
        } else {
            return this.insert(client);
        }
    }

    private async insert(client: Client) {
        const docRef = await this.collection.add(client);
        return (await docRef.get()).data();
    }

    private async update(client: Client) {
        await this.collection.doc(client.id).set(client);
        return client;
    }

    async list(): Promise<Client[]> {
        const docRef = await this.collection.get();
        return docRef.docs.map(dt => {
            return dt.data() as Client
        });
    }
    async findOne(id: string): Promise<Client> {
        const data = await this.collection.doc(id).get();
        return data.data() as Client;
    }

    remove(id:string) {
        this.collection.doc(id).delete();
    }

    private get collection() {
        return firebase.firestore().collection('clientes').withConverter(this.#converter as any);
    }
}