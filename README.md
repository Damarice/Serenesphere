# Serenesephere Website

A wellness community website connecting people with nature-led healing, indigenous wisdom, and cultural regeneration.

## Project Structure

```
serenesephere/
├── index.html                 # Homepage
├── css/                       # Stylesheets
│   ├── main.css              # Main stylesheet (global styles)
│   ├── blog.css              # Blog page styles
│   ├── blog-detail.css       # Blog detail page styles
│   ├── circles.css           # Circles page styles
│   ├── contact.css           # Contact page styles
│   ├── podcast.css           # Podcast page styles
│   ├── retreat-detail.css    # Retreat detail page styles
│   └── retreats.css          # Retreats page styles
├── js/                        # JavaScript files
│   └── main.js               # Main JavaScript file
├── pages/                     # HTML pages
│   ├── blog.html
│   ├── blog-detail.html
│   ├── circles.html
│   ├── coastalsunsetyogaitenerary.html
│   ├── contact.html
│   ├── nine-elements.html
│   ├── ourmission.html
│   ├── podcast.html
│   ├── retreat-detail.html
│   ├── retreats.html
│   ├── test-slider.html
│   └── whoweare.html
├── assets/                    # Static assets
│   ├── images/               # General images
│   ├── logos/                # Logo files
│   └── team/                 # Team member photos
└── docs/                      # Documentation
    └── IMAGE_OPTIMIZATION_GUIDE.md

```

## Getting Started

1. Open `index.html` in your browser to view the homepage
2. Navigate through the site using the navigation menu
3. All pages are linked relatively, so the site works locally

## File Organization

### CSS Files
- **main.css**: Contains global styles, navigation, footer, and common components
- **Page-specific CSS**: Each page has its own CSS file for unique styling

### JavaScript
- **main.js**: Contains all interactive functionality including:
  - Mobile menu toggle
  - Swiper sliders
  - Counter animations
  - Form handling

### Assets
- **images/**: All general images (slides, backgrounds, content images)
- **logos/**: Partner and brand logos
- **team/**: Team member photographs

## Development Guidelines

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Create corresponding CSS file in `css/` directory
3. Link CSS: `<link rel="stylesheet" href="../css/your-page.css">`
4. Link to main CSS: `<link rel="stylesheet" href="../css/main.css">`
5. Update navigation links in all pages

### Adding New Images
1. Place images in appropriate `assets/` subdirectory:
   - General images → `assets/images/`
   - Logos → `assets/logos/`
   - Team photos → `assets/team/`
2. Reference with relative paths from page location

### Path References
- From `index.html`: `assets/images/image.jpg`, `css/main.css`, `js/main.js`
- From `pages/*.html`: `../assets/images/image.jpg`, `../css/main.css`, `../js/main.js`

## External Dependencies

- **Fonts**: Google Fonts (Montserrat, Open Sans, Playfair Display)
- **Icons**: Font Awesome 6.4.0
- **Slider**: Swiper.js 10

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

For questions or support, contact: info@serenesephere.com
