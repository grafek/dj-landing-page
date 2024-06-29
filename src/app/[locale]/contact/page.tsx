import ContactForm from "@/src/components/ContactForm";
import type { Metadata } from "next";
import { PageWrapper } from "@/src/components/PageWrapper";
import Heading from "@/src/components/Heading";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "jackdahaus | contact",
  description: "Fill out the form to get in touch with me",
};

const ContactPage = () => {
  const t = useTranslations("Contact");
  return (
    <PageWrapper id="contact">
      <Heading level={1} className="pb-6 md:pb-8">
        {t("Heading")}
      </Heading>
      <ContactForm />
    </PageWrapper>
  );
};

export default ContactPage;
