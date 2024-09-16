//
export interface BasicData {
  chapter_count?: number;
  manga_count?: number;
  pet_count?: number;
  user_count?: number;
  error?: any;
  loading: boolean;
}

//auth
export interface PayloadLogin {
  email: string;
  password: string;
}

// user
export interface Pagination {
  count: number;
  currentPage: number;
  links?: null;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface GetAllUserParams {
  page: number;
  per_page: number;
  filter?: {
    role?: string;
  };
  sort: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  total_points: number;
  used_points: number;
  achievements_points: number;
  pet_id: string;
  achievement_id: string | null;
  banned_until: string | null;
  limit_pet_points: number;
  limit_achievement_points: number;
  created_at: string;
  updated_at: string;
  avatar_full_url: string;
}

export interface UsersState {
  loading: boolean;
  users: IUser[];
  pagination: Pagination;
  error?: string | null;
}

//mangas

export interface GetAllMangaParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface MangaState {
  loading: boolean;
  mangas: IManga[];
  pagination: Pagination;
  error?: string | null;
}

export interface IManga {
  id: string;
  user_id: string;
  artist_id: string | null;
  last_chapter_id: string;
  doujinshi_id: string | null;
  group_id: string | null;
  name: string;
  name_alt: string;
  pilot: string;
  status: number;
  views: number;
  views_day: number;
  is_hot: number;
  hot_at: string | null;
  is_reviewed: number;
  slug: string;
  finished_by: string | null;
  created_at: string;
  updated_at: string;
  views_week: number;
  cover_full_url: string;
  group?: IGroup;
  user: IUser;
  genres?: ICategory[];
  artist?: IAuthor;
  doujinshi: IType;
}

// Category
export interface GetAllCategoryParams {
  page: number;
  per_page: number;
  sort?: string;
}

export interface CategoryState {
  loading: boolean;
  categories: ICategory[];
  pagination: Pagination;
  error?: string | null;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  show_on_pc: number;
  show_on_mb: number;
  created_at: string;
  updated_at: string;
}

//author
export interface GetAllAuthorParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface AuthorState {
  loading: boolean;
  authors: IAuthor[];
  pagination: Pagination;
  error?: string | null;
}

export interface IAuthor{
  id: string;
  slug: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}


//type
export interface GetAllTypeParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface TypeState {
  loading: boolean;
  types: IType[];
  pagination: Pagination;
  error?: string | null;
}

export interface IType{
  id: string;
  slug: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}

//group
export interface GetAllGroupParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface GroupState {
  loading: boolean;
  groups: IGroup[];
  pagination: Pagination;
  error?: string | null;
}

export interface IGroup{
  id: string;
  slug: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}


//achievements
export interface GetAllAchievementParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface AchievementState {
  loading: boolean;
  achievements: IAchievement[];
  pagination: Pagination;
  error?: string | null;
}

export interface IAchievement {
  id: string;
  name: string;
  font_family: string;
  font_size: string;
  color: string;
  weight: string;
  font_style: string;
  text_shadow: string;
  required_points: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}

//companion
export interface GetAllCompanionParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface CompanionState {
  loading: boolean;
  companions: ICompanion[];
  pagination: Pagination;
  error?: string | null;
}

export interface ICompanion {
  id: string;
  name: string;
  price: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  image_full_url: string;
  user: IUser;
}


//comment
export interface GetAllCommentParams {
  page: number;
  per_page: number;
  sort?: string;
  include?: string;
}

export interface CommentState {
  loading: boolean;
  comments: IComment[];
  pagination: Pagination;
  error?: string | null;
}

export interface IComment {
  id: string;
  commentable_id: string;
  commentable_type: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_id: string;
  user: IUser;
  user_id: string
}