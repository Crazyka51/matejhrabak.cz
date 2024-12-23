import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Matěj',
    lastName:  'Hrabák',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Pojišťovací poradce',
    avatar:    '/images/avatar.jpg',
    location:  'Europe/Prague',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['Czech']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <>Přihlaste se k odběru novinek od {person.firstName}</>,
    description: <>Píšu o pojištění, finančních produktech a jak zajistit svou budoucnost s klidem.</>
}

const social = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/once-ui-system/nextjs-starter',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/company/once-ui/',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:matej.hrabak@generaliceska.cz',
    },
]

const home = {
    label: 'Domov',
    title: `${person.name} - Pojišťovací poradce`,
    description: `Webová stránka prezentující služby v oblasti pojištění a finančního poradenství od ${person.name}`,
    headline: <>Poradce v pojištění a finančních produktech</>,
    subline: <>Pomáhám lidem zajistit finanční klid a ochranu jejich majetku i budoucnosti.</>
}

const about = {
    label: 'O mně',
    title: 'O mně',
    description: `Seznamte se s {person.name}, zkušeným {person.role} v {person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Úvod',
        description: <>Matěj Hrabák je poradce, který se specializuje na ochranu majetku, finanční produkty a pojištění na míru.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Služby',
        experiences: [
            {
                company: 'Generali Česká pojišťovna',
                timeframe: '2018 - Současnost',
                role: 'Pojišťovací poradce',
                achievements: [
                    <>Pomohl stovkám klientů s výběrem optimálního pojištění.</>,
                    <>Získal zkušenosti v oblasti správy majetkového, životního i cestovního pojištění.</>
                ],
                images: []
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studium',
        institutions: [
            {
                name: 'Univerzita Ekonomie a Managementu',
                description: <>Studium finančního managementu a pojistných produktů.</>
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technické dovednosti',
        skills: [
            {
                title: 'Figma',
                description: <>Schopnost rychlého prototypování v nástroji Figma.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-02.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover-03.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                title: 'Next.js',
                description: <>Tvorba moderních aplikací s použitím Next.js.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-04.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    }
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Články o pojištění a financích',
    description: `Přečtěte si více o tom, jak ${person.name} pomáhá svým klientům.`
}

const work = {
    label: 'Služby',
    title: 'Nabízené služby',
    description: `Seznamte se s portfoliem služeb ${person.name}`
}

const gallery = {
    label: 'Galerie',
    title: 'Galerie úspěchů',
    description: `Fotogalerie úspěchů a příběhů klientů ${person.name}`,
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        }
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };
