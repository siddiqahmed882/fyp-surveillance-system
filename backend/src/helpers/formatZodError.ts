import type { ZodError } from 'zod';

export default function formatZodError(error: ZodError) {
  const fieldErrors = error.flatten().fieldErrors;

  const errorObject = Object.entries(fieldErrors).reduce((acc, [key, value]) => {
    if (!value) return acc;

    acc[key] = value.join(', ');

    return acc;
  }, {} as Record<string, string>);

  const conciseErrorMessages = Object.entries(errorObject).map(([key, value]) => `${ key }: ${ value }`).join(', ');



  return { conciseErrorMessages, errorObject };
}