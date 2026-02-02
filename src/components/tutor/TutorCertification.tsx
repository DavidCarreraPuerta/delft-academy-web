import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Video, 
  ClipboardCheck,
  Upload,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Who owns the student relationship at DelftQuest Academy?",
    options: [
      "The tutor",
      "The student's parents",
      "DelftQuest Academy",
      "The tutor and Academy share ownership"
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Can you offer TU Delft preparation services on competing platforms?",
    options: [
      "Yes, as long as I inform the Academy",
      "No, exclusivity is required during and 12 months after the agreement",
      "Yes, after 6 months of collaboration",
      "Only for MSc-level courses"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Who owns teaching materials created during your collaboration?",
    options: [
      "The tutor who created them",
      "Both the tutor and Academy equally",
      "DelftQuest Academy",
      "The students who received them"
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is the minimum session completion rate (Loyalty) required?",
    options: [
      "85%",
      "90%",
      "95%",
      "100%"
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the minimum student rating required to remain in the Talent Hub?",
    options: [
      "3/5 stars",
      "3.5/5 stars",
      "4/5 stars",
      "4.5/5 stars"
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "How are tutors compensated?",
    options: [
      "Directly by students",
      "Monthly by the Academy based on Dashboard data",
      "Per session immediately after completion",
      "Annually with a fixed salary"
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What triggers a Success Bonus payment?",
    options: [
      "Completing 10 sessions",
      "Student's official admission or BSA pass",
      "Reaching a 5-star rating",
      "Referring new students"
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Can you redirect students to receive direct payments?",
    options: [
      "Yes, for additional services",
      "Only with written permission",
      "No, this is strictly prohibited",
      "Yes, after the first 5 sessions"
    ],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "How long does the non-compete clause last after leaving?",
    options: [
      "3 months",
      "6 months",
      "12 months",
      "24 months"
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "What happens to Academy-provided materials after your collaboration ends?",
    options: [
      "You can keep them for personal use",
      "They must be returned/deleted as they remain Academy property",
      "You can share them with other tutors",
      "They become public domain"
    ],
    correctAnswer: 1,
  },
];

interface TutorCertificationProps {
  onComplete: () => void;
}

export function TutorCertification({ onComplete }: TutorCertificationProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1: Academic Proof
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [subjectGrade, setSubjectGrade] = useState("");
  
  // Step 2: Teaching Demo
  const [demoUrl, setDemoUrl] = useState("");
  
  // Step 3: Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleTranscriptUpload = async () => {
    if (!transcriptFile || !user) return;

    setLoading(true);
    
    const fileExt = transcriptFile.name.split(".").pop();
    const filePath = `${user.id}/transcript.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("tutor-documents")
      .upload(filePath, transcriptFile, { upsert: true });

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("tutor-documents")
      .getPublicUrl(filePath);

    await supabase
      .from("tutors")
      .update({ grade_transcript_url: urlData.publicUrl })
      .eq("user_id", user.id);

    setLoading(false);
    setStep(2);
  };

  const handleDemoSubmit = async () => {
    if (!demoUrl || !user) return;

    setLoading(true);

    const { error } = await supabase
      .from("tutors")
      .update({ teaching_demo_url: demoUrl })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setStep(3);
    }

    setLoading(false);
  };

  const handleQuizSubmit = async () => {
    setLoading(true);

    // Calculate score
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / QUIZ_QUESTIONS.length) * 100);
    const passed = score === 100;

    const { error } = await supabase
      .from("tutors")
      .update({
        quiz_score: score,
        quiz_passed_at: passed ? new Date().toISOString() : null,
        status: passed ? "pending_review" : "pending_certification",
      })
      .eq("user_id", user?.id);

    setQuizSubmitted(true);
    setQuizPassed(passed);

    if (passed) {
      toast({
        title: "Congratulations!",
        description: "You passed the compliance quiz. Your application is now under review.",
      });
      setTimeout(() => onComplete(), 2000);
    } else {
      toast({
        title: "Quiz not passed",
        description: `You scored ${score}%. Review the Terms of Collaboration and try again.`,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8">
        {[
          { num: 1, label: "Academic Proof", icon: FileText },
          { num: 2, label: "Teaching Demo", icon: Video },
          { num: 3, label: "Compliance Quiz", icon: ClipboardCheck },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <span className={`text-sm mt-2 ${step >= s.num ? "font-medium" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={`h-1 w-24 mx-4 ${step > s.num ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Academic Proof */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Step 1: Academic Proof
            </CardTitle>
            <CardDescription>
              Upload your Osiris grade transcript and specify your subject grade.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Osiris Grade Transcript *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                {transcriptFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{transcriptFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTranscriptFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-3">
                      Upload your official grade transcript (PDF)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="max-w-xs mx-auto"
                      onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject-grade">Subject Grade (for your main teaching subject) *</Label>
              <Input
                id="subject-grade"
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g., 8.5"
                value={subjectGrade}
                onChange={(e) => setSubjectGrade(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We require a minimum grade of 7.5 in your primary teaching subject.
              </p>
            </div>

            <Button
              className="w-full"
              onClick={handleTranscriptUpload}
              disabled={!transcriptFile || !subjectGrade || loading}
            >
              {loading ? "Uploading..." : "Continue to Step 2"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Teaching Demo */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              Step 2: Teaching Demo
            </CardTitle>
            <CardDescription>
              Record a 2-minute video demonstrating your teaching skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-medium mb-2">Demo Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>2 minutes maximum length</li>
                <li>Explain a concept from your teaching subjects</li>
                <li>Show your communication and explanation skills</li>
                <li>Use a whiteboard, slides, or code editor</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Label htmlFor="demo-url">Video URL (YouTube or Loom) *</Label>
              <Input
                id="demo-url"
                type="url"
                placeholder="https://www.loom.com/share/..."
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleDemoSubmit}
                disabled={!demoUrl || loading}
              >
                {loading ? "Saving..." : "Continue to Quiz"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Quiz */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6" />
              Step 3: Compliance Quiz
            </CardTitle>
            <CardDescription>
              Complete this quiz with a 100% score to finish your certification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizSubmitted ? (
              <div className="text-center py-8">
                {quizPassed ? (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                    <p className="text-muted-foreground">
                      You passed the compliance quiz. Your application is now pending review.
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Quiz Not Passed</h3>
                    <p className="text-muted-foreground mb-4">
                      Please review the Terms of Collaboration and try again.
                    </p>
                    <Button onClick={resetQuiz}>Retry Quiz</Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Progress: {Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-sm font-medium">
                    Must score 100% to pass
                  </span>
                </div>
                <Progress value={(Object.keys(quizAnswers).length / QUIZ_QUESTIONS.length) * 100} />

                <div className="space-y-8 mt-6">
                  {QUIZ_QUESTIONS.map((q, index) => (
                    <div key={q.id} className="space-y-3">
                      <h4 className="font-medium">
                        {index + 1}. {q.question}
                      </h4>
                      <RadioGroup
                        value={quizAnswers[q.id]?.toString()}
                        onValueChange={(v) =>
                          setQuizAnswers((prev) => ({ ...prev, [q.id]: parseInt(v) }))
                        }
                      >
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={optIndex.toString()} id={`q${q.id}-${optIndex}`} />
                            <Label htmlFor={`q${q.id}-${optIndex}`} className="font-normal">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length || loading}
                  >
                    {loading ? "Submitting..." : "Submit Quiz"}
                    <CheckCircle2 className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
