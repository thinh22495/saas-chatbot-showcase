"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactConfig, ContactField } from "@/config/site.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MotionDiv,
  MotionSection,
  sectionVariants,
  staggerContainer,
} from "@/components/sections/section-motion";

type ContactProps = {
  data: ContactConfig;
};

function buildContactSchema(fields: ContactField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let schema = z.string();

    if (field.type === "email") {
      schema = schema.email();
    }

    const minLength = field.minLength ?? (field.required ? 1 : undefined);
    if (minLength) {
      schema = schema.min(minLength);
    }

    if (field.type === "select" && field.options?.length) {
      schema = schema.refine(
        (value) => field.options?.includes(value),
        { message: "" }
      );
    }

    if (field.required) {
      shape[field.name] = schema;
    } else {
      shape[field.name] = z.preprocess(
        (value) => (value === "" ? undefined : value),
        schema.optional()
      );
    }
  });

  return z.object(shape);
}

export function ContactSection({ data }: ContactProps) {
  const formSchema = React.useMemo(
    () => buildContactSchema(data.fields),
    [data.fields]
  );

  const defaultValues = React.useMemo(() => {
    const values: Record<string, string> = {};
    data.fields.forEach((field) => {
      values[field.name] = "";
    });
    return values;
  }, [data.fields]);

  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(formSchema) as never,
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (values: Record<string, string>) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setSubmitted(true);
      reset(defaultValues);
    }
  };

  if (!data.enabled) return null;

  return (
    <>
      {/* Success Popup */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-2xl"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold text-foreground">
              Cảm ơn bạn đã liên hệ!
            </h3>
            <p className="mb-6 text-center text-muted-foreground">
              Liên hệ của bạn đã được ghi nhận. Chúng tôi sẽ phản hồi lại bạn sớm nhất.
            </p>
            <Button
              variant="brand"
              className="w-full"
              onClick={() => setSubmitted(false)}
            >
              Đóng
            </Button>
          </MotionDiv>
        </div>
      )}

      <MotionSection
        id="contact"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="border-b border-border/60 bg-muted/30"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionDiv variants={sectionVariants} className="space-y-4">
            <h2 className="text-3xl font-serif md:text-4xl">{data.title}</h2>
            <p className="text-muted-foreground">{data.subtitle}</p>
          </MotionDiv>

          <MotionDiv variants={sectionVariants}>
            <Card className="border-border/60 bg-card/80 shadow-lg">
              <CardContent className="space-y-4 p-6">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  {data.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          {...register(field.name)}
                        />
                      ) : field.type === "select" ? (
                        <select
                          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue=""
                          {...register(field.name)}
                        >
                          <option value="" disabled>
                            {field.placeholder ?? ""}
                          </option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name)}
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    variant="brand"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {data.submit.label}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
