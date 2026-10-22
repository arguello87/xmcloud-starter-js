'use client';

import { Link, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import type { NewsEventsProps } from './NewsEvents.props';

export const Default = ({ fields, params }: NewsEventsProps) => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;

  if (!datasource) {
    return (
      <div className={`component cpuc-news ${params.styles || ''}`} id={params.RenderingIdentifier}>
        <span className="is-empty-hint">NewsEvents</span>
      </div>
    );
  }

  const items = datasource.children?.results ?? [];
  const columns = [
    {
      group: 'news',
      title: datasource.title?.jsonValue ?? fields?.Title,
      footer: datasource.text?.jsonValue ?? fields?.Text,
    },
    {
      group: 'events',
      title: datasource.secondaryTitle?.jsonValue ?? fields?.SecondaryTitle,
      footer: datasource.secondaryText?.jsonValue ?? fields?.SecondaryText,
    },
  ];

  return (
    <section className={`component cpuc-news ${params.styles || ''}`} id={params.RenderingIdentifier}>
      <div className="component-content cpuc-news__grid grid gap-10 md:grid-cols-2">
        {columns.map((column) => (
          <div className="cpuc-news__column" key={column.group}>
            {(column.title?.value || isEditing) && (
              <Text field={column.title} tag="h2" className="cpuc-news__heading" />
            )}
            <ul className="cpuc-news__list">
              {items
                .filter((item) => item.itemGroup?.jsonValue?.value?.trim().toLowerCase() === column.group)
                .map((item) => {
                  const title = item.itemTitle?.jsonValue;
                  const link = item.itemLink?.jsonValue;
                  const date = item.itemDate?.jsonValue;
                  return (
                    <li className="cpuc-news__item" key={item.id}>
                      {(title?.value || isEditing) && (
                        <h3 className="cpuc-news__title">
                          {link?.value?.href || isEditing ? (
                            <Link field={link ?? { value: { href: '' } }}>
                              <Text field={title} />
                            </Link>
                          ) : (
                            <Text field={title} />
                          )}
                        </h3>
                      )}
                      {(date?.value || isEditing) && (
                        <Text field={date} tag="p" className="cpuc-news__date" />
                      )}
                    </li>
                  );
                })}
            </ul>
            {(column.footer?.value || isEditing) && (
              <RichText field={column.footer} className="cpuc-news__footer" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/* CPUC variant — paired editable news and event lists. */
export const Cpuc = Default;
