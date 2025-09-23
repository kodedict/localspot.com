import Wrapper from "@/layouts/protected";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (<Wrapper>{children}</Wrapper>);
}