// Navigation functionality
let activeSection = "home"
let currentTheme = "pink"


// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme)

  // Add mouse move listener for cursor emojis
  document.addEventListener("mousemove", handleMouseMove)

  // Add scroll listener for navigation
  window.addEventListener("scroll", handleScroll)

  // Add click listener for theme dropdown backdrop
  document.addEventListener("click", (e) => {
    const themeDropdown = document.getElementById("themeDropdown")
    const themeBtn = document.querySelector(".theme-btn")
    if (themeDropdown && themeBtn && !themeDropdown.contains(e.target) && !themeBtn.contains(e.target)) {
      themeDropdown.classList.remove("show")
    }
  })

  // Initialize timeline hover effects
  initializeTimelineHoverEffects()
})

// Scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// Handle scroll for active navigation
function handleScroll() {
  const sections = ["home", "about", "skills", "journey", "projects", "certifications", "contact"]
  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveNavItem(section)
        break
      }
    }
  }
}

// Set active navigation item
function setActiveNavItem(section) {
  if (activeSection !== section) {
    activeSection = section
    // Remove active class from all nav items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })

    // Add active class to current section's nav item
    const navItems = document.querySelectorAll(".nav-item")
    const sectionIndex = ["about", "skills", "journey", "projects", "certifications", "contact"].indexOf(section)
    if (sectionIndex >= 0 && navItems[sectionIndex]) {
      navItems[sectionIndex].classList.add("active")
    }
  }
}

// Theme picker functionality
function toggleThemePicker() {
  const dropdown = document.getElementById("themeDropdown")
  if (dropdown) {
    dropdown.classList.toggle("show")
  }
}

function changeTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)

  // Update active theme option
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.classList.remove("active")
  })

  const themeButton = document.querySelector(`[onclick="changeTheme('${theme}')"]`)
  if (themeButton) {
    themeButton.classList.add("active")
  }

  // Close dropdown
  const dropdown = document.getElementById("themeDropdown")
  if (dropdown) {
    dropdown.classList.remove("show")
  }

  // Store theme preference
  localStorage.setItem("portfolioTheme", theme)
}

// Load saved theme
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("portfolioTheme")
  if (savedTheme) {
    changeTheme(savedTheme)
  }
}

// Initialize timeline hover effects
function initializeTimelineHoverEffects() {
  const timelineCards = document.querySelectorAll(".timeline-card")
  timelineCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const description = this.querySelector(".timeline-description")
      if (description) {
        description.style.opacity = "1"
      }
    })

    card.addEventListener("mouseleave", function () {
      const description = this.querySelector(".timeline-description")
      if (description) {
        description.style.opacity = "0"
      }
    })
  })
}

// Contact form handling
// Declare the emailjs variable before using it
const emailjs = window.emailjs

// Initialize EmailJS with your public key
;(() => {
  emailjs.init("7ivN7tMi5kmfbNNrK") // Your actual public key
})()

// Contact form handling with direct email sending
function handleFormSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Get submit button and show loading
  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  // Send email using your template variables
  emailjs
    .send("service_kb1zx7g", "template_dojmrxs", {
      name: name, // matches {{name}} in your template
      email: email, // matches {{email}} in your template
      subject: subject, // matches {{subject}} in your template
      message: message, // matches {{message}} in your template
    })
    .then((response) => {
      alert("Message sent successfully! I'll get back to you soon.")
      event.target.reset()
    })
    .catch((error) => {
      alert("Failed to send message. Please try again.")
      console.error("Error:", error)
    })
    .finally(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    })
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add animation on scroll
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".skill-card, .project-card, .cert-card, .about-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Initialize scroll animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(addScrollAnimations, 500)
  loadSavedTheme()
})

// Add parallax effect to decorative elements
function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const decorations = document.querySelectorAll(".decoration")

    decorations.forEach((decoration, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      decoration.style.transform = `translateY(${yPos}px)`
    })
  })
}

// Initialize parallax effect
document.addEventListener("DOMContentLoaded", addParallaxEffect)

// Add typing effect to hero title
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-name .highlight")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(addTypingEffect, 500)
})

// Add hover effects for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add hover effects for certificate cards
document.addEventListener("DOMContentLoaded", () => {
  const certificateCards = document.querySelectorAll(".cert-card")
  certificateCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add hover effects for skills cards
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card")
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Skills dropdown functionality
function toggleSkillDropdown(skillId) {
  const dropdown = document.getElementById(skillId + "-dropdown")
  const arrow = document.getElementById(skillId + "-arrow")

  // Close all other dropdowns
  document.querySelectorAll(".skill-dropdown").forEach((dd) => {
    if (dd.id !== skillId + "-dropdown") {
      dd.classList.remove("open")
    }
  })

  // Toggle the selected dropdown
  if (dropdown) {
    dropdown.classList.toggle("open")
  }

  if (arrow) {
    arrow.classList.toggle("rotated")
  }
}

// Add smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(".section-header, .timeline-item, .contact-item")

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight
    const elementTop = reveal.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("revealed")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// Add CSS for reveal animation
const style = document.createElement("style")
style.textContent = `
    .section-header, .timeline-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .section-header.revealed, .timeline-item.revealed, .contact-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)

// Initialize reveal animation
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(revealOnScroll, 100)
})
