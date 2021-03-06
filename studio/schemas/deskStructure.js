

import S from '@sanity/desk-tool/structure-builder';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export default () =>
	S.list()
		.title('Base')
		.items([
			...S.documentTypeListItems().filter(
				(listItem) =>
					listItem.getSchemaType().name != 'section'
					&&
					!['siteSEO', 'contactSettings', 'header', 'footer', 'socialMedia', 'codes', 'jobs', 'support'].includes(
						listItem.getId()
					)
			),
			orderableDocumentListDeskItem({
				type: 'section',
				title: 'Front page Sections'
			}),

			S.divider(),
			S.listItem()
				.title('Settings')
				.child(
					S.list()
						.title('Settings')
						.items([
							S.listItem()
								.title('Header')
								.child(
									S.document()
										.schemaType('header')
										.id('header')
										.title('Header')
										.documentId('header')
								),
							S.listItem()
								.title('Footer')
								.child(
									S.document()
										.schemaType('footer')
										.id('footer')
										.title('Footer')
										.documentId('footer')
								),
								S.listItem()
								.title('Jobs')
								.child(
									S.document()
										.schemaType('jobs')
										.id('jobs')
										.title('Jobs')
										.documentId('jobs')
								),
								S.listItem()
								.title('Support Settings')
								.child(
									S.document()
										.schemaType('support')
										.id('support')
										.title('Support')
										.documentId('support')
								),
							S.listItem()
								.title('Contact Settings')
								.child(
									S.document()
										.schemaType('contactSettings')
										.id('contactSettings')
										.title('Contact')
										.documentId('contactSettings')
								),
							S.listItem()
								.title('Social Media')
								.child(
									S.document()
										.schemaType('socialMedia')
										.id('socialMedia')
										.title('Social Media')
										.documentId('socialMedia')
								),
							S.listItem()
								.title('SEO Settings')
								.child(
									S.document()
										.schemaType('siteSEO')
										.id('siteSEO')
										.title('SEO')
										.documentId('siteSEO')
								),
							S.listItem()
								.title('Header/Footer Code')
								.child(
									S.document()
										.schemaType('codes')
										.id('codes')
										.title('Header/Footer Code')
										.documentId('codes')
								),

						])
				)
		]);
