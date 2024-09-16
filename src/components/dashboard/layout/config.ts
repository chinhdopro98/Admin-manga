import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Tổng quan', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Thành viên', href: paths.dashboard.customers, icon: 'users' },
  { key: 'mangas', title: 'Manga', href: paths.dashboard.mangas, icon: 'plugs-connected' },
  { key: 'categories', title: 'Thể loại', href: paths.dashboard.categories, icon: 'gear-six' },
  { key: 'authors', title: 'Tác giả', href: paths.dashboard.authors, icon: 'gear-six' },
  { key: 'types', title: 'Kiểu truyện', href: paths.dashboard.types, icon: 'gear-six' },
  { key: 'groups', title: 'Nhóm dịch', href: paths.dashboard.groups, icon: 'gear-six' },
  { key: 'achievement', title: 'Danh hiệu', href: paths.dashboard.achievements, icon: 'gear-six' },
  { key: 'companion', title: 'Bạn đồng hành', href: paths.dashboard.companions, icon: 'gear-six' },
  { key: 'comment', title: 'Bình luận', href: paths.dashboard.comments, icon: 'gear-six' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
