import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Función de limpieza profunda de LaTeX (ORIGINAL)
const cleanLaTeX = (text: string) => {
  if (!text) return "";
  return text
    .replace(/\$/g, '')
    .replace(/\\mathbf\{/g, '').replace(/\\mathbf /g, '')
    .replace(/\\vec\{/g, '').replace(/\\text\{/g, '')
    .replace(/\\int/g, '∫').replace(/\\infty/g, '∞')
    .replace(/\\frac\{/g, '').replace(/\}\{/g, '/').replace(/\}/g, '')
    .replace(/\\backslash/g, '').replace(/\\/g, '')
    .replace(/\^/g, '^').replace(/_/g, '_')
    .replace(/\{/g, '').replace(/\}/g, '');
};

export const generateOutcomePDF = (blocks: any[], answers: any, timers: any, user: any, warnings: number = 0) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- LÓGICA DE DATOS ---
  const stats = blocks.map(b => {
    const total = b.data.length || 1;
    const right = b.data.filter((q: any) => answers[q.id] === q.correct).length;
    const missed = b.data.filter((q: any) => !answers[q.id]).length;
    const failed = Math.max(0, total - right - missed);
    const timeSecs = b.data.reduce((acc: number, q: any) => acc + (timers[`${b.id}_${q.id}`] || 0), 0);
    return { 
      name: b.name, 
      pct: Math.round((right / total) * 100), 
      correct: right, 
      right, failed, missed, total,
      timeMins: Math.floor(timeSecs / 60), 
      blanks: missed 
    };
  });

  const totalTime = stats.reduce((acc, s) => acc + s.timeMins, 0);
  const totalBlanks = stats.reduce((acc, s) => acc + s.blanks, 0);
  const averageScore = Math.round(stats.reduce((acc, s) => acc + s.pct, 0) / stats.length);
  
  const strongBlocks = stats.filter(s => s.pct >= 70).map(s => s.name);
  const weakBlocks = stats.filter(s => s.pct < 50).map(s => s.name);
  
  const formatList = (list: string[]) => {
    if (list.length === 0) return "none";
    if (list.length === 1) return list[0];
    return list.slice(0, -1).join(", ") + " and " + list.slice(-1);
  };

  // --- CABECERA ---
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("DELFT ADMISSION AUDIT REPORT", 20, 18);
  doc.setFontSize(9);
  doc.setTextColor(160, 160, 160);
  doc.text(`CANDIDATE: ${user?.name || 'studentalldocs'}`, 20, 28);
  doc.text(`DATE: ${new Date().toLocaleDateString()}`, 150, 28);

  // --- 1. TEST RESULTS BY SUBJECT ---
  let currentY = 55;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text("1. TEST RESULTS BY SUBJECT", 20, currentY);

  const colors = { right: [34, 197, 94], failed: [220, 38, 38], missed: [148, 163, 184] };
  stats.forEach((s, i) => {
    const xBase = 35 + (i * 55);
    const colW = 7;
    const chartH = 25;
    const hRight = (s.right / s.total) * chartH;
    const hFailed = (s.failed / s.total) * chartH;
    const hMissed = (s.missed / s.total) * chartH;

    doc.setFillColor(colors.right[0], colors.right[1], colors.right[2]);
    doc.rect(xBase, currentY + 8 + (chartH - hRight), colW, hRight, 'F');
    doc.setFillColor(colors.failed[0], colors.failed[1], colors.failed[2]);
    doc.rect(xBase + colW + 1, currentY + 8 + (chartH - hFailed), colW, hFailed, 'F');
    doc.setFillColor(colors.missed[0], colors.missed[1], colors.missed[2]);
    doc.rect(xBase + (colW * 2) + 2, currentY + 8 + (chartH - hMissed), colW, hMissed, 'F');

    doc.setFontSize(6);
    doc.setTextColor(100);
    doc.text(`${s.right}`, xBase + 1, currentY + 7 + (chartH - hRight));
    doc.text(`${s.failed}`, xBase + colW + 2, currentY + 7 + (chartH - hFailed));
    doc.text(`${s.missed}`, xBase + (colW * 2) + 3, currentY + 7 + (chartH - hMissed));

    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(s.name.toUpperCase(), xBase, currentY + 38);
  });
  
  doc.setFontSize(7);
  doc.text("Legend: Green = Correct | Red = Wrong | Grey = Blanks", 35, currentY + 44);

  // --- 2. TIME MANAGEMENT & PACING ---
  currentY = 105;
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("2. TIME MANAGEMENT & PACING", 20, currentY);

  stats.forEach((s, i) => {
    const barY = currentY + 10 + (i * 9);
    const timeWidth = Math.min((s.timeMins / 45) * 100, 100); 
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`${s.name}: ${s.timeMins} min`, 20, barY);
    doc.setFillColor(241, 245, 249);
    doc.rect(65, barY - 2.5, 100, 2.5, 'F');
    doc.setFillColor(79, 70, 229); 
    doc.rect(65, barY - 2.5, Math.max(timeWidth, 2), 2.5, 'F');
  });

  // --- 3. STRATEGIC EXECUTIVE SUMMARY (IDENTICAL A LA WEB) ---
  currentY = 145;
  doc.setFontSize(13);
  doc.text("3. STRATEGIC EXECUTIVE SUMMARY", 20, currentY);

  const pacingStatus = totalTime > 90 ? "improvable due to overtime" : "optimal";

  const paras = [
    `Your overall accuracy stands at ${averageScore}%. Based on your performance, you should prioritize reinforcing ${formatList(weakBlocks)}, as these areas currently fall below the competitive threshold. Conversely, you demonstrated a strong command of ${formatList(strongBlocks)}.`,
    `Your time management was ${pacingStatus}. You completed the test in ${totalTime} minutes, leaving ${totalBlanks} questions unanswered. Remember for your next attempt: TU Delft does not penalize wrong answers. It is strategically vital to guess every single question rather than leaving blanks.`,
    `Proctoring alerts: ${warnings}. This metric tracks focus changes or unauthorized window switching. Maintaining strict focus is essential, as more than 3 alerts typically trigger a manual review or disqualification in the official selection process.`
  ];

  let statusColor = averageScore > 70 ? [22, 163, 74] : averageScore > 40 ? [234, 179, 8] : [220, 38, 38];
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(165, currentY - 5, 25, 6, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text(averageScore > 70 ? "OPTIMAL" : averageScore > 40 ? "STABLE" : "CRITICAL", 169, currentY - 0.5);

  currentY += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, currentY, 180, 48, 3, 3, 'FD');
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(8);
  
  let textY = currentY + 10;
  paras.forEach((p) => {
    const lines = doc.splitTextToSize(p, 170);
    doc.text(lines, 20, textY);
    textY += (lines.length * 4) + 2; // Salto de línea dinámico según el texto
  });

  // --- 4. TOP 10 TIME-SINKS ---
  currentY = 210;
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("4. TOP 10 TIME-SINKS", 20, currentY);
  
  const allQs = blocks.flatMap(b => b.data.map((q: any) => ({
    text: q.q,
    time: timers[`${b.id}_${q.id}`] || 0,
    status: answers[q.id] === q.correct ? "CORRECT" : (answers[q.id] ? "WRONG" : "BLANK")
  }))).sort((a: any, b: any) => b.time - a.time).slice(0, 10);

  allQs.forEach((q, i) => {
    doc.setFontSize(7.5);
    const isOk = q.status === "CORRECT";
    doc.setTextColor(isOk ? 34 : 180, isOk ? 130 : 0, 0);
    doc.text(`${i+1}. [${q.status}] ${q.time}s - ${cleanLaTeX(q.text).substring(0, 90)}...`, 25, currentY + 8 + (i * 5.5));
  });

  // --- PÁGINA 2: REVIEW TABLE ---
  doc.addPage('a4', 'l');
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 297, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("FULL RATIONALE & QUESTION REVIEW", 15, 10);

  autoTable(doc, {
    startY: 20,
    head: [['BLOCK', 'Q#', 'QUESTION', 'RES', 'YOU', 'KEY', 'TIME', 'RATIONALE']],
    body: blocks.flatMap(b => b.data.map((q: any, i: number) => [
      b.name.substring(0,4), i+1, cleanLaTeX(q.q).substring(0, 100),
      answers[q.id] === q.correct ? "OK" : (answers[q.id] ? "KO" : "-"),
      answers[q.id] || "-", q.correct, `${timers[`${b.id}_${q.id}`] || 0}s`, cleanLaTeX(q.rationale)
    ])),
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 2: { cellWidth: 80 }, 7: { cellWidth: 90 } },
    headStyles: { fillColor: [234, 88, 12] }
  });

  doc.save(`Delft_Audit_${user?.name || 'Student'}.pdf`);
};