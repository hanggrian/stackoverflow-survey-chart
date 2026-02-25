import {describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import {LANGUAGES} from '../language.ts';

describe(
    'Languages',
    () =>
        it(
            'Assert years are correct',
            () =>
                LANGUAGES.forEach(language => {
                    let i = 2013;
                    Object
                        .keys(language.year)
                        .forEach(year =>
                            expect(year, `${language.name} missing ${year}.`)
                                .toBe((i++).toString()),
                        );
                }),
        ),
);
