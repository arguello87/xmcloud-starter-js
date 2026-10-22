'use client';

import { Link, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import type { KeyIssuesProps } from './KeyIssues.props';

const IssueIcon = ({ name }: { name?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {name === 'chart' ? (
      <path d="M4 20V14M9 20V10M14 20V6M19 20V2" />
    ) : name === 'globe' ? (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </>
    ) : name === 'plug' ? (
      <path d="M8 3v5m8-5v5M6 8h12v4a6 6 0 0 1-12 0V8Zm6 10v4" />
    ) : name === 'flame' ? (
      <path d="M13 2c1 5-4 5-2 9 2-1 3-3 3-5 5 4 6 7 4 11a7 7 0 0 1-12-1C3 10 9 7 13 2Z" />
    ) : (
      <path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6M9 16h6" />
    )}
  </svg>
);

export const Default = ({ fields, params }: KeyIssuesProps) => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;

  if (!datasource) {
    return (
      <div className={`component cpuc-issues ${params.styles || ''}`} id={params.RenderingIdentifier}>
        <span className="is-empty-hint">KeyIssues</span>
      </div>
    );
  }

  const title = datasource.title?.jsonValue ?? fields?.Title;
  const text = datasource.text?.jsonValue ?? fields?.Text;
  const link = datasource.link?.jsonValue ?? fields?.Link;
  const items = datasource.children?.results ?? [];

  return (
    <section className={`component cpuc-issues ${params.styles || ''}`} id={params.RenderingIdentifier}>
      <div className="component-content cpuc-issues__layout">
        <div className="cpuc-issues__intro">
          {(title?.value || isEditing) && <Text field={title} tag="h2" className="cpuc-issues__title" />}
          {(text?.value || isEditing) && <RichText field={text} className="cpuc-issues__text" />}
          {(link?.value?.href || isEditing) && (
            <Link field={link ?? { value: { href: '' } }} className="cpuc-issues__cta" />
          )}
        </div>
        <ul className="cpuc-issues__list grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const itemTitle = item.itemTitle?.jsonValue;
            const itemLink = item.itemLink?.jsonValue;
            return (
              <li className="cpuc-issues__item" key={item.id}>
                <span className="cpuc-issues__icon"><IssueIcon name={item.itemIcon?.jsonValue?.value} /></span>
                {(itemTitle?.value || isEditing) && (
                  itemLink?.value?.href || isEditing ? (
                    <Link field={itemLink ?? { value: { href: '' } }} className="cpuc-issues__link">
                      <Text field={itemTitle} />
                    </Link>
                  ) : <Text field={itemTitle} tag="span" className="cpuc-issues__link" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* CPUC variant — navy introduction with an overlapping issue-link panel. */
export const Cpuc = Default;
