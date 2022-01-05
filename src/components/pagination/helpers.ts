export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
export type Argument = Value | Mapping | Argument[];

// @ts-ignore
export default function classNames(...args: Argument[]): string;
