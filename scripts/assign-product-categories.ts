/**
 * Bulk assign categories to products
 * Run with: npx tsx scripts/assign-product-categories.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write token
});

// Category IDs
const CATEGORIES = {
  "dairy-chilled": "ac1d4192-0814-4883-be45-a4fe6f5ee3ba",
  "frozen-food": "f6bd75bd-8d01-4141-aa5b-9ab843a61d99",
  "canned-preserved": "57cc792c-365c-41ae-a48a-588756bff8c1",
  "condiments-spices": "83798db8-14a5-4bbf-aebb-ae24b29bdea1",
  "snacks-confectionery": "4817673a-ea3f-4203-a394-b4b5bdde1e9e",
  "cookies-biscuits": "bb7af79b-6ab3-4680-a50c-61ecbfd81b28",
  "bread-bakery": "9e1f266a-e0b2-4de0-b85b-4487b02b65b5",
  "wine-beverages": "6ed52cf7-bc9e-4984-bc1c-077498923763",
  "grains-pasta": "ae04f4e5-ed0c-4a5d-97ca-af927e80ee40",
  judaica: "9dcf4032-ad7b-4e9f-8063-4414950184e2",
};

// Product name patterns to category mapping
// Order matters - more specific patterns should come first
const CATEGORY_PATTERNS: [RegExp, string][] = [
  // Judaica (must come before olive pattern to catch "Olive Oil Candles")
  [/candle|mezuzah|dreidel|book|postcard|plate|shampoo|body wash|menorah/i, "judaica"],
  // Wine & Beverages (expanded with varietals and wine-related terms)
  [/wine|winery|grape juice|tirosh|arak|coffee|chokolit|750ml|375ml|moscato|shiraz|riesling|chardonnay|cabernet|merlot|sauvignon|kiddush|sacramental/i, "wine-beverages"],
  // Condiments & Spices
  [/tahini|ketchup|dressing|paprika|onion|parsley|soy sauce|mayo|salt|sugar|spread|sauce|paste|puree|horseradish|rose water|syrup/i, "condiments-spices"],
  // Frozen Food
  [/borekas|gefilte|jachnun|malawach|fillo|ice cream cone/i, "frozen-food"],
  // Canned & Preserved
  [/olive|tuna|pepper|artichoke|carrot|cucumber/i, "canned-preserved"],
  // Snacks & Confectionery
  [/halva|mentos|nishnashim/i, "snacks-confectionery"],
  // Cookies & Biscuits
  [/biscuit|wafer|cookie|bagel|cake/i, "cookies-biscuits"],
  // Bread & Bakery
  [/matzah|bread/i, "bread-bakery"],
  // Grains & Pasta
  [/couscous|breadcrumb|crouton|soup.*stock|wheat|tapioca|gnocchi|corn soup/i, "grains-pasta"],
  // Dairy & Chilled
  [/cheese|cream|fromage/i, "dairy-chilled"],
];

function getCategoryForProduct(name: string): string {
  for (const [pattern, category] of CATEGORY_PATTERNS) {
    if (pattern.test(name)) {
      return CATEGORIES[category as keyof typeof CATEGORIES];
    }
  }
  // Default to Judaica for unmatched products
  return CATEGORIES.judaica;
}

async function main() {
  console.log("Fetching products without categories...");

  const products = await client.fetch<{ _id: string; name: { en: string } }[]>(
    `*[_type == "product" && !defined(category)]{ _id, name }`
  );

  console.log(`Found ${products.length} products without categories`);

  if (products.length === 0) {
    console.log("All products have categories!");
    return;
  }

  // Build transaction
  const transaction = client.transaction();

  for (const product of products) {
    const categoryId = getCategoryForProduct(product.name.en);
    console.log(`  ${product.name.en} -> ${categoryId}`);

    transaction.patch(product._id, {
      set: {
        category: {
          _type: "reference",
          _ref: categoryId,
        },
      },
    });
  }

  console.log("\nCommitting transaction...");
  const result = await transaction.commit();
  console.log(`Successfully updated ${result.documentIds?.length || 0} products`);
}

main().catch(console.error);
