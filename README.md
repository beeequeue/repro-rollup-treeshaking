# Treeshaking example

[Requested in a thread](https://github.com/jaredpalmer/tsdx/issues/276#issuecomment-616200239) about adding rollup's `preserveModules` configuration to [TSDX](https://github.com/jaredpalmer/tsdx).

## Description

This is an example of how using the `preserveModules` option in rollup allows webpack to properly tree-shake unused modules, which it can otherwise not do.

There are two packages with the same configuration, except for [one using `preserveModules`](https://github.com/BeeeQueue/rollup-treeshaking-repro/tree/master/packages/preserved-modules) while the [other doesn't](https://github.com/BeeeQueue/rollup-treeshaking-repro/tree/master/packages/concatenated).

These packages both export `ONE` and `TWO`, which are two similarly sized lorem ipsum strings (30kb~ raw, 8kb~ gzip), to simulate code in the packages.

The [`client`](https://github.com/BeeeQueue/rollup-treeshaking-repro/tree/master/client) application then imports `ONE` from both packages, and logs them.

The following screenshot is of the webpack bundle report (see Reproduction for how to generate your own).

It shows that the entire 60.15kb concatenated package was bundled, while only the `one.esm.js` file was included from the other package.

![](https://camo.githubusercontent.com/a44bb756067118e1b558b4c7f60a4620a332941d/68747470733a2f2f692e696d6775722e636f6d2f446776545978752e706e67)

### Other notes

From our testing, the preserved package would also be possible to split into chunks if the application has lazy-loaded parts, while the concatenated package would just be dumped into the vendors chunk.

This is better since it would only include the used parts where they're needed.

e.g. Page 1 needs `isNil` from a `utils`. Instead of every page having to load the entire `utils` library in the vendors chunk, it would put only `isNil` into the Page 1 chunk.

## Reproduction

1. Bootstrap monorepo - `yarn bootstrap`
1. Build everything - `yarn build`
1. Open the `client/dist/report.html` if fails to open by itself
1. Make sure to check the [show concatenated modules checkbox](https://camo.githubusercontent.com/cb98280fc49025c2ad62c8132faee8d9cde47669/68747470733a2f2f692e696d6775722e636f6d2f5a644e674e436a2e706e67)
