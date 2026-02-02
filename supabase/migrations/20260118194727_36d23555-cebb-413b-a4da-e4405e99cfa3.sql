-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'tutor', 'student');

-- Create tutor status enum
CREATE TYPE public.tutor_status AS ENUM ('pending_agreement', 'pending_certification', 'pending_review', 'certified', 'rejected', 'suspended');

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('pre_booked', 'confirmed', 'rejected', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT,
  enrolled_program TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table (for admin/tutor roles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create tutors table
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  faculty TEXT NOT NULL,
  current_status TEXT NOT NULL, -- BSc 2nd Year, MSc, Alumni, etc.
  gpa DECIMAL(3,1) NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT ARRAY['English'],
  motivation TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  hourly_rate DECIMAL(5,2) DEFAULT 25.00,
  buddy_rate DECIMAL(5,2) DEFAULT 20.00,
  status tutor_status DEFAULT 'pending_agreement',
  is_certified BOOLEAN DEFAULT false,
  
  -- Certification data
  grade_transcript_url TEXT,
  teaching_demo_url TEXT,
  quiz_score INTEGER,
  quiz_passed_at TIMESTAMP WITH TIME ZONE,
  
  -- Agreement data
  agreement_signed BOOLEAN DEFAULT false,
  agreement_signed_at TIMESTAMP WITH TIME ZONE,
  agreement_legal_name TEXT,
  agreement_version TEXT,
  agreement_ip_address TEXT,
  
  -- Admin review
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create tutor_availability table
CREATE TABLE public.tutor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_blackout BOOLEAN DEFAULT false,
  blackout_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'English',
  session_type TEXT NOT NULL DEFAULT 'tutoring', -- tutoring, buddy
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status booking_status DEFAULT 'pre_booked',
  meeting_link TEXT,
  notes TEXT,
  
  -- Alternative slot proposal
  alternative_proposed_at TIMESTAMP WITH TIME ZONE,
  alternative_notes TEXT,
  
  -- Session outcome
  completed_at TIMESTAMP WITH TIME ZONE,
  student_rating INTEGER CHECK (student_rating >= 1 AND student_rating <= 5),
  student_feedback TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create tutor_earnings table
CREATE TABLE public.tutor_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  amount DECIMAL(8,2) NOT NULL,
  earning_type TEXT NOT NULL, -- session, buddy, acquisition_bonus, success_bonus
  description TEXT,
  is_paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create tutor_metrics table (for performance tracking)
CREATE TABLE public.tutor_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Reach metrics
  free_consultations INTEGER DEFAULT 0,
  converted_students INTEGER DEFAULT 0,
  
  -- Depth metrics
  total_students INTEGER DEFAULT 0,
  students_with_5plus_sessions INTEGER DEFAULT 0,
  
  -- Quality metrics
  avg_rating DECIMAL(2,1) DEFAULT 0,
  student_success_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Loyalty metrics
  total_confirmed_sessions INTEGER DEFAULT 0,
  total_completed_sessions INTEGER DEFAULT 0,
  total_cancelled_sessions INTEGER DEFAULT 0,
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tutors_updated_at
  BEFORE UPDATE ON public.tutors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tutor_metrics_updated_at
  BEFORE UPDATE ON public.tutor_metrics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_metrics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Tutors policies
CREATE POLICY "Anyone can view certified tutors"
  ON public.tutors FOR SELECT
  USING (is_certified = true AND status = 'certified');

CREATE POLICY "Users can view their own tutor profile"
  ON public.tutors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tutor profile"
  ON public.tutors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tutor profile"
  ON public.tutors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all tutors"
  ON public.tutors FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Tutor availability policies
CREATE POLICY "Anyone can view tutor availability"
  ON public.tutor_availability FOR SELECT
  USING (true);

CREATE POLICY "Tutors can manage their own availability"
  ON public.tutor_availability FOR ALL
  USING (
    tutor_id IN (SELECT id FROM public.tutors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all availability"
  ON public.tutor_availability FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Bookings policies
CREATE POLICY "Students can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view bookings assigned to them"
  ON public.bookings FOR SELECT
  USING (
    tutor_id IN (SELECT id FROM public.tutors WHERE user_id = auth.uid())
  );

CREATE POLICY "Students can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can update bookings assigned to them"
  ON public.bookings FOR UPDATE
  USING (
    tutor_id IN (SELECT id FROM public.tutors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all bookings"
  ON public.bookings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Tutor earnings policies
CREATE POLICY "Tutors can view their own earnings"
  ON public.tutor_earnings FOR SELECT
  USING (
    tutor_id IN (SELECT id FROM public.tutors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all earnings"
  ON public.tutor_earnings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Tutor metrics policies
CREATE POLICY "Tutors can view their own metrics"
  ON public.tutor_metrics FOR SELECT
  USING (
    tutor_id IN (SELECT id FROM public.tutors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all metrics"
  ON public.tutor_metrics FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for tutor documents
INSERT INTO storage.buckets (id, name, public) VALUES ('tutor-documents', 'tutor-documents', false);

-- Storage policies for tutor documents
CREATE POLICY "Users can upload their own tutor documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own tutor documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all tutor documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tutor-documents' AND public.has_role(auth.uid(), 'admin'));