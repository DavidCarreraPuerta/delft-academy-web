export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          alternative_notes: string | null
          alternative_proposed_at: string | null
          completed_at: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          language: string
          meeting_link: string | null
          notes: string | null
          scheduled_at: string
          session_type: string
          status: Database["public"]["Enums"]["booking_status"] | null
          student_feedback: string | null
          student_id: string
          student_rating: number | null
          subject: string
          tutor_id: string
          updated_at: string
        }
        Insert: {
          alternative_notes?: string | null
          alternative_proposed_at?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          language?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at: string
          session_type?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          student_feedback?: string | null
          student_id: string
          student_rating?: number | null
          subject: string
          tutor_id: string
          updated_at?: string
        }
        Update: {
          alternative_notes?: string | null
          alternative_proposed_at?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          language?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at?: string
          session_type?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          student_feedback?: string | null
          student_id?: string
          student_rating?: number | null
          subject?: string
          tutor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string
          enrolled_program: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email: string
          enrolled_program?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string
          enrolled_program?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tutor_availability: {
        Row: {
          blackout_reason: string | null
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_blackout: boolean | null
          start_time: string
          tutor_id: string
        }
        Insert: {
          blackout_reason?: string | null
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_blackout?: boolean | null
          start_time: string
          tutor_id: string
        }
        Update: {
          blackout_reason?: string | null
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_blackout?: boolean | null
          start_time?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_availability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_earnings: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          description: string | null
          earning_type: string
          id: string
          is_paid: boolean | null
          paid_at: string | null
          tutor_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          description?: string | null
          earning_type: string
          id?: string
          is_paid?: boolean | null
          paid_at?: string | null
          tutor_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          description?: string | null
          earning_type?: string
          id?: string
          is_paid?: boolean | null
          paid_at?: string | null
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_earnings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_metrics: {
        Row: {
          avg_rating: number | null
          converted_students: number | null
          free_consultations: number | null
          id: string
          student_success_rate: number | null
          students_with_5plus_sessions: number | null
          total_cancelled_sessions: number | null
          total_completed_sessions: number | null
          total_confirmed_sessions: number | null
          total_students: number | null
          tutor_id: string
          updated_at: string
        }
        Insert: {
          avg_rating?: number | null
          converted_students?: number | null
          free_consultations?: number | null
          id?: string
          student_success_rate?: number | null
          students_with_5plus_sessions?: number | null
          total_cancelled_sessions?: number | null
          total_completed_sessions?: number | null
          total_confirmed_sessions?: number | null
          total_students?: number | null
          tutor_id: string
          updated_at?: string
        }
        Update: {
          avg_rating?: number | null
          converted_students?: number | null
          free_consultations?: number | null
          id?: string
          student_success_rate?: number | null
          students_with_5plus_sessions?: number | null
          total_cancelled_sessions?: number | null
          total_completed_sessions?: number | null
          total_confirmed_sessions?: number | null
          total_students?: number | null
          tutor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_metrics_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: true
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          admin_notes: string | null
          agreement_ip_address: string | null
          agreement_legal_name: string | null
          agreement_signed: boolean | null
          agreement_signed_at: string | null
          agreement_version: string | null
          buddy_rate: number | null
          created_at: string
          current_status: string
          faculty: string
          gpa: number
          grade_transcript_url: string | null
          hourly_rate: number | null
          id: string
          is_certified: boolean | null
          languages: string[]
          motivation: string | null
          quiz_passed_at: string | null
          quiz_score: number | null
          rating: number | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["tutor_status"] | null
          subjects: string[]
          teaching_demo_url: string | null
          total_reviews: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          agreement_ip_address?: string | null
          agreement_legal_name?: string | null
          agreement_signed?: boolean | null
          agreement_signed_at?: string | null
          agreement_version?: string | null
          buddy_rate?: number | null
          created_at?: string
          current_status: string
          faculty: string
          gpa: number
          grade_transcript_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_certified?: boolean | null
          languages?: string[]
          motivation?: string | null
          quiz_passed_at?: string | null
          quiz_score?: number | null
          rating?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["tutor_status"] | null
          subjects?: string[]
          teaching_demo_url?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          agreement_ip_address?: string | null
          agreement_legal_name?: string | null
          agreement_signed?: boolean | null
          agreement_signed_at?: string | null
          agreement_version?: string | null
          buddy_rate?: number | null
          created_at?: string
          current_status?: string
          faculty?: string
          gpa?: number
          grade_transcript_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_certified?: boolean | null
          languages?: string[]
          motivation?: string | null
          quiz_passed_at?: string | null
          quiz_score?: number | null
          rating?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["tutor_status"] | null
          subjects?: string[]
          teaching_demo_url?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "tutor" | "student"
      booking_status:
        | "pre_booked"
        | "confirmed"
        | "rejected"
        | "completed"
        | "cancelled"
      tutor_status:
        | "pending_agreement"
        | "pending_certification"
        | "pending_review"
        | "certified"
        | "rejected"
        | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "tutor", "student"],
      booking_status: [
        "pre_booked",
        "confirmed",
        "rejected",
        "completed",
        "cancelled",
      ],
      tutor_status: [
        "pending_agreement",
        "pending_certification",
        "pending_review",
        "certified",
        "rejected",
        "suspended",
      ],
    },
  },
} as const
