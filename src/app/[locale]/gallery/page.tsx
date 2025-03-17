import { Flex } from "@/once-ui/components";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

// Definice typů pro galerii
interface GalleryContent {
  label?: string;
  title: string;
  description: string;
  images: Array<{
    src: string;
    alt: string;
    orientation: string;
  }>;
}

interface PersonContent {
  name?: string;
  avatar?: string;
}

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
	const content = renderContent(t);
	
	// Bezpečné typování s výchozími hodnotami
	const gallery = (content.gallery as GalleryContent) || {
	  title: "Gallery",
	  description: "Image gallery",
	  images: []
	};

	const title = gallery.title;
	const description = gallery.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/gallery`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Gallery(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const content = renderContent(t);
	
	// Bezpečné typování s výchozími hodnotami
	const gallery = (content.gallery as GalleryContent) || {
	  title: "Gallery",
	  description: "Image gallery",
	  images: []
	};
	const person = (content.person as PersonContent) || {
	  name: "",
	  avatar: ""
	};
	
    return (
        <Flex fillWidth>
            <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ImageGallery',
						name: gallery.title,
						description: gallery.description,
						url: `https://${baseURL}/gallery`,
						image: gallery.images.map((image) => ({
                            '@type': 'ImageObject',
                            url: `${baseURL}${image.src}`,
                            description: image.alt,
                        })),
						author: {
							'@type': 'Person',
							name: person.name,
                            image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
            <MasonryGrid/>
        </Flex>
    );
}