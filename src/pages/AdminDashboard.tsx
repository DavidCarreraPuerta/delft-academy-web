import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users,
  Euro,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Download,
  Star,
  AlertCircle,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import certifiedBadge from "@/assets/certified-tutor-badge.jpg";

interface TutorApplication {
  id: string;
  user_id: string;
  faculty: string;
  current_status: string;
  gpa: number;
  subjects: string[];
  status: string;
  agreement_signed: boolean;
  quiz_score: number | null;
  grade_transcript_url: string | null;
  teaching_demo_url: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalTutors: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    totalHours: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
    if (!loading && user && !isAdmin) {
      navigate("/dashboard");
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchApplications();
      fetchStats();
    }
  }, [user, isAdmin]);

  const fetchApplications = async () => {
    const { data } = await supabase
      .from("tutors")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setApplications(data);
    }
  };

  const fetchStats = async () => {
    const { data: tutors } = await supabase
      .from("tutors")
      .select("id, status");

    const { data: earnings } = await supabase
      .from("tutor_earnings")
      .select("amount");

    const { data: bookings } = await supabase
      .from("bookings")
      .select("duration_minutes")
      .eq("status", "completed");

    setStats({
      totalTutors: tutors?.filter((t) => t.status === "certified").length || 0,
      pendingApprovals: tutors?.filter((t) => t.status === "pending_review").length || 0,
      totalRevenue: earnings?.reduce((sum, e) => sum + Number(e.amount), 0) || 0,
      totalHours: bookings?.reduce((sum, b) => sum + (b.duration_minutes || 0), 0) / 60 || 0,
    });
  };

  const handleApproval = async (tutorId: string, action: "approve" | "reject" | "request_info") => {
    const newStatus = action === "approve" ? "certified" : action === "reject" ? "rejected" : "pending_certification";

    const { error } = await supabase
      .from("tutors")
      .update({
        status: newStatus,
        is_certified: action === "approve",
        reviewed_by: user?.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", tutorId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Application updated",
        description: `Tutor application has been ${action === "approve" ? "approved" : action === "reject" ? "rejected" : "sent back for more info"}.`,
      });
      fetchApplications();
      fetchStats();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "certified":
        return <Badge className="bg-green-500">Certified</Badge>;
      case "pending_review":
        return <Badge className="bg-amber-500">Pending Review</Badge>;
      case "pending_certification":
        return <Badge className="bg-blue-500">Certification In Progress</Badge>;
      case "pending_agreement":
        return <Badge variant="secondary">Awaiting Agreement</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredApplications = applications.filter((app) =>
    app.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 border-b border-border bg-foreground text-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-background/60 mt-1">
            Manage tutors, review applications, and monitor platform performance.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalTutors}</p>
                    <p className="text-sm text-muted-foreground">Active Tutors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                    <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Euro className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">€{stats.totalRevenue.toFixed(0)}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalHours.toFixed(0)}h</p>
                    <p className="text-sm text-muted-foreground">Hours Taught</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList>
              <TabsTrigger value="applications">
                Tutor Applications
                {stats.pendingApprovals > 0 && (
                  <Badge className="ml-2 bg-amber-500">{stats.pendingApprovals}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tutors">All Tutors</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Application Review Queue</CardTitle>
                      <CardDescription>
                        Review and approve tutor applications.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search..."
                          className="pl-9 w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>GPA</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Quiz</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No applications found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredApplications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{app.current_status}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Applied {format(new Date(app.created_at), "MMM d")}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{app.faculty}</TableCell>
                            <TableCell>
                              <span className={app.gpa >= 7.5 ? "text-green-600 font-medium" : ""}>
                                {app.gpa}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {app.subjects.slice(0, 2).map((s) => (
                                  <Badge key={s} variant="secondary" className="text-xs">
                                    {s}
                                  </Badge>
                                ))}
                                {app.subjects.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{app.subjects.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {app.quiz_score !== null ? (
                                <span className={app.quiz_score === 100 ? "text-green-600" : "text-red-600"}>
                                  {app.quiz_score}%
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {app.grade_transcript_url && (
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                )}
                                {app.teaching_demo_url && (
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell>
                              {app.status === "pending_review" && (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-green-600"
                                    onClick={() => handleApproval(app.id, "approve")}
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-red-600"
                                    onClick={() => handleApproval(app.id, "reject")}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tutors">
              <Card>
                <CardHeader>
                  <CardTitle>Active Tutors</CardTitle>
                  <CardDescription>
                    View and manage all certified tutors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Earnings</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications
                        .filter((t) => t.status === "certified")
                        .map((tutor) => (
                          <TableRow key={tutor.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-primary" />
                                  </div>
                                  <img
                                    src={certifiedBadge}
                                    alt="Certified"
                                    className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full"
                                  />
                                </div>
                                <span className="font-medium">{tutor.current_status}</span>
                              </div>
                            </TableCell>
                            <TableCell>{tutor.faculty}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                <span>4.8</span>
                              </div>
                            </TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>€1,250</TableCell>
                            <TableCell>{getStatusBadge(tutor.status)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Revenue Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Revenue chart coming soon...
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Success metrics coming soon...
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
