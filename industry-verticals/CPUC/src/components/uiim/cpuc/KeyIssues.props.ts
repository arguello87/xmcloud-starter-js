import type { Field, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from 'lib/component-props';

type QueryField<T> = { jsonValue?: T };

export interface KeyIssueItem {
  id: string;
  itemTitle?: QueryField<Field<string>>;
  itemLink?: QueryField<LinkField>;
  itemDate?: QueryField<Field<string>>;
  itemGroup?: QueryField<Field<string>>;
  itemIcon?: QueryField<Field<string>>;
}

export interface KeyIssuesProps extends ComponentProps {
  fields?: {
    Title?: Field<string>;
    Text?: RichTextField;
    Link?: LinkField;
    data?: {
      datasource?: {
        title?: QueryField<Field<string>>;
        text?: QueryField<RichTextField>;
        link?: QueryField<LinkField>;
        children?: { results?: KeyIssueItem[] };
      };
    };
  };
}
