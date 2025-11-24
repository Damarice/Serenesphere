# cPanel Deployment Instructions for Serenesephere

## Issue: 404 Errors on All Pages Except Homepage

### Quick Fix Steps:

1. **Check File Upload Location**
   - Make sure all files are uploaded to `public_html` folder (or your domain's root folder)
   - The structure should be:
     ```
     public_html/
     ├── index.html
     ├── .htaccess
     ├── pages/
     │   ├── about.html
     │   ├── contact.html
     │   ├── chapters.html
     │   └── ... (all other pages)
     ├── css/
     ├── js/
     └── assets/
     ```

2. **Upload the .htaccess File**
   - Make sure the `.htaccess` file is uploaded to the root directory (public_html)
   - In cPanel File Manager, enable "Show Hidden Files" to see .htaccess

3. **Check File Permissions**
   - All HTML files should have permission: 644
   - All folders should have permission: 755
   - To fix in cPanel:
     - Select all files → Right-click → Change Permissions
     - Files: 644 (rw-r--r--)
     - Folders: 755 (rwxr-xr-x)

4. **Test the Setup**
   - Visit: `yourdomain.com/test.html`
   - This will help diagnose the issue
   - Try both relative and absolute links

5. **Common Issues & Solutions**

   **Issue: Pages show 404**
   - Solution: Check if files are in correct folder
   - Solution: Verify .htaccess is uploaded
   - Solution: Check file names are exactly correct (case-sensitive on Linux servers)

   **Issue: CSS/JS not loading**
   - Solution: Check paths in HTML files
   - Solution: Verify css/ and js/ folders are uploaded

   **Issue: Images not showing**
   - Solution: Check assets/ folder is uploaded
   - Solution: Verify image paths in HTML

6. **Alternative: Use Absolute Paths**
   If .htaccess doesn't work, you can update all navigation links to use absolute paths:
   - Change `pages/about.html` to `/pages/about.html`
   - Change `../pages/about.html` to `/pages/about.html`

7. **WordPress Integration**
   - Your WordPress is in `/wp` folder
   - Make sure WordPress .htaccess doesn't conflict with main .htaccess

### Testing Checklist:
- [ ] Homepage loads: `yourdomain.com`
- [ ] Test page loads: `yourdomain.com/test.html`
- [ ] About page loads: `yourdomain.com/pages/about.html`
- [ ] Contact page loads: `yourdomain.com/pages/contact.html`
- [ ] CSS loads correctly
- [ ] Images display correctly
- [ ] Navigation links work

### Need More Help?
1. Check cPanel Error Logs (in cPanel → Errors)
2. Verify PHP version is 7.4 or higher
3. Contact your hosting provider if issues persist

### File Structure Verification:
Run this in cPanel Terminal or SSH:
```bash
cd public_html
ls -la
ls -la pages/
```

This should show all your files and folders.
