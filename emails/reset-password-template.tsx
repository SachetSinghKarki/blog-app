import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordTemplateProps {
  name: string;
  resetUrl: string;
}

export default function ResetPasswordTemplate({
  name,
  resetUrl,
}: ResetPasswordTemplateProps) {
  return (
    <Html>
      <Head />

      <Preview>Reset your password</Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
          }}
        >
          <Heading>Hello, {name}! 👋</Heading>

          <Text>
            We received a request to reset your password.
          </Text>

          <Text>
            Click the button below to choose a new password.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Reset Password
            </Button>
          </Section>

          <Text>
            If you didn&apos;t request a password reset, you can safely ignore this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}