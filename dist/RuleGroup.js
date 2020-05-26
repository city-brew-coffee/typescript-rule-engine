"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rule");
var RuleGroup = /** @class */ (function (_super) {
    __extends(RuleGroup, _super);
    function RuleGroup(subRules, ruleGroupType) {
        var _this = _super.call(this) || this;
        _this.type = 'RULE_GROUP';
        _this.subRules = subRules;
        _this.ruleGroupType = ruleGroupType;
        return _this;
    }
    RuleGroup.prototype.isValid = function (input) {
        if (this.ruleGroupType === 'AND') {
            return this.subRules.map(function (rule) { return rule.isValid(input); }).reduce(function (acc, curr) { return acc && curr; }, true);
        }
        else if (this.ruleGroupType === 'OR') {
            return this.subRules.map(function (rule) { return rule.isValid(input); }).reduce(function (acc, curr) { return acc || curr; }, false);
        }
        else {
            throw new Error('unreachable code in RuleGroup.isValid()');
        }
    };
    return RuleGroup;
}(Rule_1.Rule));
exports.RuleGroup = RuleGroup;
