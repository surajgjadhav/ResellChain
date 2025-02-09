import Container from "@/components/Container";
import ListNft from "@/components/ListNft";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

const List = () => {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Sell Your Assets with Confidence</PageHeaderHeading>
        <PageHeaderDescription>
          List your product securely and connect with potential buyers in the
          decentralized marketplace.
        </PageHeaderDescription>
      </PageHeader>
      <div className="col-span-full place-self-center">
        <ListNft />
      </div>
    </Container>
  );
};

export default List;
