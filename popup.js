const queryInfo = {
  'active': true,
  'lastFocusedWindow': true
};
chrome.tabs.query(queryInfo, tabs => {
  // ==================================
  // コピペ用フォーマット
  // ==================================
  const FMT = `■{{title}}
{{url}}`;

  // ==================================
  // <title> のテキストと URL の取得
  // ==================================
  const title = tabs[0].title;
  const url = tabs[0].url;

  // ==================================
  // コピペ用に整形
  // ==================================
  const formattedText = FMT.replace('{{title}}', title).replace('{{url}}', url);

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
});
