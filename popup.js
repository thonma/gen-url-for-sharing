const FMT_CONFIG_KEY = 'FMT_CONFIG';
const TITLE_FMT = '__title__';
const URL_FMT = '__url__';
const INITIAL_FMT = `■${TITLE_FMT}
${URL_FMT}`;

window.onload = () => {
  document.querySelector('#Fmt').addEventListener('change', () => {
    // ==================================
    // 設定保存
    // ==================================
    chrome.storage.sync.set({
      [FMT_CONFIG_KEY]: document.querySelector('#Fmt').value,
    });
  });
};

chrome.storage.sync.get([FMT_CONFIG_KEY], items => {
  const fmt = items[FMT_CONFIG_KEY] || INITIAL_FMT;
  document.querySelector('#Fmt').textContent = fmt;
  document.querySelector('#Fmt').value = fmt;

  const queryInfo = {
    'active': true,
    'lastFocusedWindow': true
  };
  chrome.tabs.query(queryInfo, tabs => {
    if (tabs.length === 0) return;

    // ==================================
    // <title> のテキストと URL の取得
    // ==================================
    const title = tabs[0].title;
    const url = tabs[0].url;

    // ==================================
    // コピペ用に整形
    // ==================================
    const formattedText = fmt.replace(TITLE_FMT, title).replace(URL_FMT, url);

    // ==================================
    // コピー
    // Clipboard API はデフォルト無効のため document.execCommand('copy') を使う
    // document.execCommand('copy') を使うために一時的に <textarea> を描画する
    // ==================================
    const tmpElement = document.createElement('textarea');
    tmpElement.textContent = formattedText;
    document.body.appendChild(tmpElement);
    tmpElement.select();
    document.execCommand('copy');
    tmpElement.blur();
    document.body.removeChild(tmpElement);

    // ==================================
    // コピーしたテキストを表示
    // ==================================
    document.querySelector('#CopiedTxt').textContent = formattedText;
    document.querySelector('#Notice').removeAttribute('hidden');
  });
});
