import pypdf

reader = pypdf.PdfReader("base-brand-assets/Base Brand Guidelines.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

print(text)
