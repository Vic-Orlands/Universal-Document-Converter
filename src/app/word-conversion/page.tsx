"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  Download,
  Loader,
  MoveHorizontal,
} from "lucide-react";
import {
  Table,
  Packer,
  TextRun,
  Document,
  TableRow,
  TableCell,
  Paragraph,
  SectionType,
} from "docx";
import mammoth from "mammoth";
import { marked } from "marked";
import { saveAs } from "file-saver";
import TurndownService from "turndown";
import { useToast } from "@/hooks/use-toast";

export default function WordConverter() {
  const { toast } = useToast();
  const [copy, setCopy] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markdownInput, setMarkdownInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedContent, setConvertedContent] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} is ready for conversion`,
      });
    }
  };

  const convertWordToMarkdown = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a Word document first",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      const { value: extractedHTML } = await mammoth.convertToHtml({
        arrayBuffer,
      });

      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(extractedHTML);
      setConvertedContent(markdown);

      setTimeout(() => {
        setIsLoading(false);

        toast({
          title: "Conversion Successful",
          description: "Word document converted to Markdown",
        });
      }, 1200);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      toast({
        title: "Conversion Failed",
        description: "Failed to convert Word document",
        variant: "destructive",
      });
    }
  };

  // function for mapping markdown by depths to its corresponding docx section
  function mapHeading(depth: number) {
    switch (depth) {
      case 1:
        return "Heading1";
      case 2:
        return "Heading2";
      case 3:
        return "Heading3";
      case 4:
        return "Heading4";
      case 5:
        return "Heading5";
      case 6:
        return "Heading6";
      default:
        return undefined;
    }
  }

  const convertMarkdownToWord = async () => {
    if (!markdownInput) {
      toast({
        title: "No Content",
        description: "Please enter Markdown content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const tokens = marked.lexer(markdownInput);
      const children: (Paragraph | Table)[] = [];

      for (const token of tokens) {
        switch (token.type) {
          case "heading":
            children.push(
              new Paragraph({
                text: token.text,
                heading: mapHeading(token.depth),
              })
            );
            break;

          case "paragraph":
            children.push(new Paragraph({ text: token.text }));
            break;

          case "list":
            for (const item of token.items) {
              const runs: TextRun[] = [];

              // Regex to detect **bold** syntax
              const boldRegex = /\*\*(.*?)\*\*/g;
              let lastIndex = 0;
              let match;

              // Iterate over all matches in the list item text
              while ((match = boldRegex.exec(item.text)) !== null) {
                const [fullMatch, boldText] = match;

                // Add text before the bold segment
                if (match.index > lastIndex) {
                  runs.push(
                    new TextRun({
                      text: item.text.slice(lastIndex, match.index),
                    })
                  );
                }

                // Add bold text
                runs.push(
                  new TextRun({
                    text: boldText,
                    bold: true,
                  })
                );

                lastIndex = match.index + fullMatch.length;
              }

              // Add any remaining text after the last match
              if (lastIndex < item.text.length) {
                runs.push(
                  new TextRun({
                    text: item.text.slice(lastIndex),
                  })
                );
              }

              // Add the list item as a paragraph with bullet styling
              children.push(
                new Paragraph({
                  children: runs,
                  bullet: { level: item.task ? 1 : 0 },
                })
              );
            }
            break;

          case "code":
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: token.text,
                    font: "Courier New",
                  }),
                ],
              })
            );
            break;

          case "blockquote":
            children.push(
              new Paragraph({
                text: token.text,
                style: "IntenseQuote",
              })
            );
            break;

          case "table":
            const rows = token.rows.map(
              (row: string[]) =>
                new TableRow({
                  children: row.map(
                    (cell) =>
                      new TableCell({
                        children: [new Paragraph({ text: cell })],
                      })
                  ),
                })
            );

            children.push(
              new Table({
                rows,
              })
            );
            break;

          default:
            break;
        }
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              type: SectionType.CONTINUOUS,
            },
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      setTimeout(() => {
        setIsLoading(false);
        saveAs(blob, "document_converter.docx");

        toast({
          title: "Export Successful",
          description: "Markdown converted to Word document",
        });
      }, 1200);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      toast({
        title: "Export Failed",
        description: "Failed to convert Markdown to Word",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto sm:p-4 xl:px-72 xl:pt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2" /> Word Document{" "}
            <MoveHorizontal className="m-1 w-4" /> Markdown Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="word-to-md" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-fit">
              <TabsTrigger value="word-to-md" className="text-md">
                Word to Markdown
              </TabsTrigger>
              <TabsTrigger value="md-to-word" className="text-md">
                Markdown to Word
              </TabsTrigger>
            </TabsList>

            {/* Word to Markdown Tab */}
            <TabsContent value="word-to-md">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    multiple
                    type="file"
                    accept=".docx"
                    onChange={handleFileUpload}
                    className="w-full"
                  />
                  <Button
                    onClick={convertWordToMarkdown}
                    disabled={!selectedFile}
                    className="flex items-center"
                  >
                    {isLoading ? "Converting" : "Convert"}
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Upload className="h4 w-4" />
                    )}
                  </Button>
                </div>

                {!isLoading && convertedContent && (
                  <div className="mt-4">
                    <Textarea
                      value={convertedContent}
                      readOnly
                      className="min-h-[300px] w-full"
                      placeholder="Converted Markdown will appear here"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCopy(true);

                        navigator.clipboard.writeText(convertedContent);
                        toast({
                          title: "Copied to Clipboard",
                          description: "Markdown content copied",
                        });

                        setTimeout(() => {
                          setCopy(false);
                        }, 1200);
                      }}
                      className="mt-2 w-full"
                    >
                      {copy ? "Copied" : "Copy Markdown"}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Markdown to Word Tab */}
            <TabsContent value="md-to-word">
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your Markdown here..."
                  value={markdownInput}
                  onChange={(e) => setMarkdownInput(e.target.value)}
                  className="min-h-[300px] w-full"
                />
                <Button
                  onClick={convertMarkdownToWord}
                  disabled={!markdownInput}
                  className="w-full flex items-center"
                >
                  {isLoading ? "Converting" : "Convert to Word"}
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Download className="h4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
