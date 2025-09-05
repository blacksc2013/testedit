// Content Loader for Editable Website
class ContentLoader {
    constructor() {
        this.content = {};
        this.init();
    }

    async init() {
        try {
            await this.loadAllContent();
            this.renderContent();
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    async loadAllContent() {
        const contentFiles = [
            'content/site-settings.md',
            'content/hero-slides.md',
            'content/about.md',
            'content/team.md',
            'content/services.md',
            'content/projects.md',
            'content/testimonials.md',
            'content/blog.md',
            'content/contact.md',
            'content/footer.md',
            'content/navigation.md'
        ];

        const promises = contentFiles.map(file => this.loadMarkdownFile(file));
        const results = await Promise.all(promises);
        
        results.forEach((data, index) => {
            if (data) {
                const fileName = contentFiles[index].split('/').pop().replace('.md', '');
                this.content[fileName] = data;
            }
        });
    }

    async loadMarkdownFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                console.warn(`Could not load ${filePath}`);
                return null;
            }
            const text = await response.text();
            return this.parseMarkdown(text);
        } catch (error) {
            console.warn(`Error loading ${filePath}:`, error);
            return null;
        }
    }

    parseMarkdown(text) {
        const lines = text.split('\n');
        const frontMatter = [];
        let content = [];
        let inFrontMatter = false;
        let inContent = false;

        for (let line of lines) {
            if (line.trim() === '---' && !inFrontMatter) {
                inFrontMatter = true;
                continue;
            }
            if (line.trim() === '---' && inFrontMatter) {
                inFrontMatter = false;
                inContent = true;
                continue;
            }
            if (inFrontMatter) {
                frontMatter.push(line);
            }
            if (inContent) {
                content.push(line);
            }
        }

        const frontMatterObj = this.parseYAML(frontMatter.join('\n'));
        return frontMatterObj;
    }

    parseYAML(yaml) {
        const obj = {};
        const lines = yaml.split('\n');
        
        for (let line of lines) {
            if (line.trim() && line.includes(':')) {
                const [key, ...valueParts] = line.split(':');
                let value = valueParts.join(':').trim();
                
                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // Handle arrays
                if (value.startsWith('[') && value.endsWith(']')) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // If JSON parsing fails, treat as string
                    }
                }
                
                // Handle boolean values
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                
                obj[key.trim()] = value;
            }
        }
        
        return obj;
    }

    renderContent() {
        this.updateSiteSettings();
        this.updateNavigation();
        this.updateHeroSection();
        this.updateAboutSection();
        this.updateTeamSection();
        this.updateServicesSection();
        this.updateProjectsSection();
        this.updateTestimonialsSection();
        this.updateBlogSection();
        this.updateContactSection();
        this.updateFooterSection();
    }

    updateSiteSettings() {
        const settings = this.content['site-settings'];
        if (!settings) return;

        if (settings.title) {
            document.title = settings.title;
            const titleMeta = document.querySelector('meta[name="title"]');
            if (titleMeta) titleMeta.content = settings.title;
        }
        
        if (settings.description) {
            const descMeta = document.querySelector('meta[name="description"]');
            if (descMeta) descMeta.content = settings.description;
        }
        
        if (settings.keywords) {
            const keywordsMeta = document.querySelector('meta[name="keywords"]');
            if (keywordsMeta) keywordsMeta.content = settings.keywords;
        }
    }

    updateNavigation() {
        const nav = this.content['navigation'];
        if (!nav || !nav.menu_items) return;

        const menuItems = document.querySelectorAll('.main-menu ul li a');
        nav.menu_items.forEach((item, index) => {
            if (menuItems[index]) {
                menuItems[index].textContent = item.text;
                menuItems[index].href = item.link;
            }
        });
    }

    updateHeroSection() {
        const hero = this.content['hero-slides'];
        if (!hero || !hero.slides) return;

        const swiperWrapper = document.querySelector('#heroSlide1 .swiper-wrapper');
        if (!swiperWrapper) return;

        // Clear existing slides
        swiperWrapper.innerHTML = '';

        hero.slides.forEach((slide, index) => {
            const slideHTML = `
                <div class="swiper-slide" role="group" aria-label="${index + 1} / ${hero.slides.length}">
                    <div class="hero-inner bg-mask" style="mask-image: url('assets/img/hero/hero_1_bg_mask.png');">
                        <div class="th-hero-bg background-image" style="background-image: url('${slide.background_image}');"></div>
                        <div class="hero-big-text">${slide.subtitle}</div>
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-9">
                                    <div class="hero-style1">
                                        <h1 class="hero-title text-white">
                                            <span class="title1 slideindown" data-ani="slideindown" data-ani-delay="0.3s" style="animation-delay: 0.3s;">${slide.title}</span>
                                        </h1>
                                        <p class="hero-text text-white slideinup txt-cap" data-ani="slideinup" data-ani-delay="0.5s" style="animation-delay: 0.5s;">${slide.description}</p>
                                        <a href="${slide.button1_link}" class="th-btn th-btn-icon style-border3 slideinup" data-ani="slideinup" data-ani-delay="0.6s" style="animation-delay: 0.6s;">${slide.button1_text}</a>
                                        <a href="${slide.button2_link}" class="th-btn slideinup" data-ani="slideinup" data-ani-delay="0.6s" style="animation-delay: 0.6s;">${slide.button2_text} <span class="fab fa-whatsapp"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            swiperWrapper.insertAdjacentHTML('beforeend', slideHTML);
        });
    }

    updateAboutSection() {
        const about = this.content['about'];
        if (!about) return;

        // Update about title
        const aboutTitle = document.querySelector('#about-sec .sec-title');
        if (aboutTitle && about.title) {
            aboutTitle.textContent = about.title;
        }

        // Update about description
        const aboutDesc = document.querySelector('#about-sec .sec-text');
        if (aboutDesc && about.description) {
            aboutDesc.textContent = about.description;
        }

        // Update profile info
        const profileName = document.querySelector('.about-profile-name');
        if (profileName && about.profile_name) {
            profileName.textContent = about.profile_name;
        }

        const profileTitle = document.querySelector('.about-profile .desig');
        if (profileTitle && about.profile_title) {
            profileTitle.textContent = about.profile_title;
        }

        const profileImage = document.querySelector('.about-profile .avatar img');
        if (profileImage && about.profile_image) {
            profileImage.src = about.profile_image;
        }

        const signatureImage = document.querySelector('.signature img');
        if (signatureImage && about.signature_image) {
            signatureImage.src = about.signature_image;
        }
    }

    updateTeamSection() {
        const team = this.content['team'];
        if (!team || !team.members) return;

        // Update team title
        const teamTitle = document.querySelector('#team-sec .sec-title');
        if (teamTitle && team.title) {
            teamTitle.textContent = team.title;
        }

        // Update team description
        const teamDesc = document.querySelector('#team-sec .sec-text');
        if (teamDesc && team.description) {
            teamDesc.textContent = team.description;
        }

        // Update team members
        const swiperWrapper = document.querySelector('#teamSlider1 .swiper-wrapper');
        if (!swiperWrapper) return;

        swiperWrapper.innerHTML = '';

        team.members.forEach((member, index) => {
            const memberHTML = `
                <div class="swiper-slide">
                    <div class="th-team team-card style6">
                        <div class="img-wrap">
                            <div class="team-img" data-mask-src="assets/img/theme-img/team-shape1.png">
                                <img src="${member.image}" alt="Team">
                            </div>
                        </div>
                        <div class="team-card-content">
                            <div class="media">
                                <div class="media-left">
                                    <h3 class="box-title"><a href="team-details.html">${member.name}</a></h3>
                                    <span class="team-desig">${member.position}</span>
                                </div>
                                <div class="media-body">
                                    <a class="icon-btn" href="tel:${member.phone}">
                                        <img src="assets/img/icon/phone.svg" alt="img">
                                    </a>
                                </div>
                            </div>
                            <div class="th-social">
                                ${member.social_links.facebook ? `<a target="_blank" href="${member.social_links.facebook}"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${member.social_links.youtube ? `<a target="_blank" href="${member.social_links.youtube}"><i class="fab fa-youtube"></i></a>` : ''}
                                ${member.social_links.instagram ? `<a target="_blank" href="${member.social_links.instagram}"><i class="fab fa-instagram"></i></a>` : ''}
                                ${member.social_links.linkedin ? `<a target="_blank" href="${member.social_links.linkedin}"><i class="fab fa-linkedin-in"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            swiperWrapper.insertAdjacentHTML('beforeend', memberHTML);
        });
    }

    updateServicesSection() {
        const services = this.content['services'];
        if (!services || !services.service_cards) return;

        // Update services title
        const servicesTitle = document.querySelector('#service-sec .sec-title');
        if (servicesTitle && services.title) {
            servicesTitle.textContent = services.title;
        }

        // Update services description
        const servicesDesc = document.querySelector('#service-sec .sec-text');
        if (servicesDesc && services.description) {
            servicesDesc.textContent = services.description;
        }

        // Update service cards
        const serviceCards = document.querySelectorAll('.service-card');
        services.service_cards.forEach((card, index) => {
            if (serviceCards[index]) {
                const title = serviceCards[index].querySelector('.box-title a');
                const description = serviceCards[index].querySelector('.box-text');
                const icon = serviceCards[index].querySelector('.icon img');

                if (title) title.textContent = card.title;
                if (description) description.textContent = card.description;
                if (icon) icon.src = card.icon;
            }
        });
    }

    updateProjectsSection() {
        const projects = this.content['projects'];
        if (!projects || !projects.project_items) return;

        // Update projects title
        const projectsTitle = document.querySelector('#service-sec .sec-title');
        if (projectsTitle && projects.title) {
            projectsTitle.textContent = projects.title;
        }

        // Update project items
        const projectWraps = document.querySelectorAll('.property-card-wrap');
        projects.project_items.forEach((project, index) => {
            if (projectWraps[index]) {
                const title = projectWraps[index].querySelector('.property-card-title a');
                const subtitle = projectWraps[index].querySelector('.property-card-subtitle');
                const description = projectWraps[index].querySelector('.property-card-text');
                const number = projectWraps[index].querySelector('.property-card-number');
                const image = projectWraps[index].querySelector('.property-thumb img');

                if (title) title.textContent = project.title;
                if (subtitle) subtitle.textContent = project.subtitle;
                if (description) description.textContent = project.description;
                if (number) number.textContent = project.number;
                if (image) image.src = project.image;
            }
        });
    }

    updateTestimonialsSection() {
        const testimonials = this.content['testimonials'];
        if (!testimonials || !testimonials.testimonials) return;

        // Update testimonials title
        const testiTitle = document.querySelector('.testi-sec-1 .sec-title');
        if (testiTitle && testimonials.title) {
            testiTitle.textContent = testimonials.title;
        }

        // Update testimonials
        const swiperWrapper = document.querySelector('#testiSlider1 .swiper-wrapper');
        if (!swiperWrapper) return;

        swiperWrapper.innerHTML = '';

        testimonials.testimonials.forEach((testimonial, index) => {
            const stars = '★'.repeat(testimonial.rating || 5);
            const testimonialHTML = `
                <div class="swiper-slide">
                    <div class="testi-card">
                        <div class="testi-grid_review">
                            ${stars.split('').map(() => '<i class="fa-sharp fa-solid fa-star"></i>').join('')}
                        </div>
                        <p class="testi-card_text">"${testimonial.quote}"</p>
                        <div class="testi-grid-wrap">
                            <div class="testi-card_profile">
                                <div class="avatar" data-mask-src="assets/img/shape/testi_1_1-mask.png">
                                    <img src="${testimonial.image}" alt="avatar">
                                </div>
                                <div class="testi-card_profile-details">
                                    <h3 class="testi-card_name">${testimonial.name}</h3>
                                    <span class="testi-card_desig">${testimonial.position}</span>
                                </div>
                            </div>
                            <div class="quote-icon">
                                <img src="assets/img/icon/qoute.svg" alt="icon">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            swiperWrapper.insertAdjacentHTML('beforeend', testimonialHTML);
        });
    }

    updateBlogSection() {
        const blog = this.content['blog'];
        if (!blog || !blog.posts) return;

        // Update blog title
        const blogTitle = document.querySelector('#blog-sec .sec-title');
        if (blogTitle && blog.title) {
            blogTitle.textContent = blog.title;
        }

        // Update blog posts
        const blogGrids = document.querySelectorAll('.blog-grid');
        blog.posts.forEach((post, index) => {
            if (blogGrids[index]) {
                const title = blogGrids[index].querySelector('.box-title a');
                const excerpt = blogGrids[index].querySelector('.blog-text');
                const image = blogGrids[index].querySelector('.blog-img img');
                const date = blogGrids[index].querySelector('.blog-date');

                if (title) title.textContent = post.title;
                if (excerpt) excerpt.textContent = post.excerpt;
                if (image) image.src = post.image;
                if (date) {
                    const postDate = new Date(post.date);
                    date.textContent = postDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                }
            }
        });
    }

    updateContactSection() {
        const contact = this.content['contact'];
        if (!contact) return;

        // Update contact title
        const contactTitle = document.querySelector('#contact-sec .sec-title');
        if (contactTitle && contact.title) {
            contactTitle.textContent = contact.title;
        }

        // Update contact description
        const contactDesc = document.querySelector('#contact-sec .sec-text');
        if (contactDesc && contact.description) {
            contactDesc.textContent = contact.description;
        }

        // Update contact info
        const address = document.querySelector('.th-widget-contact .info-box_text:nth-child(1) .details p');
        if (address && contact.address) {
            address.textContent = contact.address;
        }

        const phone = document.querySelector('.th-widget-contact .info-box_text:nth-child(2) .details a');
        if (phone && contact.phone) {
            phone.textContent = contact.phone;
            phone.href = `tel:${contact.phone}`;
        }

        const whatsapp = document.querySelector('.th-widget-contact .info-box_text:nth-child(3) .details a');
        if (whatsapp && contact.whatsapp) {
            whatsapp.textContent = contact.whatsapp;
            whatsapp.href = `https://wa.me/${contact.whatsapp}/?text=Merhaba...Sitenizden Yazıyorum`;
        }

        const email = document.querySelector('.th-widget-contact .info-box_text:nth-child(4) .details a');
        if (email && contact.email) {
            email.textContent = contact.email;
            email.href = `mailto:${contact.email}`;
        }

        // Update map
        const mapContainer = document.querySelector('.contact-map iframe');
        if (mapContainer && contact.map_embed) {
            mapContainer.outerHTML = contact.map_embed;
        }
    }

    updateFooterSection() {
        const footer = this.content['footer'];
        if (!footer) return;

        // Update footer description
        const footerDesc = document.querySelector('.footer-widget .about-text');
        if (footerDesc && footer.description) {
            footerDesc.textContent = footer.description;
        }

        // Update copyright
        const copyright = document.querySelector('.copyright-text');
        if (copyright && footer.copyright) {
            copyright.innerHTML = footer.copyright;
        }

        // Update social links
        const instagramLink = document.querySelector('.th-social a[href*="instagram"]');
        if (instagramLink && footer.social_links.instagram) {
            instagramLink.href = footer.social_links.instagram;
        }

        const facebookLink = document.querySelector('.th-social a[href*="facebook"]');
        if (facebookLink && footer.social_links.facebook) {
            facebookLink.href = footer.social_links.facebook;
        }

        // Update footer links
        const footerLinks = document.querySelectorAll('.footer-links ul li a');
        if (footer.footer_links) {
            footer.footer_links.forEach((link, index) => {
                if (footerLinks[index]) {
                    footerLinks[index].textContent = link.text;
                    footerLinks[index].href = link.link;
                }
            });
        }
    }
}

// Initialize content loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
});