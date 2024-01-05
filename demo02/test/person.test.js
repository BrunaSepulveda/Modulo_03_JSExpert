import mocha from 'mocha'
const { describe, it } = mocha;
import chai from 'chai'
const { expect } = chai;
import Person from '../src/person.js'

describe('Person', () => {
	it('should return a person instace from a string', () => {
		const person = Person.generateInstanceFromString('1 Bike,Carro 20000 2020-01-01 2020-02-01')
		const expected = {
			id: '1',
			vehicles: ['Bike', 'Carro'],
			kmTraveled: '20000',
			from: '2020-01-01',
			to: '2020-02-01'
		}
		expect(person).to.be.deep.equal(expected)
	})
  it('error validating number', () => {
    expect(() => Person.generateInstanceFromString('1 Bike,Carro TEXT_SHOULD_BE_NUMBER 2020-01-01 2020-02-01')).to.throw('O campo km andados deve ser um número válido');
	})
  it('error validating Date', () => {
    expect(() => Person.generateInstanceFromString('1 Bike,Carro 20000 2020-MM-01 2020-02-01')).to.throw('O campo Início de perído deve ser uma data no formato AAAA-MM-DD');
	})
	it('should format values', () => {
		const person = new Person({
			id: '1',
			vehicles: ['Bike', 'Carro'],
			kmTraveled: '20000',
			from: '2020-01-01',
			to: '2020-02-01'
		})
		const result = person.formatted('pt-BR')
		const expected = {
			id: 1,
			vehicles: 'Bike e Carro',
			kmTraveled: '20.000 km',
			from: '01 de janeiro de 2020',
			to: '01 de fevereiro de 2020'
		}
		expect(result).to.be.deep.equal(expected)
	})
})