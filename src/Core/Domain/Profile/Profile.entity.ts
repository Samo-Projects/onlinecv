// eslint-disable-next-line prettier/prettier
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsPostalCode, IsString, IsUrl, IsUUID, Length, MinLength } from 'class-validator';

class Profile {
	@IsUUID('4')
	private _uuid: string;

	@IsNotEmpty()
	private _name: string;

	@Length(2, 50)
	@IsString()
	private _firstName: string;

	@Length(2, 50)
	@IsString()
	private _lastName: string;

	@MinLength(5)
	@IsString()
	private _nationality: string;

	@IsDate()
	private _birthDate: Date;

	@IsString()
	private _address: string;

	@IsPostalCode('FR')
	private _postalCode: string;

	@Length(2, 50)
	@IsString()
	private _city: string;

	@Length(2, 50)
	@IsString()
	private _country: string;

	@IsEmail()
	private _email: string;

	@IsOptional()
	@IsString()
	private _profession?: string;

	@IsOptional()
	@IsUrl()
	private _link?: string;

	@IsOptional()
	@IsString()
	private _photo?: string;

	@IsOptional()
	@IsBoolean()
	private _isRoundPhoto?: boolean;

	@IsOptional()
	@IsString()
	private _objective?: string;

	constructor(
		_uuid: string,
		_name: string,
		_firstName: string,
		_lastName: string,
		_nationality: string,
		_birthDate: Date,
		_address: string,
		_postalCode: string,
		_city: string,
		_country: string,
		_email: string,
		_profession?: string,
		_link?: string,
		_photo?: string,
		_isRoundPhoto?: boolean,
		_objective?: string,
	) {
		this._uuid = _uuid;
		this._name = _name;
		this._firstName = _firstName;
		this._lastName = _lastName;
		this._nationality = _nationality;
		this._birthDate = _birthDate;
		this._address = _address;
		this._postalCode = _postalCode;
		this._city = _city;
		this._country = _country;
		this._email = _email;
		this._profession = _profession;
		this._link = _link;
		this._photo = _photo;
		this._isRoundPhoto = _isRoundPhoto;
		this._objective = _objective;
	}

	get uuid(): string {
		return this._uuid;
	}

	get name(): string {
		return this._name;
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	get nationality(): string {
		return this._nationality;
	}

	get birthDate(): Date {
		return this._birthDate;
	}

	get address(): string {
		return this._address;
	}

	get postalCode(): string {
		return this._postalCode;
	}

	get city(): string {
		return this._city;
	}

	get country(): string {
		return this._country;
	}

	get email(): string {
		return this._email;
	}

	get profession(): string | undefined {
		return this._profession;
	}

	get link(): string | undefined {
		return this._link;
	}

	get photo(): string | undefined {
		return this._photo;
	}

	get isRoundPhoto(): boolean | undefined {
		return this._isRoundPhoto;
	}

	get objective(): string | undefined {
		return this._objective;
	}
}

export default Profile;
