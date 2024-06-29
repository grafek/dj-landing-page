"use client";
import Input from "@/src/components/Input";
import TextArea from "@/src/components/TextArea";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { NotificationType } from "../../types";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATION_MS_TIME } from "@/utils/globals";
import Notification from "@/src/components/Notification";

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
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
    if (!formRef.current) return;
    try {
      setBtnState("Sending...");
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE as string,
        formRef?.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY,
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
        message: `✖️ Something went wrong! Please try again in a moment.`,
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
    <form
      className="flex flex-col gap-4 md:gap-6"
      id="contact-form"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <TextArea
        register={register}
        error={errors.message}
        validation={{ required: true }}
        labelname="Message"
        name="message"
        id="message"
        required
      />
      <button className="mx-auto flex min-w-[100px] items-center justify-center rounded-sm bg-purple-primary px-2 py-1 font-semibold outline outline-1 outline-purple-primary transition-all duration-300 hover:bg-transparent">
        {btnState}
      </button>
      <Notification notification={notification} />
    </form>
  );
};

export default ContactForm;
