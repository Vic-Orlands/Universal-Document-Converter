"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { FileCode, RefreshCw, Copy, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import showdown from "showdown";
import Papa from "papaparse";

type CsvRow = Record<string, string>;

export default function AdvancedConverter() {
  const { toast } = useToast();
  const [copy, setCopy] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversionType, setConversionType] = useState<string>("");

  const conversionOptions = [
    {
      value: "csv-to-markdown",
      label: "CSV to Markdown Table",
      convert: convertCsvToMarkdown,
    },
    {
      value: "json-to-markdown",
      label: "JSON to Markdown",
      convert: convertJsonToMarkdown,
    },
    {
      value: "xml-to-json",
      label: "XML to JSON",
      convert: convertXmlToJson,
    },
    {
      value: "plain-text-to-html",
      label: "Plain Text to HTML",
      convert: convertPlainTextToHtml,
    },
  ];

  function convertCsvToMarkdown(csvText: string) {
    try {
      const results = Papa.parse<CsvRow>(csvText, { header: true });

      if (!results.data.length) {
        throw new Error("No data found in CSV");
      }

      // Extract headers
      const headers = Object.keys(results.data[0]);

      // Create Markdown table headers
      let markdown = `| ${headers.join(" | ")} |\n`;
      markdown += `| ${headers.map(() => "---").join(" | ")} |\n`;

      // Add rows
      results.data.forEach((row) => {
        markdown += `| ${headers
          .map((header) => row[header] || "")
          .join(" | ")} |\n`;
      });

      return markdown;
    } catch (error: unknown) {
      console.log(error);

      toast({
        title: "Conversion Failed",
        description: "Failed to convert CSV to Markdown",
        variant: "destructive",
      });
    }
  }

  function convertJsonToMarkdown(jsonText: string) {
    try {
      const jsonData = JSON.parse(jsonText);

      // Handle different JSON types
      if (Array.isArray(jsonData)) {
        // Array of objects
        return jsonData
          .map(
            (obj) =>
              `## Item\n\n` +
              Object.entries(obj)
                .map(([key, value]) => `- **${key}**: ${JSON.stringify(value)}`)
                .join("\n")
          )
          .join("\n\n");
      } else if (typeof jsonData === "object") {
        // Single object
        return Object.entries(jsonData)
          .map(([key, value]) => `- **${key}**: ${JSON.stringify(value)}`)
          .join("\n");
      }

      return JSON.stringify(jsonData, null, 2);
    } catch (error: unknown) {
      console.log(error);

      toast({
        title: "Conversion Failed",
        description: "Failed to convert JSON to Markdown",
        variant: "destructive",
      });
    }
  }

  function convertXmlToJson(xmlText: string) {
    try {
      // Basic XML to JSON conversion
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      function xmlToJson(xml: Element) {
        // Create the return object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {};

        if (xml.nodeType === 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
              const attribute = xml.attributes.item(j);
              if (attribute) {
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
            }
          }
        }

        console.log(typeof obj, obj);

        // do children
        if (xml.hasChildNodes()) {
          for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;

            if (typeof obj[nodeName] === "undefined") {
              obj[nodeName] = xmlToJson(item as Element);
            } else {
              if (typeof obj[nodeName].push === "undefined") {
                const old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item as Element));
            }
          }
        }
        return obj;
      }

      return JSON.stringify(xmlToJson(xmlDoc.documentElement), null, 2);
    } catch (error: unknown) {
      console.log(error);

      toast({
        title: "Conversion Failed",
        description: "Failed to convert XML to JSON",
        variant: "destructive",
      });
    }
  }

  function convertPlainTextToHtml(plainText: string): string {
    const converter = new showdown.Converter();
    return converter.makeHtml(plainText);
  }

  const handleConvert = () => {
    if (!conversionType) {
      toast({
        title: "Select Conversion Type",
        description: "Please choose a conversion type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const conversionFunction = conversionOptions.find(
        (option) => option.value === conversionType
      )?.convert;

      if (conversionFunction) {
        const result = conversionFunction(inputText);
        if (result) {
          setOutputText(result);
        }

        setTimeout(() => {
          setIsLoading(false);

          toast({
            title: "Conversion Successful",
            description: "Content converted successfully",
          });
        }, 1200);
      }
    } catch (error) {
      toast({
        title: "Conversion Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    setCopy(true);
    navigator.clipboard.writeText(outputText);

    toast({
      title: "Copied to Clipboard",
      description: "Output content copied",
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
            <FileCode className="mr-2" /> Advanced Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Select onValueChange={setConversionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Conversion Type" />
                </SelectTrigger>
                <SelectContent>
                  {conversionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Paste your input content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] w-full"
            />

            <div className="flex space-x-2">
              <Button
                onClick={handleConvert}
                disabled={!conversionType || !inputText}
                className="flex-1 flex items-center"
              >
                {isLoading ? "Converting" : "Convert"}
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
              </Button>
            </div>

            {!isLoading && outputText && (
              <div className="mt-4">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] w-full"
                  placeholder="Converted output will appear here"
                />
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="mt-2 w-full flex items-center"
                >
                  <Copy className="mr-2 h-4 w-4" />{" "}
                  {copy ? "Copied" : "Copy Output"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
