import { Rule } from './Rule';
import { ListRuleType, ListRuleCountCompare } from './Enums';
export declare class ListRule<I> extends Rule<I[]> {
    rule: Rule<I>;
    listRuleType: ListRuleType;
    count?: number;
    comparison?: ListRuleCountCompare;
    type: string;
    constructor(rule: Rule<I>, listRuleType: ListRuleType);
    private combine;
    isValid(input: I[]): boolean;
}
