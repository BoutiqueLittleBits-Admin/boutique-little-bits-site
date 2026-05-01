import { NextResponse } from 'next/server';
import { client } from '../../../lib/sanity';

const allProductsQuery = `
  *[_type == "product" && active == true] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    compareAtPrice,
    category->{
      title
    },
    shippingProfile,
    hasVariations,
    hasPersonalization,
    featured
  }
`;

const featuredProductsQuery = `
  *[_type == "product" && active == true && featured == true][0...4] {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    category->{
      title
    },
    hasVariations,
    hasPersonalization,
    shippingProfile,
    featured
  }
`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured') === 'true';

  try {
    const products = await client.fetch(featured ? featuredProductsQuery : allProductsQuery);
    return NextResponse.json({ products: products || [] });
  } catch (error) {
    console.error('Product API fetch error:', error);
    return NextResponse.json({ products: [], error: 'Unable to load products' }, { status: 500 });
  }
}
