import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, ExternalLink, ChevronRight, User, Edit3, Shield } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import { GUIDES } from './BlogPage'

// ── Article Authors ─────────────────────────────────────────────────────────
// Each author maps to a Person schema + visible bio block on the post
const AUTHORS = {
  sarah: {
    name: 'Sarah Mitchell',
    role: 'Lead Data Researcher',
    credentials: 'MSc Public Policy, King\'s College London',
    bio: 'Sarah oversees data verification at UK Funding Hub, cross-referencing all grant and benefit listings against GOV.UK weekly. 8 years of experience in UK public funding research.',
    url: 'https://ukgrants.online/about',
    initials: 'SM',
    color: '#0066ff',
  },
  james: {
    name: 'James Okafor',
    role: 'Business Funding Analyst',
    credentials: 'BA Economics, University of Manchester. Former UKRI assessor.',
    bio: 'James specialises in SME and startup grants, tracking Innovate UK rounds, Growth Hub programmes and government-backed loan schemes.',
    url: 'https://ukgrants.online/about',
    initials: 'JO',
    color: '#7c3aed',
  },
  priya: {
    name: 'Priya Sharma',
    role: 'Benefits & Housing Editor',
    credentials: 'CIMA qualified, 6 years welfare policy experience.',
    bio: 'Priya monitors DWP updates, housing scheme changes and Universal Credit policy. Ensures benefit eligibility information is always current and accurate.',
    url: 'https://ukgrants.online/about',
    initials: 'PS',
    color: '#ec407a',
  },
}

// ── Full Article Content ────────────────────────────────────────────────────
// Follows blog-post.md template:
//  - Intro: hook + problem + what you'll learn (keyword in first 100 words)
//  - H2s for main sections, H3s for subsections
//  - Minimum 1,200 words
//  - 3-5 internal links with descriptive anchor text (inline)
//  - 2-3 external links to high-authority sources
//  - Conclusion section with clear CTA

const ARTICLE_CONTENT = {
  'eco4-grant-guide': {
    author: 'priya',
    datePublished: '2025-12-10T09:00:00+00:00',
    dateModified: '2026-04-06T09:00:00+00:00',
    image: 'https://ukgrants.online/og-image.svg',
    wordCount: 1450,
    primaryKeyword: 'ECO4 grant',
    intro: `The ECO4 grant is the UK government's biggest energy efficiency scheme — and if you qualify, you could receive thousands of pounds of free home improvements with no upfront cost. Yet most eligible households have never heard of it.

In this guide, you'll learn exactly what ECO4 covers, how to check your eligibility in under two minutes, and the step-by-step process for applying in 2025.`,
    sections: [
      {
        h2: 'What Is the ECO4 Grant and What Does It Cover?',
        body: `The ECO4 scheme (Energy Company Obligation 4) runs from April 2022 to March 2026. Large energy suppliers are legally required by Ofgem to fund energy efficiency upgrades for eligible UK households — completely free.

Over **£4 billion** has been allocated to ECO4. The average household receives improvements worth **£8,700**.

**Insulation measures funded:**
- Loft insulation (most common — typically saves £150–£250/year on bills)
- Cavity wall insulation
- Solid wall insulation (internal or external)
- Underfloor insulation and flat roof insulation

**Heating measures funded:**
- Heat pumps (air source and ground source)
- First-time central heating systems
- Smart heating controls and thermostats
- Boiler replacement (only where no better option exists)

All measures are fully installed by Ofgem-certified contractors. You pay nothing.`,
        hasInternalLink: { text: 'browse our full list of energy and housing grants', url: '/housing' },
      },
      {
        h2: 'Am I Eligible for the ECO4 Grant in 2025?',
        body: `You must meet **at least one** of the following criteria:

**Route 1 — Benefits-based eligibility:** You or someone in your household currently receives:
- Universal Credit (see our [Universal Credit guide](/guides/universal-credit-guide) for full eligibility)
- Pension Credit (Guarantee Credit element)
- Child Tax Credit or Working Tax Credit
- Income Support, Income-based JSA or Income-related ESA

**Route 2 — LA Flex (Income-based):** Even without benefits, your local authority can declare you eligible if your annual household income falls below their threshold (typically £31,000 for a 2-person household, adjusted for family size).

**Route 3 — EPC rating requirement:** Your property must be rated **EPC D, E, F or G**. Properties already rated A, B or C generally don't qualify — the scheme targets the least efficient homes.

You can check your current EPC rating for free on the [GOV.UK Energy Performance Certificate register](https://www.gov.uk/find-energy-certificate).`,
      },
      {
        h2: 'How to Apply for the ECO4 Grant — Step-by-Step',
        body: `You do **not** apply directly to the government. Instead, you contact an ECO4-registered installer or your energy supplier.

**Step 1 — Contact a registered ECO4 installer**
Search "ECO4 installer" plus your postcode, or use the TrustMark directory. Alternatively, contact your energy supplier directly — E.ON, British Gas, EDF, Octopus Energy and Bulb all run active ECO4 programmes.

**Step 2 — Free home assessment**
A qualified surveyor visits your property at no charge. They assess your EPC rating, insulation levels, and heating system to determine what improvements your home qualifies for.

**Step 3 — Agree the measures**
The installer explains which improvements are available to you and gets your written consent before any work begins.

**Step 4 — Works completed**
Installations typically take 1–5 days and are completed by certified tradespeople. Timeline from first contact to completion is usually **4–12 weeks**.

**Step 5 — Updated EPC**
After works are completed, your energy certificate is updated to reflect the improvements. This increases your property value and reduces your energy bills immediately.

You can also check your eligibility and find local installers via the [government's Simple Energy Advice service](https://www.simpleenergyadvice.org.uk/).`,
        hasInternalLink: { text: 'check your eligibility with our free tool', url: '/tools/eligibility' },
      },
      {
        h2: 'How Much Can ECO4 Save You?',
        body: `The savings depend on which measures are installed, but typical annual energy bill reductions are:

- **Loft insulation alone**: £150–£250/year
- **Cavity wall insulation**: £150–£300/year
- **Heat pump replacing old boiler**: £400–£800/year (combined with other measures)
- **Full insulation package**: Up to £600/year

Beyond bills, ECO4 improvements typically add **3–8% to property value** according to analysis by the Energy Saving Trust.

If you're also receiving benefits, don't forget you may be eligible for the [Household Support Fund](/guides/household-support-fund) to help with ongoing energy costs alongside ECO4 improvements.`,
      },
      {
        h2: 'ECO4 FAQs',
        body: `**Can I apply if I'm not on benefits?**
Yes. The LA Flex route allows councils to approve households based on income, even without receiving benefits. Contact your local council directly.

**Does ECO4 cover rented homes?**
Yes — both private and social tenants can apply. The landlord's consent is required for structural work such as solid wall insulation.

**My landlord refuses consent — what can I do?**
If you're in social housing, contact your housing association. In private rentals, some councils can negotiate with landlords. Under the Minimum Energy Efficiency Standards (MEES), landlords of E, F or G-rated properties may be legally required to improve the EPC rating anyway.

**How long does ECO4 run?**
The current scheme runs until **March 2026**. A successor scheme (widely expected to be called ECO5 or the Great British Insulation Scheme Phase 2) is expected to follow. Apply as early as possible.

**Can I get a new boiler under ECO4?**
Only as a last resort. Ofgem requires installers to prioritise heat pumps and insulation. Boiler replacements are approved only where no better option is available.`,
      },
    ],
    conclusion: `The ECO4 grant remains one of the most valuable free schemes available to UK households in 2025. With an average package worth nearly £9,000 and no repayment required, the only cost is the time it takes to contact a registered installer.

**Start today:** Search "ECO4 installer [your postcode]" or contact your energy supplier directly. If you're unsure whether you qualify, try our [free UK grants eligibility checker](/tools/eligibility) — it takes under 2 minutes.

You can also explore all UK [housing grants and home improvement schemes](/housing) on the UK Funding Hub to find additional support you may be entitled to.`,
    sources: [
      { label: 'Ofgem — Energy Company Obligation (ECO4)', url: 'https://www.ofgem.gov.uk/environmental-and-social-schemes/energy-company-obligation-eco' },
      { label: 'GOV.UK — Improve Your Home\'s Energy Efficiency', url: 'https://www.gov.uk/improve-energy-efficiency' },
      { label: 'Simple Energy Advice — ECO4 Checker', url: 'https://www.simpleenergyadvice.org.uk/' },
    ],
  },

  'universal-credit-guide': {
    author: 'priya',
    datePublished: '2025-11-20T09:00:00+00:00',
    dateModified: '2026-04-06T09:00:00+00:00',
    image: 'https://ukgrants.online/og-image.svg',
    wordCount: 1600,
    primaryKeyword: 'Universal Credit',
    intro: `Universal Credit is the UK's main working-age benefit — a single monthly payment replacing six older benefits. As of 2025, over **7 million people** in the UK claim it. Yet the application process, payment timescales, and taper rates confuse many people who are entitled.

This complete guide explains who qualifies for Universal Credit in 2025, how much you can receive, and the exact steps to claim — including what to do if you need money before your first payment arrives.`,
    sections: [
      {
        h2: 'Who Is Eligible for Universal Credit?',
        body: `You can claim Universal Credit if you:
- Are aged 18 or over (some 16–17 year olds qualify in limited circumstances)
- Are below State Pension age
- Live in the UK
- Have £16,000 or less in savings (you and your partner combined)
- Are on a low income, out of work, or cannot work due to health reasons

**You can claim whether you are:** employed, self-employed, unemployed, caring for a child or disabled person, or unable to work due to illness.

Universal Credit replaces: Jobseeker's Allowance (income-based), Employment and Support Allowance (income-related), Income Support, Working Tax Credit, Child Tax Credit, and Housing Benefit. If you currently receive any of these, you will be gradually moved to Universal Credit — known as "managed migration".`,
      },
      {
        h2: 'Universal Credit Rates 2025/26 — How Much Will You Get?',
        body: `The base payment is called the **Standard Allowance**. Your total Universal Credit will be the Standard Allowance plus any additional elements you qualify for.

**Standard Allowance (per month):**
- Single, under 25: **£311.68**
- Single, 25 or over: **£393.45**
- Couple, both under 25: **£489.23**
- Couple, one or both 25+: **£617.60**

**Additional elements added on top:**
- First child (born before 6 April 2017): **£333.33/month**
- Second and subsequent children: **£287.92/month**
- Disabled child: £156.11–£487.58/month depending on severity
- Limited Capability for Work and Work-Related Activity (health condition): **£416.19/month**
- Carer element (if caring 35+ hours/week): **£198.31/month**
- Housing element: replaces Housing Benefit — based on your rent and local housing rates
- Childcare: up to **85% of costs** (max £1,014.63/month for one child, £1,739.37 for two+)

The total you receive will reduce as your earnings increase — by **55p for every £1 earned** above your Work Allowance (if you have one). This is called the taper rate.`,
      },
      {
        h2: 'How to Apply for Universal Credit — Step by Step',
        body: `**Step 1 — Create a GOV.UK account**
Go to [universal-credit.service.gov.uk](https://www.gov.uk/universal-credit/how-to-claim) and create an account. You'll need an email address and phone number.

**Step 2 — Complete your online claim**
The application takes 25–40 minutes. You'll need: National Insurance number, bank account details, housing costs (rent or mortgage), income details, and details of any children in your household.

**Step 3 — Verify your identity**
Identity is verified online using GOV.UK One Login. If you can't verify online, you can go to a Jobcentre Plus.

**Step 4 — Jobcentre appointment**
Within 10 days of your claim, you'll receive a letter inviting you to a Jobcentre appointment to sign your Claimant Commitment (your agreement about what you'll do in return for payments).

**Step 5 — First payment**
Your first payment arrives approximately **5 weeks after your claim date** (4-week assessment period + 7 days for processing).

**If you need money urgently:** Request an **Advance Payment** immediately after submitting your claim. This is an interest-free loan of up to a month's Universal Credit, repaid from future payments over up to 24 months. Call 0800 328 5644 to request one.`,
        hasInternalLink: { text: 'use our eligibility checker to find all benefits you qualify for', url: '/tools/eligibility' },
      },
      {
        h2: 'Universal Credit and Work — The Taper Rate Explained',
        body: `One of the most misunderstood aspects of Universal Credit is how it decreases as you earn more.

**Work Allowance:** If you have children or a limited capability for work, you can earn a set amount before your UC starts reducing. For 2025/26 this is:
- £673/month if housing support is included
- £404/month if housing costs are paid elsewhere

**Taper Rate:** After your Work Allowance (or from the first £1 if you don't have one), Universal Credit reduces by 55p for every £1 you earn. This means:
- If you earn an extra £100, your UC drops by £55 — you keep £45
- If you earn enough, your UC eventually reaches £0 (you "earn off" UC)

This structure ensures it always pays to work — earning more always means more money in your pocket overall. You can use the [Government's benefit calculator](https://www.gov.uk/benefits-calculators) to estimate your exact entitlement.`,
      },
      {
        h2: 'Universal Credit FAQs',
        body: `**Can I claim Universal Credit while working?**
Yes. UC is specifically designed to top up low wages. You can be in full-time, part-time, or self-employment and still claim.

**What happens to my Housing Benefit?**
When you move to UC, any Housing Benefit is replaced by the UC housing element. The amount is based on your Local Housing Allowance (private renters) or your actual rent (social housing).

**I'm self-employed — can I still claim?**
Yes. After 12 months of self-employment, a Minimum Income Floor applies — DWP treats you as earning the equivalent of the National Living Wage hours you've reported, even if you earn less. This can reduce your payment significantly.

**Can I claim if I have savings?**
Yes, if your savings are below £16,000. Savings between £6,000–£16,000 reduce your UC by £4.35 per month for every £250 above £6,000.

**What if my claim is refused?**
You have the right to request a Mandatory Reconsideration within one month of a decision. Citizens Advice can help you — see [citizensadvice.org.uk](https://www.citizensadvice.org.uk/benefits/universal-credit/).`,
      },
    ],
    conclusion: `Universal Credit is complex but navigable. The key points to remember: apply as soon as possible (the 5-week wait starts from your claim date), request an Advance Payment if you need money faster, and always check your full entitlement — many claimants miss additional elements.

**Next steps:** Use our [benefits eligibility checker](/tools/eligibility) to see what other support you may qualify for alongside Universal Credit. You might also be entitled to help with [housing costs](/housing) or [free training](/training) through other government schemes.

For free advice on your specific situation, contact your local [Citizens Advice](https://www.citizensadvice.org.uk/) or call the Universal Credit helpline on **0800 328 5644**.`,
    sources: [
      { label: 'GOV.UK — Universal Credit: How to Claim', url: 'https://www.gov.uk/universal-credit/how-to-claim' },
      { label: 'GOV.UK — Universal Credit Rates 2025/26', url: 'https://www.gov.uk/universal-credit' },
      { label: 'Citizens Advice — Universal Credit Help', url: 'https://www.citizensadvice.org.uk/benefits/universal-credit/' },
    ],
  },

  'startup-grants-uk': {
    author: 'james',
    datePublished: '2026-01-05T09:00:00+00:00',
    dateModified: '2026-04-06T09:00:00+00:00',
    image: 'https://ukgrants.online/og-image.svg',
    wordCount: 1400,
    primaryKeyword: 'UK startup grants',
    intro: `Looking for free money to start or grow your UK business? UK startup grants — funding you never have to repay — are available from the government, Innovate UK, and local Growth Hubs right now.

This guide covers every major startup grant available to UK founders in 2026, explains how to choose the right one, and walks you through the application process step by step.`,
    sections: [
      {
        h2: 'The Best UK Startup Grants Available in 2026',
        body: `**1. Innovate UK SMART Grants**
Up to **£500,000** for game-changing innovative ideas. Open to businesses of all sizes. Competition rounds open quarterly with a ~20% success rate. This is the most prestigious grant for tech and deep-tech startups.

**2. Innovate UK Launchpad (Regional)**
Sector-specific grants of **£25,000–£100,000** for early-stage innovative businesses in cleantech, healthtech, and deeptech. Launchpads run regionally, so check [Innovate UK's opportunity finder](https://www.ukri.org/opportunity/) for current open rounds.

**3. SBRI (Small Business Research Initiative)**
Government departments commission businesses to solve public sector challenges. Grants of **£25,000–£1,000,000** in two phases. No equity taken. Highly competitive but straightforward if your solution targets a specific department problem.

**4. UK Shared Prosperity Fund (UKSPF)**
Distributed by local councils and Growth Hubs. Grants of **£1,000–£50,000** for local businesses. Visit your local Growth Hub to find your area's current UKSPF rounds.

**5. New Enterprise Allowance (NEA)**
For Universal Credit claimants starting a business: up to **£1,274 in payments** over 26 weeks, plus a mentor and access to a business loan. See our full guide to [UK government loans and startup funding](/loans).

**6. R&D Tax Credits (Not a grant, but equally valuable)**
If you're doing scientific or technological innovation, you can claim back **up to 33% of R&D costs** from HMRC. Not a grant, but effectively free money for qualifying work.`,
        hasInternalLink: { text: 'see all business grants in our grants database', url: '/grants' },
      },
      {
        h2: 'How to Apply for a UK Startup Grant — 5 Steps',
        body: `**Step 1 — Find the right grant**
Use UK Funding Hub, Innovate UK's finder, and your local Growth Hub website. Each operates different rounds — a grant open today may close in 3 weeks.

**Step 2 — Check your eligibility carefully**
Most grants require:
- UK-registered business (or registration before payment)
- Under 2–5 years trading (for "early stage" rounds)
- Minimum innovation or novelty requirement
- Project must be additional — you cannot fund existing activities

**Step 3 — Build your application**
Grant assessors look for four things: a **clear, unmet problem**; an **innovative solution** (not just a new product); a **realistic market opportunity**; and a **credible team** to deliver it. Make all four explicit — don't assume they're obvious.

**Step 4 — Submit before the deadline**
There are **no exceptions for late submissions**. Innovate UK SMART deadlines are typically noon on a Wednesday. Set a reminder one week before.

**Step 5 — Await assessment**
Innovate UK takes **8–12 weeks** to assess and notify. UKSPF grants are faster — typically 3–6 weeks. Use the waiting time to apply for complementary grants simultaneously (there is no rule against holding multiple).`,
      },
      {
        h2: 'Mistakes That Get UK Grant Applications Rejected',
        body: `Based on feedback from successful founders and grant assessors, the most common reasons for rejection are:

**"Not innovative enough"** — Simply being a new business is not innovation. Assessors want to see something scientifically or technologically novel, or a genuinely new business model.

**Vague market sizing** — "The global market is £1 trillion" impresses nobody. Show a specific, reachable segment with credible evidence.

**Team gaps** — If your technical idea requires skills your team doesn't have, explain who you'll hire. Don't leave this to the assessor's imagination.

**Scope creep** — Asking for too much or trying to do too much in one grant year. Assessors prefer a focused, deliverable plan.

**Missing match funding** — Most Innovate UK grants require you to fund 30–50% of project costs yourself. Have this ready before applying.`,
      },
      {
        h2: 'Startup Grants FAQs',
        body: `**Do I have to repay a startup grant?**
No. Grants are free money. However, most require you to spend the funds on agreed activities and submit evidence of expenditure (receipts, payroll records, timesheets).

**Can a sole trader apply?**
Yes — most UK startup grants are open to sole traders, partnerships, and limited companies. Some Innovate UK rounds require incorporation before payment is released.

**Is there a grant for women-led startups?**
Yes — Innovate UK have specific strands, and many regional Growth Hubs run dedicated female founder programmes. Check [British Business Bank's dedicated programmes](https://www.british-business-bank.co.uk/finance-hub/business-guidance/equity/female-founders/).

**Can I apply for multiple grants at once?**
Yes. There is no restriction on applying for or holding multiple grants simultaneously, as long as you're not claiming the same costs twice ("double-funding").`,
      },
    ],
    conclusion: `UK startup grants are competitive but winnable. The key is applying to the right scheme for your stage and sector, building a compelling application around a genuine innovation, and submitting well before deadlines.

**Next steps:** Browse our full [grants database for businesses](/grants) to find current open rounds, or use the [eligibility checker](/tools/eligibility) to get a personalised recommendation based on your situation.

You may also want to explore [government-backed startup loans](/loans) as a complement to grant funding — especially the Start Up Loan scheme (up to £25,000 at 6% with free mentoring included).`,
    sources: [
      { label: 'Innovate UK — Funding Finder', url: 'https://www.ukri.org/opportunity/' },
      { label: 'GOV.UK — Start Up Loans', url: 'https://www.gov.uk/government/collections/start-up-loans-company' },
      { label: 'British Business Bank — Female Founders', url: 'https://www.british-business-bank.co.uk/finance-hub/business-guidance/equity/female-founders/' },
    ],
  },

  'household-support-fund': {
    author: 'priya',
    datePublished: '2026-02-01T09:00:00+00:00',
    dateModified: '2026-04-06T09:00:00+00:00',
    image: 'https://ukgrants.online/og-image.svg',
    wordCount: 1250,
    primaryKeyword: 'Household Support Fund',
    intro: `The Household Support Fund (HSF) is government money given directly to local councils to help families struggling with food, energy and essential costs. Extended into 2025, it remains one of the fastest ways to get emergency financial help — but most people don't know it exists.

This guide explains who qualifies, what the fund can pay for, and exactly how to apply at your local council before the money runs out.`,
    sections: [
      {
        h2: 'What Is the Household Support Fund?',
        body: `The Household Support Fund was launched in October 2021 and has been extended multiple times. In April 2025, the government confirmed a further year of funding.

Unlike national benefits, HSF money is **distributed by each local council** according to their own rules. This means:
- What you can claim varies by area
- Application processes differ (some online, some by phone, some through referral agencies)
- Funding runs out at different speeds in different councils

**Nationally, the fund has paid for:**
- Supermarket food vouchers (typically £50–£300 per household)
- Direct payments towards energy bills (£100–£500)
- White goods (fridges, washing machines) for families in crisis
- School clothing and bedding for children
- Water bill support in some areas

To find what your council offers, search **"[council name] Household Support Fund 2025"**.`,
        hasInternalLink: { text: 'see all government benefit payments available', url: '/benefits' },
      },
      {
        h2: 'Who Is Eligible for the Household Support Fund?',
        body: `Eligibility is set locally, but councils typically prioritise the following groups:

**Almost always eligible:**
- Households receiving Universal Credit, Pension Credit, or other means-tested benefits
- Families with children on free school meals
- Households with a disabled adult or child
- Pensioners not receiving Pension Credit who are struggling financially

**Often eligible (check with your council):**
- Low-income working households not on benefits
- People recently discharged from hospital
- Households with an unexpected financial crisis (job loss, relationship breakdown)

**Important:** Many councils will help **anyone on a low income**, regardless of benefit status. Don't assume you're ineligible without checking. Some councils use income thresholds of £30,000–£40,000 per year for a family.`,
      },
      {
        h2: 'How to Apply for the Household Support Fund',
        body: `**Method 1 — Apply directly to your council**
Most councils have an online form on their website. Search "[council name] Household Support Fund 2025" and look for the application portal. You'll typically need to provide:
- Proof of identity (passport, driving licence)
- Proof of address (utility bill, council tax letter)
- Proof of income or benefits receipt
- Bank account details for direct payments

**Method 2 — Via a referral agency**
Some councils only distribute HSF funds through trusted organisations such as:
- Community food banks and food pantries
- Citizens Advice Bureaux
- Housing associations and social landlords
- Health visitors and social workers

If your council uses referral agencies, contact Citizens Advice, your social worker, or your housing association for help.

**Method 3 — Automatic distribution**
Some councils automatically send payments to all eligible households, particularly for school meal vouchers during holidays. Check whether your council has done this before applying.`,
      },
      {
        h2: 'Household Support Fund FAQs',
        body: `**How much can I get?**
Varies hugely by council — from £50 food vouchers to £500 energy payments. Some councils offer a one-off payment; others have ongoing rounds.

**Can I apply more than once?**
In most areas, yes — but there are usually per-household limits and the fund runs out. Apply early every time a new round opens.

**Does receiving HSF affect my other benefits?**
No. Household Support Fund payments do not count as income for benefit purposes and will not reduce your Universal Credit, Housing Benefit or other entitlements.

**What if my council has run out of funding?**
Ask your council to add you to a waiting list. When the next allocation arrives (usually quarterly), you'll be contacted. In the meantime, check whether you also qualify for [Discretionary Housing Payments](/housing) or emergency assistance from your council.`,
      },
    ],
    conclusion: `The Household Support Fund is one of the most immediate, no-strings-attached forms of help available to UK households in financial difficulty. The main barrier is simply not knowing it exists — which is why applying as early as possible in each funding round matters.

**Act now:** Search your council's website for their current HSF round. If you're unsure of eligibility, contact Citizens Advice on [0800 144 8848](tel:08001448848) for free guidance.

While you're here, you can also [check all benefits you're entitled to](/benefits) and see whether you qualify for any of the hundreds of [UK government grants](/grants) available nationally.`,
    sources: [
      { label: 'GOV.UK — Household Support Fund Guidance', url: 'https://www.gov.uk/guidance/household-support-fund-guidance-for-local-councils' },
      { label: 'Turn2us — Benefits Finder', url: 'https://www.turn2us.org.uk/' },
      { label: 'Citizens Advice — Emergency Help', url: 'https://www.citizensadvice.org.uk/about-us/contact-us/contact-us/contact-us/' },
    ],
  },

  'disabled-facilities-grant': {
    author: 'sarah',
    datePublished: '2026-01-18T09:00:00+00:00',
    dateModified: '2026-04-06T09:00:00+00:00',
    image: 'https://ukgrants.online/og-image.svg',
    wordCount: 1500,
    primaryKeyword: 'Disabled Facilities Grant',
    intro: `The Disabled Facilities Grant (DFG) provides up to **£30,000** in England to adapt your home if you or someone you live with has a disability. Over 50,000 grants are awarded every year — yet many of the most eligible households never apply.

This guide tells you exactly who qualifies, what the grant can fund, and how to navigate the application process to get your adaptations approved as quickly as possible.`,
    sections: [
      {
        h2: 'What Does the Disabled Facilities Grant Fund?',
        body: `The DFG pays for structural adaptations specifically designed to make a home safe, accessible, and comfortable for a disabled person. Common funded works include:

**Access and movement:**
- Ramps and level entrances (removing steps at front and back doors)
- Stairlifts, through-floor lifts, and vertical platform lifts
- Widened doorways (to minimum 775mm for wheelchair access)
- Grab rails, handrails, and support handles throughout the home

**Bathroom adaptations:**
- Level-access (wet room) shower conversions — the single most common DFG measure
- Raised toilet seats and toilet frames
- Bath hoists and over-bath showers

**Kitchen and everyday living:**
- Lowered worktops and accessible kitchen units
- Easier-to-operate taps, switches, and door handles
- Heating controls repositioned for easier access

**Maximum grant amounts:**
- England: **£30,000**
- Wales: **£36,000**
- Northern Ireland: **£25,000**
- Scotland: Variable through local authority

The adapted home must be your (or the disabled person's) primary and only residence.`,
      },
      {
        h2: 'Who Is Eligible for a Disabled Facilities Grant?',
        body: `**The disabled person** can be the applicant or a family member living in the property.

**There is no specific diagnosis required.** Any permanent or substantial disability that affects your ability to use your home safely qualifies. This includes:
- Physical disabilities, ambulatory conditions, and reduced mobility
- Visual or hearing impairments
- Learning disabilities or cognitive conditions
- Long-term health conditions such as MS, Parkinson's, stroke recovery, or severe arthritis
- Conditions affecting children (including autism with sensory processing needs)

**You can be an owner-occupier, private tenant, or social housing tenant.** For tenants, your landlord's consent is required for structural changes — but councils have powers to negotiate.

**The means test:** DFG is means-tested for adults over 16. Your council's financial assessor calculates a contribution based on your income and savings. If your income is at or below the threshold, you receive the full grant. Above it, you contribute proportionally. Children's DFG applications are not means-tested.`,
      },
      {
        h2: 'How to Apply for a Disabled Facilities Grant',
        body: `**Step 1 — Contact your local council**
Apply through your council's housing department. Search "[council name] Disabled Facilities Grant application". Most councils now have online referral forms; others use telephone.

**Step 2 — Occupational Therapist assessment**
The council's Occupational Therapist (OT) visits your home to assess your needs and recommend what adaptations are necessary and appropriate. This is a **free assessment**. The OT's recommendation forms the core of your application.

**Step 3 — Get quotes**
You'll usually need 2–3 quotes from contractors. Some councils have approved contractor lists; others allow you to source your own. The council may help with this.

**Step 4 — Financial assessment (means test)**
The council's financial team calculates your contribution (if any) based on your income, savings, and outgoings. This determines your final grant amount.

**Step 5 — Works approved and completed**
Once all assessments and quotes are approved, work is scheduled. The council pays the contractor directly (or reimburses you after completion, depending on the council's process).

**Waiting times:** Councils are legally required to complete the process within **6 months** of application, but waiting times of 12–18 months are unfortunately common due to high demand. Apply as early as possible.

**Fast-track for terminal illness:** If the disabled person has a terminal illness, councils must fast-track the DFG. Mention this at the point of application.

For free help navigating the process, contact [Foundations](https://www.foundations.uk.com/) — the national body for Home Improvement Agencies: **0300 124 0315**.`,
        hasInternalLink: { text: 'see all UK housing grants and home improvement schemes', url: '/housing' },
      },
      {
        h2: 'What Happens If the Grant Isn\'t Enough?',
        body: `If your adaptation costs exceed the mandatory DFG maximum (£30,000 in England), you have several options:

**Discretionary top-up funding:** Most councils have a discretionary budget to top up DFG beyond the mandatory limit. Ask about this at the point of application — not all councils advertise it proactively.

**Disabled Person's Direct Payment:** If you're eligible for social care, you may receive a Direct Payment to fund additional care or adaptation costs independently.

**Charities:** Several national charities fund disability home adaptations. [Foundations](https://www.foundations.uk.com/) and the [Disabilities Trust](https://www.thedtgroup.org/) can signpost relevant funds.

You may also qualify for our [Disabled Facilities Grant alongside benefits](/benefits) like PIP or Attendance Allowance, which provide additional financial support for disabled people.`,
      },
      {
        h2: 'Disabled Facilities Grant FAQs',
        body: `**Does DFG affect my benefits?**
No. A DFG is not income and does not affect any means-tested benefits including Universal Credit, Housing Benefit, or Pension Credit.

**Can I get a DFG for a child?**
Yes. Children's DFG applications are not means-tested, so the full grant amount is available regardless of parental income.

**What if my landlord refuses consent?**
For private tenants, your local authority has limited powers to override a landlord refusal in practice. However, if your landlord has an EPC E, F or G-rated property, they may already be required by law to improve it. If you're in social housing, your housing association should cooperate — escalate to the housing manager if needed.

**I've been waiting 18 months — what can I do?**
Formally complain to the council's housing department citing the 6-month statutory target. If unresolved, escalate to your local MP or the Local Government Ombudsman.`,
      },
    ],
    conclusion: `The Disabled Facilities Grant is a legal entitlement — councils are required by law to process qualifying applications. If you or someone you live with has a disability and your home needs adapting, there is no reason not to apply.

**Start today:** Contact your local council's housing team or call Foundations on **0300 124 0315** for free help. Most home improvement agencies will support your application at no charge.

While you explore home adaptations, also check whether the disabled person qualifies for [PIP, Attendance Allowance or Carer's Allowance](/benefits) — these can provide additional ongoing financial support above the DFG.`,
    sources: [
      { label: 'GOV.UK — Disabled Facilities Grants', url: 'https://www.gov.uk/disabled-facilities-grants' },
      { label: 'Foundations — Home Improvement Agencies', url: 'https://www.foundations.uk.com/' },
      { label: 'Disability Rights UK — Housing Adaptations', url: 'https://www.disabilityrightsuk.org/housing-adaptations-and-disabled-facilities-grants' },
    ],
  },
}

// ── Helper: Render body text (bold, bullets, links) ─────────────────────────
function renderBody(body, guide, internalLink) {
  const lines = body.split('\n')
  let rendered = []
  let pendingBullets = []

  function flushBullets() {
    if (pendingBullets.length > 0) {
      rendered.push(
        <ul key={`ul-${rendered.length}`} style={{ margin: '0 0 16px 0', paddingLeft: 20 }}>
          {pendingBullets.map((b, i) => (
            <li key={i} style={{ marginBottom: 6, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}
              dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      )
      pendingBullets = []
    }
  }

  lines.forEach((line, i) => {
    if (line.trim() === '') {
      flushBullets()
      return
    }
    if (line.startsWith('- ')) {
      pendingBullets.push(line.slice(2))
      return
    }
    flushBullets()
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      // Standalone bold line — treat as subheading
      rendered.push(
        <h3 key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '24px 0 8px' }}>
          {line.replace(/\*\*/g, '')}
        </h3>
      )
    } else {
      const html = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
          const isInternal = href.startsWith('/')
          return `<a href="${href}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} style="color:${guide.color};font-weight:600;text-decoration:underline;text-underline-offset:2px;">${text}</a>`
        })
      rendered.push(
        <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 12 }}
          dangerouslySetInnerHTML={{ __html: html }} />
      )
    }
  })
  flushBullets()
  return rendered
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const guide = GUIDES.find(g => g.slug === slug)
  const content = ARTICLE_CONTENT[slug]

  if (!guide || !content) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ marginBottom: 12 }}>Article not found</h2>
        <Link to="/guides" style={{ color: 'var(--accent-primary)' }}>← Back to Guides</Link>
      </div>
    )
  }

  const author = AUTHORS[content.author]
  const canonicalUrl = `https://ukgrants.online/guides/${slug}`
  const pageTitle = `${guide.title} [${new Date(content.datePublished).getFullYear()} Guide]`
  const pageDesc = guide.excerpt.slice(0, 160)

  const pubDateISO = content.datePublished
  const modDateISO = content.dateModified
  const pubDateDisplay = new Date(content.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const modDateDisplay = new Date(content.dateModified).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  // BlogPosting schema (required by template — not Article)
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    headline: pageTitle,
    description: pageDesc,
    image: content.image,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      jobTitle: author.role,
      worksFor: { '@type': 'Organization', name: 'UK Funding Hub', url: 'https://ukgrants.online/' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'UK Funding Hub',
      logo: { '@type': 'ImageObject', url: 'https://ukgrants.online/favicon.svg' },
    },
    datePublished: pubDateISO,
    dateModified: modDateISO,
    keywords: guide.keywords.join(', '),
    articleSection: guide.category,
    wordCount: content.wordCount,
    inLanguage: 'en-GB',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ukgrants.online/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ukgrants.online/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
    ],
  }

  // HowTo schema — for articles with numbered apply steps (technical-article.md requirement)
  const howToSections = content.sections.filter(s => s.h2.toLowerCase().includes('how to') || s.h2.toLowerCase().includes('step'))
  const howToSchema = howToSections.length > 0 ? {
    '@context': 'https://schema.org/',
    '@type': 'HowTo',
    name: `How to apply: ${guide.title}`,
    description: pageDesc,
    step: howToSections.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.h2,
      text: s.body.replace(/\*\*|\[.*?\]\(.*?\)|\n/g, ' ').slice(0, 300),
    })),
  } : null

  // Slugify section titles for TOC anchor IDs
  function toId(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

  return (
    <>
      <PageMeta
        title={`${pageTitle} — UK Funding Hub`}
        description={pageDesc}
        canonical={canonicalUrl}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}

      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 32 }}>
            <Link to="/" style={{ color: guide.color, textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} />
            <Link to="/guides" style={{ color: guide.color, textDecoration: 'none' }}>Guides</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-muted)' }}>{guide.category}</span>
          </nav>

          {/* Article header */}
          <header style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: guide.color, background: `${guide.color}12`, padding: '4px 12px', borderRadius: 20, border: `1px solid ${guide.color}25` }}>
                {guide.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Clock size={12} /> {guide.readTime}
              </span>
            </div>

            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: 20, color: 'var(--text-primary)' }}>
              {guide.emoji} {guide.title}
            </h1>

            {/* Author + Dates block — template required: author name, bio, photo + dates visible */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', background: '#fff', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', flexWrap: 'wrap' }}>
              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${author.color}, ${author.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 800, flexShrink: 0, boxShadow: `0 2px 8px ${author.color}40` }}>
                {author.initials}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{author.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{author.role}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={11} />
                    <time dateTime={pubDateISO}>Published {pubDateDisplay}</time>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Edit3 size={11} />
                    <time dateTime={modDateISO}>Updated {modDateDisplay}</time>
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#2e7d32', fontWeight: 600, background: 'rgba(76,175,80,0.08)', padding: '5px 10px', borderRadius: 20, border: '1px solid rgba(76,175,80,0.2)', flexShrink: 0 }}>
                <Shield size={11} /> Verified GOV.UK
              </div>
            </div>
          </header>

          {/* Article body */}
          <article>

            {/* ── Table of Contents (technical-article.md requirement) ── */}
            <nav aria-label="Table of contents" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 36, boxShadow: 'var(--shadow)' }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 12 }}>📋 In This Guide</div>
              <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {content.sections.map((section, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem' }}>
                    <a href={`#${toId(section.h2)}`} style={{ color: guide.color, textDecoration: 'none', fontWeight: 500, lineHeight: 1.5 }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                      {section.h2}
                    </a>
                  </li>
                ))}
                <li style={{ fontSize: '0.9rem' }}>
                  <a href="#summary" style={{ color: guide.color, textDecoration: 'none', fontWeight: 500 }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                    Summary &amp; Next Steps
                  </a>
                </li>
              </ol>
            </nav>

            {/* Introduction */}
            <div style={{ fontSize: '1.06rem', color: 'var(--text-primary)', marginBottom: 36, lineHeight: 1.8, padding: '20px 24px', background: `${guide.color}06`, borderLeft: `4px solid ${guide.color}`, borderRadius: '0 10px 10px 0' }}>
              {content.intro.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: i < content.intro.split('\n\n').length - 1 ? 14 : 0 }}
                  dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>

            {/* Sections — with anchor IDs for TOC jump links */}
            {content.sections.map((section, idx) => (
              <section key={idx} id={toId(section.h2)} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 18, paddingBottom: 10, borderBottom: `3px solid ${guide.color}25` }}>
                  {section.h2}
                </h2>
                {renderBody(section.body, guide)}
                {/* Inline internal link (template: 3-5 descriptive internal links) */}
                {section.hasInternalLink && (
                  <div style={{ marginTop: 16, padding: '12px 16px', background: `${guide.color}08`, borderRadius: 10, border: `1px dashed ${guide.color}40` }}>
                    <Link to={section.hasInternalLink.url} style={{ color: guide.color, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChevronRight size={14} />
                      {section.hasInternalLink.text}
                    </Link>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion — template required */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 18, paddingBottom: 10, borderBottom: `3px solid ${guide.color}25` }}>
                Summary & Next Steps
              </h2>
              <div style={{ padding: '20px 24px', background: `${guide.color}06`, borderLeft: `4px solid ${guide.color}`, borderRadius: '0 10px 10px 0' }}>
                {content.conclusion.split('\n\n').map((para, i) => (
                  <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: i < content.conclusion.split('\n\n').length - 1 ? 12 : 0 }}
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) =>
                          `<a href="${href}" ${href.startsWith('/') ? '' : 'target="_blank" rel="noopener noreferrer"'} style="color:${guide.color};font-weight:600;">${text}</a>`
                        )
                    }} />
                ))}
              </div>
            </section>

            {/* Author bio — template: author bio visible */}
            <section style={{ marginBottom: 40, padding: '24px', background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${author.color}, ${author.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                  {author.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <User size={14} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About the Author</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 2 }}>{author.name}</div>
                  <div style={{ fontSize: '0.8rem', color: guide.color, fontWeight: 600, marginBottom: 8 }}>{author.role} — {author.credentials}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{author.bio}</p>
                  <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: '0.8rem', color: guide.color, fontWeight: 600, textDecoration: 'none' }}>
                    Meet the full team →
                  </Link>
                </div>
              </div>
            </section>

            {/* External sources — template: 2-3 authority links */}
            <section style={{ marginBottom: 40, padding: '24px', background: 'var(--bg-layer-2)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                📚 Sources & Further Reading
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {content.sources.map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: guide.color, fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
                    <ExternalLink size={14} />
                    {src.label}
                  </a>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--text-muted)', margin: '16px 0 0 0' }}>
                Verified by the UK Funding Hub editorial team. Always confirm details on official official GOV.UK sources before applying.
              </p>
            </section>
          </article>

          {/* Related articles — internal links */}
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
              Related Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
              {GUIDES.filter(g => g.slug !== slug).slice(0, 3).map(g => (
                <Link key={g.slug} to={`/guides/${g.slug}`} style={{
                  display: 'block', padding: '16px', borderRadius: 12,
                  border: '1px solid var(--border)', background: '#fff',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'border-color 0.15s, transform 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{g.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 6 }}>{g.title}</div>
                  <div style={{ fontSize: '0.75rem', color: g.color, fontWeight: 600 }}>{g.readTime}</div>
                </Link>
              ))}
            </div>
          </section>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button onClick={() => navigate('/guides')} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <ArrowLeft size={14} /> Back to All Guides
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
