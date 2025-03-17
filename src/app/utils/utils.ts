'use server'; // Ujistěte se, že tato direktiva je na začátku souboru

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
};

async function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory not found: ${dir}`);
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

async function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || '',
    publishedAt: data.publishedAt,
    summary: data.summary || '',
    image: data.image || '',
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
  };

  return { metadata, content };
}

async function getMDXData(dir: string) {
  const mdxFiles = await getMDXFiles(dir);
  const postsPromises = mdxFiles.map(async (file) => {
    const { metadata, content } = await readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });

  return Promise.all(postsPromises);
}

export async function getPosts(customPath = ['', '', '', '']) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}