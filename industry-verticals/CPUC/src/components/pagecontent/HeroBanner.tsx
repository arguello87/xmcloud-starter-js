'use client';

import { JSX } from 'react';
import {
  Text,
  RichText,
  useSitecore,
  Link,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { IconAccent } from 'components/non-sitecore/IconAccent';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

import type { HeroBannerProps } from './hero-banner.props';
export type { HeroBannerProps } from './hero-banner.props';


export const Default = (props: HeroBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component hero-banner ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container container-wide">
        <div className="hero-row">
          <div className="content-column">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Tagline} />
            </h6>
            <h1 className="display-2 fw-bold">
              <Text field={props.fields.Title} />
            </h1>

            <div className="rich-content mb-4">
              <RichText field={props.fields.Text} />
            </div>
            <div className="btn-array pt-3 pb-4">
              {(isPageEditing || props.fields?.Cta1?.value?.href) && (
                <Link field={props.fields.Cta1} className="button button-main" />
              )}
              {(isPageEditing || props.fields?.Cta2?.value?.href) && (
                <Link field={props.fields.Cta2} className="button button-simple mx-4" />
              )}
            </div>
            <div className="row mt-2">
              <Placeholder name="hero-banner" rendering={props.rendering} />
            </div>
            <IconAccent image={props.fields.Icon} />
          </div>
          <div className="img-column">
            <div className="img-wrapper">
              <DottedAccent className="dotted-accent-top" />
              <NextImage
                field={props.fields.Image}
                className="img-fluid"
                width={700}
                height={700}
              />
              <DottedAccent className="dotted-accent-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* CPUC variant — split navy hero with an overlapping photograph. */
export const Cpuc = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields;
  if (!fields) return <p role="status">HeroBanner: content is unavailable.</p>;
  return (
    <section className={`component cpuc-hero ${props.params?.styles || ''}`} id={props.params?.RenderingIdentifier || undefined}>
      <div className="container cpuc-hero__inner">
        <div className="cpuc-hero__content">
          {(fields.Title?.value || isEditing) && <Text field={fields.Title} tag="h1" />}
          {(fields.Text?.value || isEditing) && <RichText field={fields.Text} className="cpuc-hero__description" />}
          {(fields.Cta1?.value?.href || isEditing) && <Link field={fields.Cta1} className="cpuc-button cpuc-button--light" />}
        </div>
        {(fields.Image?.value?.src || isEditing) && <div className="cpuc-hero__image"><NextImage field={fields.Image} width={1000} height={420} /></div>}
      </div>
    </section>
  );
};
