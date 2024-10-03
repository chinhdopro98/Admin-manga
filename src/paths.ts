import AddManga from './app/dashboard/mangas/add/page';

export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    mangas: '/dashboard/mangas',
    settings: '/dashboard/settings',
    categories: '/dashboard/categories',
    authors: '/dashboard/authors',
    types: '/dashboard/types',
    groups: '/dashboard/groups',
    achievements: '/dashboard/achievements',
    companions: '/dashboard/companions',
    comments: '/dashboard/comments',
    mangaDetail: (id: string) => `/dashboard/mangas/${id}`,
    chapterDetail: (mangaId?: string, chapterId?: string) => `/dashboard/mangas/${mangaId}/chapters/${chapterId}`,
    addChapter: (mangaId?: string) => `/dashboard/mangas/${mangaId}/chapters/add`,
    addManga: () => `/dashboard/mangas/add`,
  },
  errors: { notFound: '/errors/not-found' },
} as const;
