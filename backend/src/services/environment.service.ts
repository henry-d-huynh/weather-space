export class EnvironmentService {
  getJwtSecret(): string | undefined {
    return process.env.JWT_SECRET;
  }

  getPort(): string {
    return process.env.PORT ?? "3000";
  }
}
