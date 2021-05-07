import { ProfileBuilder } from 'Core/Domain/Profile';

class StubProfileBuilder extends ProfileBuilder {
	protected uuid = '1';
	protected name = 'Profil : Samir ZEKRI';
	protected firstName = 'Samir';
	protected lastName = 'ZEKRI';
	protected nationality = 'Française';
	protected birthDate = new Date(1992, 4, 20);
	protected address = '1 rue Marcel Paul';
	protected postalCode = '27140';
	protected city = 'Gisors';
	protected country = 'France';
	protected email = 'szekri6@gmail.com';
}

export default StubProfileBuilder;
