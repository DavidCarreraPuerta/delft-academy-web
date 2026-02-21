"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { supabase } from "@/lib/supabase"; 
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lock, BookOpen, ShieldAlert, MousePointer2, 
  Maximize, Minimize, Loader2, ChevronDown 
} from "lucide-react";
// AÑADIDOS PARA FEEDBACK
import { toast } from "sonner";
import { ResourceFeedback } from "@/components/ResourceFeedback";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Material {
  material_id: string;
  title: string;
  url: string;
  subject?: string;
}

export const MaterialsVault = ({ profile }: { profile?: any }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activePdf, setActivePdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('materials').select('*').order('material_id');
        setMaterials(data || []);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const hasAccess = (materialId: string) => {
    if (!profile?.unlocked_materials) return false;
    const raw = profile.unlocked_materials;
    const unlocked = Array.isArray(raw) ? raw.map(String) : String(raw).replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
    return unlocked.includes(String(materialId).trim());
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center font-black text-orange-500 animate-pulse uppercase tracking-widest text-xs">
      <Loader2 className="w-6 h-6 animate-spin mr-3" /> Initializing Vault...
    </div>
  );

  const subjects = ['Maths', 'Physics', 'Aerospace Engineering'];

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto px-2">
      <style dangerouslySetInnerHTML={{ __html: `@media print { body { display: none !important; } }` }} />

      {/* 1. TÍTULO ACTUALIZADO Y COMPACTO */}
      <div className="flex flex-col border-l-4 border-orange-500 pl-4 mt-4">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
          Syllabus Summaries <span className="text-orange-500">& Exam Exercises</span>
        </h2>
      </div>

      {/* 2. GRID COMPACTADO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((subjectName) => (
          <div key={subjectName} className="flex flex-col gap-3">
            {/* Header de asignatura más pequeño */}
            <div className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border-b-2 border-orange-500 shadow-lg">
              <h3 className="text-white font-black uppercase italic text-[11px] tracking-wider">{subjectName}</h3>
              <span className="text-[9px] font-black bg-orange-600 text-white px-2 py-0.5 rounded-full">
                {materials.filter(m => m.subject?.trim() === subjectName).length}
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              {materials.filter(m => m.subject?.trim() === subjectName).map((item) => {
                const unlocked = hasAccess(item.material_id);
                return (
                  <Card 
                    key={item.material_id}
                    className={`group rounded-xl border-none shadow-sm transition-all duration-200 ${unlocked ? 'bg-white hover:bg-orange-50 cursor-pointer' : 'bg-slate-50 opacity-60'}`}
                    onClick={() => unlocked && setActivePdf(`/Materials/${item.url.split('/').pop()}`)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-1">
                        {unlocked ? <BookOpen className="w-4 h-4 text-orange-500" /> : <Lock className="w-4 h-4 text-slate-300" />}
                        <span className="text-[8px] font-black text-slate-300 uppercase italic">{item.material_id}</span>
                      </div>
                      <h4 className="text-[11px] font-black text-slate-800 uppercase italic leading-tight group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h4>
                      {unlocked && (
                        <div className="mt-2 flex items-center gap-1 text-orange-500 font-black text-[8px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                          <MousePointer2 className="w-2 h-2" /> Open Now
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* VISOR (Se mantiene idéntico porque ya es perfecto) */}
      {activePdf && (
        <div ref={containerRef} className="fixed inset-0 w-full h-full z-[999999] bg-[#1a1a1a] flex flex-col overflow-hidden">
          <div className="h-16 w-full bg-slate-900 flex items-center justify-between px-8 z-[1001] border-b border-white/5 shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic text-xs">Delft Secure Vault</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleFullScreen} className="bg-slate-800 hover:bg-white hover:text-slate-900 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all">
                {isFullscreen ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />} {isFullscreen ? "Exit" : "Fullscreen"}
              </button>
              <button 
                onClick={() => { 
                  if(document.fullscreenElement) document.exitFullscreen(); 
                  
                  // LÓGICA DE FEEDBACK AL CERRAR
                  const today = new Date().toISOString().split('T')[0];
                  const lastVote = localStorage.getItem('lastFeedback_material');
                  
                  if (lastVote !== today) {
                    toast.custom((t) => (
                      <div className="bg-white border-2 border-slate-100 shadow-2xl rounded-[2rem] p-6 w-[350px] animate-in slide-in-from-right-5 duration-500">
                        <ResourceFeedback 
                          resourceId={activePdf || "general-syllabus"} 
                          programmeId="bsc-aerospace" 
                          category="material" 
                        />
                      </div>
                    ), { duration: 15000, position: 'bottom-right' });
                  }

                  setActivePdf(null); 
                }} 
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-black uppercase text-[9px] hover:bg-white hover:text-orange-600 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>

          <div 
            className="flex-1 overflow-y-auto bg-slate-800 p-4 scroll-smooth"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 pb-20">
              <Document
                file={activePdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <div className="flex flex-col items-center justify-center h-96 text-white gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Securing content...</span>
                  </div>
                }
                className="flex flex-col gap-6"
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div key={`page_${index + 1}`} className="relative shadow-2xl bg-white select-none">
                    <Page 
                      pageNumber={index + 1} 
                      renderTextLayer={false} 
                      renderAnnotationLayer={false}
                      width={Math.min(window.innerWidth * 0.95, 1000)}
                    />
                    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden opacity-[0.04]">
                        <p className="text-[60px] md:text-[80px] font-black uppercase rotate-[-30deg] text-slate-900 text-center leading-none">
                          DELFT ENGINEERING <br/> ACADEMY
                        </p>
                    </div>
                  </div>
                ))}
              </Document>
              {numPages && (
                <div className="py-10 text-white/20 font-black uppercase text-[8px] tracking-[0.5em] flex items-center gap-2">
                   <ChevronDown className="w-4 h-4 animate-bounce" /> Document End
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};