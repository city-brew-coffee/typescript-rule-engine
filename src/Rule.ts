import { parseJson } from './JsonObject';

export abstract class Rule<T, R = boolean> {
  abstract type: string;
  abstract isValid(input: T): R;
  toJson = () => JSON.stringify(this);
  toObject = () => parseJson(JSON.stringify(this));
}
