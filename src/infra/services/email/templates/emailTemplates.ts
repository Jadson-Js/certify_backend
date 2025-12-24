export const EMAIL_TEMPLATES = {
  CONFIRM_EMAIL: 'CONFIRM_EMAIL',
} as const;
export type IEMAIL_TEMPLATES =
  (typeof EMAIL_TEMPLATES)[keyof typeof EMAIL_TEMPLATES];
