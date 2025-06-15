import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, ArrowRight, CheckCircle, Star, Eye, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#22333b]/20 bg-[#f2f4f3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f2f4f3]/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 bg-[#22333b] rounded-lg flex items-center justify-center">
            <span className="text-[#f2f4f3] font-bold text-sm">N</span>
          </div>
          <span className="ml-2 text-xl font-bold text-[#0a0908]">nouvo</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#services" className="text-sm font-medium text-[#22333b] hover:text-[#5e503f] transition-colors">
            Services
          </Link>
          <Link href="#work" className="text-sm font-medium text-[#22333b] hover:text-[#5e503f] transition-colors">
            Portfolio
          </Link>
          <Link href="#about" className="text-sm font-medium text-[#22333b] hover:text-[#5e503f] transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-[#22333b] hover:text-[#5e503f] transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-[#f2f4f3] via-[#a9927d]/10 to-[#5e503f]/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4 bg-[#a9927d]/20 text-[#5e503f] border-[#a9927d]/30">
                  ✨ Custom Websites That Drive Results
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#0a0908]">
                  We Build Websites That Grow Your Business
                </h1>
                <p className="mx-auto max-w-[700px] text-[#22333b] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From business websites that increase sales to personal resume sites that land jobs, we create custom
                  digital solutions that expand your reach and drive real results.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#22333b] hover:bg-[#0a0908] text-[#f2f4f3]">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#22333b] text-[#22333b] hover:bg-[#22333b] hover:text-[#f2f4f3]"
                >
                  View Our Work
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#5e503f] mt-8">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                  <span>Custom Design</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                  <span>Results-Driven</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                  <span>Professional Service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-[#a9927d] text-[#5e503f]">
                  Our Services
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#0a0908]">
                  Digital Solutions That Drive Growth
                </h2>
                <p className="max-w-[900px] text-[#22333b] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're a business looking to increase sales or a professional seeking career advancement, we
                  create websites that deliver measurable results.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="group hover:shadow-lg transition-shadow border-[#a9927d]/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#a9927d]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-[#5e503f]" />
                  </div>
                  <CardTitle className="text-[#0a0908]">Business Websites</CardTitle>
                  <CardDescription className="text-[#22333b]">
                    Custom business websites designed to increase your digital footprint, attract customers, and drive
                    sales. Built for conversion and growth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-[#5e503f]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Lead Generation Focus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      SEO Optimized
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Mobile Responsive
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow border-[#a9927d]/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#a9927d]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-[#5e503f]" />
                  </div>
                  <CardTitle className="text-[#0a0908]">Resume Websites</CardTitle>
                  <CardDescription className="text-[#22333b]">
                    Transform your resume into a professional personal website that showcases your skills and helps you
                    stand out to employers and recruiters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-[#5e503f]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Professional Portfolio
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Custom Domain
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Easy to Share
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow border-[#a9927d]/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#a9927d]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6 text-[#5e503f]" />
                  </div>
                  <CardTitle className="text-[#0a0908]">AI ATS Optimization</CardTitle>
                  <CardDescription className="text-[#22333b]">
                    Optimize your existing resume to rank at the top of Applicant Tracking Systems. Our AI analyzes job
                    descriptions and restructures your resume for maximum ATS compatibility.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-[#5e503f]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      ATS Score Analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Keyword Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#a9927d]" />
                      Format Restructuring
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f4f3]">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#22333b]">150+</div>
                <div className="text-sm text-[#5e503f]">Websites Built</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#22333b]">300%</div>
                <div className="text-sm text-[#5e503f]">Avg. Lead Increase</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#22333b]">1-3 Days</div>
                <div className="text-sm text-[#5e503f]">Delivery Time</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#22333b]">98%</div>
                <div className="text-sm text-[#5e503f]">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-[#a9927d] text-[#5e503f]">
                  Our Work
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#0a0908]">
                  Results That Speak for Themselves
                </h2>
                <p className="max-w-[900px] text-[#22333b] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From business websites that drive sales to personal sites that land dream jobs, see how we've helped
                  our clients achieve their goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow border-[#a9927d]/20">
                <div className="aspect-video bg-gradient-to-br from-[#f2f4f3] to-[#a9927d]/20 relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Business Website Example"
                    width={500}
                    height={300}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0a0908]">Local Service Business</CardTitle>
                  <CardDescription className="text-[#22333b]">
                    A home services company website that increased online bookings by 400% and expanded their customer
                    base across three new cities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-[#a9927d] text-[#5e503f]">
                      <Eye className="h-4 w-4 mr-1" />
                      View Live
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#a9927d] text-[#5e503f]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-lg transition-shadow border-[#a9927d]/20">
                <div className="aspect-video bg-gradient-to-br from-[#f2f4f3] to-[#a9927d]/20 relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Resume Website Example"
                    width={500}
                    height={300}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0a0908]">Software Engineer Portfolio</CardTitle>
                  <CardDescription className="text-[#22333b]">
                    A developer's resume transformed into a stunning portfolio website that helped them land a senior
                    position at a Fortune 500 company.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-[#a9927d] text-[#5e503f]">
                      <Eye className="h-4 w-4 mr-1" />
                      View Live
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#a9927d] text-[#5e503f]">
                      <Users className="h-4 w-4 mr-1" />
                      Success Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="border-[#22333b] text-[#22333b] hover:bg-[#22333b] hover:text-[#f2f4f3]"
              >
                View Full Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f4f3]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-[#a9927d] text-[#5e503f]">
                  Success Stories
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#0a0908]">What Our Clients Say</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-[#a9927d]/20">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#a9927d] text-[#a9927d]" />
                    ))}
                  </div>
                  <CardDescription className="text-[#22333b]">
                    "Our new website has completely transformed our business. We're getting 5x more inquiries and our
                    revenue has doubled in just 6 months."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22333b] rounded-full flex items-center justify-center">
                      <span className="text-[#f2f4f3] font-semibold text-sm">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0908]">Sarah Mitchell</div>
                      <div className="text-sm text-[#5e503f]">CEO, GreenTech Solutions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#a9927d]/20">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#a9927d] text-[#a9927d]" />
                    ))}
                  </div>
                  <CardDescription className="text-[#22333b]">
                    "The ATS optimization service was a game-changer. My resume now consistently makes it past the
                    initial screening and I'm getting way more interviews."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22333b] rounded-full flex items-center justify-center">
                      <span className="text-[#f2f4f3] font-semibold text-sm">MJ</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0908]">Michael Johnson</div>
                      <div className="text-sm text-[#5e503f]">Marketing Manager</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#a9927d]/20">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#a9927d] text-[#a9927d]" />
                    ))}
                  </div>
                  <CardDescription className="text-[#22333b]">
                    "My personal website helped me land my dream job. Recruiters were impressed by the professional
                    presentation and it set me apart from other candidates."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22333b] rounded-full flex items-center justify-center">
                      <span className="text-[#f2f4f3] font-semibold text-sm">ER</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0908]">Emily Rodriguez</div>
                      <div className="text-sm text-[#5e503f]">Senior Designer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-[#22333b]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-[#f2f4f3]">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Grow Your Digital Presence?
                </h2>
                <p className="mx-auto max-w-[600px] text-[#a9927d] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you need a business website that drives sales or a personal site that advances your career, we
                  create custom solutions that deliver results.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-[#f2f4f3]/10 border-[#a9927d]/30 text-[#f2f4f3] placeholder:text-[#a9927d]"
                  />
                  <Button type="submit" className="bg-[#a9927d] hover:bg-[#5e503f] text-[#0a0908]">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-[#a9927d]">Free consultation • Custom quote</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#a9927d] hover:bg-[#5e503f] text-[#0a0908]">
                  Business Website
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#a9927d] text-[#a9927d] hover:bg-[#a9927d] hover:text-[#0a0908]"
                >
                  Personal Website
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#22333b]/20 bg-[#f2f4f3]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#22333b] rounded flex items-center justify-center">
            <span className="text-[#f2f4f3] font-bold text-xs">N</span>
          </div>
          <span className="text-sm font-semibold text-[#0a0908]">nouvo</span>
        </div>
        <p className="text-xs text-[#5e503f] sm:ml-4">© {new Date().getFullYear()} Nouvo. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#5e503f]">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#5e503f]">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#5e503f]">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
