YG-Tech Site-Wide Promo Fix — September 10, 2026

THIS ZIP IS A PATCH WITH FILES AT THE ZIP ROOT.

Copy/extract these files directly into your existing project root:
  D:\Myprojects\MyWebApp\my-apps-website

Allow Windows to REPLACE the existing files when prompted.

Files replaced:
  index.html
  navbar-fix.js
  styles.css
  js\side-promos.js

What this fixes:
1. Removes the old CSS rule that hid all promo cards at 1450px and below.
2. Adds adaptive promo sizes for 1280–1499px and 1500–1699px desktop widths.
3. Keeps full-size cards at 1700px+.
4. Hides cards only below 1280px to prevent them covering site content.
5. Loads side-promos.js before checking for the navbar placeholder.
6. Adds a duplicate-initialization guard to side-promos.js.
7. The ZIP itself has no wrapper folder, so extraction directly into the project
   actually replaces the live files instead of creating a nested patch folder.

After copying:
  python -m http.server 5500

Then open:
  http://localhost:5500/

Use Ctrl+F5 once after replacing the files.
