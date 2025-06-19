export class AppError extends Error {
  public status: number;
  public errors?: any;

  constructor(message: string, status = 500, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}