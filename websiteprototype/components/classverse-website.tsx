"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Menu, X, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ClassverseWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("highlights");
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openEnrollDialog = (program?: string) => {
    if (program) {
      setSelectedProgram(program);
      setEnrollmentStep(1);
    } else {
      setSelectedProgram("");
      setEnrollmentStep(0);
    }
    setIsEnrollDialogOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        switch (prevTab) {
          case "highlights":
            return "projects";
          case "projects":
            return "overview";
          default:
            return "highlights";
        }
      });
    }, 5000); // Change tab every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#domains", label: "Domains" },
    { href: "#programs", label: "Programs" },
    { href: "#faqs", label: "FAQs" },
    { href: "#contact", label: "Contact" },
  ];

  const submitToGoogleForm = async (formData: any) => {
    const googleFormUrl = selectedProgram === "6-week"
      ? "https://docs.google.com/forms/d/e/1FAIpQLSfrpIoTnx4G8u0cNAVNWMFT_QO-rSoUKKYCWc6w7mixMH_jGQ/formResponse"
      : "https://docs.google.com/forms/d/e/1FAIpQLSdMW9tpaUGiq7Q4tF3r7zz60Np4rjfHc_Ol_kcVbkxQuriw6Q/formResponse";

    const formEntryIds = {
      name: "entry.2005620554",
      phone: "entry.1166974658",
      email: "entry.1045781291",
      institute: "entry.1065046570",
      transactionId: "entry.839337160",
    };

    const params = new URLSearchParams();
    params.append(formEntryIds.name, formData.name);
    params.append(formEntryIds.phone, formData.phone);
    params.append(formEntryIds.email, formData.email);
    params.append(formEntryIds.institute, formData.institute);
    params.append(formEntryIds.transactionId, formData.transactionId);

    try {
      const response = await fetch(`${googleFormUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
  };

  const handlePaymentConfirmation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    const success = await submitToGoogleForm(formDataObject);
    if (success) {
      setPaymentCompleted(true);
      setEnrollmentCompleted(true);
      setEnrollmentStep(4); // Move to the final step
    } else {
      // Handle error
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ClassVerse
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={`text-gray-600 hover:text-primary transition-colors ${
                  activeSection === item.href.slice(1) ? "font-bold" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Button className="hidden md:inline-flex" onClick={() => openEnrollDialog()}>Enroll Now</Button>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                className="block text-gray-600 hover:text-primary transition-colors"
                onClick={() => {
                  scrollToSection(item.href.slice(1));
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <Button className="w-full" onClick={() => {
              setIsMenuOpen(false);
              openEnrollDialog();
            }}>
              Enroll Now
            </Button>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empower Your Tech Career
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our intensive internship programs and gain hands-on
              experience in cutting-edge technologies.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("domains")}
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              About ClassVerse
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  ClassVerse is dedicated to empowering future innovators by
                  bridging the gap between academic learning and real-world
                  technology challenges. Through personalized mentorship and
                  hands-on training, we equip students with the tools they need
                  to succeed in the technology sector.
                </p>
                <p className="text-lg text-gray-600">
                  Our mission is to nurture the next generation of tech leaders
                  by providing affordable, high-quality learning experiences
                  that align with industry demands.
                </p>
              </div>
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Domains You'll Work On */}
        <section id="domains" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Domains You'll Work On
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "React JS",
                  description: "Build dynamic, responsive web applications",
                },
                {
                  title: "Generative AI",
                  description: "Work on cutting-edge AI models",
                },
                {
                  title: "Backend Development",
                  description: "Explore server-side programming",
                },
                {
                  title: "DevOps",
                  description: "Automate deployment processes",
                },
                {
                  title: "Cybersecurity",
                  description: "Secure digital systems",
                },
              ].map((domain, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold mb-4">{domain.title}</h3>
                  <p className="text-gray-600">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Offered Section */}
        <section id="programs" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Programs Offered</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-4">6-Week Program</h3>
                <p className="text-4xl font-bold mb-4">₹2,599</p>
                <ul className="mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>2 real-world projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Group mentoring sessions twice a week</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Completion certificate</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Email support and project feedback</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to learning materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic career guidance</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto" onClick={() => openEnrollDialog("6-week")}>
                  Enroll Now
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-4">15-Week Program</h3>
                <p className="text-4xl font-bold mb-4">₹3,899</p>
                <ul className="mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>All benefits of the 6-week program, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>4 advanced projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Final year project, along with hosting and project report provided</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Weekly 1-on-1 mentoring sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Premium certification with endorsements</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Full-time access to mentors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Full access to study materials and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive career support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Industry networking opportunities</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto" onClick={() => openEnrollDialog("15-week")}>
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Who can apply for the internship programs?
                </AccordionTrigger>
                <AccordionContent>
                  We welcome students in their first, second, third, and final year of study, as well as recent graduates. Our programs are designed to cater to various levels of experience and academic backgrounds in the tech industry.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What's the difference between the 6-week  and 15-week programs?
                </AccordionTrigger>
                <AccordionContent>
                  The 6-week program is an intensive introduction to tech skills
                  with 2 projects and group mentoring. The 15-week program
                  offers a more comprehensive experience with 4 advanced
                  projects, personalized mentoring, and extensive career
                  support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How much time should I dedicate to the program each week?
                </AccordionTrigger>
                <AccordionContent>
                  For the 6-week program, students are expected to dedicate about 2-3 hours per week for training classes. Optionally, if you're interested in applying what you've learned, we encourage you to spend around 5 hours per week working on your own projects. This will help reinforce the skills gained during the training. Similarly, for the 15-week program, you'll spend 2-3 hours per week in training and can choose to dedicate extra time to personal projects to enhance your learning experience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is the program fully online or in-person?
                </AccordionTrigger>
                <AccordionContent>
                  Our programs are designed to be completely online, with sessions scheduled on Saturdays and Sundays to provide maximum flexibility. This structure allows students from various locations to participate while effectively managing their studies and internships simultaneously.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How do I apply for the internship?
                </AccordionTrigger>
                <AccordionContent>
                  To apply, click the "Enroll Now" button on our website and fill
                  out the application form. Our team will review your
                  application and get back to you with the next steps in the
                  selection process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <div className="max-w-3xl mx-auto">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <Input id="phone" type="tel" placeholder="9019736603" />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input id="subject" placeholder="Your Subject" />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Other Ways to Reach Us
                </h3>
                <p className="mb-2">Email: info@classverse.com</p>
                <p className="mb-2">Phone: +91 9019736603</p>
                <p>Office: J.P Nagar, Bangalore, India</p>
              </div>
            </div>
          </div>
        </section>

        <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enroll in ClassVerse Internship</DialogTitle>
              <DialogDescription>
                {enrollmentStep === 0
                  ? "Choose your preferred program to start the enrollment process."
                  : enrollmentStep === 1
                  ? "Fill out this form to start your enrollment process."
                  : enrollmentStep === 2
                  ? "Complete your payment to finalize your enrollment. Verify UPI ID before making the payment: iasvijaykumargowdakk@okaxis"
                  : enrollmentStep === 3
                  ? "Confirm your payment details."
                  : "Thank you for enrolling!"}
              </DialogDescription>
            </DialogHeader>
            {enrollmentStep === 0 ? (
              <div className="space-y-4 mt-4">
                <Button className="w-full" onClick={() => {
                  setSelectedProgram("6-week");
                  setEnrollmentStep(1);
                }}>
                  6-Week Program
                </Button>
                <Button className="w-full" onClick={() => {
                  setSelectedProgram("15-week");
                  setEnrollmentStep(1);
                }}>
                  15-Week Program
                </Button>
              </div>
            ) : enrollmentStep === 1 ? (
              <form className="space-y-3 mt-4" onSubmit={(e) => {
                e.preventDefault();
                setEnrollmentStep(2);
              }}>
                <div>
                  <label
                    htmlFor="enroll-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input id="enroll-name" placeholder="Your Name" required />
                </div>
                <div>
                  <label
                    htmlFor="enroll-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Input id="enroll-phone" type="tel" placeholder="9019736603" required />
                </div>
                <div>
                  <label
                    htmlFor="enroll-institute"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institute Name
                  </label>
                  <Input
                    id="enroll-institute"
                    placeholder="Your institute name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="enroll-program"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Selected Program
                  </label>
                  <Input
                    id="enroll-program"
                    value={selectedProgram === "6-week" ? "6-Week Program" : "15-Week Program"}
                    disabled
                  />
                </div>
                <Button type="submit" className="w-full">
                  Proceed to Payment
                </Button>
              </form>
            ) : enrollmentStep === 2 ? (
              <div className="space-y-4 mt-4">
                <div className="text-center">
                  <p className="mb-4">Scan the QR code to make the payment:</p>
                  <Image
                    src={selectedProgram === "6-week" 
                      ? "https://drive.google.com/uc?export=view&id=1757-w45aNwPCPQdmWGuNK7P68_wtnZW8"
                      : "https://drive.google.com/uc?export=view&id=16pj2pXvBxE4mDbtshuuiQ9RJnVEJ4RrI"
                    }
                    alt="Payment QR Code"
                    width={500}
                    height={300}
                  />
                  {/*<p className="mt-4">Amount: ₹{selectedProgram === "6-week" ? "2,599" : "3,899"}</p>
                  <p className="mt-2">UPI ID: iasvijaykumargowdakk@okaxis</p>
                  */}
                </div>
                <Button className="w-full" onClick={() => setEnrollmentStep(3)}>
                  I have completed the payment
                </Button>
              </div>
            ) : enrollmentStep === 3 ? (
              <form className="space-y-3 mt-4" onSubmit={handlePaymentConfirmation}>
                <div>
                  <label
                    htmlFor="confirm-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input id="confirm-name" name="name" placeholder="Your Name" required />
                </div>
                <div>
                  <label
                    htmlFor="confirm-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Input id="confirm-phone" name="phone" type="tel" placeholder="9019736603" required />
                </div>
                <div>
                  <label
                    htmlFor="confirm-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input id="confirm-email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label
                    htmlFor="confirm-institute"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institute Name
                  </label>
                  <Input id="confirm-institute" name="institute" placeholder="Your institute name" required />
                </div>
                <div>
                  <label
                    htmlFor="transaction-id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Transaction ID
                  </label>
                  <Input id="transaction-id" name="transactionId" placeholder="Transaction ID" required />
                </div>
                <Button type="submit" className="w-full">
                  Confirm Payment
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4 mt-4">
                <p>Thank you for signing up with us!</p>
                <p>You will receive a confirmation message from our team confirming the payment.</p>
                <Button className="w-full" onClick={() => {
                  setIsEnrollDialogOpen(false);
                  setEnrollmentStep(1);
                  setPaymentCompleted(false);
                  setEnrollmentCompleted(false);
                }}>
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ClassVerse</h3>
              <p>
                Empowering future tech leaders through hands-on learning and
                mentorship.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href.slice(1))}
                      className="hover:text-primary-light transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@classverse.com</p>
              <p>Phone: +91 9019736603</p>
              <p>Office: J.P Nagar, Bangalore, India</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 ClassVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}