import languages from './languages.json';

interface Language {
    name: string;
    // colors are taken from:
    // - https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml
    // - https://simpleicons.org/
    color: string;
    year: Record<string, number | null>;
}

const LANGUAGES: Language[] = languages;

export {LANGUAGES};
