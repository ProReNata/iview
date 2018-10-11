import setLang from '../lang';

const lang = {
  i: {
    datepicker: {
      clear: 'クリーア',
      datePanelLabel: '[yyyy年] [m月]',
      endTime: '終了時間',
      month: '月',
      month1: '1 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      months: {
        m1: '1月',
        m10: '10月',
        m11: '11月',
        m12: '12月',
        m2: '2月',
        m3: '3月',
        m4: '4月',
        m5: '5月',
        m6: '6月',
        m7: '7月',
        m8: '8月',
        m9: '9月',
      },
      ok: '確定',
      selectDate: '日時を選んでください',
      selectTime: '時間を選んでください',
      startTime: 'スタート時間',
      weeks: {
        fri: '金',
        mon: '月',
        sat: '土',
        sun: '日',
        thu: '木',
        tue: '火',
        wed: '水',
      },
      weekStartDay: '0',
      year: '年',
    },
    locale: 'ja-JP',
    modal: {
      cancelText: 'キャンセル',
      okText: '確定',
    },
    page: {
      goto: '',
      item: '件',
      items: '件',
      next: '次へ',
      next5: '次の５ページへ',
      p: 'ページ目へ',
      page: '件/ページ',
      prev: '前へ',
      prev5: '前の５ページへ',
      total: '全部',
    },
    poptip: {
      cancelText: 'キャンセル',
      okText: '確定',
    },
    rate: {
      star: '点',
      stars: '点',
    },
    select: {
      loading: 'ロード中',
      noMatch: 'マッチするデータなし',
      placeholder: '選んでください',
    },
    table: {
      clearFilter: '全部',
      confirmFilter: 'スクリーニング',
      noDataText: 'データなし',
      noFilteredDataText: 'スクリーニングしたデータなし',
      resetFilter: 'リセット',
    },
    transfer: {
      filterPlaceholder: '検索内容を入力ください',
      notFoundText: '内容が見つかってなかった',
      titles: {
        source: 'ソースリスト',
        target: 'ターゲットリスト',
      },
    },
    tree: {
      emptyText: 'データなし',
    },
  },
};

setLang(lang);

export default lang;
