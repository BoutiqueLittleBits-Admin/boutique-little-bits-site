import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full product description with formatting',
    }),
    defineField({
      name: 'specialNote',
      title: 'Special Note (Optional)',
      type: 'string',
      description: 'e.g., "ORDER by Jan 19, ships Jan 23"',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'External Image URL (Legacy)',
      type: 'url',
      description: 'For Etsy images',
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price (Original/Sale)',
      type: 'number',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'hasVariations',
      title: 'Has Variations?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'variations',
      title: 'Variations',
      type: 'array',
      hidden: ({ document }) => !document?.hasVariations,
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Variation Name', type: 'string' },
          { name: 'price', title: 'Price', type: 'number' },
          { name: 'sku', title: 'Variation SKU', type: 'string' },
          { name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true },
        ],
      }],
    }),
    defineField({
      name: 'hasPersonalization',
      title: 'Requires Personalization?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'personalization',
      title: 'Personalization Settings',
      type: 'object',
      hidden: ({ document }) => !document?.hasPersonalization,
      fields: [
        { name: 'label', title: 'Field Label', type: 'string', initialValue: 'Personalization Details' },
        { name: 'instructions', title: 'Instructions for Customer', type: 'text', rows: 4 },
        { name: 'characterLimit', title: 'Character Limit', type: 'number', initialValue: 256 },
        { name: 'required', title: 'Required?', type: 'boolean', initialValue: true },
      ],
    }),
    defineField({
      name: 'shippingProfile',
      title: 'Shipping Profile',
      type: 'string',
      options: {
        list: [
          { title: 'Small Envelope', value: 'small-envelope' },
          { title: 'Large Box', value: 'large-box' },
        ],
        layout: 'radio',
      },
      initialValue: 'small-envelope',
    }),
    defineField({
      name: 'processingTime',
      title: 'Processing Time',
      type: 'string',
      options: {
        list: [
          { title: '1-3 Business Days', value: '1-3-days' },
          { title: '3-5 Business Days', value: '3-5-days' },
          { title: '5-7 Business Days (Made to Order)', value: '5-7-days' },
          { title: '3-4 Weeks', value: '3-4-weeks' },
          { title: 'Custom Date', value: 'custom' },
        ],
      },
      initialValue: '1-3-days',
    }),
    defineField({
      name: 'customProcessingDate',
      title: 'Custom Processing Info',
      type: 'string',
      hidden: ({ document }) => document?.processingTime !== 'custom',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'quantity',
      title: 'Inventory Quantity',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active (Visible on Site)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
