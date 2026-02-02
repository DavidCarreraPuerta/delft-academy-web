export const HeroSection = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-4 text-center">
      {/* 1. Eliminado el badge de Trusted by students para ganar espacio vertical */}
      
      {/* 2. Título Principal: Ajustado a 2 líneas exactas */}
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic leading-[0.9]">
        Master your <span className="text-[#00a6d6]">TU Delft</span> <br />
        Aerospace Journey
      </h1>
      
      {/* 3. Subhero: Una sola línea en naranja */}
      <p className="text-base md:text-xl font-bold text-orange-500 uppercase tracking-tight leading-none mb-2">
        Access TU Delft and Excel with Tutors who've been there
      </p>

      {/* 4. Segunda línea de apoyo: Más pequeña */}
      <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest opacity-80">
        The only platform guiding you from Admission to Master's Excellence
      </p>

      {/* Divisor mínimo para separar de la siguiente sección */}
      <div className="mt-6 w-12 h-1 bg-slate-100 mx-auto rounded-full" />
    </div>
  );
};