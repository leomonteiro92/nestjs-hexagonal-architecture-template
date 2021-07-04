export interface Hasher {
  hash(plainText: string): Promise<string>
}

export const HASHER_INTERFACE = 'Hasher'
