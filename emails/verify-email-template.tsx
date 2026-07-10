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

interface VerifyEmailTemplateProps {
  name: string;
  verificationUrl: string;
}

export default function VerifyEmailTemplate({
  name,
  verificationUrl,
}: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />

      <Preview>Verify your email address</Preview>

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
          <Heading>Welcome, {name}! 👋</Heading>

          <Text>
            Thanks for creating your account.
          </Text>

          <Text>
            Click the button below to verify your email address.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Verify Email
            </Button>
          </Section>

          <Text>
            If you didn&apos;t create this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}