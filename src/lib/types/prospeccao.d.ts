export type ProspeccaoDef<T extends string> = Record<T, Prospeccao>;

export interface Prospeccao {
	head: string[];
	content: Content[];
}

export interface Content {
	'nome do condomínio': string;
	endereço: Endereço;
	numero: string;
	bairro: Bairro;
	sindico: string;
	apto: string;
	telefone: '(21) 0000-0000' | `(21) 9 ${number}-${number}`;
	unidades: string;
	administradora: string;
	funcionarios: string;
	data: string;
	id: ReturnType<Crypto['randomUUID']>;
}

export const enum Bairro {
	Leblon = 'LEBLON'
}

export const enum Endereço {
	BartolomeuMitre = 'BARTOLOMEU MITRE',
	GenArtigas = 'GEN. ARTIGAS',
	GenSANMartin = 'GEN. SAN MARTIN',
	GenUrquiza = 'GEN. URQUIZA',
	GenVenancioFlores = 'GEN. VENANCIO FLORES',
	JoseLinhares = 'JOSE LINHARES',
	JoãoLira = 'JOÃO LIRA'
}

export interface ProspeccaoDDB {
	$metadata: Metadata;
	Count: number;
	Items: Content[];
	ScannedCount: number;
}

export interface Metadata {
	httpStatusCode: number;
	requestId: string;
	attempts: number;
	totalRetryDelay: number;
}

export interface Condominio {
	$metadata: Metadata;
	Item: Content;
}
