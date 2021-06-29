import { int, str } from "./__python_types__";
import { SExp } from "./SExp";
import { Bytes, Tuple } from "./__type_compatibility__";
import { CLVMObject } from "./CLVMObject";
export declare const KEYWORD_FROM_ATOM: {
    "00": string;
    "01": string;
    "02": string;
    "03": string;
    "04": string;
    "05": string;
    "06": string;
    "07": string;
    "08": string;
    "09": string;
    "0a": string;
    "0b": string;
    "0c": string;
    "0d": string;
    "0e": string;
    "0f": string;
    "10": string;
    "11": string;
    "12": string;
    "13": string;
    "14": string;
    "15": string;
    "16": string;
    "17": string;
    "18": string;
    "19": string;
    "1a": string;
    "1b": string;
    "1c": string;
    "1d": string;
    "1e": string;
    "1f": string;
    "20": string;
    "21": string;
    "22": string;
    "23": string;
    "24": string;
};
export declare const KEYWORD_TO_ATOM: {
    q: string;
    a: string;
    i: string;
    c: string;
    f: string;
    r: string;
    l: string;
    x: string;
    "=": string;
    ">s": string;
    sha256: string;
    substr: string;
    strlen: string;
    concat: string;
    "+": string;
    "-": string;
    "*": string;
    "/": string;
    divmod: string;
    ">": string;
    ash: string;
    lsh: string;
    logand: string;
    logior: string;
    logxor: string;
    lognot: string;
    point_add: string;
    pubkey_for_exp: string;
    not: string;
    any: string;
    all: string;
    ".": string;
    softfork: string;
};
export declare const OP_REWRITE: {
    "+": string;
    "-": string;
    "*": string;
    "/": string;
    i: string;
    c: string;
    f: string;
    r: string;
    l: string;
    x: string;
    "=": string;
    ">": string;
    ">s": string;
};
export declare type ATOMS = keyof typeof KEYWORD_FROM_ATOM;
export declare type KEYWORDS = keyof typeof KEYWORD_TO_ATOM;
export declare function args_len(op_name: str, args: SExp): Generator<number, void, unknown>;
export declare function default_unknown_op(op: Bytes, args: SExp): Tuple<int, CLVMObject>;
export declare const QUOTE_ATOM: Bytes;
export declare const APPLY_ATOM: Bytes;
declare type TOpFunc<R = unknown> = (args: SExp) => R;
declare type TBasicAtom = "quote_atom" | "apply_atom";
declare type TAtomOpFunctionMap<A extends str = ATOMS> = Record<A, TOpFunc> & Partial<Record<TBasicAtom, Bytes>>;
export declare type TOperatorDict<A extends str = ATOMS> = {
    unknown_op_handler: typeof default_unknown_op;
} & ((op: Bytes, args: SExp) => Tuple<int, CLVMObject>) & TAtomOpFunctionMap<A> & Record<TBasicAtom, Bytes>;
export declare function OperatorDict<A extends str = ATOMS>(atom_op_function_map: TAtomOpFunctionMap<A>, quote_atom?: Bytes, apply_atom?: Bytes, unknown_op_handler?: typeof default_unknown_op): TOperatorDict<A>;
export declare const OPERATOR_LOOKUP: TOperatorDict<"00" | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "0a" | "0b" | "0c" | "0d" | "0e" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "1a" | "1b" | "1d" | "1e" | "20" | "21" | "22" | "23" | "24" | "0f" | "1c" | "1f">;
export {};
