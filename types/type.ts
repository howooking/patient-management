import { Database } from "@/lib/supabase/database.types";

export type Pet = Database["public"]["Tables"]["pets"]["Row"];
