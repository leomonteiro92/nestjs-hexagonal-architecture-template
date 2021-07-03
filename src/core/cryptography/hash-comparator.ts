export interface HashComparator {
  compare(plainText: string, digest: string): Promise<boolean>;
}
