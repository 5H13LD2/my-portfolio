import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { useContact } from "../hooks/useContact";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "jimenezjerico227@gmail.com",
    href: "mailto:jimenezjerico227@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Philippines",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "jerico-jimenez-a504852a4",
    href: "https://www.linkedin.com/in/jerico-jimenez-a504852a4/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/5H13LD2",
    href: "https://github.com/5H13LD2",
  },
];

export default function Contact() {
  const { error, form, submitting, success, submitContact, updateField } = useContact();

  return (
    <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-10 py-16 w-full">
      <div className="mb-12">
        <h2 className="text-[32px] sm:text-[36px] font-semibold text-[#f0f0f0] mb-3">Get In Touch</h2>
        <p className="text-sm sm:text-base text-[#888]">Have a project in mind? Let's talk.</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-[15px] text-[#d8d8d8] leading-[1.75] mb-8">
            I'm available for freelance work and open to discussing new opportunities. Whether you have a project in mind or just want to say hello, my inbox is always open.
          </p>

          <div className="space-y-3 mb-8">
            {contactLinks.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="w-9 h-9 rounded-lg bg-[#1f1f1f] border border-[#2a2a2a] flex items-center justify-center text-[#d8d8d8] flex-shrink-0">
                    <Icon size={17} />
                  </span>
                  <span className="text-sm text-[#d8d8d8] break-words">{item.value}</span>
                </>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-3 hover:text-white transition-colors">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            {contactLinks.slice(2).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] flex items-center justify-center text-[#888] hover:text-[#e5e5e5] hover:border-[#555] transition-colors"
                  aria-label={item.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <ContactForm
          error={error}
          form={form}
          submitting={submitting}
          success={success}
          onSubmit={submitContact}
          onUpdateField={updateField}
        />
      </div>
    </div>
  );
}
