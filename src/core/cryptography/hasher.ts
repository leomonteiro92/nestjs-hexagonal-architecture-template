export interface Hasher {
  hash(plainText: string): Promise<string>
}

export abstract class Hasher {}
