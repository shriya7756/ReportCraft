import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export async function exportReportToDocx(topic: string, data: any) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: topic,
            heading: HeadingLevel.TITLE,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Abstract",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun(data.content?.intro || data.abstract || "")]
          }),
          new Paragraph({
            text: "Methodology",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun(data.methodology || "Live web synthesis and cross-referencing.")]
          }),
          new Paragraph({
            text: "Analysis",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun(data.analysis || "Analysis detailed in the main report.")]
          }),
          new Paragraph({
            text: "Conclusion",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun(data.conclusion || "Synthesis complete.")]
          }),
          new Paragraph({
            text: "Sources",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          ...(data.sources || []).map((s: any, i: number) => {
            return new Paragraph({
              children: [
                new TextRun({ text: `[${i + 1}] ${s.title}`, bold: true }),
                new TextRun({ text: ` — ${s.url}`, break: 1 }),
              ],
              spacing: { after: 200 },
            });
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_report.docx`);
}
