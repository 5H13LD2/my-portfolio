import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import type { CreateContactInput } from "../types/contact";

const CONTACT_COLLECTION = "contact";
const MAIL_COLLECTION = "mail";
const CONTACT_TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || "jimenezjerico227@gmail.com";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const createContactMessage = async (input: CreateContactInput) => {
  const name = input.name.trim();
  const gmail = input.gmail.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  const contactRef = doc(collection(db, CONTACT_COLLECTION));
  const mailRef = doc(collection(db, MAIL_COLLECTION));
  const batch = writeBatch(db);

  batch.set(contactRef, {
    name,
    gmail,
    subject,
    message,
    date: serverTimestamp(),
  });

  batch.set(mailRef, {
    to: [CONTACT_TO_EMAIL],
    replyTo: gmail,
    message: {
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${gmail}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(gmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    },
    createdAt: serverTimestamp(),
  });

  await batch.commit();

  return contactRef.id;
};
