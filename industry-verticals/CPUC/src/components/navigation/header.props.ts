import type { ImageField, ComponentMap, Field } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from 'lib/component-props';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
    Title?: Field<string>;
    Tagline?: Field<string>;
    SearchIndex?: Field<string>;
  };
  componentMap: ComponentMap;
};
