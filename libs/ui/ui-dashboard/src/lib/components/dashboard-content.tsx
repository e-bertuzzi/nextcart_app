import { Box, Container, Header } from '@cloudscape-design/components';

interface DashboardContentProps {
  content: string;
}

export function DashboardContent({ content }: DashboardContentProps) {
  return (
    <Box padding="l" className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-green-100">
      <Container
        header={
          <Header variant="h2" className="text-emerald-800 font-extrabold text-2xl">
            User Dashboard
          </Header>
        }
        className="bg-white rounded-lg shadow-md p-6"
      >
        <p className="text-gray-800 text-base leading-relaxed">{content}</p>
      </Container>
    </Box>
  );
}
