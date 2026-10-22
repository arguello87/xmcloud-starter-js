'use client';

import { JSX } from 'react';
import {
  Link,
  Text,
  RichText,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

import type { FooterProps } from './footer.props';
export type { FooterProps } from './footer.props';


export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component component-spaced footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 row-gap-5 gx-5">
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title3} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title4} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-gap-5 gx-5">
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links links-socials">
                <Link field={props.fields?.SocialLink1}>
                  <NextImage field={props.fields?.SocialIcon1} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink2}>
                  <NextImage field={props.fields?.SocialIcon2} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink3}>
                  <NextImage field={props.fields?.SocialIcon3} width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* CPUC contact tier — three editable rich-text columns. */
export const CpucContact = (props: FooterProps): JSX.Element => {
  const fields = props.fields;
  if (!fields) return <p role="status">Footer: content is unavailable.</p>;
  const columns = [
    { title: fields.Title1, text: fields.Text1 },
    { title: fields.Title2, text: fields.Text2 },
    { title: fields.Title3, text: fields.Text3 },
  ];
  return (
    <section className={`component cpuc-contact ${props.params?.styles || ''}`} id={props.params?.RenderingIdentifier || undefined}>
      <div className="container cpuc-footer__columns">{columns.map((column, index) => <div key={index}>
        <Text field={column.title} tag="h2" /><RichText field={column.text} />
      </div>)}</div>
    </section>
  );
};

/* CPUC footer — teal link columns with a separate legal strip. */
export const Cpuc = (props: FooterProps): JSX.Element => {
  const fields = props.fields;
  if (!fields) return <p role="status">Footer: content is unavailable.</p>;
  const columns = [
    { title: fields.Title1, text: fields.Text1 },
    { title: fields.Title2, text: fields.Text2 },
    { title: fields.Title3, text: fields.Text3 },
  ];
  return (
    <footer className={`component cpuc-footer ${props.params?.styles || ''}`} id={props.params?.RenderingIdentifier || undefined}>
      <div className="cpuc-footer__main"><div className="container cpuc-footer__columns">
        {columns.map((column, index) => <div key={index}><Text field={column.title} tag="h2" /><RichText field={column.text} /></div>)}
      </div></div>
      <div className="cpuc-footer__legal"><div className="container cpuc-footer__legal-inner"><RichText field={fields.Text4} /><div className="cpuc-footer__legal-links"><Link field={fields.Link1} /><Link field={fields.Link2} /></div></div></div>
      <div className="cpuc-footer__copyright"><div className="container"><Text field={fields.Copyright} /></div></div>
    </footer>
  );
};
