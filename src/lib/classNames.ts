/** Joins truthy class names: `cx('a', isActive && 'b')`. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
