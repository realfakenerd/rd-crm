export interface GeoCodeData {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	address: Address;
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
