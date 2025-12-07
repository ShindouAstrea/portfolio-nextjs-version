// ========== DATABASE TYPES (Supabase) ==========

/** Application/Project data from Supabase */
export type Aplication = {
  id: string | number;
  name: string;
  description: string;
  tags: string[]; // JSON array or comma-separated string from DB
  imgSrc: string;
  github: string;
  created_at?: string;
  updated_at?: string;
}

/** Job/Experience data from Supabase */
export type Job = {
  id: string | number;
  title: string;
  company: string;
  start_date: string; // Format: "Month Year" or ISO date
  end_date: string; // Format: "Month Year" or ISO date
  tags: string[]; // JSON array or comma-separated string from DB
  description: string;
  created_at?: string;
  updated_at?: string;
}

/** Contact message data */
export type ContactMessage = {
  id?: string | number;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// ========== COMPONENT PROPS TYPES ==========

export type ContextMenuProps = {
  xPos: number;
  yPos: number;
  closeMenu: () => void;
}

// ========== API RESPONSE TYPES ==========

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type AppsApiResponse = ApiResponse<Aplication[]>
export type JobsApiResponse = ApiResponse<Job[]>
