export const runAsync = async (fn: Function, finallyCb?: Function) => {
  try {
    const res = await fn();

    return {
      data: res,
    };
  } catch (err) {
    return {
      error: err,
    };
  } finally {
    finallyCb?.();
  }
};
