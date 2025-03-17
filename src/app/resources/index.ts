// Import předdefinovaných hodnot a funkcí z jednotlivých modulů
export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL } from '@/app/resources/config';

// Pokud nechceš importovat veškerý obsah z `content-en.ts`, můžeš jej znovu exportovat selektivně.
// export { person, social, newsletter, home, about, blog, work, gallery } from '@/app/resources/content-en';

// Export funkce pro generování obsahu stránky
export { renderContent } from '@/app/resources/renderContent';

// Pokud `baseURL` není obsažen v `config.ts`, můžeš jej definovat ručně:

