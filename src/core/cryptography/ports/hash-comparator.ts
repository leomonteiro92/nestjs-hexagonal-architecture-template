export interface HashComparator {
  compare(plainText: string, digest: string): Promise<boolean>
}

export const HASH_COMPARATOR_INTERFACE = 'HashComparator'
