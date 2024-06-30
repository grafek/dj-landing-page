"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { NotificationType } from "../../../../types";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Input, TextArea } from "@/src/components/form";
import { Notification } from "@/src/components/ui";
import { NOTIFICATION_MS_TIME } from "@/utils/constants";

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const t = useTranslations("Contact");
  const tNotif = useTranslations("Notification");
  const formRef = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<NotificationType>({
    isShown: false,
  });
  const [btnState, setBtnState] = useState(t("Send"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInput>();

  const onSubmit: SubmitHandler<ContactFormInput> = async () => {
    if (!formRef.current) return;
    try {
      setBtnState(t("Sending"));
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE as string,
        formRef?.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY,
      );
      if (res.status === 200) {
        setNotification({
          message: tNotif("Sent"),
          isShown: true,
          isSuccessful: true,
        });
        reset();
      }
    } catch (err) {
      setNotification({
        message: tNotif("Error"),
        isShown: true,
        isSuccessful: false,
      });
    }
    setBtnState(t("Send"));
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
        label={t("NameInput")}
        register={register}
        error={errors.name}
        validation={{ required: true }}
        name="name"
        id="name"
        type="text"
        required
      />
      <Input
        label="E-mail"
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
        label={t("MessageInput")}
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
