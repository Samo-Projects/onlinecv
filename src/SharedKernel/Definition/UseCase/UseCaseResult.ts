import UseCaseError from './UseCaseError';

class UseCaseResult<E = UseCaseError, R = unknown> {
	private error?: E;
	private result?: R;

	isError: boolean;

	constructor(_error?: E, _result?: R) {
		_error ? this.updateError(_error) : this.updateResult(_result);
	}

	getResult(): R {
		return this.result as R;
	}

	getError(): E {
		return this.error as E;
	}

	static fail<E extends UseCaseError, R>(error: E): UseCaseResult<E, R> {
		return new UseCaseResult<E, R>(error);
	}

	static success<R>(result?: R): UseCaseResult<any, R> {
		return new UseCaseResult<any, R>(undefined, result);
	}

	private updateError(error?: E): void {
		this.isError = true;
		this.error = error;
	}

	private updateResult(result?: R): void {
		this.isError = false;
		this.result = result;
	}
}

export default UseCaseResult;
