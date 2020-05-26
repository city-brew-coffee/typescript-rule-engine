import { Rule } from './Rule';
import { ListRuleType, ListRuleCountCompare } from './Enums';

export class ListRule<I> extends Rule<I[]> {
    rule: Rule<I>;
    listRuleType: ListRuleType;
    count?: number;
    comparison?: ListRuleCountCompare;

    type = 'LIST_RULE';

    constructor(rule: Rule<I>, listRuleType: ListRuleType) {
        super();
        this.listRuleType  = listRuleType;
        this.rule = rule;
    }

    private combine(inputs: boolean[]): boolean {
        if (this.listRuleType === 'ALL') {
            return inputs.reduce((acc, curr) => acc && curr, true);
        } else if (this.listRuleType === 'NONE') {
            return !inputs.reduce((acc, curr) => acc || curr, false);
        } else if (this.listRuleType === 'INCLUDES') {
            if (!(this.count && this.comparison)) throw new Error('no count or comparison for list rule combine');
            const trueCount = inputs.filter((input) => input).length;

            if (this.comparison === 'EXACTLY') {
                return trueCount === this.count;
            } else if (this.comparison === 'LESS_THAN') {
                return trueCount < this.count;
            } else if (this.comparison === 'MORE_THAN') {
                return trueCount > this.count;
            } else if (this.comparison === 'AT_LEAST') {
                return trueCount >= this.count;
            } else if (this.comparison === 'NO_MORE_THAN') {
                return trueCount <= this.count;
            } else if (this.comparison === 'ANYTHING_BUT') {
                return trueCount !== this.count;
            } else {
                throw new Error('unreachable code in ListRule combine');
            }
        } else {
            throw new Error('unreachable code in ListRule combine');
        }
    }

    isValid(input: I[]) : boolean {
        return this.combine(input.map((item) => this.rule.isValid(item)));
    }
}