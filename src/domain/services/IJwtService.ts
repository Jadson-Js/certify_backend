export interface IJwtService {
  generate(payload: { id: string }): string;
  verify(token: string): Record<string, unknown>;
}
