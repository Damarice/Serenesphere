# Developer Guide - Serenesephere Website

## Quick Start

1. **Clone the repository**
2. **Open `index.html`** in your browser to view the site
3. **Edit files** in their respective folders

## Project Architecture

### Folder Structure

```
serenesephere/
├── index.html              # Main entry point (homepage)
├── css/                    # All stylesheets
├── js/                     # All JavaScript files
├── pages/                  # All HTML pages (except homepage)
├── assets/                 # All media files
│   ├── images/            # General images
│   ├── logos/             # Brand and partner logos
│   └── team/              # Team member photos
└── docs/                   # Documentation files
```

## File Naming Conventions

### HTML Files
- Use lowercase with hyphens: `retreat-detail.html`
- Homepage stays in root: `index.html`
- All other pages go in `pages/` folder

### CSS Files
- Match the HTML filename: `retreat-detail.css` for `retreat-detail.html`
- Main stylesheet: `main.css` (contains global styles)
- Store all CSS in `css/` folder

### JavaScript Files
- Use descriptive names: `main.js`, `slider.js`
- Store all JS in `js/` folder

### Images
- Use descriptive names: `hero-section.jpg`, `team-member-name.png`
- Organize by type in `assets/` subfolders

## Path References

### From Root (index.html)
```html
<link rel="stylesheet" href="css/main.css">
<script src="js/main.js"></script>
<img src="assets/images/slide1.jpg">
<img src="assets/logos/logo.png">
<img src="assets/team/member.png">
<a href="pages/about.html">About</a>
```

### From Pages Folder (pages/*.html)
```html
<link rel="stylesheet" href="../css/main.css">
<script src="../js/main.js"></script>
<img src="../assets/images/slide1.jpg">
<img src="../assets/logos/logo.png">
<img src="../assets/team/member.png">
<a href="../index.html">Home</a>
<a href="about.html">About</a>
```

## Common Tasks

### Adding a New Page

1. **Create HTML file** in `pages/` folder:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Serenesephere</title>
    
    <!-- External Resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/your-page.css">
    
    <!-- Scripts -->
    <script src="../js/main.js" defer></script>
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

2. **Create CSS file** in `css/` folder: `your-page.css`

3. **Update navigation** in all pages to include the new page link

### Adding Images

1. **Place image** in appropriate folder:
   - General content → `assets/images/`
   - Logos → `assets/logos/`
   - Team photos → `assets/team/`

2. **Reference in HTML**:
   - From root: `assets/images/your-image.jpg`
   - From pages: `../assets/images/your-image.jpg`

### Updating Styles

1. **Global styles** → Edit `css/main.css`
2. **Page-specific styles** → Edit corresponding CSS file in `css/`
3. **New component styles** → Add to `css/main.css` or create new CSS file

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Indent with 4 spaces
- Use lowercase for tags and attributes
- Add alt text to all images
- Use meaningful class names

### CSS
- Use BEM naming convention where appropriate
- Group related properties together
- Comment complex sections
- Use CSS variables for colors and common values
- Mobile-first responsive design

### JavaScript
- Use modern ES6+ syntax
- Comment complex logic
- Use meaningful variable names
- Keep functions small and focused
- Handle errors gracefully

## Performance Best Practices

1. **Optimize images** before adding to `assets/`
   - Use WebP format when possible
   - Compress images (see `IMAGE_OPTIMIZATION_GUIDE.md`)
   - Use appropriate dimensions

2. **Minimize HTTP requests**
   - Combine CSS files when possible
   - Use CSS sprites for small icons
   - Lazy load images below the fold

3. **External resources**
   - Use CDN for libraries (Font Awesome, Swiper)
   - Preconnect to external domains
   - Load non-critical CSS asynchronously

## Testing Checklist

Before committing changes:

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (or use browser dev tools)
- [ ] Verify all links work correctly
- [ ] Check all images load properly
- [ ] Validate HTML (W3C Validator)
- [ ] Check console for JavaScript errors
- [ ] Test navigation menu (desktop and mobile)
- [ ] Verify forms work correctly
- [ ] Check page load speed

## Common Issues & Solutions

### Images not loading
- Check file path (relative paths from current file location)
- Verify image exists in correct folder
- Check file name spelling and case sensitivity

### CSS not applying
- Check CSS file is linked correctly
- Verify path to CSS file
- Check for CSS syntax errors
- Clear browser cache

### JavaScript not working
- Check browser console for errors
- Verify script is loaded with `defer` attribute
- Check for syntax errors
- Ensure DOM is loaded before running scripts

## Deployment

1. **Test locally** - Open `index.html` in browser
2. **Validate all paths** are relative (no absolute paths)
3. **Optimize assets** (compress images, minify CSS/JS)
4. **Upload to server** maintaining folder structure
5. **Test on live server** - Check all pages and functionality

## Support

For questions or issues:
- Email: info@serenesephere.com
- Check documentation in `docs/` folder
- Review code comments in files

## Version Control

- Use meaningful commit messages
- Test before committing
- Don't commit temporary or generated files
- Follow `.gitignore` rules
