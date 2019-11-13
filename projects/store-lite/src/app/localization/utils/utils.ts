export function isDefined(value: any): boolean {
  return typeof value !== 'undefined' && value !== null;
}

export function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
