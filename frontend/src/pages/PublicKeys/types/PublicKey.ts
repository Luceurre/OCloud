import * as yup from 'yup';

export const publicKeySchema = yup.object({
  id: yup.string().required(),
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
  expirationDate: yup.date().required(),
});

export type PublicKey = yup.InferType<typeof publicKeySchema>;
