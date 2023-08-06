import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JACKDAHAUS | CONTACT",
  description: "Fill out the form to get in touch with me",
};

const ContactPage = () => {
  return (
    <>
      <h1 className="pb-6 font-mono text-2xl font-semibold tracking-wider md:text-5xl">
        Let&apos;s talk
      </h1>
      <ContactForm />
    </>
  );
};

export default ContactPage;
