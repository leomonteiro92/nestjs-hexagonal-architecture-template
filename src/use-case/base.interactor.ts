export interface Interactor<T, S> {
  /**
   *
   * @param input T
   * @returns output
   */
  execute(input: T): S
}
