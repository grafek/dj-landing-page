import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import withPageWrapper from "@/hoc/PageWrap";
import { NextPage } from "next";

const ContactPage: NextPage = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // add form validation and handling w/ sendgrid or emailjs

  return (
    <>
      <h1 className="pb-5 text-3xl font-semibold md:text-6xl lg:text-7xl">
        Get in touch with me
      </h1>
      <form
        className="flex w-full flex-col gap-4"
        id="contact-form"
        onSubmit={submitHandler}
      >
        <div>
          <Input labelname="Name" name="name" type="text" required />
        </div>
        <div>
          <Input labelname="E-mail" name="e-mail" type="email" required />
        </div>
        <div>
          <TextArea labelname="Message" name="message" required />
        </div>
        <div className="mx-auto flex w-1/12 justify-center">
          <button
            type="submit"
            className="w-full min-w-[100px] rounded-sm bg-red-primary px-3 py-1 text-center text-xl font-semibold outline outline-1 outline-red-primary transition-all duration-300 hover:bg-transparent"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default withPageWrapper(ContactPage, "contact");
