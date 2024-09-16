// export interface User {
//   id: string;
//   name?: string;
//   avatar?: string;
//   email?: string;

//   [key: string]: unknown;
// }

export interface User {
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
  roles: string[]; 
  token: string;
  type: string;
}