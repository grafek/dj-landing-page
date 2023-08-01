"use client";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { type NextPage } from "next";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type ContactFormInput,
  type Notification as NotificationType,
} from "../../types";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import Notification from "@/components/Notification";
import { NOTIFICATION_MS_TIME } from "@/utils/globals";

const ContactPage: NextPage = () => {
  const form = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<NotificationType>({
    isShown: false,
  });
  const [btnState, setBtnState] = useState("Send");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInput>();

  const onSubmit: SubmitHandler<ContactFormInput> = async () => {
    if (!form.current) return;
    try {
      setBtnState("Sending...");
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE as string,
        form?.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY
      );
      if (res.status === 200) {
        setNotification({
          message: "🎉 Message sent successfully",
          isShown: true,
          isSuccessful: true,
        });
        reset();
      }
    } catch (err) {
      setNotification({
        message: `❌ Something went wrong!`,
        isShown: true,
        isSuccessful: false,
      });
    }
    setBtnState("Send");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSubmitSuccessful && notification.isShown === true) {
        setNotification({ isShown: false });
      }
    }, NOTIFICATION_MS_TIME);

    return () => clearTimeout(timer);
  }, [notification?.isShown, isSubmitSuccessful]);

  return (
    <>
      <h1 className="pb-10 text-2xl font-semibold md:pb-16 md:text-6xl lg:text-7xl">
        Get in touch with me
      </h1>
      <form
        className="flex w-full flex-col gap-6 md:gap-8"
        id="contact-form"
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <Input
            labelname="Name"
            register={register}
            error={errors.name}
            validation={{ required: true }}
            name="name"
            id="name"
            type="text"
            required
          />
        </div>
        <div className="relative">
          <Input
            labelname="E-mail"
            name="email"
            register={register}
            error={errors.email}
            type="email"
            validation={{
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            }}
            id="e-mail"
            required
          />
        </div>
        <div className="relative">
          <TextArea
            register={register}
            error={errors.message}
            validation={{ required: true }}
            labelname="Message"
            name="message"
            id="message"
            required
          />
        </div>
        <div className="mx-auto flex w-1/12 justify-center">
          <button
            type="submit"
            className="w-full min-w-[100px] rounded-sm bg-red-primary px-3 py-1 text-center text-xl font-semibold outline outline-1 outline-red-primary transition-all duration-300 hover:bg-transparent"
          >
            {btnState}
          </button>
        </div>
      </form>
      <Notification notification={notification} />
    </>
  );
};

export default ContactPage;
