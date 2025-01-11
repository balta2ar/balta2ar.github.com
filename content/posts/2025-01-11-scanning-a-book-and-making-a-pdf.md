---
title: "Scanning a book and making a PDF"
date: 2025-01-11T10:16:58+01:00
draft: false
tags: ["books", "scanning", "pdf", "scantailor"]
---

Here's a short reminder-like guide on how I prepare PDFs from scanned books.

### Scan with a consistent DPI, layout and paper format (A3)

When you scan, try to scan all the pages in the same layout, angle and DPI. I prefer to set 600 DPI in my scanner settings and use A3 so that there's enough room for pages and I can always cut off the margins later.

I scan in batches of several pages at once just in case the scanner runs out of memory or something, so when I'm done scanning, I get several files as output:
```
'blue 000-_250110_085345.pdf'
'blue 038-_250110_090004.pdf'
'blue 078-_250110_090653.pdf'
'blue 118-_250110_091326.pdf'
'blue 178-_250110_091945.pdf'
```

### Folder per step
I normally create a folder for each step of the process, e.g.
```
0input
1rotate
2double
etc
```

### Rotate pages 90 degrees clockwise
```
for f in *.pdf; do qpdf --rotate=+90 $f 1rotate/$f; done
```

### Strip margins
```
briss double.pdf
```

### Convert PDF to PNG images, one image per page
```
# page is a prefix here
pdftoppm -png double_cropped.pdf page
```

### Use ScanTailor to process PNG files, you'll get TIF files

If my input was scanned with 600 DPI, I find it good enough to use 300 DPI in ScanTailor as output.

If you have front and back pages, set Color/Mix in one of the last steps in ScanTailor.

### Text pages: convert TIF to PDF (easy version, uses jpeg)
If you're happy with using JPEG compression, you can just convert all pages from TIF to PDF and be done with it.
```
parallel --bar gm convert "{}" "{.}.pdf" ::: ../*.tif
```

### Text pages: convert TIF to PDF (JBIG2 version)
But if you have many pages that contain only text, you can save some space and make the output PDF smaller by using JBIG2 compression.
```
jbig2 -s -a -p -v *.tif && time jbig2topdf.py output > out.pdf
```
[jbig2topdf.py](https://github.com/agl/jbig2enc/blob/master/jbig2topdf.py)

### Front and back pages: convert TIF to PDF

Front and back pages usually don't have text, but have images and colors, so use JPEG. Make sure to have consistent DPI / density for all your pages (front and text). It's enough to lower JPEG quality to 50..70%, try various settings:
```
parallel --bar gm convert -density 300 "{}" -compress jpeg -quality 70 "{.}.pdf" ::: *.tif
```
This command assumes you put front/back pages and text pages in separate folders.

### Merge all pages
```
pdftk head1.pdf head2.pdf tail/*.pdf cat output final.pdf
```

### Crop margins again

Depending on your settings in ScanTailor, you might want to crop the margins again.
```
briss final.pdf
```

### OCR
```
ocrmypdf -l nor --jobs 12 --output-type pdfa final.pdf final.ocr.pdf
```

### Table of contents

Table of contents should be a text file in the following format:
```
"Intro" 11
"Chapter 1" 15
  "Chapter 1.1" 17
"Chapter 2" 57
  "Chapter 2.1" 67
```
And then merge it into the PDF:
```
pdftocio final.pdf < toc.txt
```

### Clickable table of contents

Would have been great to have a clickable table of contents, but I haven't learned how to do that yet.

### Get info about the PDF
A couple of useful commands not really related to the process, but useful to know:
```
# list pages, DPI, sizes, compression ratio
pdfimages -list file.pdf

# get general info
pdfinfo file.pdf
```

### Useful links and references

* [Fixing up scanned PDFs with Scan Tailor](https://fransdejonge.com/2014/10/fixing-up-scanned-pdfs-with-scan-tailor/)
* [Scan to PDF/A](http://www.konradvoelkel.com/2013/03/scan-to-pdfa/#comment-2736)
* [PDF Guide](https://www.desiquintans.com/pdfguide)
* [Briss 2.0](https://github.com/mbaeuerle/Briss-2.0)
* [jbig2enc](https://github.com/agl/jbig2enc)
* [ScanTailor Universal](https://github.com/trufanov-nok/scantailor-universal)
* [ScanTailor Advanced](https://github.com/4lex4/scantailor-advanced)
* [ScanTailor Advanced (Official)](https://github.com/ScanTailor-Advanced/scantailor-advanced)
