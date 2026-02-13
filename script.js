

  // Music Control
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let musicPlaying = false;

    // Try to autoplay with sound (browsers now require user interaction)
    function tryAutoplay() {
      bgMusic.volume = 0.3;
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked, user can click button to play
        });
      }
    }

    musicToggle.addEventListener('click', () => {
      musicPlaying = !musicPlaying;
      bgMusic.volume = 0.3;
      
      if (musicPlaying) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎵';
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔇';
      }
    });

    // Allow user click anywhere to start music
    document.addEventListener('click', () => {
      if (!musicPlaying && bgMusic.paused) {
        // Don't auto-start, let user click button
      }
    }, { once: true });

    // Default Config configuration
    const defaultConfig = {
      wife_name: 'Your Name',
      husband_name: 'His Name',
      letter_greeting: 'My Dearest Love,',
      letter_body: 'Tumse milna meri zindagi ka sabse khoobsurat lamha tha. Jab se hum ne baat karna shuru kiya, meri duniya badal gayi. Tum mere cousin the, phir dost bane, aur ab tum meri puri duniya ho - mera pyaara husband! 💕',
      letter_closing: 'Forever Yours,',
      first_chat_date: '2022',
      wedding_date: '6 December 2024',
      primary_color: '#ec407a',
      secondary_color: '#f8bbd9',
      text_color: '#880e4f',
      surface_color: '#fce4ec',
      accent_color: '#f06292',
      font_family: 'Quicksand',
      font_size: 16
    };

    let config = { ...defaultConfig };

    // Page navigation
    const navButtons = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function showPage(pageId) {
      pages.forEach(page => {
        page.classList.add('hidden');
      });
      const targetPage = document.getElementById(`page-${pageId}`);
      if (targetPage) {
        targetPage.classList.remove('hidden');
      }
      
      navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
          btn.classList.add('active');
        }
      });
      
      // Close mobile menu
      mobileMenu.classList.add('hidden');
      
      // Scroll to top
      document.getElementById('app').scrollTop = 0;
    }

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        showPage(btn.dataset.page);
      });
    });

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Floating hearts background
    function createFloatingHearts() {
      const container = document.getElementById('floating-hearts');
      const hearts = ['💕', '💋', '💗', '💓', '🌹', '✨', '🦋'];
      
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-petal';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
      }
    }

    createFloatingHearts();
    // Photo upload functionality (Gallery & Others)
function setupPhotoUpload(inputSelector, targetIdAttr) {
  document.querySelectorAll(inputSelector).forEach(input => {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        const targetId = this.getAttribute(targetIdAttr) || this.closest('.photo-frame').id;
        
        reader.onload = function(event) {
          const container = document.getElementById(targetId);
          // Purani image ko hatana ya update karna bina input delete kiye
          let img = container.querySelector('img');
          if (!img) {
            img = document.createElement('img');
            img.className = "absolute inset-0 w-full h-full object-cover object-top";
            container.prepend(img); // Image ko sabse pehle lagana
          }
          img.src = event.target.result;
          
          // Upload zone (icon/text) ko hide kar dena
          const uploadZone = container.querySelector('.upload-zone');
          if (uploadZone) uploadZone.style.opacity = "0"; 
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

// Main Wedding Photo Upload
function handleMainPhotoUpload(e, containerId) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const container = document.getElementById(containerId);
      let img = container.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        img.className = "w-full h-full object-cover object-top";
        container.innerHTML = ''; // Clear container
        container.appendChild(img);
      }
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Initialize inputs
setupPhotoUpload('.story-photo-input', 'data-target');
setupPhotoUpload('.wedding-photo-input', 'data-target');
setupPhotoUpload('.travel-photo-input', 'data-target');
setupPhotoUpload('.pakistan-photo-input', 'data-target');


document.getElementById('wedding-main-input')?.addEventListener('change', (e) => handleMainPhotoUpload(e, 'wedding-main-photo'));
// Travel aur Pakistan page ke liye inputs initialize karein
setupPhotoUpload('.travel-photo-input', 'data-target');
setupPhotoUpload('.pakistan-photo-input', 'data-target');

// Pakistan Main Photo (Single Large Image) ke liye listener
document.getElementById('pakistan-main-input')?.addEventListener('change', function(e) {
    handleMainPhotoUpload(e, 'pakistan-main-photo');
});

    // // Photo upload functionality
    // function setupPhotoUpload(inputSelector, targetIdAttr) {
    //   document.querySelectorAll(inputSelector).forEach(input => {
    //     input.addEventListener('change', function(e) {
    //       const file = e.target.files[0];
    //       if (file) {
    //         const reader = new FileReader();
    //         const targetId = this.getAttribute(targetIdAttr) || this.closest('[id]').id;
    //         reader.onload = function(event) {
    //           const container = document.getElementById(targetId);
    //           container.innerHTML = `<img src="${event.target.result}" alt="Photo" class="w-full h-full object-cover">`;
    //         };
    //         reader.readAsDataURL(file);
    //       }
    //     });
    //   });
    // }

    // // Setup all photo inputs
    // setupPhotoUpload('.story-photo-input', 'data-target');
    // setupPhotoUpload('.wedding-photo-input', 'data-target');
    // setupPhotoUpload('.travel-photo-input', 'data-target');
    // setupPhotoUpload('.pakistan-photo-input', 'data-target');

    // // Main photo uploads
    // document.getElementById('wedding-main-input')?.addEventListener('change', function(e) {
    //   handleMainPhotoUpload(e, 'wedding-main-photo');
    // });

    // document.getElementById('pakistan-main-input')?.addEventListener('change', function(e) {
    //   handleMainPhotoUpload(e, 'pakistan-main-photo');
    // });

    // function handleMainPhotoUpload(e, containerId) {
    //   const file = e.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = function(event) {
    //       const container = document.getElementById(containerId);
    //       container.innerHTML = `<img src="${event.target.result}" alt="Photo" class="w-full h-full object-cover">`;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    // // Video upload functionality
    // function setupVideoUpload(inputId, videoId, uploadId) {
    //   const input = document.getElementById(inputId);
    //   if (input) {
    //     input.addEventListener('change', function(e) {
    //       const file = e.target.files[0];
    //       if (file) {
    //         const video = document.getElementById(videoId);
    //         const upload = document.getElementById(uploadId);
    //         const url = URL.createObjectURL(file);
    //         video.src = url;
    //         video.classList.remove('hidden');
    //         upload.classList.add('hidden');
    //       }
    //     });
    //   }
    // }

    // setupVideoUpload('home-video-input', 'home-video', 'home-video-upload');
    // setupVideoUpload('wedding-video-input', 'wedding-video', 'wedding-video-upload');
    // setupVideoUpload('pakistan-video-input', 'pakistan-video', 'pakistan-video-upload');

    // Video upload aur display functionality
function setupVideoUpload(inputId, videoId, uploadId) {
  const input = document.getElementById(inputId);
  const video = document.getElementById(videoId);
  const upload = document.getElementById(uploadId);

  // Check karein agar video mein pehle se link (src) hai
  if (video && video.getAttribute('src') !== "" && video.getAttribute('src') !== null) {
    video.classList.remove('hidden');
    if (upload) upload.classList.add('hidden');
  }

  if (input) {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        video.src = url;
        video.classList.remove('hidden');
        if (upload) upload.classList.add('hidden');
        video.play(); // Nayi video select hote hi play ho jayegi
      }
    });
  }
}

// Teeno videos ko initialize karein
setupVideoUpload('home-video-input', 'home-video', 'home-video-upload');
setupVideoUpload('wedding-video-input', 'wedding-video', 'wedding-video-upload');
setupVideoUpload('pakistan-video-input', 'pakistan-video', 'pakistan-video-upload');

    // Element SDK Integration
    async function onConfigChange(cfg) {
      config = { ...defaultConfig, ...cfg };
      
      const baseFontStack = 'Quicksand, sans-serif';
      const customFont = config.font_family || defaultConfig.font_family;
      const fontStack = `${customFont}, ${baseFontStack}`;
      const baseSize = config.font_size || defaultConfig.font_size;
      
      // Update couple names
      const coupleNames = document.getElementById('couple-names');
      if (coupleNames) {
        coupleNames.textContent = `${config.wife_name} & ${config.husband_name}`;
        coupleNames.style.fontFamily = `'Dancing Script', ${fontStack}`;
      }
      
      // Update dates
      const firstChatYear = document.getElementById('first-chat-year');
      if (firstChatYear) firstChatYear.textContent = config.first_chat_date;
      
      const weddingYear = document.getElementById('wedding-year');
      if (weddingYear) weddingYear.textContent = config.wedding_date;
      
      const storyYear1 = document.getElementById('story-year-1');
      if (storyYear1) storyYear1.textContent = config.first_chat_date;
      
      const storyWeddingDate = document.getElementById('story-wedding-date');
      if (storyWeddingDate) storyWeddingDate.textContent = config.wedding_date;
      
      const weddingDateDisplay = document.getElementById('wedding-date-display');
      if (weddingDateDisplay) weddingDateDisplay.textContent = config.wedding_date;
      
      // Update letter content
      const letterGreeting = document.getElementById('letter-greeting');
      if (letterGreeting) {
        letterGreeting.textContent = config.letter_greeting;
        letterGreeting.style.fontFamily = `'Dancing Script', ${fontStack}`;
      }
      
      const letterBody = document.getElementById('letter-body');
      if (letterBody) {
        letterBody.textContent = config.letter_body;
        letterBody.style.fontFamily = fontStack;
        letterBody.style.fontSize = `${baseSize}px`;
      }
      
      const letterClosing = document.getElementById('letter-closing');
      if (letterClosing) {
        letterClosing.textContent = config.letter_closing;
        letterClosing.style.fontFamily = `'Dancing Script', ${fontStack}`;
      }
      
      const letterSignature = document.getElementById('letter-signature');
      if (letterSignature) {
        letterSignature.textContent = `${config.wife_name} 💕`;
        letterSignature.style.fontFamily = `'Dancing Script', ${fontStack}`;
      }
      
      // Update footer
      const footerCouple = document.getElementById('footer-couple');
      if (footerCouple) {
        footerCouple.textContent = `Made with love for ${config.husband_name}`;
        footerCouple.style.fontFamily = `'Dancing Script', ${fontStack}`;
      }
      
      // Apply colors
      document.documentElement.style.setProperty('--primary-color', config.primary_color);
      document.documentElement.style.setProperty('--secondary-color', config.secondary_color);
      document.documentElement.style.setProperty('--text-color', config.text_color);
      
      // Apply font to all script fonts
      document.querySelectorAll('.script-font').forEach(el => {
        el.style.fontFamily = `'Dancing Script', ${fontStack}`;
      });
      
      // Apply base font size
      document.querySelectorAll('p, span, button').forEach(el => {
        if (!el.classList.contains('script-font')) {
          el.style.fontFamily = fontStack;
        }
      });
    }

    function mapToCapabilities(cfg) {
      return {
        recolorables: [
          {
            get: () => cfg.primary_color || defaultConfig.primary_color,
            set: (value) => {
              cfg.primary_color = value;
              if (window.elementSdk) window.elementSdk.setConfig({ primary_color: value });
            }
          },
          {
            get: () => cfg.surface_color || defaultConfig.surface_color,
            set: (value) => {
              cfg.surface_color = value;
              if (window.elementSdk) window.elementSdk.setConfig({ surface_color: value });
            }
          },
          {
            get: () => cfg.text_color || defaultConfig.text_color,
            set: (value) => {
              cfg.text_color = value;
              if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => cfg.secondary_color || defaultConfig.secondary_color,
            set: (value) => {
              cfg.secondary_color = value;
              if (window.elementSdk) window.elementSdk.setConfig({ secondary_color: value });
            }
          },
          {
            get: () => cfg.accent_color || defaultConfig.accent_color,
            set: (value) => {
              cfg.accent_color = value;
              if (window.elementSdk) window.elementSdk.setConfig({ accent_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => cfg.font_family || defaultConfig.font_family,
          set: (value) => {
            cfg.font_family = value;
            if (window.elementSdk) window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: {
          get: () => cfg.font_size || defaultConfig.font_size,
          set: (value) => {
            cfg.font_size = value;
            if (window.elementSdk) window.elementSdk.setConfig({ font_size: value });
          }
        }
      };
    }

    function mapToEditPanelValues(cfg) {
      return new Map([
        ['wife_name', cfg.wife_name || defaultConfig.wife_name],
        ['husband_name', cfg.husband_name || defaultConfig.husband_name],
        ['letter_greeting', cfg.letter_greeting || defaultConfig.letter_greeting],
        ['letter_body', cfg.letter_body || defaultConfig.letter_body],
        ['letter_closing', cfg.letter_closing || defaultConfig.letter_closing],
        ['first_chat_date', cfg.first_chat_date || defaultConfig.first_chat_date],
        ['wedding_date', cfg.wedding_date || defaultConfig.wedding_date]
      ]);
    }

    // Initialize
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    } else {
      onConfigChange(defaultConfig);
    }

    function openGift() {
  const gift = document.getElementById('gift-box');
  const cake = document.getElementById('cake-reveal');

  // Gift ko hide karo
  gift.style.display = 'none';

  // Cake ko show karo
  cake.classList.remove('hidden');
  
  // Animation effect ke liye delay
  setTimeout(() => {
    cake.classList.add('opacity-100', 'scale-100');
  }, 50);
}