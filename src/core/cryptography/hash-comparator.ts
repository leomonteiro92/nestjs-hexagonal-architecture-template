export interface IHashComparator {
  compare(plainText: string, digest: string): Promise<boolean>
}

export abstract class HashComparator {}
