import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "JACKDAHAUS | CONTACT",
  description: "Fill out the form to get in touch with me",
};

const ContactPage = () => {
  return (
    <PageWrapper>
      <h1 className="pb-6 font-mono text-2xl font-semibold tracking-wider md:text-5xl">
        Let&apos;s talk
      </h1>
      <ContactForm />
    </PageWrapper>
  );
};

export default ContactPage;
