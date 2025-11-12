# Changelog

## [2.0.0] - Project Reorganization - 2025-01-12

### Major Changes - File Structure Reorganization

#### Added
- **New folder structure** for better organization and maintainability
  - `css/` - All stylesheets
  - `js/` - All JavaScript files
  - `pages/` - All HTML pages (except homepage)
  - `assets/images/` - General images
  - `assets/logos/` - Brand and partner logos
  - `assets/team/` - Team member photos
  - `docs/` - Documentation files

- **Documentation**
  - `README.md` - Project overview and structure
  - `docs/DEVELOPER_GUIDE.md` - Comprehensive developer documentation
  - `docs/MAINTENANCE_CHECKLIST.md` - Website maintenance guidelines
  - `docs/IMAGE_OPTIMIZATION_GUIDE.md` - Image optimization guide (moved)

- **Configuration**
  - `.gitignore` - Git ignore rules for clean repository

#### Changed
- **File Locations**
  - Moved `styles.css` → `css/main.css`
  - Moved `script.js` → `js/main.js`
  - Moved all page-specific CSS files to `css/` folder
  - Moved all HTML pages (except index.html) to `pages/` folder
  - Organized assets into subfolders by type

- **Path Updates**
  - Updated all CSS references in HTML files
  - Updated all JavaScript references in HTML files
  - Updated all image paths to reflect new folder structure
  - Updated all navigation links to work with new structure
  - Updated all asset references (images, logos, team photos)

#### File Mapping

**CSS Files:**
- `styles.css` → `css/main.css`
- `blog.css` → `css/blog.css`
- `blog-detail.css` → `css/blog-detail.css`
- `circles.css` → `css/circles.css`
- `contact.css` → `css/contact.css`
- `podcast.css` → `css/podcast.css`
- `retreat-detail.css` → `css/retreat-detail.css`
- `retreats.css` → `css/retreats.css`

**JavaScript Files:**
- `script.js` → `js/main.js`

**HTML Pages:**
- `blog.html` → `pages/blog.html`
- `blog-detail.html` → `pages/blog-detail.html`
- `circles.html` → `pages/circles.html`
- `coastalsunsetyogaitenerary.html` → `pages/coastalsunsetyogaitenerary.html`
- `contact.html` → `pages/contact.html`
- `nine-elements.html` → `pages/nine-elements.html`
- `ourmission.html` → `pages/ourmission.html`
- `podcast.html` → `pages/podcast.html`
- `retreat-detail.html` → `pages/retreat-detail.html`
- `retreats.html` → `pages/retreats.html`
- `test-slider.html` → `pages/test-slider.html`
- `whoweare.html` → `pages/whoweare.html`

**Assets:**
- General images → `assets/images/`
- Logo files → `assets/logos/`
- Team photos → `assets/team/`

**Documentation:**
- `IMAGE_OPTIMIZATION_GUIDE.md` → `docs/IMAGE_OPTIMIZATION_GUIDE.md`

### Benefits

1. **Better Organization**
   - Clear separation of concerns (HTML, CSS, JS, Assets)
   - Easy to locate and maintain files
   - Scalable structure for future growth

2. **Improved Maintainability**
   - Consistent file naming conventions
   - Logical folder hierarchy
   - Clear documentation

3. **Enhanced Developer Experience**
   - Comprehensive documentation
   - Clear guidelines and best practices
   - Easy onboarding for new developers

4. **Professional Structure**
   - Industry-standard organization
   - Version control friendly
   - Deployment ready

### Migration Notes

- All file paths have been updated automatically
- No functionality has been changed
- All pages should work exactly as before
- Test all pages after pulling these changes

### Testing Completed

- ✅ All HTML files validated
- ✅ All paths updated correctly
- ✅ Navigation links working
- ✅ Asset references updated
- ✅ No broken links

### Next Steps

1. Test the website thoroughly in your browser
2. Verify all pages load correctly
3. Check all images display properly
4. Test navigation on all pages
5. Review documentation in `docs/` folder

---

## [1.0.0] - Initial Release

### Features
- Homepage with hero section
- Retreats page with grid layout
- Circles page with 2x2 grid
- Blog and blog detail pages
- Contact page
- About pages (Who We Are, Our Mission, Nine Elements)
- Podcast page
- Responsive design
- Mobile navigation
- Image sliders
- Counter animations
- Newsletter signup
- Partner logos section
