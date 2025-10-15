 // Dark/Light mode toggle - Fixed version
    const toggle = document.getElementById('toggle');
    const mobileToggle = document.getElementById('mobileToggle');
    const body = document.body;
    const darkIcons = document.querySelectorAll('.dark-icon');
    const lightIcons = document.querySelectorAll('.light-icon');
    
    // Function to set theme
    function setTheme(isDark) {
      if (isDark) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        darkIcons.forEach(icon => icon.style.display = 'block');
        lightIcons.forEach(icon => icon.style.display = 'none');
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        darkIcons.forEach(icon => icon.style.display = 'none');
        lightIcons.forEach(icon => icon.style.display = 'block');
      }
    }
    
    // Check for saved user preference or prefer-color-scheme
    function checkPreferredTheme() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme === 'dark-mode');
      } else {
        setTheme(prefersDark);
      }
    }
    
    // Initialize theme
    checkPreferredTheme();
    
    // Event listeners for both toggles
    if (toggle) {
      toggle.addEventListener('change', function() {
        setTheme(!this.checked);
      });
    }
    
    if (mobileToggle) {
      mobileToggle.addEventListener('change', function() {
        setTheme(!this.checked);
      });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
      }
    });
    
    // Desktop toggle handler
    if (toggle) {
      toggle.addEventListener('change', function() {
        toggleTheme(this.checked);
        if (mobileToggle) mobileToggle.checked = this.checked;
      });
    }
    
    // Mobile toggle handler
    if (mobileToggle) {
      mobileToggle.addEventListener('change', function() {
        toggleTheme(this.checked);
        if (toggle) toggle.checked = this.checked;
      });
    }
    
    function toggleTheme(isLightMode) {
      if (isLightMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        darkIcons.forEach(icon => icon.style.display = 'none');
        lightIcons.forEach(icon => icon.style.display = 'block');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        darkIcons.forEach(icon => icon.style.display = 'block');
        lightIcons.forEach(icon => icon.style.display = 'none');
      }
    }

    // Smooth scroll to top when clicking logo
    document.querySelector('.logo-link').addEventListener('click', function(e) {
      if (window.location.hash === '#home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    // Mission slideshow
    const missionSlides = document.querySelectorAll('.mission-slide');
    let missionIndex = 0;

    function showMissionSlide() {
      missionSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === missionIndex) slide.classList.add('active');
      });
      missionIndex = (missionIndex + 1) % missionSlides.length;
    }

    setInterval(showMissionSlide, 4000);

    // Mobile Menu Toggle
    const toggleBtn = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Main slideshow
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    function showSlide() {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
      });
      index = (index + 1) % slides.length;
    }

    setInterval(showSlide, 4000);

    // Contact form message
    // document.getElementById("contactForm").addEventListener("submit", function (e) {
    //   e.preventDefault();
    //   document.getElementById("responseMsg").classList.remove("hidden");
    //   this.reset();
    // });
     // Initialize Swiper
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
        // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-quad',
    once: false, // Animations happen only once
    // offset: 120 // Trigger animations 120px before element becomes visible
  });
  
  // Add Animate.css on scroll
  document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated');
          // Add different animations for different sections if needed
          if(entry.target.id === 'hero') {
            entry.target.classList.add('animate__fadeIn');
          } else if(entry.target.id === 'services') {
            entry.target.classList.add('animate__fadeInUp');
          }
          // ...add more conditions for other sections
        }
      });
    }, {threshold: 0.1});
    
    sections.forEach(section => {
      observer.observe(section);
    });
  });


// EmailJS contact form submission

// function SendMail() {
//     var params = {
//         from_name: document.getElementById("name").value,
//         email_id: document.getElementById("email").value,
//         message: document.getElementById("message").value
//     }
//     emailjs.send("service_qxor2be", "template_9xsp14c", params).then(function (res) {
//       alert("Your message has been sent successfully!" + res.status);
//     })
// }
function SendMail() {
  // Prevent default form submission
  event.preventDefault();

  // Get form values
  const params = {
    from_name: document.getElementById("name").value.trim(),
    email_id: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  // Simple validation
  if (!params.from_name || !params.email_id || !params.message) {
    alert("Please fill in all fields!");
    return;
  }

  // Send email using EmailJS
  emailjs.send("service_qxor2be", "template_9xsp14c", params)
    .then(function(response) {
      alert("Thank you! Your message has been sent successfully.");
      document.getElementById("contactForm").reset(); // Clear the form
    }, function(error) {
      alert("Oops! Something went wrong. Please try again later.");
      console.error("EmailJS Error:", error);
    });
}
// Update mobile menu links
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Initialize AOS for animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
});
// Make sure this is in your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Mission slideshow
    let missionSlideIndex = 0;
    const missionSlides = document.querySelectorAll('.mission-slide');
    
    function showMissionSlides() {
        missionSlides.forEach(slide => slide.classList.remove('active'));
        missionSlideIndex++;
        
        if (missionSlideIndex > missionSlides.length) {
            missionSlideIndex = 1;
        }
        
        if (missionSlides[missionSlideIndex - 1]) {
            missionSlides[missionSlideIndex - 1].classList.add('active');
        }
        
        setTimeout(showMissionSlides, 4000);
    }
    
    if (missionSlides.length > 0) {
        showMissionSlides();
    }
});
  // Wait for the page to load
        window.addEventListener('load', function() {
            // Add a small delay to ensure the preloader animation is visible
            setTimeout(function() {
                const preloader = document.getElementById('preloader');
                const mainContent = document.getElementById('mainContent');
                
                // Fade out the preloader
                preloader.classList.add('fade-out');
                
                // Show the main content after preloader fades out
                setTimeout(function() {
                    preloader.style.display = 'none';
                  const element = document.getElementById('yourElementId');
                    if (element) {
                        element.style.display = 'block';
                    } else {
                        console.log('Element not found');
                    }

                }, 800);
            }, 3000); // 3 seconds total loading time
        });