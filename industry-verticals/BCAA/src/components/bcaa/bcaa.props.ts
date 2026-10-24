import type { ComponentMap, Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from 'lib/component-props';

export interface BcaaFields {
  Title?: Field<string>;
  Heading?: Field<string>;
  Text?: RichTextField;
  Eyebrow?: Field<string>;
  Image?: ImageField;
  LogoImage?: ImageField;
  Navigation?: RichTextField;
  Link?: LinkField;
  Title1?: Field<string>; Title2?: Field<string>; Title3?: Field<string>; Title4?: Field<string>;
  Text1?: Field<string>; Text2?: Field<string>; Text3?: Field<string>; Text4?: Field<string>;
  SubText1?: Field<string>; SubText2?: Field<string>; SubText3?: Field<string>;
  Image1?: ImageField; Image2?: ImageField; Image3?: ImageField; Image4?: ImageField;
  Link1?: LinkField; Link2?: LinkField; Link3?: LinkField; Link4?: LinkField;
  Copyright?: Field<string>;
  SocialsTitle?: Field<string>;
  SocialLink1?: LinkField; SocialLink2?: LinkField; SocialLink3?: LinkField;
  SocialIcon1?: ImageField; SocialIcon2?: ImageField; SocialIcon3?: ImageField;
  items?: BcaaItem[];
  data?: { datasource?: { title?: { jsonValue?: Field<string> }; children?: { results?: Array<{ id?: string; label?: { jsonValue?: Field<string> }; icon?: { jsonValue?: ImageField }; link?: { jsonValue?: LinkField } }> } } };
}
export interface BcaaItem {
  id?: string;
  fields: BcaaFields & { Label?: Field<string>; Icon?: ImageField };
}
export interface BcaaProps extends Partial<ComponentProps> {
  componentMap?: ComponentMap;
  fields?: BcaaFields;
}
