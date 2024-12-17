import React from "react";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Code, FileCode2, FileCode } from "lucide-react";

export default function Home() {
  const converterOptions = [
    {
      title: "HTML ↔ Markdown",
      description: "Convert your HTML files to Markdown and vice versa",
      icon: <FileCode2 className="h-12 w-12 mb-4 text-primary" />,
      link: "/html-markdown",
    },
    {
      title: "Word Document Converter",
      description: "Convert Word documents to Markdown and vice versa",
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      link: "/word-conversion",
    },
    {
      title: "Advanced Converter",
      description: "Advanced conversions including CSV, JSON, XML, and more",
      icon: <Code className="h-12 w-12 mb-4 text-primary" />,
      link: "/advanced",
    },
  ];

  return (
    <main className="container mx-auto sm:px-6 md:px-4 xl:px-12 2xl:px-72 xl:pt-16 sm:pt-8">
      <div className="text-center mb-12">
        <h1 className="xl:text-4xl sm:text-3xl font-bold xl:mb-6 sm:mb-0 flex items-center justify-center">
          <FileCode className="mr-4 h-12 w-12" />
          Universal Document Converter
        </h1>
        <p className="xl:text-xl sm:text-sm text-muted-foreground">
          Convert between multiple document formats with ease
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {converterOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="items-center">
              {option.icon}
              <CardTitle className="mt-4 text-center">{option.title}</CardTitle>
              <CardDescription className="text-center">
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href={option.link}>
                <Button>Go to Converter</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Supported Conversions</h2>
        <div className="flex justify-center flex-wrap gap-4 text-muted-foreground">
          <span>HTML ↔ Markdown</span>
          <span>•</span>
          <span>Word Docs ↔ Markdown</span>
          <span>•</span>
          <span>CSV to Markdown</span>
          <span>•</span>
          <span>JSON Conversion</span>
          <span>•</span>
          <span>XML to JSON</span>
        </div>
      </div>
    </main>
  );
}
