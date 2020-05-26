export declare abstract class Rule<T> {
    abstract type: string;
    abstract isValid(input: T): boolean;
}
