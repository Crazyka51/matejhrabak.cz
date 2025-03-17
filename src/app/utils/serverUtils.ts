import { promises as fs } from 'fs';
import path, { join } from 'path';
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

function getMDXFiles(dir: string) {
  return fs.readdir(dir).then(files => files.filter(file => path.extname(file) === '.mdx'));
}

function readMDXFile(filePath: string) {
  return fs.readFile(filePath, 'utf-8').then(rawContent => {
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
  });
}

function getMDXData(dir: string) {
  return getMDXFiles(dir).then(mdxFiles => {
    return Promise.all(mdxFiles.map(file => {
      return readMDXFile(join(dir, file)).then(({ metadata, content }) => {
        const slug = path.basename(file, path.extname(file));
        return { metadata, slug, content };
      });
    }));
  });
}

export function getPosts(customPath = ['', '', '', '']) {
  const postsDir = join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
