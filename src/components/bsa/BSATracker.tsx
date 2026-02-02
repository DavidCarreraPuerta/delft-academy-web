import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client"; 
import { Edit3, Save, Loader2, Trophy, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Plan de estudios corregido (Year 1 únicamente)
const COURSES_DATA = [
  { id: "AE1111-1", name: "Exploring Aerospace Engineering", ects: 3, quarter: 1 },
  { id: "AE1111-2", name: "Engineering Drawing", ects: 2, quarter: 1 },
  { id: "AE1110-1", name: "Intro to Aerospace Engineering I", ects: 5, quarter: 1 },
  { id: "WI1421LR-1", name: "Calculus I-A", ects: 3, quarter: 1 },
  { id: "AE1110-2", name: "Intro to Aerospace Engineering II", ects: 4, quarter: 2 },
  { id: "WI1421LR-2", name: "Calculus I-B", ects: 3, quarter: 2 },
  { id: "WI1403", name: "Linear Algebra", ects: 4, quarter: 2 },
  { id: "AE1130-1", name: "Statics", ects: 4, quarter: 2 },
  { id: "AE1130-2", name: "Dynamics", ects: 3, quarter: 2 },
  { id: "AE1222-1", name: "Design & Construction", ects: 5, quarter: 3 },
  { id: "AE1222-3", name: "Aerospace Design Elements I", ects: 4, quarter: 3 },
  { id: "AE1241", name: "Physics", ects: 6, quarter: 3 },
  { id: "AE1205", name: "Programming (Python)", ects: 3, quarter: 4 },
  { id: "AE1108", name: "Materials & Structures", ects: 6, quarter: 4 }
];

export const BSATracker = ({ isEnrolled = false }) => {
  const [courses, setCourses] = useState(COURSES_DATA.map(c => ({ ...c, grade: null, status: 'pending' })));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadGrades = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from('student_grades_bulk').select('grades_data').eq('user_id', session.user.id).maybeSingle();
      if (data?.grades_data) {
        setCourses(COURSES_DATA.map(c => ({
          ...c,
          grade: data.grades_data[c.id]?.grade ?? null,
          status: data.grades_data[c.id]?.status ?? 'pending'
        })));
      }
    };
    loadGrades();
  }, [isEnrolled]);

  const stats = useMemo(() => {
    const passed = courses.filter(c => c.status === "passed");
    const ects = passed.reduce((s, c) => s + c.ects, 0);
    const graded = passed.filter(c => c.grade !== null);
    const avg = graded.length > 0 ? (graded.reduce((s, c) => s + (Number(c.grade) * c.ects), 0) / graded.reduce((s, c) => s + c.ects, 0)).toFixed(2) : "0.00";
    
    const gpaNum = parseFloat(avg);
    const honoursGap = Math.max(0, 8.5 - gpaNum).toFixed(2);

    return {
        ects, avg, honoursGap,
        missing: Math.max(0, 45 - ects),
        color: ects >= 45 ? "#22c55e" : "#f59e0b",
        offset: (2 * Math.PI * 35) - (Math.min(ects, 60) / 60) * (2 * Math.PI * 35)
    };
  }, [courses]);

  const handleSave = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const gradesObj = {};
    courses.forEach(c => { if (c.grade !== null) gradesObj[c.id] = { grade: c.grade, status: c.status }; });
    await supabase.from('student_grades_bulk').upsert({ user_id: session?.user.id, grades_data: gradesObj, updated_at: new Date().toISOString() });
    setEditMode(false);
    setLoading(false);
    toast({ title: "Progress Synchronized" });
  };

  return (
    <div className="w-full space-y-8 p-10 bg-white rounded-[3rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      {!isEnrolled && (
        <div className="absolute inset-0 z-50 bg-slate-50/40 backdrop-blur-[2px] flex items-center justify-center group cursor-not-allowed">
           <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-orange-500">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span className="font-black uppercase tracking-widest text-sm">Enrol to unlock Tracker</span>
           </div>
        </div>
      )}
      
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-4xl font-black italic uppercase text-slate-900 tracking-tighter">BSA Tracker</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
            <Trophy className="w-3 h-3 text-orange-500" /> Honours Track Target: 8.5 GPA
          </p>
        </div>
        {isEnrolled && (
          <Button onClick={editMode ? handleSave : () => setEditMode(true)} className={cn("h-14 rounded-2xl font-black px-10 transition-all", editMode ? 'bg-green-600 text-white' : 'bg-slate-900 text-white')}>
            {loading ? <Loader2 className="animate-spin" /> : editMode ? <Save className="mr-2" /> : <Edit3 className="mr-2" />}
            {editMode ? "CONFIRM" : "EDIT PROGRESS"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50/80 p-8 rounded-[2.5rem]">
        <div className="flex flex-col items-center border-r border-slate-200">
          <div className="relative h-20 w-20">
            <svg className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="35" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
              <circle cx="40" cy="40" r="35" stroke={stats.color} strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 35} strokeDashoffset={stats.offset} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-lg">{stats.ects}</div>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400 mt-2">Total EC</span>
        </div>
        
        <div className="text-center md:text-left border-r border-slate-200 pl-4 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BSA Status</p>
          <p className="text-2xl font-black">{stats.missing > 0 ? `${stats.missing} LEFT` : "SECURED"}</p>
        </div>

        <div className="text-center md:text-left border-r border-slate-200 pl-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GPA</p>
            {parseFloat(stats.avg) >= 8.5 ? (
               <div className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black">
                 <Star className="w-2 h-2 fill-white" /> HONOURS
               </div>
            ) : (
               <div className="bg-slate-200 text-slate-500 text-[8px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter">
                 -{stats.honoursGap} to 8.5
               </div>
            )}
          </div>
          <p className={`text-4xl font-black italic ${parseFloat(stats.avg) >= 8.5 ? 'text-orange-600' : 'text-slate-900'}`}>{stats.avg}</p>
        </div>

        <div className="pl-4 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standing</p>
          <p className={cn("text-lg font-black uppercase italic", stats.ects >= 45 ? "text-green-600" : "text-orange-600")}>
            {stats.ects >= 45 ? "Safe" : "Warning"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center justify-between py-4 border-b border-slate-100 group">
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 uppercase italic group-hover:text-orange-600 transition-colors">{c.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Q{c.quarter} • {c.ects} EC</span>
            </div>
            {editMode ? (
              <Input type="number" step="0.1" className="w-16 h-10 text-center font-black bg-orange-50 border-orange-200" value={c.grade ?? ""}
                onChange={(e) => {
                  const val = e.target.value === "" ? null : Number(e.target.value);
                  setCourses(prev => prev.map(p => p.id === c.id ? { ...p, grade: val, status: val >= 5.8 ? 'passed' : val !== null ? 'failed' : 'pending' } : p));
                }}
              />
            ) : (
              <div className={cn("w-12 h-10 flex items-center justify-center font-black rounded-lg text-sm", c.status === 'passed' ? 'bg-green-50 text-green-600' : c.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-300')}>
                {c.grade !== null ? Number(c.grade).toFixed(1) : "—"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};