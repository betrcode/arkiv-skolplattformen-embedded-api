import { clean, toMarkdown } from './parseHtml'

describe('parseHtml', () => {
  describe('clean', () => {
    it('cleans tag content', () => {
      const html = `
      <div>
        <b>Hello </b>
        <i> World</i>
        <u>&#160;!&#160;</u>
      </div>`

      const expected = `
      <DIV>
        <B>Hello</B>
        <I>World</I>
        <U>!</U>
      </DIV>`

      expect(clean(html)).toEqual(expected)
    })
    it('handles missing html', () => {
      expect(() => clean()).not.toThrow()
    })
    it('handles links with spaces', () => {
      const html = `
      <div>
        <a href="/foo bar">Hello </a>
        <a href='/foo bar'> Hello &#160;</a>
      </div>`
      const expected = `
      <DIV>
        <A href="/foo%20bar">Hello</A>
        <A href="/foo%20bar">Hello</A>
      </DIV>`

      expect(clean(html)).toEqual(expected)
    })
    it('handles breaks in <strong>', () => {
      const html = '<strong>Uppdatering 2021-02-08 <br /></strong>'
      const expected = '<STRONG>Uppdatering 2021-02-08</STRONG>'

      expect(clean(html)).toEqual(expected)
    })
  })
  describe('toMarkdown', () => {
    it('turns html into Markdown', () => {
      const html = `<div>
        <h1>Hello </h1>
        <strong> World</strong>
        <ul>
          <li> Foo </li>
        </ul>
        <a href="#">link</a>
        <table>
          <tbody>
            <tr>
              <td>left 1</td>
              <td>right 1</td>
            </tr>
            <tr>
              <td>left 2</td>
              <td>right 2</td>
            </tr>
          </tbody>
        </table>
      </div>`
      const expected = `# Hello #
**World**
- Foo

[link](#)

|left 1|right 1|
|--------|--------|
|left 2|right 2|`

      expect(toMarkdown(html)).toEqual(expected)
    })
    it('handles real data', () => {
      const html =
        '\u003cdiv data-sp-rte=""\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eHej,\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eNu ??r det dags f??r vattenballongkrig  \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e12/2-21 till om med tisdag 16/2-21.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eAlla knep ??r till??tna. \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eDet blir kul.\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eKolla in Reddit\u0026#58; \u003ca href="https\u0026#58;//reddit.com/water-balloons/where-to-buy/" data-cke-saved-href="https\u0026#58;//reddit.com/water-balloons/where-to-buy/"\u003ehttps\u0026#58;//reddit.com/water-balloons/where-to-buy/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e...och h??r\u0026#58; \u003ca href="https\u0026#58;//reddit.com/splash-wars/" data-cke-saved-href="https\u0026#58;//reddit.com/splash-wars/"\u003ehttps\u0026#58;//reddit.com/splash-wars/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003ch2\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eOm att vara hemma vid symtom\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/h2\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e??ven HackerNews ??r bra.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003ca href="https\u0026#58;//wnews.ycombinator.com/" data-cke-saved-href="https\u0026#58;//wnews.ycombinator.com/"\u003ehttps\u0026#58;//wnews.ycombinator.com/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eVi forts??tter ocks?? att\u0026#58;\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cul\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eh??lla avst??nd.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eha flera digitala m??ten.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003etv??tta h??nderna.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eundvika kollektivtrafik om det ??r m??jligt.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003c/ul\u003e\u003cul\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003estanna hemma ??ven n??r man bara k??nner sig lite sjuk.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003ev??dra ofta\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003c/ul\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eTa hand om er!\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eHa kul tillsammans, p?? avst??nd.\u003c/b\u003e\u0026#160; \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eStort tack f??r ert samarbete! \u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eV??nligen, \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003erektorfnamn rektorenamn, rektor\u0026#160; \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eVid fr??gor, kontakta oss g??rna\u0026#58; \u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003e\u003cspan\u003eSkolledning\u003c/span\u003e\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003erektorfnamn rektorenamn rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;rektorfnamn.rektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;rektorfnamn.rektorenamn@edu.stockholm.se"\u003e\u003cspan\u003erektorfnamn.rektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003ebrektorfnamn brektorenamn, bitr. rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;brektorfnamn.u.brektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;brektorfnamn.u.brektorenamn@edu.stockholm.se"\u003e\u003cspan\u003ebrektorfnamn.u.brektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eb2rektorfnamn b2rektorenamn bitr. rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;b2rektorfnamn.b2rektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;b2rektorfnamn.b2rektorenamn@edu.stockholm.se"\u003e\u003cspan\u003eb2rektorfnamn.b2rektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003e\u003cspan\u003eSkolh??lsan\u003c/span\u003e\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eb2rektorfnamn skolskstenamn skolsk??terska\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;b2rektorfnamn.skolskstenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;b2rektorfnamn.skolskstenamn@edu.stockholm.se"\u003e\u003cspan\u003eb2rektorfnamn.skolskstenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eStort tack f??r ert samarbete!\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003c/div\u003e\u003cdiv data-sp-rte=""\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003c/div\u003e'
      const nbsp = String.fromCharCode(160)
      const expected = `Hej,

Nu ??r det dags f??r vattenballongkrig  12/2-21 till om med tisdag 16/2-21.

Alla knep ??r till??tna. 

Det blir kul.

Kolla in Reddit: [https://reddit.com/water-balloons/where-to-buy/](https://reddit.com/water-balloons/where-to-buy/)

...och h??r: [https://reddit.com/splash-wars/](https://reddit.com/splash-wars/)

## Om att vara hemma vid symtom ##

??ven HackerNews ??r bra.

[https://wnews.ycombinator.com/](https://wnews.ycombinator.com/)

Vi forts??tter ocks?? att:

- h??lla avst??nd.
- ha flera digitala m??ten.
- tv??tta h??nderna.
- undvika kollektivtrafik om det ??r m??jligt.

- stanna hemma ??ven n??r man bara k??nner sig lite sjuk.
- v??dra ofta

Ta hand om er!

Ha kul tillsammans, p?? avst??nd.

Stort tack f??r ert samarbete! ${nbsp}

V??nligen, 

rektorfnamn rektorenamn, rektor${nbsp} 

Vid fr??gor, kontakta oss g??rna:

Skolledning

rektorfnamn rektorenamn rektor: [rektorfnamn.rektorenamn@edu.stockholm.se](mailto:rektorfnamn.rektorenamn@edu.stockholm.se)

brektorfnamn brektorenamn, bitr. rektor: [brektorfnamn.u.brektorenamn@edu.stockholm.se](mailto:brektorfnamn.u.brektorenamn@edu.stockholm.se)

b2rektorfnamn b2rektorenamn bitr. rektor: [b2rektorfnamn.b2rektorenamn@edu.stockholm.se](mailto:b2rektorfnamn.b2rektorenamn@edu.stockholm.se)

Skolh??lsan

b2rektorfnamn skolskstenamn skolsk??terska: [b2rektorfnamn.skolskstenamn@edu.stockholm.se](mailto:b2rektorfnamn.skolskstenamn@edu.stockholm.se)

Stort tack f??r ert samarbete!`

      expect(toMarkdown(html)).toEqual(expected)
    })
  })
})
