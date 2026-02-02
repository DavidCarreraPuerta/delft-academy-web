import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import * as dateFns from "date-fns";

export default function TutorDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [tutorData, setTutorData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
    if (user) fetchTutorData();
  }, [user, loading]);

  const fetchTutorData = async () => {
    const { data } = await supabase.from("tutors").select("*").eq("user_id", user?.id).maybeSingle();
    if (data) {
      setTutorData(data);
      fetchBookings(data.id);
    }
  };

  const fetchBookings = async (tutorId: string) => {
    const { data } = await supabase.from("bookings").select("*").eq("tutor_id", tutorId).order('scheduled_at', { ascending: true });
    if (data) setBookings(data);
  };

  const handleAction = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    if (!error) {
      toast({ title: "Updated", description: `Session ${newStatus} successfully.` });
      fetchBookings(tutorData.id);
    }
  };

  if (loading) return null;

  const pending = bookings.filter(b => b.status === "pre_booked");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Users /></div>
          <div>
            <h1 className="text-3xl font-bold italic uppercase leading-none">Tutor Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your mentoring sessions</p>
          </div>
        </div>

        <Tabs defaultValue="agenda">
          <TabsList className="mb-8">
            <TabsTrigger value="agenda">
              Current Agenda {pending.length > 0 && <Badge className="ml-2 bg-amber-500">{pending.length}</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agenda" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="font-bold flex items-center gap-2"><AlertCircle className="text-amber-500 w-5 h-5" /> Pending Requests</h3>
              {pending.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">No pending requests at the moment.</p>
              ) : (
                pending.map(b => (
                  <Card key={b.id} className="border-amber-100 bg-amber-50/30">
                    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
                      <div className="space-y-1">
                        <p className="font-black uppercase italic">{b.subject}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" /> {dateFns.format(new Date(b.scheduled_at), "PPPPp")}
                        </div>
                        {b.notes && <p className="text-sm bg-white/50 p-2 rounded border italic mt-2">"{b.notes}"</p>}
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleAction(b.id, "rejected")}>Reject</Button>
                        <Button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction(b.id, "confirmed")}>Confirm</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}