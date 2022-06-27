type ExtractedLocale = {
  defaultMessage: string;
  file: string;
  col: number;
  end: number;
  line: number;
  start: number;
  description?: string;
};

export type ExtractedLocales = Record<string, ExtractedLocale>;
