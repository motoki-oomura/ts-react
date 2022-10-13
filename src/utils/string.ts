/**
 * テキストから正規表現でヒットした情報を取得する関数
 * start = 該当文字列の頭の位置, end = 該当文字列の末尾の位置, text = 該当文字列, capture = キャプチャグループで囲った場合に左から順に表示
 * 参考返り値: [ { start: 0, end: 4, text: '私は人間です', capture: ['私', '人間'] } ]
 */
export const findStringWithRegex = (regex: RegExp, text: string) => {
    let [matchArr, results]: [RegExpExecArray | null, { text: string; start: number; end: number; capture: string[] }[]] = [null, []];
    while ((matchArr = regex.exec(text)) !== null) {
        const [text, ...capture] = matchArr;
        const result = {
            text: text,
            start: matchArr.index,
            end: matchArr.index + matchArr[0].length,
            capture,
        };
        results = [...results, result];
    }
    return results;
};
