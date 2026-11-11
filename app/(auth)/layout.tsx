import Background from "@/components/landing/Background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Background />
      {children}
    </div>
  );
}