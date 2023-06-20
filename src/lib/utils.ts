
type StringOrNull = string | null
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
