'use client';

import { Image, Link, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { BadgeCheck, RotateCcw, Plane, House, Car, Wrench, CalendarDays, BriefcaseBusiness } from 'lucide-react';
import type { BcaaProps } from './bcaa.props';

const icons = [BadgeCheck, RotateCcw, Plane, House, Car, Wrench, CalendarDays, BriefcaseBusiness];

export function Default(props: BcaaProps) {
  const { page } = useSitecore();
  const f = props.fields;
  const source = f?.data?.datasource;
  const items = f?.items || source?.children?.results?.map(item => ({ id: item.id, fields: { Label: item.label?.jsonValue, Icon: item.icon?.jsonValue, Link: item.link?.jsonValue } })) || [];
  if (!f) return page.mode.isEditing ? <p>Assign BCAA quick actions content.</p> : null;
  return <section className="bcaa bcaa-quick-actions" id={props.params?.RenderingIdentifier}>
    <div className="bcaa-container"><Text field={f.Title || source?.title?.jsonValue} tag="h2" /><ul>
      {items.map((item, i) => { const Icon = icons[i % icons.length]; return <li key={item.id || i}>
        {item.fields.Link?.value?.href || page.mode.isEditing ? <Link field={item.fields.Link || { value: {} }}>
          {(item.fields.Icon?.value?.src || page.mode.isEditing) && <Image field={item.fields.Icon || { value: {} }} />}
          {!item.fields.Icon?.value?.src && <Icon aria-hidden="true" size={30} />}
          <Text field={item.fields.Label} />
        </Link> : <Text field={item.fields.Label} />}
      </li>; })}
    </ul></div>
  </section>;
}
