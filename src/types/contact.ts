export type ContactMessage = {
  id: string;
  name: string;
  gmail: string;
  subject: string;
  message: string;
  date: Date;
};

export type CreateContactInput = {
  name: string;
  gmail: string;
  subject: string;
  message: string;
};
