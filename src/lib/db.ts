import { Dexie, type Table } from 'dexie';

export interface Condominio {
	id?: number;
	nome: string;
	sindico: string;
}

export class CondominioDB extends Dexie {
    condominios!: Table<Condominio>;

    constructor() {
        super('condominiosDatabase');
        this.version(1).stores({
            condominios: '++id, nome, sindico'
        })
    }
}

export const db = new CondominioDB();
