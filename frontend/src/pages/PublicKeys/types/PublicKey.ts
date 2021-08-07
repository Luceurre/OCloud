import * as yup from 'yup';

export const publicKeySchema = yup.object({
  id: yup.number().required(),
  name: yup
    .string()
    .trim()
    .ensure()
    .required()
    .max(255),
  value: yup
    .string()
    .trim()
    .ensure()
    .required(),
  algorithm: yup.string(),
  expirationDate: yup.date().required(),
});

export type PublicKey = yup.InferType<typeof publicKeySchema>;
