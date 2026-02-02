import { MainLayout } from "@/components/layout/MainLayout";

export default function LegalNotice() {
  return (
    <MainLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 mb-8">
          Legal <span className="text-orange-600">Notice</span>
        </h1>
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">1. Identification</h2>
            <p>In compliance with international e-commerce standards, be advised that Delft Engineering Academy operates as an independent educational platform. For any official enquiries, please contact us at tutors@delftengineering.academy.com.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">2. Intellectual Property</h2>
            <p>All training materials, course structures, and digital assets on this platform are the exclusive property of DelftQuest Academy. Unauthorised distribution or reproduction is strictly prohibited.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">3. Disclaimer</h2>
            <p>DelftQuest Academy provides tutoring and preparatory resources. We do not guarantee admission to any university or success in official exams. We are an independent entity and have no official partnership with TU Delft.</p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}