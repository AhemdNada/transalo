# Transalo Landing Page

A modern, responsive landing page for Transalo - an AI-powered translation API platform. Built with HTML, CSS, JavaScript, and Tailwind CSS.

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Elements** - FAQ accordion, pricing toggle, mobile menu
- **AOS Animations** - Scroll-triggered animations for better UX
- **CSS Variables** - Easy color customization
- **Accessibility** - Keyboard navigation and screen reader support
- **Performance Optimized** - Fast loading with lazy loading support

## 📁 File Structure

```
transalo/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS with variables
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🛠️ Setup Instructions

1. **Clone or Download** the files to your local machine
2. **Open `index.html`** in your web browser
3. **That's it!** The page is ready to use

### For Development

If you want to make changes:

1. **Install a local server** (optional but recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**: `http://localhost:8000`

## 🎨 Customization

### Colors

All colors are defined as CSS variables in `styles.css`. To change the color scheme:

```css
:root {
    --primary-color: #3b82f6;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary brand color */
    --accent-color: #06b6d4;     /* Accent color */
    /* ... other colors */
}
```

### Content

#### Logo and Brand
- Update the logo text in the navbar: `<h1 class="text-2xl font-bold text-primary">Transalo</h1>`
- Change the hero title and description in the header section

#### Features
- Modify the features section by editing the feature cards in `index.html`
- Each feature has an icon, title, and description

#### Pricing
- Update pricing plans in the pricing section
- Modify the monthly/yearly toggle functionality in `script.js`

#### FAQ
- Add or remove FAQ items in the FAQ section
- Each FAQ item has a question and answer

### Images and Illustrations

The current design uses CSS-based illustrations. To add custom images:

1. **Add image files** to your project
2. **Replace CSS illustrations** with `<img>` tags
3. **Update paths** in the HTML

### Animations

- **AOS (Animate On Scroll)** is included for scroll animations
- **Custom animations** are defined in `styles.css`
- **JavaScript animations** are in `script.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 JavaScript Features

### Interactive Elements

1. **Mobile Menu Toggle**
   - Hamburger menu for mobile devices
   - Smooth open/close animations

2. **FAQ Accordion**
   - Click to expand/collapse
   - Only one item open at a time

3. **Pricing Toggle**
   - Switch between monthly/yearly pricing
   - Automatic price updates

4. **Smooth Scrolling**
   - Navigation links scroll smoothly to sections
   - Accounts for fixed navbar

5. **Copy Code Function**
   - Copy API integration code to clipboard
   - Visual feedback notification

### Event Tracking

The page includes basic analytics tracking for:
- Button clicks
- Navigation clicks
- Form submissions

## 🎯 SEO Optimization

- **Semantic HTML** structure
- **Meta tags** for social sharing
- **Structured data** ready for implementation
- **Fast loading** optimized assets

## 🔒 Security Considerations

- **No external dependencies** except CDN resources
- **CSP headers** ready for implementation
- **HTTPS ready** for production

## 🚀 Deployment

### Static Hosting

The page can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to S3 bucket

### Custom Domain

1. **Update meta tags** in `index.html`
2. **Configure DNS** with your hosting provider
3. **Add SSL certificate** for HTTPS

## 📊 Performance

### Optimizations Included

- **Minified CSS** (use a minifier for production)
- **Lazy loading** for images
- **Optimized animations** with `will-change`
- **Reduced motion** support for accessibility

### Performance Tips

1. **Compress images** before adding
2. **Minify CSS/JS** for production
3. **Use a CDN** for external resources
4. **Enable gzip** compression on server

## 🐛 Troubleshooting

### Common Issues

1. **Animations not working**
   - Check if AOS library is loading
   - Verify JavaScript console for errors

2. **Mobile menu not working**
   - Ensure `script.js` is properly loaded
   - Check for JavaScript errors

3. **Styles not applying**
   - Verify Tailwind CSS CDN is accessible
   - Check if `styles.css` is loading

### Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support:
- **Email**: support@transalo.com
- **Documentation**: docs.transalo.com
- **GitHub Issues**: Create an issue in this repository

---

**Built with ❤️ for Transalo** 