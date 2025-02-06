import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const mintNftFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  image: z
    .instanceof(File, { message: "A file must be selected" })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Only PNG or JPEG images are allowed",
    })
    .refine((file) => file.size < 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    }),
  manufacturer: z.string(),
  modelName: z.string(),
  price: z.string(),
});

export type MintNftFormSchema = z.infer<typeof mintNftFormSchema>;

export const useMintNftForm = () => {
  const formMethods = useForm<MintNftFormSchema>({
    resolver: zodResolver(mintNftFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      manufacturer: "",
      modelName: "",
      price: "",
    },
  });

  return formMethods;
};
