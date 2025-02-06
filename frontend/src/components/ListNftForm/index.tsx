"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MintNftForm from "../MintNftForm";
import { useMintNftForm } from "@/hooks/useMintNftForm";
import { FormProvider } from "react-hook-form";

export function ListNftForm() {
  const formMethods = useMintNftForm();
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Mint</TabsTrigger>
        <TabsTrigger value="password">List</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <FormProvider {...formMethods}>
          <MintNftForm />
        </FormProvider>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>List</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>List Product</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
