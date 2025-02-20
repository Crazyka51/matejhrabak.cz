import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
  const person = {
    firstName: "Matěj",
    lastName: "Hrabák",
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    role: t("person.role"),
    avatar: "/images/avatar.PNG",
    location: "Europe/Prague", // Očekává se identifikátor časové zóny IANA, např. 'Europe/Vienna'
    languages: ["Čeština", "English"], // volitelné: ponechte pole prázdné, pokud nechcete zobrazovat jazyky
  };

  const newsletter = {
    display: false,
    title: <>{t("newsletter.title", { firstName: person.firstName })}</>,
    description: <>{t("newsletter.description")}</>,
  };

  const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/Crazyka51",
    },
    {
      name: "Email",
      icon: "email",
      link: "mailto:matej.hrabak@generaliceska.cz",
    },
  ];

  const home = {
    label: t("home.label"),
    title: t("home.title", { name: person.name }),
    description: t("home.description", { role: person.role }),
    headline: <>{t("home.headline")}</>,
    subline: <>{t("home.subline")}</>,
  };

  const about = {
    label: t("about.label"),
    title: t("about.title"),
    description: t("about.description", {
      name: person.name,
      role: person.role,
      location: person.location,
    }),
    tableOfContent: {
      display: true,
      subItems: true,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: true,
      link: "https://outlook.office.com/bookwithme/user/fcf3570cfe3f45cfb2d15925d82327d6@cpas.cz/meetingtype/SVRwCe7HMUGxuT6WGxi68g2?anonymous&ep=mlink",
    },
    intro: {
      display: true,
      title: t("about.intro.title"),
      description: <>{t("about.intro.description")}</>,
    },
    work: {
      display: true, // set to false to hide this section
      title: t("about.work.title"),
      experiences: [
        {
          company: "Generali Česká pojištovna",
          timeframe: t("about.work.experiences.FLY.timeframe"),
          role: t("about.work.experiences.FLY.role"),
          achievements: t("about.work.experiences.FLY.achievements").split(";"),
          images: [
            // optional: leave the array empty if you don't want to display images
          ],
        },
        {
          company: "Doosan Bobcat EMEA ",
          timeframe: t("about.work.experiences.Creativ3.timeframe"),
          role: t("about.work.experiences.Creativ3.role"),
          achievements: t("about.work.experiences.Creativ3.achievements").split(
            ";"
          ),
          images: [],
        },
      ],
    },
    studies: {
      display: true, // set to false to hide this section
      title: "Vzdělání a certifikace",
      institutions: [
        {
          name: "Integrovaná Střední škola Příbram",
          description: <>{t(`2008 - 2012 Obor: Obchodník`)}</>,
        },
        {
          name: "Zkouška o odborné certifikaci u ČNB - IDD VII",
          description: (
            <>
              {t(
                "Distribuce životního pojištění a distribuce neživotního občanského pojištění (ŽP + oNŽP)"
              )}
            </>
          ),
        },
      ],
    },
    technical: {
      display: false, // set to false to hide this section
      title: t("about.technical.title"),
      skills: [
        {
          title: "Figma",
          description: <>{t("about.technical.skills.Figma.description")}</>,
          images: [
            {
              src: "/images/projects/project-01/cover-02.jpg",
              alt: "Project image",
              width: 16,
              height: 9,
            },
          ],
        },
        {
          title: "Next.js",
          description: <>{t("about.technical.skills.Nextjs.description")}</>, // "." not accepted in next-intl namespace
          images: [
            {
              src: "/images/projects/project-01/cover-04.jpg",
              alt: "Project image",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
  };

  const blog = {
    label: t("blog.label"),
    title: t("blog.title"),
    description: t("blog.description", { name: person.name }),
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
  };

  const work = {
    label: t("work.label"),
    title: t("work.title"),
    description: t("work.description", { name: person.name }),
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
  };

  const gallery = {
    label: t("gallery.label"),
    title: t("gallery.title"),
    description: t("gallery.description", { name: person.name }),
    // Images from https://pexels.com
    images: [
      {
        src: "/images/gallery/img-01.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/img-02.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-03.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/img-04.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-05.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-06.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/img-07.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-08.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/img-09.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-10.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-11.jpg",
        alt: "image",
        orientation: "vertical",
      },
      {
        src: "/images/gallery/img-12.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-13.jpg",
        alt: "image",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/img-14.jpg",
        alt: "image",
        orientation: "horizontal",
      },
    ],
  };
  return {
    person,
    social,
    newsletter,
    home,
    about,
    blog,
    work,
    gallery,
  };
};

export { createI18nContent };
