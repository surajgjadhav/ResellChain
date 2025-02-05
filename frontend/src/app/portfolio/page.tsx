import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";

const Portfolio = () => {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Portfolio</PageHeaderHeading>
        <PageHeaderDescription>Your porfolio details</PageHeaderDescription>
      </PageHeader>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile Info</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Address: </p>
          <p>Total Products: </p>
          <p>Listed Products: </p>
        </CardContent>
      </Card>

      <div className="col-span-full flex items-stretch flex-col rounded-md border ">
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>Profile Info</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <ProductCard name="test" description="asdfghjkl" imgSrc="/logo.png" />
          <ProductCard
            name="test"
            description="asdfghjkl"
            imgSrc="/mobile.jpg"
          />
          <ProductCard
            name="test"
            description="asdfghjkl"
            imgSrc="/mobile1.jpg"
          />
        </CardContent>
      </div>
    </Container>
  );
};

export default Portfolio;
