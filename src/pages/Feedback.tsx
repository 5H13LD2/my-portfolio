import FeedbackCard from "../components/FeedbackCard";
import FeedbackForm from "../components/FeedbackForm";
import { useFeedback } from "../hooks/useFeedback";

export default function Feedback() {
  const {
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
  } = useFeedback();

  return (
    <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-10 py-16 w-full">
      <div className="text-center mb-12">
        <h2 className="text-[32px] sm:text-[36px] font-semibold text-[#f0f0f0] mb-3">Feedback</h2>
        <p className="text-sm sm:text-base text-[#888]">What people say, and a place to share your own experience.</p>
      </div>

      <div className="space-y-4">
        {loading && (
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] rounded-2xl p-6 text-sm text-[#777] text-center">
            Loading feedback...
          </div>
        )}

        {!loading && feedback.length === 0 && (
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] rounded-2xl p-6 text-sm text-[#777] text-center">
            No feedback yet. Be the first to leave one.
          </div>
        )}

        {feedback.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
      </div>

      <div className="flex items-center gap-3 my-14">
        <div className="h-px bg-[#1e1e1e] flex-1" />
        <span className="text-[10px] text-[#777] uppercase tracking-[0.18em]">Leave your feedback</span>
        <div className="h-px bg-[#1e1e1e] flex-1" />
      </div>

      <FeedbackForm
        authLoading={authLoading}
        error={error}
        message={form.message}
        star={form.star}
        submitting={submitting}
        success={success}
        userType={form.userType}
        user={user}
        onMessageChange={updateMessage}
        onSignIn={signIn}
        onSignOut={signOut}
        onStarChange={updateStar}
        onUserTypeChange={updateUserType}
        onSubmit={submitFeedback}
      />
    </div>
  );
}
