( run via `npx pointfree tools/semver.f packages` )

( builds path to package.json )
: pkg-path ( name base -- path ) swap "/" swap "/package.json" + + + ;

( takes package dir , returns parsed package.json )
: read-pkg ( name base -- json ) pkg-path read-file json> ;

( extracts semver package name from given package object )
: pkg-semver ( pkg -- name@version ) dup "name" at "@" rot "version" at + + ;

( package list filter )
: filter-pkg ( name pat -- name? ) over -rot match? not [ drop ] when ;

( store pattern and base dir in global var )
@args dup 2 at pattern! 1 at dup base!

( load packages dir )
read-dir

( filter package list if CLI arg given )
@args length 2 > [ [ @pattern filter-pkg ] mapll ] when

( try to process all packages, ignoring any errors )
[ [ @base read-pkg pkg-semver . ] [ drop ] try ] mapl
