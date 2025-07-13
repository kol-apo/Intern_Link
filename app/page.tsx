import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, Zap, Target, Globe, TrendingUp, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InternLinkLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <span className="text-sm font-bold text-white">IL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">InternLink</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            <Link href="/platform">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  Connecting African Youth to{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Real Internship Opportunities
                  </span>
                </h1>
                <p className="text-lg text-gray-600 md:text-xl max-w-2xl">
                  InternLink empowers students and recent graduates across Africa by connecting them with internships
                  that match their skills, goals, and potential. Whether you're an aspiring intern or a company looking
                  for talent, InternLink makes it easy to find the right match.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-8 py-3"
                >
                  <Link href="/platform">Join the Platform</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 text-lg px-8 py-3 bg-transparent"
                >
                  <Link href="/platform">Post a Role</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="African youth collaborating on technology projects"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">2,500+ Students</p>
                    <p className="text-xs text-gray-500">Already connected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process connects talented African youth with meaningful internship opportunities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Students Submit Their CVs & Skills</h3>
                <p className="text-gray-600">
                  Students create profiles showcasing their skills, education, and career goals to help us understand
                  their potential and aspirations.
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 2: Organizations Post Internship Roles
                </h3>
                <p className="text-gray-600">
                  Companies and startups post detailed internship opportunities, specifying required skills and what
                  interns will learn and contribute.
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">2</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 3: InternLink Matches Candidates Automatically
                </h3>
                <p className="text-gray-600">
                  Our intelligent matching system connects the right students with the right opportunities based on
                  skills, interests, and career goals.
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-amber-600">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact/Value Proposition Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Why Choose InternLink?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building bridges between talent and opportunity across Africa
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Students</h3>
                <p className="text-gray-600 mb-4">
                  Practical experience that boosts your employability and helps you build the skills needed for your
                  dream career.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Real-world experience
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Skill development
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Career networking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Organizations</h3>
                <p className="text-gray-600 mb-4">
                  Access to a growing talent pool across Africa, with pre-screened candidates matched to your specific
                  needs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Quality talent pool
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Reduced hiring time
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Fresh perspectives
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
                <p className="text-gray-600 mb-4">
                  Our system connects you based on skills, goals, and interests, ensuring the best possible matches for
                  everyone.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                    AI-powered matching
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                    Skill-based pairing
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                    Goal alignment
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students and organizations who have found success through InternLink
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-amber-500 mb-4" />
                <p className="text-gray-600 mb-6 italic">
                  "I got my first internship through InternLink! The platform made it so easy to showcase my skills and
                  connect with the right company. Now I'm working as a full-time developer."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Amara Okafor</p>
                    <p className="text-sm text-gray-500">Software Developer, Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-amber-500 mb-4" />
                <p className="text-gray-600 mb-6 italic">
                  "InternLink helped us find amazing interns who brought fresh ideas to our startup. The matching system
                  really works - we found candidates who fit perfectly with our company culture."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">David Mensah</p>
                    <p className="text-sm text-gray-500">CTO, TechStart Ghana</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-amber-500 mb-4" />
                <p className="text-gray-600 mb-6 italic">
                  "The experience I gained through my InternLink placement was invaluable. I learned so much about
                  digital marketing and now I'm confident in my career path."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Fatima Kone</p>
                    <p className="text-sm text-gray-500">Marketing Specialist, Abidjan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-orange-100">
              Join thousands of African youth and organizations already using InternLink to build the future of work
              across the continent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                <Link href="/platform">Join as a Student</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/platform">Post Internships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <span className="text-sm font-bold text-white">IL</span>
                </div>
                <span className="text-xl font-bold">InternLink</span>
              </div>
              <p className="text-gray-400">
                Connecting African youth with meaningful internship opportunities across the continent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/platform" className="hover:text-white transition-colors">
                    Find Internships
                  </Link>
                </li>
                <li>
                  <Link href="/platform" className="hover:text-white transition-colors">
                    Post Opportunities
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 InternLink. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
