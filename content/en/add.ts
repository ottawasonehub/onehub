import type { CreateBusinessDTO } from '@/lib/types/business.types';

export const add = {
  meta: {
    title: 'Add Your Business | onehub',
    description: 'List your Ottawa business on onehub and connect with thousands of local customers.',
  },
  heading: 'Join',
  headingHighlight: 'One Hub',
  subheading:
    "Connect with Ottawa's thriving business community. Get discovered by thousands of local customers.",
  success: {
    heading: 'Welcome to One Hub!',
    body: 'Your business submission has been received and will be reviewed for the Ottawa directory.',
    redirecting: 'Redirecting to home...',
  },
  form: {
    fields: {
      name: {
        label: 'Business Name',
        placeholder: "e.g., Smith's Coffee Shop",
      },
      category: {
        label: 'Category',
      },
      phone: {
        label: 'Phone Number',
        placeholder: '(613) 555-0123',
      },
      description: {
        label: 'Description',
        placeholder: 'Tell us what makes your business special...',
        hint: 'Minimum 10 characters required',
      },
      address: {
        label: 'Address',
        placeholder: '123 Bank Street, Ottawa, ON',
      },
      email: {
        label: 'Email Address',
        placeholder: 'contact@yourbusiness.com',
      },
      website: {
        label: 'Website',
        placeholder: 'https://www.yourbusiness.com',
      },
    },
    submit: 'Add Your Business',
    submitting: 'Submitting Your Business...',
    disclaimer: 'Free to join • No credit card required • Reviewed before publishing',
  },
} as const;

export const formBoldFieldNames = {
  name: 'business_name',
  category: 'category',
  phone: 'phone',
  description: 'description',
  address: 'address',
  email: 'email',
  website: 'website',
} as const satisfies Record<keyof CreateBusinessDTO, string>;
