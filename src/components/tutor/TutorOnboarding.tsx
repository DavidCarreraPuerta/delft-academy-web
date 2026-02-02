import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  AlertTriangle,
  CheckCircle2,
  Shield
} from "lucide-react";

const TERMS_VERSION = "1.0";

const TERMS_OF_COLLABORATION = `Terms of Collaboration for Tutors

1. OBJECT OF THE AGREEMENT

This document establishes the terms under which the Tutor (hereinafter, "the Collaborator") will provide teaching and tutoring services for DelftQuest Academy (hereinafter, "the Academy").

2. CLIENT OWNERSHIP (STUDENT OWNERSHIP)

Ownership: The Student is the sole and exclusive client of the Academy.

Prohibition of Diversion: The Collaborator is prohibited from diverting students to personal channels, direct payments outside the platform, or competing services.

3. INTELLECTUAL PROPERTY (IP) AND CONFIDENTIALITY

Academy Materials: All material provided to the Collaborator (exam methodologies, Proctortrack guides, Aerospace/CSE exercise databases, and software such as the BSA Tracker) is the exclusive intellectual property of the Academy.

Generated Materials: Any pedagogical content (summaries, presentations, exercises) created by the Collaborator during the term of this agreement shall become the property of the Academy.

Confidentiality: The Collaborator agrees not to reproduce or distribute these materials outside the DelftQuest Academy environment.

4. EXCLUSIVITY AND NON-COMPETE

Exclusivity: The Collaborator shall refrain from offering specific preparation services for TU Delft admission exams (Selection Exams) or first-year tutoring on other online platforms (e.g., delftprep.nl) or independently.

Duration: This restriction remains in effect during the term of the agreement and up to 12 months after its termination.

5. ECONOMIC MODEL AND PAYMENTS

Payments: The Academy is the only entity authorized to charge the Student.

Compensation: The Collaborator will receive monthly payments based on agreed rates (1:1 classes, Buddy sessions, and Success Bonuses) according to the data recorded in the Tutor Dashboard.

Success Bonus: Subject to validation of the student's official results (admission or passing the BSA).

6. QUALITY AND CANCELLATIONS

Cancellation Ratio: The Collaborator must maintain a ratio of completed sessions to confirmed sessions (Loyalty) above 95%.

Rating: Permanence in the Talent Hub is subject to an average student rating above 4/5 stars.`;

interface TutorOnboardingProps {
  onComplete: () => void;
}

export function TutorOnboarding({ onComplete }: TutorOnboardingProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasAgreedIP, setHasAgreedIP] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
      if (isAtBottom) {
        setHasScrolledToBottom(true);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleSign = async () => {
    if (!user || !legalName.trim()) return;

    setLoading(true);

    const { error } = await supabase
      .from("tutors")
      .update({
        agreement_signed: true,
        agreement_signed_at: new Date().toISOString(),
        agreement_legal_name: legalName,
        agreement_version: TERMS_VERSION,
        status: "pending_certification",
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Agreement signed!",
        description: "You can now proceed with the certification process.",
      });
      onComplete();
    }

    setLoading(false);
  };

  const downloadPDF = () => {
    // Create a simple text file download as PDF generation would require additional libraries
    const blob = new Blob([TERMS_OF_COLLABORATION], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DelftQuest_Terms_of_Collaboration.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const canSign = hasScrolledToBottom && hasReadTerms && hasAgreedIP && legalName.trim().length > 3;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Terms of Collaboration
          </CardTitle>
          <CardDescription>
            Please read and accept the terms before proceeding with your tutor application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Highlights */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5" />
              Key Highlights Summary
            </h3>
            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>"The student is a customer of DelftQuest Academy, not yours."</strong>
                  {" "}You cannot redirect students to personal services.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>"You cannot offer these same services on other platforms (Exclusivity)."</strong>
                  {" "}This applies during your collaboration and 12 months after.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>"All teaching materials used or created here are Academy Intellectual Property."</strong>
                  {" "}Content you create belongs to DelftQuest Academy.
                </span>
              </li>
            </ul>
          </div>

          {/* Full Terms */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Full Agreement</h3>
              <Button variant="outline" size="sm" onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF Copy
              </Button>
            </div>
            <ScrollArea className="h-80 rounded-lg border p-4" ref={scrollRef}>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
                {TERMS_OF_COLLABORATION}
              </div>
            </ScrollArea>
            {!hasScrolledToBottom && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                ↓ Scroll to the bottom to continue
              </p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="read-terms"
                checked={hasReadTerms}
                onCheckedChange={(checked) => setHasReadTerms(checked === true)}
                disabled={!hasScrolledToBottom}
              />
              <Label htmlFor="read-terms" className="text-sm leading-relaxed">
                I have read, understood, and agree to the Terms of Collaboration above.
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="agree-ip"
                checked={hasAgreedIP}
                onCheckedChange={(checked) => setHasAgreedIP(checked === true)}
                disabled={!hasScrolledToBottom}
              />
              <Label htmlFor="agree-ip" className="text-sm leading-relaxed">
                I have read, understood, and agree to the Intellectual Property and Non-compete clauses.
              </Label>
            </div>
          </div>

          {/* Digital Signature */}
          <div className="space-y-3">
            <Label htmlFor="legal-name">Full Legal Name (Digital Signature) *</Label>
            <Input
              id="legal-name"
              placeholder="Enter your full legal name"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              disabled={!hasScrolledToBottom}
            />
          </div>

          {/* Exclusivity Warning */}
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-900 font-medium">
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              By signing, you confirm that you will not offer tutoring for TU Delft Aerospace/CSE 
              on competing platforms for the duration of this agreement.
            </p>
          </div>

          {/* Sign Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSign}
            disabled={!canSign || loading}
          >
            {loading ? (
              "Signing..."
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Accept & Sign Agreement
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
