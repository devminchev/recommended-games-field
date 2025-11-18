import { ChangeEvent, useEffect, useState } from 'react';
import { useFieldValue, useSDK } from '@contentful/react-apps-toolkit';

import { EntryProps } from 'contentful-management';
import { FieldAppSDK } from '@contentful/app-sdk';

const removeBrackets = (input: string) => {
    return input.replace(/\[|\]/g, '');
};

function useRecommendedGames() {
    const { cma: { entry: client }, notifier, entry, locales: { default: spaceLocale }} = useSDK<FieldAppSDK>();
    const [value, setValue] = useFieldValue<EntryProps[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedGames, setRecommendedGames] = useState({});

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const parse = JSON.parse(event.target.value);

        setValue(parse);
    };

    const load = async () => {
        setIsLoading(true);
        try {
            let ventureId = entry.fields.venture.getValue()?.sys.id;
            let ventureName = '';

            const { items } = await client.getMany({ query: { content_type: 'lobbySuggestedGames', 'sys.publishedVersion[exists]': true, ...ventureId && { 'fields.venture.sys.id': ventureId } } });
            const defaultRecommendedGames = items.reduce((acc: { [key: string]: EntryProps[] }, item: EntryProps) => {
                const name = removeBrackets(item.fields.entryTitle[spaceLocale]);
                const games = item.fields.games[spaceLocale];

                ventureName = name;
                acc[name] = games;
                return acc;
            }, {});

            setRecommendedGames(defaultRecommendedGames);

            if (defaultRecommendedGames[ventureName].length > 0 && value && defaultRecommendedGames[ventureName].length !== value?.length) {
                setValue(defaultRecommendedGames[ventureName]);
            };

            notifier.success('Suggested Games successfully set .');
        } catch (err: any) {
            console.log('err :', err);
            notifier.error(`Error fetching suggested games . ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        value,
        isLoading,
        recommendedGames,
        handleChange
    };
}

export default useRecommendedGames;
