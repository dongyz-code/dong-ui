type GenericObject = Record<string, any>;

export function isObject(item: any): item is GenericObject {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends GenericObject, U extends GenericObject>(target: T, source: U): T & U;
export function deepMerge<T extends GenericObject>(target: T, source: T): T;
export function deepMerge<T extends GenericObject, U extends GenericObject>(target: T | U, source: U | T): T & U {
  const output = Object.assign({}, target) as any;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]) as T;
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output as T & U;
}
