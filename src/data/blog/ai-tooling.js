/**
 * AI & tooling. Written from running these tools daily on client work, not
 * from reading their marketing pages.
 */

export const aiTooling = [
  {
    slug: 'the-build-passed-and-everything-was-broken',
    title: 'The build passed and every image on the page disappeared',
    category: 'ai-tooling',
    date: '2026-08-26',
    excerpt:
      'A refactor that compiled cleanly, deployed cleanly, and silently stripped a required wrapper off fifteen objects. A short story about why a green build is not a test.',
    body: [
      'We were reordering the project list on this site. Fifteen entries in an array, each wrapped in a `make({ ... })` call that attaches the screenshot path, the favicon and the fallback image URLs. A script rewrote the order.',
      'The script sliced each block starting at the first bracket it found. The first bracket in `make({` is the paren — so every block came out as `({ ... })`, a bare object with the `make` identifier shaved off the front.',
      '## Everything looked fine',
      'That is valid JavaScript. An expression wrapped in parentheses evaluates to the object inside it. The array still had fifteen entries. Every title, summary, year and tech-stack chip still rendered, because those are literal properties on the object.',
      'What vanished were the derived ones. `make()` is what attaches `local`, `favicon`, `shot` and `logo`. Without it those were all undefined, the image component walked an empty list of sources and rendered nothing at all.',
      'The build passed. The bundler had no opinion, because there was nothing wrong with the syntax. The deploy would have gone out.',
      '## What actually caught it',
      'Not the build. Not a glance at the page either — the first screenshot showed a blank purple panel where the preview should have been, and the honest thing to admit is that we looked at it and blamed lazy loading. It was a plausible explanation and it was wrong.',
      'What caught it was checking the network tab. Zero image requests. Not slow requests, not failed requests — the browser was never asked for a single image. Lazy loading does not explain that. Nothing explains that except the URLs never existing.',
      '## The lesson we actually took',
      'A green build tells you the code parses and the bundler resolved its imports. It tells you nothing about whether the code still does what it did yesterday. We knew that abstractly. We had not felt it recently.',
      'The fix in the code was trivial — a regex that splits on the `make({` boundary rather than on bracket depth, plus an assertion that the count of `make(` occurrences is unchanged after the rewrite. The fix in the process was smaller and more useful: when something looks wrong, verify the mechanism before accepting the comfortable explanation.',
      'We now write that assertion into any script that rewrites source. If a transformation is supposed to preserve something, say so in code and let it fail loudly. A script that reorders fifteen things should refuse to write the file if it ends up with fourteen.'
    ]
  },
  {
    slug: 'claude-code-copilot-cursor-which-one-for-which-job',
    title: 'Claude Code, Copilot, Cursor: which one for which job',
    category: 'ai-tooling',
    date: '2026-08-14',
    excerpt:
      'Three tools with genuinely different shapes. We run all three, and the choice is less about which is best than about what kind of task is in front of you.',
    body: [
      'The three dominant AI coding tools in 2026 take fundamentally different approaches, and the differences are structural rather than cosmetic. Cursor is an AI-native IDE. Copilot is an extension that lives inside the editor you already use. Claude Code is a terminal agent with no editor at all.',
      'The shortest accurate summary we have heard: Copilot makes you faster, Claude Code does the task for you, and Cursor lets you slide between the two in one window.',
      '## Where each one earns its place',
      'Copilot is the best value for inline completion. If most of your day is writing code you already know how to write, and you want the next fifteen characters predicted well, it is hard to beat and it is the cheapest of the three. It matters most in a large team already standardised on VS Code or JetBrains.',
      'Cursor is the best single-window experience. Multi-file edits, a composer for larger changes, and an agent mode when you want to hand over a whole feature. For a lot of teams it genuinely covers most of a normal working day without reaching for anything else.',
      'Claude Code has the highest ceiling and the least hand-holding. It reads the repository, runs commands, executes the test suite, and revises its own output based on what came back. The large context window means it can hold a real codebase in view without a pre-built index. That is a different kind of tool from an autocomplete.',
      '## What we actually do',
      'We do not pick one. The most productive setup we have found is Cursor or Copilot for the editing you are actively thinking through, and Claude Code for the tasks where the work is mostly mechanical but spans a lot of files — a rename across a codebase, a migration, generating a set of pages from a data file, running an audit and fixing what it finds.',
      'The distinction we use is whether we want to stay in the loop. If we are making design decisions as we go, we want an editor. If the decisions are already made and the work is executing them consistently in forty places, we want an agent and a good way to review what it did.',
      '## The part nobody mentions in the comparisons',
      'All three shift your bottleneck from writing to reviewing. That is a real trade and it is not free. A tool that can produce four hundred lines in a minute has not saved you time unless you can also judge four hundred lines in a minute, and you cannot.',
      'Our rule is that the size of a change an agent is allowed to make unsupervised is capped by how quickly we can verify it. Not how quickly it can produce it.'
    ]
  },
  {
    slug: 'ai-writes-faster-than-you-can-read',
    title: 'AI writes faster than you can read. That is the problem.',
    category: 'ai-tooling',
    date: '2026-08-02',
    excerpt:
      'Generation stopped being the constraint about two years ago. Review became the constraint and mostly nobody adjusted their process.',
    body: [
      'For most of the history of this job, producing code was the slow part. You knew roughly what you wanted and the time went into typing it, looking things up, and fixing the typing. Review was comparatively cheap because the volume was human-sized.',
      'That ratio has inverted. An agent can produce a week of typing in an afternoon. It cannot produce a week of judgement in an afternoon, and neither can you.',
      '## What this looks like when it goes wrong',
      'The failure is rarely dramatic. It is a pull request of eleven files where nine are obviously fine, so the reviewer skims the tenth and approves the eleventh without really reading it. Nothing breaks that day. Three weeks later something behaves oddly and the explanation is in the file nobody read.',
      'It compounds badly because the code looks confident. Generated code is uniformly well-formatted and plausibly named. There are none of the tells that normally make a reviewer slow down — no ragged indentation, no half-finished comment, no obviously tired variable name at 2am. Everything reads like it was written by someone who knew what they were doing.',
      '## What we changed',
      'We cap the size of an unreviewed change. If an agent is going to touch more than a handful of files, it does so in a branch with a summary of what it intended to do, and the review starts from that summary rather than from the diff. Reading a diff cold is the slowest possible way to understand a change.',
      'We also ask for the mechanism, not the outcome. "It works now" is not a review-passing statement. "The images were missing because the wrapper that attaches their URLs was being stripped" is, because it can be checked.',
      'And we lean much harder on things that verify automatically. Assertions inside scripts that rewrite code. An audit that fails the build on duplicate titles. A check that every internal link resolves. None of that is new practice — it is just worth much more now that the volume of change per hour has gone up an order of magnitude.',
      '## The uncomfortable version',
      'If your team has adopted AI tooling and your review process has not changed at all, you have not become faster. You have moved the same amount of risk to a place where it is harder to see. The productivity gain is real, but it only converts into shipped software if verification scales with generation.'
    ]
  },
  {
    slug: 'why-we-still-write-the-plan-by-hand',
    title: 'Why we still write the plan by hand',
    category: 'ai-tooling',
    date: '2026-07-21',
    excerpt:
      'We let agents write a great deal of our code. We do not let them decide what to build, and the reason is not sentimentality.',
    body: [
      'A coding agent is very good at the question "how do I do this" and structurally poor at "should this exist". It will implement whatever you describe, competently, including things that should not be built at all.',
      'The expensive mistakes in our projects have never been implementation mistakes. They have been building the wrong screen, modelling data in a shape that fights the business, or adding a feature the client asked for and did not need. None of those are caught by better code.',
      '## What a plan is actually for',
      'Writing the plan by hand forces the questions an agent will never volunteer. What is the smallest version of this that a user could benefit from? What breaks if this number doubles? Who owns this record when two people edit it? What happens on a bad network?',
      'On a logistics CRM we built, the entire shape of the product came out of one planning question: is the primary object a consignment or a party? Getting that right meant the outstanding ledger fell out naturally. Getting it wrong would have meant a system that could tell you where a parcel was but not who owed you money for it — which is the thing the business actually runs on.',
      'No agent asks that question, because it is not a coding question. It is a question about the business, and answering it requires having sat with the person who does the job.',
      '## Where the agent comes in',
      'Once the plan exists, most of the work is execution and agents are excellent at execution. Scaffolding the modules, writing the CRUD, wiring the routes, generating the migration, filling in the tests for the paths we specified. That is genuinely faster, and the quality is fine because the decisions were already made.',
      'The division we use is simple: humans decide what is true about the domain, agents implement what follows from that. When we have blurred the line and let an agent make a modelling decision because it was faster in the moment, we have paid for it later.',
      '## A note on the phrase "vibe coding"',
      'Building something by prompting until it looks right works, and it works well, for a prototype you intend to throw away. The trouble is that prototypes that work do not get thrown away — they get a deadline attached and become the product.',
      'If you are going to keep it, the plan has to exist somewhere. Written down before, or reverse-engineered painfully afterwards from code nobody remembers deciding on.'
    ]
  },
  {
    slug: 'ai-is-great-at-the-boring-eighty-percent',
    title: 'AI is excellent at the boring 80% and dangerous in the last 20%',
    category: 'ai-tooling',
    date: '2026-07-09',
    excerpt:
      'The distribution of where these tools help is not uniform, and knowing where the cliff is matters more than knowing the average.',
    body: [
      'Most software is not clever. It is forms, lists, validation, mapping one shape of data onto another, and wiring a button to a request. That work is well represented in training data, has a right answer, and gets done faster with an agent by a wide margin.',
      'Then there is the part that is specific to your problem. The pricing rule with the exception nobody documented. The reconciliation that has to balance to the paisa. The state machine where two of the transitions are illegal for reasons that only make sense if you know the regulator. That work looks similar on the surface and behaves completely differently.',
      '## Why the last 20% is worse than no help at all',
      'In the boring 80%, a wrong answer is usually obviously wrong. It does not compile, or the form does not submit, and you fix it in a minute.',
      'In the specific 20%, a wrong answer is plausible. The code runs. The numbers come out. They are subtly incorrect in a way that surfaces at month end, in production, in front of the client. That is not a small difference in cost — it is a different category of failure.',
      'We have seen this most sharply in anything involving money. A ledger that almost balances is worse than no ledger, because people trust it. An agent will happily produce a payments flow that handles the happy path perfectly and quietly does the wrong thing on a partial refund.',
      '## How we split the work in practice',
      'Anything where correctness is checkable by looking at it, we let the agent do and we review normally. Anything where correctness requires knowing the domain, a human writes the core and the agent fills in around it.',
      'The tell we use: can I confirm this is right by reading it, or do I need to know something the code does not contain? If it is the second, that is not agent work, however routine it looks.',
      '## The honest version of the productivity claim',
      'The gain is real and it is large, but it is concentrated. If most of your project is CRUD and layout, you will feel like the tooling doubled your speed. If most of your project is one hard domain problem surrounded by a little UI, you will feel like it barely helped — because the part it helped with was never the part that was taking the time.'
    ]
  },
  {
    slug: 'reading-a-diff-you-did-not-write',
    title: 'Reading a diff you did not write',
    category: 'ai-tooling',
    date: '2026-06-27',
    excerpt:
      'Reviewing generated code is a different skill from reviewing a colleague\'s. Here is what we have found actually works.',
    body: [
      'When you review a colleague\'s pull request you have context you are not aware of using. You know what they were trying to do, roughly how they think, and which parts of the codebase they know well. That context does a lot of quiet work in directing your attention.',
      'None of it applies to generated code. There is no intent to infer, no personal style to calibrate against, and no pattern of past mistakes to watch for. Every line has the same flat plausibility.',
      '## Start from the intent, not the diff',
      'The single change that improved our reviews most was requiring a written statement of what the change was supposed to do before looking at what it did. Then the review becomes a comparison — does this diff accomplish that, and does it do anything else? — rather than an open-ended reconstruction.',
      'Anything the diff does that is not in the statement is the interesting part. That is where the surprises live: the helper that got refactored on the way past, the default that changed, the import that got dropped.',
      '## Watch the deletions',
      'Generated changes tend to be additive and confident, which means deletions are disproportionately worth attention. A line that disappeared usually disappeared because it was in the way of the new approach, and "in the way" is sometimes a euphemism for "was handling a case the new approach does not".',
      'Our worst near-miss on this site was exactly a deletion — a four-character identifier removed from fifteen objects by a rewriting script. It did not look like a deletion in the diff. It looked like a reordering.',
      '## Trust the mechanical checks over your eyes',
      'Human review is bad at counting and excellent at judgement. So we push counting to scripts. Does every page still have a unique title? Does every internal link resolve? Did the number of wrapped entries stay the same? Are there still fifteen of the thing there were fifteen of?',
      'That frees the human pass to look at the things a script cannot: is this the right approach, does this name mean what it says, will the next person understand why this exists. Those are the parts worth your attention, and they are the parts that get skipped when you are also trying to be a linter.'
    ]
  },
  {
    slug: 'ai-generated-tests-are-the-dangerous-kind',
    title: 'AI-generated tests are the most dangerous kind of test',
    category: 'ai-tooling',
    date: '2026-06-15',
    excerpt:
      'A test suite that passes tells you something. A generated test suite that passes might only be telling you that the code does what the code does.',
    body: [
      'Ask an agent to write tests for an existing function and you will get thorough, well-named, passing tests very quickly. It is one of the most satisfying things these tools do, and one of the easiest to get wrong.',
      'The problem is the direction of inference. A test is supposed to encode what the code should do, derived from the requirement. A test generated from the code encodes what the code already does, derived from the implementation. Those look identical when the implementation is correct and are worthless when it is not.',
      '## The bug gets frozen in place',
      'If a function has an off-by-one error, generated tests will assert the off-by-one behaviour, because that is what it observed. Now the bug has a test protecting it. The next person to fix it will see a failing suite and assume they broke something.',
      'This is worse than having no test, because a passing suite is a claim. It tells the next developer that this behaviour was considered and is intended. Generated-from-implementation tests make that claim without it being true.',
      '## What we do instead',
      'Tests come from the requirement, not the function. In practice that means writing the assertions first, in plain language, before the implementation exists or at least without looking at it. Those can absolutely be handed to an agent to turn into code — the value is in deciding what should be true, not in typing `expect`.',
      'For code that already exists and has no tests, we do use agents, but we read every assertion and ask one question of each: would I still want this to be true if I rewrote the function from scratch? Anything that is really just a restatement of the current implementation gets deleted.',
      '## Where generated tests are genuinely good',
      'Edge case enumeration. Ask what inputs might break this and you get a useful list — empty arrays, nulls, very large values, unicode, negative numbers, dates around a boundary. That is a real strength, because breadth is exactly what humans are bad at and machines are good at.',
      'So: let it suggest the cases, decide the expectations yourself. The list is the valuable output. The assertions are the part you have to own.'
    ]
  },
  {
    slug: 'the-context-window-is-not-your-bottleneck',
    title: 'The context window is not your bottleneck. Your codebase is.',
    category: 'ai-tooling',
    date: '2026-06-03',
    excerpt:
      'Bigger context windows have not made agents better on messy code. They have made it more obvious that the mess was the problem.',
    body: [
      'Every increase in context size arrives with the implication that the tool can now understand your whole project. In practice, what determines how well an agent works on a codebase is roughly what determines how well a new senior hire works on it in their first week.',
      'Can you tell what a module does from its name and its exports? Are the boundaries real, or does everything import everything? Is there one obvious place where a given kind of change belongs? Those properties help humans and they help agents, for the same reason: they reduce the amount you have to hold in mind at once.',
      '## What actually helps',
      'Naming that describes purpose rather than shape. `areas.js` holding location data with per-service copy is findable. `data2.js` is not, at any context size.',
      'Comments that explain why rather than what. An agent can read what the code does. It cannot read that this branch exists because a payment provider returns a success status for a failed transaction, unless you wrote that down.',
      'Small, explicit contracts between modules. When a function takes four clear arguments and returns a documented shape, an agent can use it correctly without reading its body. When it takes a config object with fifteen optional keys and behaves differently depending on which are present, nobody can.',
      '## The uncomfortable implication',
      'Teams that were already disciplined about structure got a genuine step change from these tools. Teams with a large, tangled codebase got much less, and often concluded the tools were overrated.',
      'Both experiences are real. The difference is not the tool. A codebase where a change requires understanding six implicit relationships is a codebase where an agent will make plausible, wrong changes — and so will a person.',
      '## What we do at the start of a project',
      'We spend the first day on structure that will still make sense in a year: clear module boundaries, one obvious home for each concern, and a short document explaining the decisions that are not visible in the code. It pays back in human onboarding and it pays back again every time we point an agent at it.',
      'The best investment you can make in AI-assisted development is not a better tool or a bigger context window. It is a codebase that is legible.'
    ]
  },
  {
    slug: 'what-vibe-coding-costs-you-in-month-six',
    title: 'What vibe coding costs you in month six',
    category: 'ai-tooling',
    date: '2026-05-22',
    excerpt:
      'Prompting until it looks right is a genuinely good way to build a prototype. The bill arrives when the prototype does not get thrown away.',
    body: [
      'Building by describing what you want and accepting what comes back is fast, and for exploring an idea it is the right approach. You learn more in an afternoon than a week of design documents would have taught you.',
      'The failure mode is not technical, it is organisational. A prototype that works gets shown to someone. Someone attaches a date to it. Nobody ever schedules the rewrite, because from the outside it already works.',
      '## What accumulates',
      'The first thing you lose is a shared model of how the system fits together. Nobody decided the architecture, so nobody can explain it. Changes get made by describing them to an agent, because that is the only interface anybody has to the code — including the person who commissioned it.',
      'The second thing is defensibility of behaviour. When a client asks why the system does something specific, the honest answer is that nobody chose it. That is survivable in a side project and genuinely bad in something handling money or patient records.',
      'The third is that the codebase stops being legible, which — as above — is exactly the property that makes agents work well. So the tool that got you here becomes progressively less effective the longer you rely on it this way.',
      '## The version that works',
      'Prototype by vibe, absolutely. Then, before the thing gets a deadline, spend a short block deliberately reconstructing the decisions: what are the core objects, what are the rules, what is the boundary between modules. Write that down. Refactor toward it.',
      'That is usually two or three days of work on something that took two weeks to prototype, and it converts a demo into something a team can maintain. It is much cheaper than doing it in month six under delivery pressure, and enormously cheaper than not doing it.',
      '## How to know you are past the line',
      'One useful test: can somebody other than the original author make a non-trivial change without asking an agent to explain the code first? If not, you no longer have a codebase, you have a transcript.'
    ]
  },
  {
    slug: 'when-we-turn-the-agent-off',
    title: 'When we turn the agent off',
    category: 'ai-tooling',
    date: '2026-05-10',
    excerpt:
      'A short list of situations where we work without assistance, and why each one earns the slowdown.',
    body: [
      'We use these tools constantly. That makes it worth being explicit about the cases where we deliberately do not, because the exceptions are where the reasoning lives.',
      '## Anything touching money at rest',
      'Ledgers, settlement, reconciliation, refunds. Not because an agent writes bad code here, but because the failure mode is silent and expensive. We want a human to have derived the arithmetic and to be able to explain it without reference to the implementation.',
      'A related rule: nobody merges a change to money handling that they cannot explain on a whiteboard. If the explanation requires reading the code, the code is the only place the logic exists, and that is not good enough for something a client will be audited on.',
      '## Security boundaries',
      'Authentication, authorisation, session handling, anything that decides who can see what. Generated code here is usually correct for the case described and quietly permissive for cases that were not mentioned. Role checks that are right for three roles and wrong for the fourth are the classic version.',
      '## The first version of a data model',
      'Covered elsewhere in more detail, but briefly: the shape of your core entities determines what the system can express for its whole life. That is a decision to make deliberately, with the person who does the job, before any code exists.',
      '## When we do not understand the problem yet',
      'This is the most important one and the easiest to miss. If we are not clear on what we are building, an agent will resolve that ambiguity for us — invisibly, by picking a plausible interpretation and implementing it well. Now the ambiguity is buried in working code instead of sitting visibly in a conversation.',
      'Confusion is information. When we notice we are prompting our way around not understanding something, that is the signal to stop typing and go and ask the client a question.',
      '## What this is not',
      'It is not a claim that handwritten code is better. In every one of these cases we still use agents for the surrounding work — the tests, the plumbing, the admin screens. The rule is narrower than it looks: humans own the decisions whose consequences are hard to see, and everything downstream of those decisions is fair game.'
    ]
  },
  {
    slug: 'guardrails-that-let-you-move-fast',
    title: 'The guardrails that actually let you move fast',
    category: 'ai-tooling',
    date: '2026-04-28',
    excerpt:
      'Speed with AI tooling comes from being able to verify quickly, not from generating quickly. These are the checks that earn their keep.',
    body: [
      'Every check in this list exists because something got through without it. None of them are clever. Their value is that they run automatically and fail loudly, which means we can accept larger changes without reading every line with equal attention.',
      '## Assertions inside scripts that rewrite code',
      'If a script transforms source files, it should state what it expects to be true afterwards and refuse to write if it is not. A reordering script that starts with fifteen wrapped entries should end with fifteen wrapped entries. This one check would have caught the worst bug we shipped into a working tree this year.',
      '## Build-time content limits',
      'On this site, page titles over 65 characters and meta descriptions over 165 throw at build rather than being reported by an audit afterwards. The difference matters: a warning in a log is something you scroll past, an exception is something you fix.',
      '## Link integrity across generated pages',
      'When you generate two hundred pages that link to each other, a single wrong slug pattern breaks links from dozens of pages at once. We walk every generated page, collect every internal href, and assert that each target exists. It has caught two systemic mistakes that no amount of spot-checking would have found.',
      '## Duplicate detection on anything templated',
      'For generated content, we compare pages against each other and fail on near-duplicates. This is partly an SEO concern and mostly a quality one — if two pages are 90% identical, one of them should not exist.',
      '## A real browser, not just a build',
      'The build passing means the bundler was happy. We load the actual page, check for console errors, failed network requests, and whether the things that should be visible are visible. This is where a green build gets caught lying.',
      '## The principle underneath',
      'Every one of these turns a class of mistake from "something a careful reviewer might notice" into "something that cannot reach production". That is the only way the speed increase from AI tooling turns into shipped software rather than deferred debugging. The tools raised how fast you can write. These raise how fast you can be confident.'
    ]
  },
  {
    slug: 'we-do-not-let-ai-name-things',
    title: 'We do not let AI name things',
    category: 'ai-tooling',
    date: '2026-04-16',
    excerpt:
      'Naming is the cheapest documentation you will ever write and the place generated code is most reliably mediocre.',
    body: [
      'Generated names are never wrong exactly. `handleSubmit`, `processData`, `UserService`, `utils.js`. They are grammatical, conventional, and carry almost no information.',
      'That is a reasonable default for a tool that does not know your domain. It is a bad default for a codebase somebody has to work in for three years.',
      '## Names are where the domain lives',
      'In a logistics system we built, the objects are consignments, parties, biltis and lorry receipts. Those are the words the business uses. A developer reading `consignment.partyId` understands something real; the same field called `order.customerId` would have quietly imported assumptions from e-commerce that do not hold — a party can be both sender and receiver on different consignments, which a "customer" cannot.',
      'That is not pedantry. Getting the vocabulary right is how the code stays aligned with the business as both change. Wrong names drift into wrong models.',
      '## The specific failure',
      'Generated code tends toward the most common name for a shape rather than the correct name for a concept. Anything that holds a list becomes `items`. Anything that transforms becomes `format` or `parse`. Anything shared becomes `utils`.',
      'You end up with a codebase where the names describe the data structure rather than the meaning, and every reader has to reconstruct the meaning from context every time. That cost is invisible per instance and enormous in aggregate.',
      '## What we do',
      'We name the core concepts ourselves, early, from the language the client actually uses in meetings. Those names go into the plan before any code exists. Then agents implement against them, and they are perfectly good at using an established vocabulary consistently.',
      'For anything an agent names on its own, renaming is one of the safest possible refactors and one of the highest-value ones. It costs a minute and it pays every time somebody opens the file.',
      '## A quick test',
      'Read a function name and its arguments out loud, and ask whether someone from the client\'s operations team would understand roughly what it does. If yes, the code is speaking the business\'s language. If it needs translation, you have a layer of unnecessary distance between the software and the problem.'
    ]
  },
  {
    slug: 'agents-and-legacy-code',
    title: 'Agents on legacy code: where they help and where they lie',
    category: 'ai-tooling',
    date: '2026-04-04',
    excerpt:
      'Pointing an agent at an old codebase produces confident explanations. Some of them are true.',
    body: [
      'The pitch is appealing: inherit an undocumented system, ask an agent what it does, get an answer in minutes rather than weeks. In practice this works well for some questions and badly for others, and the difference is worth knowing before you rely on it.',
      '## What it is genuinely good at',
      'Tracing. "Where does this value come from?" and "what calls this function?" are mechanical questions with checkable answers, and having them answered instantly is a real acceleration on an unfamiliar codebase.',
      'Summarising a file. Reading four hundred lines and getting an accurate description of what the module broadly does is reliable, and it is exactly the tedious part of onboarding.',
      'Finding all the places a pattern occurs. Better than grep, because it catches variations that a literal search misses.',
      '## Where it will confidently mislead you',
      'Why questions. Legacy code is full of decisions that look arbitrary and are not — a workaround for a vendor bug, a constraint from a regulation, a shape that exists because of a migration in 2019. An agent will produce a plausible rationale for such code because a plausible rationale is what the question asked for. It will not say "somebody did this for a reason not present in the repository", which is very often the true answer.',
      'Dead code. Deciding that something is unused requires knowing about callers outside the codebase — a cron job, another service, a client integration. Confidently removing code an agent identified as dead is one of the more reliable ways to cause an incident.',
      '## How we use it on inherited systems',
      'For mapping, extensively. We will spend the first day having an agent produce a structural picture — modules, entry points, data flow, where the money touches — and that is genuinely a week of work compressed.',
      'For decisions, not at all until we have talked to somebody who was there. When no such person exists, we treat every unexplained oddity as load-bearing until proven otherwise, and we write down what we learn as we go, because the next person deserves better than we got.'
    ]
  },
  {
    slug: 'what-ai-tooling-costs-a-two-person-studio',
    title: 'What AI tooling actually costs a two-person studio',
    category: 'ai-tooling',
    date: '2026-03-23',
    excerpt:
      'Real numbers on subscriptions, where the spend goes, and whether it pays for itself at our size.',
    body: [
      'Published pricing in 2026 sits roughly where it has for a while: Copilot around ten dollars a month per seat, Cursor around twenty, Claude Code from twenty up to a couple of hundred depending on usage tier.',
      'For a two-person studio, the honest accounting is that tooling is a rounding error against the cost of our own time, and the only question worth asking is whether it changes what we can take on.',
      '## Where the money actually goes',
      'Not evenly. The agent tiers cost the most and get used in bursts — a migration, a large generation task, an audit-and-fix pass across a codebase. Weeks where the work is design-heavy or client-heavy barely touch them.',
      'The inline completion subscriptions are the opposite: modest cost, used every single day, and the least dramatic in what they do. They are also the ones we would miss most immediately, which is a useful signal about where the steady value is.',
      '## What it changed about what we can sell',
      'The concrete difference is scope. Work we would previously have declined as too large for two people is now viable — generating and maintaining a two-hundred-page content system, for example, or taking on a migration with a lot of mechanical repetition.',
      'What it has not changed is our capacity for the hard parts. Discovery, data modelling, the conversation where you find out what the client actually needs — those take exactly as long as they did. Which means the mix of a project has shifted: a larger share of the calendar is now the thinking, and a smaller share is the typing.',
      '## Whether it pays for itself',
      'At our size, comfortably, but not for the reason people usually give. It is not that we write more code per day. It is that a two-person team can now credibly deliver things that used to need four, which changes what we can quote for and which clients we can serve.',
      'The trap would be pricing as though the labour saving is the product. It is not. Clients are paying for the decisions and the accountability, and those have not got cheaper.'
    ]
  },
  {
    slug: 'teaching-a-clients-team-to-use-ai-safely',
    title: 'Handing over a codebase to a team that uses AI',
    category: 'ai-tooling',
    date: '2026-03-11',
    excerpt:
      'We transfer source on day one of go-live. Increasingly the team receiving it will maintain it with agents, which changes what a good handover looks like.',
    body: [
      'Our contracts transfer everything at go-live — code, designs, infrastructure, deploy access. That has always meant writing a handover that a human can follow. It now also means writing one an agent can follow, because that is realistically how a lot of the maintenance will happen.',
      'These turn out to be the same document done well, which is reassuring. But a few things matter more than they used to.',
      '## Write down the decisions, not just the structure',
      'A README that describes the folder layout is nearly useless — an agent can derive that in seconds. What it cannot derive is why the ledger uses integers of paise rather than floats, or why one module deliberately does not use the shared client. Those are the things that get accidentally "cleaned up" six months later.',
      'We keep a short decisions file. Each entry is two or three sentences: what we chose, what we rejected, and what would have to change for the decision to be revisited.',
      '## Make the invariants executable',
      'Anything the system relies on being true should be a check, not a sentence. If every generated page must have a unique title, that is an assertion in the build. If a script must preserve a count, it asserts the count. A prose warning gets read once; a failing build gets respected forever.',
      'This matters much more when maintenance is agent-assisted, because an agent has no memory of the warning and no instinct that a particular area is dangerous. The guardrails are the memory.',
      '## Say which parts are load-bearing',
      'We mark the areas where we would want a human to think carefully — money, permissions, anything with a regulator attached. Not to forbid tooling there, but so the next team knows which files deserve a slower review, in a codebase where everything looks equally tidy.',
      '## Why we bother',
      'Partly it is the right thing to do for a client who owns the asset. Practically, it is also self-interested: the systems that come back to us for a second phase are the ones the client\'s team could keep working in. The ones that decay into something nobody wants to touch do not generate more work, they generate a rewrite quote from somebody else.'
    ]
  },
  {
    slug: 'ai-and-the-junior-developer-question',
    title: 'The junior developer question, honestly',
    category: 'ai-tooling',
    date: '2026-02-27',
    excerpt:
      'If agents do the work juniors used to do, where do seniors come from? We do not have a complete answer, but the common one is wrong.',
    body: [
      'The argument goes: junior developers learned by doing the routine work, agents now do the routine work, therefore the pipeline that produces senior developers is broken. It is a real concern and it is stated too simply.',
      '## What juniors were actually learning',
      'Not typing. The value of writing your hundredth CRUD form was never the form — it was accumulating a sense of what usually goes wrong, which patterns cause pain later, and how the pieces of a system connect. That learning came from the surrounding activity: being reviewed, having to explain a decision, watching something you wrote fail in production.',
      'None of that is removed by agents. What is removed is the specific mechanism by which it happened, which was volume of hands-on repetition.',
      '## What we have seen actually work',
      'Reviewing generated code turns out to be a surprisingly good teacher, if it is done properly. You have to read code you did not write, form a judgement about whether it is right, and articulate why. That is close to the core skill of a senior engineer, and juniors reach it earlier now than they used to.',
      'What does not work is having a junior accept generated code because it passes. That produces someone who can operate a tool and cannot evaluate its output, and the gap shows the moment something is subtly wrong.',
      '## The part we are less sure about',
      'Debugging under pressure is still learned by suffering, and there is genuinely less suffering available. Fewer hours spent staring at something that will not work means fewer opportunities to build the intuition that makes a senior fast at diagnosis.',
      'Our partial answer is to deliberately not rescue people too quickly, and to spend time on mechanism rather than fixes — "why did that happen" rather than "here is the line". It is slower. We think it is the part that does not compress.',
      '## What we would tell someone starting now',
      'Learn to read critically before you learn to generate quickly. The scarce skill in 2026 is not producing code, it is judging it — and that skill is built by reading a great deal of code, forming opinions about it, and being told when the opinions are wrong.'
    ]
  },
  {
    slug: 'the-commit-message-problem',
    title: 'Nobody is writing commit messages any more',
    category: 'ai-tooling',
    date: '2026-02-15',
    excerpt:
      'Generated commit messages describe the diff. The diff is already there. A small complaint about a real loss.',
    body: [
      'A generated commit message will tell you that a function was added, a parameter renamed and a test updated. All of which is accurate, and all of which you could have seen by looking at the commit.',
      'What a good commit message contains is the thing that is not in the diff: why. Why now, why this way, what was tried first, what this is a workaround for. That information exists only in the author\'s head at the moment of committing, and if it is not written down then it is gone.',
      '## Where this bites',
      'Six months later, somebody runs blame on a strange-looking line. In the good case they find "revert to the manual mapping — the library drops the timezone on dates before 1970, see issue 4412". In the common case they find "update date handling in user service".',
      'The second one is worse than nothing, because it looks like an answer. The reader stops looking, assumes there was no particular reason, and removes the workaround.',
      '## It is not really about AI',
      'Plenty of humans wrote bad commit messages long before any of this. What changed is that generating a plausible one now takes no effort, so the small friction that used to prompt a moment of thought is gone. When writing the message cost thirty seconds, you sometimes used them to think.',
      '## What we do',
      'Body text is written by a person or not at all. The subject line can be generated — it genuinely is just a summary of the diff and that is fine. But if there is a reason, a constraint, or a rejected alternative, that goes in by hand.',
      'And if there is nothing to add, that is a legitimate answer. Most commits do not need explaining. The point is that somebody made that judgement, rather than a paragraph of accurate description appearing automatically and crowding out the question.',
      '## The broader version',
      'A lot of the value in a codebase lives in the record of why it looks the way it does. Commit history, decision notes, the comment above the odd branch. Those are the artefacts that make a system maintainable by people who were not there, and they are precisely the artefacts that are cheapest to fake and most costly to fake.'
    ]
  },
  {
    slug: 'prompting-for-code-you-will-keep',
    title: 'Prompting for code you intend to keep',
    category: 'ai-tooling',
    date: '2026-02-03',
    excerpt:
      'The difference between a prompt that produces a demo and one that produces something maintainable is mostly about constraints.',
    body: [
      'Most advice on prompting is about getting a working result. That is the easy part now. The harder question is getting a result you will still be happy with when it has been in production for a year and somebody else has to change it.',
      '## Say what it must not do',
      'The most useful thing you can add to a prompt is constraints, not description. "Do not add a dependency." "Use the existing http client rather than fetch directly." "Keep this in one file." "No new abstractions — inline it."',
      'Without those, output drifts toward the most common solution in training data, which usually means more layers, more dependencies and more configurability than your case needs. Generic code is the default; specific code has to be asked for.',
      '## Give it the surrounding code, not a description of it',
      'Describing your conventions in prose produces an approximation of them. Showing two files that follow the convention produces code that matches. This is the single highest-leverage habit we have: point at the neighbours, not at a style guide.',
      '## Ask for the smallest version first',
      'Requesting a complete feature produces something complete and speculative — options you did not ask for, hooks for extensibility you may never need. Requesting the narrowest thing that solves today\'s problem produces something you can read in one sitting.',
      'You can always ask for more. Removing speculative generality later is much harder, because by then it has callers.',
      '## Make it explain the trade-off',
      'Asking for an approach and its alternative, with a reason for the choice, costs nothing and changes the quality of the review. Sometimes the rejected alternative is obviously the one you wanted. More often the explanation surfaces an assumption you did not realise was being made.',
      '## The underlying idea',
      'You are not trying to get code out of a machine. You are trying to get a specific decision implemented consistently. The more of the decision you supply, the less of it gets made for you by whatever was statistically most common — and it is those unnoticed defaults, accumulated over a project, that turn into a codebase nobody chose.'
    ]
  },
  {
    slug: 'what-we-automate-and-what-we-refuse-to',
    title: 'What we automate and what we refuse to',
    category: 'ai-tooling',
    date: '2026-01-22',
    excerpt:
      'A working list, with the reasoning. Mostly it comes down to whether a mistake announces itself.',
    body: [
      'We automate aggressively. The exceptions are not about craft or principle — they are about how a failure would surface.',
      '## Automated without hesitation',
      'Anything with a mechanical, checkable output. Generating pages from a data file. Capturing screenshots. Downloading and resolving assets. Running audits. Reformatting. Migrations with a verifiable before-and-after. Bulk renames.',
      'The common property is that if it goes wrong, something visibly breaks or a check fails. The cost of a mistake is a few minutes.',
      '## Automated with a mandatory review gate',
      'Anything that writes source code. Anything that changes configuration for a deployed environment. Anything that touches a database schema.',
      'These can all go wrong quietly, so the automation produces a change and a human approves it. The important detail is that the review is of the intent as well as the diff — an agent that reorders an array should say it is reordering an array, so that a change of any other kind stands out.',
      '## Not automated',
      'Anything that deletes client data. Any script that resets or seeds a production database — we have seen how close that comes to catastrophe, and the guard is not a confirmation prompt, it is not writing the script to point there at all.',
      'Sending anything to a client. Not because a draft cannot be generated, but because pressing send is a decision about a relationship, and it should be made by a person who will own the consequences.',
      'Deciding that something is done. A passing test suite is evidence, not a verdict.',
      '## The rule underneath all of it',
      'Automate where a mistake is loud. Add a gate where a mistake is quiet. Refuse where a mistake is irreversible.',
      'Most bad automation decisions we have seen come from evaluating the happy path — how much time does this save when it works — rather than the failure. The question that matters is: if this does the wrong thing, how long before anybody notices, and what does it cost by then?'
    ]
  },
  {
    slug: 'the-agent-that-never-says-i-dont-know',
    title: 'Pair programming with something that never hesitates',
    category: 'ai-tooling',
    date: '2026-01-10',
    excerpt:
      'The most useful signal a colleague gives you is hesitation. Agents do not have it, and you have to supply the doubt yourself.',
    body: [
      'When you ask a colleague something outside their area, you get a hedge. "I think so, but check with someone who knows that module." That hedge is enormously valuable — it tells you exactly how much to trust the answer and what to do next.',
      'Agents answer everything in the same register. The response to a question about a well-known framework API and a question about your bespoke internal convention read identically, and one of them is a guess.',
      '## Where this actually costs you',
      'On anything project-specific that is not visible in the files it has read. Business rules, the reason a value is hardcoded, whether a service is still in use, what a client agreed to in a meeting. You get a confident, plausible answer constructed from context — and confidence is exactly the wrong signal for information the model does not have.',
      'The dangerous version is when the guess is nearly right. A subtly wrong description of a business rule is much harder to catch than an obviously wrong one, because there is nothing to trip over.',
      '## Supplying the doubt yourself',
      'The habit we have built is to ask, before accepting any explanation: could this have been derived from what it can see? If the answer is in the code, fine. If the answer depends on a decision somebody made in a meeting, it is a guess presented as fact, regardless of how it reads.',
      'We also ask for the source explicitly. "Which file tells you that?" is a cheap question and it resolves the ambiguity immediately. When there is no file, that is the honest answer surfacing.',
      '## Why this is not really a complaint',
      'This is a property of the tool, not a defect to wait out. Human hedging comes from a model of your own knowledge, and the useful move is to stop expecting the tool to provide it and to build the check into your own process instead.',
      'The practical version: treat every explanation as a hypothesis with a checkable source, and check the ones that matter. That is a small amount of discipline that converts an occasionally-misleading tool into a consistently useful one.'
    ]
  },
  {
    slug: 'letting-an-agent-run-your-test-suite',
    title: 'Letting an agent run your test suite',
    category: 'ai-tooling',
    date: '2026-01-08',
    excerpt:
      'Giving an agent the ability to run commands and iterate on failures is the single biggest capability jump. It also introduces a specific bad habit.',
    body: [
      'An agent that can execute your tests and respond to the output works very differently from one that only writes code. It can attempt something, see it fail, and adjust — which is the loop that actual development consists of.',
      'For mechanical work this is transformative. Migrations, refactors, and anything where the definition of done is "the suite is green" get genuinely faster, because the slow part was always the round trip.',
      '## The habit to watch for',
      'When the goal is expressed as "make the tests pass", the shortest path is sometimes to change the tests. Not maliciously — a failing assertion is ambiguous evidence, and adjusting an expectation is a legitimate move when the expectation was wrong.',
      'The trouble is it is also the move when the code is wrong, and from inside the loop those look similar. We have watched a green suite arrive with two assertions quietly relaxed, and the summary described this accurately as "updated tests to match the new behaviour" — which was true, and was not what we wanted.',
      '## What we require',
      'Test files are called out separately in any review. If a change touches both source and tests, the test diff gets read first and on its own terms: was this expectation wrong, or was the code wrong?',
      'For anything where the specification is fixed — a payment calculation, a tax rule — we mark the tests as not-to-be-modified and treat any change to them as a failed attempt rather than a solution.',
      '## The thing that makes it work',
      'A clear statement of intent before the loop starts. "Make this pass" is a weak goal. "Make this pass without changing any assertion in billing.test.js" is a strong one, and it converts the agent\'s persistence from a risk into exactly what you want.',
      'The capability is not the problem. Unsupervised optimisation toward a proxy for correctness is the problem, and it is an old problem in a new form — the same reason you do not pay a team by lines of code.'
    ]
  },
  {
    slug: 'ai-tools-and-the-quiet-death-of-boilerplate',
    title: 'Boilerplate is free now. That changes what a framework is for.',
    category: 'ai-tooling',
    date: '2026-01-06',
    excerpt:
      'A lot of framework design exists to save you from repetitive typing. When repetitive typing costs nothing, some of those trade-offs stop making sense.',
    body: [
      'Frameworks and libraries have historically justified their abstractions with the amount of code they save you. Configuration over repetition, magic over explicitness, a decorator instead of ten lines of wiring. The typing was the cost being optimised away.',
      'That cost has largely collapsed. Writing the ten explicit lines is now approximately as fast as remembering which decorator does it — and the ten lines can be read by anybody, debugged with a breakpoint, and changed without consulting documentation.',
      '## What this shifts',
      'The value of an abstraction is now much more about comprehension than about keystrokes. A good abstraction gives a name to a concept that genuinely exists in your problem. A bad one hides mechanism to save typing that nobody is paying for any more.',
      'We notice this most when debugging. Explicit code with a bit of repetition is straightforward to follow. Clever code that saved twenty lines is where you lose an afternoon, and the twenty lines were never the expensive part.',
      '## Where we have changed our defaults',
      'We reach for configuration and code generation more readily, and for runtime magic much less. A generated file you can open and read beats a runtime abstraction that produces the same behaviour invisibly — both save the typing, only one is inspectable.',
      'We also tolerate more repetition than we used to. Three similar functions that each say what they do are frequently better than one parameterised function with a flag, now that writing the three costs nothing.',
      '## The caveat',
      'This is not an argument against abstraction. It is an argument that the justification has moved. "This saves boilerplate" is a much weaker case than it was in 2020. "This gives a name to a real concept, and having that name makes the system easier to reason about" is as strong as it ever was.',
      'The question to ask of any abstraction now: if writing the underlying code were free, would I still want this? Sometimes emphatically yes. Often, it turns out, no.'
    ]
  }
]
