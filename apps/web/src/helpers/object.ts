const isArr = (input: string) => input[0] === '[' && input[input.length - 1] === ']';

export const Obj = {
  get: (input: Record<string | number | symbol, unknown>, selector: string): unknown | null => {
    const parsed = selector.split('.');
    const [el, ...rest] = parsed;
    const isArrElem = typeof el === 'string' && isArr(el) ? parseInt(el.slice(1, -1)) : null;

    if (parsed.length == 0) return null;
    if (isArrElem !== null) return input[isArrElem];
    if (!(el in input)) return null;
    if (parsed.length == 1) return input[el];

    const nested = input[el] as Record<string | number | symbol, unknown>;
    const joined = rest.join('.');

    return Obj.get(nested, joined);
  },
};
