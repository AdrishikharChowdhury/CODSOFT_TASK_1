import { FIELD_CLASS, LABEL_CLASS } from "@/constants";
import { ContactFormProps } from "@/types/type";
import React from "react";

const ContactForm = ({ handleSubmit }: ContactFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-cards-elevated border border-carbon bg-paper-white p-8 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL_CLASS}>Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Jane Applicant"
            className={FIELD_CLASS}
          />
        </label>
        <label className="block">
          <span className={LABEL_CLASS}>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@example.com"
            className={FIELD_CLASS}
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className={LABEL_CLASS}>Message</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Tell us what you need help with..."
          className={`${FIELD_CLASS} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="mt-8 w-full rounded-pills bg-carbon px-24 py-3 text-[15px] font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80 sm:w-max"
      >
        SEND MESSAGE
      </button>
    </form>
  );
};

export default ContactForm;
