export abstract class BaseTranslateFormatter {
  abstract format(target: string, args: string[]): string;
}
