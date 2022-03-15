export const commonStrings = {
  required: 'A mező kitöltése kötelező!',
  integerError: 'Kérem egész számot adjon meg!',
  positiveError: '0-nál nagyobb számot adjon meg',
  tenThousand: 'A legnagyobb érték 10000',
  oneHundred: 'A legnagyobb érték 100',
  dateError: 'Nem megfelelő dátum formátum.'
};

export const localeStringFormatter = {
  year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
} as Intl.DateTimeFormatOptions;
