import { client } from '../../../lib/sanity';

const productsQuery = `
  *[_type == "product" && active == true] {
    _id,
    title,
    slug,
    description,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    category->{
      title
    },
    quantity
  }
`;

export async function GET() {
  try {
    const products = await client.fetch(productsQuery);
    
    const feedItems = products.map(product => {
      const description = Array.isArray(product.description)
        ? product.description.map(block => block.children?.map(child => child.text).join('')).join(' ')
        : product.description || '';
      
      return {
        id: product._id,
        title: product.title,
        description: description.substring(0, 5000),
        link: `https://www.boutiquelittlebits.com/shop/${product.slug?.current}`,
        image_link: product.image,
        price: `${product.basePrice?.toFixed(2)} USD`,
        availability: product.quantity > 0 ? 'in_stock' : 'out_of_stock',
        brand: 'Boutique Little Bits',
        condition: 'new',
        product_type: product.category?.title || 'Gifts',
      };
    });

    // Generate XML feed
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Boutique Little Bits</title>
    <link>https://www.boutiquelittlebits.com</link>
    <description>Curated Gifts and Joyful Surprises</description>
    ${feedItems.map(item => `
    <item>
      <g:id>${item.id}</g:id>
      <g:title><![CDATA[${item.title}]]></g:title>
      <g:description><![CDATA[${item.description}]]></g:description>
      <g:link>${item.link}</g:link>
      <g:image_link>${item.image_link}</g:image_link>
      <g:price>${item.price}</g:price>
      <g:availability>${item.availability}</g:availability>
      <g:brand>${item.brand}</g:brand>
      <g:condition>${item.condition}</g:condition>
      <g:product_type><![CDATA[${item.product_type}]]></g:product_type>
    </item>`).join('')}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Feed error:', error);
    return new Response('Error generating feed', { status: 500 });
  }
}
