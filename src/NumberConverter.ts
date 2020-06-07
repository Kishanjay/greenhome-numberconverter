interface NumberConverterOptions {}

class NumberConverter {
  options: NumberConverterOptions;

  constructor(options: NumberConverterOptions) {
    this.options = options;
  }

  numberToText(number: number): string {
    return `${number}`;
  }

  textToNumber(text: string): number {
    return text ? 0 : 1;
  }
}


export default NumberConverter;
