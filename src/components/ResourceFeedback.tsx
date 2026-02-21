"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ResourceFeedbackProps {
  resourceId: string;    // El nombre real del archivo (ej: LECTURE_M1_VECTORS.PDF)
  programmeId: string;   
  category: 'material' | 'simulator' | 'tutor'; 
}

export const ResourceFeedback = ({ resourceId, programmeId, category }: ResourceFeedbackProps) => {
  const [step, setStep] = useState<'rating' | 'comment' | 'thanks'>('rating');
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  // CRITERIO: Solo limpiamos estéticamente (.pdf y guiones) sin perder información académica
  const formatResourceId = (id: string) => {
    if (category !== 'material') return id;
    return id
      .replace(/\.pdf$/i, '') // Quita la extensión sin importar mayúsculas
      .replace(/_/g, ' ');    // Cambia guiones por espacios para legibilidad
  };

  const faces = [
    { emoji: "🙁", value: 1.5, label: "Needs improvement" },
    { emoji: "😐", value: 3.0, label: "Satisfactory" },
    { emoji: "🙂", value: 4.0, label: "Good / Helpful" },
    { emoji: "🤩", value: 5.0, label: "Excellent / This is what I needed!" },
  ];

  const handleRating = (val: number) => {
    setRating(val);
    setStep('comment');
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`lastFeedback_${category}`, today);
  };

  const submitFeedback = async () => {
    setIsSending(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // IMPORTANTE: Aquí enviamos el 'resourceId' original a la base de datos
    const { error } = await supabase.from('user_feedback').insert({
      user_id: session.user.id,
      rating_value: rating,
      target_id: resourceId, 
      programme_id: programmeId,
      comment: comment || null,
      category: category
    });

    if (!error) {
      setStep('thanks');
      setTimeout(() => toast.dismiss(), 2000);
    }
    setIsSending(false);
  };

  return (
    <div className="p-1 space-y-3 font-sans">
      {step === 'rating' && (
        <>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            {category === 'material' 
              ? `Feedback for: ${formatResourceId(resourceId)}` 
              : category === 'simulator' 
                ? 'How was the simulator experience?' 
                : 'Rate your session with the tutor'}
          </p>
          <div className="flex justify-between items-center px-2">
            {faces.map((f) => (
              <button
                key={f.value}
                onClick={() => handleRating(f.value)}
                className="text-3xl hover:scale-125 transition-transform duration-200"
                title={f.label}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'comment' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-tight">
            {category === 'material' ? 'How can we improve this material?' : 'Any specific comment for your Tutor?'}
          </p>
          <Input 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional..."
            className="h-9 text-xs border-slate-200 rounded-lg focus:ring-[#00a6d6]"
          />
          <Button 
            onClick={submitFeedback} 
            disabled={isSending}
            className="w-full h-9 text-[10px] font-black bg-slate-900 hover:bg-[#00a6d6] text-white rounded-lg transition-colors"
          >
            {isSending ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : "SUBMIT REVIEW"}
          </Button>
        </div>
      )}

      {step === 'thanks' && (
        <p className="text-sm font-bold text-[#00a6d6] flex items-center justify-center gap-2 py-2 italic animate-in zoom-in duration-300">
          Success! Your tutor is on it. 🚀
        </p>
      )}
    </div>
  );
};