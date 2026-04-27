export const siteConfig = {
  title: "Ukrainian cuisine",
  description: "Recipes of Ukrainian cuisine",
  navItems: [
    { href: "/", label: "Recipes" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/about", label: "About us" },
  ],
  pagesContent: {
    "/": {
      title: "Recipes",
      content: "Recipes will be here...",
    },
    "/ingredients": {
      title: "Ingredients",
      content: "Traditional ingredients of Ukrainian cuisine...",
    },
    "/about": {
      title: "About us",
      content: `
        <p>
          Ukrainian cuisine is a vibrant combination of hearty meat dishes, fragrant baked goods,
          and rich dairy products, reflecting the deep history and hospitality of the Ukrainian people.
          The foundation of the cuisine consists of dishes prepared for centuries by Ukrainian farmers,
          later enriched by regional traditions.
        </p>
        <br/>
        <h2>Main dishes of Ukrainian cuisine</h2>
        <br/>
        <ul>
          <li>
            <strong>Borscht</strong> — a rich beet soup with vegetables, meat, and a dollop of sour cream.
            Known worldwide as the most iconic Ukrainian dish.
          </li>
          <li>
            <strong>Varenyky</strong> — dumplings filled with potatoes, cottage cheese, cherries, or meat,
            traditionally served with sour cream and fried onions.
          </li>
          <li>
            <strong>Holubtsi</strong> — cabbage rolls stuffed with a mixture of rice and minced meat,
            cooked in tomato sauce. A classic festive dish.
          </li>
          <li>
            <strong>Salo</strong> — cured pork fat, often served with rye bread and garlic.
            A staple of Ukrainian cuisine and a cultural symbol.
          </li>
          <li>
            <strong>Pampushky</strong> — soft garlic bread rolls traditionally served alongside borscht.
          </li>
        </ul>
      `,
    },
  },
};
