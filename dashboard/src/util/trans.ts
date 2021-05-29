import {createIntl, createIntlCache, IntlCache} from 'react-intl';

import {isBrowser} from './browser';
import {getLang} from './query-param';

// This is optional but highly recommended
// since it prevents memory leak
const cache: IntlCache = createIntlCache();

const messages: any = {}; // Only for SSR
const intlProv: any = {};

function getMessages(lang: string): any {
    if (!messages[lang]) {
        messages[lang] = isBrowser ? window.__NEXT_DATA__?.props.messages : global.lang_messages;
    }

    return messages[lang];
}

function getIntlProvider(lang: any): any {
    if (!intlProv[lang]) {
        intlProv[lang] = createIntl(
            {
                locale: lang,
                messages: getMessages(lang),
                onError: () => {
                },
            },
            cache
        );
    }

    return intlProv[lang];

}

if (!isBrowser) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en'); // Add locale data for en
    require('@formatjs/intl-relativetimeformat/locale-data/ar'); // Add locale data for ar
}

export function trans(id: any, values?: any): string {
    const lang = getLang();
    const intl = getIntlProvider(lang);

    return intl.formatMessage({id}, values);
}
