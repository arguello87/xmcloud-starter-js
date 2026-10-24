'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { AppPlaceholder, Image, Link, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import type { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ReactNode } from 'react';
import type { BcaaProps } from './bcaa.props';

function Section({ props, name, children }: { props: BcaaProps; name: string; children: ReactNode }) {
  const { page } = useSitecore();
  if (!props.fields) return page.mode.isEditing ? <p className="bcaa-empty-hint">Assign BCAA component content.</p> : null;
  return <section id={props.params?.RenderingIdentifier} className={`bcaa ${name} ${props.params?.styles || ''}`}>{children}</section>;
}
function Photo({ field, className = '', loading = 'lazy' }: { field?: ImageField; className?: string; loading?: 'lazy' | 'eager' }) {
  const { page } = useSitecore();
  return field?.value?.src || page.mode.isEditing ? <Image field={field || { value: {} }} className={className} loading={loading} /> : null;
}
function Action({ field, children, className = 'bcaa-button' }: { field?: LinkField; children?: ReactNode; className?: string }) {
  const { page } = useSitecore();
  return field?.value?.href || page.mode.isEditing ? <Link field={field || { value: {} }} className={className}>{children}</Link> : null;
}

export function BcaaHeader(props: BcaaProps) {
  const [open, setOpen] = useState(false);
  const { page } = useSitecore();
  const f = props.fields || {};
  return <Section props={props} name="bcaa-header"><div className="bcaa-container bcaa-header-inner">
    <NextLink href="/" aria-label="BCAA home" className="bcaa-logo"><Photo field={f.LogoImage} /></NextLink>
    <button type="button" className="bcaa-menu" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
    <nav aria-label="Main navigation" className={open ? 'is-open' : ''}>{f.Navigation ? <RichText field={f.Navigation} /> : props.rendering && props.componentMap ? <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} /> : null}</nav>
  </div></Section>;
}

export function BcaaCarousel(props: BcaaProps) {
  const [selected, setSelected] = useState(0);
  const { page } = useSitecore();
  const items = props.fields?.items || [];
  const index = Math.min(selected, Math.max(0, items.length - 1));
  if (!items.length) return page.mode.isEditing ? <Section props={props} name="bcaa-hero"><p>Add BCAA carousel slides.</p></Section> : null;
  return <Section props={props} name="bcaa-hero"><div aria-roledescription="carousel" aria-label="BCAA highlights">
    {items.map((item, i) => <article key={item.id || i} className="bcaa-slide" hidden={i !== index} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
      <Photo field={item.fields.Image} className="bcaa-hero-image" loading={i === index ? 'eager' : 'lazy'} />
      <div className="bcaa-hero-shade" /><div className="bcaa-container bcaa-hero-copy">
        <Text field={item.fields.Title} tag="h1" /><RichText field={item.fields.Text} /><Action field={item.fields.Link} />
      </div>
    </article>)}
    {items.length > 1 && <div className="bcaa-carousel-controls">
      <button type="button" aria-label="Previous slide" onClick={() => setSelected((index - 1 + items.length) % items.length)}>←</button>
      {items.map((item, i) => <button type="button" key={item.id || i} aria-label={`Show slide ${i + 1}`} aria-pressed={i === index} onClick={() => setSelected(i)}>{i + 1}</button>)}
      <button type="button" aria-label="Next slide" onClick={() => setSelected((index + 1) % items.length)}>→</button>
    </div>}
  </div></Section>;
}

export function BcaaHeading(props: BcaaProps) {
  const f = props.fields || {};
  const { page } = useSitecore();
  const title = f.Heading?.value || '';
  const split = props.params?.styles?.includes('bcaa-intro') && !page.mode.isEditing ? title.lastIndexOf(' ') : -1;
  return <Section props={props} name="bcaa-heading"><div className="bcaa-container bcaa-heading-inner">
    {split > 0 ? <h2><Text field={{ value: title.slice(0, split + 1) }} /><em><Text field={{ value: title.slice(split + 1) }} /></em></h2> : <Text field={f.Heading} tag="h2" />}<div><Text field={f.Text} tag="p" /><Action field={f.Link} className="bcaa-text-link" /></div>
  </div></Section>;
}

export function BcaaThreeColumns(props: BcaaProps) {
  const f = props.fields || {};
  const cards = [
    { title: f.Text1, text: f.SubText1, image: f.Image1, link: f.Link1 },
    { title: f.Text2, text: f.SubText2, image: f.Image2, link: f.Link2 },
    { title: f.Text3, text: f.SubText3, image: f.Image3, link: f.Link3 },
  ];
  return <Section props={props} name="bcaa-three"><div className="bcaa-container bcaa-grid bcaa-grid-three">
    {cards.map((card, i) => <article key={i} className="bcaa-card"><Photo field={card.image} /><div className="bcaa-card-copy">
      <Text field={card.title} tag="h3" /><Text field={card.text} tag="p" /><Action field={card.link} className="bcaa-card-link" />
    </div></article>)}
  </div></Section>;
}

export function BcaaFourColumns(props: BcaaProps) {
  const f = props.fields || {};
  const cards = [
    { title: f.Title1, text: f.Text1, image: f.Image1, link: f.Link1 },
    { title: f.Title2, text: f.Text2, image: f.Image2, link: f.Link2 },
    { title: f.Title3, text: f.Text3, image: f.Image3, link: f.Link3 },
    { title: f.Title4, text: f.Text4, image: f.Image4, link: f.Link4 },
  ];
  return <Section props={props} name="bcaa-four"><div className="bcaa-container bcaa-grid bcaa-grid-four">
    {cards.map((card, i) => <article key={i} className="bcaa-card"><Photo field={card.image} /><div className="bcaa-card-copy">
      <Text field={card.title} tag="h3" /><Text field={card.text} tag="p" /><Action field={card.link} className="bcaa-card-link" />
    </div></article>)}
  </div></Section>;
}

export function BcaaBanner(props: BcaaProps) {
  const f = props.fields || {};
  return <Section props={props} name="bcaa-banner"><div className="bcaa-container"><div className="bcaa-banner-inner">
    <Photo field={f.Image} /><Text field={f.Title} tag="h2" /><Action field={f.Link} />
  </div></div></Section>;
}

export function BcaaFooter(props: BcaaProps) {
  const f = props.fields || {};
  const groups = [{ title: f.Title1, text: f.Text1 }, { title: f.Title2, text: f.Text2 }, { title: f.Title3, text: f.Text3 }, { title: f.Title4, text: f.Text4 }];
  const socials = [{ link: f.SocialLink1, icon: f.SocialIcon1 }, { link: f.SocialLink2, icon: f.SocialIcon2 }, { link: f.SocialLink3, icon: f.SocialIcon3 }];
  return <Section props={props} name="bcaa-footer"><footer className="bcaa-container"><div className="bcaa-grid bcaa-grid-four">
    {groups.map((group, i) => <div key={i}><Text field={group.title} tag="h2" /><RichText field={group.text} /></div>)}
  </div><div className="bcaa-socials"><Text field={f.SocialsTitle} tag="h2" />{socials.map((social, i) => <Action key={i} field={social.link} className="bcaa-social-link"><Photo field={social.icon} /></Action>)}</div>
    <div className="bcaa-footer-base"><Photo field={f.Image1} /><div><Text field={f.Copyright} tag="p" /><Action field={f.Link1} className="bcaa-text-link" /><Action field={f.Link2} className="bcaa-text-link" /></div></div>
  </footer></Section>;
}
