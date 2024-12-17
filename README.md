# Universal Document Converter

## Overview

A comprehensive document conversion application built with Next.js, Shadcn UI, and Tailwind CSS. This application allows you to convert between various document formats easily. This application started off as a simple HTML converter to markdown and vice versa. Then, progressed to other document conversion because why not!

## Features

- HTML ↔ Markdown Conversion
- Word Document ↔ Markdown Conversion
- Advanced Conversions:
  - CSV to Markdown
  - JSON to Markdown
  - XML to JSON
  - Plain Text to HTML (no necessary use case for this but had to do it)

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Vic-Orlands/Universal-Document-Converter.git
cd Universal-Document-Converter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Shadcn UI
- Lucide-React (Icons)
- Turndown (HTML to Markdown)
- Showdown (Markdown to HTML)
- PapaParse (CSV parsing)
- Mammoth (Docx to HTML)
- Marked (Markdown compiler for parsing markdown without caching/blocking)

## Project Structure

- `app/`: Next.js app routing
- `components/`: Reusable React components
- `hooks/`: Custom reusable hooks
- `libs/`: Reusable logic

## Conversion Types

### HTML ↔ Markdown

- Seamlessly convert between HTML and Markdown formats

### Word Document Conversion

- Convert Word documents to Markdown and vice versa

### Advanced Converter

- CSV to Markdown Table
- JSON to Markdown
- XML to JSON
- Plain Text to HTML

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/Feature`)
3. Commit your changes (`git commit -m 'Add some Feature'`)
4. Push to the branch (`git push origin feature/Feature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

## Contact

Chimezie Innocent - chimezieinnocent39@gmail.com

Project Link: [https://github.com/Vic-Orlands/Universal-Document-Converter]
