import { useState } from "react";
import { createContactMessage } from "../services/contactService";
import type { CreateContactInput } from "../types/contact";

const initialForm: CreateContactInput = {
  name: "",
  gmail: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContact() {
  const [form, setForm] = useState<CreateContactInput>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <Field extends keyof CreateContactInput>(
    field: Field,
    value: CreateContactInput[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSuccess(false);
    setError(null);
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!emailPattern.test(form.gmail.trim())) return "Please enter a valid email address.";
    if (!form.subject.trim()) return "Please enter a subject.";
    if (!form.message.trim()) return "Please write a message.";
    return null;
  };

  const submitContact = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createContactMessage(form);
      setForm(initialForm);
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your message.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    error,
    form,
    submitting,
    success,
    submitContact,
    updateField,
  };
}
