export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      drug_doses: {
        Row: {
          bw_unit: string | null
          created_at: string
          cri_unit: string | null
          default_dose: string | null
          description: string | null
          dose_id: number
          dose_unit: string | null
          drug_id: string | null
          max_dose: string | null
          min_dose: string | null
          route: string
          species: string | null
        }
        Insert: {
          bw_unit?: string | null
          created_at?: string
          cri_unit?: string | null
          default_dose?: string | null
          description?: string | null
          dose_id?: number
          dose_unit?: string | null
          drug_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route: string
          species?: string | null
        }
        Update: {
          bw_unit?: string | null
          created_at?: string
          cri_unit?: string | null
          default_dose?: string | null
          description?: string | null
          dose_id?: number
          dose_unit?: string | null
          drug_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string
          species?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_doses_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drugs"
            referencedColumns: ["id"]
          }
        ]
      }
      drug_products: {
        Row: {
          company: string | null
          created_at: string
          description: string | null
          drug_id: string | null
          drug_product_id: string
          hos_id: string | null
          mass_unit: string | null
          name: string | null
          price: string | null
          tag: string | null
          type: string | null
          unit: string | null
          volume: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_product_id?: string
          hos_id?: string | null
          mass_unit?: string | null
          name?: string | null
          price?: string | null
          tag?: string | null
          type?: string | null
          unit?: string | null
          volume?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_product_id?: string
          hos_id?: string | null
          mass_unit?: string | null
          name?: string | null
          price?: string | null
          tag?: string | null
          type?: string | null
          unit?: string | null
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_products_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drugs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_products_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          }
        ]
      }
      drugs: {
        Row: {
          classification: string | null
          created_at: string
          description: string | null
          hos_id: string | null
          id: string
          indication: string | null
          name: string
          side_effect: string | null
          tag: string | null
        }
        Insert: {
          classification?: string | null
          created_at?: string
          description?: string | null
          hos_id?: string | null
          id?: string
          indication?: string | null
          name: string
          side_effect?: string | null
          tag?: string | null
        }
        Update: {
          classification?: string | null
          created_at?: string
          description?: string | null
          hos_id?: string | null
          id?: string
          indication?: string | null
          name?: string
          side_effect?: string | null
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drugs_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          }
        ]
      }
      feeds: {
        Row: {
          calory: string
          created_at: string
          description: string | null
          hos_id: string
          id: string
          name: string
          price: string | null
          species: string
          tag: string
          type: string
          unit: string
          volume: string
        }
        Insert: {
          calory?: string
          created_at?: string
          description?: string | null
          hos_id: string
          id?: string
          name?: string
          price?: string | null
          species: string
          tag?: string
          type?: string
          unit?: string
          volume?: string
        }
        Update: {
          calory?: string
          created_at?: string
          description?: string | null
          hos_id?: string
          id?: string
          name?: string
          price?: string | null
          species?: string
          tag?: string
          type?: string
          unit?: string
          volume?: string
        }
        Relationships: [
          {
            foreignKeyName: "feeds_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          }
        ]
      }
      hos_vet_mapping: {
        Row: {
          class: string
          created_at: string
          group: string[] | null
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
          group?: string[] | null
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
          group?: string[] | null
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
      icu_chart: {
        Row: {
          caution: string | null
          created_at: string
          discharged: boolean
          hos_id: string
          icu_chart_id: number
          io_id: number
          main_vet: string | null
          memo_a: string
          memo_b: string
          memo_c: string
          pet_id: number
          sub_vet: string | null
          target_date: string
          target_weight: string | null
          type: string
        }
        Insert: {
          caution?: string | null
          created_at?: string
          discharged?: boolean
          hos_id: string
          icu_chart_id?: number
          io_id: number
          main_vet?: string | null
          memo_a?: string
          memo_b?: string
          memo_c?: string
          pet_id: number
          sub_vet?: string | null
          target_date: string
          target_weight?: string | null
          type?: string
        }
        Update: {
          caution?: string | null
          created_at?: string
          discharged?: boolean
          hos_id?: string
          icu_chart_id?: number
          io_id?: number
          main_vet?: string | null
          memo_a?: string
          memo_b?: string
          memo_c?: string
          pet_id?: number
          sub_vet?: string | null
          target_date?: string
          target_weight?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_icu_chart_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "public_icu_chart_io_id_fkey"
            columns: ["io_id"]
            isOneToOne: false
            referencedRelation: "in_and_out"
            referencedColumns: ["io_id"]
          },
          {
            foreignKeyName: "public_icu_chart_main_vet_fkey"
            columns: ["main_vet"]
            isOneToOne: false
            referencedRelation: "vets"
            referencedColumns: ["vet_id"]
          },
          {
            foreignKeyName: "public_icu_chart_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "public_icu_chart_sub_vet_fkey"
            columns: ["sub_vet"]
            isOneToOne: false
            referencedRelation: "vets"
            referencedColumns: ["vet_id"]
          }
        ]
      }
      icu_chart_tx: {
        Row: {
          created_at: string
          data_type: string
          done_1: number | null
          done_10: number | null
          done_11: number | null
          done_12: number | null
          done_13: number | null
          done_14: number | null
          done_15: number | null
          done_16: number | null
          done_17: number | null
          done_18: number | null
          done_19: number | null
          done_2: number | null
          done_20: number | null
          done_21: number | null
          done_22: number | null
          done_23: number | null
          done_24: number | null
          done_3: number | null
          done_4: number | null
          done_5: number | null
          done_6: number | null
          done_7: number | null
          done_8: number | null
          done_9: number | null
          drug_id: string | null
          drug_product_id: string | null
          feed_id: string | null
          icu_chart_id: number
          icu_chart_tx_id: number
          io_id: number
          test_id: string | null
          test_set_id: number | null
          todo: string[]
          todo_log: string[] | null
          todo_memo: string | null
          todo_name: string
        }
        Insert: {
          created_at?: string
          data_type: string
          done_1?: number | null
          done_10?: number | null
          done_11?: number | null
          done_12?: number | null
          done_13?: number | null
          done_14?: number | null
          done_15?: number | null
          done_16?: number | null
          done_17?: number | null
          done_18?: number | null
          done_19?: number | null
          done_2?: number | null
          done_20?: number | null
          done_21?: number | null
          done_22?: number | null
          done_23?: number | null
          done_24?: number | null
          done_3?: number | null
          done_4?: number | null
          done_5?: number | null
          done_6?: number | null
          done_7?: number | null
          done_8?: number | null
          done_9?: number | null
          drug_id?: string | null
          drug_product_id?: string | null
          feed_id?: string | null
          icu_chart_id: number
          icu_chart_tx_id?: number
          io_id: number
          test_id?: string | null
          test_set_id?: number | null
          todo?: string[]
          todo_log?: string[] | null
          todo_memo?: string | null
          todo_name: string
        }
        Update: {
          created_at?: string
          data_type?: string
          done_1?: number | null
          done_10?: number | null
          done_11?: number | null
          done_12?: number | null
          done_13?: number | null
          done_14?: number | null
          done_15?: number | null
          done_16?: number | null
          done_17?: number | null
          done_18?: number | null
          done_19?: number | null
          done_2?: number | null
          done_20?: number | null
          done_21?: number | null
          done_22?: number | null
          done_23?: number | null
          done_24?: number | null
          done_3?: number | null
          done_4?: number | null
          done_5?: number | null
          done_6?: number | null
          done_7?: number | null
          done_8?: number | null
          done_9?: number | null
          drug_id?: string | null
          drug_product_id?: string | null
          feed_id?: string | null
          icu_chart_id?: number
          icu_chart_tx_id?: number
          io_id?: number
          test_id?: string | null
          test_set_id?: number | null
          todo?: string[]
          todo_log?: string[] | null
          todo_memo?: string | null
          todo_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_chart_tx_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drugs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "icu_chart_tx_drug_product_id_fkey"
            columns: ["drug_product_id"]
            isOneToOne: false
            referencedRelation: "drug_products"
            referencedColumns: ["drug_product_id"]
          },
          {
            foreignKeyName: "icu_chart_tx_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "icu_chart_tx_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          },
          {
            foreignKeyName: "icu_chart_tx_test_set_id_fkey"
            columns: ["test_set_id"]
            isOneToOne: false
            referencedRelation: "test_set"
            referencedColumns: ["test_set_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_1_fkey"
            columns: ["done_1"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_2_fkey"
            columns: ["done_2"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_10_fkey"
            columns: ["done_10"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_11_fkey"
            columns: ["done_11"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_12_fkey"
            columns: ["done_12"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_13_fkey"
            columns: ["done_13"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_14_fkey"
            columns: ["done_14"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_15_fkey"
            columns: ["done_15"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_16_fkey"
            columns: ["done_16"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_17_fkey"
            columns: ["done_17"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_18_fkey"
            columns: ["done_18"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_19_fkey"
            columns: ["done_19"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_20_fkey"
            columns: ["done_20"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_21_fkey"
            columns: ["done_21"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_22_fkey"
            columns: ["done_22"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_23_fkey"
            columns: ["done_23"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_24_fkey"
            columns: ["done_24"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_3_fkey"
            columns: ["done_3"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_4_fkey"
            columns: ["done_4"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_5_fkey"
            columns: ["done_5"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_6_fkey"
            columns: ["done_6"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_7_fkey"
            columns: ["done_7"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_8_fkey"
            columns: ["done_8"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_done_9_fkey"
            columns: ["done_9"]
            isOneToOne: false
            referencedRelation: "tx"
            referencedColumns: ["tx_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_icu_chart_id_fkey"
            columns: ["icu_chart_id"]
            isOneToOne: false
            referencedRelation: "icu_chart"
            referencedColumns: ["icu_chart_id"]
          },
          {
            foreignKeyName: "public_icu_chart_tx_io_id_fkey"
            columns: ["io_id"]
            isOneToOne: false
            referencedRelation: "in_and_out"
            referencedColumns: ["io_id"]
          }
        ]
      }
      in_and_out: {
        Row: {
          created_at: string
          group: string
          hos_id: string | null
          in_date: string
          io_id: number
          out_date: string | null
          out_due_date: string
          pet_id: number | null
          tag: string | null
          tag_age: number | null
        }
        Insert: {
          created_at?: string
          group: string
          hos_id?: string | null
          in_date: string
          io_id?: number
          out_date?: string | null
          out_due_date: string
          pet_id?: number | null
          tag?: string | null
          tag_age?: number | null
        }
        Update: {
          created_at?: string
          group?: string
          hos_id?: string | null
          in_date?: string
          io_id?: number
          out_date?: string | null
          out_due_date?: string
          pet_id?: number | null
          tag?: string | null
          tag_age?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "in_and_out_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "in_and_out_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["pet_id"]
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
          test_id: string | null
          test_result_id: number
          tested_at: string | null
        }
        Insert: {
          created_at?: string | null
          hos_id?: string | null
          memo?: string | null
          pet_id?: number | null
          result: string
          test_id?: string | null
          test_result_id?: number
          tested_at?: string | null
        }
        Update: {
          created_at?: string | null
          hos_id?: string | null
          memo?: string | null
          pet_id?: number | null
          result?: string
          test_id?: string | null
          test_result_id?: number
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
            foreignKeyName: "test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          }
        ]
      }
      test_set: {
        Row: {
          age_max: string | null
          age_min: string | null
          created_at: string
          description: string | null
          diagnosis: string | null
          ge: string | null
          gt: string | null
          interpretation: string | null
          le: string | null
          lt: string | null
          order: number
          reference_range: string | null
          select_value: string | null
          species: string
          test_id: string
          test_set_id: number
        }
        Insert: {
          age_max?: string | null
          age_min?: string | null
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          ge?: string | null
          gt?: string | null
          interpretation?: string | null
          le?: string | null
          lt?: string | null
          order: number
          reference_range?: string | null
          select_value?: string | null
          species: string
          test_id: string
          test_set_id?: number
        }
        Update: {
          age_max?: string | null
          age_min?: string | null
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          ge?: string | null
          gt?: string | null
          interpretation?: string | null
          le?: string | null
          lt?: string | null
          order?: number
          reference_range?: string | null
          select_value?: string | null
          species?: string
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
          hos_id: string
          name: string
          original_name: string
          tag: string | null
          test_id: string
          type: string
          unit: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          form?: string
          hos_id: string
          name: string
          original_name: string
          tag?: string | null
          test_id?: string
          type: string
          unit?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          form?: string
          hos_id?: string
          name?: string
          original_name?: string
          tag?: string | null
          test_id?: string
          type?: string
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
      tx: {
        Row: {
          created_at: string
          icu_chart_tx_id: number
          images: string[] | null
          io_id: number
          log: string[] | null
          memo: string | null
          result: string | null
          tx_id: number
        }
        Insert: {
          created_at?: string
          icu_chart_tx_id: number
          images?: string[] | null
          io_id: number
          log?: string[] | null
          memo?: string | null
          result?: string | null
          tx_id?: number
        }
        Update: {
          created_at?: string
          icu_chart_tx_id?: number
          images?: string[] | null
          io_id?: number
          log?: string[] | null
          memo?: string | null
          result?: string | null
          tx_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tx_icu_chart_tx_id_fkey"
            columns: ["icu_chart_tx_id"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "tx_io_id_fkey"
            columns: ["io_id"]
            isOneToOne: false
            referencedRelation: "in_and_out"
            referencedColumns: ["io_id"]
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
