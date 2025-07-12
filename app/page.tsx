"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Download, ExternalLink, Code, Cpu, Globe, Smartphone, Brain, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('Form submitted with data:', data);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('API Response:', { status: response.status, result });

      if (response.ok) {
        form.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // Hide after 5 seconds
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Optionally show error state here if needed
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="/" className="gradient-text">
              Alecx
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="https://github.com/alecxanderblade890" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/alecxander-jamille-andaya-b241182b2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="hidden md:flex gap-2" asChild>
              <Link href="/alecxander_jamille_andaya_resume.pdf" download>
                <Download className="h-4 w-4" />
                Resume
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I'm</h1>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="gradient-text">Alecxander Jamille Andaya</span>
              </h1>
              <h2>Software Engineer and Robotics Developer</h2>
              <p className="text-xl text-muted-foreground">
                I build exceptional digital experiences and innovative robotic solutions.
              </p>
              <div className="flex gap-4 pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-vibrant-purple to-vibrant-blue hover:opacity-90 transition-opacity"
                >
                  <Link href="#contact">Get in touch</Link>
                </Button>
                <Button variant="outline" asChild className="gradient-border">
                  <Link href="#projects">View my work</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20">
                <Image src="/images/profile.png" alt="Profile" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-muted/50 py-16 md:py-24">
          <div className="container space-y-6">
            <div className="space-y-2 text-center">
              <Badge variant="outline" className="px-3 py-1 text-sm gradient-border">
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">My Background</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg">
                  I build scalable solutions using Next.js, Laravel, Firebase, Node.js, and Flutter—bridging AI research
                  with real-world applications. My background in freelancing and tech consulting has sharpened my
                  problem-solving skills, turning complex challenges into clean, impactful code. Recently, my team
                  placed 3rd in the Philippine Startup Challenge Region 6 (2024), proving my ability to deliver
                  practical innovation.
                </p>
                <p className="text-lg">
                  Driven by the belief that "with technology, the only limit is your imagination," I’m honing my skills
                  in AI-driven development while working toward my ultimate goal: launching a boundary-pushing software
                  startup.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="gradient-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <Code className="h-8 w-8 text-vibrant-purple" />
                    <h3 className="font-bold">Web Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating responsive, accessible, and performant web applications
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <Cpu className="h-8 w-8 text-vibrant-blue" />
                    <h3 className="font-bold">Robotics</h3>
                    <p className="text-sm text-muted-foreground">Building and programming autonomous robotic systems</p>
                  </CardContent>
                </Card>
                <Card className="gradient-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <Smartphone className="h-8 w-8 text-vibrant-teal" />
                    <h3 className="font-bold">App Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Developing cross-platform mobile and desktop applications
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <Brain className="h-8 w-8 text-vibrant-pink" />
                    <h3 className="font-bold">AI Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Integrate AI technologies with real world software applications
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24">
          <div className="container space-y-8">
            <div className="space-y-2 text-center">
              <Badge variant="outline" className="px-3 py-1 text-sm gradient-border">
                My Expertise
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Skills & Technologies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I've worked with a wide range of technologies across web development, robotics, and application
                development.
              </p>
            </div>

            <Tabs defaultValue="web" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="robotics">Robotics</TabsTrigger>
                <TabsTrigger value="apps">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="web" className="mt-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Tailwind CSS",
                    "Laravel",
                    "PHP"
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:border-vibrant-purple transition-colors"
                    >
                      <Globe className="h-4 w-4 text-vibrant-purple" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  My web development stack focuses on modern JavaScript frameworks with an emphasis on performance,
                  accessibility, and responsive design. I build scalable frontend and backend solutions.
                </p>
              </TabsContent>
              <TabsContent value="robotics" className="mt-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "IoT",
                    "Python",
                    "C++",
                    "Arduino",
                    "Computer Vision",
                    "Sensor Integration",
                    "Control Systems",
                    "Simulation",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:border-vibrant-blue transition-colors"
                    >
                      <Cpu className="h-4 w-4 text-vibrant-blue" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  In robotics, I specialize in developing control systems, integrating sensors, and implementing
                  computer vision solutions. I work with both hardware and software components.
                </p>
              </TabsContent>
              <TabsContent value="apps" className="mt-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Android Studio", "Flutter", "Java", "Firebase"].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:border-vibrant-teal transition-colors"
                    >
                      <Smartphone className="h-4 w-4 text-vibrant-teal" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  For application development, I build cross-platform mobile apps and desktop applications with a focus
                  on user experience, performance, and maintainability.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-muted/50 py-16 md:py-24">
          <div className="container space-y-8">
            <div className="space-y-2 text-center">
              <Badge variant="outline" className="px-3 py-1 text-sm gradient-border">
                My Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A selection of my recent work across web development, robotics, and application development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image
                    src="/images/spotify_ai_logo.png"
                    alt="Spotify Playlist Generator"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Spotify Playlist Generator</h3>
                      <Badge className="bg-vibrant-purple hover:bg-vibrant-purple/90">Web</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      A website that integrates Gemini API to generate and automatically add a playlist for you in your
                      spotify account.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">HTML/CSS/JS</Badge>
                    <Badge variant="secondary">Node.js/Express</Badge>
                    <Badge variant="secondary">API</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://spotify-playlist-generator-qgdp.onrender.com" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/Spotify-Playlist-Generator.git" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 2 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image src="/images/inkwell_logo.png" alt="Inkwell" fill className="object-cover" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Inkwell</h3>
                      <Badge className="bg-vibrant-orange hover:bg-vibrant-orange/90">Web App</Badge>
                    </div>
                    <p className="text-muted-foreground">
                    Inkwell is an AI-powered web application built with Laravel that generates professional, personalized cover letters in seconds. 
                    Simply upload your resume (PDF), paste a job description, and choose your preferred writing style.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Laravel</Badge>
                    <Badge variant="secondary">PHP</Badge>
                    <Badge variant="secondary">Railway</Badge>
                    <Badge variant="secondary">Gemini API</Badge>
                  </div>
                  <div className="flex gap-2">
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://inkwell-production-94b8.up.railway.app/" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/Inkwell.git" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 3 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image src="/images/neurowarn_logo.png" alt="Neurowarn" fill className="object-cover" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Neurowarn(Thesis Project)</h3>
                      <Badge className="bg-vibrant-green hover:bg-vibrant-green/90">Web</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      An web app that warns the user of obstacles using EEG signals from the brain to be processed by an
                      RNN-LSTM model.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Arduino</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">EmotivAPI</Badge>
                    <Badge variant="secondary">RNN-LSTM</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="#" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="#" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Project 4 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image
                    src="/images/vita_logo.jpeg"
                    alt="VITA(VIrtual Teaching Application)"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">VITA(VIrtual Teaching Application)</h3>
                      <Badge className="bg-vibrant-teal hover:bg-vibrant-teal/90">Mobile</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      A mobile application designed to teach students their lessons in school digitally. Made when I was
                      first starting to program mobile apps.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Android Studio</Badge>
                    <Badge variant="secondary">Java</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/VITA" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/VITA" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 5 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image
                    src="/images/siquijor_logo.png"
                    alt="Siquijor Promotional Site"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Siquijor Promotional Site</h3>
                      <Badge className="bg-vibrant-purple hover:bg-vibrant-purple/90">Web</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      An informational website to promote the beauty of Siquijor and to attract tourists to visit.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">HTML</Badge>
                    <Badge variant="secondary">CSS</Badge>
                    <Badge variant="secondary">JS</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://vigilant-lichterman-dba4ac.netlify.app/" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/Siquijor-Promotion-Site" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 6 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow gradient-border">
                <div className="relative aspect-video">
                  <Image src="/images/badyet_logo.png" alt="Badyet" fill className="object-cover" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Badyet</h3>
                      <Badge className="bg-vibrant-teal hover:bg-vibrant-teal/90">Mobile</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      A budgeting app for students to manage their everyday expenses.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Dart</Badge>
                    <Badge variant="secondary">Flutter</Badge>
                    <Badge variant="secondary">Hive</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/Badyet" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href="https://github.com/alecxanderblade890/Badyet" target="_blank">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>          
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild className="gradient-border">
                <Link href="https://github.com/alecxanderblade890?tab=repositories" target="_blank">
                  View All Projects on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24">
          <div className="container space-y-8">
            <div className="space-y-2 text-center">
              <Badge variant="outline" className="px-3 py-1 text-sm gradient-border">
                My Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Work Experience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My professional journey across various roles and organizations.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Experience 1 */}
              <div className="relative pl-8 border-l-2 border-vibrant-purple pb-8">
                <div className="absolute w-4 h-4 bg-vibrant-purple rounded-full -left-[9px] top-1"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">Software Development Intern</h3>
                    <Badge variant="outline" className="gradient-border">
                      January 20, 2025 - April 25, 2025
                    </Badge>
                  </div>
                  <p className="font-medium">Callbox Inc.</p>
                  <p className="text-muted-foreground">
                    Created dev/software tools for agents to streamline their work in marketing solutions and created a
                    chatbot with company knowledge for faster and easier inquiry from the agents.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">Laravel</Badge>
                    <Badge variant="secondary">Gemini API</Badge>
                    <Badge variant="secondary">MySQL</Badge>
                    <Badge variant="secondary">PHP</Badge>
                  </div>
                </div>
              </div>

              {/* Experience 2 */}
              <div className="relative pl-8 border-l-2 border-vibrant-blue pb-8">
                <div className="absolute w-4 h-4 bg-vibrant-blue rounded-full -left-[9px] top-1"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">Robotics Consulting</h3>
                    <Badge variant="outline" className="gradient-border">
                      April 2023 - May 2023
                      <br />
                      April 2024 - May 2024
                    </Badge>
                  </div>
                  <p className="font-medium">Freelance Work</p>
                  <p className="text-muted-foreground">
                    I provided design and consultation services for robotic Arduino projects tailored for college
                    students, with a particular focus on innovative healthcare applications. From initial concept
                    development to final implementation, I guide students through the intricate process of creating
                    impactful and educational robotics solutions designed to address real-world healthcare challenges.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">Arduino</Badge>
                    <Badge variant="secondary">Firebase</Badge>
                  </div>
                </div>
              </div>

              {/* Experience 3 */}
              <div className="relative pl-8 border-l-2 border-vibrant-teal">
                <div className="absolute w-4 h-4 bg-vibrant-teal rounded-full -left-[9px] top-1"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">Board Member for Research and Development</h3>
                    <Badge variant="outline" className="gradient-border">
                      2022 - 2024
                    </Badge>
                  </div>
                  <p className="font-medium">Cyb Robotics Organization</p>
                  <p className="text-muted-foreground">
                    Managed multiple robotics projects, including the development of a water quality monitoring system
                    and developed personal robotics projects like RFID and RC car development. Developed projects that
                    would introduce and boost the organization’s reputation and notoriety.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">Arduino</Badge>
                    <Badge variant="secondary">Electronics/Electrical Systems</Badge>
                    <Badge variant="secondary">Firebase</Badge>
                    <Badge variant="secondary">Project Management</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" asChild className="gradient-border">
                <Link href="/alecxander_jamille_andaya_resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Resume
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-2 text-center">
                <Badge variant="outline" className="px-3 py-1 text-sm gradient-border">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Contact Me</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="gradient-border">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-vibrant-purple" />
                        <p>alecxanderandaya6@gmail.com</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin className="h-5 w-5 text-vibrant-teal" />
                        <p>linkedin.com/in/alecxander-jamille-andaya-b241182b2</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Github className="h-5 w-5 text-vibrant-pink" />
                        <p>github.com/alecxanderblade890</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">Connect with me</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="hover:border-vibrant-purple hover:text-vibrant-purple transition-colors"
                        >
                          <Link href="https://github.com/alecxanderblade890" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="hover:border-vibrant-blue hover:text-vibrant-blue transition-colors"
                        >
                          <Link
                            href="https://www.linkedin.com/in/alecxander-jamille-andaya-b241182b2/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="hover:border-vibrant-teal hover:text-vibrant-teal transition-colors"
                        ></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-border">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Send Me a Message</h3>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your name"
                            {...form.register('name')}
                          />
                          {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your email"
                            {...form.register('email')}
                          />
                          {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your message"
                            {...form.register('message')}
                          />
                          {form.formState.errors.message && (
                            <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </>
                          )}
                        </button>
                        {showSuccess && (
                          <div className="text-center text-sm text-white-600 dark:text-green-400 transition-opacity duration-300">
                            I'll get back to you ASAP! Thank you for contacting.
                          </div>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alecxander Jamille Andaya. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
