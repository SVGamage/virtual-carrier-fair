"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { isUsernameExists, registerUserDetails } from "@/action/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(2, {
      message: "username must be at least 2 characters.",
    })
    .refine(
      async (value) => {
        return await isUsernameExists(value);
      },
      { message: "username is already exists" },
    ),
  isEmployer: z.boolean(),
});
type Props = {
  user_type: string;
};
export type registerUserFormType = z.infer<typeof formSchema>;
export default function DetailsRegisterForm({ user_type }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<registerUserFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isEmployer: user_type === "employer" && true,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await registerUserDetails(data);
    setIsLoading(false);
    redirect("/");
  };
  return (
    <Card className=" p-10 md:px-10 md:py-6 md:w-1/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEmployer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">User Type</FormLabel>
                  <FormDescription>Register as an Employer?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked={user_type === "employer" && true}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="bg-blue-600 hover:bg-black w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Loading...</p>
              </>
            ) : (
              <p>Submit</p>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
