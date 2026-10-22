'use client';

import { cpucImage } from 'lib/cpuc-image';
import { AppPlaceholder, NextImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { JSX } from 'react';
import NextLink from 'next/link';
import PreviewSearch from '../search/PreviewSearch';

import type { HeaderProps } from './header.props';
export type { HeaderProps } from './header.props';


export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <div className={`component header ${props.params.styles?.trimEnd()}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <AppPlaceholder name="header-left" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};



export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  
  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <NextLink href="/"><NextImage field={props.fields.LogoImage} width={200} height={50} /></NextLink>
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* CPUC variant — editable seal/title lockup and inline search. */
export const Cpuc = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const searchIndex = props.fields?.SearchIndex?.value?.trim() || process.env.NEXT_PUBLIC_SEARCH_INDEX_ID?.trim();
  return (
    <header className={`component cpuc-header ${props.params?.styles || ''}`} id={props.params?.RenderingIdentifier || undefined}>
      <div className="container cpuc-header__inner">
        <div className="cpuc-header__brand">
          <NextLink href="/" className="cpuc-header__seal"><NextImage field={cpucImage(props.fields?.LogoImage, "/cpuc/logo.png", "California Public Utilities Commission seal")} width={100} height={100} /></NextLink>
          <div className="cpuc-header__identity">
            {(props.fields?.Tagline?.value || isEditing) && <Text field={props.fields?.Tagline} tag="span" className="cpuc-header__tagline" />}
            {(props.fields?.Title?.value || isEditing) && <Text field={props.fields?.Title} tag="span" className="cpuc-header__title" />}
          </div>
          {isEditing && <AppPlaceholder name="header-left" rendering={props.rendering} page={page} componentMap={props.componentMap} />}
        </div>
        <div className="cpuc-header__right">
          {searchIndex ? <PreviewSearch searchIndexId={searchIndex} /> : (
            <div className="cpuc-header__search-unavailable">
              <label className="visually-hidden" htmlFor="cpuc-site-search">Search is unavailable in this demo</label>
              <input id="cpuc-site-search" type="search" placeholder="Search example: How can I reduce my bill?" disabled />
              <button type="button" disabled>Search</button>
              {isEditing && <p>Assign a search index to enable search.</p>}
            </div>
          )}
          {isEditing && <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />}
        </div>
      </div>
    </header>
  );
};
