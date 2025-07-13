// Platform Application State
class PlatformApp {
  constructor() {
    this.currentUser = null
    this.currentSection = "auth"
    this.userType = null
    this.skills = []
    this.requiredSkills = []
    this.mockInterns = this.generateMockInterns()
    this.init()
  }

  init() {
    this.initializeElements()
    this.setupEventListeners()
    this.initializeLucideIcons()
    this.loadTheme()
  }

  initializeElements() {
    // Sections
    this.authSection = document.getElementById("authSection")
    this.userTypeSection = document.getElementById("userTypeSection")
    this.internFormSection = document.getElementById("internFormSection")
    this.organizationFormSection = document.getElementById("organizationFormSection")
    this.successSection = document.getElementById("successSection")

    // Forms
    this.signinForm = document.getElementById("signinForm")
    this.signupForm = document.getElementById("signupForm")
    this.internForm = document.getElementById("internForm")
    this.organizationForm = document.getElementById("organizationForm")

    // Toast container
    this.toastContainer = document.getElementById("toastContainer")
  }

  setupEventListeners() {
    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", () => this.toggleTheme())

    // Auth tabs
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => this.switchAuthTab(e.target.dataset.tab))
    })

    // Auth links
    document.querySelectorAll(".auth-link a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.switchAuthTab(e.target.dataset.tab)
      })
    })

    // Forms
    this.signinForm.addEventListener("submit", (e) => this.handleSignin(e))
    this.signupForm.addEventListener("submit", (e) => this.handleSignup(e))
    this.internForm.addEventListener("submit", (e) => this.handleInternSubmission(e))
    this.organizationForm.addEventListener("submit", (e) => this.handleOrganizationSubmission(e))

    // User type selection
    document.querySelectorAll(".user-type-card").forEach((card) => {
      card.addEventListener("click", () => this.selectUserType(card.dataset.type))
    })

    // Back buttons
    document.getElementById("backToUserType").addEventListener("click", () => this.showSection("userType"))
    document.getElementById("backToUserTypeOrg").addEventListener("click", () => this.showSection("userType"))

    // Skills input
    this.setupSkillsInput("skillsInput", "skillsDisplay", "skills")
    this.setupSkillsInput("requiredSkillsInput", "requiredSkillsDisplay", "requiredSkills")

    // File upload
    this.setupFileUpload()

    // Success actions
    document.getElementById("submitAnother").addEventListener("click", () => this.resetToUserType())
  }

  initializeLucideIcons() {
    const lucide = window.lucide // Declare the lucide variable here
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  // Theme Management
  loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
  }

  updateThemeIcon(theme) {
    const icon = document.querySelector(".theme-icon")
    if (icon) {
      icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon")
      const lucide = window.lucide // Declare the lucide variable here
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    }
  }

  // Navigation
  showSection(section) {
    // Hide all sections
    document.querySelectorAll(".auth-section, .user-type-section, .form-section, .success-section").forEach((s) => {
      s.classList.add("hidden")
    })

    // Show target section
    switch (section) {
      case "auth":
        this.authSection.classList.remove("hidden")
        break
      case "userType":
        this.userTypeSection.classList.remove("hidden")
        break
      case "internForm":
        this.internFormSection.classList.remove("hidden")
        break
      case "organizationForm":
        this.organizationFormSection.classList.remove("hidden")
        break
      case "success":
        this.successSection.classList.remove("hidden")
        break
    }

    this.currentSection = section
  }

  switchAuthTab(tab) {
    // Update tab buttons
    document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"))
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active")

    // Update forms
    document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"))
    document.getElementById(`${tab}Form`).classList.add("active")
  }

  selectUserType(type) {
    this.userType = type
    if (type === "intern") {
      this.showSection("internForm")
      this.prefillInternForm()
    } else {
      this.showSection("organizationForm")
      this.prefillOrganizationForm()
    }
  }

  resetToUserType() {
    this.userType = null
    this.skills = []
    this.requiredSkills = []
    this.resetForms()
    this.showSection("userType")
  }

  // Authentication
  async handleSignin(e) {
    e.preventDefault()
    const button = e.target.querySelector('button[type="submit"]')
    this.setButtonLoading(button, true)

    const email = document.getElementById("signinEmail").value
    const password = document.getElementById("signinPassword").value

    // Clear previous errors
    this.clearFormErrors("signin")

    // Validate
    if (!this.validateEmail(email)) {
      this.showFieldError("signinEmailError", "Please enter a valid email address")
      this.setButtonLoading(button, false)
      return
    }

    if (password.length < 6) {
      this.showFieldError("signinPasswordError", "Password must be at least 6 characters")
      this.setButtonLoading(button, false)
      return
    }

    // Simulate API call
    await this.delay(1500)

    // Mock authentication
    this.currentUser = { email, name: "User" }
    this.showToast("Welcome back!", "success")
    this.setButtonLoading(button, false)
    this.showSection("userType")
  }

  async handleSignup(e) {
    e.preventDefault()
    const button = e.target.querySelector('button[type="submit"]')
    this.setButtonLoading(button, true)

    const name = document.getElementById("signupName").value
    const email = document.getElementById("signupEmail").value
    const password = document.getElementById("signupPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    // Clear previous errors
    this.clearFormErrors("signup")

    // Validate
    let hasErrors = false

    if (name.trim().length < 2) {
      this.showFieldError("signupNameError", "Name must be at least 2 characters")
      hasErrors = true
    }

    if (!this.validateEmail(email)) {
      this.showFieldError("signupEmailError", "Please enter a valid email address")
      hasErrors = true
    }

    if (password.length < 6) {
      this.showFieldError("signupPasswordError", "Password must be at least 6 characters")
      hasErrors = true
    }

    if (password !== confirmPassword) {
      this.showFieldError("confirmPasswordError", "Passwords do not match")
      hasErrors = true
    }

    if (hasErrors) {
      this.setButtonLoading(button, false)
      return
    }

    // Simulate API call
    await this.delay(1500)

    // Mock registration
    this.currentUser = { email, name }
    this.showToast("Account created successfully!", "success")
    this.setButtonLoading(button, false)
    this.showSection("userType")
  }

  // Form Submissions
  async handleInternSubmission(e) {
    e.preventDefault()
    const button = e.target.querySelector('button[type="submit"]')
    this.setButtonLoading(button, true)

    // Get form data
    const formData = {
      name: document.getElementById("internName").value,
      email: document.getElementById("internEmail").value,
      education: document.getElementById("educationLevel").value,
      skills: this.skills,
      cv: document.getElementById("cvUpload").files[0],
      desiredRole: document.getElementById("desiredRole").value,
      openTo: document.getElementById("openTo").value,
    }

    // Clear previous errors
    this.clearFormErrors("intern")

    // Validate
    if (!this.validateInternForm(formData)) {
      this.setButtonLoading(button, false)
      return
    }

    // Simulate API call
    await this.delay(2000)

    this.setButtonLoading(button, false)
    this.showSuccessPage("intern", "Thank you! Your profile has been submitted successfully.")
  }

  async handleOrganizationSubmission(e) {
    e.preventDefault()
    const button = e.target.querySelector('button[type="submit"]')
    this.setButtonLoading(button, true)

    // Get form data
    const formData = {
      orgName: document.getElementById("orgName").value,
      orgEmail: document.getElementById("orgEmail").value,
      roleTitle: document.getElementById("roleTitle").value,
      jobDescription: document.getElementById("jobDescription").value,
      requiredSkills: this.requiredSkills,
      internshipType: document.getElementById("internshipType").value,
    }

    // Clear previous errors
    this.clearFormErrors("organization")

    // Validate
    if (!this.validateOrganizationForm(formData)) {
      this.setButtonLoading(button, false)
      return
    }

    // Simulate API call
    await this.delay(2000)

    this.setButtonLoading(button, false)
    this.showSuccessPage("organization", "Your role has been posted successfully!")
    this.showMatchedInterns(formData.requiredSkills)
  }

  // Skills Management
  setupSkillsInput(inputId, displayId, skillsArray) {
    const input = document.getElementById(inputId)
    const display = document.getElementById(displayId)

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        const skill = input.value.trim()
        if (skill && !this[skillsArray].includes(skill)) {
          this[skillsArray].push(skill)
          this.renderSkills(display, this[skillsArray], skillsArray)
          input.value = ""
        }
      }
    })
  }

  renderSkills(container, skills, skillsArray) {
    container.innerHTML = skills
      .map(
        (skill, index) => `
        <div class="tag">
          ${skill}
          <button type="button" class="tag-remove" onclick="app.removeSkill('${skillsArray}', ${index})">
            <i data-lucide="x"></i>
          </button>
        </div>
      `,
      )
      .join("")

    // Re-initialize icons
    const lucide = window.lucide // Declare the lucide variable here
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  removeSkill(skillsArray, index) {
    this[skillsArray].splice(index, 1)
    const display = document.getElementById(skillsArray === "skills" ? "skillsDisplay" : "requiredSkillsDisplay")
    this.renderSkills(display, this[skillsArray], skillsArray)
  }

  // File Upload
  setupFileUpload() {
    const fileInput = document.getElementById("cvUpload")
    const uploadDisplay = document.querySelector(".file-upload-display")
    const uploadText = document.querySelector(".upload-text")
    const fileName = document.querySelector(".file-name")

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        uploadText.classList.add("hidden")
        fileName.textContent = file.name
        fileName.classList.remove("hidden")
        uploadDisplay.style.borderColor = "var(--success)"
      } else {
        uploadText.classList.remove("hidden")
        fileName.classList.add("hidden")
        uploadDisplay.style.borderColor = "var(--border)"
      }
    })
  }

  // Form Prefilling
  prefillInternForm() {
    if (this.currentUser) {
      document.getElementById("internEmail").value = this.currentUser.email
      if (this.currentUser.name) {
        document.getElementById("internName").value = this.currentUser.name
      }
    }
  }

  prefillOrganizationForm() {
    if (this.currentUser) {
      document.getElementById("orgEmail").value = this.currentUser.email
    }
  }

  // Validation
  validateInternForm(data) {
    let isValid = true

    if (!data.name.trim()) {
      this.showFieldError("internNameError", "Full name is required")
      isValid = false
    }

    if (!this.validateEmail(data.email)) {
      this.showFieldError("internEmailError", "Please enter a valid email address")
      isValid = false
    }

    if (!data.education) {
      this.showFieldError("educationLevelError", "Please select your education level")
      isValid = false
    }

    if (data.skills.length === 0) {
      this.showFieldError("skillsError", "Please add at least one skill")
      isValid = false
    }

    if (!data.cv) {
      this.showFieldError("cvUploadError", "Please upload your CV")
      isValid = false
    }

    if (!data.desiredRole.trim()) {
      this.showFieldError("desiredRoleError", "Please specify your desired role")
      isValid = false
    }

    if (!data.openTo) {
      this.showFieldError("openToError", "Please select your preference")
      isValid = false
    }

    return isValid
  }

  validateOrganizationForm(data) {
    let isValid = true

    if (!data.orgName.trim()) {
      this.showFieldError("orgNameError", "Organization name is required")
      isValid = false
    }

    if (!this.validateEmail(data.orgEmail)) {
      this.showFieldError("orgEmailError", "Please enter a valid email address")
      isValid = false
    }

    if (!data.roleTitle.trim()) {
      this.showFieldError("roleTitleError", "Role title is required")
      isValid = false
    }

    if (!data.jobDescription.trim()) {
      this.showFieldError("jobDescriptionError", "Job description is required")
      isValid = false
    }

    if (data.requiredSkills.length === 0) {
      this.showFieldError("requiredSkillsError", "Please add at least one required skill")
      isValid = false
    }

    if (!data.internshipType) {
      this.showFieldError("internshipTypeError", "Please select internship type")
      isValid = false
    }

    return isValid
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Success Page
  showSuccessPage(type, message) {
    document.getElementById("successTitle").textContent = "Success!"
    document.getElementById("successMessage").textContent = message
    this.showSection("success")
  }

  showMatchedInterns(requiredSkills) {
    const matchedInterns = this.findMatchedInterns(requiredSkills)
    const matchedSection = document.getElementById("matchedInterns")
    const internsGrid = document.getElementById("internsGrid")

    if (matchedInterns.length > 0) {
      internsGrid.innerHTML = matchedInterns
        .map(
          (intern) => `
        <div class="intern-card">
          <div class="intern-name">${intern.name}</div>
          <div class="intern-education">${intern.education}</div>
          <div class="intern-skills">
            ${intern.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
          </div>
          <div class="intern-role">Interested in: ${intern.desiredRole}</div>
          <div class="intern-preference">
            <i data-lucide="dollar-sign"></i>
            ${intern.openTo}
          </div>
        </div>
      `,
        )
        .join("")

      matchedSection.classList.remove("hidden")

      // Re-initialize icons
      const lucide = window.lucide // Declare the lucide variable here
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    }
  }

  findMatchedInterns(requiredSkills) {
    return this.mockInterns
      .filter((intern) => {
        const matchingSkills = intern.skills.filter((skill) =>
          requiredSkills.some((reqSkill) => reqSkill.toLowerCase().includes(skill.toLowerCase())),
        )
        return matchingSkills.length > 0
      })
      .slice(0, 6) // Limit to 6 matches
  }

  // Mock Data
  generateMockInterns() {
    const names = [
      "Amara Okafor",
      "Kwame Asante",
      "Fatima Kone",
      "David Mensah",
      "Aisha Mwangi",
      "Emmanuel Osei",
      "Zara Abdullahi",
      "Joseph Nkomo",
      "Kemi Adebayo",
      "Samuel Banda",
    ]

    const skills = [
      ["JavaScript", "React", "Node.js"],
      ["Python", "Django", "Machine Learning"],
      ["Java", "Spring Boot", "MySQL"],
      ["HTML", "CSS", "JavaScript", "Vue.js"],
      ["React Native", "Flutter", "Mobile Development"],
      ["Digital Marketing", "SEO", "Social Media"],
      ["Graphic Design", "Adobe Creative Suite", "UI/UX"],
      ["Data Analysis", "Excel", "Power BI"],
      ["Content Writing", "Copywriting", "WordPress"],
      ["Project Management", "Agile", "Scrum"],
    ]

    const educationLevels = ["High School", "Undergraduate", "Graduate"]
    const roles = [
      "Software Development",
      "Web Development",
      "Mobile Development",
      "Digital Marketing",
      "Graphic Design",
      "Data Analysis",
      "Content Creation",
      "Project Management",
    ]
    const preferences = ["Paid", "Unpaid", "Both"]

    return names.map((name, index) => ({
      name,
      education: educationLevels[index % educationLevels.length],
      skills: skills[index % skills.length],
      desiredRole: roles[index % roles.length],
      openTo: preferences[index % preferences.length],
    }))
  }

  // Utility Functions
  setButtonLoading(button, loading) {
    const text = button.querySelector(".btn-text")
    const loader = button.querySelector(".btn-loader")

    if (loading) {
      text.style.opacity = "0"
      loader.classList.remove("hidden")
      button.disabled = true
    } else {
      text.style.opacity = "1"
      loader.classList.add("hidden")
      button.disabled = false
    }
  }

  showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId)
    if (errorElement) {
      errorElement.textContent = message
    }
  }

  clearFormErrors(formType) {
    const errorElements = document.querySelectorAll(`#${formType}Form .error-message`)
    errorElements.forEach((element) => {
      element.textContent = ""
    })
  }

  resetForms() {
    document.querySelectorAll("form").forEach((form) => form.reset())
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = ""
    })
    document.querySelectorAll(".tags-display").forEach((display) => {
      display.innerHTML = ""
    })

    // Reset file upload display
    const uploadText = document.querySelector(".upload-text")
    const fileName = document.querySelector(".file-name")
    if (uploadText && fileName) {
      uploadText.classList.remove("hidden")
      fileName.classList.add("hidden")
    }
  }

  showToast(message, type = "success") {
    const toast = document.createElement("div")
    toast.className = `toast ${type}`

    const iconName = type === "success" ? "check-circle" : type === "error" ? "x-circle" : "alert-circle"

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <span class="toast-message">${message}</span>
      <button class="toast-close">
        <i data-lucide="x"></i>
      </button>
    `

    this.toastContainer.appendChild(toast)

    // Initialize icons
    const lucide = window.lucide // Declare the lucide variable here
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 5000)

    // Close button functionality
    const closeButton = toast.querySelector(".toast-close")
    closeButton.addEventListener("click", () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    })
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Initialize the application
const app = new PlatformApp()

// Global functions for template usage
window.app = app

// Handle browser back/forward buttons
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.section) {
    app.showSection(e.state.section)
  }
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Escape key to go back
  if (e.key === "Escape") {
    if (app.currentSection === "internForm" || app.currentSection === "organizationForm") {
      app.showSection("userType")
    } else if (app.currentSection === "userType") {
      app.showSection("auth")
    }
  }

  // Ctrl/Cmd + Enter to submit forms
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const activeForm = document.querySelector("form:not(.hidden)")
    if (activeForm) {
      const submitButton = activeForm.querySelector('button[type="submit"]')
      if (submitButton && !submitButton.disabled) {
        submitButton.click()
      }
    }
  }
})

// Add form auto-save functionality
let autoSaveTimeout
function autoSave() {
  clearTimeout(autoSaveTimeout)
  autoSaveTimeout = setTimeout(() => {
    const formData = {}

    // Save current form data to localStorage
    if (app.currentSection === "internForm") {
      formData.internName = document.getElementById("internName").value
      formData.internEmail = document.getElementById("internEmail").value
      formData.educationLevel = document.getElementById("educationLevel").value
      formData.desiredRole = document.getElementById("desiredRole").value
      formData.openTo = document.getElementById("openTo").value
      formData.skills = app.skills
      localStorage.setItem("internFormData", JSON.stringify(formData))
    } else if (app.currentSection === "organizationForm") {
      formData.orgName = document.getElementById("orgName").value
      formData.orgEmail = document.getElementById("orgEmail").value
      formData.roleTitle = document.getElementById("roleTitle").value
      formData.jobDescription = document.getElementById("jobDescription").value
      formData.internshipType = document.getElementById("internshipType").value
      formData.requiredSkills = app.requiredSkills
      localStorage.setItem("organizationFormData", JSON.stringify(formData))
    }
  }, 1000)
}

// Add input listeners for auto-save
document.addEventListener("input", autoSave)

// Load saved form data on page load
window.addEventListener("load", () => {
  const savedInternData = localStorage.getItem("internFormData")
  const savedOrgData = localStorage.getItem("organizationFormData")

  if (savedInternData) {
    try {
      const data = JSON.parse(savedInternData)
      // Data will be loaded when intern form is shown
      app.savedInternData = data
    } catch (e) {
      console.warn("Failed to load saved intern data")
    }
  }

  if (savedOrgData) {
    try {
      const data = JSON.parse(savedOrgData)
      // Data will be loaded when organization form is shown
      app.savedOrgData = data
    } catch (e) {
      console.warn("Failed to load saved organization data")
    }
  }
})

// Clear saved data after successful submission
function clearSavedData(type) {
  if (type === "intern") {
    localStorage.removeItem("internFormData")
  } else if (type === "organization") {
    localStorage.removeItem("organizationFormData")
  }
}

// Add this to the success handlers
const originalShowSuccessPage = app.showSuccessPage
app.showSuccessPage = function (type, message) {
  clearSavedData(type)
  originalShowSuccessPage.call(this, type, message)
}
