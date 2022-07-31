export interface TagFactories {
	blockquote(children: any[]): any[];
	code(body: string): any[];
	codeblock(lang: string, body: string): any[];
	em(body: string): any[];
	heading(level: number, children: any[]): any[];
	hr(): any[];
	img(src: string, alt: string): any[];
	li(children: any[]): any[];
	link(href: string, body: string): any[];
	list(type: string, items: any[]): any[];
	paragraph(children: any[]): any[];
	strike(body: string): any[];
	strong(body: string): any[];
	table(rows: any[]): any[];
	td(i: number, children: any[]): any[];
	tr(i: number, cells: any[]): any[];
}
