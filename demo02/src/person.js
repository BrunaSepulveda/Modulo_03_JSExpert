export default class Person {
	constructor({ id, vehicles, kmTraveled, from, to }) {
		this.id = id;
		this.vehicles = vehicles;
		this.kmTraveled = kmTraveled;
		this.from = from;
		this.to = to;
	}

	formatted(language) {
		const mapDate = (date) => {
			const [year, month, day] = date.split('-').map(Number)
			return new Date(year, (month - 1), day)
		}
		return {
			id: Number(this.id),
			vehicles: new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(this.vehicles),
			kmTraveled: new Intl.NumberFormat(language, { style: "unit", unit: "kilometer" }).format(this.kmTraveled),
			from: new Intl.DateTimeFormat(language, { month: "long", day: '2-digit', year: 'numeric' }).format(mapDate(this.from)),
			to: new Intl.DateTimeFormat(language, { month: "long", day: '2-digit', year: 'numeric' }).format(mapDate(this.to))
		}
	}

	static throwErrorNumber(field, value) {
		if (isNaN(value)) {
			throw new Error(`O campo ${field} deve ser um número válido`)
		}
	}

	static trowErrorDate(field, value) {
		const SEPARATOR_CHAR = '-';
		const [year, month, day] = value.split(SEPARATOR_CHAR).map(Number);
		if (Number.isNaN(new Date(year, (month - 1), day).getDate())) {
			throw new Error(`O campo ${field} deve ser uma data no formato AAAA-MM-DD`)
		}
	}



	static generateInstanceFromString(text) {
		const EMPTY_SPACE = ' ';
		const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE);
		this.throwErrorNumber('id', id)
		this.throwErrorNumber('km andados', kmTraveled)
		this.trowErrorDate('Início de perído', from)
		this.trowErrorDate('Fim de perído', to)

		const person = new Person({
			id,
			kmTraveled,
			from,
			to,
			vehicles: vehicles.split(','),
		});

		return person
	}
}
