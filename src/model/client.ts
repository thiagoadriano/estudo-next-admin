export class Client {
    #id:string;
    #name:string;
    #yearOld:number;

    constructor(name: string, yearOld: number, id:string = '') {
        this.#id = id;
        this.#name = name;
        this.#yearOld = yearOld;
    }

    static emptyInstance() {
        return new Client('', 0);
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get yearOld() {
        return this.#yearOld;
    }
}