import Container from "@/components/Container";
import ListedProductCard from "@/components/ListedProductCard";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

const Marketplace = () => {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Marketplace</PageHeaderHeading>
        <PageHeaderDescription>Buy Products</PageHeaderDescription>
      </PageHeader>

      <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-4">
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile1.jpg"
        />
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile1.jpg"
        />
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile.jpg"
        />
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile.jpg"
        />
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile.jpg"
        />
        <ListedProductCard
          name="test"
          description="asdfghjkl"
          imgSrc="/mobile1.jpg"
        />
      </div>
    </Container>
  );
};

export default Marketplace;
