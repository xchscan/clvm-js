import {CastableType, SExp} from "./SExp";
import {Bytes, t, isList, isBytes} from "./__type_compatibility__";

export type TOpStack = Array<(op_stack: TOpStack, val_stack: TValStack) => unknown>;
export type TValStack = Array<Bytes|SExp|SExp[]|[SExp, SExp]>;
export type TToSexpF = (arg: CastableType) => SExp;
export type TToJavascript = Bytes | Bytes[] | [TToJavascript, TToJavascript] | TToJavascript[];


export function as_javascript(sexp: SExp){
  function _roll(op_stack: TOpStack, val_stack: TValStack){
    const v1 = val_stack.pop() as SExp;
    const v2 = val_stack.pop() as SExp;
    val_stack.push(v1);
    val_stack.push(v2);
  }
  
  function _make_tuple(op_stack: TOpStack, val_stack: TValStack){
    const left = val_stack.pop() as SExp;
    const right = val_stack.pop() as SExp;
    if(isBytes(right) && right.equal_to(Bytes.NULL)){
      val_stack.push([left]);
    }
    else if(isList(right)){
      const v = [left].concat(right);
      val_stack.push(v);
    }
    else{
      val_stack.push(t(left, right));
    }
  }
  
  function _as_javascript(op_stack: TOpStack, val_stack: TValStack){
    const v = val_stack.pop() as SExp;
    const pair = v.as_pair();
    if(pair){
      const [left, right] = pair;
      op_stack.push(_make_tuple);
      op_stack.push(_as_javascript);
      op_stack.push(_roll);
      op_stack.push(_as_javascript);
      val_stack.push(left);
      val_stack.push(right);
    }
    else{
      val_stack.push(v.atom as Bytes);
    }
  }
  
  const op_stack: TOpStack = [_as_javascript];
  const val_stack = [sexp];
  while(op_stack.length){
    const op_f = op_stack.pop();
    if(op_f){
      op_f(op_stack, val_stack);
    }
  }
  
  return (val_stack[val_stack.length-1] as unknown) as TToJavascript;
}
