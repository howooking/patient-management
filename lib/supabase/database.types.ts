export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hos_vet_mapping: {
        Row: {
          class: string
          created_at: string
          group: string
          hos_id: string
          hos_vet_id: number
          nickname: string | null
          position: string
          rank: number
          vet_approved: boolean
          vet_id: string
        }
        Insert: {
          class?: string
          created_at?: string
          group?: string
          hos_id: string
          hos_vet_id?: number
          nickname?: string | null
          position?: string
          rank?: number
          vet_approved?: boolean
          vet_id: string
        }
        Update: {
          class?: string
          created_at?: string
          group?: string
          hos_id?: string
          hos_vet_id?: number
          nickname?: string | null
          position?: string
          rank?: number
          vet_approved?: boolean
          vet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hos_vet_mapping_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "hos_vet_mapping_vet_id_fkey"
            columns: ["vet_id"]
            isOneToOne: false
            referencedRelation: "vets"
            referencedColumns: ["vet_id"]
          }
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          business_approved: boolean
          business_no: string
          created_at: string
          group_list: string[]
          hos_id: string
          master_id: string | null
          memo_list: string[]
          name: string | null
          personal: boolean
          phone_no: string | null
          position_list: string[]
        }
        Insert: {
          address?: string | null
          business_approved?: boolean
          business_no: string
          created_at?: string
          group_list?: string[]
          hos_id?: string
          master_id?: string | null
          memo_list?: string[]
          name?: string | null
          personal?: boolean
          phone_no?: string | null
          position_list?: string[]
        }
        Update: {
          address?: string | null
          business_approved?: boolean
          business_no?: string
          created_at?: string
          group_list?: string[]
          hos_id?: string
          master_id?: string | null
          memo_list?: string[]
          name?: string | null
          personal?: boolean
          phone_no?: string | null
          position_list?: string[]
        }
        Relationships: []
      }
      vets: {
        Row: {
          avatar_url: string | null
          created_at: string
          default_hos_id: string | null
          is_active: boolean
          license_approved: boolean
          license_no: number
          vet_email: string
          vet_id: string
          vet_name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          default_hos_id?: string | null
          is_active?: boolean
          license_approved?: boolean
          license_no: number
          vet_email: string
          vet_id: string
          vet_name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          default_hos_id?: string | null
          is_active?: boolean
          license_approved?: boolean
          license_no?: number
          vet_email?: string
          vet_id?: string
          vet_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vets_default_hos_id_fkey"
            columns: ["default_hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "vets_vet_id_fkey"
            columns: ["vet_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      group_type: "local" | "school" | "academy" | "company"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
