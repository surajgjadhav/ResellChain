import Chat from "@/components/Chat";
import Container from "@/components/Container";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

const Agent = () => {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Resell AI Agent</PageHeaderHeading>
        <PageHeaderDescription>
          Ask your doubts to our resell AI agent{" "}
        </PageHeaderDescription>
      </PageHeader>
      <div className="col-span-full border rounded">
        <Chat />
      </div>
    </Container>
  );
};

export default Agent;
