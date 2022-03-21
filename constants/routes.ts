export type CCRoute = {
  icon: string;
  label: string;
  path?: string;
}

export const routes: CCRoute[] = [
  {path: '/daily-progress', label: 'Mai haladás', icon: 'auto_mode'},
  {path: '/profile', label: 'Napi célok', icon: 'person'},
  {path: '/products', label: 'Ételek/Italok', icon: 'dining'},
  {path: '/intake', label: 'Étkezések/Ivások', icon: 'add_location_alt'},
  {path: '/statistics', label: 'Kimutatások', icon: 'insert_chart'},
];
