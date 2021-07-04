export interface BaseUseCase<T, S> {
  execute(t: T): S
}
