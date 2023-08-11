import { registerAs } from '@nestjs/config';

export interface EmailTemplateIds {
  forgotPassword: string;
}

export interface EmailConfiguration {
  fromAddress: string;
  serviceApiKey: string;
  templateIds: EmailTemplateIds;
}

export default registerAs('email', (): EmailConfiguration => {
  return {
    fromAddress: process.env.EMAIL_FROM as string,
    serviceApiKey: process.env.EMAIL_SERVICE_API_KEY as string,
    templateIds: {
      forgotPassword: process.env.EMAIL_TEMPLATE_ID_FORGOT_PASSWORD as string,
    },
  };
});
