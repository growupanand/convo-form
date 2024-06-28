import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { inputTypeEnum } from "./constants";
import { formField } from "./formField";

const textInputConfigSchema = z.object({
  placeholder: z.string().min(1).optional(),
  maxLength: z.number().optional(),
});

const choiceOptionSchema = z.object({
  optionName: z.string().min(1),
  value: z.string().min(1),
});

const multipleChoiceInputConfigSchema = z.object({
  options: choiceOptionSchema.array().min(2),
  allowMultiple: z.boolean(),
});

const fieldConfigurationSchema = z.union([
  z.object({
    inputType: z.literal(z.enum(inputTypeEnum.enumValues).Values.text),
    inputConfiguration: textInputConfigSchema,
  }),
  z.object({
    inputType: z.literal(
      z.enum(inputTypeEnum.enumValues).Values.multipleChoice,
    ),
    inputConfiguration: multipleChoiceInputConfigSchema,
  }),
]);

export type FieldConfiguration = z.infer<typeof fieldConfigurationSchema>;

export const insertFormFieldSchema = createInsertSchema(formField, {
  fieldName: z.string().min(1),
  fieldDescription: z.string().min(1),
  fieldConfiguration: fieldConfigurationSchema,
});

export const selectFormFieldSchema = createSelectSchema(formField, {
  fieldConfiguration: fieldConfigurationSchema,
});

export const updateFormFieldSchema = insertFormFieldSchema
  .omit({
    formId: true,
  })
  .extend({
    id: z.string().min(1),
  });

export const patchFormFieldSchema = updateFormFieldSchema.partial().extend({
  id: z.string().min(1),
});

export type FormField = z.infer<typeof selectFormFieldSchema>;
