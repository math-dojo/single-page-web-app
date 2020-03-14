export function convertKebabToSentenceCase(kebabCasetoConvert: string): string {
    return kebabCasetoConvert.replace((/(^|-)(\w)/g), (match, p1, p2, offset, stringProvided) => {
        if (offset > 0) {
          return (' ' + p2.toUpperCase());
        }
        return p2.toUpperCase();
    })
}