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
        Relationships: [
          {
            foreignKeyName: "hospitals_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: false
            referencedRelation: "vets"
            referencedColumns: ["vet_id"]
          }
        ]
      }
      pets: {
        Row: {
          birth: string
          breed: string
          color: string | null
          created_at: string
          gender: string
          hos_id: string | null
          hos_owner_id: string | null
          hos_pet_id: string
          memo: string | null
          microchip_no: string | null
          name: string
          pet_id: number
          species: string
          state: string | null
        }
        Insert: {
          birth: string
          breed: string
          color?: string | null
          created_at?: string
          gender: string
          hos_id?: string | null
          hos_owner_id?: string | null
          hos_pet_id: string
          memo?: string | null
          microchip_no?: string | null
          name: string
          pet_id?: number
          species: string
          state?: string | null
        }
        Update: {
          birth?: string
          breed?: string
          color?: string | null
          created_at?: string
          gender?: string
          hos_id?: string | null
          hos_owner_id?: string | null
          hos_pet_id?: string
          memo?: string | null
          microchip_no?: string | null
          name?: string
          pet_id?: number
          species?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pets_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          }
        ]
      }
      test_results: {
        Row: {
          created_at: string | null
          hos_id: string | null
          memo: string | null
          pet_id: number | null
          result: string
          test_result_id: number
          test_set_id: number | null
          tested_at: string | null
        }
        Insert: {
          created_at?: string | null
          hos_id?: string | null
          memo?: string | null
          pet_id?: number | null
          result: string
          test_result_id?: number
          test_set_id?: number | null
          tested_at?: string | null
        }
        Update: {
          created_at?: string | null
          hos_id?: string | null
          memo?: string | null
          pet_id?: number | null
          result?: string
          test_result_id?: number
          test_set_id?: number | null
          tested_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_results_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "test_results_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "test_results_test_set_id_fkey"
            columns: ["test_set_id"]
            isOneToOne: false
            referencedRelation: "test_set"
            referencedColumns: ["test_set_id"]
          }
        ]
      }
      test_set: {
        Row: {
          created_at: string
          description_1: string | null
          description_2: string | null
          description_3: string | null
          diagnosis: string | null
          ge: string | null
          gt: string | null
          le: string | null
          lt: string | null
          order: number | null
          select_value: string | null
          species: string | null
          test_id: string
          test_set_id: number
        }
        Insert: {
          created_at?: string
          description_1?: string | null
          description_2?: string | null
          description_3?: string | null
          diagnosis?: string | null
          ge?: string | null
          gt?: string | null
          le?: string | null
          lt?: string | null
          order?: number | null
          select_value?: string | null
          species?: string | null
          test_id: string
          test_set_id?: number
        }
        Update: {
          created_at?: string
          description_1?: string | null
          description_2?: string | null
          description_3?: string | null
          diagnosis?: string | null
          ge?: string | null
          gt?: string | null
          le?: string | null
          lt?: string | null
          order?: number | null
          select_value?: string | null
          species?: string | null
          test_id?: string
          test_set_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "test_set_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          }
        ]
      }
      tests: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          form: string
          general_name: string
          hos_id: string
          name: string
          original_name: string
          tag: string | null
          test_id: string
          type: string | null
          unit: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          form?: string
          general_name: string
          hos_id: string
          name: string
          original_name: string
          tag?: string | null
          test_id?: string
          type?: string | null
          unit?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          form?: string
          general_name?: string
          hos_id?: string
          name?: string
          original_name?: string
          tag?: string | null
          test_id?: string
          type?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tests_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          }
        ]
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
