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
        <PageHeaderHeading>List Your Product</PageHeaderHeading>
        <PageHeaderDescription>Buy Products</PageHeaderDescription>
      </PageHeader>
      <div className="col-span-full place-self-center">
        <ListNft />
      </div>
    </Container>
  );
};

export default List;
