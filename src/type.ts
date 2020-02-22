import { Commit } from '@commitlint/parse';

export type When = 'never' | 'always';

export type RuleResult = [boolean, string];

export type Rule<T = any> = (parsed: Partial<Commit>, when?: When, value?: T) => RuleResult;

export type Rules = Record<string, Rule>;

export interface CommitlintPlugin {
  rules: Rules;
}
