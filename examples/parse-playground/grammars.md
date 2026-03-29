## Whitespace encoding

- https://demo.thi.ng/umbrella/parse-playground/#ldmPY29tbWVudDogIiMiIC4oPys8RE5MPikgPT4gZGlzY2FyZCA7Cnplcm86ICdcbicgPT4gIjAiIDsKb25lOiAiIFxuIiA9PiAiMSIgOwphc2NpaTogKDxvbmU-fDx6ZXJvPil7N30gPT4gYmluYXJ5IDsKbWFpbjogKDxjb21tZW50Pnw8YXNjaWk-KSogOwqkbWFpbtlDIyBzZWxlY3QgYWxsIHRvIHNlZSB3aGl0ZXNwYWNlCiMgQQogCgogCgogCgogCiMgQgogCgoKIAoKIAogCiMgZW5kCqCg
- https://demo.thi.ng/umbrella/parse-playground/#ldm9IyB3aGl0ZXNwYWNlIG9ubHkgbGFuZyAody8gb3B0aW9uYWwgY29tbWVudHMpCmNvbW1lbnQ6ICIjIiAuKD8rPEROTD4pID0-IGRpc2NhcmQgOwp6ZXJvOiAnXG4nID0-ICIwIiA7Cm9uZTogIiBcbiIgPT4gIjEiIDsKYXNjaWk6ICg8b25lPnw8emVybz4pezd9ID0-IGJpbmFyeSA7Cm1haW46ICg8Y29tbWVudD58PGFzY2lpPikqIDsKpG1haW7ZiiMgc2VsZWN0IGFsbCB0byBzZWUgd2hpdGVzcGFjZQojIHQKIAogCiAKCiAKCgojIHcKIAogCiAKCiAKIAogCiMgaQogCiAKCiAKCgogCiMgdAogCiAKIAoKIAoKCiMgdAogCiAKIAoKIAoKCiMgZQogCiAKCgogCgogCiMgcgogCiAKIAoKCiAKCqCg

```js
"twitter".split("").map(x=>`# ${x}\n`+str.padLeft(7,"0")(x.charCodeAt(0).toString(2)).split("").map(x=>[""," "][x]).join("\n")).join("\n")
```

## Markdown (w/ extensions)

- `:emoji:` support
- custom blocks: `::: ... :::`
- meta blocks `{{{ json }}}`
- link refs: `[label][ref]` and elsewhere `[ref]: http://....`
- footnotes: `[^1]` and elsewhere `[^1]: ...`

```
DNL1: <DNL>+ => discard ;
DNL2: <NL>{2,} ;
inlinedelim: ( "![" | '[' | "**" | '_' | "~~" | '`' | " :" ) ;
delim: ( <inlinedelim> | <DNL2> ) ;
delim1: ( <inlinedelim> | <NL> ) ;
body: .(?-<delim>!) => join ;
body1: .(?-<delim1>!) => join ;

ref: "[["! .(?+"]]"!) => join ;
fnref: "[^"! <uint> "]"! ;
fnote: <LSTART> "[^"! <uint> "]:"! <WS1> <para> ;
label: .(?+']'!) => join ;
target: .(?+')'!) => join ;
link: '['! <label> '('! <target> ;
linkref: '['! <label> '['! <label> ;
linkdef: <LSTART> '['! <label> ':'! <WS1> <ldtarget> ;
ldtarget: .(?+<DNL1>) => join ;
img: "!["! <label> '('! <target> ;
bold: "**"! .(?+"**"!) => join ;
italic: "_"! .(?+"_"!) => join ;
code: '`'! .(?+'`'!) => join ;
strike: "~~"! .(?+"~~"!) => join ;
emoji: " :"! <ALPHA_NUM>(?+':'!) => join ;
para: (<ref> | <img> | <fnref> | <linkref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <body>)* <DNL2>! ;

hdlevel: '#'+ => count ;
hd: <LSTART> <hdlevel> <WS0>
    (<ref> | <img> | <fnref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <body1> )* <DNL1> ;

lilevel: ' '* => count ;
ulid: <DNL> <WS0> '-'! ;
ulidelim: ( <delim> | <ulid> ) ;
ulibody: .(?-<ulidelim>!) => join ;
todo: '['! [ xX] ']'! <WS1> => hoistR ;
ulitem: <LSTART> <lilevel> "- "! <todo>?
        (<ref> | <img> | <fnref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <ulibody> )* <DNL> ;
ulist: <ulitem>+ <DNL1> ;

uint: <DIGIT>+ => int ;
olid: <DNL> <WS0> <DIGIT>+! '.'! ;
olidelim: ( <delim> | <olid> ) ;
olibody: .(?-<olidelim>!) => join ;
olitem: <LSTART> <lilevel> <uint> ". "! <todo>?
        (<ref> | <img> | <fnref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <olibody> )* <DNL> ;
olist: <olitem>+ <DNL1> ;

cbdelim: <LSTART> "```"! ;
codeblock: <cbdelim>! <codemeta> <codebody> <DNL1> ;
codemeta: .(?+<NL>!) => join ;
codebody: .(?+<cbdelim>) => join ;

customdelim: <LSTART> ":::"! ;
customblock: <customdelim>! <custommeta> <custombody> <DNL1> ;
custommeta: .(?+<NL>!) => join ;
custombody: .(?+<customdelim>) => join ;

metablock: <LSTART> "{{{"! <meta> <DNL1> => hoist ;
metaend: "}}}" <LEND> ;
meta: .(?+<metaend>!) => json ;

bqline: <LSTART> "> "!
        (<ref> | <img> | <fnref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <body1>)* <DNL> ;
bquote: <bqline>+ <DNL1> ;

tdelim: (<inlinedelim> | '|' ) ;
tbody: .(?-<tdelim>!) => join ;
tcell: <WS0> (<ref> | <img> | <fnref> | <link> | <bold> | <italic> | <strike> | <code> | <emoji> | <tbody> )* '|'! ;
trow: <LSTART> '|'! <tcell>(?+<DNL>) ;
table: <trow>+ <DNL1> ;

hr: "--"! '-'!(?-<NL>!) <DNL1> ;

main: <WS0> (<hd> | <ulist> | <olist> | <bquote> | <codeblock> | <customblock> | <metablock> | <table> | <hr> | <fnote> | <linkdef> | <para>)* ;
```
