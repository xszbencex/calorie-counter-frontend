export type CCRoute = {
  icon: string;
  label: string;
  path?: string;
  subRoutes?: CCRoute[];
}

export const routes: CCRoute[] = [
  {path: '/', label: 'Kezdőlap', icon: 'home'},
  {path: '/company', label: 'Cégek', icon: 'business'},
  {path: '/student', label: 'Hallgatók', icon: 'person'},
  {path: '/student-documents', label: 'Hallgatói dokumentumok', icon: 'snippet_folder'},
  {path: '/training-location', label: 'Képzési helyek', icon: 'add_location_alt'},
  {path: '/internship', label: 'Gyakorlatok', icon: 'groups'},
  {path: '/major', label: 'Szakok és szakvezetők', icon: 'school'},
  {path: '/semester', label: 'Félévek', icon: 'date_range'},
  {path: '/messages', label: 'Üzenetek', icon: 'email'},
  {path: '/contract-inventory', label: 'Szerződés leltár', icon: 'auto_awesome_motion'},
  {label: 'Felhasználók', icon: 'account_box', subRoutes: [
      {path: '/users', label: 'Felhasználó kezelés', icon: 'account_circle'},
      {path: '/groups', label: 'Csoport kezelés', icon: 'group'},
      {path: '/roles', label: 'Szerepkör kezelés', icon: 'list'}
    ]
  },
  {label: 'Értékelések', icon: 'grades', subRoutes: [
      {path: '/feedback-questions', label: 'Értékelő kérdések és válaszok', icon: 'quiz'},
      {path: '/', label: 'Értékelések generálása', icon: 'rate_review'},
      {path: '/', label: 'Értékelések áttekintése', icon: 'question_answer'}
    ]
  },
];
