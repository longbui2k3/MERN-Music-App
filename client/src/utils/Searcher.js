export const Searcher = (() => {
  let escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
  let escapeReg = (reg) => reg.replace(escapeRegExp, "\\$&");
  let groupLeft = "",
    groupRight = "";
  let groupReg = new RegExp(escapeReg(groupRight + groupLeft), "g");
  let groupExtractReg = new RegExp(
    "(" + escapeReg(groupLeft) + "[\\s\\S]+?" + escapeReg(groupRight) + ")",
    "g"
  );
  let findMax = (str, keyword) => {
    let max = 0;
    keyword = groupLeft + keyword + groupRight;
    str.replace(groupExtractReg, (m) => {
      if (keyword === m) {
        max = Number.MAX_SAFE_INTEGER;
      } else if (m.length > max) {
        max = m.length;
      }
    });
    return max;
  };
  let keyReg = (key) => {
    let src = ["(.*?)("];
    let ks = key.split("");
    if (ks.length) {
      while (ks.length) {
        src.push(escapeReg(ks.shift()), ")(.*?)(");
      }
      src.pop();
    }
    src.push(")(.*?)");
    src = src.join("");
    let reg = new RegExp(src, "i");
    let replacer = [];
    let start = key.length;
    let begin = 1;
    while (start > 0) {
      start--;
      replacer.push("$", begin, groupLeft + "$", begin + 1, groupRight);
      begin += 2;
    }
    replacer.push("$", begin);

    let info = {
      regexp: reg,
      replacement: replacer.join(""),
    };
    return info;
  };

  return {
    search(list, keyword) {
      let kr = keyReg(keyword);
      let result = [];
      list.forEach((e, index) => {
        if (kr.regexp.test(e)) {
          result.push([
            e.replace(kr.regexp, kr.replacement).replace(groupReg, ""),
            index,
          ]);
        }
      });
      //   result = result.sort((a, b) => findMax(b, keyword) - findMax(a, keyword));
      console.log(`result::::`, result);
      //create div
      //   result = result.map(el => {
      //     return `${el}`
      //   })
      return result;
    },
  };
})();
