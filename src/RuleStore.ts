import { JsonObject, parseJson } from './JsonObject';
import { RuleGroup } from './RuleGroup';
import { RuleGroupType } from './Enums';
import { Rule } from './Rule';
import { NotRule } from './NotRule';
import { ListRule } from './ListRule';

export class RuleStore {
  builders: { type: string; build: (json: JsonObject) => Rule<any> }[];

  constructor(builders: { type: string; build: (json: JsonObject) => Rule<any> }[]) {
    this.builders = [
      {
        type: RuleGroup.type,
        build: (json) =>
          new RuleGroup(
            json.subRules.map((subrule: JsonObject) => this.build(subrule)),
            json.ruleGroupType as RuleGroupType,
          ),
      },
      {
        type: NotRule.type,
        build: (json) => new NotRule(this.build(json.rule)),
      },
      {
        type: ListRule.type,
        build: (json) => new ListRule(this.build(json.rule), json.listRuleType, json.count, json.comparison),
      },
      ...builders,
    ];
  }

  buildFromJson(json: string) {
    const obj = parseJson(json);
    return this.build(obj);
  }

  build(obj: JsonObject) {
    const builder = this.builders.find((curr) => curr.type === obj.type);
    if (!builder) {
      throw new Error(`No builder found for type: ${obj.type}`);
    } else {
      return builder.build(obj);
    }
  }
}
