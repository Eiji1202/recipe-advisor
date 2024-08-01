export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
  keywords: string[];
  authors: {
    name: string;
    url: string;
  }[];
};
