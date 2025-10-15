# AlFaris Business Website
AlFaris Business (الفارس للأعمال) is a static HTML website for an Arabic business services company. The website provides information about legal services, government transactions, business packages, and other professional services in Arabic language with RTL layout.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Copilot Best Practices for This Repository
- **Task Scope**: Focus on well-defined, specific tasks like content updates, HTML structure fixes, or styling adjustments
- **Iterative Approach**: Make small, incremental changes and test frequently using the validation process below
- **Arabic Content**: Always preserve RTL (right-to-left) text direction and Arabic language attributes
- **Static Site Focus**: Remember this is a static HTML site - avoid suggesting complex build processes or frameworks
- **Validation First**: Always run HTML validation and local testing before committing changes

## Working Effectively

- **CRITICAL**: This is a static HTML website - NO BUILD PROCESS REQUIRED
- Local development server setup:
  - `cd /home/runner/work/alfarissa-website/alfarissa-website`
  - `python3 -m http.server 8080` - starts in <1 second, NEVER CANCEL
  - Access at: `http://localhost:8080`
  - Alternative: `npx serve -p 8080` (requires npm install, takes ~5 seconds with package download)
- HTML validation (optional):
  - `npx htmlhint *.html` - validates all pages, takes ~2.5 seconds, NEVER CANCEL
  - Expect 1 error: Google verification file (google0cd875a98eac9549.html) lacks DOCTYPE - this is normal for Google verification files
- **NEVER CANCEL**: All operations complete in under 5 seconds. No long-running builds exist.

## Deployment Process
- Deployment to GitHub Pages is fully automated via GitHub Actions
- **NO MANUAL BUILD STEPS REQUIRED** - files deploy directly as-is
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Deployment triggers on push to `main` branch
- Deployment time: ~2-3 minutes via GitHub Actions, NEVER CANCEL
- Validation commands used in CI:
  - `echo "🚀 Preparing deployment at $(date -u)"`
  - `ls -la *.html` - lists all HTML files for deployment

## Validation Scenarios
After making any changes to HTML files, ALWAYS:
1. **Start local server**: `python3 -m http.server 8080`
2. **Test main page**: `curl -I http://localhost:8080/index.html` - should return HTTP 200
3. **Test navigation**: Verify all page links work by testing key pages:
   - `curl -s http://localhost:8080/our-services-page.html | grep -o '<title>[^<]*</title>'`
   - `curl -s http://localhost:8080/legal-services-page.html | grep -o '<title>[^<]*</title>'`
   - `curl -s http://localhost:8080/faq-page.html | grep -o '<title>[^<]*</title>'`
4. **Validate HTML**: `npx htmlhint *.html` - should complete in ~2.5 seconds
5. **Test complete user flow**: Manually verify page loads and navigation between at least 3 different pages
6. **Browser testing**: Use browser tools to test actual functionality and Arabic text rendering
7. **Clean up**: `killall python3` to stop local server

## Technology Stack & Dependencies
- **Frontend**: Static HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS (via CDN: `https://cdn.tailwindcss.com`)
- **Fonts**: Google Fonts - Noto Kufi Arabic
- **Icons**: Font Awesome 6.0+ (via CDN)
- **Language**: Arabic (RTL layout)
- **External Dependencies**: All via CDN - NO local installation required
- **Node.js**: Available at `/usr/local/bin/node` (v20.19.5, npm 10.8.2) for tooling
- **Python**: Available at `/usr/bin/python3` (v3.12.3) for local development server

## Repository Structure
```
/home/runner/work/alfarissa-website/alfarissa-website/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Pages deployment
├── index.html                         # Main homepage (26KB)
├── our-services-page.html            # Services overview
├── legal-services-page.html          # Legal services details  
├── government-transactions-page.html # Government services (largest file: 52KB)
├── packages-page.html                # Service packages
├── faq-page.html                     # FAQ page
├── vision-page.html                  # Company vision
├── licenses-page.html                # Licensing services
├── zakat-tax-page.html              # Zakat and tax services
├── privacy-policy-page.html         # Privacy policy
└── google0cd875a98eac9549.html      # Google site verification
```

## Common Tasks & Timing Expectations
- **Local server startup**: <1 second, NEVER CANCEL
- **Page load testing**: <10ms per page
- **HTML validation**: ~2.5 seconds for all files, NEVER CANCEL  
- **File listing**: Instant with `ls -la *.html`
- **Navigation testing**: <1 second per page test
- **Complete validation cycle**: ~3 seconds total (tested and validated)
- **NPX serve alternative**: ~5 seconds with npm package download

## Browser Testing & Manual Validation
After making changes, ALWAYS validate using browser testing:
1. **Start local server**: `python3 -m http.server 8080`
2. **Test main navigation flow**: 
   - Visit `http://localhost:8080/index.html`
   - Click navigation links to test all major pages
   - Verify Arabic text renders correctly and RTL layout works
   - Test FAQ page (`faq-page.html`) functionality
   - Test Legal Services page (`legal-services-page.html`) interactive elements
3. **Test responsive design**: Resize browser to mobile viewport
4. **Verify external resources**: Check that CDN resources load (may fail in sandboxed environments)
5. **Test forms and contact elements**: Ensure WhatsApp and contact links work

## Working with Arabic Content
- **Direction**: All content is RTL (right-to-left)
- **Character Encoding**: UTF-8 throughout
- **Font**: Noto Kufi Arabic from Google Fonts
- **Color Scheme**: 
  - Background: `#FBF7F1` (warm beige)
  - Primary text: `#1B2A41` (dark blue)
  - Headings/CTA: `#D4C29A` (light gold)
  - Secondary text: `#6E6E6E` (medium gray)

## Key Project Areas
1. **Main Navigation**: Present in all HTML files, links between pages
2. **Service Pages**: Core business offerings (legal, government, packages)
3. **Company Pages**: About, vision, FAQ, privacy policy
4. **Styling**: Inline CSS with CSS custom properties for consistent theming
5. **Interactive Elements**: Contact forms, service inquiry buttons

## Validation Requirements
- Always test Arabic text rendering properly
- Verify RTL layout maintains correct alignment
- Ensure all inter-page links function correctly (note: some navigation links may point to different file names than expected)
- Validate external CDN resources load properly (may show errors in sandboxed environments)
- Test responsive design on mobile viewports
- Confirm page titles are in Arabic and descriptive
- **Browser testing required**: Use browser tools to validate actual user experience
- **Form functionality**: Test contact forms and WhatsApp integration

## DO NOT
- Add build processes or package.json - this is intentionally a simple static site
- Install local dependencies - all styling/scripts are via CDN
- Modify the GitHub Actions workflow unless specifically required
- Cancel any validation commands - they complete in under 5 seconds
- Remove Arabic language attributes or RTL directives
- Change the color scheme without testing across all pages
- Modify HTML structure without validating with `npx htmlhint *.html`

## KNOWN ISSUES & NOTES
- HTML validation shows 1 expected error for Google verification file (google0cd875a98eac9549.html) - this is normal
- CDN resources may fail to load in sandboxed environments - this doesn't affect functionality
- Navigation links use `-page.html` suffix (e.g., `faq-page.html`, not `faq.html`)
- Deployment workflow configured for `main` branch - pushes to main trigger automatic deployment

<tool_calling>
You have the capability to call multiple tools in a single response. For maximum efficiency, whenever you need to perform multiple independent operations, ALWAYS call tools simultaneously whenever the actions can be done in parallel rather than sequentially.
Especially when exploring repository, searching, reading files, viewing directories, validating changes, reporting progress or replying to comments. For Example you can read 3 different files parallelly, or report progress and edit different files in parallel. Always report progress in parallel with other tool calls that follow it as it does not depend on the result of those calls.
However, if some tool calls depend on previous calls to inform dependent values like the parameters, do NOT call these tools in parallel and instead call them sequentially.
</tool_calling>