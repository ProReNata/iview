import setLang from '../lang';

const lang = {
  i: {
    datepicker: {
      clear: 'Vymazat',
      datePanelLabel: '[mmmm] [yyyy]',
      endTime: 'Konec',
      month: 'Měsíc',
      month1: 'Leden',
      month10: 'Říjen',
      month11: 'Listopad',
      month12: 'Prosinec',
      month2: 'Únor',
      month3: 'Březen',
      month4: 'Duben',
      month5: 'Květen',
      month6: 'Červen',
      month7: 'Červenec',
      month8: 'Srpen',
      month9: 'Září',
      months: {
        m1: 'Led',
        m10: 'Říj',
        m11: 'Lis',
        m12: 'Pro',
        m2: 'Úno',
        m3: 'Bře',
        m4: 'Dub',
        m5: 'Kvě',
        m6: 'Čer',
        m7: 'Čnc',
        m8: 'Srp',
        m9: 'Zář',
      },
      ok: 'OK',
      selectDate: 'Vybrat datum',
      selectTime: 'Vybrat čas',
      startTime: 'Začátek',
      weeks: {
        fri: 'Pá',
        mon: 'Po',
        sat: 'So',
        sun: 'Ne',
        thu: 'Čt',
        tue: 'Út',
        wed: 'St',
      },
      weekStartDay: '1',
      year: 'Rok',
    },
    locale: 'cs-CZ',
    modal: {
      cancelText: 'Zrušit',
      okText: 'OK',
    },
    page: {
      goto: 'Jít na',
      item: 'položka',
      /* TODO: add third plural form for Czech,
             * If there is 2-4 items the translation should be "položky"
             */

      // Plural form for 5 or more items
      items: 'položek',
      next: 'Předchozí',
      next5: 'Následujících 5 stránek',
      p: '',
      page: 'na stránku',
      prev: 'Následující',
      prev5: 'Předchozích 5 stránek',
      total: 'Celkem',
    },
    poptip: {
      cancelText: 'Zrušit',
      okText: 'OK',
    },
    rate: {
      star: 'hvězda',
      stars: 'hvězdy', // Plural form for 2-4 items
      /* TODO: add third plural form for Czech,
             * If there is 5 or more items the translation should be "hvězd"
             */
    },
    select: {
      loading: 'Nahrávám',
      noMatch: 'Nenalezeny žádné položky',
      placeholder: 'Vybrat',
    },
    table: {
      clearFilter: 'Vše',
      confirmFilter: 'Potvrdit',
      noDataText: 'Žádná data',
      noFilteredDataText: 'Nenalezeny žádné položky',
      resetFilter: 'Reset',
    },
    transfer: {
      filterPlaceholder: 'Hledat',
      notFoundText: 'Nenalezeno',
      titles: {
        source: 'Zdroj',
        target: 'Cíl',
      },
    },
    tree: {
      emptyText: 'Žádná data',
    },
  },
};

setLang(lang);

export default lang;
