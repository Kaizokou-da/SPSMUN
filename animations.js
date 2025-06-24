// animations.js
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener('DOMContentLoaded', () => {

    // --- SMOOTH SCROLL (Optional - if native scroll-behavior is not enough or for more control) ---
    // const lenis = new Lenis()
    // function raf(time) {
    //   lenis.raf(time)
    //   requestAnimationFrame(raf)
    // }
    // requestAnimationFrame(raf)
    // gsap.ticker.add((time)=>{
    //   lenis.raf(time * 1000)
    // })

    // --- HERO SECTION ANIMATIONS ---
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBgImage = document.querySelector('.hero-bg-image');

    if (heroTitle) {
        // Split title into characters
        const splitHeroTitle = new SplitText(heroTitle, { type: "chars, words" });
        
        gsap.set(heroTitle, { perspective: 400 }); // For 3D character animations

        gsap.from(splitHeroTitle.chars, {
            duration: 0.8,
            opacity: 0,
            scale: 0.5,
            y: 80,
            rotationX: -90,
            transformOrigin: "0% 50% -50",
            ease: "expo.out",
            stagger: 0.03,
            delay: 0.3 // Start after a slight delay
        });
    }

    if (heroSubtitle) {
        gsap.from(heroSubtitle, {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            delay: 0.8 // After title animation
        });
    }

    if (heroBgImage) {
        gsap.to(heroBgImage, {
            scale: 1.1, // Subtle zoom
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1.5, // Smooth scrubbing effect
            }
        });
    }

    // --- GENERAL TEXT REVEAL (for headings and paragraphs) ---
    const revealElements = gsap.utils.toArray('.gsap-reveal-text');
    revealElements.forEach(el => {
        // Wrap lines for line-by-line animation
        const split = new SplitText(el, { type: "lines", linesClass: "line-child" });
        new SplitText(el, { type: "lines", linesClass: "line-parent" }); // Parent for overflow hidden

        gsap.from(split.lines, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when 85% of element is in view
                end: "bottom 50%",
                toggleActions: "play none none none",
                // markers: true, // For debugging
            },
            duration: 1,
            yPercent: 100,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.1
        });
    });
    
    // --- IMAGE PARALLAX EFFECT ---
    const parallaxImages = gsap.utils.toArray('.parallax-image');
    parallaxImages.forEach(img => {
        const container = img.closest('.image-parallax-container');
        gsap.to(img, {
            yPercent: -15, // Move image up as container scrolls down
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom", // When top of container hits bottom of viewport
                end: "bottom top", // When bottom of container hits top of viewport
                scrub: true, // Animation progress tied to scroll
                // markers: true,
            }
        });
    });

    // --- FEATURE ITEMS REVEAL ---
    const featureItems = gsap.utils.toArray('.gsap-feature-item');
    featureItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1 // Stagger the reveal of feature items
        });
    });

    // --- CURSOR FOLLOWER (Subtle premium effect - optional) ---
    // const cursor = document.createElement('div');
    // cursor.classList.add('custom-cursor');
    // document.body.appendChild(cursor);

    // document.addEventListener('mousemove', e => {
    //     gsap.to(cursor, {
    //         x: e.clientX,
    //         y: e.clientY,
    //         duration: 0.2,
    //         ease: "power2.out"
    //     });
    // });

    // // Add hover effect for links/buttons
    // document.querySelectorAll('a, button, .feature-item').forEach(el => {
    //     el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.3 }));
    //     el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 0.3, duration: 0.3 }));
    // });
    // Add to CSS if using cursor:
    // .custom-cursor { position: fixed; left:0; top:0; width: 20px; height: 20px; background-color: var(--accent-light); border-radius: 50%; pointer-events: none; z-index: 9999; opacity: 0.3; mix-blend-mode: difference;}

    console.log("GSAP animations initialized!");
});