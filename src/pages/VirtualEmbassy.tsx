import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserCheck, Home, Landmark, Sparkles, ArrowRight, ChevronDown, Bike, Coffee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VirtualEmbassy = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { 
      id: 'housing', 
      icon: <Home className="w-5 h-5" />, 
      title: 'Housing & Accommodation', 
      content: `Securing a room in Delft is notoriously competitive. Your Tutor will guide you through the DUWO 'First-come, first-served' system, private platforms like Kamernet, and the nuances of 'hospiteren' (student house interviews). We focus on strategic areas like Tanthof (quiet), the City Centre (vibrant), or the Voorhof area for proximity to the faculty.`,
      links: ["DUWO Housing", "Delft Rental Market Guide"]
    },
    { 
      id: 'reg', 
      icon: <Landmark className="w-5 h-5" />, 
      title: 'Administrative Landing', 
      content: `We streamline your legal arrival. This includes booking your BSN (Citizen Service Number) appointment at the Delft Town Hall (Stadhuis), setting up your DigiD for government services, and choosing the right Dutch bank account (ING/ABN AMRO) to avoid international transaction fees.`,
      links: ["Municipality of Delft", "DigiD Setup"]
    },
    { 
      id: 'life', 
      icon: <Sparkles className="w-5 h-5" />, 
      title: 'Student Life & Integration', 
      content: `Life at TU Delft goes beyond the classroom. From joining the 'X' (the massive TU Delft sports and culture centre) to understanding the role of the VSSD (Student Union) and the 'Eetcafe' culture. We'll help you find the best second-hand bike shops and explain the Dutch 'Gezellig' lifestyle.`,
      links: ["X TU Delft", "Student Associations"]
    }
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-12 text-center md:text-left">
            <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Integrated Support
            </span>
            <h1 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">
              Virtual <span className="text-orange-600">Embassy</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
              Your academic success depends on your peace of mind. Our Tutors serve as your **Senior Buddies**, ensuring a seamless relocation to the Netherlands.
            </p>
          </header>

          {/* MAIN BUDDY CONCEPT BLOCK */}
          <section className="mb-12 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-600 rounded-2xl">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black italic uppercase">More than a Tutor</h2>
                </div>
                
                <div className="space-y-4 text-slate-300 text-base leading-relaxed mb-8">
                  <p>
                    Every student enrolled in our programmes is automatically assigned a <span className="text-white font-bold">Senior Buddy</span>. This role is fulfilled by your academic tutor, who has already lived through the challenges of moving to Delft.
                  </p>
                  <p>
                    From finding the right bike to navigating Dutch bureaucracy, you have a direct line to someone who knows the system from the inside.
                  </p>
                </div>

                <Button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-white hover:bg-orange-600 text-slate-900 hover:text-white font-black py-7 px-10 rounded-2xl text-xs uppercase tracking-widest flex gap-3 transition-all active:scale-95 shadow-lg"
                >
                  {showForm ? "Close Form" : "Connect with my Buddy"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {showForm && (
                <div className="w-full md:w-80 bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-lg font-black italic uppercase mb-4 text-center">Inquiry Form</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <Input placeholder="Alex Taylor" className="rounded-xl bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                      <Input placeholder="e.g. Applying for BSc" className="rounded-xl bg-slate-50 border-slate-100" />
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-100">
                      Submit Inquiry
                    </Button>
                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase mt-2">Available for enrolled students</p>
                  </form>
                </div>
              )}
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-[-10%] right-[-5%] opacity-10 pointer-events-none">
              <Landmark className="w-64 h-64 text-white" />
            </div>
          </section>

          {/* DETAILED RESOURCES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
                className={`group bg-white border rounded-[2.5rem] p-8 shadow-sm transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  activeSection === item.id ? 'border-orange-400 ring-8 ring-orange-50' : 'border-slate-100 hover:border-orange-200 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className={`mb-6 p-4 rounded-2xl w-fit transition-all duration-500 ${
                    activeSection === item.id ? 'bg-orange-600 text-white' : 'bg-slate-50 text-orange-600 group-hover:bg-orange-50'
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-xl italic uppercase tracking-tight mb-4">{item.title}</h3>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${activeSection === item.id ? 'max-h-96 opacity-100' : 'max-h-20 opacity-60'}`}>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                      {item.content}
                    </p>
                    {activeSection === item.id && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.links.map(link => (
                          <span key={link} className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                            {link}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-orange-600 uppercase italic tracking-widest">
                    {activeSection === item.id ? 'Collapse Info' : 'Explore Guide'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-500 ${activeSection === item.id ? 'rotate-180 text-orange-600' : ''}`} />
                </div>
              </div>
            ))}
          </div>

          {/* LOCAL TIPS FOOTER */}
          <footer className="mt-20 bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Bike className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Swapfiets Ready</span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gezellig Socials</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campus Experts</span>
            </div>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
};

export default VirtualEmbassy;