"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ArrowRightLeft, MoveHorizontal, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TurndownService from "turndown";
import Showdown from "showdown";

export default function HTMLMarkdownConverter() {
  const { toast } = useToast();
  const [copy, setCopy] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markdownInput, setMarkdownInput] = useState<string>("");
  const [markdownOutput, setMarkdownOutput] = useState<string>("");

  const convertHtmlToMarkdown = () => {
    if (!htmlInput || htmlInput === "") {
      setWarning("No HTML input provided");

      setTimeout(() => {
        setWarning("");
      }, 1500);

      return;
    }

    setIsLoading(true);
    try {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(htmlInput);
      setMarkdownOutput(markdown);

      // copies text after conversion
      navigator.clipboard.writeText(markdown);

      setTimeout(() => {
        setIsLoading(false);

        toast({
          title: "Conversion Successful",
          description: "HTML converted to Markdown and copied to clipboard",
        });
      }, 1200);
    } catch (error: unknown) {
      console.log(error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert HTML to Markdown",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const convertMarkdownToHtml = async () => {
    if (!htmlInput || htmlInput === "") {
      setWarning("No Mardown input provided");

      setTimeout(() => {
        setWarning("");
      }, 1500);

      return;
    }

    try {
      setIsLoading(true);
      const converter = new Showdown.Converter();
      const html = converter.makeHtml(markdownInput);
      setHtmlOutput(html);

      // copies text after conversion
      await navigator.clipboard.writeText(html);

      setTimeout(() => {
        setIsLoading(false);

        toast({
          title: "Conversion Successful",
          description: "Markdown converted to HTML and copied to clipboard",
        });
      }, 1200);
    } catch (error: unknown) {
      console.log(error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert Markdown to HTML",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    toast({
      title: "Copied to Clipboard",
      description: `${type} Content has been copied`,
    });

    setTimeout(() => {
      setCopy(false);
    }, 1200);
  };

  return (
    <div className="container mx-auto sm:p-4 xl:px-72 xl:pt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="mr-2" /> HTML{" "}
            <MoveHorizontal className="m-1 w-4" /> Markdown Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="html-to-md" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-fit">
              <TabsTrigger value="html-to-md" className="text-md">
                HTML to Markdown
              </TabsTrigger>
              <TabsTrigger value="md-to-html" className="text-md">
                Markdown to HTML
              </TabsTrigger>
            </TabsList>

            {/* HTML to Markdown Tab */}
            <TabsContent value="html-to-md">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Textarea
                    placeholder="Paste your HTML here..."
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    className="min-h-[300px]"
                  />
                  {warning && (
                    <div className="mt-4">
                      <p className="text-sm text-red-500 font-medium">
                        {warning}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={convertHtmlToMarkdown}>
                      Convert to Markdown
                      {isLoading && <Loader className="animate-spin" />}
                    </Button>
                  </div>
                </div>
                <div>
                  {isLoading ? (
                    <Textarea
                      placeholder="Markdown output will appear here..."
                      value=""
                      readOnly
                      className="min-h-[300px]"
                    />
                  ) : (
                    <Textarea
                      placeholder="Markdown output will appear here..."
                      value={markdownOutput}
                      readOnly
                      className="min-h-[300px]"
                    />
                  )}
                  {!isLoading && markdownOutput && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(markdownOutput, "Markdown")
                      }
                      className="mt-4"
                    >
                      <Copy className="mr-2 h-4 w-4" />{" "}
                      {copy ? "Copied" : "Copy Markdown"}
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Markdown to HTML Tab */}
            <TabsContent value="md-to-html">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Textarea
                    placeholder="Paste your Markdown here..."
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    className="min-h-[300px]"
                  />
                  {warning && (
                    <div className="mt-4">
                      <p className="text-sm text-red-500 font-medium">
                        {warning}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={convertMarkdownToHtml}>
                      Convert to HTML
                      {isLoading && <Loader className="animate-spin" />}
                    </Button>
                  </div>
                </div>
                <div>
                  {isLoading ? (
                    <Textarea
                      placeholder="HTML output will appear here..."
                      value=""
                      readOnly
                      className="min-h-[300px]"
                    />
                  ) : (
                    <Textarea
                      placeholder="HTML output will appear here..."
                      value={htmlOutput}
                      readOnly
                      className="min-h-[300px]"
                    />
                  )}
                  {!isLoading && htmlOutput && (
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(htmlOutput, "HTML")}
                      className="mt-4"
                    >
                      <Copy className="mr-2 h-4 w-4" />{" "}
                      {copy ? "Copied" : "Copy HTML"}
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
