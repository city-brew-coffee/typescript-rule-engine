import { parseJson } from './JsonObject';

export abstract class Rule<T> {
  abstract type: string;
  abstract isValid(input: T): boolean;
  toJson = () => JSON.stringify(this);
  toObject = () => parseJson(JSON.stringify(this));
}
