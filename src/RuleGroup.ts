import { Rule } from './Rule';
import { RuleGroupType, RuleType } from './Enums';
export class RuleGroup<T> extends Rule<T> {

    subRules: Rule<T>[];
    ruleGroupType: RuleGroupType;
    type: RuleType = 'RULE_GROUP';

    constructor(subRules: Rule<T>[], ruleGroupType: RuleGroupType) {
        super();
        this.subRules = subRules;
        this.ruleGroupType = ruleGroupType;
    }

    isValid(input: T): boolean {
        if (this.ruleGroupType === 'AND') {
            return this.subRules.map((rule) => rule.isValid(input)).reduce((acc, curr) => acc && curr, true);
        } else if (this.ruleGroupType === 'OR') {
            return this.subRules.map((rule) => rule.isValid(input)).reduce((acc, curr) => acc || curr, false);
        } else {
            throw new Error('unreachable code in RuleGroup.isValid()');
        }
    }

}