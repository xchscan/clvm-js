import { G1Element } from "@chiamine/bls-signatures";
import { int, None, Optional, str } from "./__python_types__";
import { CLVMObject, CLVMType } from "./CLVMObject";
import { Bytes, Tuple } from "./__type_compatibility__";
export declare type CastableType = SExp | CLVMType | Bytes | str | int | None | G1Element | CastableType[] | Tuple<CastableType, CastableType>;
export declare function looks_like_clvm_object(o: any): o is CLVMObject;
export declare function convert_atom_to_bytes(v: any): Bytes;
export declare function to_sexp_type(value: CastableType): CLVMObject;
export declare class SExp implements CLVMType {
    atom: Optional<Bytes>;
    pair: Optional<Tuple<any, any>>;
    static readonly TRUE: SExp;
    static readonly FALSE: SExp;
    static readonly __NULL__: SExp;
    static to(v: CastableType): SExp;
    static null(): SExp;
    constructor(v: CLVMObject);
    as_pair(): Tuple<SExp, SExp> | None;
    listp(): boolean;
    nullp(): boolean;
    as_int(): number;
    as_bin(): Bytes;
    cons(right: any): SExp;
    first(): SExp;
    rest(): SExp;
    as_iter(): Generator<SExp, void, unknown>;
    equal_to(other: any): boolean;
    list_len(): number;
    as_javascript(): import("./as_javascript").TToJavascript;
    toString(): string;
    __repr__(): string;
}
export declare function isSExp(v: any): v is SExp;
