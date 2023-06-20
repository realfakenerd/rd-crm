import type { Address, NominatimOpenAPI } from "./types";

type StringOrNull = string | null;
export function extractFormData(data: FormData) {
	const administradora = data.get('Admnistradora') as StringOrNull;
	const sindico = data.get('Sindico') as StringOrNull;
	const unidades = data.get('Unidades') as StringOrNull;
	const funcionarios = data.get('Funcionarios') as StringOrNull;
	const endereço = data.get('Endereço') as StringOrNull;
	const numero = data.get('Numero') as StringOrNull;
	const apto = data.get('Apto') as StringOrNull;
	const bairro = data.get('Bairro') as StringOrNull;
	const nome = data.get('Nome') as StringOrNull;
	const telefone = data.get('Telefone') as StringOrNull;
	const calendarData = data.get('Data') as StringOrNull;

	return {
		nome,
		endereço,
		numero,
		apto,
		bairro,
		sindico,
		unidades,
		funcionarios,
		telefone,
		administradora,
		data: calendarData
	};
}

interface EmbedLinkOptions {
	latitude: string;
	longitude: string;
	address: Address;
	tolog: NominatimOpenAPI
}

export function generateEmbedLink({ latitude, longitude, address, tolog }: EmbedLinkOptions) {
	const baseUrl = "https://www.google.com/maps/embed?";
  let params = "";

  console.log(tolog);
  const encodedAddress = encodeURI(`${address.road} ${address.suburb} ${address.city}`);
 
  params += "pb=!1m18";
  params += "!1m12!1m3!1d3359.9355246584155";
  params += "!2d" + longitude.toString();
  params += "!3d" + latitude.toString();
  params += "!2m3!1f0!2f0!3f0";
  params += "!3m2!1i1024!2i768";
  params += "!4f13.1";
  params += "!3m3!1m2!1s" + encodedAddress;
  params += "!2s" + 'pt-BR';
  params += "!5e1";
  params += "!4v" + Date.now().toString();
  params += "!5m2!1spt-BR!2sbr";
  params += "!6m1!1e1";
  params += "!7i" + tolog.place_id;

  const embedUrl = baseUrl + params;

  console.log(embedUrl)
  return embedUrl;
}
