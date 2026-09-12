"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="contact-email">
        Work email
      </label>
      <input
        id="contact-email"
        type="email"
        name="email"
        placeholder="Work email"
        required
        disabled={sent}
      />
      <label className="sr-only" htmlFor="contact-message">
        What should we red-team?
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows="3"
        placeholder="What should we red-team?"
        required
        disabled={sent}
      />
      <button type="submit" className="btn btn-accent btn-block" disabled={sent}>
        {sent ? "Request sent ✓" : "Send request"}
      </button>
    </form>
  );
}
