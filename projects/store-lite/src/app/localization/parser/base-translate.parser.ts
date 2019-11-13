import { Injectable } from '@angular/core';

export abstract class BaseTranslateParser {
  abstract getValue(target: any, key: string): string;
}
