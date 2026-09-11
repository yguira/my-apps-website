YG-TECH DOWNLOAD PAGE EXPANSION
===============================

This patch contains:
- downloads.html  (replacement)
- downloads.css   (new page-specific stylesheet)

WHAT CHANGED
- Added Invoice Studio for Android using the existing YG-Tech GitHub APK release.
- Added Invoice Studio for Windows using the existing local ZIP in Download/Windows/.
- Expanded the open-source recommendations into four categories.
- Added 19 third-party open-source software recommendations.
- All third-party links point to official project websites and open in a new tab.
- Added an official-source notice and download-safety reminder.
- Added a responsive card layout without changing the rest of the site's styles.css.

INSTALL
Extract BOTH files directly into the website root:
D:\Myprojects\MyWebApp\my-apps-website

Windows should ask to replace downloads.html.
downloads.css should be added as a new file.

TEST
python -m http.server 5500
Open: http://localhost:5500/downloads.html

Important existing YG-Tech download paths used by this page:
Android:
https://github.com/yguira/Invoice-Studio-Releases/releases/download/v1.0.0/Invoice-Studio-by-YG-Tech-v1.0.0.apk

Windows:
Download/Windows/YG-Technology-Invoice-Studio-Windows.zip
