import { Dexie, type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export interface Condominio {
	id?: number;
	nome: string;
	sindico: string;
}

export class CondominioDB extends Dexie {
    condominios!: Table<Condominio>;

    constructor() {
        super('condominiosDatabase', {addons: [dexieCloud]});
        this.version(1).stores({
            condominios: '@id, nome, sindico'
        })

        this.cloud.configure({
            databaseUrl: 'https://z1nz9pi51.dexie.cloud'
        })
    }
}

export const db = new CondominioDB();
