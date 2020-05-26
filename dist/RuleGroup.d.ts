import { Rule } from './Rule';
import { RuleGroupType, RuleType } from './Enums';
export declare class RuleGroup<T> extends Rule<T> {
    subRules: Rule<T>[];
    ruleGroupType: RuleGroupType;
    type: RuleType;
    constructor(subRules: Rule<T>[], ruleGroupType: RuleGroupType);
    isValid(input: T): boolean;
}
