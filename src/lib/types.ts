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
	sindico?: string;
	apto: string;
	telefone: '(21) 0000-0000' | `(21) 9 ${number}-${number}`;
	unidades: string;
	administradora: string;
	funcionarios: string;
	data: string;
	id: ReturnType<Crypto['randomUUID']>;
}

export enum Bairro {
	Leblon = 'LEBLON'
}

export enum Endereço {
	BartolomeuMitre = 'BARTOLOMEU MITRE',
	GenArtigas = 'GEN. ARTIGAS',
	GenSANMartin = 'GEN. SAN MARTIN',
	GenUrquiza = 'GEN. URQUIZA',
	GenVenancioFlores = 'GEN. VENANCIO FLORES',
	JoseLinhares = 'JOSE LINHARES',
	JoãoLira = 'JOÃO LIRA'
}

export interface NominatimOpenAPI {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	place_rank: number;
	category: string;
	type: string;
	importance: number;
	address: Address;
	extratags: Extratags;
	namedetails: Namedetails;
}

export interface Address {
	road: string;
	suburb: string;
	city_district: string;
	city: string;
	municipality: string;
	county: string;
	state_district: string;
	state: string;
	'ISO3166-2-lvl4': string;
	region: string;
	postcode: string;
	country: string;
	country_code: string;
}

export interface Extratags {
	lanes?: string;
	oneway: string;
	surface?: string;
}

export interface Namedetails {
	name: string;
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
