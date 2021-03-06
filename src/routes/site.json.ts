import { sanityGet } from "$lib/sanity";

const menuHelper = `[]{title, linkUrl{type, url, openInNewTab, anchor, ref->{'slug' : slug.current }}}`;
import { videoFields } from "$lib/sanity";
const query = `
{
  "header"   : *[_id == 'header'  ][0] {menuItems${menuHelper}, 'contactLink': { 'title':  coalesce(^.contactLink.title, 'Get in Touch'), 'slug': coalesce(^.slug, '/contact')}},
  "footer"   : *[_id == 'footer'  ][0] {menuItems${menuHelper}, copyrightText},
  "codes"    : *[_id == 'codes'   ][0] {headerCode, footerCode},
  "contact"  : *[_id == 'contactSettings' ][0] {title, subtitle, sites, contactOptions, 'video' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage},
  "seo"      : *[_id == 'siteSEO' ][0] {title, description, nofollow, favicon, image},
  "socials"  : *[_id == 'socialMedia' ][0] { socials},
  "jobs"     : *[_id == 'jobs' ][0] {openings}
}`;

/** @type {import('./__types/site.json').RequestHandler} */
export async function get():Promise<{status:number, body:SiteSettings|string}> {
  const res = await sanityGet<SiteSettings>(query)
  return res;
}