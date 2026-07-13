import { useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import {
  createFeedback,
  signInWithGoogle,
  signOutFeedbackUser,
  subscribeToFeedback,
  subscribeToFeedbackUser,
} from "../services/feedbackService";
import type { Feedback } from "../types/feedback";

type FeedbackFormState = {
  message: string;
  star: number;
  userType: string;
};

const initialForm: FeedbackFormState = {
  message: "",
  star: 5,
  userType: "",
};

export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<FeedbackFormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToFeedback(
      (items) => {
        setFeedback(items);
        setLoading(false);
      },
      (feedbackError) => {
        setError(feedbackError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToFeedbackUser((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const userDisplayName = useMemo(() => user?.displayName || "Anonymous client", [user]);
  const userEmail = useMemo(() => user?.email || "", [user]);

  const updateMessage = (message: string) => {
    setForm((current) => ({ ...current, message }));
    setSuccess(false);
  };

  const updateStar = (star: number) => {
    setForm((current) => ({ ...current, star }));
    setSuccess(false);
  };

  const updateUserType = (userType: string) => {
    setForm((current) => ({ ...current, userType }));
    setSuccess(false);
  };

  const signIn = async () => {
    setError(null);
    await signInWithGoogle();
  };

  const signOut = async () => {
    setError(null);
    await signOutFeedbackUser();
    setForm(initialForm);
  };

  const submitFeedback = async () => {
    if (!user) {
      setError("Please sign in with Google before leaving feedback.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please write a short feedback message.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createFeedback({
        name: userDisplayName,
        email: userEmail,
        userType: form.userType.trim() || "Others",
        message: form.message,
        star: form.star,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      setForm(initialForm);
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    authLoading,
    error,
    feedback,
    form,
    loading,
    submitting,
    success,
    user,
    signIn,
    signOut,
    submitFeedback,
    updateMessage,
    updateStar,
    updateUserType,
  };
}
