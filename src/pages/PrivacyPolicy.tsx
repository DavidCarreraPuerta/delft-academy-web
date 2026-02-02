import { MainLayout } from "@/components/layout/MainLayout";

export default function PrivacyPolicy() {
  return (
    <MainLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 mb-8">
          Privacy <span className="text-orange-600">Policy</span>
        </h1>
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">1. Data Collection</h2>
            <p>We only collect data strictly necessary to provide our services: Name, Email, and WhatsApp number for communication purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">2. Use of Information</h2>
            <p>Your data is used exclusively to manage your Strategy Call and access to the Academy resources. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">3. Your Rights</h2>
            <p>You may request the deletion of your account and personal data at any time by contacting our support team via email.</p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}