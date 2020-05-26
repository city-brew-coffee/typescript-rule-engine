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
var ListRule = /** @class */ (function (_super) {
    __extends(ListRule, _super);
    function ListRule(rule, listRuleType) {
        var _this = _super.call(this) || this;
        _this.type = 'LIST_RULE';
        _this.listRuleType = listRuleType;
        _this.rule = rule;
        return _this;
    }
    ListRule.prototype.combine = function (inputs) {
        if (this.listRuleType === 'ALL') {
            return inputs.reduce(function (acc, curr) { return acc && curr; }, true);
        }
        else if (this.listRuleType === 'NONE') {
            return !inputs.reduce(function (acc, curr) { return acc || curr; }, false);
        }
        else if (this.listRuleType === 'INCLUDES') {
            if (!(this.count && this.comparison))
                throw new Error('no count or comparison for list rule combine');
            var trueCount = inputs.filter(function (input) { return input; }).length;
            if (this.comparison === 'EXACTLY') {
                return trueCount === this.count;
            }
            else if (this.comparison === 'LESS_THAN') {
                return trueCount < this.count;
            }
            else if (this.comparison === 'MORE_THAN') {
                return trueCount > this.count;
            }
            else if (this.comparison === 'AT_LEAST') {
                return trueCount >= this.count;
            }
            else if (this.comparison === 'NO_MORE_THAN') {
                return trueCount <= this.count;
            }
            else if (this.comparison === 'ANYTHING_BUT') {
                return trueCount !== this.count;
            }
            else {
                throw new Error('unreachable code in ListRule combine');
            }
        }
        else {
            throw new Error('unreachable code in ListRule combine');
        }
    };
    ListRule.prototype.isValid = function (input) {
        var _this = this;
        return this.combine(input.map(function (item) { return _this.rule.isValid(item); }));
    };
    return ListRule;
}(Rule_1.Rule));
exports.ListRule = ListRule;
