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
        <PageHeaderHeading>
          Get Smart Insights with Our Resell AI Agent
        </PageHeaderHeading>
        <PageHeaderDescription>
          Predict prices, analyze trends, and explore detailed insights about
          listed products.
        </PageHeaderDescription>
      </PageHeader>
      <div className="col-span-full border rounded">
        <Chat />
      </div>
    </Container>
  );
};

export default Agent;
