import { NextResponse } from 'next/server';
import { client } from '../../../../lib/sanity';

const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug && active == true][0] {
    _id,
    title,
    slug,
    description,
    "images": images[].asset->url,
    externalImageUrl,
    basePrice,
    compareAtPrice,
    sku,
    category->{
      _id,
      title
    },
    shippingProfile,
    processingTime,
    customProcessingDate,
    quantity,
    hasVariations,
    variations,
    hasPersonalization,
    personalization,
    specialNote,
    featured
  }
`;

const relatedProductsQuery = `
  *[_type == "product" && active == true && category._ref == $categoryId && slug.current != $currentSlug][0...4] {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice
  }
`;

export async function GET(request, { params }) {
  try {
    const product = await client.fetch(productBySlugQuery, { slug: params.slug });
    let relatedProducts = [];

    if (product?.category?._id) {
      relatedProducts = await client.fetch(relatedProductsQuery, {
        categoryId: product.category._id,
        currentSlug: params.slug,
      });
    }

    return NextResponse.json({ product: product || null, relatedProducts: relatedProducts || [] });
  } catch (error) {
    console.error('Product detail API fetch error:', error);
    return NextResponse.json({ product: null, relatedProducts: [], error: 'Unable to load product' }, { status: 500 });
  }
}
