# GitHub Pages Setup Guide 🚀

This is the **complete setup guide** for deploying your Yamaç Harita website to GitHub Pages with an easy-to-use content editor. This is the **only deployment method** for this project.

## What You Get

✅ **Free Hosting**: GitHub Pages provides free hosting for your website  
✅ **Easy Editing**: Simple web-based editor for non-technical users  
✅ **Version Control**: All changes are tracked in Git  
✅ **Automatic Updates**: Changes are deployed automatically  
✅ **Custom Domain**: Option to use your own domain name  

## Quick Setup (5 Minutes)

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click "New Repository"** (green button)
3. **Repository name**: `yamac-harita-website` (or any name you prefer)
4. **Description**: `Yamaç Harita Mühendislik Bürosu Website`
5. **Make it Public** (required for free GitHub Pages)
6. **Click "Create Repository"**

### Step 2: Upload Your Files

1. **Download all files** from this project
2. **Upload to GitHub**:
   - Click "uploading an existing file"
   - Drag and drop all files from this project
   - Add commit message: "Initial website upload"
   - Click "Commit changes"

### Step 3: Enable GitHub Pages

1. **Go to Repository Settings**:
   - Click "Settings" tab in your repository
   - Scroll down to "Pages" section
2. **Configure Pages**:
   - Source: "Deploy from a branch"
   - Branch: "main" (or "master")
   - Folder: "/ (root)"
   - Click "Save"
3. **Wait for Deployment**:
   - GitHub will build your site (takes 1-2 minutes)
   - Your site will be live at: `https://your-username.github.io/your-repo-name`

### Step 4: Access Your Website

- **Main Website**: `https://your-username.github.io/your-repo-name/editable-index.html`
- **Content Editor**: `https://your-username.github.io/your-repo-name/editor.html`
- **GitHub Pages Hub**: `https://your-username.github.io/your-repo-name/index-github.html`
- **Test Page**: `https://your-username.github.io/your-repo-name/test-github-pages.html`

### Step 5: Test Your Setup

1. **Run the Test Page**:
   - Visit: `https://your-username.github.io/your-repo-name/test-github-pages.html`
   - This will test all functionality automatically
   - Check that all tests pass (green status)

2. **Verify Everything Works**:
   - Main website loads correctly
   - Content editor is accessible
   - All content files are loading
   - Assets (CSS, JS, images) are working

## How to Edit Content

### Method 1: Web-Based Editor (Recommended)

1. **Go to the Editor**:
   - Visit: `https://your-username.github.io/your-repo-name/editor.html`
   - This opens a user-friendly interface

2. **Edit Content**:
   - Update any text, images, or information
   - Add new team members or projects
   - Modify contact information
   - Change hero slides

3. **Save Changes**:
   - Click "Save All Changes"
   - Click "Export Content" to download updated files
   - Upload the downloaded files back to GitHub

### Method 2: Direct GitHub Editing

1. **Go to Your Repository** on GitHub
2. **Navigate to Content Files**:
   - Go to `content/` folder
   - Click on any `.md` file to edit

3. **Edit Files**:
   - Click the pencil icon to edit
   - Make your changes
   - Add commit message: "Updated content"
   - Click "Commit changes"

4. **Wait for Deployment**:
   - GitHub automatically rebuilds your site
   - Changes appear in 1-2 minutes

## File Structure

```
your-repository/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automatic deployment
├── content/                    # All website content
│   ├── site-settings.md
│   ├── hero-slides.md
│   ├── about.md
│   ├── team.md
│   ├── services.md
│   ├── projects.md
│   ├── testimonials.md
│   ├── blog.md
│   ├── contact.md
│   ├── footer.md
│   └── navigation.md
├── assets/                     # CSS, JS, Images
│   ├── css/
│   ├── js/
│   └── img/
├── editable-index.html         # Main website
├── editor.html                 # Content editor
├── index-github.html          # GitHub Pages hub
├── index.html                  # Redirects to GitHub Pages hub
├── test-github-pages.html     # Functionality test page
└── README.md
```

## Customizing Your Website

### Adding New Content

1. **Use the Editor**:
   - Go to `editor.html`
   - Add new team members, projects, or blog posts
   - Export and upload to GitHub

2. **Edit Markdown Files**:
   - Modify files in `content/` folder
   - Follow the existing format
   - Commit changes to GitHub

### Changing Images

1. **Upload Images**:
   - Go to your GitHub repository
   - Navigate to `assets/img/`
   - Upload new images

2. **Update References**:
   - Use the editor to update image paths
   - Or edit markdown files directly

### Adding New Sections

1. **Create New Content File**:
   - Add new `.md` file in `content/` folder
   - Follow existing format

2. **Update Website**:
   - Modify `editable-index.html`
   - Update `content-loader.js`
   - Add to editor interface

## Advanced Features

### Custom Domain

1. **Buy a Domain** (e.g., yamacharita.com)
2. **Configure DNS**:
   - Add CNAME record pointing to `your-username.github.io`
3. **Update GitHub**:
   - Go to repository Settings > Pages
   - Add custom domain
   - Enable HTTPS

### Automatic Updates

The GitHub Actions workflow automatically:
- Deploys changes when you push to main branch
- Rebuilds the site with new content
- Updates the live website

### Backup and Version Control

- All changes are tracked in Git
- You can revert to previous versions
- Full history of all modifications
- Easy collaboration with team members

## Troubleshooting

### Site Not Loading
- Check if GitHub Pages is enabled
- Verify repository is public
- Wait 5-10 minutes for initial deployment

### Changes Not Appearing
- Ensure you committed changes to GitHub
- Check if GitHub Actions completed successfully
- Wait 1-2 minutes for rebuild

### Editor Not Working
- Make sure you're using a modern browser
- Check if JavaScript is enabled
- Try refreshing the page

### Images Not Showing
- Verify image paths are correct
- Check if images are uploaded to GitHub
- Ensure file extensions are correct (.jpg, .png, etc.)

## Benefits of GitHub Pages

### For You (Developer)
- ✅ Free hosting
- ✅ Version control
- ✅ Easy deployment
- ✅ Professional setup
- ✅ Scalable solution

### For Your Customer
- ✅ Easy content editing
- ✅ No technical knowledge required
- ✅ Real-time updates
- ✅ Mobile-friendly
- ✅ Professional appearance

## Support

### GitHub Pages Documentation
- [GitHub Pages Guide](https://pages.github.com/)
- [Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Getting Help
- Check GitHub repository issues
- Contact GitHub support
- Refer to this documentation

## Next Steps

1. **Deploy Your Site** using the steps above
2. **Test the Editor** by making some changes
3. **Customize Further** if needed
4. **Train Your Customer** on using the editor
5. **Enjoy Your Editable Website!** 🎉

---

**Note**: This setup provides a professional, fully editable website that your customer can easily manage through the web-based editor, with all changes automatically deployed to GitHub Pages!