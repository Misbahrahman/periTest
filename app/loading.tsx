import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <Spinner size="large" text="Loading your chats..." />
    </div>
  );
}