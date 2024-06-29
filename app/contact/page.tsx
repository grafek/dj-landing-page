import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/PageWrapper";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "jackdahaus | contact",
  description: "Fill out the form to get in touch with me",
};

const ContactPage = () => {
  return (
    <PageWrapper id="contact">
      <Heading level={1} className="pb-6 md:pb-8">
        Let&apos;s talk
      </Heading>
      <ContactForm />
    </PageWrapper>
  );
};

export default ContactPage;
