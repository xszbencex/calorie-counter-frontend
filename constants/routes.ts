export type CCRoute = {
  icon: string;
  label: string;
  path?: string;
  subRoutes?: CCRoute[];
  isPublic?: boolean;
}

export const routes: CCRoute[] = [
  {path: '/home', label: 'Kezdőlap', icon: 'home', isPublic: true},
  {path: '/profile', label: 'Személyes adatok', icon: 'person'},
  {path: '/products', label: 'Termékek/Ételek', icon: 'dining'},
  {path: '/nutrition', label: 'Étkezések', icon: 'add_location_alt'},
  {path: '/statistics', label: 'Kimutatások', icon: 'insert_chart'},
];
