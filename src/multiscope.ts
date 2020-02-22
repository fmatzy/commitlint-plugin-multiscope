import rules = require('@commitlint/rules');
import { Rule, RuleResult } from './type';

// Copied from @commitlint/types
export type CaseType =
  | 'camel-case'
  | 'kebab-case'
  | 'snake-case'
  | 'pascal-case'
  | 'start-case'
  | 'upper-case'
  | 'uppercase'
  | 'sentence-case'
  | 'sentencecase'
  | 'lower-case'
  | 'lowercase'
  | 'lowerCase';

export interface MultiscopeOptions {
  delimiter?: string | RegExp;
  enum?: string[];
  case?: CaseType;
}

const multiscope: Rule<MultiscopeOptions> = (parsed, when, value = {}) => {
  if (!parsed.scope) {
    return [true, ''];
  }

  const { delimiter = ',', enum: enumValue = [], case: caseValue = 'lower-case' } = value;
  const scopes = parsed.scope.split(delimiter);

  const { ['scope-enum']: enumRule, ['scope-case']: caseRule } = rules;
  const scopeRules: [Rule<any>, any][] = [
    [enumRule, enumValue],
    [caseRule, caseValue],
  ];

  let result: RuleResult = [true, ''];
  scopeRules.every(([rule, ruleValue]) => {
    return scopes.every(scope => {
      const commit = { ...parsed, scope };
      result = rule(commit, when, ruleValue);
      return result[0];
    });
  });

  return result;
};

export default multiscope;
