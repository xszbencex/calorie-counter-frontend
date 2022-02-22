import {ReactNode} from 'react';

export type CCSimpleTableProps<T> = {

  /**
   * Megjelenítendő oszlopok definiálása.
   */
  columns: CCTableColumn<T>[];

  /**
   * Táblázat sorai.
   */
  rows: T[];

  /**
   * Ha ez a property meg van adva, akkor a táblázat soraihoz tartozni fog egy lenyíló rész is.
   * A lenyíló rész tartalma a függvény visszatérési értéke lesz.
   */
  renderCollapsible?: (row: T) => ReactNode;

  defaultPageSize?: number;

  rowsPerPageOptions?: number[];

  hideExport?: boolean;
}

export type CCTableColumn<T> = {
  /**
   * Ezáltal a property által lehet megjelíteni átalános adatokat.
   * Lehetőségek:
   * - táblázat soraiban szereplő objektumok fieldje pl: CompanyDTO esetén a name field eléréshez `field: 'name'`
   * - nested objektumok fieldjei pl: CompanyDTO esetén a belső AddressDTO típusú address objektum city fieldje eléréshez:
   * `field: 'address.city'`
   *
   * Ha összetettebb megejelenítésre van szükség, akkor a {@link valueGetter}-t és {@link renderCell}-t használjuk.
   * Ilyen esetekben a field értéke bármi lehet, ami egyedi és nem tartalmaz '.' karaktert.
   * Ez egy azonosító is, ezért kötelező és ezért szükséges az egyediség.
   **/
  field: string;

  /**
   * Fejlécben megjelenő szöveg az adott oszlophoz.
   */
  headerName: string;

  filterable?: boolean;

  filterDisplay?: 'fixed' | 'popover' | 'hidden'

  sortable?: boolean;

  /**
   * Ha egy összetett szöveget kell megjeleníteni, amit a field segítségével nem tudunk,
   * akkor ezzel ennek a függvénynek a visszatérési értéke adja meg a cella tartalmát.
   */
  valueGetter?: (row: T) => string | undefined;

  /**
   * Ha a megejelnítendő adat nem sima string, hanem komponensek (pl: szerkesztés icon),
   * akkor ennek a függvénynek a visszatérési értéke adja meg a cella tartalmát.
   *
   * Az ilyen mezők nem szűrhetők és rendezhetők
   */
  renderCell?: (row: T) => ReactNode;
}
