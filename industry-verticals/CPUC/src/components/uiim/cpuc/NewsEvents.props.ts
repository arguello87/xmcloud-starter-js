import type { Field, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from 'lib/component-props';

type QueryField<T> = { jsonValue?: T };

export interface NewsEventItem {
  id: string;
  itemTitle?: QueryField<Field<string>>;
  itemLink?: QueryField<LinkField>;
  itemDate?: QueryField<Field<string>>;
  itemGroup?: QueryField<Field<string>>;
  itemIcon?: QueryField<Field<string>>;
}

export interface NewsEventsProps extends ComponentProps {
  fields?: {
    Title?: Field<string>;
    SecondaryTitle?: Field<string>;
    Text?: RichTextField;
    SecondaryText?: RichTextField;
    Link?: LinkField;
    data?: {
      datasource?: {
        title?: QueryField<Field<string>>;
        secondaryTitle?: QueryField<Field<string>>;
        text?: QueryField<RichTextField>;
        secondaryText?: QueryField<RichTextField>;
        link?: QueryField<LinkField>;
        children?: { results?: NewsEventItem[] };
      };
    };
  };
}
