

export const memo = <T>(name, data): T => {
  global['di'].set(name, data);
  return data;
};

export const retrieve = <T extends any>(name): T => {
  if (!global['di'].has(name)) {
    throw new Error(`Unable to retrieve ${name}`);
  }

  return <T>global['di'].get(name);
};

export const clear = (name: string): void => {
  global['di'].delete(name);
};
