export interface EncrypterPort {
  encrypt(payload: Record<string, unknown>): Promise<string>
}
