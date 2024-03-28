<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package uses vanilla JS objects to define component specs for various types
of form elements (various factory functions are provided). These specs can then
be passed to the polymorphic & dynamically extensible
[`compileForm()`](https://docs.thi.ng/umbrella/rdom/functions/compileForm.html)
function to generate the actual form elements/components in hiccup format, which
can then be used with
[thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) or
for static (or SSR) HTML generation via
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

All generated form elements are unstyled by default, but can be fully customized
(in various stages) via user-provided options.

## Examples

Please see the [rdom-formgen example
project](https://github.com/thi-ng/umbrella/blob/develop/examples/rdom-formgen),
which demonstrates **all** supported elements and various customization
options...

### Login form

```ts tangle:export/readme1.ts
import {
	compileForm, form, hidden, password, str, submit
} from "@thi.ng/rdom-forms";

// compile form from given field descriptions
const loginForm = compileForm(
	form({ action: "/login", method: "post" },
		// string input
		str({ id: "user", label: "Username", desc: "or email address" }),
		// password
		password({ id: "pass", label: "Password", desc: "min. 8 characters", min: 8 }),
		// hidden form value
		hidden({ name: "target", value: "user-home" }),
		submit({ title: "Login", label: "" })
	),
	{
		// disable reactive value subscriptions
		behaviors: { values: false },
		// customize attribs for label descriptions
		descAttribs: { class: "desc" }
	}
);

// use thi.ng/hiccup to serialize as HTML
import { serialize } from "@thi.ng/hiccup";

console.log(serialize(loginForm));
```

Resulting output (reformatted):

```html
<form action="/login" method="post">
	<div>
		<label for="user">Username<span class="desc">or email address</span></label>
		<input type="text" id="user" name="user" />
	</div>
	<div>
		<label for="pass">Password<span class="desc">min. 8 characters</span></label>
		<input type="password" autocomplete minlength="8" id="pass" name="pass" />
	</div>
	<input type="hidden" id="target" name="target" value="user-home" />
	<div>
		<label for="submit-0"></label>
		<input type="submit" value="Login" id="submit-0" name="submit-0" />
	</div>
</form>
```

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

TODO

<!-- include ../../assets/tpl/footer.md -->
