/**
 * 获取 ios 大版本号
 */
export function getIOSVersion() {
  const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  return parseInt(version[1], 10);
}

/**
 * 获取 微信 版本号
 */
export function getWeChatVersion() {
  const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i);
  return version[1] || '';
}

/**
 * 比较版本号
 * @param {string} v1 当前版本号
 * @param {string} v2 目标版本号
 * @returns {number} 0: v1 === v2, 1: v1 > v2, -1: v1 < v2
 */
export function compareVersion(v1, v2) {
  const ver1 = v1.split('.');
  const ver2 = v2.split('.');
  const len = Math.max(ver1.length, ver2.length);

  while (ver1.length < len) {
    ver1.push('0');
  }
  while (ver2.length < len) {
    ver2.push('0');
  }

  for (let i = 0; i < len; i += 1) {
    const num1 = parseInt(ver1[i], 10);
    const num2 = parseInt(ver2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

/**
 * 获取 browser 信息
 */
export function getBrowser() {
  const ua = window.navigator.userAgent || '';
  const isAndroid = /android/i.test(ua);
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isWechat = /micromessenger\/([\d.]+)/i.test(ua);
  const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
  const isQQ = /qq\/([\d.]+)/i.test(ua);
  const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);
  const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
  // 安卓 chrome 浏览器，很多 app 都是在 chrome 的 ua 上进行扩展的
  const isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid;
  // chrome for ios 和 safari 的区别仅仅是将 Version/<VersionNum> 替换成了 CriOS/<ChromeRevision>
  // ios 上很多 app 都包含 safari 标识，但它们都是以自己的 app 标识开头，而不是 Mozilla
  const isSafari = /safari\/([\d.]+)$/i.test(ua) && isIos && ua.indexOf('Crios') < 0 && ua.indexOf('Mozilla') === 0;

  return {
    isAndroid,
    isIos,
    isWechat,
    isWeibo,
    isQQ,
    isQQBrowser,
    isQzone,
    isOriginalChrome,
    isSafari,
  };
}
