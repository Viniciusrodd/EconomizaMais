
// util for api responses
export const getErrorMessage = (error: unknown): string => {
   if(error instanceof Error) return error.message;
   return String(error);
   // if "error" its a instance from Error, we can access his properties, like "error.message" with safety
};