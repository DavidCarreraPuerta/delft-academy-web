import { useState, useEffect } from "react";
import { format } from "date-fns"; 
import { enGB } from "date-fns/locale"; // Forzamos formato de fecha británico
import { Calendar as CalendarIcon, User, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BookingCalendarProps {
  mode: "admissions" | "year1";
}

export function BookingCalendar({ mode }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [tutorId, setTutorId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function getTutor() {
      // Intentamos buscar dinámicamente a Marcos
      const { data } = await supabase
        .from("tutors")
        .select("id")
        .ilike("full_name", "%Marcos%")
        .single();
      
      if (data) {
        setTutorId(data.id);
      } else {
        // ID de respaldo verificado por el usuario
        setTutorId("ead73db8-a3e3-4c9d-b8f7-508771f2b567");
      }
    }
    getTutor();
  }, []);

  const tutor = {
    name: "Marcos C.",
    role: "Lead Mentor",
    // Branding actualizado a BSc Launchpad
    subjects: mode === "year1" ? ["Calculus", "Physics", "Linear Algebra"] : ["Admission Exam", "Motivation Letter", "Housing Strategy"]
  };

  const handleBooking = async () => {
    if (!date || !tutorId) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      // Inserción con nombres de columna exactos de Supabase
      const { error } = await supabase.from("bookings").insert({
        student_id: session.user.id,
        tutor_id: tutorId,
        // Guardamos el nuevo nombre del programa en la base de datos
        subject: mode === "year1" ? "BSc Launchpad 1:1" : "Admissions 1:1",
        status: "pending",
        session_date: date.toISOString(),
        Notes: notes // N Mayúscula crítica para evitar el error de schema cache
      });

      if (error) throw error;
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to send request. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase italic text-slate-900 tracking-tight">Request Sent!</h3>
          <p className="text-slate-600 font-medium max-w-sm mx-auto text-sm leading-relaxed">
            Your request has been sent to <span className="text-orange-600 font-bold">Marcos</span>. 
            He will confirm the date and time via email or WhatsApp within 24 hours.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="rounded-xl font-bold uppercase text-[10px] tracking-widest border-slate-200 hover:bg-slate-50">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-left">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-slate-900 leading-tight">{tutor.name}</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">{tutor.role}</p>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-white border border-slate-100 text-slate-600 text-[9px] px-3 py-1 rounded-lg">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm inline-block w-full">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={setDate} 
                  className="mx-auto"
                  locale={enGB}
                />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={!date || !tutorId} className="w-full bg-slate-900 hover:bg-orange-600 text-white h-16 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg">
                    {date ? `Request for ${format(date, "do MMMM", { locale: enGB })}` : "Select a Date"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem] border-none shadow-2xl p-8">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-black italic uppercase tracking-tight text-slate-900">Confirm Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <CalendarIcon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1 leading-none">Date Requested</p>
                        <p className="font-bold text-slate-900">{date && format(date, "EEEE, do MMMM", { locale: enGB })}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Optional Notes</label>
                      <Textarea 
                        placeholder="Specify the topics you wish to cover..." 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        className="min-h-[120px] rounded-2xl border-slate-100 focus:ring-orange-600 bg-slate-50/50 placeholder:text-slate-300"
                      />
                    </div>

                    <Button onClick={handleBooking} disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-600/20">
                      {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Request</span>}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}