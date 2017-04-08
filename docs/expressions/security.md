---
layout: default
---

<h1 id="security">Security <a href="#security" title="Permalink">#</a></h1>

Executing arbitrary expressions like enabled by the expression parser of
mathjs involves a risk in general. When you're using mathjs to let users
execute arbitrary expressions, it's good to take a moment to think about
possible security and stability implications.

<h2 id="security-risks">Security risks <a href="#security-risks" title="Permalink">#</a></h2>

A user could try to inject malicious JavaScript code via the expression
parser. The expression parser of mathjs offers a sandboxed environment
to execute expressions which should make this impossible. It's possible
though that there is an unknown security hole, so it's important to be
careful, especially when allowing server side execution of arbitrary
expressions.

The expression parser of mathjs parses the input in a controlled
way into an expression tree, then compiles it into fast performing
JavaScript using JavaScript's `eval` before actually evaluating the
expression. The parser actively prevents access to JavaScripts internal
`eval` and `new Function` which are the main cause of security attacks.

When running a node.js server, it's good to be aware of the different
types of security risks. The risk whe running inside a browser may be
limited though it's good to be aware of [Cross side scripting (XSS)](https://www.wikiwand.com/en/Cross-site_scripting) vulnerabilities. A nice overview of
security risks of a node.js servers is listed in an article [Node.js security checklist](https://blog.risingstack.com/node-js-security-checklist/) by Gergely Nemeth.

<h3 id="found-a-security-vulnerability-please-report-in-private">Found a security vulnerability? Please report in private! <a href="#found-a-security-vulnerability-please-report-in-private" title="Permalink">#</a></h3>

You found a security vulnerability? Awesome! We hope you don't have bad
intentions and want to help fix the issue. Please report the
vulnerability in a private way by contacting one of the maintainers
via mail or an other private channel. That way we can work together
on a fix before sharing the issue with everybody including the bad guys.

<h2 id="stability-risks">Stability risks <a href="#stability-risks" title="Permalink">#</a></h2>

A user could accidentally or on purpose execute a
heavy expression like creating a huge matrix. That can let the
JavaScript engine run out of memory or freeze it when the CPU goes
to 100% for a long time.

To protect against this sort of issue, one can run the expression parser
in a separate Web Worker or child_process, so it can't affect the
main process. The workers can be killed when it runs for too
long or consumes too much memory. A useful library in this regard
is [workerpool](https://github.com/josdejong/workerpool), which makes
it easy to manage a pool of workers in both browser and node.js.