// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    const spans = hamburger.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })

  // Initialize Lucide icons
  const lucide = window.lucide // Declare the variable before using it
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

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

  // Add scroll effect to header
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".step-card, .value-card, .testimonial-card")
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Add hover effects for cards
  const cards = document.querySelectorAll(".step-card, .value-card, .testimonial-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add click tracking for CTA buttons (you can replace with your analytics)
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add your analytics tracking here
      console.log("CTA clicked:", this.textContent.trim())
    })
  })

  // Add form validation if needed (placeholder for future forms)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Add loading states for buttons
  function addLoadingState(button) {
    const originalText = button.textContent
    button.textContent = "Loading..."
    button.disabled = true

    // Simulate loading (remove this in production)
    setTimeout(() => {
      button.textContent = originalText
      button.disabled = false
    }, 2000)
  }

  // Add parallax effect to hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const handleScroll = debounce(() => {
  // Add any scroll-based functionality here
}, 10)

window.addEventListener("scroll", handleScroll)

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navMenu = document.getElementById("navMenu")
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const hamburger = document.getElementById("hamburger")
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  }
})

// Add focus management for accessibility
document.addEventListener("DOMContentLoaded", () => {
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
  )

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #f59e0b"
      this.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", function () {
      this.style.outline = "none"
    })
  })
})
