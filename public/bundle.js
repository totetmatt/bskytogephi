(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/graphemer/lib/boundaries.js
var require_boundaries = __commonJS({
  "../../node_modules/graphemer/lib/boundaries.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EXTENDED_PICTOGRAPHIC = exports.CLUSTER_BREAK = void 0;
    var CLUSTER_BREAK;
    (function(CLUSTER_BREAK2) {
      CLUSTER_BREAK2[CLUSTER_BREAK2["CR"] = 0] = "CR";
      CLUSTER_BREAK2[CLUSTER_BREAK2["LF"] = 1] = "LF";
      CLUSTER_BREAK2[CLUSTER_BREAK2["CONTROL"] = 2] = "CONTROL";
      CLUSTER_BREAK2[CLUSTER_BREAK2["EXTEND"] = 3] = "EXTEND";
      CLUSTER_BREAK2[CLUSTER_BREAK2["REGIONAL_INDICATOR"] = 4] = "REGIONAL_INDICATOR";
      CLUSTER_BREAK2[CLUSTER_BREAK2["SPACINGMARK"] = 5] = "SPACINGMARK";
      CLUSTER_BREAK2[CLUSTER_BREAK2["L"] = 6] = "L";
      CLUSTER_BREAK2[CLUSTER_BREAK2["V"] = 7] = "V";
      CLUSTER_BREAK2[CLUSTER_BREAK2["T"] = 8] = "T";
      CLUSTER_BREAK2[CLUSTER_BREAK2["LV"] = 9] = "LV";
      CLUSTER_BREAK2[CLUSTER_BREAK2["LVT"] = 10] = "LVT";
      CLUSTER_BREAK2[CLUSTER_BREAK2["OTHER"] = 11] = "OTHER";
      CLUSTER_BREAK2[CLUSTER_BREAK2["PREPEND"] = 12] = "PREPEND";
      CLUSTER_BREAK2[CLUSTER_BREAK2["E_BASE"] = 13] = "E_BASE";
      CLUSTER_BREAK2[CLUSTER_BREAK2["E_MODIFIER"] = 14] = "E_MODIFIER";
      CLUSTER_BREAK2[CLUSTER_BREAK2["ZWJ"] = 15] = "ZWJ";
      CLUSTER_BREAK2[CLUSTER_BREAK2["GLUE_AFTER_ZWJ"] = 16] = "GLUE_AFTER_ZWJ";
      CLUSTER_BREAK2[CLUSTER_BREAK2["E_BASE_GAZ"] = 17] = "E_BASE_GAZ";
    })(CLUSTER_BREAK = exports.CLUSTER_BREAK || (exports.CLUSTER_BREAK = {}));
    exports.EXTENDED_PICTOGRAPHIC = 101;
  }
});

// ../../node_modules/graphemer/lib/GraphemerHelper.js
var require_GraphemerHelper = __commonJS({
  "../../node_modules/graphemer/lib/GraphemerHelper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var boundaries_1 = require_boundaries();
    var NotBreak = 0;
    var BreakStart = 1;
    var Break = 2;
    var BreakLastRegional = 3;
    var BreakPenultimateRegional = 4;
    var GraphemerHelper = class {
      static isSurrogate(str, pos) {
        return 55296 <= str.charCodeAt(pos) && str.charCodeAt(pos) <= 56319 && 56320 <= str.charCodeAt(pos + 1) && str.charCodeAt(pos + 1) <= 57343;
      }
      static codePointAt(str, idx) {
        if (idx === void 0) {
          idx = 0;
        }
        const code2 = str.charCodeAt(idx);
        if (55296 <= code2 && code2 <= 56319 && idx < str.length - 1) {
          const hi = code2;
          const low = str.charCodeAt(idx + 1);
          if (56320 <= low && low <= 57343) {
            return (hi - 55296) * 1024 + (low - 56320) + 65536;
          }
          return hi;
        }
        if (56320 <= code2 && code2 <= 57343 && idx >= 1) {
          const hi = str.charCodeAt(idx - 1);
          const low = code2;
          if (55296 <= hi && hi <= 56319) {
            return (hi - 55296) * 1024 + (low - 56320) + 65536;
          }
          return low;
        }
        return code2;
      }
      static shouldBreak(start, mid, end, startEmoji, midEmoji, endEmoji) {
        const all = [start].concat(mid).concat([end]);
        const allEmoji = [startEmoji].concat(midEmoji).concat([endEmoji]);
        const previous = all[all.length - 2];
        const next = end;
        const nextEmoji = endEmoji;
        const rIIndex = all.lastIndexOf(boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR);
        if (rIIndex > 0 && all.slice(1, rIIndex).every(function(c) {
          return c === boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR;
        }) && [boundaries_1.CLUSTER_BREAK.PREPEND, boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR].indexOf(previous) === -1) {
          if (all.filter(function(c) {
            return c === boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR;
          }).length % 2 === 1) {
            return BreakLastRegional;
          } else {
            return BreakPenultimateRegional;
          }
        }
        if (previous === boundaries_1.CLUSTER_BREAK.CR && next === boundaries_1.CLUSTER_BREAK.LF) {
          return NotBreak;
        } else if (previous === boundaries_1.CLUSTER_BREAK.CONTROL || previous === boundaries_1.CLUSTER_BREAK.CR || previous === boundaries_1.CLUSTER_BREAK.LF) {
          return BreakStart;
        } else if (next === boundaries_1.CLUSTER_BREAK.CONTROL || next === boundaries_1.CLUSTER_BREAK.CR || next === boundaries_1.CLUSTER_BREAK.LF) {
          return BreakStart;
        } else if (previous === boundaries_1.CLUSTER_BREAK.L && (next === boundaries_1.CLUSTER_BREAK.L || next === boundaries_1.CLUSTER_BREAK.V || next === boundaries_1.CLUSTER_BREAK.LV || next === boundaries_1.CLUSTER_BREAK.LVT)) {
          return NotBreak;
        } else if ((previous === boundaries_1.CLUSTER_BREAK.LV || previous === boundaries_1.CLUSTER_BREAK.V) && (next === boundaries_1.CLUSTER_BREAK.V || next === boundaries_1.CLUSTER_BREAK.T)) {
          return NotBreak;
        } else if ((previous === boundaries_1.CLUSTER_BREAK.LVT || previous === boundaries_1.CLUSTER_BREAK.T) && next === boundaries_1.CLUSTER_BREAK.T) {
          return NotBreak;
        } else if (next === boundaries_1.CLUSTER_BREAK.EXTEND || next === boundaries_1.CLUSTER_BREAK.ZWJ) {
          return NotBreak;
        } else if (next === boundaries_1.CLUSTER_BREAK.SPACINGMARK) {
          return NotBreak;
        } else if (previous === boundaries_1.CLUSTER_BREAK.PREPEND) {
          return NotBreak;
        }
        const previousNonExtendIndex = allEmoji.slice(0, -1).lastIndexOf(boundaries_1.EXTENDED_PICTOGRAPHIC);
        if (previousNonExtendIndex !== -1 && allEmoji[previousNonExtendIndex] === boundaries_1.EXTENDED_PICTOGRAPHIC && all.slice(previousNonExtendIndex + 1, -2).every(function(c) {
          return c === boundaries_1.CLUSTER_BREAK.EXTEND;
        }) && previous === boundaries_1.CLUSTER_BREAK.ZWJ && nextEmoji === boundaries_1.EXTENDED_PICTOGRAPHIC) {
          return NotBreak;
        }
        if (mid.indexOf(boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR) !== -1) {
          return Break;
        }
        if (previous === boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR && next === boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR) {
          return NotBreak;
        }
        return BreakStart;
      }
    };
    exports.default = GraphemerHelper;
  }
});

// ../../node_modules/graphemer/lib/GraphemerIterator.js
var require_GraphemerIterator = __commonJS({
  "../../node_modules/graphemer/lib/GraphemerIterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphemerIterator = class {
      constructor(str, nextBreak) {
        this._index = 0;
        this._str = str;
        this._nextBreak = nextBreak;
      }
      [Symbol.iterator]() {
        return this;
      }
      next() {
        let brk;
        if ((brk = this._nextBreak(this._str, this._index)) < this._str.length) {
          const value = this._str.slice(this._index, brk);
          this._index = brk;
          return { value, done: false };
        }
        if (this._index < this._str.length) {
          const value = this._str.slice(this._index);
          this._index = this._str.length;
          return { value, done: false };
        }
        return { value: void 0, done: true };
      }
    };
    exports.default = GraphemerIterator;
  }
});

// ../../node_modules/graphemer/lib/Graphemer.js
var require_Graphemer = __commonJS({
  "../../node_modules/graphemer/lib/Graphemer.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var boundaries_1 = require_boundaries();
    var GraphemerHelper_1 = __importDefault(require_GraphemerHelper());
    var GraphemerIterator_1 = __importDefault(require_GraphemerIterator());
    var Graphemer2 = class {
      static nextBreak(string3, index) {
        if (index === void 0) {
          index = 0;
        }
        if (index < 0) {
          return 0;
        }
        if (index >= string3.length - 1) {
          return string3.length;
        }
        const prevCP = GraphemerHelper_1.default.codePointAt(string3, index);
        const prev = Graphemer2.getGraphemeBreakProperty(prevCP);
        const prevEmoji = Graphemer2.getEmojiProperty(prevCP);
        const mid = [];
        const midEmoji = [];
        for (let i = index + 1; i < string3.length; i++) {
          if (GraphemerHelper_1.default.isSurrogate(string3, i - 1)) {
            continue;
          }
          const nextCP = GraphemerHelper_1.default.codePointAt(string3, i);
          const next = Graphemer2.getGraphemeBreakProperty(nextCP);
          const nextEmoji = Graphemer2.getEmojiProperty(nextCP);
          if (GraphemerHelper_1.default.shouldBreak(prev, mid, next, prevEmoji, midEmoji, nextEmoji)) {
            return i;
          }
          mid.push(next);
          midEmoji.push(nextEmoji);
        }
        return string3.length;
      }
      splitGraphemes(str) {
        const res = [];
        let index = 0;
        let brk;
        while ((brk = Graphemer2.nextBreak(str, index)) < str.length) {
          res.push(str.slice(index, brk));
          index = brk;
        }
        if (index < str.length) {
          res.push(str.slice(index));
        }
        return res;
      }
      iterateGraphemes(str) {
        return new GraphemerIterator_1.default(str, Graphemer2.nextBreak);
      }
      countGraphemes(str) {
        let count = 0;
        let index = 0;
        let brk;
        while ((brk = Graphemer2.nextBreak(str, index)) < str.length) {
          index = brk;
          count++;
        }
        if (index < str.length) {
          count++;
        }
        return count;
      }
      static getGraphemeBreakProperty(code2) {
        if (code2 < 48905) {
          if (code2 < 44116) {
            if (code2 < 4141) {
              if (code2 < 2818) {
                if (code2 < 2363) {
                  if (code2 < 1759) {
                    if (code2 < 1471) {
                      if (code2 < 127) {
                        if (code2 < 11) {
                          if (code2 < 10) {
                            if (0 <= code2 && code2 <= 9) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (10 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LF;
                            }
                          }
                        } else {
                          if (code2 < 13) {
                            if (11 <= code2 && code2 <= 12) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (code2 < 14) {
                              if (13 === code2) {
                                return boundaries_1.CLUSTER_BREAK.CR;
                              }
                            } else {
                              if (14 <= code2 && code2 <= 31) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 768) {
                          if (code2 < 173) {
                            if (127 <= code2 && code2 <= 159) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (173 === code2) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          }
                        } else {
                          if (code2 < 1155) {
                            if (768 <= code2 && code2 <= 879) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 1425) {
                              if (1155 <= code2 && code2 <= 1161) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (1425 <= code2 && code2 <= 1469) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 1552) {
                        if (code2 < 1476) {
                          if (code2 < 1473) {
                            if (1471 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (1473 <= code2 && code2 <= 1474) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 1479) {
                            if (1476 <= code2 && code2 <= 1477) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 1536) {
                              if (1479 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (1536 <= code2 && code2 <= 1541) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 1648) {
                          if (code2 < 1564) {
                            if (1552 <= code2 && code2 <= 1562) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 1611) {
                              if (1564 === code2) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            } else {
                              if (1611 <= code2 && code2 <= 1631) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 1750) {
                            if (1648 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 1757) {
                              if (1750 <= code2 && code2 <= 1756) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (1757 === code2) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 2075) {
                      if (code2 < 1840) {
                        if (code2 < 1770) {
                          if (code2 < 1767) {
                            if (1759 <= code2 && code2 <= 1764) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (1767 <= code2 && code2 <= 1768) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 1807) {
                            if (1770 <= code2 && code2 <= 1773) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (1807 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                            if (1809 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 2027) {
                          if (code2 < 1958) {
                            if (1840 <= code2 && code2 <= 1866) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (1958 <= code2 && code2 <= 1968) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 2045) {
                            if (2027 <= code2 && code2 <= 2035) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2070) {
                              if (2045 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2070 <= code2 && code2 <= 2073) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 2200) {
                        if (code2 < 2089) {
                          if (code2 < 2085) {
                            if (2075 <= code2 && code2 <= 2083) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (2085 <= code2 && code2 <= 2087) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 2137) {
                            if (2089 <= code2 && code2 <= 2093) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2192) {
                              if (2137 <= code2 && code2 <= 2139) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2192 <= code2 && code2 <= 2193) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2275) {
                          if (code2 < 2250) {
                            if (2200 <= code2 && code2 <= 2207) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2274) {
                              if (2250 <= code2 && code2 <= 2273) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2274 === code2) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 2307) {
                            if (2275 <= code2 && code2 <= 2306) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (2307 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (2362 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 2561) {
                    if (code2 < 2434) {
                      if (code2 < 2381) {
                        if (code2 < 2366) {
                          if (2363 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (2364 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 2369) {
                            if (2366 <= code2 && code2 <= 2368) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 2377) {
                              if (2369 <= code2 && code2 <= 2376) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2377 <= code2 && code2 <= 2380) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2385) {
                          if (code2 < 2382) {
                            if (2381 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (2382 <= code2 && code2 <= 2383) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 2402) {
                            if (2385 <= code2 && code2 <= 2391) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2433) {
                              if (2402 <= code2 && code2 <= 2403) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2433 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 2503) {
                        if (code2 < 2494) {
                          if (code2 < 2492) {
                            if (2434 <= code2 && code2 <= 2435) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (2492 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 2495) {
                            if (2494 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2497) {
                              if (2495 <= code2 && code2 <= 2496) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (2497 <= code2 && code2 <= 2500) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2519) {
                          if (code2 < 2507) {
                            if (2503 <= code2 && code2 <= 2504) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 2509) {
                              if (2507 <= code2 && code2 <= 2508) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (2509 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 2530) {
                            if (2519 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2558) {
                              if (2530 <= code2 && code2 <= 2531) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2558 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 2691) {
                      if (code2 < 2631) {
                        if (code2 < 2620) {
                          if (code2 < 2563) {
                            if (2561 <= code2 && code2 <= 2562) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (2563 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 2622) {
                            if (2620 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2625) {
                              if (2622 <= code2 && code2 <= 2624) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (2625 <= code2 && code2 <= 2626) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2672) {
                          if (code2 < 2635) {
                            if (2631 <= code2 && code2 <= 2632) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2641) {
                              if (2635 <= code2 && code2 <= 2637) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2641 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 2677) {
                            if (2672 <= code2 && code2 <= 2673) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2689) {
                              if (2677 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2689 <= code2 && code2 <= 2690) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 2761) {
                        if (code2 < 2750) {
                          if (2691 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (2748 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 2753) {
                            if (2750 <= code2 && code2 <= 2752) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 2759) {
                              if (2753 <= code2 && code2 <= 2757) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2759 <= code2 && code2 <= 2760) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2786) {
                          if (code2 < 2763) {
                            if (2761 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 2765) {
                              if (2763 <= code2 && code2 <= 2764) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (2765 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 2810) {
                            if (2786 <= code2 && code2 <= 2787) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2817) {
                              if (2810 <= code2 && code2 <= 2815) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2817 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 3315) {
                  if (code2 < 3076) {
                    if (code2 < 2946) {
                      if (code2 < 2887) {
                        if (code2 < 2878) {
                          if (code2 < 2876) {
                            if (2818 <= code2 && code2 <= 2819) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (2876 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 2880) {
                            if (2878 <= code2 && code2 <= 2879) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2881) {
                              if (2880 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (2881 <= code2 && code2 <= 2884) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 2893) {
                          if (code2 < 2891) {
                            if (2887 <= code2 && code2 <= 2888) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (2891 <= code2 && code2 <= 2892) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 2901) {
                            if (2893 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 2914) {
                              if (2901 <= code2 && code2 <= 2903) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (2914 <= code2 && code2 <= 2915) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 3014) {
                        if (code2 < 3007) {
                          if (2946 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                          if (3006 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 3008) {
                            if (3007 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3009) {
                              if (3008 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3009 <= code2 && code2 <= 3010) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3031) {
                          if (code2 < 3018) {
                            if (3014 <= code2 && code2 <= 3016) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3021) {
                              if (3018 <= code2 && code2 <= 3020) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3021 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 3072) {
                            if (3031 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3073) {
                              if (3072 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3073 <= code2 && code2 <= 3075) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 3262) {
                      if (code2 < 3146) {
                        if (code2 < 3134) {
                          if (3076 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                          if (3132 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 3137) {
                            if (3134 <= code2 && code2 <= 3136) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3142) {
                              if (3137 <= code2 && code2 <= 3140) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3142 <= code2 && code2 <= 3144) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3201) {
                          if (code2 < 3157) {
                            if (3146 <= code2 && code2 <= 3149) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3170) {
                              if (3157 <= code2 && code2 <= 3158) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3170 <= code2 && code2 <= 3171) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 3202) {
                            if (3201 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3260) {
                              if (3202 <= code2 && code2 <= 3203) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3260 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 3270) {
                        if (code2 < 3264) {
                          if (3262 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (3263 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 3266) {
                            if (3264 <= code2 && code2 <= 3265) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3267) {
                              if (3266 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3267 <= code2 && code2 <= 3268) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3276) {
                          if (code2 < 3271) {
                            if (3270 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3274) {
                              if (3271 <= code2 && code2 <= 3272) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3274 <= code2 && code2 <= 3275) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 3285) {
                            if (3276 <= code2 && code2 <= 3277) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3298) {
                              if (3285 <= code2 && code2 <= 3286) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3298 <= code2 && code2 <= 3299) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 3551) {
                    if (code2 < 3406) {
                      if (code2 < 3391) {
                        if (code2 < 3330) {
                          if (code2 < 3328) {
                            if (3315 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (3328 <= code2 && code2 <= 3329) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 3387) {
                            if (3330 <= code2 && code2 <= 3331) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3390) {
                              if (3387 <= code2 && code2 <= 3388) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3390 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3398) {
                          if (code2 < 3393) {
                            if (3391 <= code2 && code2 <= 3392) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (3393 <= code2 && code2 <= 3396) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 3402) {
                            if (3398 <= code2 && code2 <= 3400) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3405) {
                              if (3402 <= code2 && code2 <= 3404) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3405 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 3530) {
                        if (code2 < 3426) {
                          if (3406 === code2) {
                            return boundaries_1.CLUSTER_BREAK.PREPEND;
                          }
                          if (3415 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 3457) {
                            if (3426 <= code2 && code2 <= 3427) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3458) {
                              if (3457 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3458 <= code2 && code2 <= 3459) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3538) {
                          if (code2 < 3535) {
                            if (3530 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3536) {
                              if (3535 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3536 <= code2 && code2 <= 3537) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 3542) {
                            if (3538 <= code2 && code2 <= 3540) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3544) {
                              if (3542 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3544 <= code2 && code2 <= 3550) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 3893) {
                      if (code2 < 3655) {
                        if (code2 < 3633) {
                          if (code2 < 3570) {
                            if (3551 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (3570 <= code2 && code2 <= 3571) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 3635) {
                            if (3633 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3636) {
                              if (3635 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3636 <= code2 && code2 <= 3642) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3764) {
                          if (code2 < 3761) {
                            if (3655 <= code2 && code2 <= 3662) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (3761 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (3763 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 3784) {
                            if (3764 <= code2 && code2 <= 3772) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3864) {
                              if (3784 <= code2 && code2 <= 3790) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3864 <= code2 && code2 <= 3865) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 3967) {
                        if (code2 < 3897) {
                          if (3893 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                          if (3895 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 3902) {
                            if (3897 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 3953) {
                              if (3902 <= code2 && code2 <= 3903) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (3953 <= code2 && code2 <= 3966) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 3981) {
                          if (code2 < 3968) {
                            if (3967 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 3974) {
                              if (3968 <= code2 && code2 <= 3972) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (3974 <= code2 && code2 <= 3975) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 3993) {
                            if (3981 <= code2 && code2 <= 3991) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 4038) {
                              if (3993 <= code2 && code2 <= 4028) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (4038 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 7204) {
                if (code2 < 6448) {
                  if (code2 < 5938) {
                    if (code2 < 4226) {
                      if (code2 < 4157) {
                        if (code2 < 4146) {
                          if (code2 < 4145) {
                            if (4141 <= code2 && code2 <= 4144) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (4145 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 4153) {
                            if (4146 <= code2 && code2 <= 4151) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 4155) {
                              if (4153 <= code2 && code2 <= 4154) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (4155 <= code2 && code2 <= 4156) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 4184) {
                          if (code2 < 4182) {
                            if (4157 <= code2 && code2 <= 4158) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (4182 <= code2 && code2 <= 4183) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 4190) {
                            if (4184 <= code2 && code2 <= 4185) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 4209) {
                              if (4190 <= code2 && code2 <= 4192) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (4209 <= code2 && code2 <= 4212) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 4352) {
                        if (code2 < 4229) {
                          if (4226 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                          if (4228 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                        } else {
                          if (code2 < 4237) {
                            if (4229 <= code2 && code2 <= 4230) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (4237 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (4253 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 4957) {
                          if (code2 < 4448) {
                            if (4352 <= code2 && code2 <= 4447) {
                              return boundaries_1.CLUSTER_BREAK.L;
                            }
                          } else {
                            if (code2 < 4520) {
                              if (4448 <= code2 && code2 <= 4519) {
                                return boundaries_1.CLUSTER_BREAK.V;
                              }
                            } else {
                              if (4520 <= code2 && code2 <= 4607) {
                                return boundaries_1.CLUSTER_BREAK.T;
                              }
                            }
                          }
                        } else {
                          if (code2 < 5906) {
                            if (4957 <= code2 && code2 <= 4959) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 5909) {
                              if (5906 <= code2 && code2 <= 5908) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (5909 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 6089) {
                      if (code2 < 6070) {
                        if (code2 < 5970) {
                          if (code2 < 5940) {
                            if (5938 <= code2 && code2 <= 5939) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (5940 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 6002) {
                            if (5970 <= code2 && code2 <= 5971) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 6068) {
                              if (6002 <= code2 && code2 <= 6003) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6068 <= code2 && code2 <= 6069) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 6078) {
                          if (code2 < 6071) {
                            if (6070 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (6071 <= code2 && code2 <= 6077) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 6086) {
                            if (6078 <= code2 && code2 <= 6085) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 6087) {
                              if (6086 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6087 <= code2 && code2 <= 6088) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 6277) {
                        if (code2 < 6155) {
                          if (code2 < 6109) {
                            if (6089 <= code2 && code2 <= 6099) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (6109 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 6158) {
                            if (6155 <= code2 && code2 <= 6157) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (6158 === code2) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                            if (6159 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 6435) {
                          if (code2 < 6313) {
                            if (6277 <= code2 && code2 <= 6278) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 6432) {
                              if (6313 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6432 <= code2 && code2 <= 6434) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 6439) {
                            if (6435 <= code2 && code2 <= 6438) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 6441) {
                              if (6439 <= code2 && code2 <= 6440) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6441 <= code2 && code2 <= 6443) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 6971) {
                    if (code2 < 6744) {
                      if (code2 < 6681) {
                        if (code2 < 6451) {
                          if (code2 < 6450) {
                            if (6448 <= code2 && code2 <= 6449) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (6450 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 6457) {
                            if (6451 <= code2 && code2 <= 6456) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 6679) {
                              if (6457 <= code2 && code2 <= 6459) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6679 <= code2 && code2 <= 6680) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 6741) {
                          if (code2 < 6683) {
                            if (6681 <= code2 && code2 <= 6682) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (6683 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 6742) {
                            if (6741 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (6742 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (6743 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 6771) {
                        if (code2 < 6754) {
                          if (code2 < 6752) {
                            if (6744 <= code2 && code2 <= 6750) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (6752 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 6757) {
                            if (6754 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 6765) {
                              if (6757 <= code2 && code2 <= 6764) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6765 <= code2 && code2 <= 6770) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 6912) {
                          if (code2 < 6783) {
                            if (6771 <= code2 && code2 <= 6780) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 6832) {
                              if (6783 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6832 <= code2 && code2 <= 6862) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 6916) {
                            if (6912 <= code2 && code2 <= 6915) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 6964) {
                              if (6916 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (6964 <= code2 && code2 <= 6970) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 7080) {
                      if (code2 < 7019) {
                        if (code2 < 6973) {
                          if (6971 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (6972 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 6978) {
                            if (6973 <= code2 && code2 <= 6977) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 6979) {
                              if (6978 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (6979 <= code2 && code2 <= 6980) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 7073) {
                          if (code2 < 7040) {
                            if (7019 <= code2 && code2 <= 7027) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 7042) {
                              if (7040 <= code2 && code2 <= 7041) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (7042 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 7074) {
                            if (7073 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 7078) {
                              if (7074 <= code2 && code2 <= 7077) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (7078 <= code2 && code2 <= 7079) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 7144) {
                        if (code2 < 7083) {
                          if (code2 < 7082) {
                            if (7080 <= code2 && code2 <= 7081) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (7082 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 7142) {
                            if (7083 <= code2 && code2 <= 7085) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (7142 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (7143 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      } else {
                        if (code2 < 7150) {
                          if (code2 < 7146) {
                            if (7144 <= code2 && code2 <= 7145) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 7149) {
                              if (7146 <= code2 && code2 <= 7148) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (7149 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 7151) {
                            if (7150 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 7154) {
                              if (7151 <= code2 && code2 <= 7153) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (7154 <= code2 && code2 <= 7155) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 43346) {
                  if (code2 < 11647) {
                    if (code2 < 7415) {
                      if (code2 < 7380) {
                        if (code2 < 7220) {
                          if (code2 < 7212) {
                            if (7204 <= code2 && code2 <= 7211) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (7212 <= code2 && code2 <= 7219) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 7222) {
                            if (7220 <= code2 && code2 <= 7221) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 7376) {
                              if (7222 <= code2 && code2 <= 7223) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (7376 <= code2 && code2 <= 7378) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 7394) {
                          if (code2 < 7393) {
                            if (7380 <= code2 && code2 <= 7392) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (7393 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 7405) {
                            if (7394 <= code2 && code2 <= 7400) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (7405 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (7412 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 8205) {
                        if (code2 < 7616) {
                          if (code2 < 7416) {
                            if (7415 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (7416 <= code2 && code2 <= 7417) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 8203) {
                            if (7616 <= code2 && code2 <= 7679) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (8203 === code2) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                            if (8204 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 8288) {
                          if (code2 < 8206) {
                            if (8205 === code2) {
                              return boundaries_1.CLUSTER_BREAK.ZWJ;
                            }
                          } else {
                            if (code2 < 8232) {
                              if (8206 <= code2 && code2 <= 8207) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            } else {
                              if (8232 <= code2 && code2 <= 8238) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            }
                          }
                        } else {
                          if (code2 < 8400) {
                            if (8288 <= code2 && code2 <= 8303) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (code2 < 11503) {
                              if (8400 <= code2 && code2 <= 8432) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (11503 <= code2 && code2 <= 11505) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 43043) {
                      if (code2 < 42612) {
                        if (code2 < 12330) {
                          if (code2 < 11744) {
                            if (11647 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (11744 <= code2 && code2 <= 11775) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 12441) {
                            if (12330 <= code2 && code2 <= 12335) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 42607) {
                              if (12441 <= code2 && code2 <= 12442) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (42607 <= code2 && code2 <= 42610) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 43010) {
                          if (code2 < 42654) {
                            if (42612 <= code2 && code2 <= 42621) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 42736) {
                              if (42654 <= code2 && code2 <= 42655) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (42736 <= code2 && code2 <= 42737) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 43014) {
                            if (43010 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43014 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (43019 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 43188) {
                        if (code2 < 43047) {
                          if (code2 < 43045) {
                            if (43043 <= code2 && code2 <= 43044) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (43045 <= code2 && code2 <= 43046) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 43052) {
                            if (43047 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 43136) {
                              if (43052 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (43136 <= code2 && code2 <= 43137) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 43263) {
                          if (code2 < 43204) {
                            if (43188 <= code2 && code2 <= 43203) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 43232) {
                              if (43204 <= code2 && code2 <= 43205) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (43232 <= code2 && code2 <= 43249) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 43302) {
                            if (43263 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 43335) {
                              if (43302 <= code2 && code2 <= 43309) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (43335 <= code2 && code2 <= 43345) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 43698) {
                    if (code2 < 43493) {
                      if (code2 < 43444) {
                        if (code2 < 43392) {
                          if (code2 < 43360) {
                            if (43346 <= code2 && code2 <= 43347) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (43360 <= code2 && code2 <= 43388) {
                              return boundaries_1.CLUSTER_BREAK.L;
                            }
                          }
                        } else {
                          if (code2 < 43395) {
                            if (43392 <= code2 && code2 <= 43394) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43395 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (43443 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 43450) {
                          if (code2 < 43446) {
                            if (43444 <= code2 && code2 <= 43445) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (43446 <= code2 && code2 <= 43449) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 43452) {
                            if (43450 <= code2 && code2 <= 43451) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 43454) {
                              if (43452 <= code2 && code2 <= 43453) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (43454 <= code2 && code2 <= 43456) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 43573) {
                        if (code2 < 43567) {
                          if (code2 < 43561) {
                            if (43493 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43561 <= code2 && code2 <= 43566) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 43569) {
                            if (43567 <= code2 && code2 <= 43568) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 43571) {
                              if (43569 <= code2 && code2 <= 43570) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (43571 <= code2 && code2 <= 43572) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 43597) {
                          if (code2 < 43587) {
                            if (43573 <= code2 && code2 <= 43574) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43587 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (43596 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 43644) {
                            if (43597 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (43644 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (43696 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 44006) {
                      if (code2 < 43756) {
                        if (code2 < 43710) {
                          if (code2 < 43703) {
                            if (43698 <= code2 && code2 <= 43700) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43703 <= code2 && code2 <= 43704) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 43713) {
                            if (43710 <= code2 && code2 <= 43711) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (43713 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (43755 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      } else {
                        if (code2 < 43766) {
                          if (code2 < 43758) {
                            if (43756 <= code2 && code2 <= 43757) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 43765) {
                              if (43758 <= code2 && code2 <= 43759) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (43765 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 44003) {
                            if (43766 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 44005) {
                              if (44003 <= code2 && code2 <= 44004) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (44005 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 44032) {
                        if (code2 < 44009) {
                          if (code2 < 44008) {
                            if (44006 <= code2 && code2 <= 44007) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (44008 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 44012) {
                            if (44009 <= code2 && code2 <= 44010) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (44012 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (44013 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 44061) {
                          if (code2 < 44033) {
                            if (44032 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44060) {
                              if (44033 <= code2 && code2 <= 44059) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44060 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 44088) {
                            if (44061 <= code2 && code2 <= 44087) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44089) {
                              if (44088 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44089 <= code2 && code2 <= 44115) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (code2 < 46497) {
              if (code2 < 45293) {
                if (code2 < 44704) {
                  if (code2 < 44397) {
                    if (code2 < 44256) {
                      if (code2 < 44173) {
                        if (code2 < 44144) {
                          if (code2 < 44117) {
                            if (44116 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (44117 <= code2 && code2 <= 44143) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 44145) {
                            if (44144 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44172) {
                              if (44145 <= code2 && code2 <= 44171) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44172 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44201) {
                          if (code2 < 44200) {
                            if (44173 <= code2 && code2 <= 44199) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (44200 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 44228) {
                            if (44201 <= code2 && code2 <= 44227) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44229) {
                              if (44228 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44229 <= code2 && code2 <= 44255) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 44313) {
                        if (code2 < 44284) {
                          if (code2 < 44257) {
                            if (44256 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (44257 <= code2 && code2 <= 44283) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 44285) {
                            if (44284 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44312) {
                              if (44285 <= code2 && code2 <= 44311) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44312 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44368) {
                          if (code2 < 44340) {
                            if (44313 <= code2 && code2 <= 44339) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44341) {
                              if (44340 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44341 <= code2 && code2 <= 44367) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 44369) {
                            if (44368 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44396) {
                              if (44369 <= code2 && code2 <= 44395) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44396 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 44537) {
                      if (code2 < 44480) {
                        if (code2 < 44425) {
                          if (code2 < 44424) {
                            if (44397 <= code2 && code2 <= 44423) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (44424 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 44452) {
                            if (44425 <= code2 && code2 <= 44451) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44453) {
                              if (44452 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44453 <= code2 && code2 <= 44479) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44508) {
                          if (code2 < 44481) {
                            if (44480 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (44481 <= code2 && code2 <= 44507) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 44509) {
                            if (44508 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44536) {
                              if (44509 <= code2 && code2 <= 44535) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44536 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 44620) {
                        if (code2 < 44565) {
                          if (code2 < 44564) {
                            if (44537 <= code2 && code2 <= 44563) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (44564 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 44592) {
                            if (44565 <= code2 && code2 <= 44591) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44593) {
                              if (44592 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44593 <= code2 && code2 <= 44619) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44649) {
                          if (code2 < 44621) {
                            if (44620 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44648) {
                              if (44621 <= code2 && code2 <= 44647) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44648 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 44676) {
                            if (44649 <= code2 && code2 <= 44675) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44677) {
                              if (44676 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44677 <= code2 && code2 <= 44703) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 44985) {
                    if (code2 < 44844) {
                      if (code2 < 44761) {
                        if (code2 < 44732) {
                          if (code2 < 44705) {
                            if (44704 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (44705 <= code2 && code2 <= 44731) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 44733) {
                            if (44732 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44760) {
                              if (44733 <= code2 && code2 <= 44759) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44760 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44789) {
                          if (code2 < 44788) {
                            if (44761 <= code2 && code2 <= 44787) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (44788 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 44816) {
                            if (44789 <= code2 && code2 <= 44815) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44817) {
                              if (44816 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44817 <= code2 && code2 <= 44843) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 44901) {
                        if (code2 < 44872) {
                          if (code2 < 44845) {
                            if (44844 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (44845 <= code2 && code2 <= 44871) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 44873) {
                            if (44872 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44900) {
                              if (44873 <= code2 && code2 <= 44899) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44900 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 44956) {
                          if (code2 < 44928) {
                            if (44901 <= code2 && code2 <= 44927) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 44929) {
                              if (44928 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (44929 <= code2 && code2 <= 44955) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 44957) {
                            if (44956 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 44984) {
                              if (44957 <= code2 && code2 <= 44983) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (44984 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 45152) {
                      if (code2 < 45068) {
                        if (code2 < 45013) {
                          if (code2 < 45012) {
                            if (44985 <= code2 && code2 <= 45011) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (45012 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 45040) {
                            if (45013 <= code2 && code2 <= 45039) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45041) {
                              if (45040 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45041 <= code2 && code2 <= 45067) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45097) {
                          if (code2 < 45069) {
                            if (45068 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45096) {
                              if (45069 <= code2 && code2 <= 45095) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45096 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 45124) {
                            if (45097 <= code2 && code2 <= 45123) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45125) {
                              if (45124 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45125 <= code2 && code2 <= 45151) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 45209) {
                        if (code2 < 45180) {
                          if (code2 < 45153) {
                            if (45152 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (45153 <= code2 && code2 <= 45179) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 45181) {
                            if (45180 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45208) {
                              if (45181 <= code2 && code2 <= 45207) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45208 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45264) {
                          if (code2 < 45236) {
                            if (45209 <= code2 && code2 <= 45235) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45237) {
                              if (45236 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45237 <= code2 && code2 <= 45263) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 45265) {
                            if (45264 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45292) {
                              if (45265 <= code2 && code2 <= 45291) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45292 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 45908) {
                  if (code2 < 45600) {
                    if (code2 < 45433) {
                      if (code2 < 45376) {
                        if (code2 < 45321) {
                          if (code2 < 45320) {
                            if (45293 <= code2 && code2 <= 45319) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (45320 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 45348) {
                            if (45321 <= code2 && code2 <= 45347) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45349) {
                              if (45348 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45349 <= code2 && code2 <= 45375) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45404) {
                          if (code2 < 45377) {
                            if (45376 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (45377 <= code2 && code2 <= 45403) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 45405) {
                            if (45404 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45432) {
                              if (45405 <= code2 && code2 <= 45431) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45432 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 45516) {
                        if (code2 < 45461) {
                          if (code2 < 45460) {
                            if (45433 <= code2 && code2 <= 45459) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (45460 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 45488) {
                            if (45461 <= code2 && code2 <= 45487) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45489) {
                              if (45488 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45489 <= code2 && code2 <= 45515) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45545) {
                          if (code2 < 45517) {
                            if (45516 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45544) {
                              if (45517 <= code2 && code2 <= 45543) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45544 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 45572) {
                            if (45545 <= code2 && code2 <= 45571) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45573) {
                              if (45572 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45573 <= code2 && code2 <= 45599) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 45741) {
                      if (code2 < 45657) {
                        if (code2 < 45628) {
                          if (code2 < 45601) {
                            if (45600 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (45601 <= code2 && code2 <= 45627) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 45629) {
                            if (45628 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45656) {
                              if (45629 <= code2 && code2 <= 45655) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45656 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45712) {
                          if (code2 < 45684) {
                            if (45657 <= code2 && code2 <= 45683) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45685) {
                              if (45684 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45685 <= code2 && code2 <= 45711) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 45713) {
                            if (45712 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45740) {
                              if (45713 <= code2 && code2 <= 45739) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45740 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 45824) {
                        if (code2 < 45769) {
                          if (code2 < 45768) {
                            if (45741 <= code2 && code2 <= 45767) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (45768 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 45796) {
                            if (45769 <= code2 && code2 <= 45795) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45797) {
                              if (45796 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45797 <= code2 && code2 <= 45823) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45853) {
                          if (code2 < 45825) {
                            if (45824 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45852) {
                              if (45825 <= code2 && code2 <= 45851) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45852 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 45880) {
                            if (45853 <= code2 && code2 <= 45879) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 45881) {
                              if (45880 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (45881 <= code2 && code2 <= 45907) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 46189) {
                    if (code2 < 46048) {
                      if (code2 < 45965) {
                        if (code2 < 45936) {
                          if (code2 < 45909) {
                            if (45908 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (45909 <= code2 && code2 <= 45935) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 45937) {
                            if (45936 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 45964) {
                              if (45937 <= code2 && code2 <= 45963) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (45964 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 45993) {
                          if (code2 < 45992) {
                            if (45965 <= code2 && code2 <= 45991) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (45992 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 46020) {
                            if (45993 <= code2 && code2 <= 46019) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46021) {
                              if (46020 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46021 <= code2 && code2 <= 46047) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 46105) {
                        if (code2 < 46076) {
                          if (code2 < 46049) {
                            if (46048 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (46049 <= code2 && code2 <= 46075) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 46077) {
                            if (46076 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46104) {
                              if (46077 <= code2 && code2 <= 46103) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46104 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46160) {
                          if (code2 < 46132) {
                            if (46105 <= code2 && code2 <= 46131) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46133) {
                              if (46132 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46133 <= code2 && code2 <= 46159) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 46161) {
                            if (46160 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46188) {
                              if (46161 <= code2 && code2 <= 46187) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46188 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 46356) {
                      if (code2 < 46272) {
                        if (code2 < 46217) {
                          if (code2 < 46216) {
                            if (46189 <= code2 && code2 <= 46215) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (46216 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 46244) {
                            if (46217 <= code2 && code2 <= 46243) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46245) {
                              if (46244 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46245 <= code2 && code2 <= 46271) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46301) {
                          if (code2 < 46273) {
                            if (46272 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46300) {
                              if (46273 <= code2 && code2 <= 46299) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46300 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 46328) {
                            if (46301 <= code2 && code2 <= 46327) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46329) {
                              if (46328 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46329 <= code2 && code2 <= 46355) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 46413) {
                        if (code2 < 46384) {
                          if (code2 < 46357) {
                            if (46356 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (46357 <= code2 && code2 <= 46383) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 46385) {
                            if (46384 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46412) {
                              if (46385 <= code2 && code2 <= 46411) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46412 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46468) {
                          if (code2 < 46440) {
                            if (46413 <= code2 && code2 <= 46439) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46441) {
                              if (46440 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46441 <= code2 && code2 <= 46467) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 46469) {
                            if (46468 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46496) {
                              if (46469 <= code2 && code2 <= 46495) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46496 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 47701) {
                if (code2 < 47112) {
                  if (code2 < 46804) {
                    if (code2 < 46637) {
                      if (code2 < 46580) {
                        if (code2 < 46525) {
                          if (code2 < 46524) {
                            if (46497 <= code2 && code2 <= 46523) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (46524 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 46552) {
                            if (46525 <= code2 && code2 <= 46551) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46553) {
                              if (46552 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46553 <= code2 && code2 <= 46579) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46608) {
                          if (code2 < 46581) {
                            if (46580 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (46581 <= code2 && code2 <= 46607) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 46609) {
                            if (46608 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46636) {
                              if (46609 <= code2 && code2 <= 46635) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46636 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 46720) {
                        if (code2 < 46665) {
                          if (code2 < 46664) {
                            if (46637 <= code2 && code2 <= 46663) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (46664 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 46692) {
                            if (46665 <= code2 && code2 <= 46691) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46693) {
                              if (46692 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46693 <= code2 && code2 <= 46719) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46749) {
                          if (code2 < 46721) {
                            if (46720 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46748) {
                              if (46721 <= code2 && code2 <= 46747) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46748 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 46776) {
                            if (46749 <= code2 && code2 <= 46775) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46777) {
                              if (46776 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46777 <= code2 && code2 <= 46803) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 46945) {
                      if (code2 < 46861) {
                        if (code2 < 46832) {
                          if (code2 < 46805) {
                            if (46804 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (46805 <= code2 && code2 <= 46831) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 46833) {
                            if (46832 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46860) {
                              if (46833 <= code2 && code2 <= 46859) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46860 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 46916) {
                          if (code2 < 46888) {
                            if (46861 <= code2 && code2 <= 46887) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 46889) {
                              if (46888 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (46889 <= code2 && code2 <= 46915) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 46917) {
                            if (46916 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 46944) {
                              if (46917 <= code2 && code2 <= 46943) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (46944 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 47028) {
                        if (code2 < 46973) {
                          if (code2 < 46972) {
                            if (46945 <= code2 && code2 <= 46971) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (46972 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 47e3) {
                            if (46973 <= code2 && code2 <= 46999) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47001) {
                              if (47e3 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47001 <= code2 && code2 <= 47027) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47057) {
                          if (code2 < 47029) {
                            if (47028 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47056) {
                              if (47029 <= code2 && code2 <= 47055) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47056 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 47084) {
                            if (47057 <= code2 && code2 <= 47083) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47085) {
                              if (47084 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47085 <= code2 && code2 <= 47111) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 47393) {
                    if (code2 < 47252) {
                      if (code2 < 47169) {
                        if (code2 < 47140) {
                          if (code2 < 47113) {
                            if (47112 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (47113 <= code2 && code2 <= 47139) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 47141) {
                            if (47140 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47168) {
                              if (47141 <= code2 && code2 <= 47167) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47168 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47197) {
                          if (code2 < 47196) {
                            if (47169 <= code2 && code2 <= 47195) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (47196 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 47224) {
                            if (47197 <= code2 && code2 <= 47223) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47225) {
                              if (47224 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47225 <= code2 && code2 <= 47251) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 47309) {
                        if (code2 < 47280) {
                          if (code2 < 47253) {
                            if (47252 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (47253 <= code2 && code2 <= 47279) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 47281) {
                            if (47280 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47308) {
                              if (47281 <= code2 && code2 <= 47307) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47308 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47364) {
                          if (code2 < 47336) {
                            if (47309 <= code2 && code2 <= 47335) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47337) {
                              if (47336 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47337 <= code2 && code2 <= 47363) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 47365) {
                            if (47364 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47392) {
                              if (47365 <= code2 && code2 <= 47391) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47392 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 47560) {
                      if (code2 < 47476) {
                        if (code2 < 47421) {
                          if (code2 < 47420) {
                            if (47393 <= code2 && code2 <= 47419) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (47420 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 47448) {
                            if (47421 <= code2 && code2 <= 47447) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47449) {
                              if (47448 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47449 <= code2 && code2 <= 47475) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47505) {
                          if (code2 < 47477) {
                            if (47476 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47504) {
                              if (47477 <= code2 && code2 <= 47503) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47504 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 47532) {
                            if (47505 <= code2 && code2 <= 47531) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47533) {
                              if (47532 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47533 <= code2 && code2 <= 47559) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 47617) {
                        if (code2 < 47588) {
                          if (code2 < 47561) {
                            if (47560 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (47561 <= code2 && code2 <= 47587) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 47589) {
                            if (47588 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47616) {
                              if (47589 <= code2 && code2 <= 47615) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47616 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47672) {
                          if (code2 < 47644) {
                            if (47617 <= code2 && code2 <= 47643) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47645) {
                              if (47644 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47645 <= code2 && code2 <= 47671) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 47673) {
                            if (47672 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47700) {
                              if (47673 <= code2 && code2 <= 47699) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47700 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 48316) {
                  if (code2 < 48008) {
                    if (code2 < 47841) {
                      if (code2 < 47784) {
                        if (code2 < 47729) {
                          if (code2 < 47728) {
                            if (47701 <= code2 && code2 <= 47727) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (47728 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 47756) {
                            if (47729 <= code2 && code2 <= 47755) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47757) {
                              if (47756 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47757 <= code2 && code2 <= 47783) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47812) {
                          if (code2 < 47785) {
                            if (47784 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (47785 <= code2 && code2 <= 47811) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 47813) {
                            if (47812 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47840) {
                              if (47813 <= code2 && code2 <= 47839) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47840 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 47924) {
                        if (code2 < 47869) {
                          if (code2 < 47868) {
                            if (47841 <= code2 && code2 <= 47867) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (47868 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 47896) {
                            if (47869 <= code2 && code2 <= 47895) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47897) {
                              if (47896 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47897 <= code2 && code2 <= 47923) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 47953) {
                          if (code2 < 47925) {
                            if (47924 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 47952) {
                              if (47925 <= code2 && code2 <= 47951) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (47952 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 47980) {
                            if (47953 <= code2 && code2 <= 47979) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 47981) {
                              if (47980 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (47981 <= code2 && code2 <= 48007) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 48149) {
                      if (code2 < 48065) {
                        if (code2 < 48036) {
                          if (code2 < 48009) {
                            if (48008 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (48009 <= code2 && code2 <= 48035) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 48037) {
                            if (48036 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48064) {
                              if (48037 <= code2 && code2 <= 48063) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48064 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48120) {
                          if (code2 < 48092) {
                            if (48065 <= code2 && code2 <= 48091) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48093) {
                              if (48092 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48093 <= code2 && code2 <= 48119) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 48121) {
                            if (48120 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48148) {
                              if (48121 <= code2 && code2 <= 48147) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48148 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 48232) {
                        if (code2 < 48177) {
                          if (code2 < 48176) {
                            if (48149 <= code2 && code2 <= 48175) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (48176 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 48204) {
                            if (48177 <= code2 && code2 <= 48203) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48205) {
                              if (48204 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48205 <= code2 && code2 <= 48231) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48261) {
                          if (code2 < 48233) {
                            if (48232 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48260) {
                              if (48233 <= code2 && code2 <= 48259) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48260 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 48288) {
                            if (48261 <= code2 && code2 <= 48287) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48289) {
                              if (48288 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48289 <= code2 && code2 <= 48315) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 48597) {
                    if (code2 < 48456) {
                      if (code2 < 48373) {
                        if (code2 < 48344) {
                          if (code2 < 48317) {
                            if (48316 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (48317 <= code2 && code2 <= 48343) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 48345) {
                            if (48344 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48372) {
                              if (48345 <= code2 && code2 <= 48371) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48372 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48401) {
                          if (code2 < 48400) {
                            if (48373 <= code2 && code2 <= 48399) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (48400 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 48428) {
                            if (48401 <= code2 && code2 <= 48427) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48429) {
                              if (48428 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48429 <= code2 && code2 <= 48455) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 48513) {
                        if (code2 < 48484) {
                          if (code2 < 48457) {
                            if (48456 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (48457 <= code2 && code2 <= 48483) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 48485) {
                            if (48484 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48512) {
                              if (48485 <= code2 && code2 <= 48511) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48512 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48568) {
                          if (code2 < 48540) {
                            if (48513 <= code2 && code2 <= 48539) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48541) {
                              if (48540 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48541 <= code2 && code2 <= 48567) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 48569) {
                            if (48568 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48596) {
                              if (48569 <= code2 && code2 <= 48595) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48596 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 48764) {
                      if (code2 < 48680) {
                        if (code2 < 48625) {
                          if (code2 < 48624) {
                            if (48597 <= code2 && code2 <= 48623) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (48624 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 48652) {
                            if (48625 <= code2 && code2 <= 48651) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48653) {
                              if (48652 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48653 <= code2 && code2 <= 48679) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48709) {
                          if (code2 < 48681) {
                            if (48680 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48708) {
                              if (48681 <= code2 && code2 <= 48707) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48708 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 48736) {
                            if (48709 <= code2 && code2 <= 48735) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48737) {
                              if (48736 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48737 <= code2 && code2 <= 48763) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 48821) {
                        if (code2 < 48792) {
                          if (code2 < 48765) {
                            if (48764 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (48765 <= code2 && code2 <= 48791) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 48793) {
                            if (48792 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48820) {
                              if (48793 <= code2 && code2 <= 48819) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48820 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 48876) {
                          if (code2 < 48848) {
                            if (48821 <= code2 && code2 <= 48847) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48849) {
                              if (48848 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48849 <= code2 && code2 <= 48875) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 48877) {
                            if (48876 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 48904) {
                              if (48877 <= code2 && code2 <= 48903) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (48904 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (code2 < 53720) {
            if (code2 < 51312) {
              if (code2 < 50108) {
                if (code2 < 49493) {
                  if (code2 < 49212) {
                    if (code2 < 49045) {
                      if (code2 < 48988) {
                        if (code2 < 48933) {
                          if (code2 < 48932) {
                            if (48905 <= code2 && code2 <= 48931) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (48932 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 48960) {
                            if (48933 <= code2 && code2 <= 48959) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 48961) {
                              if (48960 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (48961 <= code2 && code2 <= 48987) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49016) {
                          if (code2 < 48989) {
                            if (48988 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (48989 <= code2 && code2 <= 49015) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 49017) {
                            if (49016 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49044) {
                              if (49017 <= code2 && code2 <= 49043) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49044 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 49128) {
                        if (code2 < 49073) {
                          if (code2 < 49072) {
                            if (49045 <= code2 && code2 <= 49071) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (49072 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 49100) {
                            if (49073 <= code2 && code2 <= 49099) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49101) {
                              if (49100 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49101 <= code2 && code2 <= 49127) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49157) {
                          if (code2 < 49129) {
                            if (49128 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49156) {
                              if (49129 <= code2 && code2 <= 49155) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49156 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 49184) {
                            if (49157 <= code2 && code2 <= 49183) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49185) {
                              if (49184 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49185 <= code2 && code2 <= 49211) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 49352) {
                      if (code2 < 49269) {
                        if (code2 < 49240) {
                          if (code2 < 49213) {
                            if (49212 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (49213 <= code2 && code2 <= 49239) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 49241) {
                            if (49240 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49268) {
                              if (49241 <= code2 && code2 <= 49267) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49268 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49297) {
                          if (code2 < 49296) {
                            if (49269 <= code2 && code2 <= 49295) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (49296 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 49324) {
                            if (49297 <= code2 && code2 <= 49323) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49325) {
                              if (49324 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49325 <= code2 && code2 <= 49351) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 49409) {
                        if (code2 < 49380) {
                          if (code2 < 49353) {
                            if (49352 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (49353 <= code2 && code2 <= 49379) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 49381) {
                            if (49380 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49408) {
                              if (49381 <= code2 && code2 <= 49407) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49408 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49464) {
                          if (code2 < 49436) {
                            if (49409 <= code2 && code2 <= 49435) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49437) {
                              if (49436 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49437 <= code2 && code2 <= 49463) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 49465) {
                            if (49464 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49492) {
                              if (49465 <= code2 && code2 <= 49491) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49492 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 49800) {
                    if (code2 < 49633) {
                      if (code2 < 49576) {
                        if (code2 < 49521) {
                          if (code2 < 49520) {
                            if (49493 <= code2 && code2 <= 49519) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (49520 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 49548) {
                            if (49521 <= code2 && code2 <= 49547) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49549) {
                              if (49548 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49549 <= code2 && code2 <= 49575) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49604) {
                          if (code2 < 49577) {
                            if (49576 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (49577 <= code2 && code2 <= 49603) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 49605) {
                            if (49604 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49632) {
                              if (49605 <= code2 && code2 <= 49631) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49632 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 49716) {
                        if (code2 < 49661) {
                          if (code2 < 49660) {
                            if (49633 <= code2 && code2 <= 49659) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (49660 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 49688) {
                            if (49661 <= code2 && code2 <= 49687) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49689) {
                              if (49688 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49689 <= code2 && code2 <= 49715) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49745) {
                          if (code2 < 49717) {
                            if (49716 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49744) {
                              if (49717 <= code2 && code2 <= 49743) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49744 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 49772) {
                            if (49745 <= code2 && code2 <= 49771) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49773) {
                              if (49772 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49773 <= code2 && code2 <= 49799) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 49941) {
                      if (code2 < 49857) {
                        if (code2 < 49828) {
                          if (code2 < 49801) {
                            if (49800 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (49801 <= code2 && code2 <= 49827) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 49829) {
                            if (49828 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49856) {
                              if (49829 <= code2 && code2 <= 49855) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49856 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 49912) {
                          if (code2 < 49884) {
                            if (49857 <= code2 && code2 <= 49883) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49885) {
                              if (49884 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49885 <= code2 && code2 <= 49911) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 49913) {
                            if (49912 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 49940) {
                              if (49913 <= code2 && code2 <= 49939) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (49940 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 50024) {
                        if (code2 < 49969) {
                          if (code2 < 49968) {
                            if (49941 <= code2 && code2 <= 49967) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (49968 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 49996) {
                            if (49969 <= code2 && code2 <= 49995) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 49997) {
                              if (49996 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (49997 <= code2 && code2 <= 50023) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50053) {
                          if (code2 < 50025) {
                            if (50024 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50052) {
                              if (50025 <= code2 && code2 <= 50051) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50052 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 50080) {
                            if (50053 <= code2 && code2 <= 50079) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50081) {
                              if (50080 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50081 <= code2 && code2 <= 50107) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 50697) {
                  if (code2 < 50389) {
                    if (code2 < 50248) {
                      if (code2 < 50165) {
                        if (code2 < 50136) {
                          if (code2 < 50109) {
                            if (50108 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (50109 <= code2 && code2 <= 50135) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 50137) {
                            if (50136 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50164) {
                              if (50137 <= code2 && code2 <= 50163) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50164 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50193) {
                          if (code2 < 50192) {
                            if (50165 <= code2 && code2 <= 50191) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (50192 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 50220) {
                            if (50193 <= code2 && code2 <= 50219) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50221) {
                              if (50220 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50221 <= code2 && code2 <= 50247) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 50305) {
                        if (code2 < 50276) {
                          if (code2 < 50249) {
                            if (50248 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (50249 <= code2 && code2 <= 50275) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 50277) {
                            if (50276 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50304) {
                              if (50277 <= code2 && code2 <= 50303) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50304 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50360) {
                          if (code2 < 50332) {
                            if (50305 <= code2 && code2 <= 50331) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50333) {
                              if (50332 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50333 <= code2 && code2 <= 50359) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 50361) {
                            if (50360 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50388) {
                              if (50361 <= code2 && code2 <= 50387) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50388 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 50556) {
                      if (code2 < 50472) {
                        if (code2 < 50417) {
                          if (code2 < 50416) {
                            if (50389 <= code2 && code2 <= 50415) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (50416 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 50444) {
                            if (50417 <= code2 && code2 <= 50443) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50445) {
                              if (50444 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50445 <= code2 && code2 <= 50471) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50501) {
                          if (code2 < 50473) {
                            if (50472 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50500) {
                              if (50473 <= code2 && code2 <= 50499) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50500 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 50528) {
                            if (50501 <= code2 && code2 <= 50527) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50529) {
                              if (50528 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50529 <= code2 && code2 <= 50555) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 50613) {
                        if (code2 < 50584) {
                          if (code2 < 50557) {
                            if (50556 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (50557 <= code2 && code2 <= 50583) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 50585) {
                            if (50584 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50612) {
                              if (50585 <= code2 && code2 <= 50611) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50612 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50668) {
                          if (code2 < 50640) {
                            if (50613 <= code2 && code2 <= 50639) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50641) {
                              if (50640 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50641 <= code2 && code2 <= 50667) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 50669) {
                            if (50668 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50696) {
                              if (50669 <= code2 && code2 <= 50695) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50696 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 51004) {
                    if (code2 < 50837) {
                      if (code2 < 50780) {
                        if (code2 < 50725) {
                          if (code2 < 50724) {
                            if (50697 <= code2 && code2 <= 50723) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (50724 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 50752) {
                            if (50725 <= code2 && code2 <= 50751) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50753) {
                              if (50752 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50753 <= code2 && code2 <= 50779) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50808) {
                          if (code2 < 50781) {
                            if (50780 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (50781 <= code2 && code2 <= 50807) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 50809) {
                            if (50808 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50836) {
                              if (50809 <= code2 && code2 <= 50835) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50836 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 50920) {
                        if (code2 < 50865) {
                          if (code2 < 50864) {
                            if (50837 <= code2 && code2 <= 50863) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (50864 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 50892) {
                            if (50865 <= code2 && code2 <= 50891) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50893) {
                              if (50892 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50893 <= code2 && code2 <= 50919) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 50949) {
                          if (code2 < 50921) {
                            if (50920 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 50948) {
                              if (50921 <= code2 && code2 <= 50947) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (50948 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 50976) {
                            if (50949 <= code2 && code2 <= 50975) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 50977) {
                              if (50976 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (50977 <= code2 && code2 <= 51003) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 51145) {
                      if (code2 < 51061) {
                        if (code2 < 51032) {
                          if (code2 < 51005) {
                            if (51004 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (51005 <= code2 && code2 <= 51031) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 51033) {
                            if (51032 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51060) {
                              if (51033 <= code2 && code2 <= 51059) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51060 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51116) {
                          if (code2 < 51088) {
                            if (51061 <= code2 && code2 <= 51087) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51089) {
                              if (51088 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51089 <= code2 && code2 <= 51115) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 51117) {
                            if (51116 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51144) {
                              if (51117 <= code2 && code2 <= 51143) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51144 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 51228) {
                        if (code2 < 51173) {
                          if (code2 < 51172) {
                            if (51145 <= code2 && code2 <= 51171) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (51172 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 51200) {
                            if (51173 <= code2 && code2 <= 51199) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51201) {
                              if (51200 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51201 <= code2 && code2 <= 51227) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51257) {
                          if (code2 < 51229) {
                            if (51228 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51256) {
                              if (51229 <= code2 && code2 <= 51255) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51256 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 51284) {
                            if (51257 <= code2 && code2 <= 51283) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51285) {
                              if (51284 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51285 <= code2 && code2 <= 51311) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 52516) {
                if (code2 < 51901) {
                  if (code2 < 51593) {
                    if (code2 < 51452) {
                      if (code2 < 51369) {
                        if (code2 < 51340) {
                          if (code2 < 51313) {
                            if (51312 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (51313 <= code2 && code2 <= 51339) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 51341) {
                            if (51340 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51368) {
                              if (51341 <= code2 && code2 <= 51367) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51368 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51397) {
                          if (code2 < 51396) {
                            if (51369 <= code2 && code2 <= 51395) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (51396 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 51424) {
                            if (51397 <= code2 && code2 <= 51423) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51425) {
                              if (51424 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51425 <= code2 && code2 <= 51451) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 51509) {
                        if (code2 < 51480) {
                          if (code2 < 51453) {
                            if (51452 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (51453 <= code2 && code2 <= 51479) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 51481) {
                            if (51480 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51508) {
                              if (51481 <= code2 && code2 <= 51507) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51508 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51564) {
                          if (code2 < 51536) {
                            if (51509 <= code2 && code2 <= 51535) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51537) {
                              if (51536 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51537 <= code2 && code2 <= 51563) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 51565) {
                            if (51564 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51592) {
                              if (51565 <= code2 && code2 <= 51591) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51592 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 51760) {
                      if (code2 < 51676) {
                        if (code2 < 51621) {
                          if (code2 < 51620) {
                            if (51593 <= code2 && code2 <= 51619) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (51620 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 51648) {
                            if (51621 <= code2 && code2 <= 51647) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51649) {
                              if (51648 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51649 <= code2 && code2 <= 51675) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51705) {
                          if (code2 < 51677) {
                            if (51676 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51704) {
                              if (51677 <= code2 && code2 <= 51703) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51704 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 51732) {
                            if (51705 <= code2 && code2 <= 51731) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51733) {
                              if (51732 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51733 <= code2 && code2 <= 51759) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 51817) {
                        if (code2 < 51788) {
                          if (code2 < 51761) {
                            if (51760 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (51761 <= code2 && code2 <= 51787) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 51789) {
                            if (51788 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51816) {
                              if (51789 <= code2 && code2 <= 51815) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51816 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 51872) {
                          if (code2 < 51844) {
                            if (51817 <= code2 && code2 <= 51843) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51845) {
                              if (51844 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51845 <= code2 && code2 <= 51871) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 51873) {
                            if (51872 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 51900) {
                              if (51873 <= code2 && code2 <= 51899) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (51900 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 52208) {
                    if (code2 < 52041) {
                      if (code2 < 51984) {
                        if (code2 < 51929) {
                          if (code2 < 51928) {
                            if (51901 <= code2 && code2 <= 51927) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (51928 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 51956) {
                            if (51929 <= code2 && code2 <= 51955) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 51957) {
                              if (51956 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (51957 <= code2 && code2 <= 51983) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52012) {
                          if (code2 < 51985) {
                            if (51984 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (51985 <= code2 && code2 <= 52011) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 52013) {
                            if (52012 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52040) {
                              if (52013 <= code2 && code2 <= 52039) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52040 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 52124) {
                        if (code2 < 52069) {
                          if (code2 < 52068) {
                            if (52041 <= code2 && code2 <= 52067) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (52068 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 52096) {
                            if (52069 <= code2 && code2 <= 52095) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52097) {
                              if (52096 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52097 <= code2 && code2 <= 52123) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52153) {
                          if (code2 < 52125) {
                            if (52124 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52152) {
                              if (52125 <= code2 && code2 <= 52151) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52152 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 52180) {
                            if (52153 <= code2 && code2 <= 52179) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52181) {
                              if (52180 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52181 <= code2 && code2 <= 52207) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 52349) {
                      if (code2 < 52265) {
                        if (code2 < 52236) {
                          if (code2 < 52209) {
                            if (52208 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (52209 <= code2 && code2 <= 52235) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 52237) {
                            if (52236 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52264) {
                              if (52237 <= code2 && code2 <= 52263) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52264 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52320) {
                          if (code2 < 52292) {
                            if (52265 <= code2 && code2 <= 52291) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52293) {
                              if (52292 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52293 <= code2 && code2 <= 52319) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 52321) {
                            if (52320 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52348) {
                              if (52321 <= code2 && code2 <= 52347) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52348 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 52432) {
                        if (code2 < 52377) {
                          if (code2 < 52376) {
                            if (52349 <= code2 && code2 <= 52375) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (52376 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 52404) {
                            if (52377 <= code2 && code2 <= 52403) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52405) {
                              if (52404 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52405 <= code2 && code2 <= 52431) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52461) {
                          if (code2 < 52433) {
                            if (52432 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52460) {
                              if (52433 <= code2 && code2 <= 52459) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52460 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 52488) {
                            if (52461 <= code2 && code2 <= 52487) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52489) {
                              if (52488 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52489 <= code2 && code2 <= 52515) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 53105) {
                  if (code2 < 52797) {
                    if (code2 < 52656) {
                      if (code2 < 52573) {
                        if (code2 < 52544) {
                          if (code2 < 52517) {
                            if (52516 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (52517 <= code2 && code2 <= 52543) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 52545) {
                            if (52544 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52572) {
                              if (52545 <= code2 && code2 <= 52571) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52572 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52601) {
                          if (code2 < 52600) {
                            if (52573 <= code2 && code2 <= 52599) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (52600 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 52628) {
                            if (52601 <= code2 && code2 <= 52627) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52629) {
                              if (52628 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52629 <= code2 && code2 <= 52655) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 52713) {
                        if (code2 < 52684) {
                          if (code2 < 52657) {
                            if (52656 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (52657 <= code2 && code2 <= 52683) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 52685) {
                            if (52684 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52712) {
                              if (52685 <= code2 && code2 <= 52711) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52712 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52768) {
                          if (code2 < 52740) {
                            if (52713 <= code2 && code2 <= 52739) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52741) {
                              if (52740 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52741 <= code2 && code2 <= 52767) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 52769) {
                            if (52768 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52796) {
                              if (52769 <= code2 && code2 <= 52795) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52796 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 52964) {
                      if (code2 < 52880) {
                        if (code2 < 52825) {
                          if (code2 < 52824) {
                            if (52797 <= code2 && code2 <= 52823) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (52824 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 52852) {
                            if (52825 <= code2 && code2 <= 52851) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52853) {
                              if (52852 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52853 <= code2 && code2 <= 52879) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 52909) {
                          if (code2 < 52881) {
                            if (52880 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 52908) {
                              if (52881 <= code2 && code2 <= 52907) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (52908 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 52936) {
                            if (52909 <= code2 && code2 <= 52935) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 52937) {
                              if (52936 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (52937 <= code2 && code2 <= 52963) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 53021) {
                        if (code2 < 52992) {
                          if (code2 < 52965) {
                            if (52964 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (52965 <= code2 && code2 <= 52991) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 52993) {
                            if (52992 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53020) {
                              if (52993 <= code2 && code2 <= 53019) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53020 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53076) {
                          if (code2 < 53048) {
                            if (53021 <= code2 && code2 <= 53047) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53049) {
                              if (53048 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53049 <= code2 && code2 <= 53075) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 53077) {
                            if (53076 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53104) {
                              if (53077 <= code2 && code2 <= 53103) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53104 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 53412) {
                    if (code2 < 53245) {
                      if (code2 < 53188) {
                        if (code2 < 53133) {
                          if (code2 < 53132) {
                            if (53105 <= code2 && code2 <= 53131) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (53132 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 53160) {
                            if (53133 <= code2 && code2 <= 53159) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53161) {
                              if (53160 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53161 <= code2 && code2 <= 53187) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53216) {
                          if (code2 < 53189) {
                            if (53188 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (53189 <= code2 && code2 <= 53215) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 53217) {
                            if (53216 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53244) {
                              if (53217 <= code2 && code2 <= 53243) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53244 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 53328) {
                        if (code2 < 53273) {
                          if (code2 < 53272) {
                            if (53245 <= code2 && code2 <= 53271) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (53272 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 53300) {
                            if (53273 <= code2 && code2 <= 53299) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53301) {
                              if (53300 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53301 <= code2 && code2 <= 53327) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53357) {
                          if (code2 < 53329) {
                            if (53328 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53356) {
                              if (53329 <= code2 && code2 <= 53355) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53356 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 53384) {
                            if (53357 <= code2 && code2 <= 53383) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53385) {
                              if (53384 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53385 <= code2 && code2 <= 53411) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 53553) {
                      if (code2 < 53469) {
                        if (code2 < 53440) {
                          if (code2 < 53413) {
                            if (53412 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (53413 <= code2 && code2 <= 53439) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 53441) {
                            if (53440 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53468) {
                              if (53441 <= code2 && code2 <= 53467) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53468 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53524) {
                          if (code2 < 53496) {
                            if (53469 <= code2 && code2 <= 53495) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53497) {
                              if (53496 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53497 <= code2 && code2 <= 53523) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 53525) {
                            if (53524 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53552) {
                              if (53525 <= code2 && code2 <= 53551) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53552 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 53636) {
                        if (code2 < 53581) {
                          if (code2 < 53580) {
                            if (53553 <= code2 && code2 <= 53579) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (53580 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 53608) {
                            if (53581 <= code2 && code2 <= 53607) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53609) {
                              if (53608 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53609 <= code2 && code2 <= 53635) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53665) {
                          if (code2 < 53637) {
                            if (53636 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53664) {
                              if (53637 <= code2 && code2 <= 53663) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53664 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 53692) {
                            if (53665 <= code2 && code2 <= 53691) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53693) {
                              if (53692 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53693 <= code2 && code2 <= 53719) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (code2 < 70459) {
              if (code2 < 54897) {
                if (code2 < 54308) {
                  if (code2 < 54001) {
                    if (code2 < 53860) {
                      if (code2 < 53777) {
                        if (code2 < 53748) {
                          if (code2 < 53721) {
                            if (53720 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (53721 <= code2 && code2 <= 53747) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 53749) {
                            if (53748 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53776) {
                              if (53749 <= code2 && code2 <= 53775) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53776 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53805) {
                          if (code2 < 53804) {
                            if (53777 <= code2 && code2 <= 53803) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (53804 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 53832) {
                            if (53805 <= code2 && code2 <= 53831) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53833) {
                              if (53832 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53833 <= code2 && code2 <= 53859) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 53917) {
                        if (code2 < 53888) {
                          if (code2 < 53861) {
                            if (53860 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (53861 <= code2 && code2 <= 53887) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 53889) {
                            if (53888 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 53916) {
                              if (53889 <= code2 && code2 <= 53915) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (53916 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 53972) {
                          if (code2 < 53944) {
                            if (53917 <= code2 && code2 <= 53943) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 53945) {
                              if (53944 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (53945 <= code2 && code2 <= 53971) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 53973) {
                            if (53972 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54e3) {
                              if (53973 <= code2 && code2 <= 53999) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54e3 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 54141) {
                      if (code2 < 54084) {
                        if (code2 < 54029) {
                          if (code2 < 54028) {
                            if (54001 <= code2 && code2 <= 54027) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (54028 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 54056) {
                            if (54029 <= code2 && code2 <= 54055) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54057) {
                              if (54056 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54057 <= code2 && code2 <= 54083) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54112) {
                          if (code2 < 54085) {
                            if (54084 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (54085 <= code2 && code2 <= 54111) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 54113) {
                            if (54112 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54140) {
                              if (54113 <= code2 && code2 <= 54139) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54140 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 54224) {
                        if (code2 < 54169) {
                          if (code2 < 54168) {
                            if (54141 <= code2 && code2 <= 54167) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (54168 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 54196) {
                            if (54169 <= code2 && code2 <= 54195) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54197) {
                              if (54196 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54197 <= code2 && code2 <= 54223) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54253) {
                          if (code2 < 54225) {
                            if (54224 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54252) {
                              if (54225 <= code2 && code2 <= 54251) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54252 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 54280) {
                            if (54253 <= code2 && code2 <= 54279) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54281) {
                              if (54280 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54281 <= code2 && code2 <= 54307) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 54589) {
                    if (code2 < 54448) {
                      if (code2 < 54365) {
                        if (code2 < 54336) {
                          if (code2 < 54309) {
                            if (54308 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (54309 <= code2 && code2 <= 54335) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 54337) {
                            if (54336 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54364) {
                              if (54337 <= code2 && code2 <= 54363) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54364 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54393) {
                          if (code2 < 54392) {
                            if (54365 <= code2 && code2 <= 54391) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (54392 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 54420) {
                            if (54393 <= code2 && code2 <= 54419) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54421) {
                              if (54420 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54421 <= code2 && code2 <= 54447) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 54505) {
                        if (code2 < 54476) {
                          if (code2 < 54449) {
                            if (54448 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (54449 <= code2 && code2 <= 54475) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 54477) {
                            if (54476 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54504) {
                              if (54477 <= code2 && code2 <= 54503) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54504 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54560) {
                          if (code2 < 54532) {
                            if (54505 <= code2 && code2 <= 54531) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54533) {
                              if (54532 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54533 <= code2 && code2 <= 54559) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 54561) {
                            if (54560 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54588) {
                              if (54561 <= code2 && code2 <= 54587) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54588 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 54756) {
                      if (code2 < 54672) {
                        if (code2 < 54617) {
                          if (code2 < 54616) {
                            if (54589 <= code2 && code2 <= 54615) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (54616 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 54644) {
                            if (54617 <= code2 && code2 <= 54643) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54645) {
                              if (54644 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54645 <= code2 && code2 <= 54671) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54701) {
                          if (code2 < 54673) {
                            if (54672 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54700) {
                              if (54673 <= code2 && code2 <= 54699) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54700 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 54728) {
                            if (54701 <= code2 && code2 <= 54727) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54729) {
                              if (54728 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54729 <= code2 && code2 <= 54755) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 54813) {
                        if (code2 < 54784) {
                          if (code2 < 54757) {
                            if (54756 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (54757 <= code2 && code2 <= 54783) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 54785) {
                            if (54784 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54812) {
                              if (54785 <= code2 && code2 <= 54811) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54812 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 54868) {
                          if (code2 < 54840) {
                            if (54813 <= code2 && code2 <= 54839) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54841) {
                              if (54840 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54841 <= code2 && code2 <= 54867) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        } else {
                          if (code2 < 54869) {
                            if (54868 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 54896) {
                              if (54869 <= code2 && code2 <= 54895) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (54896 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 69632) {
                  if (code2 < 55216) {
                    if (code2 < 55037) {
                      if (code2 < 54980) {
                        if (code2 < 54925) {
                          if (code2 < 54924) {
                            if (54897 <= code2 && code2 <= 54923) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (54924 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 54952) {
                            if (54925 <= code2 && code2 <= 54951) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 54953) {
                              if (54952 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (54953 <= code2 && code2 <= 54979) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 55008) {
                          if (code2 < 54981) {
                            if (54980 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (54981 <= code2 && code2 <= 55007) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          }
                        } else {
                          if (code2 < 55009) {
                            if (55008 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 55036) {
                              if (55009 <= code2 && code2 <= 55035) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (55036 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 55120) {
                        if (code2 < 55065) {
                          if (code2 < 55064) {
                            if (55037 <= code2 && code2 <= 55063) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (55064 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          }
                        } else {
                          if (code2 < 55092) {
                            if (55065 <= code2 && code2 <= 55091) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 55093) {
                              if (55092 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (55093 <= code2 && code2 <= 55119) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 55149) {
                          if (code2 < 55121) {
                            if (55120 === code2) {
                              return boundaries_1.CLUSTER_BREAK.LV;
                            }
                          } else {
                            if (code2 < 55148) {
                              if (55121 <= code2 && code2 <= 55147) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            } else {
                              if (55148 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            }
                          }
                        } else {
                          if (code2 < 55176) {
                            if (55149 <= code2 && code2 <= 55175) {
                              return boundaries_1.CLUSTER_BREAK.LVT;
                            }
                          } else {
                            if (code2 < 55177) {
                              if (55176 === code2) {
                                return boundaries_1.CLUSTER_BREAK.LV;
                              }
                            } else {
                              if (55177 <= code2 && code2 <= 55203) {
                                return boundaries_1.CLUSTER_BREAK.LVT;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 68097) {
                      if (code2 < 65279) {
                        if (code2 < 64286) {
                          if (code2 < 55243) {
                            if (55216 <= code2 && code2 <= 55238) {
                              return boundaries_1.CLUSTER_BREAK.V;
                            }
                          } else {
                            if (55243 <= code2 && code2 <= 55291) {
                              return boundaries_1.CLUSTER_BREAK.T;
                            }
                          }
                        } else {
                          if (code2 < 65024) {
                            if (64286 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 65056) {
                              if (65024 <= code2 && code2 <= 65039) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (65056 <= code2 && code2 <= 65071) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 66045) {
                          if (code2 < 65438) {
                            if (65279 === code2) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (code2 < 65520) {
                              if (65438 <= code2 && code2 <= 65439) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (65520 <= code2 && code2 <= 65531) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            }
                          }
                        } else {
                          if (code2 < 66272) {
                            if (66045 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 66422) {
                              if (66272 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (66422 <= code2 && code2 <= 66426) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 68325) {
                        if (code2 < 68108) {
                          if (code2 < 68101) {
                            if (68097 <= code2 && code2 <= 68099) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (68101 <= code2 && code2 <= 68102) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 68152) {
                            if (68108 <= code2 && code2 <= 68111) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 68159) {
                              if (68152 <= code2 && code2 <= 68154) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (68159 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 69373) {
                          if (code2 < 68900) {
                            if (68325 <= code2 && code2 <= 68326) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 69291) {
                              if (68900 <= code2 && code2 <= 68903) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (69291 <= code2 && code2 <= 69292) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 69446) {
                            if (69373 <= code2 && code2 <= 69375) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 69506) {
                              if (69446 <= code2 && code2 <= 69456) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (69506 <= code2 && code2 <= 69509) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 70016) {
                    if (code2 < 69815) {
                      if (code2 < 69747) {
                        if (code2 < 69634) {
                          if (69632 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (69633 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 69688) {
                            if (69634 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 69744) {
                              if (69688 <= code2 && code2 <= 69702) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (69744 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 69762) {
                          if (code2 < 69759) {
                            if (69747 <= code2 && code2 <= 69748) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (69759 <= code2 && code2 <= 69761) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 69808) {
                            if (69762 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 69811) {
                              if (69808 <= code2 && code2 <= 69810) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (69811 <= code2 && code2 <= 69814) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 69888) {
                        if (code2 < 69821) {
                          if (code2 < 69817) {
                            if (69815 <= code2 && code2 <= 69816) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (69817 <= code2 && code2 <= 69818) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 69826) {
                            if (69821 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          } else {
                            if (69826 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (69837 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 69933) {
                          if (code2 < 69927) {
                            if (69888 <= code2 && code2 <= 69890) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 69932) {
                              if (69927 <= code2 && code2 <= 69931) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (69932 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 69957) {
                            if (69933 <= code2 && code2 <= 69940) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70003) {
                              if (69957 <= code2 && code2 <= 69958) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70003 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 70194) {
                      if (code2 < 70082) {
                        if (code2 < 70067) {
                          if (code2 < 70018) {
                            if (70016 <= code2 && code2 <= 70017) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (70018 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 70070) {
                            if (70067 <= code2 && code2 <= 70069) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 70079) {
                              if (70070 <= code2 && code2 <= 70078) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70079 <= code2 && code2 <= 70080) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 70095) {
                          if (code2 < 70089) {
                            if (70082 <= code2 && code2 <= 70083) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          } else {
                            if (code2 < 70094) {
                              if (70089 <= code2 && code2 <= 70092) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70094 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 70188) {
                            if (70095 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70191) {
                              if (70188 <= code2 && code2 <= 70190) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70191 <= code2 && code2 <= 70193) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 70209) {
                        if (code2 < 70197) {
                          if (code2 < 70196) {
                            if (70194 <= code2 && code2 <= 70195) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (70196 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 70198) {
                            if (70197 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 70206) {
                              if (70198 <= code2 && code2 <= 70199) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70206 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 70371) {
                          if (code2 < 70367) {
                            if (70209 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70368) {
                              if (70367 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70368 <= code2 && code2 <= 70370) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 70400) {
                            if (70371 <= code2 && code2 <= 70378) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70402) {
                              if (70400 <= code2 && code2 <= 70401) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70402 <= code2 && code2 <= 70403) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 72343) {
                if (code2 < 71339) {
                  if (code2 < 70841) {
                    if (code2 < 70512) {
                      if (code2 < 70471) {
                        if (code2 < 70463) {
                          if (code2 < 70462) {
                            if (70459 <= code2 && code2 <= 70460) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (70462 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 70464) {
                            if (70463 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 70465) {
                              if (70464 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (70465 <= code2 && code2 <= 70468) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 70487) {
                          if (code2 < 70475) {
                            if (70471 <= code2 && code2 <= 70472) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (70475 <= code2 && code2 <= 70477) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 70498) {
                            if (70487 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70502) {
                              if (70498 <= code2 && code2 <= 70499) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70502 <= code2 && code2 <= 70508) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 70725) {
                        if (code2 < 70712) {
                          if (code2 < 70709) {
                            if (70512 <= code2 && code2 <= 70516) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (70709 <= code2 && code2 <= 70711) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 70720) {
                            if (70712 <= code2 && code2 <= 70719) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70722) {
                              if (70720 <= code2 && code2 <= 70721) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70722 <= code2 && code2 <= 70724) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 70832) {
                          if (code2 < 70726) {
                            if (70725 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (70726 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (70750 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 70833) {
                            if (70832 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70835) {
                              if (70833 <= code2 && code2 <= 70834) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70835 <= code2 && code2 <= 70840) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 71096) {
                      if (code2 < 70847) {
                        if (code2 < 70843) {
                          if (70841 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (70842 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 70845) {
                            if (70843 <= code2 && code2 <= 70844) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (70845 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (70846 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      } else {
                        if (code2 < 71087) {
                          if (code2 < 70849) {
                            if (70847 <= code2 && code2 <= 70848) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 70850) {
                              if (70849 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (70850 <= code2 && code2 <= 70851) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 71088) {
                            if (71087 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71090) {
                              if (71088 <= code2 && code2 <= 71089) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (71090 <= code2 && code2 <= 71093) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 71216) {
                        if (code2 < 71102) {
                          if (code2 < 71100) {
                            if (71096 <= code2 && code2 <= 71099) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (71100 <= code2 && code2 <= 71101) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 71103) {
                            if (71102 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 71132) {
                              if (71103 <= code2 && code2 <= 71104) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (71132 <= code2 && code2 <= 71133) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 71229) {
                          if (code2 < 71219) {
                            if (71216 <= code2 && code2 <= 71218) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 71227) {
                              if (71219 <= code2 && code2 <= 71226) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (71227 <= code2 && code2 <= 71228) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 71230) {
                            if (71229 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71231) {
                              if (71230 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (71231 <= code2 && code2 <= 71232) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 71999) {
                    if (code2 < 71463) {
                      if (code2 < 71350) {
                        if (code2 < 71341) {
                          if (71339 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                          if (71340 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                        } else {
                          if (code2 < 71342) {
                            if (71341 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71344) {
                              if (71342 <= code2 && code2 <= 71343) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (71344 <= code2 && code2 <= 71349) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 71453) {
                          if (71350 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (71351 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 71458) {
                            if (71453 <= code2 && code2 <= 71455) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71462) {
                              if (71458 <= code2 && code2 <= 71461) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (71462 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 71984) {
                        if (code2 < 71727) {
                          if (code2 < 71724) {
                            if (71463 <= code2 && code2 <= 71467) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (71724 <= code2 && code2 <= 71726) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 71736) {
                            if (71727 <= code2 && code2 <= 71735) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71737) {
                              if (71736 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (71737 <= code2 && code2 <= 71738) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 71995) {
                          if (code2 < 71985) {
                            if (71984 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 71991) {
                              if (71985 <= code2 && code2 <= 71989) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (71991 <= code2 && code2 <= 71992) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 71997) {
                            if (71995 <= code2 && code2 <= 71996) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (71997 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (71998 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 72193) {
                      if (code2 < 72145) {
                        if (code2 < 72001) {
                          if (71999 === code2) {
                            return boundaries_1.CLUSTER_BREAK.PREPEND;
                          }
                          if (72e3 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                        } else {
                          if (code2 < 72002) {
                            if (72001 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          } else {
                            if (72002 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (72003 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 72156) {
                          if (code2 < 72148) {
                            if (72145 <= code2 && code2 <= 72147) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 72154) {
                              if (72148 <= code2 && code2 <= 72151) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (72154 <= code2 && code2 <= 72155) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 72160) {
                            if (72156 <= code2 && code2 <= 72159) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (72160 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (72164 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 72263) {
                        if (code2 < 72249) {
                          if (code2 < 72243) {
                            if (72193 <= code2 && code2 <= 72202) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (72243 <= code2 && code2 <= 72248) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 72250) {
                            if (72249 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 72251) {
                              if (72250 === code2) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            } else {
                              if (72251 <= code2 && code2 <= 72254) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 72281) {
                          if (code2 < 72273) {
                            if (72263 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 72279) {
                              if (72273 <= code2 && code2 <= 72278) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (72279 <= code2 && code2 <= 72280) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        } else {
                          if (code2 < 72324) {
                            if (72281 <= code2 && code2 <= 72283) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 72330) {
                              if (72324 <= code2 && code2 <= 72329) {
                                return boundaries_1.CLUSTER_BREAK.PREPEND;
                              }
                            } else {
                              if (72330 <= code2 && code2 <= 72342) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                if (code2 < 94033) {
                  if (code2 < 73104) {
                    if (code2 < 72881) {
                      if (code2 < 72766) {
                        if (code2 < 72751) {
                          if (code2 < 72344) {
                            if (72343 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (72344 <= code2 && code2 <= 72345) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 72752) {
                            if (72751 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 72760) {
                              if (72752 <= code2 && code2 <= 72758) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (72760 <= code2 && code2 <= 72765) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 72850) {
                          if (72766 === code2) {
                            return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                          }
                          if (72767 === code2) {
                            return boundaries_1.CLUSTER_BREAK.EXTEND;
                          }
                        } else {
                          if (code2 < 72873) {
                            if (72850 <= code2 && code2 <= 72871) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 72874) {
                              if (72873 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (72874 <= code2 && code2 <= 72880) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 73018) {
                        if (code2 < 72884) {
                          if (code2 < 72882) {
                            if (72881 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (72882 <= code2 && code2 <= 72883) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 72885) {
                            if (72884 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (code2 < 73009) {
                              if (72885 <= code2 && code2 <= 72886) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (73009 <= code2 && code2 <= 73014) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 73030) {
                          if (code2 < 73020) {
                            if (73018 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 73023) {
                              if (73020 <= code2 && code2 <= 73021) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (73023 <= code2 && code2 <= 73029) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 73031) {
                            if (73030 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          } else {
                            if (code2 < 73098) {
                              if (73031 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (73098 <= code2 && code2 <= 73102) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 73526) {
                      if (code2 < 73459) {
                        if (code2 < 73109) {
                          if (code2 < 73107) {
                            if (73104 <= code2 && code2 <= 73105) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (73107 <= code2 && code2 <= 73108) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 73110) {
                            if (73109 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (73110 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (73111 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 73474) {
                          if (code2 < 73461) {
                            if (73459 <= code2 && code2 <= 73460) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 73472) {
                              if (73461 <= code2 && code2 <= 73462) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (73472 <= code2 && code2 <= 73473) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 73475) {
                            if (73474 === code2) {
                              return boundaries_1.CLUSTER_BREAK.PREPEND;
                            }
                          } else {
                            if (code2 < 73524) {
                              if (73475 === code2) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (73524 <= code2 && code2 <= 73525) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 78896) {
                        if (code2 < 73536) {
                          if (code2 < 73534) {
                            if (73526 <= code2 && code2 <= 73530) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (73534 <= code2 && code2 <= 73535) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 73537) {
                            if (73536 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (73537 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                            if (73538 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        }
                      } else {
                        if (code2 < 92912) {
                          if (code2 < 78912) {
                            if (78896 <= code2 && code2 <= 78911) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (code2 < 78919) {
                              if (78912 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (78919 <= code2 && code2 <= 78933) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 92976) {
                            if (92912 <= code2 && code2 <= 92916) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 94031) {
                              if (92976 <= code2 && code2 <= 92982) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (94031 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (code2 < 121476) {
                    if (code2 < 119143) {
                      if (code2 < 113824) {
                        if (code2 < 94180) {
                          if (code2 < 94095) {
                            if (94033 <= code2 && code2 <= 94087) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          } else {
                            if (94095 <= code2 && code2 <= 94098) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 94192) {
                            if (94180 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 113821) {
                              if (94192 <= code2 && code2 <= 94193) {
                                return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                              }
                            } else {
                              if (113821 <= code2 && code2 <= 113822) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 118576) {
                          if (code2 < 118528) {
                            if (113824 <= code2 && code2 <= 113827) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (118528 <= code2 && code2 <= 118573) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 119141) {
                            if (118576 <= code2 && code2 <= 118598) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (119141 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                            if (119142 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 119173) {
                        if (code2 < 119150) {
                          if (code2 < 119149) {
                            if (119143 <= code2 && code2 <= 119145) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (119149 === code2) {
                              return boundaries_1.CLUSTER_BREAK.SPACINGMARK;
                            }
                          }
                        } else {
                          if (code2 < 119155) {
                            if (119150 <= code2 && code2 <= 119154) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 119163) {
                              if (119155 <= code2 && code2 <= 119162) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            } else {
                              if (119163 <= code2 && code2 <= 119170) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 121344) {
                          if (code2 < 119210) {
                            if (119173 <= code2 && code2 <= 119179) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 119362) {
                              if (119210 <= code2 && code2 <= 119213) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (119362 <= code2 && code2 <= 119364) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 121403) {
                            if (121344 <= code2 && code2 <= 121398) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 121461) {
                              if (121403 <= code2 && code2 <= 121452) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (121461 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (code2 < 123628) {
                      if (code2 < 122907) {
                        if (code2 < 121505) {
                          if (code2 < 121499) {
                            if (121476 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (121499 <= code2 && code2 <= 121503) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 122880) {
                            if (121505 <= code2 && code2 <= 121519) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 122888) {
                              if (122880 <= code2 && code2 <= 122886) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (122888 <= code2 && code2 <= 122904) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 123023) {
                          if (code2 < 122915) {
                            if (122907 <= code2 && code2 <= 122913) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 122918) {
                              if (122915 <= code2 && code2 <= 122916) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (122918 <= code2 && code2 <= 122922) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 123184) {
                            if (123023 === code2) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 123566) {
                              if (123184 <= code2 && code2 <= 123190) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (123566 === code2) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (code2 < 127995) {
                        if (code2 < 125136) {
                          if (code2 < 124140) {
                            if (123628 <= code2 && code2 <= 123631) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (124140 <= code2 && code2 <= 124143) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          }
                        } else {
                          if (code2 < 125252) {
                            if (125136 <= code2 && code2 <= 125142) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 127462) {
                              if (125252 <= code2 && code2 <= 125258) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (127462 <= code2 && code2 <= 127487) {
                                return boundaries_1.CLUSTER_BREAK.REGIONAL_INDICATOR;
                              }
                            }
                          }
                        }
                      } else {
                        if (code2 < 917632) {
                          if (code2 < 917504) {
                            if (127995 <= code2 && code2 <= 127999) {
                              return boundaries_1.CLUSTER_BREAK.EXTEND;
                            }
                          } else {
                            if (code2 < 917536) {
                              if (917504 <= code2 && code2 <= 917535) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            } else {
                              if (917536 <= code2 && code2 <= 917631) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            }
                          }
                        } else {
                          if (code2 < 917760) {
                            if (917632 <= code2 && code2 <= 917759) {
                              return boundaries_1.CLUSTER_BREAK.CONTROL;
                            }
                          } else {
                            if (code2 < 918e3) {
                              if (917760 <= code2 && code2 <= 917999) {
                                return boundaries_1.CLUSTER_BREAK.EXTEND;
                              }
                            } else {
                              if (918e3 <= code2 && code2 <= 921599) {
                                return boundaries_1.CLUSTER_BREAK.CONTROL;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return boundaries_1.CLUSTER_BREAK.OTHER;
      }
      static getEmojiProperty(code2) {
        if (code2 < 10160) {
          if (code2 < 9728) {
            if (code2 < 9e3) {
              if (code2 < 8482) {
                if (code2 < 8252) {
                  if (169 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (174 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (8252 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (8265 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                }
              } else {
                if (code2 < 8596) {
                  if (8482 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (8505 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (code2 < 8617) {
                    if (8596 <= code2 && code2 <= 8601) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 8986) {
                      if (8617 <= code2 && code2 <= 8618) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (8986 <= code2 && code2 <= 8987) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 9410) {
                if (code2 < 9167) {
                  if (9e3 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (9096 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (code2 < 9193) {
                    if (9167 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 9208) {
                      if (9193 <= code2 && code2 <= 9203) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (9208 <= code2 && code2 <= 9210) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              } else {
                if (code2 < 9654) {
                  if (code2 < 9642) {
                    if (9410 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (9642 <= code2 && code2 <= 9643) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 9664) {
                    if (9654 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 9723) {
                      if (9664 === code2) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (9723 <= code2 && code2 <= 9726) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (code2 < 10035) {
              if (code2 < 10004) {
                if (code2 < 9748) {
                  if (code2 < 9735) {
                    if (9728 <= code2 && code2 <= 9733) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (9735 <= code2 && code2 <= 9746) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 9872) {
                    if (9748 <= code2 && code2 <= 9861) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 9992) {
                      if (9872 <= code2 && code2 <= 9989) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (9992 <= code2 && code2 <= 10002) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              } else {
                if (code2 < 10013) {
                  if (10004 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (10006 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (code2 < 10017) {
                    if (10013 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (10017 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                    if (10024 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                }
              }
            } else {
              if (code2 < 10067) {
                if (code2 < 10055) {
                  if (code2 < 10052) {
                    if (10035 <= code2 && code2 <= 10036) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (10052 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 10060) {
                    if (10055 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (10060 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                    if (10062 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                }
              } else {
                if (code2 < 10083) {
                  if (code2 < 10071) {
                    if (10067 <= code2 && code2 <= 10069) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (10071 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 10133) {
                    if (10083 <= code2 && code2 <= 10087) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 10145) {
                      if (10133 <= code2 && code2 <= 10135) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (10145 === code2) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (code2 < 127489) {
            if (code2 < 12951) {
              if (code2 < 11035) {
                if (code2 < 10548) {
                  if (10160 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (10175 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (code2 < 11013) {
                    if (10548 <= code2 && code2 <= 10549) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (11013 <= code2 && code2 <= 11015) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                }
              } else {
                if (code2 < 11093) {
                  if (code2 < 11088) {
                    if (11035 <= code2 && code2 <= 11036) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (11088 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 12336) {
                    if (11093 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (12336 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                    if (12349 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                }
              }
            } else {
              if (code2 < 127340) {
                if (code2 < 126976) {
                  if (12951 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                  if (12953 === code2) {
                    return boundaries_1.EXTENDED_PICTOGRAPHIC;
                  }
                } else {
                  if (code2 < 127245) {
                    if (126976 <= code2 && code2 <= 127231) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 127279) {
                      if (127245 <= code2 && code2 <= 127247) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (127279 === code2) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              } else {
                if (code2 < 127374) {
                  if (code2 < 127358) {
                    if (127340 <= code2 && code2 <= 127345) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (127358 <= code2 && code2 <= 127359) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 127377) {
                    if (127374 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 127405) {
                      if (127377 <= code2 && code2 <= 127386) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (127405 <= code2 && code2 <= 127461) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (code2 < 128981) {
              if (code2 < 127561) {
                if (code2 < 127535) {
                  if (code2 < 127514) {
                    if (127489 <= code2 && code2 <= 127503) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (127514 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 127538) {
                    if (127535 === code2) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 127548) {
                      if (127538 <= code2 && code2 <= 127546) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (127548 <= code2 && code2 <= 127551) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              } else {
                if (code2 < 128326) {
                  if (code2 < 128e3) {
                    if (127561 <= code2 && code2 <= 127994) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (128e3 <= code2 && code2 <= 128317) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 128640) {
                    if (128326 <= code2 && code2 <= 128591) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 128884) {
                      if (128640 <= code2 && code2 <= 128767) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (128884 <= code2 && code2 <= 128895) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            } else {
              if (code2 < 129198) {
                if (code2 < 129096) {
                  if (code2 < 129036) {
                    if (128981 <= code2 && code2 <= 129023) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (129036 <= code2 && code2 <= 129039) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 129114) {
                    if (129096 <= code2 && code2 <= 129103) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 129160) {
                      if (129114 <= code2 && code2 <= 129119) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (129160 <= code2 && code2 <= 129167) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              } else {
                if (code2 < 129340) {
                  if (code2 < 129292) {
                    if (129198 <= code2 && code2 <= 129279) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (129292 <= code2 && code2 <= 129338) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  }
                } else {
                  if (code2 < 129351) {
                    if (129340 <= code2 && code2 <= 129349) {
                      return boundaries_1.EXTENDED_PICTOGRAPHIC;
                    }
                  } else {
                    if (code2 < 130048) {
                      if (129351 <= code2 && code2 <= 129791) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    } else {
                      if (130048 <= code2 && code2 <= 131069) {
                        return boundaries_1.EXTENDED_PICTOGRAPHIC;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return boundaries_1.CLUSTER_BREAK.OTHER;
      }
    };
    exports.default = Graphemer2;
  }
});

// ../../node_modules/graphemer/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/graphemer/lib/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Graphemer_1 = __importDefault(require_Graphemer());
    exports.default = Graphemer_1.default;
  }
});

// ../../node_modules/iso-datestring-validator/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/iso-datestring-validator/dist/index.js"(exports) {
    (() => {
      "use strict";
      var e = { d: (t2, r2) => {
        for (var n2 in r2)
          e.o(r2, n2) && !e.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: r2[n2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      function r(e2, t2) {
        return void 0 === t2 && (t2 = "-"), new RegExp("^(?!0{4}" + t2 + "0{2}" + t2 + "0{2})((?=[0-9]{4}" + t2 + "(((0[^2])|1[0-2])|02(?=" + t2 + "(([0-1][0-9])|2[0-8])))" + t2 + "[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))" + t2 + "02" + t2 + "29))([0-9]{4})" + t2 + "(?!((0[469])|11)" + t2 + "31)((0[1,3-9]|1[0-2])|(02(?!" + t2 + "3)))" + t2 + "(0[1-9]|[1-2][0-9]|3[0-1])$").test(e2);
      }
      function n(e2) {
        var t2 = /\D/.exec(e2);
        return t2 ? t2[0] : "";
      }
      function i(e2, t2, r2) {
        void 0 === t2 && (t2 = ":"), void 0 === r2 && (r2 = false);
        var i2 = new RegExp("^([0-1]|2(?=([0-3])|4" + t2 + "00))[0-9]" + t2 + "[0-5][0-9](" + t2 + "([0-5]|6(?=0))[0-9])?(.[0-9]{1,9})?$");
        if (!r2 || !/[Z+\-]/.test(e2))
          return i2.test(e2);
        if (/Z$/.test(e2))
          return i2.test(e2.replace("Z", ""));
        var o2 = e2.includes("+"), a2 = e2.split(/[+-]/), u2 = a2[0], d2 = a2[1];
        return i2.test(u2) && function(e3, t3, r3) {
          return void 0 === r3 && (r3 = ":"), new RegExp(t3 ? "^(0(?!(2" + r3 + "4)|0" + r3 + "3)|1(?=([0-1]|2(?=" + r3 + "[04])|[34](?=" + r3 + "0))))([03469](?=" + r3 + "[03])|[17](?=" + r3 + "0)|2(?=" + r3 + "[04])|5(?=" + r3 + "[034])|8(?=" + r3 + "[04]))" + r3 + "([03](?=0)|4(?=5))[05]$" : "^(0(?=[^0])|1(?=[0-2]))([39](?=" + r3 + "[03])|[0-24-8](?=" + r3 + "00))" + r3 + "[03]0$").test(e3);
        }(d2, o2, n(d2));
      }
      function o(e2) {
        var t2 = e2.split("T"), o2 = t2[0], a2 = t2[1], u2 = r(o2, n(o2));
        if (!a2)
          return false;
        var d2, s = (d2 = a2.match(/([^Z+\-\d])(?=\d+\1)/), Array.isArray(d2) ? d2[0] : "");
        return u2 && i(a2, s, true);
      }
      function a(e2, t2) {
        return void 0 === t2 && (t2 = "-"), new RegExp("^[0-9]{4}" + t2 + "(0(?=[^0])|1(?=[0-2]))[0-9]$").test(e2);
      }
      e.r(t), e.d(t, { isValidDate: () => r, isValidISODateString: () => o, isValidTime: () => i, isValidYearMonth: () => a });
      var u = exports;
      for (var d in t)
        u[d] = t[d];
      t.__esModule && Object.defineProperty(u, "__esModule", { value: true });
    })();
  }
});

// src/index.ts
var src_exports2 = {};
__export(src_exports2, {
  APP_BSKY_GRAPH: () => APP_BSKY_GRAPH,
  ActorNS: () => ActorNS,
  AdminNS: () => AdminNS,
  AppBskyActorDefs: () => defs_exports5,
  AppBskyActorGetPreferences: () => getPreferences_exports,
  AppBskyActorGetProfile: () => getProfile_exports,
  AppBskyActorGetProfiles: () => getProfiles_exports,
  AppBskyActorGetSuggestions: () => getSuggestions_exports,
  AppBskyActorProfile: () => profile_exports,
  AppBskyActorPutPreferences: () => putPreferences_exports,
  AppBskyActorSearchActors: () => searchActors_exports,
  AppBskyActorSearchActorsTypeahead: () => searchActorsTypeahead_exports,
  AppBskyEmbedExternal: () => external_exports,
  AppBskyEmbedImages: () => images_exports,
  AppBskyEmbedRecord: () => record_exports,
  AppBskyEmbedRecordWithMedia: () => recordWithMedia_exports,
  AppBskyFeedDefs: () => defs_exports6,
  AppBskyFeedDescribeFeedGenerator: () => describeFeedGenerator_exports,
  AppBskyFeedGenerator: () => generator_exports,
  AppBskyFeedGetActorFeeds: () => getActorFeeds_exports,
  AppBskyFeedGetActorLikes: () => getActorLikes_exports,
  AppBskyFeedGetAuthorFeed: () => getAuthorFeed_exports,
  AppBskyFeedGetFeed: () => getFeed_exports,
  AppBskyFeedGetFeedGenerator: () => getFeedGenerator_exports,
  AppBskyFeedGetFeedGenerators: () => getFeedGenerators_exports,
  AppBskyFeedGetFeedSkeleton: () => getFeedSkeleton_exports,
  AppBskyFeedGetLikes: () => getLikes_exports,
  AppBskyFeedGetPostThread: () => getPostThread_exports,
  AppBskyFeedGetPosts: () => getPosts_exports,
  AppBskyFeedGetRepostedBy: () => getRepostedBy_exports,
  AppBskyFeedGetTimeline: () => getTimeline_exports,
  AppBskyFeedLike: () => like_exports,
  AppBskyFeedPost: () => post_exports,
  AppBskyFeedRepost: () => repost_exports,
  AppBskyGraphBlock: () => block_exports,
  AppBskyGraphDefs: () => defs_exports7,
  AppBskyGraphFollow: () => follow_exports,
  AppBskyGraphGetBlocks: () => getBlocks_exports2,
  AppBskyGraphGetFollowers: () => getFollowers_exports,
  AppBskyGraphGetFollows: () => getFollows_exports,
  AppBskyGraphGetList: () => getList_exports,
  AppBskyGraphGetListMutes: () => getListMutes_exports,
  AppBskyGraphGetLists: () => getLists_exports,
  AppBskyGraphGetMutes: () => getMutes_exports,
  AppBskyGraphList: () => list_exports,
  AppBskyGraphListitem: () => listitem_exports,
  AppBskyGraphMuteActor: () => muteActor_exports,
  AppBskyGraphMuteActorList: () => muteActorList_exports,
  AppBskyGraphUnmuteActor: () => unmuteActor_exports,
  AppBskyGraphUnmuteActorList: () => unmuteActorList_exports,
  AppBskyNotificationGetUnreadCount: () => getUnreadCount_exports,
  AppBskyNotificationListNotifications: () => listNotifications_exports,
  AppBskyNotificationRegisterPush: () => registerPush_exports,
  AppBskyNotificationUpdateSeen: () => updateSeen_exports,
  AppBskyRichtextFacet: () => facet_exports,
  AppBskyUnspeccedApplyLabels: () => applyLabels_exports,
  AppBskyUnspeccedGetPopular: () => getPopular_exports,
  AppBskyUnspeccedGetPopularFeedGenerators: () => getPopularFeedGenerators_exports,
  AppBskyUnspeccedGetTimelineSkeleton: () => getTimelineSkeleton_exports,
  AppNS: () => AppNS,
  AtUri: () => AtUri,
  AtpAgent: () => AtpAgent,
  AtpBaseClient: () => AtpBaseClient,
  AtpServiceClient: () => AtpServiceClient,
  AtprotoNS: () => AtprotoNS,
  BlobRef: () => BlobRef,
  BlockRecord: () => BlockRecord,
  BskyAgent: () => BskyAgent,
  BskyNS: () => BskyNS,
  COM_ATPROTO_ADMIN: () => COM_ATPROTO_ADMIN,
  COM_ATPROTO_MODERATION: () => COM_ATPROTO_MODERATION,
  ComAtprotoAdminDefs: () => defs_exports,
  ComAtprotoAdminDisableAccountInvites: () => disableAccountInvites_exports,
  ComAtprotoAdminDisableInviteCodes: () => disableInviteCodes_exports,
  ComAtprotoAdminEnableAccountInvites: () => enableAccountInvites_exports,
  ComAtprotoAdminGetInviteCodes: () => getInviteCodes_exports,
  ComAtprotoAdminGetModerationAction: () => getModerationAction_exports,
  ComAtprotoAdminGetModerationActions: () => getModerationActions_exports,
  ComAtprotoAdminGetModerationReport: () => getModerationReport_exports,
  ComAtprotoAdminGetModerationReports: () => getModerationReports_exports,
  ComAtprotoAdminGetRecord: () => getRecord_exports,
  ComAtprotoAdminGetRepo: () => getRepo_exports,
  ComAtprotoAdminRebaseRepo: () => rebaseRepo_exports,
  ComAtprotoAdminResolveModerationReports: () => resolveModerationReports_exports,
  ComAtprotoAdminReverseModerationAction: () => reverseModerationAction_exports,
  ComAtprotoAdminSearchRepos: () => searchRepos_exports,
  ComAtprotoAdminSendEmail: () => sendEmail_exports,
  ComAtprotoAdminTakeModerationAction: () => takeModerationAction_exports,
  ComAtprotoAdminUpdateAccountEmail: () => updateAccountEmail_exports,
  ComAtprotoAdminUpdateAccountHandle: () => updateAccountHandle_exports,
  ComAtprotoIdentityResolveHandle: () => resolveHandle_exports,
  ComAtprotoIdentityUpdateHandle: () => updateHandle_exports,
  ComAtprotoLabelDefs: () => defs_exports2,
  ComAtprotoLabelQueryLabels: () => queryLabels_exports,
  ComAtprotoLabelSubscribeLabels: () => subscribeLabels_exports,
  ComAtprotoModerationCreateReport: () => createReport_exports,
  ComAtprotoModerationDefs: () => defs_exports3,
  ComAtprotoRepoApplyWrites: () => applyWrites_exports,
  ComAtprotoRepoCreateRecord: () => createRecord_exports,
  ComAtprotoRepoDeleteRecord: () => deleteRecord_exports,
  ComAtprotoRepoDescribeRepo: () => describeRepo_exports,
  ComAtprotoRepoGetRecord: () => getRecord_exports2,
  ComAtprotoRepoListRecords: () => listRecords_exports,
  ComAtprotoRepoPutRecord: () => putRecord_exports,
  ComAtprotoRepoRebaseRepo: () => rebaseRepo_exports2,
  ComAtprotoRepoStrongRef: () => strongRef_exports,
  ComAtprotoRepoUploadBlob: () => uploadBlob_exports,
  ComAtprotoServerCreateAccount: () => createAccount_exports,
  ComAtprotoServerCreateAppPassword: () => createAppPassword_exports,
  ComAtprotoServerCreateInviteCode: () => createInviteCode_exports,
  ComAtprotoServerCreateInviteCodes: () => createInviteCodes_exports,
  ComAtprotoServerCreateSession: () => createSession_exports,
  ComAtprotoServerDefs: () => defs_exports4,
  ComAtprotoServerDeleteAccount: () => deleteAccount_exports,
  ComAtprotoServerDeleteSession: () => deleteSession_exports,
  ComAtprotoServerDescribeServer: () => describeServer_exports,
  ComAtprotoServerGetAccountInviteCodes: () => getAccountInviteCodes_exports,
  ComAtprotoServerGetSession: () => getSession_exports,
  ComAtprotoServerListAppPasswords: () => listAppPasswords_exports,
  ComAtprotoServerRefreshSession: () => refreshSession_exports,
  ComAtprotoServerRequestAccountDelete: () => requestAccountDelete_exports,
  ComAtprotoServerRequestPasswordReset: () => requestPasswordReset_exports,
  ComAtprotoServerResetPassword: () => resetPassword_exports,
  ComAtprotoServerRevokeAppPassword: () => revokeAppPassword_exports,
  ComAtprotoSyncGetBlob: () => getBlob_exports,
  ComAtprotoSyncGetBlocks: () => getBlocks_exports,
  ComAtprotoSyncGetCheckout: () => getCheckout_exports,
  ComAtprotoSyncGetCommitPath: () => getCommitPath_exports,
  ComAtprotoSyncGetHead: () => getHead_exports,
  ComAtprotoSyncGetRecord: () => getRecord_exports3,
  ComAtprotoSyncGetRepo: () => getRepo_exports2,
  ComAtprotoSyncListBlobs: () => listBlobs_exports,
  ComAtprotoSyncListRepos: () => listRepos_exports,
  ComAtprotoSyncNotifyOfUpdate: () => notifyOfUpdate_exports,
  ComAtprotoSyncRequestCrawl: () => requestCrawl_exports,
  ComAtprotoSyncSubscribeRepos: () => subscribeRepos_exports,
  ComNS: () => ComNS,
  EmbedNS: () => EmbedNS,
  FeedNS: () => FeedNS,
  FollowRecord: () => FollowRecord,
  GeneratorRecord: () => GeneratorRecord,
  GraphNS: () => GraphNS,
  IdentityNS: () => IdentityNS,
  LABELS: () => LABELS,
  LABEL_GROUPS: () => LABEL_GROUPS,
  LabelNS: () => LabelNS,
  LikeRecord: () => LikeRecord,
  ListRecord: () => ListRecord,
  ListitemRecord: () => ListitemRecord,
  ModerationDecision: () => ModerationDecision,
  ModerationNS: () => ModerationNS,
  NotificationNS: () => NotificationNS,
  PostRecord: () => PostRecord,
  ProfileRecord: () => ProfileRecord,
  RepoNS: () => RepoNS,
  RepostRecord: () => RepostRecord,
  RichText: () => RichText,
  RichTextSegment: () => RichTextSegment,
  RichtextNS: () => RichtextNS,
  ServerNS: () => ServerNS,
  SyncNS: () => SyncNS,
  UnicodeString: () => UnicodeString,
  UnspeccedNS: () => UnspeccedNS,
  default: () => AtpAgent,
  jsonStringToLex: () => jsonStringToLex,
  jsonToLex: () => jsonToLex,
  lexToJson: () => lexToJson,
  moderateFeedGenerator: () => moderateFeedGenerator,
  moderatePost: () => moderatePost,
  moderateProfile: () => moderateProfile,
  moderateUserList: () => moderateUserList,
  parseLanguage: () => parseLanguage,
  sanitizeRichText: () => sanitizeRichText,
  stringifyLex: () => stringifyLex
});
module.exports = __toCommonJS(src_exports2);

// ../syntax/src/handle.ts
var ensureValidHandle = (handle2) => {
  if (!/^[a-zA-Z0-9.-]*$/.test(handle2)) {
    throw new InvalidHandleError(
      "Disallowed characters in handle (ASCII letters, digits, dashes, periods only)"
    );
  }
  if (handle2.length > 253) {
    throw new InvalidHandleError("Handle is too long (253 chars max)");
  }
  const labels = handle2.split(".");
  if (labels.length < 2) {
    throw new InvalidHandleError("Handle domain needs at least two parts");
  }
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (l.length < 1) {
      throw new InvalidHandleError("Handle parts can not be empty");
    }
    if (l.length > 63) {
      throw new InvalidHandleError("Handle part too long (max 63 chars)");
    }
    if (l.endsWith("-") || l.startsWith("-")) {
      throw new InvalidHandleError(
        "Handle parts can not start or end with hyphens"
      );
    }
    if (i + 1 == labels.length && !/^[a-zA-Z]/.test(l)) {
      throw new InvalidHandleError(
        "Handle final component (TLD) must start with ASCII letter"
      );
    }
  }
};
var InvalidHandleError = class extends Error {
};

// ../syntax/src/did.ts
var ensureValidDid = (did2) => {
  if (!/^[a-zA-Z0-9._:%-]*$/.test(did2)) {
    throw new InvalidDidError(
      "Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)"
    );
  }
  const parts = did2.split(":");
  if (parts.length < 3) {
    throw new InvalidDidError(
      "DID requires prefix, method, and method-specific content"
    );
  }
  if (parts[0] != "did") {
    throw new InvalidDidError('DID requires "did:" prefix');
  }
  if (!/^[a-z]+$/.test(parts[1])) {
    throw new InvalidDidError("DID method must be lower-case letters");
  }
  if (did2.endsWith(":") || did2.endsWith("%")) {
    throw new InvalidDidError('DID can not end with ":" or "%"');
  }
  if (did2.length > 2 * 1024) {
    throw new InvalidDidError("DID is too long (2048 chars max)");
  }
};
var InvalidDidError = class extends Error {
};

// ../syntax/src/nsid.ts
var NSID = class {
  constructor(nsid2) {
    this.segments = [];
    ensureValidNsid(nsid2);
    this.segments = nsid2.split(".");
  }
  static parse(nsid2) {
    return new NSID(nsid2);
  }
  static create(authority, name2) {
    const segments = [...authority.split(".").reverse(), name2].join(".");
    return new NSID(segments);
  }
  static isValid(nsid2) {
    try {
      NSID.parse(nsid2);
      return true;
    } catch (e) {
      return false;
    }
  }
  get authority() {
    return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
  }
  get name() {
    return this.segments.at(this.segments.length - 1);
  }
  toString() {
    return this.segments.join(".");
  }
};
var ensureValidNsid = (nsid2) => {
  const toCheck = nsid2;
  if (!/^[a-zA-Z0-9.-]*$/.test(toCheck)) {
    throw new InvalidNsidError(
      "Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)"
    );
  }
  if (toCheck.length > 253 + 1 + 63) {
    throw new InvalidNsidError("NSID is too long (317 chars max)");
  }
  const labels = toCheck.split(".");
  if (labels.length < 3) {
    throw new InvalidNsidError("NSID needs at least three parts");
  }
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (l.length < 1) {
      throw new InvalidNsidError("NSID parts can not be empty");
    }
    if (l.length > 63) {
      throw new InvalidNsidError("NSID part too long (max 63 chars)");
    }
    if (l.endsWith("-") || l.startsWith("-")) {
      throw new InvalidNsidError("NSID parts can not start or end with hyphen");
    }
    if (/^[0-9]/.test(l) && i == 0) {
      throw new InvalidNsidError("NSID first part may not start with a digit");
    }
    if (!/^[a-zA-Z]+$/.test(l) && i + 1 == labels.length) {
      throw new InvalidNsidError("NSID name part must be only letters");
    }
  }
};
var InvalidNsidError = class extends Error {
};

// ../syntax/src/aturi_validation.ts
var ensureValidAtUri = (uri2) => {
  const uriParts = uri2.split("#");
  if (uriParts.length > 2) {
    throw new Error('ATURI can have at most one "#", separating fragment out');
  }
  const fragmentPart = uriParts[1] || null;
  uri2 = uriParts[0];
  if (!/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(uri2)) {
    throw new Error("Disallowed characters in ATURI (ASCII)");
  }
  const parts = uri2.split("/");
  if (parts.length >= 3 && (parts[0] != "at:" || parts[1].length != 0)) {
    throw new Error('ATURI must start with "at://"');
  }
  if (parts.length < 3) {
    throw new Error("ATURI requires at least method and authority sections");
  }
  try {
    ensureValidHandle(parts[2]);
  } catch {
    try {
      ensureValidDid(parts[2]);
    } catch {
      throw new Error("ATURI authority must be a valid handle or DID");
    }
  }
  if (parts.length >= 4) {
    if (parts[3].length == 0) {
      throw new Error(
        "ATURI can not have a slash after authority without a path segment"
      );
    }
    try {
      ensureValidNsid(parts[3]);
    } catch {
      throw new Error(
        "ATURI requires first path segment (if supplied) to be valid NSID"
      );
    }
  }
  if (parts.length >= 5) {
    if (parts[4].length == 0) {
      throw new Error(
        "ATURI can not have a slash after collection, unless record key is provided"
      );
    }
  }
  if (parts.length >= 6) {
    throw new Error(
      "ATURI path can have at most two parts, and no trailing slash"
    );
  }
  if (uriParts.length >= 2 && fragmentPart == null) {
    throw new Error("ATURI fragment must be non-empty and start with slash");
  }
  if (fragmentPart != null) {
    if (fragmentPart.length == 0 || fragmentPart[0] != "/") {
      throw new Error("ATURI fragment must be non-empty and start with slash");
    }
    if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(fragmentPart)) {
      throw new Error("Disallowed characters in ATURI fragment (ASCII)");
    }
  }
  if (uri2.length > 8 * 1024) {
    throw new Error("ATURI is far too long");
  }
};

// ../syntax/src/aturi.ts
var ATP_URI_REGEX = /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
var RELATIVE_REGEX = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
var AtUri = class {
  constructor(uri2, base3) {
    let parsed;
    if (base3) {
      parsed = parse(base3);
      if (!parsed) {
        throw new Error(`Invalid at uri: ${base3}`);
      }
      const relativep = parseRelative(uri2);
      if (!relativep) {
        throw new Error(`Invalid path: ${uri2}`);
      }
      Object.assign(parsed, relativep);
    } else {
      parsed = parse(uri2);
      if (!parsed) {
        throw new Error(`Invalid at uri: ${uri2}`);
      }
    }
    this.hash = parsed.hash;
    this.host = parsed.host;
    this.pathname = parsed.pathname;
    this.searchParams = parsed.searchParams;
  }
  static make(handleOrDid, collection, rkey) {
    let str = handleOrDid;
    if (collection)
      str += "/" + collection;
    if (rkey)
      str += "/" + rkey;
    return new AtUri(str);
  }
  get protocol() {
    return "at:";
  }
  get origin() {
    return `at://${this.host}`;
  }
  get hostname() {
    return this.host;
  }
  set hostname(v) {
    this.host = v;
  }
  get search() {
    return this.searchParams.toString();
  }
  set search(v) {
    this.searchParams = new URLSearchParams(v);
  }
  get collection() {
    return this.pathname.split("/").filter(Boolean)[0] || "";
  }
  set collection(v) {
    const parts = this.pathname.split("/").filter(Boolean);
    parts[0] = v;
    this.pathname = parts.join("/");
  }
  get rkey() {
    return this.pathname.split("/").filter(Boolean)[1] || "";
  }
  set rkey(v) {
    const parts = this.pathname.split("/").filter(Boolean);
    if (!parts[0])
      parts[0] = "undefined";
    parts[1] = v;
    this.pathname = parts.join("/");
  }
  get href() {
    return this.toString();
  }
  toString() {
    let path = this.pathname || "/";
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    let qs = this.searchParams.toString();
    if (qs && !qs.startsWith("?")) {
      qs = `?${qs}`;
    }
    let hash = this.hash;
    if (hash && !hash.startsWith("#")) {
      hash = `#${hash}`;
    }
    return `at://${this.host}${path}${qs}${hash}`;
  }
};
function parse(str) {
  const match = ATP_URI_REGEX.exec(str);
  if (match) {
    return {
      hash: match[5] || "",
      host: match[2] || "",
      pathname: match[3] || "",
      searchParams: new URLSearchParams(match[4] || "")
    };
  }
  return void 0;
}
function parseRelative(str) {
  const match = RELATIVE_REGEX.exec(str);
  if (match) {
    return {
      hash: match[3] || "",
      pathname: match[1] || "",
      searchParams: new URLSearchParams(match[2] || "")
    };
  }
  return void 0;
}

// ../../node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array2, separator = " | ") {
    return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params2) => {
  const { data, path, errorMaps, issueData } = params2;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (typeof value.value !== "undefined" || pair.alwaysSet) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params2) {
  if (!params2)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params2;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def2) {
    this.spa = this.safeParseAsync;
    this._def = def2;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params2) {
    const result = this.safeParse(data, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params2) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params2 === null || params2 === void 0 ? void 0 : params2.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params2 === null || params2 === void 0 ? void 0 : params2.errorMap
      },
      path: (params2 === null || params2 === void 0 ? void 0 : params2.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params2) {
    const result = await this.safeParseAsync(data, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params2) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params2 === null || params2 === void 0 ? void 0 : params2.errorMap,
        async: true
      },
      path: (params2 === null || params2 === void 0 ? void 0 : params2.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def2) {
    const defaultValueFunc = typeof def2 === "function" ? def2 : () => def2;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def2) {
    const catchValueFunc = typeof def2 === "function" ? def2 : () => def2;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[a-z][a-z0-9]*$/;
var ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
var emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class extends ZodType {
  constructor() {
    super(...arguments);
    this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
    this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
    this.trim = () => new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
    this.toLowerCase = () => new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
    this.toUpperCase = () => new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params2) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params2 === null || params2 === void 0 ? void 0 : params2.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params2)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params2) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params2 === null || params2 === void 0 ? void 0 : params2.coerce) || false,
    ...processCreateParams(params2)
  });
};
var ZodBigInt = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params2) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params2 === null || params2 === void 0 ? void 0 : params2.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params2)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params2) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params2 === null || params2 === void 0 ? void 0 : params2.coerce) || false,
    ...processCreateParams(params2)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params2) => {
  return new ZodDate({
    checks: [],
    coerce: (params2 === null || params2 === void 0 ? void 0 : params2.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params2)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params2) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params2)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params2) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params2)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params2) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params2)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params2) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params2)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params2) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params2)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params2) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params2)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params2) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params2)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def2 = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def2.exactLength !== null) {
      const tooBig = ctx.data.length > def2.exactLength.value;
      const tooSmall = ctx.data.length < def2.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def2.exactLength.value : void 0,
          maximum: tooBig ? def2.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def2.exactLength.message
        });
        status.dirty();
      }
    }
    if (def2.minLength !== null) {
      if (ctx.data.length < def2.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def2.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def2.minLength.message
        });
        status.dirty();
      }
    }
    if (def2.maxLength !== null) {
      if (ctx.data.length > def2.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def2.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def2.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def2.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def2.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema2, params2) => {
  return new ZodArray({
    type: schema2,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params2)
  });
};
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema2.shape) {
      const fieldSchema = schema2.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return new ZodArray({
      ...schema2._def,
      type: deepPartialify(schema2.element)
    });
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema2) {
    return this.augment({ [key]: schema2 });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params2) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
ZodObject.strictCreate = (shape, params2) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
ZodObject.lazycreate = (shape, params2) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params2)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params2) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params2)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return Object.keys(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params2) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params2)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params2) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params2)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema2 = this._def.items[itemIndex] || this._def.rest;
      if (!schema2)
        return null;
      return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas2, params2) => {
  if (!Array.isArray(schemas2)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas2,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params2)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params2) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params2)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def2 = this._def;
    if (def2.minSize !== null) {
      if (ctx.data.size < def2.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def2.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def2.minSize.message
        });
        status.dirty();
      }
    }
    if (def2.maxSize !== null) {
      if (ctx.data.size > def2.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def2.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def2.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params2) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params2)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params2 = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      return OK(async (...args) => {
        const error = new ZodError([]);
        const parsedArgs = await this._def.args.parseAsync(args, params2).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await fn(...parsedArgs);
        const parsedReturns = await this._def.returns._def.type.parseAsync(result, params2).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      return OK((...args) => {
        const parsedArgs = this._def.args.safeParse(args, params2);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = fn(...parsedArgs.data);
        const parsedReturns = this._def.returns.safeParse(result, params2);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params2) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params2)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params2) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params2)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params2) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params2)
  });
};
function createZodEnum(values, params2) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params2)
  });
}
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return ZodEnum.create(values);
  }
  exclude(values) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params2) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params2)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema2, params2) => {
  return new ZodPromise({
    type: schema2,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params2)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data);
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base3 = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base3))
          return base3;
        const result = effect.transform(base3.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base3) => {
          if (!isValid(base3))
            return base3;
          return Promise.resolve(effect.transform(base3.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema2, effect, params2) => {
  return new ZodEffects({
    schema: schema2,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params2)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema2, params2) => {
  return new ZodEffects({
    schema: schema2,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params2)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params2) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params2)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params2) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params2)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params2) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params2.default === "function" ? params2.default : () => params2.default,
    ...processCreateParams(params2)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params2) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params2.catch === "function" ? params2.catch : () => params2.catch,
    ...processCreateParams(params2)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params2) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params2)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var custom = (check, params2 = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params2 === "function" ? params2(data) : typeof params2 === "string" ? { message: params2 } : params2;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params2 = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params2);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// ../common-web/src/check.ts
var check_exports = {};
__export(check_exports, {
  assure: () => assure,
  is: () => is,
  isObject: () => isObject
});
var is = (obj, def2) => {
  return def2.safeParse(obj).success;
};
var assure = (def2, obj) => {
  return def2.parse(obj);
};
var isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};

// ../../node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}
var decode = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// ../../node_modules/multiformats/esm/src/varint.js
var decode2 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// ../../node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce2 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);

// ../../node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes2, 0);
  encodeTo(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes2);
};
var decode3 = (multihash) => {
  const bytes2 = coerce2(multihash);
  const [code2, sizeOffset] = decode2(bytes2);
  const [size, digestOffset] = decode2(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes2);
};
var equals2 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
  }
};
var Digest = class {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};

// ../../node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// ../../node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// ../../node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder2) {
    return or(this, decoder2);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder2) {
    return or(this, decoder2);
  }
  decode(input) {
    const prefix = input[0];
    const decoder2 = this.decoders[prefix];
    if (decoder2) {
      return decoder2.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode5,
    decode: (text) => coerce2(decode6(text))
  });
};
var decode4 = (string3, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode2 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode2(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode4(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// ../../node_modules/multiformats/esm/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// ../../node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// ../../node_modules/multiformats/esm/src/cid.js
var CID = class {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes2, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes2, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID(version2, code2, multihash, bytes2 || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode3(multihash);
      return CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return CID.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid2, remainder] = CID.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid2;
  }
  static decodeFirst(bytes2) {
    const specs = CID.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce2(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid2 = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid2,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode2(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes(source, base3);
    const cid2 = CID.decode(bytes2);
    cid2._baseCache.set(prefix, source);
    return cid2;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder2 = base3 || base32;
      return [
        base32.prefix,
        decoder2.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid2 = cache.get(prefix);
  if (cid2 == null) {
    const cid3 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid3);
    return cid3;
  } else {
    return cid2;
  }
};
var toStringV1 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid2 = cache.get(prefix);
  if (cid2 == null) {
    const cid3 = base3.encode(bytes2);
    cache.set(prefix, cid3);
    return cid3;
  } else {
    return cid2;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes2, 0);
  encodeTo(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// ../../node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// ../../node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// ../../node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// ../../node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// ../../node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// ../../node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// ../../node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// ../../node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode3(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode5(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode3,
  decode: decode5
});

// ../../node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// ../../node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
var Hasher = class {
  constructor(name2, code2, encode5) {
    this.name = name2;
    this.code = code2;
    this.encode = encode5;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// ../../node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// ../../node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce2;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// ../../node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// ../../node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// ../../node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder2 = new TextDecoder("utf8");
  return "u" + decoder2.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i = 0; i < buf.length; i++) {
    string3 += String.fromCharCode(buf[i]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// ../../node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string3, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.decoder.decode(`${base3.prefix}${string3}`);
}

// ../../node_modules/uint8arrays/esm/src/to-string.js
function toString2(array2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.encoder.encode(array2).substring(1);
}

// ../common-web/src/ipld.ts
var jsonToIpld = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => jsonToIpld(item));
  }
  if (val && typeof val === "object") {
    if (typeof val["$link"] === "string" && Object.keys(val).length === 1) {
      return CID.parse(val["$link"]);
    }
    if (typeof val["$bytes"] === "string" && Object.keys(val).length === 1) {
      return fromString2(val["$bytes"], "base64");
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = jsonToIpld(val[key]);
    }
    return toReturn;
  }
  return val;
};
var ipldToJson = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => ipldToJson(item));
  }
  if (val && typeof val === "object") {
    if (val instanceof Uint8Array) {
      return {
        $bytes: toString2(val, "base64")
      };
    }
    if (CID.asCID(val)) {
      return {
        $link: val.toString()
      };
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = ipldToJson(val[key]);
    }
    return toReturn;
  }
  return val;
};

// ../common-web/src/types.ts
var cidSchema = z.any().refine((obj) => CID.asCID(obj) !== null, {
  message: "Not a CID"
}).transform((obj) => CID.asCID(obj));
var schema = {
  cid: cidSchema,
  bytes: z.instanceof(Uint8Array),
  string: z.string(),
  array: z.array(z.unknown()),
  map: z.record(z.string(), z.unknown()),
  unknown: z.unknown()
};
var def = {
  cid: {
    name: "cid",
    schema: schema.cid
  },
  bytes: {
    name: "bytes",
    schema: schema.bytes
  },
  string: {
    name: "string",
    schema: schema.string
  },
  map: {
    name: "map",
    schema: schema.map
  },
  unknown: {
    name: "unknown",
    schema: schema.unknown
  }
};

// ../common-web/src/times.ts
var SECOND = 1e3;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

// ../common-web/src/strings.ts
var import_graphemer = __toESM(require_lib());
var utf8Len = (str) => {
  return new TextEncoder().encode(str).byteLength;
};
var graphemeLen = (str) => {
  const splitter = new import_graphemer.default();
  return splitter.countGraphemes(str);
};
var parseLanguage = (langTag) => {
  const parsed = langTag.match(bcp47Regexp);
  if (!parsed?.groups)
    return null;
  const parts = parsed.groups;
  return {
    grandfathered: parts.grandfathered,
    language: parts.language,
    extlang: parts.extlang,
    script: parts.script,
    region: parts.region,
    variant: parts.variant,
    extension: parts.extension,
    privateUse: parts.privateUseA || parts.privateUseB
  };
};
var validateLanguage = (langTag) => {
  return bcp47Regexp.test(langTag);
};
var bcp47Regexp = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUseA>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUseB>x(-[A-Za-z0-9]{1,8})+))$/;

// ../lexicon/src/validators/formats.ts
var import_iso_datestring_validator = __toESM(require_dist());
function datetime(path, value) {
  try {
    if (!(0, import_iso_datestring_validator.isValidISODateString)(value)) {
      throw new Error();
    }
  } catch {
    return {
      success: false,
      error: new ValidationError(
        `${path} must be an iso8601 formatted datetime`
      )
    };
  }
  return { success: true, value };
}
function uri(path, value) {
  const isUri = value.match(/^\w+:(?:\/\/)?[^\s/][^\s]*$/) !== null;
  if (!isUri) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a uri`)
    };
  }
  return { success: true, value };
}
function atUri(path, value) {
  try {
    ensureValidAtUri(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid at-uri`)
    };
  }
  return { success: true, value };
}
function did(path, value) {
  try {
    ensureValidDid(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid did`)
    };
  }
  return { success: true, value };
}
function handle(path, value) {
  try {
    ensureValidHandle(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid handle`)
    };
  }
  return { success: true, value };
}
function atIdentifier(path, value) {
  const isDid = did(path, value);
  if (!isDid.success) {
    const isHandle2 = handle(path, value);
    if (!isHandle2.success) {
      return {
        success: false,
        error: new ValidationError(`${path} must be a valid did or a handle`)
      };
    }
  }
  return { success: true, value };
}
function nsid(path, value) {
  try {
    ensureValidNsid(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a valid nsid`)
    };
  }
  return { success: true, value };
}
function cid(path, value) {
  try {
    CID.parse(value);
  } catch {
    return {
      success: false,
      error: new ValidationError(`${path} must be a cid string`)
    };
  }
  return { success: true, value };
}
function language(path, value) {
  if (validateLanguage(value)) {
    return { success: true, value };
  }
  return {
    success: false,
    error: new ValidationError(
      `${path} must be a well-formed BCP 47 language tag`
    )
  };
}

// ../lexicon/src/validators/primitives.ts
function validate(lexicons2, path, def2, value) {
  switch (def2.type) {
    case "boolean":
      return boolean(lexicons2, path, def2, value);
    case "integer":
      return integer(lexicons2, path, def2, value);
    case "string":
      return string2(lexicons2, path, def2, value);
    case "bytes":
      return bytes(lexicons2, path, def2, value);
    case "cid-link":
      return cidLink(lexicons2, path, def2, value);
    case "unknown":
      return unknown(lexicons2, path, def2, value);
    default:
      return {
        success: false,
        error: new ValidationError(`Unexpected lexicon type: ${def2.type}`)
      };
  }
}
function boolean(lexicons2, path, def2, value) {
  def2 = def2;
  const type = typeof value;
  if (type === "undefined") {
    if (typeof def2.default === "boolean") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be a boolean`)
    };
  } else if (type !== "boolean") {
    return {
      success: false,
      error: new ValidationError(`${path} must be a boolean`)
    };
  }
  if (typeof def2.const === "boolean") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  return { success: true, value };
}
function integer(lexicons2, path, def2, value) {
  def2 = def2;
  const type = typeof value;
  if (type === "undefined") {
    if (typeof def2.default === "number") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be an integer`)
    };
  } else if (!Number.isInteger(value)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be an integer`)
    };
  }
  if (typeof def2.const === "number") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  if (Array.isArray(def2.enum)) {
    if (!def2.enum.includes(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be one of (${def2.enum.join("|")})`
        )
      };
    }
  }
  if (typeof def2.maximum === "number") {
    if (value > def2.maximum) {
      return {
        success: false,
        error: new ValidationError(
          `${path} can not be greater than ${def2.maximum}`
        )
      };
    }
  }
  if (typeof def2.minimum === "number") {
    if (value < def2.minimum) {
      return {
        success: false,
        error: new ValidationError(
          `${path} can not be less than ${def2.minimum}`
        )
      };
    }
  }
  return { success: true, value };
}
function string2(lexicons2, path, def2, value) {
  def2 = def2;
  if (typeof value === "undefined") {
    if (typeof def2.default === "string") {
      return { success: true, value: def2.default };
    }
    return {
      success: false,
      error: new ValidationError(`${path} must be a string`)
    };
  } else if (typeof value !== "string") {
    return {
      success: false,
      error: new ValidationError(`${path} must be a string`)
    };
  }
  if (typeof def2.const === "string") {
    if (value !== def2.const) {
      return {
        success: false,
        error: new ValidationError(`${path} must be ${def2.const}`)
      };
    }
  }
  if (Array.isArray(def2.enum)) {
    if (!def2.enum.includes(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be one of (${def2.enum.join("|")})`
        )
      };
    }
  }
  if (typeof def2.maxLength === "number") {
    if (utf8Len(value) > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be longer than ${def2.maxLength} characters`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (utf8Len(value) < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be shorter than ${def2.minLength} characters`
        )
      };
    }
  }
  if (typeof def2.maxGraphemes === "number") {
    if (graphemeLen(value) > def2.maxGraphemes) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be longer than ${def2.maxGraphemes} graphemes`
        )
      };
    }
  }
  if (typeof def2.minGraphemes === "number") {
    if (graphemeLen(value) < def2.minGraphemes) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be shorter than ${def2.minGraphemes} graphemes`
        )
      };
    }
  }
  if (typeof def2.format === "string") {
    switch (def2.format) {
      case "datetime":
        return datetime(path, value);
      case "uri":
        return uri(path, value);
      case "at-uri":
        return atUri(path, value);
      case "did":
        return did(path, value);
      case "handle":
        return handle(path, value);
      case "at-identifier":
        return atIdentifier(path, value);
      case "nsid":
        return nsid(path, value);
      case "cid":
        return cid(path, value);
      case "language":
        return language(path, value);
    }
  }
  return { success: true, value };
}
function bytes(lexicons2, path, def2, value) {
  def2 = def2;
  if (!value || !(value instanceof Uint8Array)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a byte array`)
    };
  }
  if (typeof def2.maxLength === "number") {
    if (value.byteLength > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be larger than ${def2.maxLength} bytes`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (value.byteLength < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not be smaller than ${def2.minLength} bytes`
        )
      };
    }
  }
  return { success: true, value };
}
function cidLink(lexicons2, path, def2, value) {
  if (CID.asCID(value) === null) {
    return {
      success: false,
      error: new ValidationError(`${path} must be a CID`)
    };
  }
  return { success: true, value };
}
function unknown(lexicons2, path, def2, value) {
  if (!value || typeof value !== "object") {
    return {
      success: false,
      error: new ValidationError(`${path} must be an object`)
    };
  }
  return { success: true, value };
}

// ../lexicon/src/blob-refs.ts
var typedJsonBlobRef = z.object({
  $type: z.literal("blob"),
  ref: schema.cid,
  mimeType: z.string(),
  size: z.number()
}).strict();
var untypedJsonBlobRef = z.object({
  cid: z.string(),
  mimeType: z.string()
}).strict();
var jsonBlobRef = z.union([typedJsonBlobRef, untypedJsonBlobRef]);
var BlobRef = class {
  constructor(ref, mimeType, size, original) {
    this.ref = ref;
    this.mimeType = mimeType;
    this.size = size;
    this.original = original ?? {
      $type: "blob",
      ref,
      mimeType,
      size
    };
  }
  static asBlobRef(obj) {
    if (check_exports.is(obj, jsonBlobRef)) {
      return BlobRef.fromJsonRef(obj);
    }
    return null;
  }
  static fromJsonRef(json) {
    if (check_exports.is(json, typedJsonBlobRef)) {
      return new BlobRef(json.ref, json.mimeType, json.size);
    } else {
      return new BlobRef(CID.parse(json.cid), json.mimeType, -1, json);
    }
  }
  ipld() {
    return {
      $type: "blob",
      ref: this.ref,
      mimeType: this.mimeType,
      size: this.size
    };
  }
  toJSON() {
    return ipldToJson(this.ipld());
  }
};

// ../lexicon/src/validators/blob.ts
function blob(lexicons2, path, def2, value) {
  if (!value || !(value instanceof BlobRef)) {
    return {
      success: false,
      error: new ValidationError(`${path} should be a blob ref`)
    };
  }
  return { success: true, value };
}

// ../lexicon/src/validators/complex.ts
function validate2(lexicons2, path, def2, value) {
  switch (def2.type) {
    case "boolean":
      return boolean(lexicons2, path, def2, value);
    case "integer":
      return integer(lexicons2, path, def2, value);
    case "string":
      return string2(lexicons2, path, def2, value);
    case "bytes":
      return bytes(lexicons2, path, def2, value);
    case "cid-link":
      return cidLink(lexicons2, path, def2, value);
    case "unknown":
      return unknown(lexicons2, path, def2, value);
    case "object":
      return object(lexicons2, path, def2, value);
    case "array":
      return array(lexicons2, path, def2, value);
    case "blob":
      return blob(lexicons2, path, def2, value);
    default:
      return {
        success: false,
        error: new ValidationError(`Unexpected lexicon type: ${def2.type}`)
      };
  }
}
function array(lexicons2, path, def2, value) {
  if (!Array.isArray(value)) {
    return {
      success: false,
      error: new ValidationError(`${path} must be an array`)
    };
  }
  if (typeof def2.maxLength === "number") {
    if (value.length > def2.maxLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not have more than ${def2.maxLength} elements`
        )
      };
    }
  }
  if (typeof def2.minLength === "number") {
    if (value.length < def2.minLength) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must not have fewer than ${def2.minLength} elements`
        )
      };
    }
  }
  const itemsDef = def2.items;
  for (let i = 0; i < value.length; i++) {
    const itemValue = value[i];
    const itemPath = `${path}/${i}`;
    const res = validateOneOf(lexicons2, itemPath, itemsDef, itemValue);
    if (!res.success) {
      return res;
    }
  }
  return { success: true, value };
}
function object(lexicons2, path, def2, value) {
  def2 = def2;
  if (!value || typeof value !== "object") {
    return {
      success: false,
      error: new ValidationError(`${path} must be an object`)
    };
  }
  const requiredProps = new Set(def2.required);
  const nullableProps = new Set(def2.nullable);
  let resultValue = value;
  if (typeof def2.properties === "object") {
    for (const key in def2.properties) {
      if (value[key] === null && nullableProps.has(key)) {
        continue;
      }
      const propDef = def2.properties[key];
      const propPath = `${path}/${key}`;
      const validated = validateOneOf(lexicons2, propPath, propDef, value[key]);
      const propValue = validated.success ? validated.value : value[key];
      const propIsUndefined = typeof propValue === "undefined";
      if (propIsUndefined && requiredProps.has(key)) {
        return {
          success: false,
          error: new ValidationError(`${path} must have the property "${key}"`)
        };
      } else if (!propIsUndefined && !validated.success) {
        return validated;
      }
      if (propValue !== value[key]) {
        if (resultValue === value) {
          resultValue = { ...value };
        }
        resultValue[key] = propValue;
      }
    }
  }
  return { success: true, value: resultValue };
}

// ../lexicon/src/util.ts
function toLexUri(str, baseUri) {
  if (str.split("#").length > 2) {
    throw new Error("Uri can only have one hash segment");
  }
  if (str.startsWith("lex:")) {
    return str;
  }
  if (str.startsWith("#")) {
    if (!baseUri) {
      throw new Error(`Unable to resolve uri without anchor: ${str}`);
    }
    return `${baseUri}${str}`;
  }
  return `lex:${str}`;
}
function validateOneOf(lexicons2, path, def2, value, mustBeObj = false) {
  let error;
  let concreteDefs;
  if (def2.type === "union") {
    if (!isDiscriminatedObject(value)) {
      return {
        success: false,
        error: new ValidationError(
          `${path} must be an object which includes the "$type" property`
        )
      };
    }
    if (!refsContainType(def2.refs, value.$type)) {
      if (def2.closed) {
        return {
          success: false,
          error: new ValidationError(
            `${path} $type must be one of ${def2.refs.join(", ")}`
          )
        };
      }
      return { success: true, value };
    } else {
      concreteDefs = toConcreteTypes(lexicons2, {
        type: "ref",
        ref: value.$type
      });
    }
  } else {
    concreteDefs = toConcreteTypes(lexicons2, def2);
  }
  for (const concreteDef of concreteDefs) {
    const result = mustBeObj ? object(lexicons2, path, concreteDef, value) : validate2(lexicons2, path, concreteDef, value);
    if (result.success) {
      return result;
    }
    error ?? (error = result.error);
  }
  if (concreteDefs.length > 1) {
    return {
      success: false,
      error: new ValidationError(
        `${path} did not match any of the expected definitions`
      )
    };
  }
  return { success: false, error };
}
function assertValidOneOf(lexicons2, path, def2, value, mustBeObj = false) {
  const res = validateOneOf(lexicons2, path, def2, value, mustBeObj);
  if (!res.success)
    throw res.error;
  return res.value;
}
function toConcreteTypes(lexicons2, def2) {
  if (def2.type === "ref") {
    return [lexicons2.getDefOrThrow(def2.ref)];
  } else if (def2.type === "union") {
    return def2.refs.map((ref) => lexicons2.getDefOrThrow(ref)).flat();
  } else {
    return [def2];
  }
}
function requiredPropertiesRefinement(object2, ctx) {
  if (object2.required === void 0) {
    return;
  }
  if (!Array.isArray(object2.required)) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      received: typeof object2.required,
      expected: "array"
    });
    return;
  }
  if (object2.properties === void 0) {
    if (object2.required.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Required fields defined but no properties defined`
      });
    }
    return;
  }
  for (const field of object2.required) {
    if (object2.properties[field] === void 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Required field "${field}" not defined`
      });
    }
  }
}
var refsContainType = (refs, type) => {
  const lexUri = toLexUri(type);
  if (refs.includes(lexUri)) {
    return true;
  }
  if (lexUri.endsWith("#main")) {
    return refs.includes(lexUri.replace("#main", ""));
  } else {
    return refs.includes(lexUri + "#main");
  }
};

// ../lexicon/src/types.ts
var lexBoolean = z.object({
  type: z.literal("boolean"),
  description: z.string().optional(),
  default: z.boolean().optional(),
  const: z.boolean().optional()
}).strict();
var lexInteger = z.object({
  type: z.literal("integer"),
  description: z.string().optional(),
  default: z.number().int().optional(),
  minimum: z.number().int().optional(),
  maximum: z.number().int().optional(),
  enum: z.number().int().array().optional(),
  const: z.number().int().optional()
}).strict();
var lexStringFormat = z.enum([
  "datetime",
  "uri",
  "at-uri",
  "did",
  "handle",
  "at-identifier",
  "nsid",
  "cid",
  "language"
]);
var lexString = z.object({
  type: z.literal("string"),
  format: lexStringFormat.optional(),
  description: z.string().optional(),
  default: z.string().optional(),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),
  minGraphemes: z.number().int().optional(),
  maxGraphemes: z.number().int().optional(),
  enum: z.string().array().optional(),
  const: z.string().optional(),
  knownValues: z.string().array().optional()
}).strict();
var lexUnknown = z.object({
  type: z.literal("unknown"),
  description: z.string().optional()
}).strict();
var lexPrimitive = z.discriminatedUnion("type", [
  lexBoolean,
  lexInteger,
  lexString,
  lexUnknown
]);
var lexBytes = z.object({
  type: z.literal("bytes"),
  description: z.string().optional(),
  maxLength: z.number().optional(),
  minLength: z.number().optional()
}).strict();
var lexCidLink = z.object({
  type: z.literal("cid-link"),
  description: z.string().optional()
}).strict();
var lexIpldType = z.discriminatedUnion("type", [lexBytes, lexCidLink]);
var lexRef = z.object({
  type: z.literal("ref"),
  description: z.string().optional(),
  ref: z.string()
}).strict();
var lexRefUnion = z.object({
  type: z.literal("union"),
  description: z.string().optional(),
  refs: z.string().array(),
  closed: z.boolean().optional()
}).strict();
var lexRefVariant = z.discriminatedUnion("type", [lexRef, lexRefUnion]);
var lexBlob = z.object({
  type: z.literal("blob"),
  description: z.string().optional(),
  accept: z.string().array().optional(),
  maxSize: z.number().optional()
}).strict();
var lexArray = z.object({
  type: z.literal("array"),
  description: z.string().optional(),
  items: z.union([lexPrimitive, lexIpldType, lexBlob, lexRefVariant]),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional()
}).strict();
var lexPrimitiveArray = lexArray.merge(
  z.object({
    items: lexPrimitive
  }).strict()
);
var lexToken = z.object({
  type: z.literal("token"),
  description: z.string().optional()
}).strict();
var lexObject = z.object({
  type: z.literal("object"),
  description: z.string().optional(),
  required: z.string().array().optional(),
  nullable: z.string().array().optional(),
  properties: z.record(
    z.union([lexRefVariant, lexIpldType, lexArray, lexBlob, lexPrimitive])
  ).optional()
}).strict().superRefine(requiredPropertiesRefinement);
var lexXrpcParameters = z.object({
  type: z.literal("params"),
  description: z.string().optional(),
  required: z.string().array().optional(),
  properties: z.record(z.union([lexPrimitive, lexPrimitiveArray]))
}).strict().superRefine(requiredPropertiesRefinement);
var lexXrpcBody = z.object({
  description: z.string().optional(),
  encoding: z.string(),
  schema: z.union([lexRefVariant, lexObject]).optional()
}).strict();
var lexXrpcSubscriptionMessage = z.object({
  description: z.string().optional(),
  schema: z.union([lexRefVariant, lexObject]).optional()
}).strict();
var lexXrpcError = z.object({
  name: z.string(),
  description: z.string().optional()
}).strict();
var lexXrpcQuery = z.object({
  type: z.literal("query"),
  description: z.string().optional(),
  parameters: lexXrpcParameters.optional(),
  output: lexXrpcBody.optional(),
  errors: lexXrpcError.array().optional()
}).strict();
var lexXrpcProcedure = z.object({
  type: z.literal("procedure"),
  description: z.string().optional(),
  parameters: lexXrpcParameters.optional(),
  input: lexXrpcBody.optional(),
  output: lexXrpcBody.optional(),
  errors: lexXrpcError.array().optional()
}).strict();
var lexXrpcSubscription = z.object({
  type: z.literal("subscription"),
  description: z.string().optional(),
  parameters: lexXrpcParameters.optional(),
  message: lexXrpcSubscriptionMessage.optional(),
  errors: lexXrpcError.array().optional()
}).strict();
var lexRecord = z.object({
  type: z.literal("record"),
  description: z.string().optional(),
  key: z.string().optional(),
  record: lexObject
}).strict();
var lexUserType = z.custom(
  (val) => {
    if (!val || typeof val !== "object") {
      return;
    }
    if (val["type"] === void 0) {
      return;
    }
    switch (val["type"]) {
      case "record":
        return lexRecord.parse(val);
      case "query":
        return lexXrpcQuery.parse(val);
      case "procedure":
        return lexXrpcProcedure.parse(val);
      case "subscription":
        return lexXrpcSubscription.parse(val);
      case "blob":
        return lexBlob.parse(val);
      case "array":
        return lexArray.parse(val);
      case "token":
        return lexToken.parse(val);
      case "object":
        return lexObject.parse(val);
      case "boolean":
        return lexBoolean.parse(val);
      case "integer":
        return lexInteger.parse(val);
      case "string":
        return lexString.parse(val);
      case "bytes":
        return lexBytes.parse(val);
      case "cid-link":
        return lexCidLink.parse(val);
      case "unknown":
        return lexUnknown.parse(val);
    }
  },
  (val) => {
    if (!val || typeof val !== "object") {
      return {
        message: "Must be an object",
        fatal: true
      };
    }
    if (val["type"] === void 0) {
      return {
        message: "Must have a type",
        fatal: true
      };
    }
    return {
      message: `Invalid type: ${val["type"]} must be one of: record, query, procedure, subscription, blob, array, token, object, boolean, integer, string, bytes, cid-link, unknown`,
      fatal: true
    };
  }
);
var lexiconDoc = z.object({
  lexicon: z.literal(1),
  id: z.string().refine((v) => NSID.isValid(v), {
    message: "Must be a valid NSID"
  }),
  revision: z.number().optional(),
  description: z.string().optional(),
  defs: z.record(lexUserType)
}).strict().superRefine((doc, ctx) => {
  for (const defId in doc.defs) {
    const def2 = doc.defs[defId];
    if (defId !== "main" && (def2.type === "record" || def2.type === "procedure" || def2.type === "query" || def2.type === "subscription")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Records, procedures, queries, and subscriptions must be the main definition.`
      });
    }
  }
});
function isObj(obj) {
  return obj !== null && typeof obj === "object";
}
function hasProp(data, prop) {
  return prop in data;
}
var discriminatedObject = z.object({ $type: z.string() });
function isDiscriminatedObject(value) {
  return discriminatedObject.safeParse(value).success;
}
var LexiconDocMalformedError = class extends Error {
  constructor(message, schemaDef, issues) {
    super(message);
    this.schemaDef = schemaDef;
    this.issues = issues;
    this.schemaDef = schemaDef;
    this.issues = issues;
  }
};
var ValidationError = class extends Error {
};
var InvalidLexiconError = class extends Error {
};
var LexiconDefNotFoundError = class extends Error {
};

// ../lexicon/src/validators/xrpc.ts
function params(lexicons2, path, def2, val) {
  const value = val && typeof val === "object" ? val : {};
  const requiredProps = new Set(def2.required ?? []);
  let resultValue = value;
  if (typeof def2.properties === "object") {
    for (const key in def2.properties) {
      const propDef = def2.properties[key];
      const validated = propDef.type === "array" ? array(lexicons2, key, propDef, value[key]) : validate(lexicons2, key, propDef, value[key]);
      const propValue = validated.success ? validated.value : value[key];
      const propIsUndefined = typeof propValue === "undefined";
      if (propIsUndefined && requiredProps.has(key)) {
        return {
          success: false,
          error: new ValidationError(`${path} must have the property "${key}"`)
        };
      } else if (!propIsUndefined && !validated.success) {
        return validated;
      }
      if (propValue !== value[key]) {
        if (resultValue === value) {
          resultValue = { ...value };
        }
        resultValue[key] = propValue;
      }
    }
  }
  return { success: true, value: resultValue };
}

// ../lexicon/src/validation.ts
function assertValidRecord(lexicons2, def2, value) {
  const res = object(lexicons2, "Record", def2.record, value);
  if (!res.success)
    throw res.error;
  return res.value;
}
function assertValidXrpcParams(lexicons2, def2, value) {
  if (def2.parameters) {
    const res = params(lexicons2, "Params", def2.parameters, value);
    if (!res.success)
      throw res.error;
    return res.value;
  }
}
function assertValidXrpcInput(lexicons2, def2, value) {
  if (def2.input?.schema) {
    return assertValidOneOf(lexicons2, "Input", def2.input.schema, value, true);
  }
}
function assertValidXrpcOutput(lexicons2, def2, value) {
  if (def2.output?.schema) {
    return assertValidOneOf(lexicons2, "Output", def2.output.schema, value, true);
  }
}
function assertValidXrpcMessage(lexicons2, def2, value) {
  if (def2.message?.schema) {
    return assertValidOneOf(
      lexicons2,
      "Message",
      def2.message.schema,
      value,
      true
    );
  }
}

// ../lexicon/src/lexicons.ts
var Lexicons = class {
  constructor(docs) {
    this.docs = /* @__PURE__ */ new Map();
    this.defs = /* @__PURE__ */ new Map();
    if (docs?.length) {
      for (const doc of docs) {
        this.add(doc);
      }
    }
  }
  add(doc) {
    try {
      lexiconDoc.parse(doc);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new LexiconDocMalformedError(
          `Failed to parse schema definition ${doc.id}`,
          doc,
          e.issues
        );
      } else {
        throw e;
      }
    }
    const validatedDoc = doc;
    const uri2 = toLexUri(validatedDoc.id);
    if (this.docs.has(uri2)) {
      throw new Error(`${uri2} has already been registered`);
    }
    resolveRefUris(validatedDoc, uri2);
    this.docs.set(uri2, validatedDoc);
    for (const [defUri, def2] of iterDefs(validatedDoc)) {
      this.defs.set(defUri, def2);
    }
  }
  remove(uri2) {
    uri2 = toLexUri(uri2);
    const doc = this.docs.get(uri2);
    if (!doc) {
      throw new Error(`Unable to remove "${uri2}": does not exist`);
    }
    for (const [defUri, _def] of iterDefs(doc)) {
      this.defs.delete(defUri);
    }
    this.docs.delete(uri2);
  }
  get(uri2) {
    uri2 = toLexUri(uri2);
    return this.docs.get(uri2);
  }
  getDef(uri2) {
    uri2 = toLexUri(uri2);
    return this.defs.get(uri2);
  }
  getDefOrThrow(uri2, types) {
    const def2 = this.getDef(uri2);
    if (!def2) {
      throw new LexiconDefNotFoundError(`Lexicon not found: ${uri2}`);
    }
    if (types && !types.includes(def2.type)) {
      throw new InvalidLexiconError(
        `Not a ${types.join(" or ")} lexicon: ${uri2}`
      );
    }
    return def2;
  }
  validate(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["record", "object"]);
    if (!isObj(value)) {
      throw new ValidationError(`Value must be an object`);
    }
    if (def2.type === "record") {
      return object(this, "Record", def2.record, value);
    } else if (def2.type === "object") {
      return object(this, "Object", def2, value);
    } else {
      throw new InvalidLexiconError("Definition must be a record or object");
    }
  }
  assertValidRecord(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["record"]);
    if (!isObj(value)) {
      throw new ValidationError(`Record must be an object`);
    }
    if (!hasProp(value, "$type") || typeof value.$type !== "string") {
      throw new ValidationError(`Record/$type must be a string`);
    }
    const $type = value.$type || "";
    if (toLexUri($type) !== lexUri) {
      throw new ValidationError(
        `Invalid $type: must be ${lexUri}, got ${$type}`
      );
    }
    return assertValidRecord(this, def2, value);
  }
  assertValidXrpcParams(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, [
      "query",
      "procedure",
      "subscription"
    ]);
    return assertValidXrpcParams(
      this,
      def2,
      value
    );
  }
  assertValidXrpcInput(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["procedure"]);
    return assertValidXrpcInput(this, def2, value);
  }
  assertValidXrpcOutput(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["query", "procedure"]);
    return assertValidXrpcOutput(
      this,
      def2,
      value
    );
  }
  assertValidXrpcMessage(lexUri, value) {
    lexUri = toLexUri(lexUri);
    const def2 = this.getDefOrThrow(lexUri, ["subscription"]);
    return assertValidXrpcMessage(this, def2, value);
  }
  resolveLexUri(lexUri, ref) {
    lexUri = toLexUri(lexUri);
    return toLexUri(ref, lexUri);
  }
};
function* iterDefs(doc) {
  for (const defId in doc.defs) {
    yield [`lex:${doc.id}#${defId}`, doc.defs[defId]];
    if (defId === "main") {
      yield [`lex:${doc.id}`, doc.defs[defId]];
    }
  }
}
function resolveRefUris(obj, baseUri) {
  for (const k in obj) {
    if (obj.type === "ref") {
      obj.ref = toLexUri(obj.ref, baseUri);
    } else if (obj.type === "union") {
      obj.refs = obj.refs.map((ref) => toLexUri(ref, baseUri));
    } else if (Array.isArray(obj[k])) {
      obj[k] = obj[k].map((item) => {
        if (typeof item === "string") {
          return item.startsWith("#") ? toLexUri(item, baseUri) : item;
        } else if (item && typeof item === "object") {
          return resolveRefUris(item, baseUri);
        }
        return item;
      });
    } else if (obj[k] && typeof obj[k] === "object") {
      obj[k] = resolveRefUris(obj[k], baseUri);
    }
  }
  return obj;
}

// ../lexicon/src/serialize.ts
var lexToIpld = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => lexToIpld(item));
  }
  if (val && typeof val === "object") {
    if (val instanceof BlobRef) {
      return val.original;
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return val;
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = lexToIpld(val[key]);
    }
    return toReturn;
  }
  return val;
};
var ipldToLex = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => ipldToLex(item));
  }
  if (val && typeof val === "object") {
    if ((val["$type"] === "blob" || typeof val["cid"] === "string" && typeof val["mimeType"] === "string") && check_exports.is(val, jsonBlobRef)) {
      return BlobRef.fromJsonRef(val);
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return val;
    }
    const toReturn = {};
    for (const key of Object.keys(val)) {
      toReturn[key] = ipldToLex(val[key]);
    }
    return toReturn;
  }
  return val;
};
var lexToJson = (val) => {
  return ipldToJson(lexToIpld(val));
};
var stringifyLex = (val) => {
  return JSON.stringify(lexToJson(val));
};
var jsonToLex = (val) => {
  return ipldToLex(jsonToIpld(val));
};
var jsonStringToLex = (val) => {
  return jsonToLex(JSON.parse(val));
};

// ../xrpc/src/types.ts
var errorResponseBody = z.object({
  error: z.string().optional(),
  message: z.string().optional()
});
var ResponseType = /* @__PURE__ */ ((ResponseType2) => {
  ResponseType2[ResponseType2["Unknown"] = 1] = "Unknown";
  ResponseType2[ResponseType2["InvalidResponse"] = 2] = "InvalidResponse";
  ResponseType2[ResponseType2["Success"] = 200] = "Success";
  ResponseType2[ResponseType2["InvalidRequest"] = 400] = "InvalidRequest";
  ResponseType2[ResponseType2["AuthRequired"] = 401] = "AuthRequired";
  ResponseType2[ResponseType2["Forbidden"] = 403] = "Forbidden";
  ResponseType2[ResponseType2["XRPCNotSupported"] = 404] = "XRPCNotSupported";
  ResponseType2[ResponseType2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  ResponseType2[ResponseType2["RateLimitExceeded"] = 429] = "RateLimitExceeded";
  ResponseType2[ResponseType2["InternalServerError"] = 500] = "InternalServerError";
  ResponseType2[ResponseType2["MethodNotImplemented"] = 501] = "MethodNotImplemented";
  ResponseType2[ResponseType2["UpstreamFailure"] = 502] = "UpstreamFailure";
  ResponseType2[ResponseType2["NotEnoughResources"] = 503] = "NotEnoughResources";
  ResponseType2[ResponseType2["UpstreamTimeout"] = 504] = "UpstreamTimeout";
  return ResponseType2;
})(ResponseType || {});
var ResponseTypeNames = {
  [2 /* InvalidResponse */]: "InvalidResponse",
  [200 /* Success */]: "Success",
  [400 /* InvalidRequest */]: "InvalidRequest",
  [401 /* AuthRequired */]: "AuthenticationRequired",
  [403 /* Forbidden */]: "Forbidden",
  [404 /* XRPCNotSupported */]: "XRPCNotSupported",
  [413 /* PayloadTooLarge */]: "PayloadTooLarge",
  [429 /* RateLimitExceeded */]: "RateLimitExceeded",
  [500 /* InternalServerError */]: "InternalServerError",
  [501 /* MethodNotImplemented */]: "MethodNotImplemented",
  [502 /* UpstreamFailure */]: "UpstreamFailure",
  [503 /* NotEnoughResources */]: "NotEnoughResources",
  [504 /* UpstreamTimeout */]: "UpstreamTimeout"
};
var ResponseTypeStrings = {
  [2 /* InvalidResponse */]: "Invalid Response",
  [200 /* Success */]: "Success",
  [400 /* InvalidRequest */]: "Invalid Request",
  [401 /* AuthRequired */]: "Authentication Required",
  [403 /* Forbidden */]: "Forbidden",
  [404 /* XRPCNotSupported */]: "XRPC Not Supported",
  [413 /* PayloadTooLarge */]: "Payload Too Large",
  [429 /* RateLimitExceeded */]: "Rate Limit Exceeded",
  [500 /* InternalServerError */]: "Internal Server Error",
  [501 /* MethodNotImplemented */]: "Method Not Implemented",
  [502 /* UpstreamFailure */]: "Upstream Failure",
  [503 /* NotEnoughResources */]: "Not Enough Resources",
  [504 /* UpstreamTimeout */]: "Upstream Timeout"
};
var XRPCResponse = class {
  constructor(data, headers) {
    this.data = data;
    this.headers = headers;
    this.success = true;
  }
};
var XRPCError = class extends Error {
  constructor(status, error, message, headers) {
    super(message || error || ResponseTypeStrings[status]);
    this.status = status;
    this.error = error;
    this.success = false;
    if (!this.error) {
      this.error = ResponseTypeNames[status];
    }
    this.headers = headers;
  }
};
var XRPCInvalidResponseError = class extends XRPCError {
  constructor(lexiconNsid, validationError, responseBody) {
    super(
      2 /* InvalidResponse */,
      ResponseTypeStrings[2 /* InvalidResponse */],
      `The server gave an invalid response and may be out of date.`
    );
    this.lexiconNsid = lexiconNsid;
    this.validationError = validationError;
    this.responseBody = responseBody;
  }
};

// ../xrpc/src/util.ts
function getMethodSchemaHTTPMethod(schema2) {
  if (schema2.type === "procedure") {
    return "post";
  }
  return "get";
}
function constructMethodCallUri(nsid2, schema2, serviceUri, params2) {
  const uri2 = new URL(serviceUri);
  uri2.pathname = `/xrpc/${nsid2}`;
  if (params2) {
    for (const [key, value] of Object.entries(params2)) {
      const paramSchema = schema2.parameters?.properties?.[key];
      if (!paramSchema) {
        throw new Error(`Invalid query parameter: ${key}`);
      }
      if (value !== void 0) {
        if (paramSchema.type === "array") {
          const vals = [];
          vals.concat(value).forEach((val) => {
            uri2.searchParams.append(
              key,
              encodeQueryParam(paramSchema.items.type, val)
            );
          });
        } else {
          uri2.searchParams.set(key, encodeQueryParam(paramSchema.type, value));
        }
      }
    }
  }
  return uri2.toString();
}
function encodeQueryParam(type, value) {
  if (type === "string" || type === "unknown") {
    return String(value);
  }
  if (type === "float") {
    return String(Number(value));
  } else if (type === "integer") {
    return String(Number(value) | 0);
  } else if (type === "boolean") {
    return value ? "true" : "false";
  } else if (type === "datetime") {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  }
  throw new Error(`Unsupported query param type: ${type}`);
}
function normalizeHeaders(headers) {
  const normalized = {};
  for (const [header, value] of Object.entries(headers)) {
    normalized[header.toLowerCase()] = value;
  }
  return normalized;
}
function constructMethodCallHeaders(schema2, data, opts) {
  const headers = opts?.headers || {};
  if (schema2.type === "procedure") {
    if (opts?.encoding) {
      headers["Content-Type"] = opts.encoding;
    }
    if (data && typeof data === "object") {
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    }
  }
  return headers;
}
function encodeMethodCallBody(headers, data) {
  if (!headers["content-type"] || typeof data === "undefined") {
    return void 0;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (headers["content-type"].startsWith("text/")) {
    return new TextEncoder().encode(data.toString());
  }
  if (headers["content-type"].startsWith("application/json")) {
    return new TextEncoder().encode(stringifyLex(data));
  }
  return data;
}
function httpResponseCodeToEnum(status) {
  let resCode;
  if (status in ResponseType) {
    resCode = status;
  } else if (status >= 100 && status < 200) {
    resCode = 404 /* XRPCNotSupported */;
  } else if (status >= 200 && status < 300) {
    resCode = 200 /* Success */;
  } else if (status >= 300 && status < 400) {
    resCode = 404 /* XRPCNotSupported */;
  } else if (status >= 400 && status < 500) {
    resCode = 400 /* InvalidRequest */;
  } else {
    resCode = 500 /* InternalServerError */;
  }
  return resCode;
}
function httpResponseBodyParse(mimeType, data) {
  if (mimeType) {
    if (mimeType.includes("application/json") && data?.byteLength) {
      try {
        const str = new TextDecoder().decode(data);
        return jsonStringToLex(str);
      } catch (e) {
        throw new XRPCError(
          2 /* InvalidResponse */,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }
    if (mimeType.startsWith("text/") && data?.byteLength) {
      try {
        return new TextDecoder().decode(data);
      } catch (e) {
        throw new XRPCError(
          2 /* InvalidResponse */,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return data;
}

// ../xrpc/src/client.ts
var Client = class {
  constructor() {
    this.fetch = defaultFetchHandler;
    this.lex = new Lexicons();
  }
  async call(serviceUri, methodNsid, params2, data, opts) {
    return this.service(serviceUri).call(methodNsid, params2, data, opts);
  }
  service(serviceUri) {
    return new ServiceClient(this, serviceUri);
  }
  addLexicon(doc) {
    this.lex.add(doc);
  }
  addLexicons(docs) {
    for (const doc of docs) {
      this.addLexicon(doc);
    }
  }
  removeLexicon(uri2) {
    this.lex.remove(uri2);
  }
};
var ServiceClient = class {
  constructor(baseClient, serviceUri) {
    this.headers = {};
    this.baseClient = baseClient;
    this.uri = typeof serviceUri === "string" ? new URL(serviceUri) : serviceUri;
  }
  setHeader(key, value) {
    this.headers[key] = value;
  }
  unsetHeader(key) {
    delete this.headers[key];
  }
  async call(methodNsid, params2, data, opts) {
    const def2 = this.baseClient.lex.getDefOrThrow(methodNsid);
    if (!def2 || def2.type !== "query" && def2.type !== "procedure") {
      throw new Error(
        `Invalid lexicon: ${methodNsid}. Must be a query or procedure.`
      );
    }
    const httpMethod = getMethodSchemaHTTPMethod(def2);
    const httpUri = constructMethodCallUri(methodNsid, def2, this.uri, params2);
    const httpHeaders = constructMethodCallHeaders(def2, data, {
      headers: {
        ...this.headers,
        ...opts?.headers
      },
      encoding: opts?.encoding
    });
    const res = await this.baseClient.fetch(
      httpUri,
      httpMethod,
      httpHeaders,
      data
    );
    const resCode = httpResponseCodeToEnum(res.status);
    if (resCode === 200 /* Success */) {
      try {
        this.baseClient.lex.assertValidXrpcOutput(methodNsid, res.body);
      } catch (e) {
        if (e instanceof ValidationError) {
          throw new XRPCInvalidResponseError(methodNsid, e, res.body);
        } else {
          throw e;
        }
      }
      return new XRPCResponse(res.body, res.headers);
    } else {
      if (res.body && isErrorResponseBody(res.body)) {
        throw new XRPCError(
          resCode,
          res.body.error,
          res.body.message,
          res.headers
        );
      } else {
        throw new XRPCError(resCode);
      }
    }
  }
};
async function defaultFetchHandler(httpUri, httpMethod, httpHeaders, httpReqBody) {
  try {
    const headers = normalizeHeaders(httpHeaders);
    const reqInit = {
      method: httpMethod,
      headers,
      body: encodeMethodCallBody(headers, httpReqBody),
      duplex: "half"
    };
    const res = await fetch(httpUri, reqInit);
    const resBody = await res.arrayBuffer();
    return {
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body: httpResponseBodyParse(res.headers.get("content-type"), resBody)
    };
  } catch (e) {
    throw new XRPCError(1 /* Unknown */, String(e));
  }
}
function isErrorResponseBody(v) {
  return errorResponseBody.safeParse(v).success;
}

// ../xrpc/src/index.ts
var defaultInst = new Client();

// src/client/lexicons.ts
var schemaDict = {
  ComAtprotoAdminDefs: {
    lexicon: 1,
    id: "com.atproto.admin.defs",
    defs: {
      actionView: {
        type: "object",
        required: [
          "id",
          "action",
          "subject",
          "subjectBlobCids",
          "reason",
          "createdBy",
          "createdAt",
          "resolvedReportIds"
        ],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          },
          durationInHours: {
            type: "integer",
            description: "Indicates how long this action was meant to be in effect before automatically expiring."
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoRef",
              "lex:com.atproto.repo.strongRef"
            ]
          },
          subjectBlobCids: {
            type: "array",
            items: {
              type: "string"
            }
          },
          createLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          negateLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          reversal: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionReversal"
          },
          resolvedReportIds: {
            type: "array",
            items: {
              type: "integer"
            }
          }
        }
      },
      actionViewDetail: {
        type: "object",
        required: [
          "id",
          "action",
          "subject",
          "subjectBlobs",
          "reason",
          "createdBy",
          "createdAt",
          "resolvedReports"
        ],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          },
          durationInHours: {
            type: "integer",
            description: "Indicates how long this action was meant to be in effect before automatically expiring."
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoView",
              "lex:com.atproto.admin.defs#repoViewNotFound",
              "lex:com.atproto.admin.defs#recordView",
              "lex:com.atproto.admin.defs#recordViewNotFound"
            ]
          },
          subjectBlobs: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#blobView"
            }
          },
          createLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          negateLabelVals: {
            type: "array",
            items: {
              type: "string"
            }
          },
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          reversal: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionReversal"
          },
          resolvedReports: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#reportView"
            }
          }
        }
      },
      actionViewCurrent: {
        type: "object",
        required: ["id", "action"],
        properties: {
          id: {
            type: "integer"
          },
          action: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionType"
          },
          durationInHours: {
            type: "integer",
            description: "Indicates how long this action was meant to be in effect before automatically expiring."
          }
        }
      },
      actionReversal: {
        type: "object",
        required: ["reason", "createdBy", "createdAt"],
        properties: {
          reason: {
            type: "string"
          },
          createdBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      actionType: {
        type: "string",
        knownValues: [
          "lex:com.atproto.admin.defs#takedown",
          "lex:com.atproto.admin.defs#flag",
          "lex:com.atproto.admin.defs#acknowledge",
          "lex:com.atproto.admin.defs#escalate"
        ]
      },
      takedown: {
        type: "token",
        description: "Moderation action type: Takedown. Indicates that content should not be served by the PDS."
      },
      flag: {
        type: "token",
        description: "Moderation action type: Flag. Indicates that the content was reviewed and considered to violate PDS rules, but may still be served."
      },
      acknowledge: {
        type: "token",
        description: "Moderation action type: Acknowledge. Indicates that the content was reviewed and not considered to violate PDS rules."
      },
      escalate: {
        type: "token",
        description: "Moderation action type: Escalate. Indicates that the content has been flagged for additional review."
      },
      reportView: {
        type: "object",
        required: [
          "id",
          "reasonType",
          "subject",
          "reportedBy",
          "createdAt",
          "resolvedByActionIds"
        ],
        properties: {
          id: {
            type: "integer"
          },
          reasonType: {
            type: "ref",
            ref: "lex:com.atproto.moderation.defs#reasonType"
          },
          reason: {
            type: "string"
          },
          subjectRepoHandle: {
            type: "string"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoRef",
              "lex:com.atproto.repo.strongRef"
            ]
          },
          reportedBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          resolvedByActionIds: {
            type: "array",
            items: {
              type: "integer"
            }
          }
        }
      },
      reportViewDetail: {
        type: "object",
        required: [
          "id",
          "reasonType",
          "subject",
          "reportedBy",
          "createdAt",
          "resolvedByActions"
        ],
        properties: {
          id: {
            type: "integer"
          },
          reasonType: {
            type: "ref",
            ref: "lex:com.atproto.moderation.defs#reasonType"
          },
          reason: {
            type: "string"
          },
          subject: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#repoView",
              "lex:com.atproto.admin.defs#repoViewNotFound",
              "lex:com.atproto.admin.defs#recordView",
              "lex:com.atproto.admin.defs#recordViewNotFound"
            ]
          },
          reportedBy: {
            type: "string",
            format: "did"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          resolvedByActions: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#actionView"
            }
          }
        }
      },
      repoView: {
        type: "object",
        required: [
          "did",
          "handle",
          "relatedRecords",
          "indexedAt",
          "moderation"
        ],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          email: {
            type: "string"
          },
          relatedRecords: {
            type: "array",
            items: {
              type: "unknown"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          },
          invitedBy: {
            type: "ref",
            ref: "lex:com.atproto.server.defs#inviteCode"
          },
          invitesDisabled: {
            type: "boolean"
          },
          inviteNote: {
            type: "string"
          }
        }
      },
      repoViewDetail: {
        type: "object",
        required: [
          "did",
          "handle",
          "relatedRecords",
          "indexedAt",
          "moderation"
        ],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          email: {
            type: "string"
          },
          relatedRecords: {
            type: "array",
            items: {
              type: "unknown"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderationDetail"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          },
          invitedBy: {
            type: "ref",
            ref: "lex:com.atproto.server.defs#inviteCode"
          },
          invites: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            }
          },
          invitesDisabled: {
            type: "boolean"
          },
          inviteNote: {
            type: "string"
          }
        }
      },
      repoViewNotFound: {
        type: "object",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      repoRef: {
        type: "object",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      recordView: {
        type: "object",
        required: [
          "uri",
          "cid",
          "value",
          "blobCids",
          "indexedAt",
          "moderation",
          "repo"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          },
          blobCids: {
            type: "array",
            items: {
              type: "string",
              format: "cid"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          },
          repo: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoView"
          }
        }
      },
      recordViewDetail: {
        type: "object",
        required: [
          "uri",
          "cid",
          "value",
          "blobs",
          "indexedAt",
          "moderation",
          "repo"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          },
          blobs: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#blobView"
            }
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderationDetail"
          },
          repo: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoView"
          }
        }
      },
      recordViewNotFound: {
        type: "object",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      moderation: {
        type: "object",
        properties: {
          currentAction: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewCurrent"
          }
        }
      },
      moderationDetail: {
        type: "object",
        required: ["actions", "reports"],
        properties: {
          currentAction: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewCurrent"
          },
          actions: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#actionView"
            }
          },
          reports: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#reportView"
            }
          }
        }
      },
      blobView: {
        type: "object",
        required: ["cid", "mimeType", "size", "createdAt"],
        properties: {
          cid: {
            type: "string",
            format: "cid"
          },
          mimeType: {
            type: "string"
          },
          size: {
            type: "integer"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          details: {
            type: "union",
            refs: [
              "lex:com.atproto.admin.defs#imageDetails",
              "lex:com.atproto.admin.defs#videoDetails"
            ]
          },
          moderation: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#moderation"
          }
        }
      },
      imageDetails: {
        type: "object",
        required: ["width", "height"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          }
        }
      },
      videoDetails: {
        type: "object",
        required: ["width", "height", "length"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          },
          length: {
            type: "integer"
          }
        }
      }
    }
  },
  ComAtprotoAdminDisableAccountInvites: {
    lexicon: 1,
    id: "com.atproto.admin.disableAccountInvites",
    defs: {
      main: {
        type: "procedure",
        description: "Disable an account from receiving new invite codes, but does not invalidate existing codes",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["account"],
            properties: {
              account: {
                type: "string",
                format: "did"
              },
              note: {
                type: "string",
                description: "Additionally add a note describing why the invites were disabled"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminDisableInviteCodes: {
    lexicon: 1,
    id: "com.atproto.admin.disableInviteCodes",
    defs: {
      main: {
        type: "procedure",
        description: "Disable some set of codes and/or all codes associated with a set of users",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              accounts: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminEnableAccountInvites: {
    lexicon: 1,
    id: "com.atproto.admin.enableAccountInvites",
    defs: {
      main: {
        type: "procedure",
        description: "Re-enable an accounts ability to receive invite codes",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["account"],
            properties: {
              account: {
                type: "string",
                format: "did"
              },
              note: {
                type: "string",
                description: "Additionally add a note describing why the invites were enabled"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetInviteCodes: {
    lexicon: 1,
    id: "com.atproto.admin.getInviteCodes",
    defs: {
      main: {
        type: "query",
        description: "Admin view of invite codes",
        parameters: {
          type: "params",
          properties: {
            sort: {
              type: "string",
              knownValues: ["recent", "usage"],
              default: "recent"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 500,
              default: 100
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              cursor: {
                type: "string"
              },
              codes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.defs#inviteCode"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationAction",
    defs: {
      main: {
        type: "query",
        description: "View details about a moderation action.",
        parameters: {
          type: "params",
          required: ["id"],
          properties: {
            id: {
              type: "integer"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationActions: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationActions",
    defs: {
      main: {
        type: "query",
        description: "List moderation actions related to a subject.",
        parameters: {
          type: "params",
          properties: {
            subject: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actions"],
            properties: {
              cursor: {
                type: "string"
              },
              actions: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#actionView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationReport: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationReport",
    defs: {
      main: {
        type: "query",
        description: "View details about a moderation report.",
        parameters: {
          type: "params",
          required: ["id"],
          properties: {
            id: {
              type: "integer"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#reportViewDetail"
          }
        }
      }
    }
  },
  ComAtprotoAdminGetModerationReports: {
    lexicon: 1,
    id: "com.atproto.admin.getModerationReports",
    defs: {
      main: {
        type: "query",
        description: "List moderation reports related to a subject.",
        parameters: {
          type: "params",
          properties: {
            subject: {
              type: "string"
            },
            ignoreSubjects: {
              type: "array",
              items: {
                type: "string"
              }
            },
            actionedBy: {
              type: "string",
              format: "did",
              description: "Get all reports that were actioned by a specific moderator"
            },
            reporters: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Filter reports made by one or more DIDs"
            },
            resolved: {
              type: "boolean"
            },
            actionType: {
              type: "string",
              knownValues: [
                "com.atproto.admin.defs#takedown",
                "com.atproto.admin.defs#flag",
                "com.atproto.admin.defs#acknowledge",
                "com.atproto.admin.defs#escalate"
              ]
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            },
            reverse: {
              type: "boolean",
              description: "Reverse the order of the returned records? when true, returns reports in chronological order"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["reports"],
            properties: {
              cursor: {
                type: "string"
              },
              reports: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#reportView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminGetRecord: {
    lexicon: 1,
    id: "com.atproto.admin.getRecord",
    defs: {
      main: {
        type: "query",
        description: "View details about a record.",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#recordViewDetail"
          }
        },
        errors: [
          {
            name: "RecordNotFound"
          }
        ]
      }
    }
  },
  ComAtprotoAdminGetRepo: {
    lexicon: 1,
    id: "com.atproto.admin.getRepo",
    defs: {
      main: {
        type: "query",
        description: "View details about a repository.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#repoViewDetail"
          }
        },
        errors: [
          {
            name: "RepoNotFound"
          }
        ]
      }
    }
  },
  ComAtprotoAdminRebaseRepo: {
    lexicon: 1,
    id: "com.atproto.admin.rebaseRepo",
    defs: {
      main: {
        type: "procedure",
        description: "Administrative action to rebase an account's repo",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          },
          {
            name: "ConcurrentWrites"
          }
        ]
      }
    }
  },
  ComAtprotoAdminResolveModerationReports: {
    lexicon: 1,
    id: "com.atproto.admin.resolveModerationReports",
    defs: {
      main: {
        type: "procedure",
        description: "Resolve moderation reports by an action.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actionId", "reportIds", "createdBy"],
            properties: {
              actionId: {
                type: "integer"
              },
              reportIds: {
                type: "array",
                items: {
                  type: "integer"
                }
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        }
      }
    }
  },
  ComAtprotoAdminReverseModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.reverseModerationAction",
    defs: {
      main: {
        type: "procedure",
        description: "Reverse a moderation action.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["id", "reason", "createdBy"],
            properties: {
              id: {
                type: "integer"
              },
              reason: {
                type: "string"
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        }
      }
    }
  },
  ComAtprotoAdminSearchRepos: {
    lexicon: 1,
    id: "com.atproto.admin.searchRepos",
    defs: {
      main: {
        type: "query",
        description: "Find repositories based on a search term.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            invitedBy: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repos"],
            properties: {
              cursor: {
                type: "string"
              },
              repos: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#repoView"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminSendEmail: {
    lexicon: 1,
    id: "com.atproto.admin.sendEmail",
    defs: {
      main: {
        type: "procedure",
        description: "Send email to a user's primary email address",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["recipientDid", "content"],
            properties: {
              recipientDid: {
                type: "string",
                format: "did"
              },
              content: {
                type: "string"
              },
              subject: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["sent"],
            properties: {
              sent: {
                type: "boolean"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminTakeModerationAction: {
    lexicon: 1,
    id: "com.atproto.admin.takeModerationAction",
    defs: {
      main: {
        type: "procedure",
        description: "Take a moderation action on a repo.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["action", "subject", "reason", "createdBy"],
            properties: {
              action: {
                type: "string",
                knownValues: [
                  "com.atproto.admin.defs#takedown",
                  "com.atproto.admin.defs#flag",
                  "com.atproto.admin.defs#acknowledge"
                ]
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              },
              subjectBlobCids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              },
              createLabelVals: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              negateLabelVals: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              reason: {
                type: "string"
              },
              durationInHours: {
                type: "integer",
                description: "Indicates how long this action was meant to be in effect before automatically expiring."
              },
              createdBy: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.admin.defs#actionView"
          }
        },
        errors: [
          {
            name: "SubjectHasAction"
          }
        ]
      }
    }
  },
  ComAtprotoAdminUpdateAccountEmail: {
    lexicon: 1,
    id: "com.atproto.admin.updateAccountEmail",
    defs: {
      main: {
        type: "procedure",
        description: "Administrative action to update an account's email",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["account", "email"],
            properties: {
              account: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              email: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoAdminUpdateAccountHandle: {
    lexicon: 1,
    id: "com.atproto.admin.updateAccountHandle",
    defs: {
      main: {
        type: "procedure",
        description: "Administrative action to update an account's handle",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did", "handle"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              handle: {
                type: "string",
                format: "handle"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoIdentityResolveHandle: {
    lexicon: 1,
    id: "com.atproto.identity.resolveHandle",
    defs: {
      main: {
        type: "query",
        description: "Provides the DID of a repo.",
        parameters: {
          type: "params",
          required: ["handle"],
          properties: {
            handle: {
              type: "string",
              format: "handle",
              description: "The handle to resolve."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoIdentityUpdateHandle: {
    lexicon: 1,
    id: "com.atproto.identity.updateHandle",
    defs: {
      main: {
        type: "procedure",
        description: "Updates the handle of the account",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle"],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoLabelDefs: {
    lexicon: 1,
    id: "com.atproto.label.defs",
    defs: {
      label: {
        type: "object",
        description: "Metadata tag on an atproto resource (eg, repo or record)",
        required: ["src", "uri", "val", "cts"],
        properties: {
          src: {
            type: "string",
            format: "did",
            description: "DID of the actor who created this label"
          },
          uri: {
            type: "string",
            format: "uri",
            description: "AT URI of the record, repository (account), or other resource which this label applies to"
          },
          cid: {
            type: "string",
            format: "cid",
            description: "optionally, CID specifying the specific version of 'uri' resource this label applies to"
          },
          val: {
            type: "string",
            maxLength: 128,
            description: "the short string name of the value or type of this label"
          },
          neg: {
            type: "boolean",
            description: "if true, this is a negation label, overwriting a previous label"
          },
          cts: {
            type: "string",
            format: "datetime",
            description: "timestamp when this label was created"
          }
        }
      },
      selfLabels: {
        type: "object",
        description: "Metadata tags on an atproto record, published by the author within the record.",
        required: ["values"],
        properties: {
          values: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#selfLabel"
            },
            maxLength: 10
          }
        }
      },
      selfLabel: {
        type: "object",
        description: "Metadata tag on an atproto record, published by the author within the record. Note -- schemas should use #selfLabels, not #selfLabel.",
        required: ["val"],
        properties: {
          val: {
            type: "string",
            maxLength: 128,
            description: "the short string name of the value or type of this label"
          }
        }
      }
    }
  },
  ComAtprotoLabelQueryLabels: {
    lexicon: 1,
    id: "com.atproto.label.queryLabels",
    defs: {
      main: {
        type: "query",
        description: "Find labels relevant to the provided URI patterns.",
        parameters: {
          type: "params",
          required: ["uriPatterns"],
          properties: {
            uriPatterns: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI"
            },
            sources: {
              type: "array",
              items: {
                type: "string",
                format: "did"
              },
              description: "Optional list of label sources (DIDs) to filter on"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 250,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["labels"],
            properties: {
              cursor: {
                type: "string"
              },
              labels: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.label.defs#label"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoLabelSubscribeLabels: {
    lexicon: 1,
    id: "com.atproto.label.subscribeLabels",
    defs: {
      main: {
        type: "subscription",
        description: "Subscribe to label updates",
        parameters: {
          type: "params",
          properties: {
            cursor: {
              type: "integer",
              description: "The last known event to backfill from."
            }
          }
        },
        message: {
          schema: {
            type: "union",
            refs: [
              "lex:com.atproto.label.subscribeLabels#labels",
              "lex:com.atproto.label.subscribeLabels#info"
            ]
          }
        },
        errors: [
          {
            name: "FutureCursor"
          }
        ]
      },
      labels: {
        type: "object",
        required: ["seq", "labels"],
        properties: {
          seq: {
            type: "integer"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      info: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            knownValues: ["OutdatedCursor"]
          },
          message: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoModerationCreateReport: {
    lexicon: 1,
    id: "com.atproto.moderation.createReport",
    defs: {
      main: {
        type: "procedure",
        description: "Report a repo or a record.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["reasonType", "subject"],
            properties: {
              reasonType: {
                type: "ref",
                ref: "lex:com.atproto.moderation.defs#reasonType"
              },
              reason: {
                type: "string"
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: [
              "id",
              "reasonType",
              "subject",
              "reportedBy",
              "createdAt"
            ],
            properties: {
              id: {
                type: "integer"
              },
              reasonType: {
                type: "ref",
                ref: "lex:com.atproto.moderation.defs#reasonType"
              },
              reason: {
                type: "string"
              },
              subject: {
                type: "union",
                refs: [
                  "lex:com.atproto.admin.defs#repoRef",
                  "lex:com.atproto.repo.strongRef"
                ]
              },
              reportedBy: {
                type: "string",
                format: "did"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoModerationDefs: {
    lexicon: 1,
    id: "com.atproto.moderation.defs",
    defs: {
      reasonType: {
        type: "string",
        knownValues: [
          "com.atproto.moderation.defs#reasonSpam",
          "com.atproto.moderation.defs#reasonViolation",
          "com.atproto.moderation.defs#reasonMisleading",
          "com.atproto.moderation.defs#reasonSexual",
          "com.atproto.moderation.defs#reasonRude",
          "com.atproto.moderation.defs#reasonOther"
        ]
      },
      reasonSpam: {
        type: "token",
        description: "Spam: frequent unwanted promotion, replies, mentions"
      },
      reasonViolation: {
        type: "token",
        description: "Direct violation of server rules, laws, terms of service"
      },
      reasonMisleading: {
        type: "token",
        description: "Misleading identity, affiliation, or content"
      },
      reasonSexual: {
        type: "token",
        description: "Unwanted or mislabeled sexual content"
      },
      reasonRude: {
        type: "token",
        description: "Rude, harassing, explicit, or otherwise unwelcoming behavior"
      },
      reasonOther: {
        type: "token",
        description: "Other: reports not falling under another report category"
      }
    }
  },
  ComAtprotoRepoApplyWrites: {
    lexicon: 1,
    id: "com.atproto.repo.applyWrites",
    defs: {
      main: {
        type: "procedure",
        description: "Apply a batch transaction of creates, updates, and deletes.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "writes"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the records?"
              },
              writes: {
                type: "array",
                items: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.repo.applyWrites#create",
                    "lex:com.atproto.repo.applyWrites#update",
                    "lex:com.atproto.repo.applyWrites#delete"
                  ],
                  closed: true
                }
              },
              swapCommit: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      },
      create: {
        type: "object",
        description: "Create a new record.",
        required: ["collection", "value"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string",
            maxLength: 15
          },
          value: {
            type: "unknown"
          }
        }
      },
      update: {
        type: "object",
        description: "Update an existing record.",
        required: ["collection", "rkey", "value"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string"
          },
          value: {
            type: "unknown"
          }
        }
      },
      delete: {
        type: "object",
        description: "Delete an existing record.",
        required: ["collection", "rkey"],
        properties: {
          collection: {
            type: "string",
            format: "nsid"
          },
          rkey: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoRepoCreateRecord: {
    lexicon: 1,
    id: "com.atproto.repo.createRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Create a new record.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "record"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record.",
                maxLength: 15
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the record?"
              },
              record: {
                type: "unknown",
                description: "The record to create."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "cid"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoDeleteRecord: {
    lexicon: 1,
    id: "com.atproto.repo.deleteRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Delete a record, or ensure it doesn't exist.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "rkey"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record."
              },
              swapRecord: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous record by cid."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoDescribeRepo: {
    lexicon: 1,
    id: "com.atproto.repo.describeRepo",
    defs: {
      main: {
        type: "query",
        description: "Get information about the repo, including the list of collections.",
        parameters: {
          type: "params",
          required: ["repo"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: [
              "handle",
              "did",
              "didDoc",
              "collections",
              "handleIsCorrect"
            ],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              didDoc: {
                type: "unknown"
              },
              collections: {
                type: "array",
                items: {
                  type: "string",
                  format: "nsid"
                }
              },
              handleIsCorrect: {
                type: "boolean"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoGetRecord: {
    lexicon: 1,
    id: "com.atproto.repo.getRecord",
    defs: {
      main: {
        type: "query",
        description: "Get a record.",
        parameters: {
          type: "params",
          required: ["repo", "collection", "rkey"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid",
              description: "The NSID of the record collection."
            },
            rkey: {
              type: "string",
              description: "The key of the record."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "The CID of the version of the record. If not specified, then return the most recent version."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "value"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              value: {
                type: "unknown"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoListRecords: {
    lexicon: 1,
    id: "com.atproto.repo.listRecords",
    defs: {
      main: {
        type: "query",
        description: "List a range of records in a collection.",
        parameters: {
          type: "params",
          required: ["repo", "collection"],
          properties: {
            repo: {
              type: "string",
              format: "at-identifier",
              description: "The handle or DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid",
              description: "The NSID of the record type."
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50,
              description: "The number of records to return."
            },
            cursor: {
              type: "string"
            },
            rkeyStart: {
              type: "string",
              description: "DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)"
            },
            rkeyEnd: {
              type: "string",
              description: "DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)"
            },
            reverse: {
              type: "boolean",
              description: "Reverse the order of the returned records?"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["records"],
            properties: {
              cursor: {
                type: "string"
              },
              records: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.repo.listRecords#record"
                }
              }
            }
          }
        }
      },
      record: {
        type: "object",
        required: ["uri", "cid", "value"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          value: {
            type: "unknown"
          }
        }
      }
    }
  },
  ComAtprotoRepoPutRecord: {
    lexicon: 1,
    id: "com.atproto.repo.putRecord",
    defs: {
      main: {
        type: "procedure",
        description: "Write a record, creating or updating it as needed.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo", "collection", "rkey", "record"],
            nullable: ["swapRecord"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The key of the record.",
                maxLength: 15
              },
              validate: {
                type: "boolean",
                default: true,
                description: "Validate the record?"
              },
              record: {
                type: "unknown",
                description: "The record to write."
              },
              swapRecord: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous record by cid."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "cid"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          }
        ]
      }
    }
  },
  ComAtprotoRepoRebaseRepo: {
    lexicon: 1,
    id: "com.atproto.repo.rebaseRepo",
    defs: {
      main: {
        type: "procedure",
        description: "Simple rebase of repo that deletes history",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repo"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              swapCommit: {
                type: "string",
                format: "cid",
                description: "Compare and swap with the previous commit by cid."
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidSwap"
          },
          {
            name: "ConcurrentWrites"
          }
        ]
      }
    }
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: "com.atproto.repo.strongRef",
    description: "A URI with a content-hash fingerprint.",
    defs: {
      main: {
        type: "object",
        required: ["uri", "cid"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  ComAtprotoRepoUploadBlob: {
    lexicon: 1,
    id: "com.atproto.repo.uploadBlob",
    defs: {
      main: {
        type: "procedure",
        description: "Upload a new blob to be added to repo in a later request.",
        input: {
          encoding: "*/*"
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["blob"],
            properties: {
              blob: {
                type: "blob"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateAccount: {
    lexicon: 1,
    id: "com.atproto.server.createAccount",
    defs: {
      main: {
        type: "procedure",
        description: "Create an account.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle", "email", "password"],
            properties: {
              email: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              inviteCode: {
                type: "string"
              },
              password: {
                type: "string"
              },
              recoveryKey: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        errors: [
          {
            name: "InvalidHandle"
          },
          {
            name: "InvalidPassword"
          },
          {
            name: "InvalidInviteCode"
          },
          {
            name: "HandleNotAvailable"
          },
          {
            name: "UnsupportedDomain"
          },
          {
            name: "UnresolvableDid"
          },
          {
            name: "IncompatibleDidDoc"
          }
        ]
      }
    }
  },
  ComAtprotoServerCreateAppPassword: {
    lexicon: 1,
    id: "com.atproto.server.createAppPassword",
    defs: {
      main: {
        type: "procedure",
        description: "Create an app-specific password.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:com.atproto.server.createAppPassword#appPassword"
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      },
      appPassword: {
        type: "object",
        required: ["name", "password", "createdAt"],
        properties: {
          name: {
            type: "string"
          },
          password: {
            type: "string"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          }
        }
      }
    }
  },
  ComAtprotoServerCreateInviteCode: {
    lexicon: 1,
    id: "com.atproto.server.createInviteCode",
    defs: {
      main: {
        type: "procedure",
        description: "Create an invite code.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["useCount"],
            properties: {
              useCount: {
                type: "integer"
              },
              forAccount: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["code"],
            properties: {
              code: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateInviteCodes: {
    lexicon: 1,
    id: "com.atproto.server.createInviteCodes",
    defs: {
      main: {
        type: "procedure",
        description: "Create an invite code.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codeCount", "useCount"],
            properties: {
              codeCount: {
                type: "integer",
                default: 1
              },
              useCount: {
                type: "integer"
              },
              forAccounts: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.createInviteCodes#accountCodes"
                }
              }
            }
          }
        }
      },
      accountCodes: {
        type: "object",
        required: ["account", "codes"],
        properties: {
          account: {
            type: "string"
          },
          codes: {
            type: "array",
            items: {
              type: "string"
            }
          }
        }
      }
    }
  },
  ComAtprotoServerCreateSession: {
    lexicon: 1,
    id: "com.atproto.server.createSession",
    defs: {
      main: {
        type: "procedure",
        description: "Create an authentication session.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["identifier", "password"],
            properties: {
              identifier: {
                type: "string",
                description: "Handle or other identifier supported by the server for the authenticating user."
              },
              password: {
                type: "string"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              email: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      }
    }
  },
  ComAtprotoServerDefs: {
    lexicon: 1,
    id: "com.atproto.server.defs",
    defs: {
      inviteCode: {
        type: "object",
        required: [
          "code",
          "available",
          "disabled",
          "forAccount",
          "createdBy",
          "createdAt",
          "uses"
        ],
        properties: {
          code: {
            type: "string"
          },
          available: {
            type: "integer"
          },
          disabled: {
            type: "boolean"
          },
          forAccount: {
            type: "string"
          },
          createdBy: {
            type: "string"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          uses: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCodeUse"
            }
          }
        }
      },
      inviteCodeUse: {
        type: "object",
        required: ["usedBy", "usedAt"],
        properties: {
          usedBy: {
            type: "string",
            format: "did"
          },
          usedAt: {
            type: "string",
            format: "datetime"
          }
        }
      }
    }
  },
  ComAtprotoServerDeleteAccount: {
    lexicon: 1,
    id: "com.atproto.server.deleteAccount",
    defs: {
      main: {
        type: "procedure",
        description: "Delete a user account with a token and password.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did", "password", "token"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              password: {
                type: "string"
              },
              token: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "ExpiredToken"
          },
          {
            name: "InvalidToken"
          }
        ]
      }
    }
  },
  ComAtprotoServerDeleteSession: {
    lexicon: 1,
    id: "com.atproto.server.deleteSession",
    defs: {
      main: {
        type: "procedure",
        description: "Delete the current session."
      }
    }
  },
  ComAtprotoServerDescribeServer: {
    lexicon: 1,
    id: "com.atproto.server.describeServer",
    defs: {
      main: {
        type: "query",
        description: "Get a document describing the service's accounts configuration.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["availableUserDomains"],
            properties: {
              inviteCodeRequired: {
                type: "boolean"
              },
              availableUserDomains: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              links: {
                type: "ref",
                ref: "lex:com.atproto.server.describeServer#links"
              }
            }
          }
        }
      },
      links: {
        type: "object",
        properties: {
          privacyPolicy: {
            type: "string"
          },
          termsOfService: {
            type: "string"
          }
        }
      }
    }
  },
  ComAtprotoServerGetAccountInviteCodes: {
    lexicon: 1,
    id: "com.atproto.server.getAccountInviteCodes",
    defs: {
      main: {
        type: "query",
        description: "Get all invite codes for a given account",
        parameters: {
          type: "params",
          properties: {
            includeUsed: {
              type: "boolean",
              default: true
            },
            createAvailable: {
              type: "boolean",
              default: true
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["codes"],
            properties: {
              codes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.defs#inviteCode"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "DuplicateCreate"
          }
        ]
      }
    }
  },
  ComAtprotoServerGetSession: {
    lexicon: 1,
    id: "com.atproto.server.getSession",
    defs: {
      main: {
        type: "query",
        description: "Get information about the current session.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["handle", "did"],
            properties: {
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              },
              email: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerListAppPasswords: {
    lexicon: 1,
    id: "com.atproto.server.listAppPasswords",
    defs: {
      main: {
        type: "query",
        description: "List all app-specific passwords.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["passwords"],
            properties: {
              passwords: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.server.listAppPasswords#appPassword"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      },
      appPassword: {
        type: "object",
        required: ["name", "createdAt"],
        properties: {
          name: {
            type: "string"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          }
        }
      }
    }
  },
  ComAtprotoServerRefreshSession: {
    lexicon: 1,
    id: "com.atproto.server.refreshSession",
    defs: {
      main: {
        type: "procedure",
        description: "Refresh an authentication session.",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["accessJwt", "refreshJwt", "handle", "did"],
            properties: {
              accessJwt: {
                type: "string"
              },
              refreshJwt: {
                type: "string"
              },
              handle: {
                type: "string",
                format: "handle"
              },
              did: {
                type: "string",
                format: "did"
              }
            }
          }
        },
        errors: [
          {
            name: "AccountTakedown"
          }
        ]
      }
    }
  },
  ComAtprotoServerRequestAccountDelete: {
    lexicon: 1,
    id: "com.atproto.server.requestAccountDelete",
    defs: {
      main: {
        type: "procedure",
        description: "Initiate a user account deletion via email."
      }
    }
  },
  ComAtprotoServerRequestPasswordReset: {
    lexicon: 1,
    id: "com.atproto.server.requestPasswordReset",
    defs: {
      main: {
        type: "procedure",
        description: "Initiate a user account password reset via email.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["email"],
            properties: {
              email: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoServerResetPassword: {
    lexicon: 1,
    id: "com.atproto.server.resetPassword",
    defs: {
      main: {
        type: "procedure",
        description: "Reset a user account password using a token.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["token", "password"],
            properties: {
              token: {
                type: "string"
              },
              password: {
                type: "string"
              }
            }
          }
        },
        errors: [
          {
            name: "ExpiredToken"
          },
          {
            name: "InvalidToken"
          }
        ]
      }
    }
  },
  ComAtprotoServerRevokeAppPassword: {
    lexicon: 1,
    id: "com.atproto.server.revokeAppPassword",
    defs: {
      main: {
        type: "procedure",
        description: "Revoke an app-specific password by name.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncGetBlob: {
    lexicon: 1,
    id: "com.atproto.sync.getBlob",
    defs: {
      main: {
        type: "query",
        description: "Get a blob associated with a given repo.",
        parameters: {
          type: "params",
          required: ["did", "cid"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "The CID of the blob to fetch"
            }
          }
        },
        output: {
          encoding: "*/*"
        }
      }
    }
  },
  ComAtprotoSyncGetBlocks: {
    lexicon: 1,
    id: "com.atproto.sync.getBlocks",
    defs: {
      main: {
        type: "query",
        description: "Gets blocks from a given repo.",
        parameters: {
          type: "params",
          required: ["did", "cids"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            cids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetCheckout: {
    lexicon: 1,
    id: "com.atproto.sync.getCheckout",
    defs: {
      main: {
        type: "query",
        description: "Gets the repo state.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            commit: {
              type: "string",
              format: "cid",
              description: "The commit to get the checkout from. Defaults to current HEAD."
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetCommitPath: {
    lexicon: 1,
    id: "com.atproto.sync.getCommitPath",
    defs: {
      main: {
        type: "query",
        description: "Gets the path of repo commits",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The most recent commit"
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit to start from"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["commits"],
            properties: {
              commits: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncGetHead: {
    lexicon: 1,
    id: "com.atproto.sync.getHead",
    defs: {
      main: {
        type: "query",
        description: "Gets the current HEAD CID of a repo.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["root"],
            properties: {
              root: {
                type: "string",
                format: "cid"
              }
            }
          }
        },
        errors: [
          {
            name: "HeadNotFound"
          }
        ]
      }
    }
  },
  ComAtprotoSyncGetRecord: {
    lexicon: 1,
    id: "com.atproto.sync.getRecord",
    defs: {
      main: {
        type: "query",
        description: "Gets blocks needed for existence or non-existence of record.",
        parameters: {
          type: "params",
          required: ["did", "collection", "rkey"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            },
            commit: {
              type: "string",
              format: "cid",
              description: "An optional past commit CID."
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncGetRepo: {
    lexicon: 1,
    id: "com.atproto.sync.getRepo",
    defs: {
      main: {
        type: "query",
        description: "Gets the repo state.",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit in the commit range (not inclusive)"
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The latest commit in the commit range (inclusive)"
            }
          }
        },
        output: {
          encoding: "application/vnd.ipld.car"
        }
      }
    }
  },
  ComAtprotoSyncListBlobs: {
    lexicon: 1,
    id: "com.atproto.sync.listBlobs",
    defs: {
      main: {
        type: "query",
        description: "List blob cids for some range of commits",
        parameters: {
          type: "params",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did",
              description: "The DID of the repo."
            },
            latest: {
              type: "string",
              format: "cid",
              description: "The most recent commit"
            },
            earliest: {
              type: "string",
              format: "cid",
              description: "The earliest commit to start from"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["cids"],
            properties: {
              cids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncListRepos: {
    lexicon: 1,
    id: "com.atproto.sync.listRepos",
    defs: {
      main: {
        type: "query",
        description: "List dids and root cids of hosted repos",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 1e3,
              default: 500
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["repos"],
            properties: {
              cursor: {
                type: "string"
              },
              repos: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.sync.listRepos#repo"
                }
              }
            }
          }
        }
      },
      repo: {
        type: "object",
        required: ["did", "head"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          head: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  ComAtprotoSyncNotifyOfUpdate: {
    lexicon: 1,
    id: "com.atproto.sync.notifyOfUpdate",
    defs: {
      main: {
        type: "procedure",
        description: "Notify a crawling service of a recent update. Often when a long break between updates causes the connection with the crawling service to break.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["hostname"],
            properties: {
              hostname: {
                type: "string",
                description: "Hostname of the service that is notifying of update."
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncRequestCrawl: {
    lexicon: 1,
    id: "com.atproto.sync.requestCrawl",
    defs: {
      main: {
        type: "procedure",
        description: "Request a service to persistently crawl hosted repos.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["hostname"],
            properties: {
              hostname: {
                type: "string",
                description: "Hostname of the service that is requesting to be crawled."
              }
            }
          }
        }
      }
    }
  },
  ComAtprotoSyncSubscribeRepos: {
    lexicon: 1,
    id: "com.atproto.sync.subscribeRepos",
    defs: {
      main: {
        type: "subscription",
        description: "Subscribe to repo updates",
        parameters: {
          type: "params",
          properties: {
            cursor: {
              type: "integer",
              description: "The last known event to backfill from."
            }
          }
        },
        message: {
          schema: {
            type: "union",
            refs: [
              "lex:com.atproto.sync.subscribeRepos#commit",
              "lex:com.atproto.sync.subscribeRepos#handle",
              "lex:com.atproto.sync.subscribeRepos#migrate",
              "lex:com.atproto.sync.subscribeRepos#tombstone",
              "lex:com.atproto.sync.subscribeRepos#info"
            ]
          }
        },
        errors: [
          {
            name: "FutureCursor"
          },
          {
            name: "ConsumerTooSlow"
          }
        ]
      },
      commit: {
        type: "object",
        required: [
          "seq",
          "rebase",
          "tooBig",
          "repo",
          "commit",
          "prev",
          "blocks",
          "ops",
          "blobs",
          "time"
        ],
        nullable: ["prev"],
        properties: {
          seq: {
            type: "integer"
          },
          rebase: {
            type: "boolean"
          },
          tooBig: {
            type: "boolean"
          },
          repo: {
            type: "string",
            format: "did"
          },
          commit: {
            type: "cid-link"
          },
          prev: {
            type: "cid-link"
          },
          blocks: {
            type: "bytes",
            description: "CAR file containing relevant blocks",
            maxLength: 1e6
          },
          ops: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.sync.subscribeRepos#repoOp"
            },
            maxLength: 200
          },
          blobs: {
            type: "array",
            items: {
              type: "cid-link"
            }
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      handle: {
        type: "object",
        required: ["seq", "did", "handle", "time"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      migrate: {
        type: "object",
        required: ["seq", "did", "migrateTo", "time"],
        nullable: ["migrateTo"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          migrateTo: {
            type: "string"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      tombstone: {
        type: "object",
        required: ["seq", "did", "time"],
        properties: {
          seq: {
            type: "integer"
          },
          did: {
            type: "string",
            format: "did"
          },
          time: {
            type: "string",
            format: "datetime"
          }
        }
      },
      info: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            knownValues: ["OutdatedCursor"]
          },
          message: {
            type: "string"
          }
        }
      },
      repoOp: {
        type: "object",
        description: "A repo operation, ie a write of a single record. For creates and updates, cid is the record's CID as of this operation. For deletes, it's null.",
        required: ["action", "path", "cid"],
        nullable: ["cid"],
        properties: {
          action: {
            type: "string",
            knownValues: ["create", "update", "delete"]
          },
          path: {
            type: "string"
          },
          cid: {
            type: "cid-link"
          }
        }
      }
    }
  },
  AppBskyActorDefs: {
    lexicon: 1,
    id: "app.bsky.actor.defs",
    description: "A reference to an actor in the network.",
    defs: {
      profileViewBasic: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          avatar: {
            type: "string"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      profileView: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          description: {
            type: "string",
            maxGraphemes: 256,
            maxLength: 2560
          },
          avatar: {
            type: "string"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      profileViewDetailed: {
        type: "object",
        required: ["did", "handle"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          handle: {
            type: "string",
            format: "handle"
          },
          displayName: {
            type: "string",
            maxGraphemes: 64,
            maxLength: 640
          },
          description: {
            type: "string",
            maxGraphemes: 256,
            maxLength: 2560
          },
          avatar: {
            type: "string"
          },
          banner: {
            type: "string"
          },
          followersCount: {
            type: "integer"
          },
          followsCount: {
            type: "integer"
          },
          postsCount: {
            type: "integer"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      viewerState: {
        type: "object",
        properties: {
          muted: {
            type: "boolean"
          },
          mutedByList: {
            type: "ref",
            ref: "lex:app.bsky.graph.defs#listViewBasic"
          },
          blockedBy: {
            type: "boolean"
          },
          blocking: {
            type: "string",
            format: "at-uri"
          },
          following: {
            type: "string",
            format: "at-uri"
          },
          followedBy: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      preferences: {
        type: "array",
        items: {
          type: "union",
          refs: [
            "lex:app.bsky.actor.defs#adultContentPref",
            "lex:app.bsky.actor.defs#contentLabelPref",
            "lex:app.bsky.actor.defs#savedFeedsPref"
          ]
        }
      },
      adultContentPref: {
        type: "object",
        required: ["enabled"],
        properties: {
          enabled: {
            type: "boolean",
            default: false
          }
        }
      },
      contentLabelPref: {
        type: "object",
        required: ["label", "visibility"],
        properties: {
          label: {
            type: "string"
          },
          visibility: {
            type: "string",
            knownValues: ["show", "warn", "hide"]
          }
        }
      },
      savedFeedsPref: {
        type: "object",
        required: ["pinned", "saved"],
        properties: {
          pinned: {
            type: "array",
            items: {
              type: "string",
              format: "at-uri"
            }
          },
          saved: {
            type: "array",
            items: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    }
  },
  AppBskyActorGetPreferences: {
    lexicon: 1,
    id: "app.bsky.actor.getPreferences",
    defs: {
      main: {
        type: "query",
        description: "Get private preferences attached to the account.",
        parameters: {
          type: "params",
          properties: {}
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["preferences"],
            properties: {
              preferences: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#preferences"
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorGetProfile: {
    lexicon: 1,
    id: "app.bsky.actor.getProfile",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewDetailed"
          }
        }
      }
    }
  },
  AppBskyActorGetProfiles: {
    lexicon: 1,
    id: "app.bsky.actor.getProfiles",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["actors"],
          properties: {
            actors: {
              type: "array",
              items: {
                type: "string",
                format: "at-identifier"
              },
              maxLength: 25
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["profiles"],
            properties: {
              profiles: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileViewDetailed"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorGetSuggestions: {
    lexicon: 1,
    id: "app.bsky.actor.getSuggestions",
    defs: {
      main: {
        type: "query",
        description: "Get a list of actors suggested for following. Used in discovery UIs.",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              cursor: {
                type: "string"
              },
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorProfile: {
    lexicon: 1,
    id: "app.bsky.actor.profile",
    defs: {
      main: {
        type: "record",
        key: "literal:self",
        record: {
          type: "object",
          properties: {
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            banner: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            labels: {
              type: "union",
              refs: ["lex:com.atproto.label.defs#selfLabels"]
            }
          }
        }
      }
    }
  },
  AppBskyActorPutPreferences: {
    lexicon: 1,
    id: "app.bsky.actor.putPreferences",
    defs: {
      main: {
        type: "procedure",
        description: "Sets the private preferences attached to the account.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["preferences"],
            properties: {
              preferences: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#preferences"
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorSearchActors: {
    lexicon: 1,
    id: "app.bsky.actor.searchActors",
    defs: {
      main: {
        type: "query",
        description: "Find actors matching search criteria.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              cursor: {
                type: "string"
              },
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyActorSearchActorsTypeahead: {
    lexicon: 1,
    id: "app.bsky.actor.searchActorsTypeahead",
    defs: {
      main: {
        type: "query",
        description: "Find actor suggestions for a search term.",
        parameters: {
          type: "params",
          properties: {
            term: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actors"],
            properties: {
              actors: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileViewBasic"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyEmbedExternal: {
    lexicon: 1,
    id: "app.bsky.embed.external",
    description: "A representation of some externally linked content, embedded in another form of content",
    defs: {
      main: {
        type: "object",
        required: ["external"],
        properties: {
          external: {
            type: "ref",
            ref: "lex:app.bsky.embed.external#external"
          }
        }
      },
      external: {
        type: "object",
        required: ["uri", "title", "description"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          thumb: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          }
        }
      },
      view: {
        type: "object",
        required: ["external"],
        properties: {
          external: {
            type: "ref",
            ref: "lex:app.bsky.embed.external#viewExternal"
          }
        }
      },
      viewExternal: {
        type: "object",
        required: ["uri", "title", "description"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          thumb: {
            type: "string"
          }
        }
      }
    }
  },
  AppBskyEmbedImages: {
    lexicon: 1,
    id: "app.bsky.embed.images",
    description: "A set of images embedded in some other form of content",
    defs: {
      main: {
        type: "object",
        required: ["images"],
        properties: {
          images: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#image"
            },
            maxLength: 4
          }
        }
      },
      image: {
        type: "object",
        required: ["image", "alt"],
        properties: {
          image: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          alt: {
            type: "string"
          }
        }
      },
      view: {
        type: "object",
        required: ["images"],
        properties: {
          images: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#viewImage"
            },
            maxLength: 4
          }
        }
      },
      viewImage: {
        type: "object",
        required: ["thumb", "fullsize", "alt"],
        properties: {
          thumb: {
            type: "string"
          },
          fullsize: {
            type: "string"
          },
          alt: {
            type: "string"
          }
        }
      }
    }
  },
  AppBskyEmbedRecord: {
    lexicon: 1,
    id: "app.bsky.embed.record",
    description: "A representation of a record embedded in another form of content",
    defs: {
      main: {
        type: "object",
        required: ["record"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      },
      view: {
        type: "object",
        required: ["record"],
        properties: {
          record: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.record#viewRecord",
              "lex:app.bsky.embed.record#viewNotFound",
              "lex:app.bsky.embed.record#viewBlocked",
              "lex:app.bsky.feed.defs#generatorView",
              "lex:app.bsky.graph.defs#listView"
            ]
          }
        }
      },
      viewRecord: {
        type: "object",
        required: ["uri", "cid", "author", "value", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          value: {
            type: "unknown"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          },
          embeds: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view",
                "lex:app.bsky.embed.record#view",
                "lex:app.bsky.embed.recordWithMedia#view"
              ]
            }
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      viewNotFound: {
        type: "object",
        required: ["uri", "notFound"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          notFound: {
            type: "boolean",
            const: true
          }
        }
      },
      viewBlocked: {
        type: "object",
        required: ["uri", "blocked", "author"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          blocked: {
            type: "boolean",
            const: true
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#blockedAuthor"
          }
        }
      }
    }
  },
  AppBskyEmbedRecordWithMedia: {
    lexicon: 1,
    id: "app.bsky.embed.recordWithMedia",
    description: "A representation of a record embedded in another form of content, alongside other compatible embeds",
    defs: {
      main: {
        type: "object",
        required: ["record", "media"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:app.bsky.embed.record"
          },
          media: {
            type: "union",
            refs: ["lex:app.bsky.embed.images", "lex:app.bsky.embed.external"]
          }
        }
      },
      view: {
        type: "object",
        required: ["record", "media"],
        properties: {
          record: {
            type: "ref",
            ref: "lex:app.bsky.embed.record#view"
          },
          media: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.images#view",
              "lex:app.bsky.embed.external#view"
            ]
          }
        }
      }
    }
  },
  AppBskyFeedDefs: {
    lexicon: 1,
    id: "app.bsky.feed.defs",
    defs: {
      postView: {
        type: "object",
        required: ["uri", "cid", "author", "record", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          record: {
            type: "unknown"
          },
          embed: {
            type: "union",
            refs: [
              "lex:app.bsky.embed.images#view",
              "lex:app.bsky.embed.external#view",
              "lex:app.bsky.embed.record#view",
              "lex:app.bsky.embed.recordWithMedia#view"
            ]
          },
          replyCount: {
            type: "integer"
          },
          repostCount: {
            type: "integer"
          },
          likeCount: {
            type: "integer"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#viewerState"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      },
      viewerState: {
        type: "object",
        properties: {
          repost: {
            type: "string",
            format: "at-uri"
          },
          like: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      feedViewPost: {
        type: "object",
        required: ["post"],
        properties: {
          post: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          },
          reply: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#replyRef"
          },
          reason: {
            type: "union",
            refs: ["lex:app.bsky.feed.defs#reasonRepost"]
          }
        }
      },
      replyRef: {
        type: "object",
        required: ["root", "parent"],
        properties: {
          root: {
            type: "union",
            refs: [
              "lex:app.bsky.feed.defs#postView",
              "lex:app.bsky.feed.defs#notFoundPost",
              "lex:app.bsky.feed.defs#blockedPost"
            ]
          },
          parent: {
            type: "union",
            refs: [
              "lex:app.bsky.feed.defs#postView",
              "lex:app.bsky.feed.defs#notFoundPost",
              "lex:app.bsky.feed.defs#blockedPost"
            ]
          }
        }
      },
      reasonRepost: {
        type: "object",
        required: ["by", "indexedAt"],
        properties: {
          by: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileViewBasic"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      threadViewPost: {
        type: "object",
        required: ["post"],
        properties: {
          post: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#postView"
          },
          parent: {
            type: "union",
            refs: [
              "lex:app.bsky.feed.defs#threadViewPost",
              "lex:app.bsky.feed.defs#notFoundPost",
              "lex:app.bsky.feed.defs#blockedPost"
            ]
          },
          replies: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#threadViewPost",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            }
          }
        }
      },
      notFoundPost: {
        type: "object",
        required: ["uri", "notFound"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          notFound: {
            type: "boolean",
            const: true
          }
        }
      },
      blockedPost: {
        type: "object",
        required: ["uri", "blocked", "author"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          blocked: {
            type: "boolean",
            const: true
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#blockedAuthor"
          }
        }
      },
      blockedAuthor: {
        type: "object",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#viewerState"
          }
        }
      },
      generatorView: {
        type: "object",
        required: ["uri", "cid", "did", "creator", "displayName", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          did: {
            type: "string",
            format: "did"
          },
          creator: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          },
          displayName: {
            type: "string"
          },
          description: {
            type: "string",
            maxGraphemes: 300,
            maxLength: 3e3
          },
          descriptionFacets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.richtext.facet"
            }
          },
          avatar: {
            type: "string"
          },
          likeCount: {
            type: "integer",
            minimum: 0
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.feed.defs#generatorViewerState"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      generatorViewerState: {
        type: "object",
        properties: {
          like: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      skeletonFeedPost: {
        type: "object",
        required: ["post"],
        properties: {
          post: {
            type: "string",
            format: "at-uri"
          },
          reason: {
            type: "union",
            refs: ["lex:app.bsky.feed.defs#skeletonReasonRepost"]
          }
        }
      },
      skeletonReasonRepost: {
        type: "object",
        required: ["repost"],
        properties: {
          repost: {
            type: "string",
            format: "at-uri"
          }
        }
      }
    }
  },
  AppBskyFeedDescribeFeedGenerator: {
    lexicon: 1,
    id: "app.bsky.feed.describeFeedGenerator",
    defs: {
      main: {
        type: "query",
        description: "Returns information about a given feed generator including TOS & offered feed URIs",
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["did", "feeds"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              feeds: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.describeFeedGenerator#feed"
                }
              },
              links: {
                type: "ref",
                ref: "lex:app.bsky.feed.describeFeedGenerator#links"
              }
            }
          }
        }
      },
      feed: {
        type: "object",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          }
        }
      },
      links: {
        type: "object",
        properties: {
          privacyPolicy: {
            type: "string"
          },
          termsOfService: {
            type: "string"
          }
        }
      }
    }
  },
  AppBskyFeedGenerator: {
    lexicon: 1,
    id: "app.bsky.feed.generator",
    defs: {
      main: {
        type: "record",
        description: "A declaration of the existence of a feed generator",
        key: "any",
        record: {
          type: "object",
          required: ["did", "displayName", "createdAt"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            displayName: {
              type: "string",
              maxGraphemes: 24,
              maxLength: 240
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            labels: {
              type: "union",
              refs: ["lex:com.atproto.label.defs#selfLabels"]
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetActorFeeds: {
    lexicon: 1,
    id: "app.bsky.feed.getActorFeeds",
    defs: {
      main: {
        type: "query",
        description: "Retrieve a list of feeds created by a given actor",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feeds"],
            properties: {
              cursor: {
                type: "string"
              },
              feeds: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetActorLikes: {
    lexicon: 1,
    id: "app.bsky.feed.getActorLikes",
    defs: {
      main: {
        type: "query",
        description: "A view of the posts liked by an actor.",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "BlockedActor"
          },
          {
            name: "BlockedByActor"
          }
        ]
      }
    }
  },
  AppBskyFeedGetAuthorFeed: {
    lexicon: 1,
    id: "app.bsky.feed.getAuthorFeed",
    defs: {
      main: {
        type: "query",
        description: "A view of an actor's feed.",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            },
            filter: {
              type: "string",
              knownValues: [
                "posts_with_replies",
                "posts_no_replies",
                "posts_with_media"
              ],
              default: "posts_with_replies"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "BlockedActor"
          },
          {
            name: "BlockedByActor"
          }
        ]
      }
    }
  },
  AppBskyFeedGetFeed: {
    lexicon: 1,
    id: "app.bsky.feed.getFeed",
    defs: {
      main: {
        type: "query",
        description: "Compose and hydrate a feed from a user's selected feed generator",
        parameters: {
          type: "params",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              format: "at-uri"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "UnknownFeed"
          }
        ]
      }
    }
  },
  AppBskyFeedGetFeedGenerator: {
    lexicon: 1,
    id: "app.bsky.feed.getFeedGenerator",
    defs: {
      main: {
        type: "query",
        description: "Get information about a specific feed offered by a feed generator, such as its online status",
        parameters: {
          type: "params",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["view", "isOnline", "isValid"],
            properties: {
              view: {
                type: "ref",
                ref: "lex:app.bsky.feed.defs#generatorView"
              },
              isOnline: {
                type: "boolean"
              },
              isValid: {
                type: "boolean"
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetFeedGenerators: {
    lexicon: 1,
    id: "app.bsky.feed.getFeedGenerators",
    defs: {
      main: {
        type: "query",
        description: "Get information about a list of feed generators",
        parameters: {
          type: "params",
          required: ["feeds"],
          properties: {
            feeds: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feeds"],
            properties: {
              feeds: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetFeedSkeleton: {
    lexicon: 1,
    id: "app.bsky.feed.getFeedSkeleton",
    defs: {
      main: {
        type: "query",
        description: "A skeleton of a feed provided by a feed generator",
        parameters: {
          type: "params",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              format: "at-uri"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#skeletonFeedPost"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "UnknownFeed"
          }
        ]
      }
    }
  },
  AppBskyFeedGetLikes: {
    lexicon: 1,
    id: "app.bsky.feed.getLikes",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "likes"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              cursor: {
                type: "string"
              },
              likes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.getLikes#like"
                }
              }
            }
          }
        }
      },
      like: {
        type: "object",
        required: ["indexedAt", "createdAt", "actor"],
        properties: {
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          createdAt: {
            type: "string",
            format: "datetime"
          },
          actor: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          }
        }
      }
    }
  },
  AppBskyFeedGetPostThread: {
    lexicon: 1,
    id: "app.bsky.feed.getPostThread",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            depth: {
              type: "integer",
              default: 6,
              minimum: 0,
              maximum: 1e3
            },
            parentHeight: {
              type: "integer",
              default: 80,
              minimum: 0,
              maximum: 1e3
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["thread"],
            properties: {
              thread: {
                type: "union",
                refs: [
                  "lex:app.bsky.feed.defs#threadViewPost",
                  "lex:app.bsky.feed.defs#notFoundPost",
                  "lex:app.bsky.feed.defs#blockedPost"
                ]
              }
            }
          }
        },
        errors: [
          {
            name: "NotFound"
          }
        ]
      }
    }
  },
  AppBskyFeedGetPosts: {
    lexicon: 1,
    id: "app.bsky.feed.getPosts",
    defs: {
      main: {
        type: "query",
        description: "A view of an actor's feed.",
        parameters: {
          type: "params",
          required: ["uris"],
          properties: {
            uris: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              },
              maxLength: 25
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["posts"],
            properties: {
              posts: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#postView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetRepostedBy: {
    lexicon: 1,
    id: "app.bsky.feed.getRepostedBy",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["uri", "repostedBy"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              },
              cursor: {
                type: "string"
              },
              repostedBy: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedGetTimeline: {
    lexicon: 1,
    id: "app.bsky.feed.getTimeline",
    defs: {
      main: {
        type: "query",
        description: "A view of the user's home timeline.",
        parameters: {
          type: "params",
          properties: {
            algorithm: {
              type: "string"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyFeedLike: {
    lexicon: 1,
    id: "app.bsky.feed.like",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyFeedPost: {
    lexicon: 1,
    id: "app.bsky.feed.post",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["text", "createdAt"],
          properties: {
            text: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            entities: {
              type: "array",
              description: "Deprecated: replaced by app.bsky.richtext.facet.",
              items: {
                type: "ref",
                ref: "lex:app.bsky.feed.post#entity"
              }
            },
            facets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            reply: {
              type: "ref",
              ref: "lex:app.bsky.feed.post#replyRef"
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images",
                "lex:app.bsky.embed.external",
                "lex:app.bsky.embed.record",
                "lex:app.bsky.embed.recordWithMedia"
              ]
            },
            langs: {
              type: "array",
              maxLength: 3,
              items: {
                type: "string",
                format: "language"
              }
            },
            labels: {
              type: "union",
              refs: ["lex:com.atproto.label.defs#selfLabels"]
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      },
      replyRef: {
        type: "object",
        required: ["root", "parent"],
        properties: {
          root: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          },
          parent: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      },
      entity: {
        type: "object",
        description: "Deprecated: use facets instead.",
        required: ["index", "type", "value"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:app.bsky.feed.post#textSlice"
          },
          type: {
            type: "string",
            description: "Expected values are 'mention' and 'link'."
          },
          value: {
            type: "string"
          }
        }
      },
      textSlice: {
        type: "object",
        description: "Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.",
        required: ["start", "end"],
        properties: {
          start: {
            type: "integer",
            minimum: 0
          },
          end: {
            type: "integer",
            minimum: 0
          }
        }
      }
    }
  },
  AppBskyFeedRepost: {
    lexicon: 1,
    id: "app.bsky.feed.repost",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphBlock: {
    lexicon: 1,
    id: "app.bsky.graph.block",
    defs: {
      main: {
        type: "record",
        description: "A block.",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphDefs: {
    lexicon: 1,
    id: "app.bsky.graph.defs",
    defs: {
      listViewBasic: {
        type: "object",
        required: ["uri", "cid", "name", "purpose"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          name: {
            type: "string",
            maxLength: 64,
            minLength: 1
          },
          purpose: {
            type: "ref",
            ref: "lex:app.bsky.graph.defs#listPurpose"
          },
          avatar: {
            type: "string"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.graph.defs#listViewerState"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      listView: {
        type: "object",
        required: ["uri", "cid", "creator", "name", "purpose", "indexedAt"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          creator: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          },
          name: {
            type: "string",
            maxLength: 64,
            minLength: 1
          },
          purpose: {
            type: "ref",
            ref: "lex:app.bsky.graph.defs#listPurpose"
          },
          description: {
            type: "string",
            maxGraphemes: 300,
            maxLength: 3e3
          },
          descriptionFacets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.bsky.richtext.facet"
            }
          },
          avatar: {
            type: "string"
          },
          viewer: {
            type: "ref",
            ref: "lex:app.bsky.graph.defs#listViewerState"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          }
        }
      },
      listItemView: {
        type: "object",
        required: ["subject"],
        properties: {
          subject: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          }
        }
      },
      listPurpose: {
        type: "string",
        knownValues: ["app.bsky.graph.defs#modlist"]
      },
      modlist: {
        type: "token",
        description: "A list of actors to apply an aggregate moderation action (mute/block) on"
      },
      listViewerState: {
        type: "object",
        properties: {
          muted: {
            type: "boolean"
          }
        }
      }
    }
  },
  AppBskyGraphFollow: {
    lexicon: 1,
    id: "app.bsky.graph.follow",
    defs: {
      main: {
        type: "record",
        description: "A social follow.",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "createdAt"],
          properties: {
            subject: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetBlocks: {
    lexicon: 1,
    id: "app.bsky.graph.getBlocks",
    defs: {
      main: {
        type: "query",
        description: "Who is the requester's account blocking?",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["blocks"],
            properties: {
              cursor: {
                type: "string"
              },
              blocks: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetFollowers: {
    lexicon: 1,
    id: "app.bsky.graph.getFollowers",
    defs: {
      main: {
        type: "query",
        description: "Who is following an actor?",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["subject", "followers"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#profileView"
              },
              cursor: {
                type: "string"
              },
              followers: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetFollows: {
    lexicon: 1,
    id: "app.bsky.graph.getFollows",
    defs: {
      main: {
        type: "query",
        description: "Who is an actor following?",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["subject", "follows"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#profileView"
              },
              cursor: {
                type: "string"
              },
              follows: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetList: {
    lexicon: 1,
    id: "app.bsky.graph.getList",
    defs: {
      main: {
        type: "query",
        description: "Fetch a list of actors",
        parameters: {
          type: "params",
          required: ["list"],
          properties: {
            list: {
              type: "string",
              format: "at-uri"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["list", "items"],
            properties: {
              cursor: {
                type: "string"
              },
              list: {
                type: "ref",
                ref: "lex:app.bsky.graph.defs#listView"
              },
              items: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listItemView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetListMutes: {
    lexicon: 1,
    id: "app.bsky.graph.getListMutes",
    defs: {
      main: {
        type: "query",
        description: "Which lists is the requester's account muting?",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["lists"],
            properties: {
              cursor: {
                type: "string"
              },
              lists: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetLists: {
    lexicon: 1,
    id: "app.bsky.graph.getLists",
    defs: {
      main: {
        type: "query",
        description: "Fetch a list of lists that belong to an actor",
        parameters: {
          type: "params",
          required: ["actor"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["lists"],
            properties: {
              cursor: {
                type: "string"
              },
              lists: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphGetMutes: {
    lexicon: 1,
    id: "app.bsky.graph.getMutes",
    defs: {
      main: {
        type: "query",
        description: "Who does the viewer mute?",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["mutes"],
            properties: {
              cursor: {
                type: "string"
              },
              mutes: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphList: {
    lexicon: 1,
    id: "app.bsky.graph.list",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a list of actors.",
        key: "tid",
        record: {
          type: "object",
          required: ["name", "purpose", "createdAt"],
          properties: {
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "blob",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            labels: {
              type: "union",
              refs: ["lex:com.atproto.label.defs#selfLabels"]
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphListitem: {
    lexicon: 1,
    id: "app.bsky.graph.listitem",
    defs: {
      main: {
        type: "record",
        description: "An item under a declared list of actors",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "list", "createdAt"],
          properties: {
            subject: {
              type: "string",
              format: "did"
            },
            list: {
              type: "string",
              format: "at-uri"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppBskyGraphMuteActor: {
    lexicon: 1,
    id: "app.bsky.graph.muteActor",
    defs: {
      main: {
        type: "procedure",
        description: "Mute an actor by did or handle.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphMuteActorList: {
    lexicon: 1,
    id: "app.bsky.graph.muteActorList",
    defs: {
      main: {
        type: "procedure",
        description: "Mute a list of actors.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri"
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphUnmuteActor: {
    lexicon: 1,
    id: "app.bsky.graph.unmuteActor",
    defs: {
      main: {
        type: "procedure",
        description: "Unmute an actor by did or handle.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          }
        }
      }
    }
  },
  AppBskyGraphUnmuteActorList: {
    lexicon: 1,
    id: "app.bsky.graph.unmuteActorList",
    defs: {
      main: {
        type: "procedure",
        description: "Unmute a list of actors.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri"
              }
            }
          }
        }
      }
    }
  },
  AppBskyNotificationGetUnreadCount: {
    lexicon: 1,
    id: "app.bsky.notification.getUnreadCount",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          properties: {
            seenAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["count"],
            properties: {
              count: {
                type: "integer"
              }
            }
          }
        }
      }
    }
  },
  AppBskyNotificationListNotifications: {
    lexicon: 1,
    id: "app.bsky.notification.listNotifications",
    defs: {
      main: {
        type: "query",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            },
            seenAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["notifications"],
            properties: {
              cursor: {
                type: "string"
              },
              notifications: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.notification.listNotifications#notification"
                }
              }
            }
          }
        }
      },
      notification: {
        type: "object",
        required: [
          "uri",
          "cid",
          "author",
          "reason",
          "record",
          "isRead",
          "indexedAt"
        ],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          },
          author: {
            type: "ref",
            ref: "lex:app.bsky.actor.defs#profileView"
          },
          reason: {
            type: "string",
            description: "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', and 'quote'.",
            knownValues: [
              "like",
              "repost",
              "follow",
              "mention",
              "reply",
              "quote"
            ]
          },
          reasonSubject: {
            type: "string",
            format: "at-uri"
          },
          record: {
            type: "unknown"
          },
          isRead: {
            type: "boolean"
          },
          indexedAt: {
            type: "string",
            format: "datetime"
          },
          labels: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:com.atproto.label.defs#label"
            }
          }
        }
      }
    }
  },
  AppBskyNotificationRegisterPush: {
    lexicon: 1,
    id: "app.bsky.notification.registerPush",
    defs: {
      main: {
        type: "procedure",
        description: "Register for push notifications with a service",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["serviceDid", "token", "platform", "appId"],
            properties: {
              serviceDid: {
                type: "string",
                format: "did"
              },
              token: {
                type: "string"
              },
              platform: {
                type: "string",
                knownValues: ["ios", "android", "web"]
              },
              appId: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },
  AppBskyNotificationUpdateSeen: {
    lexicon: 1,
    id: "app.bsky.notification.updateSeen",
    defs: {
      main: {
        type: "procedure",
        description: "Notify server that the user has seen notifications.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["seenAt"],
            properties: {
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    }
  },
  AppBskyRichtextFacet: {
    lexicon: 1,
    id: "app.bsky.richtext.facet",
    defs: {
      main: {
        type: "object",
        required: ["index", "features"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:app.bsky.richtext.facet#byteSlice"
          },
          features: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.richtext.facet#mention",
                "lex:app.bsky.richtext.facet#link"
              ]
            }
          }
        }
      },
      mention: {
        type: "object",
        description: "A facet feature for actor mentions.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      link: {
        type: "object",
        description: "A facet feature for links.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          }
        }
      },
      byteSlice: {
        type: "object",
        description: "A text segment. Start is inclusive, end is exclusive. Indices are for utf8-encoded strings.",
        required: ["byteStart", "byteEnd"],
        properties: {
          byteStart: {
            type: "integer",
            minimum: 0
          },
          byteEnd: {
            type: "integer",
            minimum: 0
          }
        }
      }
    }
  },
  AppBskyUnspeccedApplyLabels: {
    lexicon: 1,
    id: "app.bsky.unspecced.applyLabels",
    defs: {
      main: {
        type: "procedure",
        description: "Allow a labeler to apply labels directly.",
        input: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["labels"],
            properties: {
              labels: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:com.atproto.label.defs#label"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyUnspeccedGetPopular: {
    lexicon: 1,
    id: "app.bsky.unspecced.getPopular",
    defs: {
      main: {
        type: "query",
        description: "An unspecced view of globally popular items",
        parameters: {
          type: "params",
          properties: {
            includeNsfw: {
              type: "boolean",
              default: false
            },
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#feedViewPost"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyUnspeccedGetPopularFeedGenerators: {
    lexicon: 1,
    id: "app.bsky.unspecced.getPopularFeedGenerators",
    defs: {
      main: {
        type: "query",
        description: "An unspecced view of globally popular feed generators",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            },
            query: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feeds"],
            properties: {
              cursor: {
                type: "string"
              },
              feeds: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                }
              }
            }
          }
        }
      }
    }
  },
  AppBskyUnspeccedGetTimelineSkeleton: {
    lexicon: 1,
    id: "app.bsky.unspecced.getTimelineSkeleton",
    defs: {
      main: {
        type: "query",
        description: "A skeleton of a timeline - UNSPECCED & WILL GO AWAY SOON",
        parameters: {
          type: "params",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 50
            },
            cursor: {
              type: "string"
            }
          }
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["feed"],
            properties: {
              cursor: {
                type: "string"
              },
              feed: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#skeletonFeedPost"
                }
              }
            }
          }
        },
        errors: [
          {
            name: "UnknownFeed"
          }
        ]
      }
    }
  }
};
var schemas = Object.values(schemaDict);
var lexicons = new Lexicons(schemas);

// src/client/types/com/atproto/admin/disableAccountInvites.ts
var disableAccountInvites_exports = {};
__export(disableAccountInvites_exports, {
  toKnownErr: () => toKnownErr
});
function toKnownErr(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/disableInviteCodes.ts
var disableInviteCodes_exports = {};
__export(disableInviteCodes_exports, {
  toKnownErr: () => toKnownErr2
});
function toKnownErr2(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/enableAccountInvites.ts
var enableAccountInvites_exports = {};
__export(enableAccountInvites_exports, {
  toKnownErr: () => toKnownErr3
});
function toKnownErr3(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getInviteCodes.ts
var getInviteCodes_exports = {};
__export(getInviteCodes_exports, {
  toKnownErr: () => toKnownErr4
});
function toKnownErr4(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationAction.ts
var getModerationAction_exports = {};
__export(getModerationAction_exports, {
  toKnownErr: () => toKnownErr5
});
function toKnownErr5(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationActions.ts
var getModerationActions_exports = {};
__export(getModerationActions_exports, {
  toKnownErr: () => toKnownErr6
});
function toKnownErr6(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationReport.ts
var getModerationReport_exports = {};
__export(getModerationReport_exports, {
  toKnownErr: () => toKnownErr7
});
function toKnownErr7(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getModerationReports.ts
var getModerationReports_exports = {};
__export(getModerationReports_exports, {
  toKnownErr: () => toKnownErr8
});
function toKnownErr8(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/getRecord.ts
var getRecord_exports = {};
__export(getRecord_exports, {
  RecordNotFoundError: () => RecordNotFoundError,
  toKnownErr: () => toKnownErr9
});
var RecordNotFoundError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr9(e) {
  if (e instanceof XRPCError) {
    if (e.error === "RecordNotFound")
      return new RecordNotFoundError(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/getRepo.ts
var getRepo_exports = {};
__export(getRepo_exports, {
  RepoNotFoundError: () => RepoNotFoundError,
  toKnownErr: () => toKnownErr10
});
var RepoNotFoundError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr10(e) {
  if (e instanceof XRPCError) {
    if (e.error === "RepoNotFound")
      return new RepoNotFoundError(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/rebaseRepo.ts
var rebaseRepo_exports = {};
__export(rebaseRepo_exports, {
  ConcurrentWritesError: () => ConcurrentWritesError,
  InvalidSwapError: () => InvalidSwapError,
  toKnownErr: () => toKnownErr11
});
var InvalidSwapError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var ConcurrentWritesError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr11(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError(e);
    if (e.error === "ConcurrentWrites")
      return new ConcurrentWritesError(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/resolveModerationReports.ts
var resolveModerationReports_exports = {};
__export(resolveModerationReports_exports, {
  toKnownErr: () => toKnownErr12
});
function toKnownErr12(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/reverseModerationAction.ts
var reverseModerationAction_exports = {};
__export(reverseModerationAction_exports, {
  toKnownErr: () => toKnownErr13
});
function toKnownErr13(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/searchRepos.ts
var searchRepos_exports = {};
__export(searchRepos_exports, {
  toKnownErr: () => toKnownErr14
});
function toKnownErr14(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/sendEmail.ts
var sendEmail_exports = {};
__export(sendEmail_exports, {
  toKnownErr: () => toKnownErr15
});
function toKnownErr15(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/takeModerationAction.ts
var takeModerationAction_exports = {};
__export(takeModerationAction_exports, {
  SubjectHasActionError: () => SubjectHasActionError,
  toKnownErr: () => toKnownErr16
});
var SubjectHasActionError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr16(e) {
  if (e instanceof XRPCError) {
    if (e.error === "SubjectHasAction")
      return new SubjectHasActionError(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/updateAccountEmail.ts
var updateAccountEmail_exports = {};
__export(updateAccountEmail_exports, {
  toKnownErr: () => toKnownErr17
});
function toKnownErr17(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/admin/updateAccountHandle.ts
var updateAccountHandle_exports = {};
__export(updateAccountHandle_exports, {
  toKnownErr: () => toKnownErr18
});
function toKnownErr18(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/identity/resolveHandle.ts
var resolveHandle_exports = {};
__export(resolveHandle_exports, {
  toKnownErr: () => toKnownErr19
});
function toKnownErr19(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/identity/updateHandle.ts
var updateHandle_exports = {};
__export(updateHandle_exports, {
  toKnownErr: () => toKnownErr20
});
function toKnownErr20(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/label/queryLabels.ts
var queryLabels_exports = {};
__export(queryLabels_exports, {
  toKnownErr: () => toKnownErr21
});
function toKnownErr21(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/moderation/createReport.ts
var createReport_exports = {};
__export(createReport_exports, {
  toKnownErr: () => toKnownErr22
});
function toKnownErr22(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/applyWrites.ts
var applyWrites_exports = {};
__export(applyWrites_exports, {
  InvalidSwapError: () => InvalidSwapError2,
  isCreate: () => isCreate,
  isDelete: () => isDelete,
  isUpdate: () => isUpdate,
  toKnownErr: () => toKnownErr23,
  validateCreate: () => validateCreate,
  validateDelete: () => validateDelete,
  validateUpdate: () => validateUpdate
});

// src/client/util.ts
function isObj2(v) {
  return typeof v === "object" && v !== null;
}
function hasProp2(data, prop) {
  return prop in data;
}

// src/client/types/com/atproto/repo/applyWrites.ts
var InvalidSwapError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr23(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError2(e);
  }
  return e;
}
function isCreate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#create";
}
function validateCreate(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#create", v);
}
function isUpdate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#update";
}
function validateUpdate(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#update", v);
}
function isDelete(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.applyWrites#delete";
}
function validateDelete(v) {
  return lexicons.validate("com.atproto.repo.applyWrites#delete", v);
}

// src/client/types/com/atproto/repo/createRecord.ts
var createRecord_exports = {};
__export(createRecord_exports, {
  InvalidSwapError: () => InvalidSwapError3,
  toKnownErr: () => toKnownErr24
});
var InvalidSwapError3 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr24(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError3(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/deleteRecord.ts
var deleteRecord_exports = {};
__export(deleteRecord_exports, {
  InvalidSwapError: () => InvalidSwapError4,
  toKnownErr: () => toKnownErr25
});
var InvalidSwapError4 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr25(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError4(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/describeRepo.ts
var describeRepo_exports = {};
__export(describeRepo_exports, {
  toKnownErr: () => toKnownErr26
});
function toKnownErr26(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/getRecord.ts
var getRecord_exports2 = {};
__export(getRecord_exports2, {
  toKnownErr: () => toKnownErr27
});
function toKnownErr27(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/repo/listRecords.ts
var listRecords_exports = {};
__export(listRecords_exports, {
  isRecord: () => isRecord,
  toKnownErr: () => toKnownErr28,
  validateRecord: () => validateRecord
});
function toKnownErr28(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isRecord(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.repo.listRecords#record";
}
function validateRecord(v) {
  return lexicons.validate("com.atproto.repo.listRecords#record", v);
}

// src/client/types/com/atproto/repo/putRecord.ts
var putRecord_exports = {};
__export(putRecord_exports, {
  InvalidSwapError: () => InvalidSwapError5,
  toKnownErr: () => toKnownErr29
});
var InvalidSwapError5 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr29(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError5(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/rebaseRepo.ts
var rebaseRepo_exports2 = {};
__export(rebaseRepo_exports2, {
  ConcurrentWritesError: () => ConcurrentWritesError2,
  InvalidSwapError: () => InvalidSwapError6,
  toKnownErr: () => toKnownErr30
});
var InvalidSwapError6 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var ConcurrentWritesError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr30(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidSwap")
      return new InvalidSwapError6(e);
    if (e.error === "ConcurrentWrites")
      return new ConcurrentWritesError2(e);
  }
  return e;
}

// src/client/types/com/atproto/repo/uploadBlob.ts
var uploadBlob_exports = {};
__export(uploadBlob_exports, {
  toKnownErr: () => toKnownErr31
});
function toKnownErr31(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/createAccount.ts
var createAccount_exports = {};
__export(createAccount_exports, {
  HandleNotAvailableError: () => HandleNotAvailableError,
  IncompatibleDidDocError: () => IncompatibleDidDocError,
  InvalidHandleError: () => InvalidHandleError2,
  InvalidInviteCodeError: () => InvalidInviteCodeError,
  InvalidPasswordError: () => InvalidPasswordError,
  UnresolvableDidError: () => UnresolvableDidError,
  UnsupportedDomainError: () => UnsupportedDomainError,
  toKnownErr: () => toKnownErr32
});
var InvalidHandleError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var InvalidPasswordError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var InvalidInviteCodeError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var HandleNotAvailableError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var UnsupportedDomainError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var UnresolvableDidError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var IncompatibleDidDocError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr32(e) {
  if (e instanceof XRPCError) {
    if (e.error === "InvalidHandle")
      return new InvalidHandleError2(e);
    if (e.error === "InvalidPassword")
      return new InvalidPasswordError(e);
    if (e.error === "InvalidInviteCode")
      return new InvalidInviteCodeError(e);
    if (e.error === "HandleNotAvailable")
      return new HandleNotAvailableError(e);
    if (e.error === "UnsupportedDomain")
      return new UnsupportedDomainError(e);
    if (e.error === "UnresolvableDid")
      return new UnresolvableDidError(e);
    if (e.error === "IncompatibleDidDoc")
      return new IncompatibleDidDocError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/createAppPassword.ts
var createAppPassword_exports = {};
__export(createAppPassword_exports, {
  AccountTakedownError: () => AccountTakedownError,
  isAppPassword: () => isAppPassword,
  toKnownErr: () => toKnownErr33,
  validateAppPassword: () => validateAppPassword
});
var AccountTakedownError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr33(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError(e);
  }
  return e;
}
function isAppPassword(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.createAppPassword#appPassword";
}
function validateAppPassword(v) {
  return lexicons.validate(
    "com.atproto.server.createAppPassword#appPassword",
    v
  );
}

// src/client/types/com/atproto/server/createInviteCode.ts
var createInviteCode_exports = {};
__export(createInviteCode_exports, {
  toKnownErr: () => toKnownErr34
});
function toKnownErr34(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/createInviteCodes.ts
var createInviteCodes_exports = {};
__export(createInviteCodes_exports, {
  isAccountCodes: () => isAccountCodes,
  toKnownErr: () => toKnownErr35,
  validateAccountCodes: () => validateAccountCodes
});
function toKnownErr35(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isAccountCodes(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.createInviteCodes#accountCodes";
}
function validateAccountCodes(v) {
  return lexicons.validate(
    "com.atproto.server.createInviteCodes#accountCodes",
    v
  );
}

// src/client/types/com/atproto/server/createSession.ts
var createSession_exports = {};
__export(createSession_exports, {
  AccountTakedownError: () => AccountTakedownError2,
  toKnownErr: () => toKnownErr36
});
var AccountTakedownError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr36(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError2(e);
  }
  return e;
}

// src/client/types/com/atproto/server/deleteAccount.ts
var deleteAccount_exports = {};
__export(deleteAccount_exports, {
  ExpiredTokenError: () => ExpiredTokenError,
  InvalidTokenError: () => InvalidTokenError,
  toKnownErr: () => toKnownErr37
});
var ExpiredTokenError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var InvalidTokenError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr37(e) {
  if (e instanceof XRPCError) {
    if (e.error === "ExpiredToken")
      return new ExpiredTokenError(e);
    if (e.error === "InvalidToken")
      return new InvalidTokenError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/deleteSession.ts
var deleteSession_exports = {};
__export(deleteSession_exports, {
  toKnownErr: () => toKnownErr38
});
function toKnownErr38(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/describeServer.ts
var describeServer_exports = {};
__export(describeServer_exports, {
  isLinks: () => isLinks,
  toKnownErr: () => toKnownErr39,
  validateLinks: () => validateLinks
});
function toKnownErr39(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isLinks(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.describeServer#links";
}
function validateLinks(v) {
  return lexicons.validate("com.atproto.server.describeServer#links", v);
}

// src/client/types/com/atproto/server/getAccountInviteCodes.ts
var getAccountInviteCodes_exports = {};
__export(getAccountInviteCodes_exports, {
  DuplicateCreateError: () => DuplicateCreateError,
  toKnownErr: () => toKnownErr40
});
var DuplicateCreateError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr40(e) {
  if (e instanceof XRPCError) {
    if (e.error === "DuplicateCreate")
      return new DuplicateCreateError(e);
  }
  return e;
}

// src/client/types/com/atproto/server/getSession.ts
var getSession_exports = {};
__export(getSession_exports, {
  toKnownErr: () => toKnownErr41
});
function toKnownErr41(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/listAppPasswords.ts
var listAppPasswords_exports = {};
__export(listAppPasswords_exports, {
  AccountTakedownError: () => AccountTakedownError3,
  isAppPassword: () => isAppPassword2,
  toKnownErr: () => toKnownErr42,
  validateAppPassword: () => validateAppPassword2
});
var AccountTakedownError3 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr42(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError3(e);
  }
  return e;
}
function isAppPassword2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.listAppPasswords#appPassword";
}
function validateAppPassword2(v) {
  return lexicons.validate("com.atproto.server.listAppPasswords#appPassword", v);
}

// src/client/types/com/atproto/server/refreshSession.ts
var refreshSession_exports = {};
__export(refreshSession_exports, {
  AccountTakedownError: () => AccountTakedownError4,
  toKnownErr: () => toKnownErr43
});
var AccountTakedownError4 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr43(e) {
  if (e instanceof XRPCError) {
    if (e.error === "AccountTakedown")
      return new AccountTakedownError4(e);
  }
  return e;
}

// src/client/types/com/atproto/server/requestAccountDelete.ts
var requestAccountDelete_exports = {};
__export(requestAccountDelete_exports, {
  toKnownErr: () => toKnownErr44
});
function toKnownErr44(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/requestPasswordReset.ts
var requestPasswordReset_exports = {};
__export(requestPasswordReset_exports, {
  toKnownErr: () => toKnownErr45
});
function toKnownErr45(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/server/resetPassword.ts
var resetPassword_exports = {};
__export(resetPassword_exports, {
  ExpiredTokenError: () => ExpiredTokenError2,
  InvalidTokenError: () => InvalidTokenError2,
  toKnownErr: () => toKnownErr46
});
var ExpiredTokenError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var InvalidTokenError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr46(e) {
  if (e instanceof XRPCError) {
    if (e.error === "ExpiredToken")
      return new ExpiredTokenError2(e);
    if (e.error === "InvalidToken")
      return new InvalidTokenError2(e);
  }
  return e;
}

// src/client/types/com/atproto/server/revokeAppPassword.ts
var revokeAppPassword_exports = {};
__export(revokeAppPassword_exports, {
  toKnownErr: () => toKnownErr47
});
function toKnownErr47(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getBlob.ts
var getBlob_exports = {};
__export(getBlob_exports, {
  toKnownErr: () => toKnownErr48
});
function toKnownErr48(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getBlocks.ts
var getBlocks_exports = {};
__export(getBlocks_exports, {
  toKnownErr: () => toKnownErr49
});
function toKnownErr49(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getCheckout.ts
var getCheckout_exports = {};
__export(getCheckout_exports, {
  toKnownErr: () => toKnownErr50
});
function toKnownErr50(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getCommitPath.ts
var getCommitPath_exports = {};
__export(getCommitPath_exports, {
  toKnownErr: () => toKnownErr51
});
function toKnownErr51(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getHead.ts
var getHead_exports = {};
__export(getHead_exports, {
  HeadNotFoundError: () => HeadNotFoundError,
  toKnownErr: () => toKnownErr52
});
var HeadNotFoundError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr52(e) {
  if (e instanceof XRPCError) {
    if (e.error === "HeadNotFound")
      return new HeadNotFoundError(e);
  }
  return e;
}

// src/client/types/com/atproto/sync/getRecord.ts
var getRecord_exports3 = {};
__export(getRecord_exports3, {
  toKnownErr: () => toKnownErr53
});
function toKnownErr53(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/getRepo.ts
var getRepo_exports2 = {};
__export(getRepo_exports2, {
  toKnownErr: () => toKnownErr54
});
function toKnownErr54(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/listBlobs.ts
var listBlobs_exports = {};
__export(listBlobs_exports, {
  toKnownErr: () => toKnownErr55
});
function toKnownErr55(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/listRepos.ts
var listRepos_exports = {};
__export(listRepos_exports, {
  isRepo: () => isRepo,
  toKnownErr: () => toKnownErr56,
  validateRepo: () => validateRepo
});
function toKnownErr56(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isRepo(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.listRepos#repo";
}
function validateRepo(v) {
  return lexicons.validate("com.atproto.sync.listRepos#repo", v);
}

// src/client/types/com/atproto/sync/notifyOfUpdate.ts
var notifyOfUpdate_exports = {};
__export(notifyOfUpdate_exports, {
  toKnownErr: () => toKnownErr57
});
function toKnownErr57(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/com/atproto/sync/requestCrawl.ts
var requestCrawl_exports = {};
__export(requestCrawl_exports, {
  toKnownErr: () => toKnownErr58
});
function toKnownErr58(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getPreferences.ts
var getPreferences_exports = {};
__export(getPreferences_exports, {
  toKnownErr: () => toKnownErr59
});
function toKnownErr59(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getProfile.ts
var getProfile_exports = {};
__export(getProfile_exports, {
  toKnownErr: () => toKnownErr60
});
function toKnownErr60(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getProfiles.ts
var getProfiles_exports = {};
__export(getProfiles_exports, {
  toKnownErr: () => toKnownErr61
});
function toKnownErr61(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/getSuggestions.ts
var getSuggestions_exports = {};
__export(getSuggestions_exports, {
  toKnownErr: () => toKnownErr62
});
function toKnownErr62(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/putPreferences.ts
var putPreferences_exports = {};
__export(putPreferences_exports, {
  toKnownErr: () => toKnownErr63
});
function toKnownErr63(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/searchActors.ts
var searchActors_exports = {};
__export(searchActors_exports, {
  toKnownErr: () => toKnownErr64
});
function toKnownErr64(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/actor/searchActorsTypeahead.ts
var searchActorsTypeahead_exports = {};
__export(searchActorsTypeahead_exports, {
  toKnownErr: () => toKnownErr65
});
function toKnownErr65(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/describeFeedGenerator.ts
var describeFeedGenerator_exports = {};
__export(describeFeedGenerator_exports, {
  isFeed: () => isFeed,
  isLinks: () => isLinks2,
  toKnownErr: () => toKnownErr66,
  validateFeed: () => validateFeed,
  validateLinks: () => validateLinks2
});
function toKnownErr66(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isFeed(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.describeFeedGenerator#feed";
}
function validateFeed(v) {
  return lexicons.validate("app.bsky.feed.describeFeedGenerator#feed", v);
}
function isLinks2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.describeFeedGenerator#links";
}
function validateLinks2(v) {
  return lexicons.validate("app.bsky.feed.describeFeedGenerator#links", v);
}

// src/client/types/app/bsky/feed/getActorFeeds.ts
var getActorFeeds_exports = {};
__export(getActorFeeds_exports, {
  toKnownErr: () => toKnownErr67
});
function toKnownErr67(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getActorLikes.ts
var getActorLikes_exports = {};
__export(getActorLikes_exports, {
  BlockedActorError: () => BlockedActorError,
  BlockedByActorError: () => BlockedByActorError,
  toKnownErr: () => toKnownErr68
});
var BlockedActorError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var BlockedByActorError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr68(e) {
  if (e instanceof XRPCError) {
    if (e.error === "BlockedActor")
      return new BlockedActorError(e);
    if (e.error === "BlockedByActor")
      return new BlockedByActorError(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getAuthorFeed.ts
var getAuthorFeed_exports = {};
__export(getAuthorFeed_exports, {
  BlockedActorError: () => BlockedActorError2,
  BlockedByActorError: () => BlockedByActorError2,
  toKnownErr: () => toKnownErr69
});
var BlockedActorError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
var BlockedByActorError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr69(e) {
  if (e instanceof XRPCError) {
    if (e.error === "BlockedActor")
      return new BlockedActorError2(e);
    if (e.error === "BlockedByActor")
      return new BlockedByActorError2(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getFeed.ts
var getFeed_exports = {};
__export(getFeed_exports, {
  UnknownFeedError: () => UnknownFeedError,
  toKnownErr: () => toKnownErr70
});
var UnknownFeedError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr70(e) {
  if (e instanceof XRPCError) {
    if (e.error === "UnknownFeed")
      return new UnknownFeedError(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getFeedGenerator.ts
var getFeedGenerator_exports = {};
__export(getFeedGenerator_exports, {
  toKnownErr: () => toKnownErr71
});
function toKnownErr71(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getFeedGenerators.ts
var getFeedGenerators_exports = {};
__export(getFeedGenerators_exports, {
  toKnownErr: () => toKnownErr72
});
function toKnownErr72(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getFeedSkeleton.ts
var getFeedSkeleton_exports = {};
__export(getFeedSkeleton_exports, {
  UnknownFeedError: () => UnknownFeedError2,
  toKnownErr: () => toKnownErr73
});
var UnknownFeedError2 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr73(e) {
  if (e instanceof XRPCError) {
    if (e.error === "UnknownFeed")
      return new UnknownFeedError2(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getLikes.ts
var getLikes_exports = {};
__export(getLikes_exports, {
  isLike: () => isLike,
  toKnownErr: () => toKnownErr74,
  validateLike: () => validateLike
});
function toKnownErr74(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isLike(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.getLikes#like";
}
function validateLike(v) {
  return lexicons.validate("app.bsky.feed.getLikes#like", v);
}

// src/client/types/app/bsky/feed/getPostThread.ts
var getPostThread_exports = {};
__export(getPostThread_exports, {
  NotFoundError: () => NotFoundError,
  toKnownErr: () => toKnownErr75
});
var NotFoundError = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr75(e) {
  if (e instanceof XRPCError) {
    if (e.error === "NotFound")
      return new NotFoundError(e);
  }
  return e;
}

// src/client/types/app/bsky/feed/getPosts.ts
var getPosts_exports = {};
__export(getPosts_exports, {
  toKnownErr: () => toKnownErr76
});
function toKnownErr76(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getRepostedBy.ts
var getRepostedBy_exports = {};
__export(getRepostedBy_exports, {
  toKnownErr: () => toKnownErr77
});
function toKnownErr77(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/feed/getTimeline.ts
var getTimeline_exports = {};
__export(getTimeline_exports, {
  toKnownErr: () => toKnownErr78
});
function toKnownErr78(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getBlocks.ts
var getBlocks_exports2 = {};
__export(getBlocks_exports2, {
  toKnownErr: () => toKnownErr79
});
function toKnownErr79(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getFollowers.ts
var getFollowers_exports = {};
__export(getFollowers_exports, {
  toKnownErr: () => toKnownErr80
});
function toKnownErr80(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getFollows.ts
var getFollows_exports = {};
__export(getFollows_exports, {
  toKnownErr: () => toKnownErr81
});
function toKnownErr81(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getList.ts
var getList_exports = {};
__export(getList_exports, {
  toKnownErr: () => toKnownErr82
});
function toKnownErr82(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getListMutes.ts
var getListMutes_exports = {};
__export(getListMutes_exports, {
  toKnownErr: () => toKnownErr83
});
function toKnownErr83(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getLists.ts
var getLists_exports = {};
__export(getLists_exports, {
  toKnownErr: () => toKnownErr84
});
function toKnownErr84(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/getMutes.ts
var getMutes_exports = {};
__export(getMutes_exports, {
  toKnownErr: () => toKnownErr85
});
function toKnownErr85(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/muteActor.ts
var muteActor_exports = {};
__export(muteActor_exports, {
  toKnownErr: () => toKnownErr86
});
function toKnownErr86(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/muteActorList.ts
var muteActorList_exports = {};
__export(muteActorList_exports, {
  toKnownErr: () => toKnownErr87
});
function toKnownErr87(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/unmuteActor.ts
var unmuteActor_exports = {};
__export(unmuteActor_exports, {
  toKnownErr: () => toKnownErr88
});
function toKnownErr88(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/graph/unmuteActorList.ts
var unmuteActorList_exports = {};
__export(unmuteActorList_exports, {
  toKnownErr: () => toKnownErr89
});
function toKnownErr89(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/notification/getUnreadCount.ts
var getUnreadCount_exports = {};
__export(getUnreadCount_exports, {
  toKnownErr: () => toKnownErr90
});
function toKnownErr90(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/notification/listNotifications.ts
var listNotifications_exports = {};
__export(listNotifications_exports, {
  isNotification: () => isNotification,
  toKnownErr: () => toKnownErr91,
  validateNotification: () => validateNotification
});
function toKnownErr91(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}
function isNotification(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.notification.listNotifications#notification";
}
function validateNotification(v) {
  return lexicons.validate(
    "app.bsky.notification.listNotifications#notification",
    v
  );
}

// src/client/types/app/bsky/notification/registerPush.ts
var registerPush_exports = {};
__export(registerPush_exports, {
  toKnownErr: () => toKnownErr92
});
function toKnownErr92(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/notification/updateSeen.ts
var updateSeen_exports = {};
__export(updateSeen_exports, {
  toKnownErr: () => toKnownErr93
});
function toKnownErr93(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/unspecced/applyLabels.ts
var applyLabels_exports = {};
__export(applyLabels_exports, {
  toKnownErr: () => toKnownErr94
});
function toKnownErr94(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/unspecced/getPopular.ts
var getPopular_exports = {};
__export(getPopular_exports, {
  toKnownErr: () => toKnownErr95
});
function toKnownErr95(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/unspecced/getPopularFeedGenerators.ts
var getPopularFeedGenerators_exports = {};
__export(getPopularFeedGenerators_exports, {
  toKnownErr: () => toKnownErr96
});
function toKnownErr96(e) {
  if (e instanceof XRPCError) {
  }
  return e;
}

// src/client/types/app/bsky/unspecced/getTimelineSkeleton.ts
var getTimelineSkeleton_exports = {};
__export(getTimelineSkeleton_exports, {
  UnknownFeedError: () => UnknownFeedError3,
  toKnownErr: () => toKnownErr97
});
var UnknownFeedError3 = class extends XRPCError {
  constructor(src2) {
    super(src2.status, src2.error, src2.message, src2.headers);
  }
};
function toKnownErr97(e) {
  if (e instanceof XRPCError) {
    if (e.error === "UnknownFeed")
      return new UnknownFeedError3(e);
  }
  return e;
}

// src/client/types/com/atproto/admin/defs.ts
var defs_exports = {};
__export(defs_exports, {
  ACKNOWLEDGE: () => ACKNOWLEDGE,
  ESCALATE: () => ESCALATE,
  FLAG: () => FLAG,
  TAKEDOWN: () => TAKEDOWN,
  isActionReversal: () => isActionReversal,
  isActionView: () => isActionView,
  isActionViewCurrent: () => isActionViewCurrent,
  isActionViewDetail: () => isActionViewDetail,
  isBlobView: () => isBlobView,
  isImageDetails: () => isImageDetails,
  isModeration: () => isModeration,
  isModerationDetail: () => isModerationDetail,
  isRecordView: () => isRecordView,
  isRecordViewDetail: () => isRecordViewDetail,
  isRecordViewNotFound: () => isRecordViewNotFound,
  isRepoRef: () => isRepoRef,
  isRepoView: () => isRepoView,
  isRepoViewDetail: () => isRepoViewDetail,
  isRepoViewNotFound: () => isRepoViewNotFound,
  isReportView: () => isReportView,
  isReportViewDetail: () => isReportViewDetail,
  isVideoDetails: () => isVideoDetails,
  validateActionReversal: () => validateActionReversal,
  validateActionView: () => validateActionView,
  validateActionViewCurrent: () => validateActionViewCurrent,
  validateActionViewDetail: () => validateActionViewDetail,
  validateBlobView: () => validateBlobView,
  validateImageDetails: () => validateImageDetails,
  validateModeration: () => validateModeration,
  validateModerationDetail: () => validateModerationDetail,
  validateRecordView: () => validateRecordView,
  validateRecordViewDetail: () => validateRecordViewDetail,
  validateRecordViewNotFound: () => validateRecordViewNotFound,
  validateRepoRef: () => validateRepoRef,
  validateRepoView: () => validateRepoView,
  validateRepoViewDetail: () => validateRepoViewDetail,
  validateRepoViewNotFound: () => validateRepoViewNotFound,
  validateReportView: () => validateReportView,
  validateReportViewDetail: () => validateReportViewDetail,
  validateVideoDetails: () => validateVideoDetails
});
function isActionView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionView";
}
function validateActionView(v) {
  return lexicons.validate("com.atproto.admin.defs#actionView", v);
}
function isActionViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionViewDetail";
}
function validateActionViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#actionViewDetail", v);
}
function isActionViewCurrent(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionViewCurrent";
}
function validateActionViewCurrent(v) {
  return lexicons.validate("com.atproto.admin.defs#actionViewCurrent", v);
}
function isActionReversal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#actionReversal";
}
function validateActionReversal(v) {
  return lexicons.validate("com.atproto.admin.defs#actionReversal", v);
}
var TAKEDOWN = "com.atproto.admin.defs#takedown";
var FLAG = "com.atproto.admin.defs#flag";
var ACKNOWLEDGE = "com.atproto.admin.defs#acknowledge";
var ESCALATE = "com.atproto.admin.defs#escalate";
function isReportView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#reportView";
}
function validateReportView(v) {
  return lexicons.validate("com.atproto.admin.defs#reportView", v);
}
function isReportViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#reportViewDetail";
}
function validateReportViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#reportViewDetail", v);
}
function isRepoView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoView";
}
function validateRepoView(v) {
  return lexicons.validate("com.atproto.admin.defs#repoView", v);
}
function isRepoViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoViewDetail";
}
function validateRepoViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#repoViewDetail", v);
}
function isRepoViewNotFound(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoViewNotFound";
}
function validateRepoViewNotFound(v) {
  return lexicons.validate("com.atproto.admin.defs#repoViewNotFound", v);
}
function isRepoRef(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#repoRef";
}
function validateRepoRef(v) {
  return lexicons.validate("com.atproto.admin.defs#repoRef", v);
}
function isRecordView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#recordView";
}
function validateRecordView(v) {
  return lexicons.validate("com.atproto.admin.defs#recordView", v);
}
function isRecordViewDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#recordViewDetail";
}
function validateRecordViewDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#recordViewDetail", v);
}
function isRecordViewNotFound(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#recordViewNotFound";
}
function validateRecordViewNotFound(v) {
  return lexicons.validate("com.atproto.admin.defs#recordViewNotFound", v);
}
function isModeration(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#moderation";
}
function validateModeration(v) {
  return lexicons.validate("com.atproto.admin.defs#moderation", v);
}
function isModerationDetail(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#moderationDetail";
}
function validateModerationDetail(v) {
  return lexicons.validate("com.atproto.admin.defs#moderationDetail", v);
}
function isBlobView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#blobView";
}
function validateBlobView(v) {
  return lexicons.validate("com.atproto.admin.defs#blobView", v);
}
function isImageDetails(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#imageDetails";
}
function validateImageDetails(v) {
  return lexicons.validate("com.atproto.admin.defs#imageDetails", v);
}
function isVideoDetails(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.admin.defs#videoDetails";
}
function validateVideoDetails(v) {
  return lexicons.validate("com.atproto.admin.defs#videoDetails", v);
}

// src/client/types/com/atproto/label/defs.ts
var defs_exports2 = {};
__export(defs_exports2, {
  isLabel: () => isLabel,
  isSelfLabel: () => isSelfLabel,
  isSelfLabels: () => isSelfLabels,
  validateLabel: () => validateLabel,
  validateSelfLabel: () => validateSelfLabel,
  validateSelfLabels: () => validateSelfLabels
});
function isLabel(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.defs#label";
}
function validateLabel(v) {
  return lexicons.validate("com.atproto.label.defs#label", v);
}
function isSelfLabels(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.defs#selfLabels";
}
function validateSelfLabels(v) {
  return lexicons.validate("com.atproto.label.defs#selfLabels", v);
}
function isSelfLabel(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.defs#selfLabel";
}
function validateSelfLabel(v) {
  return lexicons.validate("com.atproto.label.defs#selfLabel", v);
}

// src/client/types/com/atproto/label/subscribeLabels.ts
var subscribeLabels_exports = {};
__export(subscribeLabels_exports, {
  isInfo: () => isInfo,
  isLabels: () => isLabels,
  validateInfo: () => validateInfo,
  validateLabels: () => validateLabels
});
function isLabels(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.subscribeLabels#labels";
}
function validateLabels(v) {
  return lexicons.validate("com.atproto.label.subscribeLabels#labels", v);
}
function isInfo(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.label.subscribeLabels#info";
}
function validateInfo(v) {
  return lexicons.validate("com.atproto.label.subscribeLabels#info", v);
}

// src/client/types/com/atproto/moderation/defs.ts
var defs_exports3 = {};
__export(defs_exports3, {
  REASONMISLEADING: () => REASONMISLEADING,
  REASONOTHER: () => REASONOTHER,
  REASONRUDE: () => REASONRUDE,
  REASONSEXUAL: () => REASONSEXUAL,
  REASONSPAM: () => REASONSPAM,
  REASONVIOLATION: () => REASONVIOLATION
});
var REASONSPAM = "com.atproto.moderation.defs#reasonSpam";
var REASONVIOLATION = "com.atproto.moderation.defs#reasonViolation";
var REASONMISLEADING = "com.atproto.moderation.defs#reasonMisleading";
var REASONSEXUAL = "com.atproto.moderation.defs#reasonSexual";
var REASONRUDE = "com.atproto.moderation.defs#reasonRude";
var REASONOTHER = "com.atproto.moderation.defs#reasonOther";

// src/client/types/com/atproto/repo/strongRef.ts
var strongRef_exports = {};
__export(strongRef_exports, {
  isMain: () => isMain,
  validateMain: () => validateMain
});
function isMain(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "com.atproto.repo.strongRef#main" || v.$type === "com.atproto.repo.strongRef");
}
function validateMain(v) {
  return lexicons.validate("com.atproto.repo.strongRef#main", v);
}

// src/client/types/com/atproto/server/defs.ts
var defs_exports4 = {};
__export(defs_exports4, {
  isInviteCode: () => isInviteCode,
  isInviteCodeUse: () => isInviteCodeUse,
  validateInviteCode: () => validateInviteCode,
  validateInviteCodeUse: () => validateInviteCodeUse
});
function isInviteCode(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.defs#inviteCode";
}
function validateInviteCode(v) {
  return lexicons.validate("com.atproto.server.defs#inviteCode", v);
}
function isInviteCodeUse(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.server.defs#inviteCodeUse";
}
function validateInviteCodeUse(v) {
  return lexicons.validate("com.atproto.server.defs#inviteCodeUse", v);
}

// src/client/types/com/atproto/sync/subscribeRepos.ts
var subscribeRepos_exports = {};
__export(subscribeRepos_exports, {
  isCommit: () => isCommit,
  isHandle: () => isHandle,
  isInfo: () => isInfo2,
  isMigrate: () => isMigrate,
  isRepoOp: () => isRepoOp,
  isTombstone: () => isTombstone,
  validateCommit: () => validateCommit,
  validateHandle: () => validateHandle,
  validateInfo: () => validateInfo2,
  validateMigrate: () => validateMigrate,
  validateRepoOp: () => validateRepoOp,
  validateTombstone: () => validateTombstone
});
function isCommit(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#commit";
}
function validateCommit(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#commit", v);
}
function isHandle(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#handle";
}
function validateHandle(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#handle", v);
}
function isMigrate(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#migrate";
}
function validateMigrate(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#migrate", v);
}
function isTombstone(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#tombstone";
}
function validateTombstone(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#tombstone", v);
}
function isInfo2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#info";
}
function validateInfo2(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#info", v);
}
function isRepoOp(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "com.atproto.sync.subscribeRepos#repoOp";
}
function validateRepoOp(v) {
  return lexicons.validate("com.atproto.sync.subscribeRepos#repoOp", v);
}

// src/client/types/app/bsky/actor/defs.ts
var defs_exports5 = {};
__export(defs_exports5, {
  isAdultContentPref: () => isAdultContentPref,
  isContentLabelPref: () => isContentLabelPref,
  isProfileView: () => isProfileView,
  isProfileViewBasic: () => isProfileViewBasic,
  isProfileViewDetailed: () => isProfileViewDetailed,
  isSavedFeedsPref: () => isSavedFeedsPref,
  isViewerState: () => isViewerState,
  validateAdultContentPref: () => validateAdultContentPref,
  validateContentLabelPref: () => validateContentLabelPref,
  validateProfileView: () => validateProfileView,
  validateProfileViewBasic: () => validateProfileViewBasic,
  validateProfileViewDetailed: () => validateProfileViewDetailed,
  validateSavedFeedsPref: () => validateSavedFeedsPref,
  validateViewerState: () => validateViewerState
});
function isProfileViewBasic(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileViewBasic";
}
function validateProfileViewBasic(v) {
  return lexicons.validate("app.bsky.actor.defs#profileViewBasic", v);
}
function isProfileView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileView";
}
function validateProfileView(v) {
  return lexicons.validate("app.bsky.actor.defs#profileView", v);
}
function isProfileViewDetailed(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#profileViewDetailed";
}
function validateProfileViewDetailed(v) {
  return lexicons.validate("app.bsky.actor.defs#profileViewDetailed", v);
}
function isViewerState(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#viewerState";
}
function validateViewerState(v) {
  return lexicons.validate("app.bsky.actor.defs#viewerState", v);
}
function isAdultContentPref(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#adultContentPref";
}
function validateAdultContentPref(v) {
  return lexicons.validate("app.bsky.actor.defs#adultContentPref", v);
}
function isContentLabelPref(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#contentLabelPref";
}
function validateContentLabelPref(v) {
  return lexicons.validate("app.bsky.actor.defs#contentLabelPref", v);
}
function isSavedFeedsPref(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.actor.defs#savedFeedsPref";
}
function validateSavedFeedsPref(v) {
  return lexicons.validate("app.bsky.actor.defs#savedFeedsPref", v);
}

// src/client/types/app/bsky/actor/profile.ts
var profile_exports = {};
__export(profile_exports, {
  isRecord: () => isRecord2,
  validateRecord: () => validateRecord2
});
function isRecord2(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.actor.profile#main" || v.$type === "app.bsky.actor.profile");
}
function validateRecord2(v) {
  return lexicons.validate("app.bsky.actor.profile#main", v);
}

// src/client/types/app/bsky/embed/external.ts
var external_exports = {};
__export(external_exports, {
  isExternal: () => isExternal,
  isMain: () => isMain2,
  isView: () => isView,
  isViewExternal: () => isViewExternal,
  validateExternal: () => validateExternal,
  validateMain: () => validateMain2,
  validateView: () => validateView,
  validateViewExternal: () => validateViewExternal
});
function isMain2(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.external#main" || v.$type === "app.bsky.embed.external");
}
function validateMain2(v) {
  return lexicons.validate("app.bsky.embed.external#main", v);
}
function isExternal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#external";
}
function validateExternal(v) {
  return lexicons.validate("app.bsky.embed.external#external", v);
}
function isView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#view";
}
function validateView(v) {
  return lexicons.validate("app.bsky.embed.external#view", v);
}
function isViewExternal(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.external#viewExternal";
}
function validateViewExternal(v) {
  return lexicons.validate("app.bsky.embed.external#viewExternal", v);
}

// src/client/types/app/bsky/embed/images.ts
var images_exports = {};
__export(images_exports, {
  isImage: () => isImage,
  isMain: () => isMain3,
  isView: () => isView2,
  isViewImage: () => isViewImage,
  validateImage: () => validateImage,
  validateMain: () => validateMain3,
  validateView: () => validateView2,
  validateViewImage: () => validateViewImage
});
function isMain3(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.images#main" || v.$type === "app.bsky.embed.images");
}
function validateMain3(v) {
  return lexicons.validate("app.bsky.embed.images#main", v);
}
function isImage(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#image";
}
function validateImage(v) {
  return lexicons.validate("app.bsky.embed.images#image", v);
}
function isView2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#view";
}
function validateView2(v) {
  return lexicons.validate("app.bsky.embed.images#view", v);
}
function isViewImage(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.images#viewImage";
}
function validateViewImage(v) {
  return lexicons.validate("app.bsky.embed.images#viewImage", v);
}

// src/client/types/app/bsky/embed/record.ts
var record_exports = {};
__export(record_exports, {
  isMain: () => isMain4,
  isView: () => isView3,
  isViewBlocked: () => isViewBlocked,
  isViewNotFound: () => isViewNotFound,
  isViewRecord: () => isViewRecord,
  validateMain: () => validateMain4,
  validateView: () => validateView3,
  validateViewBlocked: () => validateViewBlocked,
  validateViewNotFound: () => validateViewNotFound,
  validateViewRecord: () => validateViewRecord
});
function isMain4(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.record#main" || v.$type === "app.bsky.embed.record");
}
function validateMain4(v) {
  return lexicons.validate("app.bsky.embed.record#main", v);
}
function isView3(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#view";
}
function validateView3(v) {
  return lexicons.validate("app.bsky.embed.record#view", v);
}
function isViewRecord(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#viewRecord";
}
function validateViewRecord(v) {
  return lexicons.validate("app.bsky.embed.record#viewRecord", v);
}
function isViewNotFound(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#viewNotFound";
}
function validateViewNotFound(v) {
  return lexicons.validate("app.bsky.embed.record#viewNotFound", v);
}
function isViewBlocked(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.record#viewBlocked";
}
function validateViewBlocked(v) {
  return lexicons.validate("app.bsky.embed.record#viewBlocked", v);
}

// src/client/types/app/bsky/embed/recordWithMedia.ts
var recordWithMedia_exports = {};
__export(recordWithMedia_exports, {
  isMain: () => isMain5,
  isView: () => isView4,
  validateMain: () => validateMain5,
  validateView: () => validateView4
});
function isMain5(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.embed.recordWithMedia#main" || v.$type === "app.bsky.embed.recordWithMedia");
}
function validateMain5(v) {
  return lexicons.validate("app.bsky.embed.recordWithMedia#main", v);
}
function isView4(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.embed.recordWithMedia#view";
}
function validateView4(v) {
  return lexicons.validate("app.bsky.embed.recordWithMedia#view", v);
}

// src/client/types/app/bsky/feed/defs.ts
var defs_exports6 = {};
__export(defs_exports6, {
  isBlockedAuthor: () => isBlockedAuthor,
  isBlockedPost: () => isBlockedPost,
  isFeedViewPost: () => isFeedViewPost,
  isGeneratorView: () => isGeneratorView,
  isGeneratorViewerState: () => isGeneratorViewerState,
  isNotFoundPost: () => isNotFoundPost,
  isPostView: () => isPostView,
  isReasonRepost: () => isReasonRepost,
  isReplyRef: () => isReplyRef,
  isSkeletonFeedPost: () => isSkeletonFeedPost,
  isSkeletonReasonRepost: () => isSkeletonReasonRepost,
  isThreadViewPost: () => isThreadViewPost,
  isViewerState: () => isViewerState2,
  validateBlockedAuthor: () => validateBlockedAuthor,
  validateBlockedPost: () => validateBlockedPost,
  validateFeedViewPost: () => validateFeedViewPost,
  validateGeneratorView: () => validateGeneratorView,
  validateGeneratorViewerState: () => validateGeneratorViewerState,
  validateNotFoundPost: () => validateNotFoundPost,
  validatePostView: () => validatePostView,
  validateReasonRepost: () => validateReasonRepost,
  validateReplyRef: () => validateReplyRef,
  validateSkeletonFeedPost: () => validateSkeletonFeedPost,
  validateSkeletonReasonRepost: () => validateSkeletonReasonRepost,
  validateThreadViewPost: () => validateThreadViewPost,
  validateViewerState: () => validateViewerState2
});
function isPostView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#postView";
}
function validatePostView(v) {
  return lexicons.validate("app.bsky.feed.defs#postView", v);
}
function isViewerState2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#viewerState";
}
function validateViewerState2(v) {
  return lexicons.validate("app.bsky.feed.defs#viewerState", v);
}
function isFeedViewPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#feedViewPost";
}
function validateFeedViewPost(v) {
  return lexicons.validate("app.bsky.feed.defs#feedViewPost", v);
}
function isReplyRef(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#replyRef";
}
function validateReplyRef(v) {
  return lexicons.validate("app.bsky.feed.defs#replyRef", v);
}
function isReasonRepost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#reasonRepost";
}
function validateReasonRepost(v) {
  return lexicons.validate("app.bsky.feed.defs#reasonRepost", v);
}
function isThreadViewPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#threadViewPost";
}
function validateThreadViewPost(v) {
  return lexicons.validate("app.bsky.feed.defs#threadViewPost", v);
}
function isNotFoundPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#notFoundPost";
}
function validateNotFoundPost(v) {
  return lexicons.validate("app.bsky.feed.defs#notFoundPost", v);
}
function isBlockedPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#blockedPost";
}
function validateBlockedPost(v) {
  return lexicons.validate("app.bsky.feed.defs#blockedPost", v);
}
function isBlockedAuthor(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#blockedAuthor";
}
function validateBlockedAuthor(v) {
  return lexicons.validate("app.bsky.feed.defs#blockedAuthor", v);
}
function isGeneratorView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#generatorView";
}
function validateGeneratorView(v) {
  return lexicons.validate("app.bsky.feed.defs#generatorView", v);
}
function isGeneratorViewerState(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#generatorViewerState";
}
function validateGeneratorViewerState(v) {
  return lexicons.validate("app.bsky.feed.defs#generatorViewerState", v);
}
function isSkeletonFeedPost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#skeletonFeedPost";
}
function validateSkeletonFeedPost(v) {
  return lexicons.validate("app.bsky.feed.defs#skeletonFeedPost", v);
}
function isSkeletonReasonRepost(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.defs#skeletonReasonRepost";
}
function validateSkeletonReasonRepost(v) {
  return lexicons.validate("app.bsky.feed.defs#skeletonReasonRepost", v);
}

// src/client/types/app/bsky/feed/generator.ts
var generator_exports = {};
__export(generator_exports, {
  isRecord: () => isRecord3,
  validateRecord: () => validateRecord3
});
function isRecord3(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.generator#main" || v.$type === "app.bsky.feed.generator");
}
function validateRecord3(v) {
  return lexicons.validate("app.bsky.feed.generator#main", v);
}

// src/client/types/app/bsky/feed/like.ts
var like_exports = {};
__export(like_exports, {
  isRecord: () => isRecord4,
  validateRecord: () => validateRecord4
});
function isRecord4(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.like#main" || v.$type === "app.bsky.feed.like");
}
function validateRecord4(v) {
  return lexicons.validate("app.bsky.feed.like#main", v);
}

// src/client/types/app/bsky/feed/post.ts
var post_exports = {};
__export(post_exports, {
  isEntity: () => isEntity,
  isRecord: () => isRecord5,
  isReplyRef: () => isReplyRef2,
  isTextSlice: () => isTextSlice,
  validateEntity: () => validateEntity,
  validateRecord: () => validateRecord5,
  validateReplyRef: () => validateReplyRef2,
  validateTextSlice: () => validateTextSlice
});
function isRecord5(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.post#main" || v.$type === "app.bsky.feed.post");
}
function validateRecord5(v) {
  return lexicons.validate("app.bsky.feed.post#main", v);
}
function isReplyRef2(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#replyRef";
}
function validateReplyRef2(v) {
  return lexicons.validate("app.bsky.feed.post#replyRef", v);
}
function isEntity(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#entity";
}
function validateEntity(v) {
  return lexicons.validate("app.bsky.feed.post#entity", v);
}
function isTextSlice(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.feed.post#textSlice";
}
function validateTextSlice(v) {
  return lexicons.validate("app.bsky.feed.post#textSlice", v);
}

// src/client/types/app/bsky/feed/repost.ts
var repost_exports = {};
__export(repost_exports, {
  isRecord: () => isRecord6,
  validateRecord: () => validateRecord6
});
function isRecord6(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.feed.repost#main" || v.$type === "app.bsky.feed.repost");
}
function validateRecord6(v) {
  return lexicons.validate("app.bsky.feed.repost#main", v);
}

// src/client/types/app/bsky/graph/block.ts
var block_exports = {};
__export(block_exports, {
  isRecord: () => isRecord7,
  validateRecord: () => validateRecord7
});
function isRecord7(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.graph.block#main" || v.$type === "app.bsky.graph.block");
}
function validateRecord7(v) {
  return lexicons.validate("app.bsky.graph.block#main", v);
}

// src/client/types/app/bsky/graph/defs.ts
var defs_exports7 = {};
__export(defs_exports7, {
  MODLIST: () => MODLIST,
  isListItemView: () => isListItemView,
  isListView: () => isListView,
  isListViewBasic: () => isListViewBasic,
  isListViewerState: () => isListViewerState,
  validateListItemView: () => validateListItemView,
  validateListView: () => validateListView,
  validateListViewBasic: () => validateListViewBasic,
  validateListViewerState: () => validateListViewerState
});
function isListViewBasic(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.graph.defs#listViewBasic";
}
function validateListViewBasic(v) {
  return lexicons.validate("app.bsky.graph.defs#listViewBasic", v);
}
function isListView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.graph.defs#listView";
}
function validateListView(v) {
  return lexicons.validate("app.bsky.graph.defs#listView", v);
}
function isListItemView(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.graph.defs#listItemView";
}
function validateListItemView(v) {
  return lexicons.validate("app.bsky.graph.defs#listItemView", v);
}
var MODLIST = "app.bsky.graph.defs#modlist";
function isListViewerState(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.graph.defs#listViewerState";
}
function validateListViewerState(v) {
  return lexicons.validate("app.bsky.graph.defs#listViewerState", v);
}

// src/client/types/app/bsky/graph/follow.ts
var follow_exports = {};
__export(follow_exports, {
  isRecord: () => isRecord8,
  validateRecord: () => validateRecord8
});
function isRecord8(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.graph.follow#main" || v.$type === "app.bsky.graph.follow");
}
function validateRecord8(v) {
  return lexicons.validate("app.bsky.graph.follow#main", v);
}

// src/client/types/app/bsky/graph/list.ts
var list_exports = {};
__export(list_exports, {
  isRecord: () => isRecord9,
  validateRecord: () => validateRecord9
});
function isRecord9(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.graph.list#main" || v.$type === "app.bsky.graph.list");
}
function validateRecord9(v) {
  return lexicons.validate("app.bsky.graph.list#main", v);
}

// src/client/types/app/bsky/graph/listitem.ts
var listitem_exports = {};
__export(listitem_exports, {
  isRecord: () => isRecord10,
  validateRecord: () => validateRecord10
});
function isRecord10(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.graph.listitem#main" || v.$type === "app.bsky.graph.listitem");
}
function validateRecord10(v) {
  return lexicons.validate("app.bsky.graph.listitem#main", v);
}

// src/client/types/app/bsky/richtext/facet.ts
var facet_exports = {};
__export(facet_exports, {
  isByteSlice: () => isByteSlice,
  isLink: () => isLink,
  isMain: () => isMain6,
  isMention: () => isMention,
  validateByteSlice: () => validateByteSlice,
  validateLink: () => validateLink,
  validateMain: () => validateMain6,
  validateMention: () => validateMention
});
function isMain6(v) {
  return isObj2(v) && hasProp2(v, "$type") && (v.$type === "app.bsky.richtext.facet#main" || v.$type === "app.bsky.richtext.facet");
}
function validateMain6(v) {
  return lexicons.validate("app.bsky.richtext.facet#main", v);
}
function isMention(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#mention";
}
function validateMention(v) {
  return lexicons.validate("app.bsky.richtext.facet#mention", v);
}
function isLink(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#link";
}
function validateLink(v) {
  return lexicons.validate("app.bsky.richtext.facet#link", v);
}
function isByteSlice(v) {
  return isObj2(v) && hasProp2(v, "$type") && v.$type === "app.bsky.richtext.facet#byteSlice";
}
function validateByteSlice(v) {
  return lexicons.validate("app.bsky.richtext.facet#byteSlice", v);
}

// src/client/index.ts
var COM_ATPROTO_ADMIN = {
  DefsTakedown: "com.atproto.admin.defs#takedown",
  DefsFlag: "com.atproto.admin.defs#flag",
  DefsAcknowledge: "com.atproto.admin.defs#acknowledge",
  DefsEscalate: "com.atproto.admin.defs#escalate"
};
var COM_ATPROTO_MODERATION = {
  DefsReasonSpam: "com.atproto.moderation.defs#reasonSpam",
  DefsReasonViolation: "com.atproto.moderation.defs#reasonViolation",
  DefsReasonMisleading: "com.atproto.moderation.defs#reasonMisleading",
  DefsReasonSexual: "com.atproto.moderation.defs#reasonSexual",
  DefsReasonRude: "com.atproto.moderation.defs#reasonRude",
  DefsReasonOther: "com.atproto.moderation.defs#reasonOther"
};
var APP_BSKY_GRAPH = {
  DefsModlist: "app.bsky.graph.defs#modlist"
};
var AtpBaseClient = class {
  constructor() {
    this.xrpc = new Client();
    this.xrpc.addLexicons(schemas);
  }
  service(serviceUri) {
    return new AtpServiceClient(this, this.xrpc.service(serviceUri));
  }
};
var AtpServiceClient = class {
  constructor(baseClient, xrpcService) {
    this._baseClient = baseClient;
    this.xrpc = xrpcService;
    this.com = new ComNS(this);
    this.app = new AppNS(this);
  }
  setHeader(key, value) {
    this.xrpc.setHeader(key, value);
  }
};
var ComNS = class {
  constructor(service) {
    this._service = service;
    this.atproto = new AtprotoNS(service);
  }
};
var AtprotoNS = class {
  constructor(service) {
    this._service = service;
    this.admin = new AdminNS(service);
    this.identity = new IdentityNS(service);
    this.label = new LabelNS(service);
    this.moderation = new ModerationNS(service);
    this.repo = new RepoNS(service);
    this.server = new ServerNS(service);
    this.sync = new SyncNS(service);
  }
};
var AdminNS = class {
  constructor(service) {
    this._service = service;
  }
  disableAccountInvites(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.disableAccountInvites", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr(e);
    });
  }
  disableInviteCodes(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.disableInviteCodes", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr2(e);
    });
  }
  enableAccountInvites(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.enableAccountInvites", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr3(e);
    });
  }
  getInviteCodes(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getInviteCodes", params2, void 0, opts).catch((e) => {
      throw toKnownErr4(e);
    });
  }
  getModerationAction(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationAction", params2, void 0, opts).catch((e) => {
      throw toKnownErr5(e);
    });
  }
  getModerationActions(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationActions", params2, void 0, opts).catch((e) => {
      throw toKnownErr6(e);
    });
  }
  getModerationReport(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationReport", params2, void 0, opts).catch((e) => {
      throw toKnownErr7(e);
    });
  }
  getModerationReports(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getModerationReports", params2, void 0, opts).catch((e) => {
      throw toKnownErr8(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr9(e);
    });
  }
  getRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.getRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr10(e);
    });
  }
  rebaseRepo(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.rebaseRepo", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr11(e);
    });
  }
  resolveModerationReports(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.resolveModerationReports", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr12(e);
    });
  }
  reverseModerationAction(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.reverseModerationAction", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr13(e);
    });
  }
  searchRepos(params2, opts) {
    return this._service.xrpc.call("com.atproto.admin.searchRepos", params2, void 0, opts).catch((e) => {
      throw toKnownErr14(e);
    });
  }
  sendEmail(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.sendEmail", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr15(e);
    });
  }
  takeModerationAction(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.takeModerationAction", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr16(e);
    });
  }
  updateAccountEmail(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountEmail", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr17(e);
    });
  }
  updateAccountHandle(data, opts) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountHandle", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr18(e);
    });
  }
};
var IdentityNS = class {
  constructor(service) {
    this._service = service;
  }
  resolveHandle(params2, opts) {
    return this._service.xrpc.call("com.atproto.identity.resolveHandle", params2, void 0, opts).catch((e) => {
      throw toKnownErr19(e);
    });
  }
  updateHandle(data, opts) {
    return this._service.xrpc.call("com.atproto.identity.updateHandle", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr20(e);
    });
  }
};
var LabelNS = class {
  constructor(service) {
    this._service = service;
  }
  queryLabels(params2, opts) {
    return this._service.xrpc.call("com.atproto.label.queryLabels", params2, void 0, opts).catch((e) => {
      throw toKnownErr21(e);
    });
  }
};
var ModerationNS = class {
  constructor(service) {
    this._service = service;
  }
  createReport(data, opts) {
    return this._service.xrpc.call("com.atproto.moderation.createReport", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr22(e);
    });
  }
};
var RepoNS = class {
  constructor(service) {
    this._service = service;
  }
  applyWrites(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.applyWrites", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr23(e);
    });
  }
  createRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.createRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr24(e);
    });
  }
  deleteRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.deleteRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr25(e);
    });
  }
  describeRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.describeRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr26(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr27(e);
    });
  }
  listRecords(params2, opts) {
    return this._service.xrpc.call("com.atproto.repo.listRecords", params2, void 0, opts).catch((e) => {
      throw toKnownErr28(e);
    });
  }
  putRecord(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.putRecord", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr29(e);
    });
  }
  rebaseRepo(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.rebaseRepo", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr30(e);
    });
  }
  uploadBlob(data, opts) {
    return this._service.xrpc.call("com.atproto.repo.uploadBlob", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr31(e);
    });
  }
};
var ServerNS = class {
  constructor(service) {
    this._service = service;
  }
  createAccount(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createAccount", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr32(e);
    });
  }
  createAppPassword(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createAppPassword", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr33(e);
    });
  }
  createInviteCode(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createInviteCode", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr34(e);
    });
  }
  createInviteCodes(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createInviteCodes", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr35(e);
    });
  }
  createSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.createSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr36(e);
    });
  }
  deleteAccount(data, opts) {
    return this._service.xrpc.call("com.atproto.server.deleteAccount", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr37(e);
    });
  }
  deleteSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.deleteSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr38(e);
    });
  }
  describeServer(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.describeServer", params2, void 0, opts).catch((e) => {
      throw toKnownErr39(e);
    });
  }
  getAccountInviteCodes(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.getAccountInviteCodes", params2, void 0, opts).catch((e) => {
      throw toKnownErr40(e);
    });
  }
  getSession(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.getSession", params2, void 0, opts).catch((e) => {
      throw toKnownErr41(e);
    });
  }
  listAppPasswords(params2, opts) {
    return this._service.xrpc.call("com.atproto.server.listAppPasswords", params2, void 0, opts).catch((e) => {
      throw toKnownErr42(e);
    });
  }
  refreshSession(data, opts) {
    return this._service.xrpc.call("com.atproto.server.refreshSession", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr43(e);
    });
  }
  requestAccountDelete(data, opts) {
    return this._service.xrpc.call("com.atproto.server.requestAccountDelete", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr44(e);
    });
  }
  requestPasswordReset(data, opts) {
    return this._service.xrpc.call("com.atproto.server.requestPasswordReset", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr45(e);
    });
  }
  resetPassword(data, opts) {
    return this._service.xrpc.call("com.atproto.server.resetPassword", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr46(e);
    });
  }
  revokeAppPassword(data, opts) {
    return this._service.xrpc.call("com.atproto.server.revokeAppPassword", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr47(e);
    });
  }
};
var SyncNS = class {
  constructor(service) {
    this._service = service;
  }
  getBlob(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getBlob", params2, void 0, opts).catch((e) => {
      throw toKnownErr48(e);
    });
  }
  getBlocks(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getBlocks", params2, void 0, opts).catch((e) => {
      throw toKnownErr49(e);
    });
  }
  getCheckout(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getCheckout", params2, void 0, opts).catch((e) => {
      throw toKnownErr50(e);
    });
  }
  getCommitPath(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getCommitPath", params2, void 0, opts).catch((e) => {
      throw toKnownErr51(e);
    });
  }
  getHead(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getHead", params2, void 0, opts).catch((e) => {
      throw toKnownErr52(e);
    });
  }
  getRecord(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getRecord", params2, void 0, opts).catch((e) => {
      throw toKnownErr53(e);
    });
  }
  getRepo(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.getRepo", params2, void 0, opts).catch((e) => {
      throw toKnownErr54(e);
    });
  }
  listBlobs(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.listBlobs", params2, void 0, opts).catch((e) => {
      throw toKnownErr55(e);
    });
  }
  listRepos(params2, opts) {
    return this._service.xrpc.call("com.atproto.sync.listRepos", params2, void 0, opts).catch((e) => {
      throw toKnownErr56(e);
    });
  }
  notifyOfUpdate(data, opts) {
    return this._service.xrpc.call("com.atproto.sync.notifyOfUpdate", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr57(e);
    });
  }
  requestCrawl(data, opts) {
    return this._service.xrpc.call("com.atproto.sync.requestCrawl", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr58(e);
    });
  }
};
var AppNS = class {
  constructor(service) {
    this._service = service;
    this.bsky = new BskyNS(service);
  }
};
var BskyNS = class {
  constructor(service) {
    this._service = service;
    this.actor = new ActorNS(service);
    this.embed = new EmbedNS(service);
    this.feed = new FeedNS(service);
    this.graph = new GraphNS(service);
    this.notification = new NotificationNS(service);
    this.richtext = new RichtextNS(service);
    this.unspecced = new UnspeccedNS(service);
  }
};
var ActorNS = class {
  constructor(service) {
    this._service = service;
    this.profile = new ProfileRecord(service);
  }
  getPreferences(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getPreferences", params2, void 0, opts).catch((e) => {
      throw toKnownErr59(e);
    });
  }
  getProfile(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getProfile", params2, void 0, opts).catch((e) => {
      throw toKnownErr60(e);
    });
  }
  getProfiles(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getProfiles", params2, void 0, opts).catch((e) => {
      throw toKnownErr61(e);
    });
  }
  getSuggestions(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.getSuggestions", params2, void 0, opts).catch((e) => {
      throw toKnownErr62(e);
    });
  }
  putPreferences(data, opts) {
    return this._service.xrpc.call("app.bsky.actor.putPreferences", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr63(e);
    });
  }
  searchActors(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.searchActors", params2, void 0, opts).catch((e) => {
      throw toKnownErr64(e);
    });
  }
  searchActorsTypeahead(params2, opts) {
    return this._service.xrpc.call("app.bsky.actor.searchActorsTypeahead", params2, void 0, opts).catch((e) => {
      throw toKnownErr65(e);
    });
  }
};
var ProfileRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.actor.profile",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.actor.profile",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.actor.profile";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.actor.profile", rkey: "self", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.actor.profile", ...params2 },
      { headers }
    );
  }
};
var EmbedNS = class {
  constructor(service) {
    this._service = service;
  }
};
var FeedNS = class {
  constructor(service) {
    this._service = service;
    this.generator = new GeneratorRecord(service);
    this.like = new LikeRecord(service);
    this.post = new PostRecord(service);
    this.repost = new RepostRecord(service);
  }
  describeFeedGenerator(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.describeFeedGenerator", params2, void 0, opts).catch((e) => {
      throw toKnownErr66(e);
    });
  }
  getActorFeeds(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getActorFeeds", params2, void 0, opts).catch((e) => {
      throw toKnownErr67(e);
    });
  }
  getActorLikes(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getActorLikes", params2, void 0, opts).catch((e) => {
      throw toKnownErr68(e);
    });
  }
  getAuthorFeed(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getAuthorFeed", params2, void 0, opts).catch((e) => {
      throw toKnownErr69(e);
    });
  }
  getFeed(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getFeed", params2, void 0, opts).catch((e) => {
      throw toKnownErr70(e);
    });
  }
  getFeedGenerator(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getFeedGenerator", params2, void 0, opts).catch((e) => {
      throw toKnownErr71(e);
    });
  }
  getFeedGenerators(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getFeedGenerators", params2, void 0, opts).catch((e) => {
      throw toKnownErr72(e);
    });
  }
  getFeedSkeleton(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getFeedSkeleton", params2, void 0, opts).catch((e) => {
      throw toKnownErr73(e);
    });
  }
  getLikes(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getLikes", params2, void 0, opts).catch((e) => {
      throw toKnownErr74(e);
    });
  }
  getPostThread(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getPostThread", params2, void 0, opts).catch((e) => {
      throw toKnownErr75(e);
    });
  }
  getPosts(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getPosts", params2, void 0, opts).catch((e) => {
      throw toKnownErr76(e);
    });
  }
  getRepostedBy(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getRepostedBy", params2, void 0, opts).catch((e) => {
      throw toKnownErr77(e);
    });
  }
  getTimeline(params2, opts) {
    return this._service.xrpc.call("app.bsky.feed.getTimeline", params2, void 0, opts).catch((e) => {
      throw toKnownErr78(e);
    });
  }
};
var GeneratorRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.generator",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.generator",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.generator";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.generator", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.generator", ...params2 },
      { headers }
    );
  }
};
var LikeRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.like",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.like",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.like";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.like", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.like", ...params2 },
      { headers }
    );
  }
};
var PostRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.post",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.post",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.post";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.post", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.post", ...params2 },
      { headers }
    );
  }
};
var RepostRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.repost",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.repost",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.feed.repost";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.feed.repost", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.feed.repost", ...params2 },
      { headers }
    );
  }
};
var GraphNS = class {
  constructor(service) {
    this._service = service;
    this.block = new BlockRecord(service);
    this.follow = new FollowRecord(service);
    this.list = new ListRecord(service);
    this.listitem = new ListitemRecord(service);
  }
  getBlocks(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getBlocks", params2, void 0, opts).catch((e) => {
      throw toKnownErr79(e);
    });
  }
  getFollowers(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getFollowers", params2, void 0, opts).catch((e) => {
      throw toKnownErr80(e);
    });
  }
  getFollows(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getFollows", params2, void 0, opts).catch((e) => {
      throw toKnownErr81(e);
    });
  }
  getList(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getList", params2, void 0, opts).catch((e) => {
      throw toKnownErr82(e);
    });
  }
  getListMutes(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getListMutes", params2, void 0, opts).catch((e) => {
      throw toKnownErr83(e);
    });
  }
  getLists(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getLists", params2, void 0, opts).catch((e) => {
      throw toKnownErr84(e);
    });
  }
  getMutes(params2, opts) {
    return this._service.xrpc.call("app.bsky.graph.getMutes", params2, void 0, opts).catch((e) => {
      throw toKnownErr85(e);
    });
  }
  muteActor(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.muteActor", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr86(e);
    });
  }
  muteActorList(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.muteActorList", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr87(e);
    });
  }
  unmuteActor(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.unmuteActor", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr88(e);
    });
  }
  unmuteActorList(data, opts) {
    return this._service.xrpc.call("app.bsky.graph.unmuteActorList", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr89(e);
    });
  }
};
var BlockRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.block",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.block",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.graph.block";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.graph.block", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.graph.block", ...params2 },
      { headers }
    );
  }
};
var FollowRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.follow",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.follow",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.graph.follow";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.graph.follow", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.graph.follow", ...params2 },
      { headers }
    );
  }
};
var ListRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.list",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.list",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.graph.list";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.graph.list", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.graph.list", ...params2 },
      { headers }
    );
  }
};
var ListitemRecord = class {
  constructor(service) {
    this._service = service;
  }
  async list(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.listitem",
      ...params2
    });
    return res.data;
  }
  async get(params2) {
    const res = await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.listitem",
      ...params2
    });
    return res.data;
  }
  async create(params2, record, headers) {
    record.$type = "app.bsky.graph.listitem";
    const res = await this._service.xrpc.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection: "app.bsky.graph.listitem", ...params2, record },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params2, headers) {
    await this._service.xrpc.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.bsky.graph.listitem", ...params2 },
      { headers }
    );
  }
};
var NotificationNS = class {
  constructor(service) {
    this._service = service;
  }
  getUnreadCount(params2, opts) {
    return this._service.xrpc.call("app.bsky.notification.getUnreadCount", params2, void 0, opts).catch((e) => {
      throw toKnownErr90(e);
    });
  }
  listNotifications(params2, opts) {
    return this._service.xrpc.call("app.bsky.notification.listNotifications", params2, void 0, opts).catch((e) => {
      throw toKnownErr91(e);
    });
  }
  registerPush(data, opts) {
    return this._service.xrpc.call("app.bsky.notification.registerPush", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr92(e);
    });
  }
  updateSeen(data, opts) {
    return this._service.xrpc.call("app.bsky.notification.updateSeen", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr93(e);
    });
  }
};
var RichtextNS = class {
  constructor(service) {
    this._service = service;
  }
};
var UnspeccedNS = class {
  constructor(service) {
    this._service = service;
  }
  applyLabels(data, opts) {
    return this._service.xrpc.call("app.bsky.unspecced.applyLabels", opts?.qp, data, opts).catch((e) => {
      throw toKnownErr94(e);
    });
  }
  getPopular(params2, opts) {
    return this._service.xrpc.call("app.bsky.unspecced.getPopular", params2, void 0, opts).catch((e) => {
      throw toKnownErr95(e);
    });
  }
  getPopularFeedGenerators(params2, opts) {
    return this._service.xrpc.call(
      "app.bsky.unspecced.getPopularFeedGenerators",
      params2,
      void 0,
      opts
    ).catch((e) => {
      throw toKnownErr96(e);
    });
  }
  getTimelineSkeleton(params2, opts) {
    return this._service.xrpc.call("app.bsky.unspecced.getTimelineSkeleton", params2, void 0, opts).catch((e) => {
      throw toKnownErr97(e);
    });
  }
};

// src/agent.ts
var REFRESH_SESSION = "com.atproto.server.refreshSession";
var _AtpAgent = class {
  constructor(opts) {
    this.uploadBlob = (data, opts) => this.api.com.atproto.repo.uploadBlob(data, opts);
    this.resolveHandle = (params2, opts) => this.api.com.atproto.identity.resolveHandle(params2, opts);
    this.updateHandle = (data, opts) => this.api.com.atproto.identity.updateHandle(data, opts);
    this.createModerationReport = (data, opts) => this.api.com.atproto.moderation.createReport(data, opts);
    this.service = opts.service instanceof URL ? opts.service : new URL(opts.service);
    this._persistSession = opts.persistSession;
    this._baseClient = new AtpBaseClient();
    this._baseClient.xrpc.fetch = this._fetch.bind(this);
    this.api = this._baseClient.service(opts.service);
  }
  get com() {
    return this.api.com;
  }
  static configure(opts) {
    _AtpAgent.fetch = opts.fetch;
  }
  get hasSession() {
    return !!this.session;
  }
  setPersistSessionHandler(handler) {
    this._persistSession = handler;
  }
  async createAccount(opts) {
    try {
      const res = await this.api.com.atproto.server.createAccount({
        handle: opts.handle,
        password: opts.password,
        email: opts.email,
        inviteCode: opts.inviteCode
      });
      this.session = {
        accessJwt: res.data.accessJwt,
        refreshJwt: res.data.refreshJwt,
        handle: res.data.handle,
        did: res.data.did,
        email: opts.email
      };
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  async login(opts) {
    try {
      const res = await this.api.com.atproto.server.createSession({
        identifier: opts.identifier,
        password: opts.password
      });
      this.session = {
        accessJwt: res.data.accessJwt,
        refreshJwt: res.data.refreshJwt,
        handle: res.data.handle,
        did: res.data.did,
        email: res.data.email
      };
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  async resumeSession(session) {
    try {
      this.session = session;
      const res = await this.api.com.atproto.server.getSession();
      if (!res.success || res.data.did !== this.session.did) {
        throw new Error("Invalid session");
      }
      this.session.email = res.data.email;
      this.session.handle = res.data.handle;
      return res;
    } catch (e) {
      this.session = void 0;
      throw e;
    } finally {
      if (this.session) {
        this._persistSession?.("create", this.session);
      } else {
        this._persistSession?.("create-failed", void 0);
      }
    }
  }
  _addAuthHeader(reqHeaders) {
    if (!reqHeaders.authorization && this.session?.accessJwt) {
      return {
        ...reqHeaders,
        authorization: `Bearer ${this.session.accessJwt}`
      };
    }
    return reqHeaders;
  }
  async _fetch(reqUri, reqMethod, reqHeaders, reqBody) {
    if (!_AtpAgent.fetch) {
      throw new Error("AtpAgent fetch() method not configured");
    }
    await this._refreshSessionPromise;
    let res = await _AtpAgent.fetch(
      reqUri,
      reqMethod,
      this._addAuthHeader(reqHeaders),
      reqBody
    );
    if (isErrorResponse(res, ["ExpiredToken"]) && this.session?.refreshJwt) {
      await this._refreshSession();
      res = await _AtpAgent.fetch(
        reqUri,
        reqMethod,
        this._addAuthHeader(reqHeaders),
        reqBody
      );
    }
    return res;
  }
  async _refreshSession() {
    if (this._refreshSessionPromise) {
      return this._refreshSessionPromise;
    }
    this._refreshSessionPromise = this._refreshSessionInner();
    try {
      await this._refreshSessionPromise;
    } finally {
      this._refreshSessionPromise = void 0;
    }
  }
  async _refreshSessionInner() {
    if (!_AtpAgent.fetch) {
      throw new Error("AtpAgent fetch() method not configured");
    }
    if (!this.session?.refreshJwt) {
      return;
    }
    const url = new URL(this.service.origin);
    url.pathname = `/xrpc/${REFRESH_SESSION}`;
    const res = await _AtpAgent.fetch(
      url.toString(),
      "POST",
      {
        authorization: `Bearer ${this.session.refreshJwt}`
      },
      void 0
    );
    if (isErrorResponse(res, ["ExpiredToken", "InvalidToken"])) {
      this.session = void 0;
      this._persistSession?.("expired", void 0);
    } else if (isNewSessionObject(this._baseClient, res.body)) {
      this.session = {
        accessJwt: res.body.accessJwt,
        refreshJwt: res.body.refreshJwt,
        handle: res.body.handle,
        did: res.body.did
      };
      this._persistSession?.("update", this.session);
    }
  }
};
var AtpAgent = _AtpAgent;
AtpAgent.fetch = defaultFetchHandler;
function isErrorObject(v) {
  return errorResponseBody.safeParse(v).success;
}
function isErrorResponse(res, errorNames) {
  if (res.status !== 400) {
    return false;
  }
  if (!isErrorObject(res.body)) {
    return false;
  }
  return typeof res.body.error === "string" && errorNames.includes(res.body.error);
}
function isNewSessionObject(client, v) {
  try {
    client.xrpc.lex.assertValidXrpcOutput(
      "com.atproto.server.refreshSession",
      v
    );
    return true;
  } catch {
    return false;
  }
}

// src/rich-text/unicode.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var UnicodeString = class {
  constructor(utf16) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }
  get length() {
    return this.utf8.byteLength;
  }
  get graphemeLength() {
    if (!this._graphemeLen) {
      this._graphemeLen = graphemeLen(this.utf16);
    }
    return this._graphemeLen;
  }
  slice(start, end) {
    return decoder.decode(this.utf8.slice(start, end));
  }
  utf16IndexToUtf8Index(i) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
  toString() {
    return this.utf16;
  }
};

// src/rich-text/sanitization.ts
var EXCESS_SPACE_RE = /[\r\n]([\u00AD\u2060\u200D\u200C\u200B\s]*[\r\n]){2,}/;
var REPLACEMENT_STR = "\n\n";
function sanitizeRichText(richText, opts) {
  if (opts.cleanNewlines) {
    richText = clean(richText, EXCESS_SPACE_RE, REPLACEMENT_STR);
  }
  return richText;
}
function clean(richText, targetRegexp, replacementString) {
  richText = richText.clone();
  let match = richText.unicodeText.utf16.match(targetRegexp);
  while (match && typeof match.index !== "undefined") {
    const oldText = richText.unicodeText;
    const removeStartIndex = richText.unicodeText.utf16IndexToUtf8Index(
      match.index
    );
    const removeEndIndex = removeStartIndex + new UnicodeString(match[0]).length;
    richText.delete(removeStartIndex, removeEndIndex);
    if (richText.unicodeText.utf16 === oldText.utf16) {
      break;
    }
    richText.insert(removeStartIndex, replacementString);
    match = richText.unicodeText.utf16.match(targetRegexp);
  }
  return richText;
}

// ../../node_modules/tlds/index.json
var tlds_default = [
  "aaa",
  "aarp",
  "abarth",
  "abb",
  "abbott",
  "abbvie",
  "abc",
  "able",
  "abogado",
  "abudhabi",
  "ac",
  "academy",
  "accenture",
  "accountant",
  "accountants",
  "aco",
  "actor",
  "ad",
  "ads",
  "adult",
  "ae",
  "aeg",
  "aero",
  "aetna",
  "af",
  "afl",
  "africa",
  "ag",
  "agakhan",
  "agency",
  "ai",
  "aig",
  "airbus",
  "airforce",
  "airtel",
  "akdn",
  "al",
  "alfaromeo",
  "alibaba",
  "alipay",
  "allfinanz",
  "allstate",
  "ally",
  "alsace",
  "alstom",
  "am",
  "amazon",
  "americanexpress",
  "americanfamily",
  "amex",
  "amfam",
  "amica",
  "amsterdam",
  "analytics",
  "android",
  "anquan",
  "anz",
  "ao",
  "aol",
  "apartments",
  "app",
  "apple",
  "aq",
  "aquarelle",
  "ar",
  "arab",
  "aramco",
  "archi",
  "army",
  "arpa",
  "art",
  "arte",
  "as",
  "asda",
  "asia",
  "associates",
  "at",
  "athleta",
  "attorney",
  "au",
  "auction",
  "audi",
  "audible",
  "audio",
  "auspost",
  "author",
  "auto",
  "autos",
  "avianca",
  "aw",
  "aws",
  "ax",
  "axa",
  "az",
  "azure",
  "ba",
  "baby",
  "baidu",
  "banamex",
  "bananarepublic",
  "band",
  "bank",
  "bar",
  "barcelona",
  "barclaycard",
  "barclays",
  "barefoot",
  "bargains",
  "baseball",
  "basketball",
  "bauhaus",
  "bayern",
  "bb",
  "bbc",
  "bbt",
  "bbva",
  "bcg",
  "bcn",
  "bd",
  "be",
  "beats",
  "beauty",
  "beer",
  "bentley",
  "berlin",
  "best",
  "bestbuy",
  "bet",
  "bf",
  "bg",
  "bh",
  "bharti",
  "bi",
  "bible",
  "bid",
  "bike",
  "bing",
  "bingo",
  "bio",
  "biz",
  "bj",
  "black",
  "blackfriday",
  "blockbuster",
  "blog",
  "bloomberg",
  "blue",
  "bm",
  "bms",
  "bmw",
  "bn",
  "bnpparibas",
  "bo",
  "boats",
  "boehringer",
  "bofa",
  "bom",
  "bond",
  "boo",
  "book",
  "booking",
  "bosch",
  "bostik",
  "boston",
  "bot",
  "boutique",
  "box",
  "br",
  "bradesco",
  "bridgestone",
  "broadway",
  "broker",
  "brother",
  "brussels",
  "bs",
  "bt",
  "build",
  "builders",
  "business",
  "buy",
  "buzz",
  "bv",
  "bw",
  "by",
  "bz",
  "bzh",
  "ca",
  "cab",
  "cafe",
  "cal",
  "call",
  "calvinklein",
  "cam",
  "camera",
  "camp",
  "canon",
  "capetown",
  "capital",
  "capitalone",
  "car",
  "caravan",
  "cards",
  "care",
  "career",
  "careers",
  "cars",
  "casa",
  "case",
  "cash",
  "casino",
  "cat",
  "catering",
  "catholic",
  "cba",
  "cbn",
  "cbre",
  "cbs",
  "cc",
  "cd",
  "center",
  "ceo",
  "cern",
  "cf",
  "cfa",
  "cfd",
  "cg",
  "ch",
  "chanel",
  "channel",
  "charity",
  "chase",
  "chat",
  "cheap",
  "chintai",
  "christmas",
  "chrome",
  "church",
  "ci",
  "cipriani",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citic",
  "city",
  "cityeats",
  "ck",
  "cl",
  "claims",
  "cleaning",
  "click",
  "clinic",
  "clinique",
  "clothing",
  "cloud",
  "club",
  "clubmed",
  "cm",
  "cn",
  "co",
  "coach",
  "codes",
  "coffee",
  "college",
  "cologne",
  "com",
  "comcast",
  "commbank",
  "community",
  "company",
  "compare",
  "computer",
  "comsec",
  "condos",
  "construction",
  "consulting",
  "contact",
  "contractors",
  "cooking",
  "cookingchannel",
  "cool",
  "coop",
  "corsica",
  "country",
  "coupon",
  "coupons",
  "courses",
  "cpa",
  "cr",
  "credit",
  "creditcard",
  "creditunion",
  "cricket",
  "crown",
  "crs",
  "cruise",
  "cruises",
  "cu",
  "cuisinella",
  "cv",
  "cw",
  "cx",
  "cy",
  "cymru",
  "cyou",
  "cz",
  "dabur",
  "dad",
  "dance",
  "data",
  "date",
  "dating",
  "datsun",
  "day",
  "dclk",
  "dds",
  "de",
  "deal",
  "dealer",
  "deals",
  "degree",
  "delivery",
  "dell",
  "deloitte",
  "delta",
  "democrat",
  "dental",
  "dentist",
  "desi",
  "design",
  "dev",
  "dhl",
  "diamonds",
  "diet",
  "digital",
  "direct",
  "directory",
  "discount",
  "discover",
  "dish",
  "diy",
  "dj",
  "dk",
  "dm",
  "dnp",
  "do",
  "docs",
  "doctor",
  "dog",
  "domains",
  "dot",
  "download",
  "drive",
  "dtv",
  "dubai",
  "dunlop",
  "dupont",
  "durban",
  "dvag",
  "dvr",
  "dz",
  "earth",
  "eat",
  "ec",
  "eco",
  "edeka",
  "edu",
  "education",
  "ee",
  "eg",
  "email",
  "emerck",
  "energy",
  "engineer",
  "engineering",
  "enterprises",
  "epson",
  "equipment",
  "er",
  "ericsson",
  "erni",
  "es",
  "esq",
  "estate",
  "et",
  "etisalat",
  "eu",
  "eurovision",
  "eus",
  "events",
  "exchange",
  "expert",
  "exposed",
  "express",
  "extraspace",
  "fage",
  "fail",
  "fairwinds",
  "faith",
  "family",
  "fan",
  "fans",
  "farm",
  "farmers",
  "fashion",
  "fast",
  "fedex",
  "feedback",
  "ferrari",
  "ferrero",
  "fi",
  "fiat",
  "fidelity",
  "fido",
  "film",
  "final",
  "finance",
  "financial",
  "fire",
  "firestone",
  "firmdale",
  "fish",
  "fishing",
  "fit",
  "fitness",
  "fj",
  "fk",
  "flickr",
  "flights",
  "flir",
  "florist",
  "flowers",
  "fly",
  "fm",
  "fo",
  "foo",
  "food",
  "foodnetwork",
  "football",
  "ford",
  "forex",
  "forsale",
  "forum",
  "foundation",
  "fox",
  "fr",
  "free",
  "fresenius",
  "frl",
  "frogans",
  "frontdoor",
  "frontier",
  "ftr",
  "fujitsu",
  "fun",
  "fund",
  "furniture",
  "futbol",
  "fyi",
  "ga",
  "gal",
  "gallery",
  "gallo",
  "gallup",
  "game",
  "games",
  "gap",
  "garden",
  "gay",
  "gb",
  "gbiz",
  "gd",
  "gdn",
  "ge",
  "gea",
  "gent",
  "genting",
  "george",
  "gf",
  "gg",
  "ggee",
  "gh",
  "gi",
  "gift",
  "gifts",
  "gives",
  "giving",
  "gl",
  "glass",
  "gle",
  "global",
  "globo",
  "gm",
  "gmail",
  "gmbh",
  "gmo",
  "gmx",
  "gn",
  "godaddy",
  "gold",
  "goldpoint",
  "golf",
  "goo",
  "goodyear",
  "goog",
  "google",
  "gop",
  "got",
  "gov",
  "gp",
  "gq",
  "gr",
  "grainger",
  "graphics",
  "gratis",
  "green",
  "gripe",
  "grocery",
  "group",
  "gs",
  "gt",
  "gu",
  "guardian",
  "gucci",
  "guge",
  "guide",
  "guitars",
  "guru",
  "gw",
  "gy",
  "hair",
  "hamburg",
  "hangout",
  "haus",
  "hbo",
  "hdfc",
  "hdfcbank",
  "health",
  "healthcare",
  "help",
  "helsinki",
  "here",
  "hermes",
  "hgtv",
  "hiphop",
  "hisamitsu",
  "hitachi",
  "hiv",
  "hk",
  "hkt",
  "hm",
  "hn",
  "hockey",
  "holdings",
  "holiday",
  "homedepot",
  "homegoods",
  "homes",
  "homesense",
  "honda",
  "horse",
  "hospital",
  "host",
  "hosting",
  "hot",
  "hoteles",
  "hotels",
  "hotmail",
  "house",
  "how",
  "hr",
  "hsbc",
  "ht",
  "hu",
  "hughes",
  "hyatt",
  "hyundai",
  "ibm",
  "icbc",
  "ice",
  "icu",
  "id",
  "ie",
  "ieee",
  "ifm",
  "ikano",
  "il",
  "im",
  "imamat",
  "imdb",
  "immo",
  "immobilien",
  "in",
  "inc",
  "industries",
  "infiniti",
  "info",
  "ing",
  "ink",
  "institute",
  "insurance",
  "insure",
  "int",
  "international",
  "intuit",
  "investments",
  "io",
  "ipiranga",
  "iq",
  "ir",
  "irish",
  "is",
  "ismaili",
  "ist",
  "istanbul",
  "it",
  "itau",
  "itv",
  "jaguar",
  "java",
  "jcb",
  "je",
  "jeep",
  "jetzt",
  "jewelry",
  "jio",
  "jll",
  "jm",
  "jmp",
  "jnj",
  "jo",
  "jobs",
  "joburg",
  "jot",
  "joy",
  "jp",
  "jpmorgan",
  "jprs",
  "juegos",
  "juniper",
  "kaufen",
  "kddi",
  "ke",
  "kerryhotels",
  "kerrylogistics",
  "kerryproperties",
  "kfh",
  "kg",
  "kh",
  "ki",
  "kia",
  "kids",
  "kim",
  "kinder",
  "kindle",
  "kitchen",
  "kiwi",
  "km",
  "kn",
  "koeln",
  "komatsu",
  "kosher",
  "kp",
  "kpmg",
  "kpn",
  "kr",
  "krd",
  "kred",
  "kuokgroup",
  "kw",
  "ky",
  "kyoto",
  "kz",
  "la",
  "lacaixa",
  "lamborghini",
  "lamer",
  "lancaster",
  "lancia",
  "land",
  "landrover",
  "lanxess",
  "lasalle",
  "lat",
  "latino",
  "latrobe",
  "law",
  "lawyer",
  "lb",
  "lc",
  "lds",
  "lease",
  "leclerc",
  "lefrak",
  "legal",
  "lego",
  "lexus",
  "lgbt",
  "li",
  "lidl",
  "life",
  "lifeinsurance",
  "lifestyle",
  "lighting",
  "like",
  "lilly",
  "limited",
  "limo",
  "lincoln",
  "link",
  "lipsy",
  "live",
  "living",
  "lk",
  "llc",
  "llp",
  "loan",
  "loans",
  "locker",
  "locus",
  "lol",
  "london",
  "lotte",
  "lotto",
  "love",
  "lpl",
  "lplfinancial",
  "lr",
  "ls",
  "lt",
  "ltd",
  "ltda",
  "lu",
  "lundbeck",
  "luxe",
  "luxury",
  "lv",
  "ly",
  "ma",
  "madrid",
  "maif",
  "maison",
  "makeup",
  "man",
  "management",
  "mango",
  "map",
  "market",
  "marketing",
  "markets",
  "marriott",
  "marshalls",
  "maserati",
  "mattel",
  "mba",
  "mc",
  "mckinsey",
  "md",
  "me",
  "med",
  "media",
  "meet",
  "melbourne",
  "meme",
  "memorial",
  "men",
  "menu",
  "merckmsd",
  "mg",
  "mh",
  "miami",
  "microsoft",
  "mil",
  "mini",
  "mint",
  "mit",
  "mitsubishi",
  "mk",
  "ml",
  "mlb",
  "mls",
  "mm",
  "mma",
  "mn",
  "mo",
  "mobi",
  "mobile",
  "moda",
  "moe",
  "moi",
  "mom",
  "monash",
  "money",
  "monster",
  "mormon",
  "mortgage",
  "moscow",
  "moto",
  "motorcycles",
  "mov",
  "movie",
  "mp",
  "mq",
  "mr",
  "ms",
  "msd",
  "mt",
  "mtn",
  "mtr",
  "mu",
  "museum",
  "music",
  "mutual",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nab",
  "nagoya",
  "name",
  "natura",
  "navy",
  "nba",
  "nc",
  "ne",
  "nec",
  "net",
  "netbank",
  "netflix",
  "network",
  "neustar",
  "new",
  "news",
  "next",
  "nextdirect",
  "nexus",
  "nf",
  "nfl",
  "ng",
  "ngo",
  "nhk",
  "ni",
  "nico",
  "nike",
  "nikon",
  "ninja",
  "nissan",
  "nissay",
  "nl",
  "no",
  "nokia",
  "northwesternmutual",
  "norton",
  "now",
  "nowruz",
  "nowtv",
  "np",
  "nr",
  "nra",
  "nrw",
  "ntt",
  "nu",
  "nyc",
  "nz",
  "obi",
  "observer",
  "office",
  "okinawa",
  "olayan",
  "olayangroup",
  "oldnavy",
  "ollo",
  "om",
  "omega",
  "one",
  "ong",
  "onl",
  "online",
  "ooo",
  "open",
  "oracle",
  "orange",
  "org",
  "organic",
  "origins",
  "osaka",
  "otsuka",
  "ott",
  "ovh",
  "pa",
  "page",
  "panasonic",
  "paris",
  "pars",
  "partners",
  "parts",
  "party",
  "passagens",
  "pay",
  "pccw",
  "pe",
  "pet",
  "pf",
  "pfizer",
  "pg",
  "ph",
  "pharmacy",
  "phd",
  "philips",
  "phone",
  "photo",
  "photography",
  "photos",
  "physio",
  "pics",
  "pictet",
  "pictures",
  "pid",
  "pin",
  "ping",
  "pink",
  "pioneer",
  "pizza",
  "pk",
  "pl",
  "place",
  "play",
  "playstation",
  "plumbing",
  "plus",
  "pm",
  "pn",
  "pnc",
  "pohl",
  "poker",
  "politie",
  "porn",
  "post",
  "pr",
  "pramerica",
  "praxi",
  "press",
  "prime",
  "pro",
  "prod",
  "productions",
  "prof",
  "progressive",
  "promo",
  "properties",
  "property",
  "protection",
  "pru",
  "prudential",
  "ps",
  "pt",
  "pub",
  "pw",
  "pwc",
  "py",
  "qa",
  "qpon",
  "quebec",
  "quest",
  "racing",
  "radio",
  "re",
  "read",
  "realestate",
  "realtor",
  "realty",
  "recipes",
  "red",
  "redstone",
  "redumbrella",
  "rehab",
  "reise",
  "reisen",
  "reit",
  "reliance",
  "ren",
  "rent",
  "rentals",
  "repair",
  "report",
  "republican",
  "rest",
  "restaurant",
  "review",
  "reviews",
  "rexroth",
  "rich",
  "richardli",
  "ricoh",
  "ril",
  "rio",
  "rip",
  "ro",
  "rocher",
  "rocks",
  "rodeo",
  "rogers",
  "room",
  "rs",
  "rsvp",
  "ru",
  "rugby",
  "ruhr",
  "run",
  "rw",
  "rwe",
  "ryukyu",
  "sa",
  "saarland",
  "safe",
  "safety",
  "sakura",
  "sale",
  "salon",
  "samsclub",
  "samsung",
  "sandvik",
  "sandvikcoromant",
  "sanofi",
  "sap",
  "sarl",
  "sas",
  "save",
  "saxo",
  "sb",
  "sbi",
  "sbs",
  "sc",
  "sca",
  "scb",
  "schaeffler",
  "schmidt",
  "scholarships",
  "school",
  "schule",
  "schwarz",
  "science",
  "scot",
  "sd",
  "se",
  "search",
  "seat",
  "secure",
  "security",
  "seek",
  "select",
  "sener",
  "services",
  "seven",
  "sew",
  "sex",
  "sexy",
  "sfr",
  "sg",
  "sh",
  "shangrila",
  "sharp",
  "shaw",
  "shell",
  "shia",
  "shiksha",
  "shoes",
  "shop",
  "shopping",
  "shouji",
  "show",
  "showtime",
  "si",
  "silk",
  "sina",
  "singles",
  "site",
  "sj",
  "sk",
  "ski",
  "skin",
  "sky",
  "skype",
  "sl",
  "sling",
  "sm",
  "smart",
  "smile",
  "sn",
  "sncf",
  "so",
  "soccer",
  "social",
  "softbank",
  "software",
  "sohu",
  "solar",
  "solutions",
  "song",
  "sony",
  "soy",
  "spa",
  "space",
  "sport",
  "spot",
  "sr",
  "srl",
  "ss",
  "st",
  "stada",
  "staples",
  "star",
  "statebank",
  "statefarm",
  "stc",
  "stcgroup",
  "stockholm",
  "storage",
  "store",
  "stream",
  "studio",
  "study",
  "style",
  "su",
  "sucks",
  "supplies",
  "supply",
  "support",
  "surf",
  "surgery",
  "suzuki",
  "sv",
  "swatch",
  "swiss",
  "sx",
  "sy",
  "sydney",
  "systems",
  "sz",
  "tab",
  "taipei",
  "talk",
  "taobao",
  "target",
  "tatamotors",
  "tatar",
  "tattoo",
  "tax",
  "taxi",
  "tc",
  "tci",
  "td",
  "tdk",
  "team",
  "tech",
  "technology",
  "tel",
  "temasek",
  "tennis",
  "teva",
  "tf",
  "tg",
  "th",
  "thd",
  "theater",
  "theatre",
  "tiaa",
  "tickets",
  "tienda",
  "tiffany",
  "tips",
  "tires",
  "tirol",
  "tj",
  "tjmaxx",
  "tjx",
  "tk",
  "tkmaxx",
  "tl",
  "tm",
  "tmall",
  "tn",
  "to",
  "today",
  "tokyo",
  "tools",
  "top",
  "toray",
  "toshiba",
  "total",
  "tours",
  "town",
  "toyota",
  "toys",
  "tr",
  "trade",
  "trading",
  "training",
  "travel",
  "travelchannel",
  "travelers",
  "travelersinsurance",
  "trust",
  "trv",
  "tt",
  "tube",
  "tui",
  "tunes",
  "tushu",
  "tv",
  "tvs",
  "tw",
  "tz",
  "ua",
  "ubank",
  "ubs",
  "ug",
  "uk",
  "unicom",
  "university",
  "uno",
  "uol",
  "ups",
  "us",
  "uy",
  "uz",
  "va",
  "vacations",
  "vana",
  "vanguard",
  "vc",
  "ve",
  "vegas",
  "ventures",
  "verisign",
  "verm\xF6gensberater",
  "verm\xF6gensberatung",
  "versicherung",
  "vet",
  "vg",
  "vi",
  "viajes",
  "video",
  "vig",
  "viking",
  "villas",
  "vin",
  "vip",
  "virgin",
  "visa",
  "vision",
  "viva",
  "vivo",
  "vlaanderen",
  "vn",
  "vodka",
  "volkswagen",
  "volvo",
  "vote",
  "voting",
  "voto",
  "voyage",
  "vu",
  "vuelos",
  "wales",
  "walmart",
  "walter",
  "wang",
  "wanggou",
  "watch",
  "watches",
  "weather",
  "weatherchannel",
  "webcam",
  "weber",
  "website",
  "wed",
  "wedding",
  "weibo",
  "weir",
  "wf",
  "whoswho",
  "wien",
  "wiki",
  "williamhill",
  "win",
  "windows",
  "wine",
  "winners",
  "wme",
  "wolterskluwer",
  "woodside",
  "work",
  "works",
  "world",
  "wow",
  "ws",
  "wtc",
  "wtf",
  "xbox",
  "xerox",
  "xfinity",
  "xihuan",
  "xin",
  "xxx",
  "xyz",
  "yachts",
  "yahoo",
  "yamaxun",
  "yandex",
  "ye",
  "yodobashi",
  "yoga",
  "yokohama",
  "you",
  "youtube",
  "yt",
  "yun",
  "za",
  "zappos",
  "zara",
  "zero",
  "zip",
  "zm",
  "zone",
  "zuerich",
  "zw",
  "\u03B5\u03BB",
  "\u03B5\u03C5",
  "\u0431\u0433",
  "\u0431\u0435\u043B",
  "\u0434\u0435\u0442\u0438",
  "\u0435\u044E",
  "\u043A\u0430\u0442\u043E\u043B\u0438\u043A",
  "\u043A\u043E\u043C",
  "\u043C\u043A\u0434",
  "\u043C\u043E\u043D",
  "\u043C\u043E\u0441\u043A\u0432\u0430",
  "\u043E\u043D\u043B\u0430\u0439\u043D",
  "\u043E\u0440\u0433",
  "\u0440\u0443\u0441",
  "\u0440\u0444",
  "\u0441\u0430\u0439\u0442",
  "\u0441\u0440\u0431",
  "\u0443\u043A\u0440",
  "\u049B\u0430\u0437",
  "\u0570\u0561\u0575",
  "\u05D9\u05E9\u05E8\u05D0\u05DC",
  "\u05E7\u05D5\u05DD",
  "\u0627\u0628\u0648\u0638\u0628\u064A",
  "\u0627\u062A\u0635\u0627\u0644\u0627\u062A",
  "\u0627\u0631\u0627\u0645\u0643\u0648",
  "\u0627\u0644\u0627\u0631\u062F\u0646",
  "\u0627\u0644\u0628\u062D\u0631\u064A\u0646",
  "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
  "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
  "\u0627\u0644\u0639\u0644\u064A\u0627\u0646",
  "\u0627\u0644\u0645\u063A\u0631\u0628",
  "\u0627\u0645\u0627\u0631\u0627\u062A",
  "\u0627\u06CC\u0631\u0627\u0646",
  "\u0628\u0627\u0631\u062A",
  "\u0628\u0627\u0632\u0627\u0631",
  "\u0628\u064A\u062A\u0643",
  "\u0628\u06BE\u0627\u0631\u062A",
  "\u062A\u0648\u0646\u0633",
  "\u0633\u0648\u062F\u0627\u0646",
  "\u0633\u0648\u0631\u064A\u0629",
  "\u0634\u0628\u0643\u0629",
  "\u0639\u0631\u0627\u0642",
  "\u0639\u0631\u0628",
  "\u0639\u0645\u0627\u0646",
  "\u0641\u0644\u0633\u0637\u064A\u0646",
  "\u0642\u0637\u0631",
  "\u0643\u0627\u062B\u0648\u0644\u064A\u0643",
  "\u0643\u0648\u0645",
  "\u0645\u0635\u0631",
  "\u0645\u0644\u064A\u0633\u064A\u0627",
  "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627",
  "\u0645\u0648\u0642\u0639",
  "\u0647\u0645\u0631\u0627\u0647",
  "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646",
  "\u0680\u0627\u0631\u062A",
  "\u0915\u0949\u092E",
  "\u0928\u0947\u091F",
  "\u092D\u093E\u0930\u0924",
  "\u092D\u093E\u0930\u0924\u092E\u094D",
  "\u092D\u093E\u0930\u094B\u0924",
  "\u0938\u0902\u0917\u0920\u0928",
  "\u09AC\u09BE\u0982\u09B2\u09BE",
  "\u09AD\u09BE\u09B0\u09A4",
  "\u09AD\u09BE\u09F0\u09A4",
  "\u0A2D\u0A3E\u0A30\u0A24",
  "\u0AAD\u0ABE\u0AB0\u0AA4",
  "\u0B2D\u0B3E\u0B30\u0B24",
  "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE",
  "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8",
  "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD",
  "\u0C2D\u0C3E\u0C30\u0C24\u0C4D",
  "\u0CAD\u0CBE\u0CB0\u0CA4",
  "\u0D2D\u0D3E\u0D30\u0D24\u0D02",
  "\u0DBD\u0D82\u0D9A\u0DCF",
  "\u0E04\u0E2D\u0E21",
  "\u0E44\u0E17\u0E22",
  "\u0EA5\u0EB2\u0EA7",
  "\u10D2\u10D4",
  "\u307F\u3093\u306A",
  "\u30A2\u30DE\u30BE\u30F3",
  "\u30AF\u30E9\u30A6\u30C9",
  "\u30B0\u30FC\u30B0\u30EB",
  "\u30B3\u30E0",
  "\u30B9\u30C8\u30A2",
  "\u30BB\u30FC\u30EB",
  "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3",
  "\u30DD\u30A4\u30F3\u30C8",
  "\u4E16\u754C",
  "\u4E2D\u4FE1",
  "\u4E2D\u56FD",
  "\u4E2D\u570B",
  "\u4E2D\u6587\u7F51",
  "\u4E9A\u9A6C\u900A",
  "\u4F01\u4E1A",
  "\u4F5B\u5C71",
  "\u4FE1\u606F",
  "\u5065\u5EB7",
  "\u516B\u5366",
  "\u516C\u53F8",
  "\u516C\u76CA",
  "\u53F0\u6E7E",
  "\u53F0\u7063",
  "\u5546\u57CE",
  "\u5546\u5E97",
  "\u5546\u6807",
  "\u5609\u91CC",
  "\u5609\u91CC\u5927\u9152\u5E97",
  "\u5728\u7EBF",
  "\u5927\u62FF",
  "\u5929\u4E3B\u6559",
  "\u5A31\u4E50",
  "\u5BB6\u96FB",
  "\u5E7F\u4E1C",
  "\u5FAE\u535A",
  "\u6148\u5584",
  "\u6211\u7231\u4F60",
  "\u624B\u673A",
  "\u62DB\u8058",
  "\u653F\u52A1",
  "\u653F\u5E9C",
  "\u65B0\u52A0\u5761",
  "\u65B0\u95FB",
  "\u65F6\u5C1A",
  "\u66F8\u7C4D",
  "\u673A\u6784",
  "\u6DE1\u9A6C\u9521",
  "\u6E38\u620F",
  "\u6FB3\u9580",
  "\u70B9\u770B",
  "\u79FB\u52A8",
  "\u7EC4\u7EC7\u673A\u6784",
  "\u7F51\u5740",
  "\u7F51\u5E97",
  "\u7F51\u7AD9",
  "\u7F51\u7EDC",
  "\u8054\u901A",
  "\u8C37\u6B4C",
  "\u8D2D\u7269",
  "\u901A\u8CA9",
  "\u96C6\u56E2",
  "\u96FB\u8A0A\u76C8\u79D1",
  "\u98DE\u5229\u6D66",
  "\u98DF\u54C1",
  "\u9910\u5385",
  "\u9999\u683C\u91CC\u62C9",
  "\u9999\u6E2F",
  "\uB2F7\uB137",
  "\uB2F7\uCEF4",
  "\uC0BC\uC131",
  "\uD55C\uAD6D"
];

// src/rich-text/detection.ts
function detectFacets(text) {
  let match;
  const facets = [];
  {
    const re = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g;
    while (match = re.exec(text.utf16)) {
      if (!isValidDomain(match[3]) && !match[3].endsWith(".test")) {
        continue;
      }
      const start = text.utf16.indexOf(match[3], match.index) - 1;
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(start),
          byteEnd: text.utf16IndexToUtf8Index(start + match[3].length + 1)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#mention",
            did: match[3]
          }
        ]
      });
    }
  }
  {
    const re = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
    while (match = re.exec(text.utf16)) {
      let uri2 = match[2];
      if (!uri2.startsWith("http")) {
        const domain = match.groups?.domain;
        if (!domain || !isValidDomain(domain)) {
          continue;
        }
        uri2 = `https://${uri2}`;
      }
      const start = text.utf16.indexOf(match[2], match.index);
      const index = { start, end: start + match[2].length };
      if (/[.,;!?]$/.test(uri2)) {
        uri2 = uri2.slice(0, -1);
        index.end--;
      }
      if (/[)]$/.test(uri2) && !uri2.includes("(")) {
        uri2 = uri2.slice(0, -1);
        index.end--;
      }
      facets.push({
        index: {
          byteStart: text.utf16IndexToUtf8Index(index.start),
          byteEnd: text.utf16IndexToUtf8Index(index.end)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: uri2
          }
        ]
      });
    }
  }
  return facets.length > 0 ? facets : void 0;
}
function isValidDomain(str) {
  return !!tlds_default.find((tld) => {
    const i = str.lastIndexOf(tld);
    if (i === -1) {
      return false;
    }
    return str.charAt(i - 1) === "." && i === str.length - tld.length;
  });
}

// src/rich-text/rich-text.ts
var RichTextSegment = class {
  constructor(text, facet) {
    this.text = text;
    this.facet = facet;
  }
  get link() {
    const link = this.facet?.features.find(facet_exports.isLink);
    if (facet_exports.isLink(link)) {
      return link;
    }
    return void 0;
  }
  isLink() {
    return !!this.link;
  }
  get mention() {
    const mention = this.facet?.features.find(facet_exports.isMention);
    if (facet_exports.isMention(mention)) {
      return mention;
    }
    return void 0;
  }
  isMention() {
    return !!this.mention;
  }
};
var RichText = class {
  constructor(props, opts) {
    this.unicodeText = new UnicodeString(props.text);
    this.facets = props.facets;
    if (!this.facets?.length && props.entities?.length) {
      this.facets = entitiesToFacets(this.unicodeText, props.entities);
    }
    if (this.facets) {
      this.facets.sort(facetSort);
    }
    if (opts?.cleanNewlines) {
      sanitizeRichText(this, { cleanNewlines: true }).copyInto(this);
    }
  }
  get text() {
    return this.unicodeText.toString();
  }
  get length() {
    return this.unicodeText.length;
  }
  get graphemeLength() {
    return this.unicodeText.graphemeLength;
  }
  clone() {
    return new RichText({
      text: this.unicodeText.utf16,
      facets: cloneDeep(this.facets)
    });
  }
  copyInto(target) {
    target.unicodeText = this.unicodeText;
    target.facets = cloneDeep(this.facets);
  }
  *segments() {
    const facets = this.facets || [];
    if (!facets.length) {
      yield new RichTextSegment(this.unicodeText.utf16);
      return;
    }
    let textCursor = 0;
    let facetCursor = 0;
    do {
      const currFacet = facets[facetCursor];
      if (textCursor < currFacet.index.byteStart) {
        yield new RichTextSegment(
          this.unicodeText.slice(textCursor, currFacet.index.byteStart)
        );
      } else if (textCursor > currFacet.index.byteStart) {
        facetCursor++;
        continue;
      }
      if (currFacet.index.byteStart < currFacet.index.byteEnd) {
        const subtext = this.unicodeText.slice(
          currFacet.index.byteStart,
          currFacet.index.byteEnd
        );
        if (!subtext.trim()) {
          yield new RichTextSegment(subtext);
        } else {
          yield new RichTextSegment(subtext, currFacet);
        }
      }
      textCursor = currFacet.index.byteEnd;
      facetCursor++;
    } while (facetCursor < facets.length);
    if (textCursor < this.unicodeText.length) {
      yield new RichTextSegment(
        this.unicodeText.slice(textCursor, this.unicodeText.length)
      );
    }
  }
  insert(insertIndex, insertText) {
    this.unicodeText = new UnicodeString(
      this.unicodeText.slice(0, insertIndex) + insertText + this.unicodeText.slice(insertIndex)
    );
    if (!this.facets?.length) {
      return this;
    }
    const numCharsAdded = insertText.length;
    for (const ent of this.facets) {
      if (insertIndex <= ent.index.byteStart) {
        ent.index.byteStart += numCharsAdded;
        ent.index.byteEnd += numCharsAdded;
      } else if (insertIndex >= ent.index.byteStart && insertIndex < ent.index.byteEnd) {
        ent.index.byteEnd += numCharsAdded;
      }
    }
    return this;
  }
  delete(removeStartIndex, removeEndIndex) {
    this.unicodeText = new UnicodeString(
      this.unicodeText.slice(0, removeStartIndex) + this.unicodeText.slice(removeEndIndex)
    );
    if (!this.facets?.length) {
      return this;
    }
    const numCharsRemoved = removeEndIndex - removeStartIndex;
    for (const ent of this.facets) {
      if (removeStartIndex <= ent.index.byteStart && removeEndIndex >= ent.index.byteEnd) {
        ent.index.byteStart = 0;
        ent.index.byteEnd = 0;
      } else if (removeStartIndex > ent.index.byteEnd) {
      } else if (removeStartIndex > ent.index.byteStart && removeStartIndex <= ent.index.byteEnd && removeEndIndex > ent.index.byteEnd) {
        ent.index.byteEnd = removeStartIndex;
      } else if (removeStartIndex >= ent.index.byteStart && removeEndIndex <= ent.index.byteEnd) {
        ent.index.byteEnd -= numCharsRemoved;
      } else if (removeStartIndex < ent.index.byteStart && removeEndIndex >= ent.index.byteStart && removeEndIndex <= ent.index.byteEnd) {
        ent.index.byteStart = removeStartIndex;
        ent.index.byteEnd -= numCharsRemoved;
      } else if (removeEndIndex < ent.index.byteStart) {
        ent.index.byteStart -= numCharsRemoved;
        ent.index.byteEnd -= numCharsRemoved;
      }
    }
    this.facets = this.facets.filter(
      (ent) => ent.index.byteStart < ent.index.byteEnd
    );
    return this;
  }
  async detectFacets(agent) {
    this.facets = detectFacets(this.unicodeText);
    if (this.facets) {
      for (const facet of this.facets) {
        for (const feature of facet.features) {
          if (facet_exports.isMention(feature)) {
            const did2 = await agent.resolveHandle({ handle: feature.did }).catch((_) => void 0).then((res) => res?.data.did);
            feature.did = did2 || "";
          }
        }
      }
      this.facets.sort(facetSort);
    }
  }
  detectFacetsWithoutResolution() {
    this.facets = detectFacets(this.unicodeText);
    if (this.facets) {
      this.facets.sort(facetSort);
    }
  }
};
var facetSort = (a, b) => a.index.byteStart - b.index.byteStart;
function entitiesToFacets(text, entities) {
  const facets = [];
  for (const ent of entities) {
    if (ent.type === "link") {
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(ent.index.start),
          byteEnd: text.utf16IndexToUtf8Index(ent.index.end)
        },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: ent.value }]
      });
    } else if (ent.type === "mention") {
      facets.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: text.utf16IndexToUtf8Index(ent.index.start),
          byteEnd: text.utf16IndexToUtf8Index(ent.index.end)
        },
        features: [
          { $type: "app.bsky.richtext.facet#mention", did: ent.value }
        ]
      });
    }
  }
  return facets;
}
function cloneDeep(v) {
  if (typeof v === "undefined") {
    return v;
  }
  return JSON.parse(JSON.stringify(v));
}

// src/moderation/types.ts
var ModerationDecision = class {
  constructor(cause = void 0, alert = false, blur = false, blurMedia = false, filter = false, noOverride = false, additionalCauses = [], did2 = "") {
    this.cause = cause;
    this.alert = alert;
    this.blur = blur;
    this.blurMedia = blurMedia;
    this.filter = filter;
    this.noOverride = noOverride;
    this.additionalCauses = additionalCauses;
    this.did = did2;
  }
  static noop() {
    return new ModerationDecision();
  }
};

// src/moderation/const/labels.ts
var LABELS = {
  "!hide": {
    id: "!hide",
    preferences: ["hide"],
    flags: ["no-override"],
    onwarn: "blur",
    groupId: "system",
    configurable: false,
    strings: {
      settings: {
        en: {
          name: "Moderator Hide",
          description: "Moderator has chosen to hide the content."
        }
      },
      account: {
        en: {
          name: "Content Blocked",
          description: "This account has been hidden by the moderators."
        }
      },
      content: {
        en: {
          name: "Content Blocked",
          description: "This content has been hidden by the moderators."
        }
      }
    }
  },
  "!no-promote": {
    id: "!no-promote",
    preferences: ["hide"],
    flags: [],
    onwarn: null,
    groupId: "system",
    configurable: false,
    strings: {
      settings: {
        en: {
          name: "Moderator Filter",
          description: "Moderator has chosen to filter the content from feeds."
        }
      },
      account: {
        en: {
          name: "N/A",
          description: "N/A"
        }
      },
      content: {
        en: {
          name: "N/A",
          description: "N/A"
        }
      }
    }
  },
  "!warn": {
    id: "!warn",
    preferences: ["warn"],
    flags: [],
    onwarn: "blur",
    groupId: "system",
    configurable: false,
    strings: {
      settings: {
        en: {
          name: "Moderator Warn",
          description: "Moderator has chosen to set a general warning on the content."
        }
      },
      account: {
        en: {
          name: "Content Warning",
          description: "This account has received a general warning from moderators."
        }
      },
      content: {
        en: {
          name: "Content Warning",
          description: "This content has received a general warning from moderators."
        }
      }
    }
  },
  "dmca-violation": {
    id: "dmca-violation",
    preferences: ["hide"],
    flags: ["no-override"],
    onwarn: "blur",
    groupId: "legal",
    configurable: false,
    strings: {
      settings: {
        en: {
          name: "Copyright Violation",
          description: "The content has received a DMCA takedown request."
        }
      },
      account: {
        en: {
          name: "Copyright Violation",
          description: "This account has received a DMCA takedown request. It will be restored if the concerns can be resolved."
        }
      },
      content: {
        en: {
          name: "Copyright Violation",
          description: "This content has received a DMCA takedown request. It will be restored if the concerns can be resolved."
        }
      }
    }
  },
  doxxing: {
    id: "doxxing",
    preferences: ["hide"],
    flags: ["no-override"],
    onwarn: "blur",
    groupId: "legal",
    configurable: false,
    strings: {
      settings: {
        en: {
          name: "Doxxing",
          description: "Information that reveals private information about someone which has been shared without the consent of the subject."
        }
      },
      account: {
        en: {
          name: "Doxxing",
          description: "This account has been reported to publish private information about someone without their consent. This report is currently under review."
        }
      },
      content: {
        en: {
          name: "Doxxing",
          description: "This content has been reported to include private information about someone without their consent."
        }
      }
    }
  },
  porn: {
    id: "porn",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "sexual",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Pornography",
          description: "Images of full-frontal nudity (genitalia) in any sexualized context, or explicit sexual activity (meaning contact with genitalia or breasts) even if partially covered. Includes graphic sexual cartoons (often jokes/memes)."
        }
      },
      account: {
        en: {
          name: "Adult Content",
          description: "This account contains imagery of full-frontal nudity or explicit sexual activity."
        }
      },
      content: {
        en: {
          name: "Adult Content",
          description: "This content contains imagery of full-frontal nudity or explicit sexual activity."
        }
      }
    }
  },
  sexual: {
    id: "sexual",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "sexual",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Sexually Suggestive",
          description: 'Content that does not meet the level of "pornography", but is still sexual. Some common examples have been selfies and "hornyposting" with underwear on, or partially naked (naked but covered, eg with hands or from side perspective). Sheer/see-through nipples may end up in this category.'
        }
      },
      account: {
        en: {
          name: "Suggestive Content",
          description: "This account contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
        }
      },
      content: {
        en: {
          name: "Suggestive Content",
          description: "This content contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
        }
      }
    }
  },
  nudity: {
    id: "nudity",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "sexual",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Nudity",
          description: 'Nudity which is not sexual, or that is primarily "artistic" in nature. For example: breastfeeding; classic art paintings and sculptures; newspaper images with some nudity; fashion modeling. "Erotic photography" is likely to end up in sexual or porn.'
        }
      },
      account: {
        en: {
          name: "Adult Content",
          description: "This account contains imagery which portrays nudity in a non-sexual or artistic setting."
        }
      },
      content: {
        en: {
          name: "Adult Content",
          description: "This content contains imagery which portrays nudity in a non-sexual or artistic setting."
        }
      }
    }
  },
  nsfl: {
    id: "nsfl",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "violence",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "NSFL",
          description: `"Not Suitable For Life." This includes graphic images like the infamous "goatse" (don't look it up).`
        }
      },
      account: {
        en: {
          name: "Graphic Imagery (NSFL)",
          description: 'This account contains graphic images which are often referred to as "Not Suitable For Life."'
        }
      },
      content: {
        en: {
          name: "Graphic Imagery (NSFL)",
          description: 'This content contains graphic images which are often referred to as "Not Suitable For Life."'
        }
      }
    }
  },
  corpse: {
    id: "corpse",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "violence",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Corpse",
          description: "Visual image of a dead human body in any context. Includes war images, hanging, funeral caskets. Does not include all figurative cases (cartoons), but can include realistic figurative images or renderings."
        }
      },
      account: {
        en: {
          name: "Graphic Imagery (Corpse)",
          description: "This account contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
        }
      },
      content: {
        en: {
          name: "Graphic Imagery (Corpse)",
          description: "This content contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
        }
      }
    }
  },
  gore: {
    id: "gore",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "violence",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Gore",
          description: "Intended for shocking images, typically involving blood or visible wounds."
        }
      },
      account: {
        en: {
          name: "Graphic Imagery (Gore)",
          description: "This account contains shocking images involving blood or visible wounds."
        }
      },
      content: {
        en: {
          name: "Graphic Imagery (Gore)",
          description: "This content contains shocking images involving blood or visible wounds."
        }
      }
    }
  },
  torture: {
    id: "torture",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur",
    groupId: "violence",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Torture",
          description: "Depictions of torture of a human or animal (animal cruelty)."
        }
      },
      account: {
        en: {
          name: "Graphic Imagery (Torture)",
          description: "This account contains depictions of torture of a human or animal."
        }
      },
      content: {
        en: {
          name: "Graphic Imagery (Torture)",
          description: "This content contains depictions of torture of a human or animal."
        }
      }
    }
  },
  "self-harm": {
    id: "self-harm",
    preferences: ["ignore", "warn", "hide"],
    flags: ["adult"],
    onwarn: "blur-media",
    groupId: "violence",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Self-Harm",
          description: "A visual depiction (photo or figurative) of cutting, suicide, or similar."
        }
      },
      account: {
        en: {
          name: "Graphic Imagery (Self-Harm)",
          description: "This account includes depictions of cutting, suicide, or other forms of self-harm."
        }
      },
      content: {
        en: {
          name: "Graphic Imagery (Self-Harm)",
          description: "This content includes depictions of cutting, suicide, or other forms of self-harm."
        }
      }
    }
  },
  "intolerant-race": {
    id: "intolerant-race",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Racial Intolerance",
          description: "Hateful or intolerant content related to race."
        }
      },
      account: {
        en: {
          name: "Intolerance (Racial)",
          description: "This account includes hateful or intolerant content related to race."
        }
      },
      content: {
        en: {
          name: "Intolerance (Racial)",
          description: "This content includes hateful or intolerant views related to race."
        }
      }
    }
  },
  "intolerant-gender": {
    id: "intolerant-gender",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Gender Intolerance",
          description: "Hateful or intolerant content related to gender or gender identity."
        }
      },
      account: {
        en: {
          name: "Intolerance (Gender)",
          description: "This account includes hateful or intolerant content related to gender or gender identity."
        }
      },
      content: {
        en: {
          name: "Intolerance (Gender)",
          description: "This content includes hateful or intolerant views related to gender or gender identity."
        }
      }
    }
  },
  "intolerant-sexual-orientation": {
    id: "intolerant-sexual-orientation",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Sexual Orientation Intolerance",
          description: "Hateful or intolerant content related to sexual preferences."
        }
      },
      account: {
        en: {
          name: "Intolerance (Orientation)",
          description: "This account includes hateful or intolerant content related to sexual preferences."
        }
      },
      content: {
        en: {
          name: "Intolerance (Orientation)",
          description: "This content includes hateful or intolerant views related to sexual preferences."
        }
      }
    }
  },
  "intolerant-religion": {
    id: "intolerant-religion",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Religious Intolerance",
          description: "Hateful or intolerant content related to religious views or practices."
        }
      },
      account: {
        en: {
          name: "Intolerance (Religious)",
          description: "This account includes hateful or intolerant content related to religious views or practices."
        }
      },
      content: {
        en: {
          name: "Intolerance (Religious)",
          description: "This content includes hateful or intolerant views related to religious views or practices."
        }
      }
    }
  },
  intolerant: {
    id: "intolerant",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Intolerance",
          description: "A catchall for hateful or intolerant content which is not covered elsewhere."
        }
      },
      account: {
        en: {
          name: "Intolerance",
          description: "This account includes hateful or intolerant content."
        }
      },
      content: {
        en: {
          name: "Intolerance",
          description: "This content includes hateful or intolerant views."
        }
      }
    }
  },
  "icon-intolerant": {
    id: "icon-intolerant",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur-media",
    groupId: "intolerance",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Intolerant Iconography",
          description: "Visual imagery associated with a hate group, such as the KKK or Nazi, in any context (supportive, critical, documentary, etc)."
        }
      },
      account: {
        en: {
          name: "Intolerant Iconography",
          description: "This account includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
        }
      },
      content: {
        en: {
          name: "Intolerant Iconography",
          description: "This content includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
        }
      }
    }
  },
  threat: {
    id: "threat",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "rude",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Threats",
          description: "Statements or imagery published with the intent to threaten, intimidate, or harm."
        }
      },
      account: {
        en: {
          name: "Threats",
          description: "The moderators believe this account has published statements or imagery with the intent to threaten, intimidate, or harm others."
        }
      },
      content: {
        en: {
          name: "Threats",
          description: "The moderators believe this content was published with the intent to threaten, intimidate, or harm others."
        }
      }
    }
  },
  spoiler: {
    id: "spoiler",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "curation",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Spoiler",
          description: "Discussion about film, TV, etc which gives away plot points."
        }
      },
      account: {
        en: {
          name: "Spoiler Warning",
          description: "This account contains discussion about film, TV, etc which gives away plot points."
        }
      },
      content: {
        en: {
          name: "Spoiler Warning",
          description: "This content contains discussion about film, TV, etc which gives away plot points."
        }
      }
    }
  },
  spam: {
    id: "spam",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "spam",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Spam",
          description: "Repeat, low-quality messages which are clearly not designed to add to a conversation or space."
        }
      },
      account: {
        en: {
          name: "Spam",
          description: "This account publishes repeat, low-quality messages which are clearly not designed to add to a conversation or space."
        }
      },
      content: {
        en: {
          name: "Spam",
          description: "This content is a part of repeat, low-quality messages which are clearly not designed to add to a conversation or space."
        }
      }
    }
  },
  "account-security": {
    id: "account-security",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "misinfo",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Security Concerns",
          description: "Content designed to hijack user accounts such as a phishing attack."
        }
      },
      account: {
        en: {
          name: "Security Warning",
          description: "This account has published content designed to hijack user accounts such as a phishing attack."
        }
      },
      content: {
        en: {
          name: "Security Warning",
          description: "This content is designed to hijack user accounts such as a phishing attack."
        }
      }
    }
  },
  "net-abuse": {
    id: "net-abuse",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "blur",
    groupId: "misinfo",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Network Attacks",
          description: "Content designed to attack network systems such as denial-of-service attacks."
        }
      },
      account: {
        en: {
          name: "Network Attack Warning",
          description: "This account has published content designed to attack network systems such as denial-of-service attacks."
        }
      },
      content: {
        en: {
          name: "Network Attack Warning",
          description: "This content is designed to attack network systems such as denial-of-service attacks."
        }
      }
    }
  },
  impersonation: {
    id: "impersonation",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "alert",
    groupId: "misinfo",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Impersonation",
          description: "Accounts which falsely assert some identity."
        }
      },
      account: {
        en: {
          name: "Impersonation Warning",
          description: "The moderators believe this account is lying about their identity."
        }
      },
      content: {
        en: {
          name: "Impersonation Warning",
          description: "The moderators believe this account is lying about their identity."
        }
      }
    }
  },
  scam: {
    id: "scam",
    preferences: ["ignore", "warn", "hide"],
    flags: [],
    onwarn: "alert",
    groupId: "misinfo",
    configurable: true,
    strings: {
      settings: {
        en: {
          name: "Scam",
          description: "Fraudulent content."
        }
      },
      account: {
        en: {
          name: "Scam Warning",
          description: "The moderators believe this account publishes fraudulent content."
        }
      },
      content: {
        en: {
          name: "Scam Warning",
          description: "The moderators believe this is fraudulent content."
        }
      }
    }
  }
};

// src/moderation/accumulator.ts
var ModerationCauseAccumulator = class {
  constructor() {
    this.did = "";
    this.causes = [];
  }
  setDid(did2) {
    this.did = did2;
  }
  addBlocking(blocking) {
    if (blocking) {
      this.causes.push({
        type: "blocking",
        source: { type: "user" },
        priority: 3
      });
    }
  }
  addBlockedBy(blockedBy) {
    if (blockedBy) {
      this.causes.push({
        type: "blocked-by",
        source: { type: "user" },
        priority: 4
      });
    }
  }
  addBlockOther(blockOther) {
    if (blockOther) {
      this.causes.push({
        type: "block-other",
        source: { type: "user" },
        priority: 4
      });
    }
  }
  addLabel(label, opts) {
    const labelDef = LABELS[label.val];
    if (!labelDef) {
      return;
    }
    const isSelf = label.src === this.did;
    const labeler = isSelf ? void 0 : opts.labelers.find((s) => s.labeler.did === label.src);
    let labelPref = "ignore";
    if (!labelDef.configurable) {
      labelPref = labelDef.preferences[0];
    } else if (labelDef.flags.includes("adult") && !opts.adultContentEnabled) {
      labelPref = "hide";
    } else if (labeler?.labels[label.val]) {
      labelPref = labeler.labels[label.val];
    } else if (opts.labels[label.val]) {
      labelPref = opts.labels[label.val];
    }
    if (labelPref === "ignore") {
      return;
    }
    let priority;
    if (labelDef.flags.includes("no-override")) {
      priority = 1;
    } else if (labelPref === "hide") {
      priority = 2;
    } else if (labelDef.onwarn === "blur") {
      priority = 5;
    } else if (labelDef.onwarn === "blur-media") {
      priority = 7;
    } else {
      priority = 8;
    }
    this.causes.push({
      type: "label",
      source: isSelf || !labeler ? { type: "user" } : { type: "labeler", labeler: labeler.labeler },
      label,
      labelDef,
      setting: labelPref,
      priority
    });
  }
  addMuted(muted) {
    if (muted) {
      this.causes.push({
        type: "muted",
        source: { type: "user" },
        priority: 6
      });
    }
  }
  addMutedByList(mutedByList) {
    if (mutedByList) {
      this.causes.push({
        type: "muted",
        source: { type: "list", list: mutedByList },
        priority: 6
      });
    }
  }
  finalizeDecision(opts) {
    const mod = new ModerationDecision();
    mod.did = this.did;
    if (!this.causes.length) {
      return mod;
    }
    this.causes.sort((a, b) => a.priority - b.priority);
    mod.cause = this.causes[0];
    mod.additionalCauses = this.causes.slice(1);
    if (mod.cause.type === "blocking" || mod.cause.type === "blocked-by" || mod.cause.type === "block-other") {
      mod.filter = true;
      mod.blur = true;
      mod.noOverride = true;
    } else if (mod.cause.type === "muted") {
      mod.filter = true;
      mod.blur = true;
    } else if (mod.cause.type === "label") {
      if (mod.cause.setting === "hide") {
        mod.filter = true;
      }
      switch (mod.cause.labelDef.onwarn) {
        case "alert":
          mod.alert = true;
          break;
        case "blur":
          mod.blur = true;
          break;
        case "blur-media":
          mod.blurMedia = true;
          break;
        case null:
          break;
      }
      if (mod.cause.labelDef.flags.includes("no-override")) {
        mod.noOverride = true;
      } else if (mod.cause.labelDef.flags.includes("adult") && !opts.adultContentEnabled) {
        mod.noOverride = true;
      }
    }
    return mod;
  }
};

// src/moderation/subjects/account.ts
function decideAccount(subject, opts) {
  const acc = new ModerationCauseAccumulator();
  acc.setDid(subject.did);
  if (subject.viewer?.muted) {
    if (subject.viewer?.mutedByList) {
      acc.addMutedByList(subject.viewer?.mutedByList);
    } else {
      acc.addMuted(subject.viewer?.muted);
    }
  }
  acc.addBlocking(subject.viewer?.blocking);
  acc.addBlockedBy(subject.viewer?.blockedBy);
  for (const label of filterAccountLabels(subject.labels)) {
    acc.addLabel(label, opts);
  }
  return acc.finalizeDecision(opts);
}
function filterAccountLabels(labels) {
  if (!labels) {
    return [];
  }
  return labels.filter(
    (label) => !label.uri.endsWith("/app.bsky.actor.profile/self")
  );
}

// src/moderation/subjects/profile.ts
function decideProfile(subject, opts) {
  const acc = new ModerationCauseAccumulator();
  acc.setDid(subject.did);
  for (const label of filterProfileLabels(subject.labels)) {
    acc.addLabel(label, opts);
  }
  return acc.finalizeDecision(opts);
}
function filterProfileLabels(labels) {
  if (!labels) {
    return [];
  }
  return labels.filter(
    (label) => label.uri.endsWith("/app.bsky.actor.profile/self")
  );
}

// src/moderation/subjects/post.ts
function decidePost(subject, opts) {
  const acc = new ModerationCauseAccumulator();
  acc.setDid(subject.author.did);
  if (subject.labels?.length) {
    for (const label of subject.labels) {
      acc.addLabel(label, opts);
    }
  }
  return acc.finalizeDecision(opts);
}

// src/moderation/subjects/quoted-post.ts
function decideQuotedPost(subject, opts) {
  const acc = new ModerationCauseAccumulator();
  if (record_exports.isViewRecord(subject.record)) {
    acc.setDid(subject.record.author.did);
    if (subject.record.labels?.length) {
      for (const label of subject.record.labels) {
        acc.addLabel(label, opts);
      }
    }
  } else if (record_exports.isViewBlocked(subject.record)) {
    acc.setDid(subject.record.author.did);
    if (subject.record.author.viewer?.blocking) {
      acc.addBlocking(subject.record.author.viewer?.blocking);
    } else if (subject.record.author.viewer?.blockedBy) {
      acc.addBlockedBy(subject.record.author.viewer?.blockedBy);
    } else {
      acc.addBlockOther(true);
    }
  }
  return acc.finalizeDecision(opts);
}
function decideQuotedPostAccount(subject, opts) {
  if (record_exports.isViewRecord(subject.record)) {
    return decideAccount(subject.record.author, opts);
  }
  return ModerationDecision.noop();
}
function decideQuotedPostWithMedia(subject, opts) {
  const acc = new ModerationCauseAccumulator();
  if (record_exports.isViewRecord(subject.record.record)) {
    acc.setDid(subject.record.record.author.did);
    if (subject.record.record.labels?.length) {
      for (const label of subject.record.record.labels) {
        acc.addLabel(label, opts);
      }
    }
  } else if (record_exports.isViewBlocked(subject.record.record)) {
    acc.setDid(subject.record.record.author.did);
    if (subject.record.record.author.viewer?.blocking) {
      acc.addBlocking(subject.record.record.author.viewer?.blocking);
    } else if (subject.record.record.author.viewer?.blockedBy) {
      acc.addBlockedBy(subject.record.record.author.viewer?.blockedBy);
    } else {
      acc.addBlockOther(true);
    }
  }
  return acc.finalizeDecision(opts);
}
function decideQuotedPostWithMediaAccount(subject, opts) {
  if (record_exports.isViewRecord(subject.record.record)) {
    return decideAccount(subject.record.record.author, opts);
  }
  return ModerationDecision.noop();
}

// src/moderation/subjects/feed-generator.ts
function decideFeedGenerator(subject, opts) {
  return ModerationDecision.noop();
}

// src/moderation/subjects/user-list.ts
function decideUserList(subject, opts) {
  return ModerationDecision.noop();
}

// src/moderation/util.ts
function takeHighestPriorityDecision(...decisions) {
  const filtered = decisions.filter((d) => !!d);
  if (filtered.length === 0) {
    return ModerationDecision.noop();
  }
  filtered.sort((a, b) => {
    if (a.cause && b.cause) {
      return a.cause.priority - b.cause.priority;
    }
    if (a.cause) {
      return -1;
    }
    if (b.cause) {
      return 1;
    }
    return 0;
  });
  return filtered[0];
}
function downgradeDecision(decision, to) {
  decision.filter = false;
  decision.noOverride = false;
  if (to === "noop") {
    decision.blur = false;
    decision.blurMedia = false;
    decision.alert = false;
    delete decision.cause;
  } else if (to === "alert") {
    decision.blur = false;
    decision.blurMedia = false;
    decision.alert = true;
  }
}
function isModerationDecisionNoop(decision, { ignoreFilter } = { ignoreFilter: false }) {
  if (!decision) {
    return true;
  }
  if (decision.alert) {
    return false;
  }
  if (decision.blur) {
    return false;
  }
  if (decision.filter && !ignoreFilter) {
    return false;
  }
  return true;
}
function isQuotedPost(embed) {
  return Boolean(embed && record_exports.isView(embed));
}
function isQuotedPostWithMedia(embed) {
  return Boolean(embed && recordWithMedia_exports.isView(embed));
}
function toModerationUI(decision) {
  return {
    cause: decision.cause,
    filter: decision.filter,
    blur: decision.blur,
    alert: decision.alert,
    noOverride: decision.noOverride
  };
}

// src/moderation/index.ts
function moderateProfile(subject, opts) {
  const account = decideAccount(subject, opts);
  const profile = decideProfile(subject, opts);
  if (account.blurMedia) {
    account.blur = true;
  }
  profile.filter = false;
  if (!isModerationDecisionNoop(account) && account.did === opts.userDid) {
    downgradeDecision(account, "alert");
  }
  if (!isModerationDecisionNoop(profile) && profile.did === opts.userDid) {
    downgradeDecision(profile, "alert");
  }
  let avatarBlur = false;
  let avatarNoOverride = false;
  if ((account.blur || account.blurMedia) && account.cause?.type !== "muted") {
    avatarBlur = true;
    avatarNoOverride = account.noOverride || profile.noOverride;
  } else if (profile.blur || profile.blurMedia) {
    avatarBlur = true;
    avatarNoOverride = account.noOverride || profile.noOverride;
  }
  if (account.cause?.type === "blocking" || account.cause?.type === "blocked-by" || account.cause?.type === "muted") {
    account.blur = false;
    account.noOverride = false;
  }
  return {
    decisions: { account, profile },
    account: account.filter || account.blur || account.alert ? toModerationUI(account) : {},
    profile: profile.filter || profile.blur || profile.alert ? toModerationUI(profile) : {},
    avatar: {
      blur: avatarBlur,
      alert: account.alert || profile.alert,
      noOverride: avatarNoOverride
    }
  };
}
function moderatePost(subject, opts) {
  const post = decidePost(subject, opts);
  const account = decideAccount(subject.author, opts);
  const profile = decideProfile(subject.author, opts);
  let quote;
  let quotedAccount;
  if (isQuotedPost(subject.embed)) {
    quote = decideQuotedPost(subject.embed, opts);
    quotedAccount = decideQuotedPostAccount(subject.embed, opts);
  } else if (isQuotedPostWithMedia(subject.embed)) {
    quote = decideQuotedPostWithMedia(subject.embed, opts);
    quotedAccount = decideQuotedPostWithMediaAccount(subject.embed, opts);
  }
  if (quote?.blurMedia) {
    quote.blur = true;
  }
  if (!isModerationDecisionNoop(post) && post.did === opts.userDid) {
    downgradeDecision(post, "blur");
  }
  if (account.cause && account.did === opts.userDid) {
    downgradeDecision(account, "noop");
  }
  if (profile.cause && profile.did === opts.userDid) {
    downgradeDecision(profile, "noop");
  }
  if (quote && !isModerationDecisionNoop(quote) && quote.did === opts.userDid) {
    downgradeDecision(quote, "blur");
  }
  if (quotedAccount && !isModerationDecisionNoop(quotedAccount) && quotedAccount.did === opts.userDid) {
    downgradeDecision(quotedAccount, "noop");
  }
  const mergedForFeed = takeHighestPriorityDecision(
    post,
    account,
    quote,
    quotedAccount
  );
  const mergedForView = takeHighestPriorityDecision(post, account);
  const mergedQuote = takeHighestPriorityDecision(quote, quotedAccount);
  let blurAvatar = false;
  if ((account.blur || account.blurMedia) && account.cause?.type !== "muted") {
    blurAvatar = true;
  } else if ((profile.blur || profile.blurMedia) && profile.cause?.type !== "muted") {
    blurAvatar = true;
  }
  return {
    decisions: { post, account, profile, quote, quotedAccount },
    content: {
      cause: !isModerationDecisionNoop(mergedForView) ? mergedForView.cause : mergedForFeed.filter ? mergedForFeed.cause : void 0,
      filter: mergedForFeed.filter,
      blur: mergedForView.blur,
      alert: mergedForView.alert,
      noOverride: mergedForView.noOverride
    },
    avatar: {
      blur: blurAvatar,
      alert: account.alert || profile.alert,
      noOverride: account.noOverride || profile.noOverride
    },
    embed: !isModerationDecisionNoop(mergedQuote, { ignoreFilter: true }) ? {
      cause: mergedQuote.cause,
      blur: mergedQuote.blur,
      alert: mergedQuote.alert,
      noOverride: mergedQuote.noOverride
    } : account.blurMedia ? {
      cause: account.cause,
      blur: true,
      noOverride: account.noOverride
    } : post.blurMedia ? {
      cause: post.cause,
      blur: true,
      noOverride: post.noOverride
    } : {}
  };
}
function moderateFeedGenerator(subject, opts) {
  const feedGenerator = decideFeedGenerator(subject, opts);
  const account = decideAccount(subject.creator, opts);
  const profile = decideProfile(subject.creator, opts);
  const merged = takeHighestPriorityDecision(feedGenerator, account);
  return {
    decisions: { feedGenerator, account, profile },
    content: {
      cause: isModerationDecisionNoop(merged) ? void 0 : merged.cause,
      filter: merged.filter,
      blur: merged.blur,
      alert: merged.alert,
      noOverride: merged.noOverride
    },
    avatar: {
      blur: account.blurMedia || profile.blurMedia,
      alert: account.alert,
      noOverride: account.noOverride || profile.noOverride
    }
  };
}
function moderateUserList(subject, opts) {
  const userList = decideUserList(subject, opts);
  const account = defs_exports5.isProfileViewBasic(subject.creator) ? decideAccount(subject.creator, opts) : ModerationDecision.noop();
  const profile = defs_exports5.isProfileViewBasic(subject.creator) ? decideProfile(subject.creator, opts) : ModerationDecision.noop();
  const merged = takeHighestPriorityDecision(userList, account);
  return {
    decisions: { userList, account, profile },
    content: {
      cause: isModerationDecisionNoop(merged) ? void 0 : merged.cause,
      filter: merged.filter,
      blur: merged.blur,
      alert: merged.alert,
      noOverride: merged.noOverride
    },
    avatar: {
      blur: account.blurMedia || profile.blurMedia,
      alert: account.alert,
      noOverride: account.noOverride || profile.noOverride
    }
  };
}

// src/moderation/const/label-groups.ts
var LABEL_GROUPS = {
  system: {
    id: "system",
    configurable: false,
    labels: [LABELS["!hide"], LABELS["!no-promote"], LABELS["!warn"]],
    strings: {
      settings: {
        en: {
          name: "System",
          description: "Moderator overrides for special cases."
        }
      }
    }
  },
  legal: {
    id: "legal",
    configurable: false,
    labels: [LABELS["dmca-violation"], LABELS["doxxing"]],
    strings: {
      settings: {
        en: {
          name: "Legal",
          description: "Content removed for legal reasons."
        }
      }
    }
  },
  sexual: {
    id: "sexual",
    configurable: true,
    labels: [LABELS["porn"], LABELS["sexual"], LABELS["nudity"]],
    strings: {
      settings: {
        en: {
          name: "Adult Content",
          description: "Content which is sexual in nature."
        }
      }
    }
  },
  violence: {
    id: "violence",
    configurable: true,
    labels: [
      LABELS["nsfl"],
      LABELS["corpse"],
      LABELS["gore"],
      LABELS["torture"],
      LABELS["self-harm"]
    ],
    strings: {
      settings: {
        en: {
          name: "Violence",
          description: "Content which is violent or deeply disturbing."
        }
      }
    }
  },
  intolerance: {
    id: "intolerance",
    configurable: true,
    labels: [
      LABELS["intolerant-race"],
      LABELS["intolerant-gender"],
      LABELS["intolerant-sexual-orientation"],
      LABELS["intolerant-religion"],
      LABELS["intolerant"],
      LABELS["icon-intolerant"]
    ],
    strings: {
      settings: {
        en: {
          name: "Intolerance",
          description: "Content or behavior which is hateful or intolerant toward a group of people."
        }
      }
    }
  },
  rude: {
    id: "rude",
    configurable: true,
    labels: [LABELS["threat"]],
    strings: {
      settings: {
        en: {
          name: "Rude",
          description: "Behavior which is rude toward other users."
        }
      }
    }
  },
  curation: {
    id: "curation",
    configurable: true,
    labels: [LABELS["spoiler"]],
    strings: {
      settings: {
        en: {
          name: "Curational",
          description: "Subjective moderation geared towards curating a more positive environment."
        }
      }
    }
  },
  spam: {
    id: "spam",
    configurable: true,
    labels: [LABELS["spam"]],
    strings: {
      settings: {
        en: {
          name: "Spam",
          description: "Content which doesn't add to the conversation."
        }
      }
    }
  },
  misinfo: {
    id: "misinfo",
    configurable: true,
    labels: [
      LABELS["account-security"],
      LABELS["net-abuse"],
      LABELS["impersonation"],
      LABELS["scam"]
    ],
    strings: {
      settings: {
        en: {
          name: "Misinformation",
          description: "Content which misleads or defrauds users."
        }
      }
    }
  }
};

// src/bsky-agent.ts
var BskyAgent = class extends AtpAgent {
  constructor() {
    super(...arguments);
    this.getTimeline = (params2, opts) => this.api.app.bsky.feed.getTimeline(params2, opts);
    this.getAuthorFeed = (params2, opts) => this.api.app.bsky.feed.getAuthorFeed(params2, opts);
    this.getActorLikes = (params2, opts) => this.api.app.bsky.feed.getActorLikes(params2, opts);
    this.getPostThread = (params2, opts) => this.api.app.bsky.feed.getPostThread(params2, opts);
    this.getPost = (params2) => this.api.app.bsky.feed.post.get(params2);
    this.getPosts = (params2, opts) => this.api.app.bsky.feed.getPosts(params2, opts);
    this.getLikes = (params2, opts) => this.api.app.bsky.feed.getLikes(params2, opts);
    this.getRepostedBy = (params2, opts) => this.api.app.bsky.feed.getRepostedBy(params2, opts);
    this.getFollows = (params2, opts) => this.api.app.bsky.graph.getFollows(params2, opts);
    this.getFollowers = (params2, opts) => this.api.app.bsky.graph.getFollowers(params2, opts);
    this.getProfile = (params2, opts) => this.api.app.bsky.actor.getProfile(params2, opts);
    this.getProfiles = (params2, opts) => this.api.app.bsky.actor.getProfiles(params2, opts);
    this.getSuggestions = (params2, opts) => this.api.app.bsky.actor.getSuggestions(params2, opts);
    this.searchActors = (params2, opts) => this.api.app.bsky.actor.searchActors(params2, opts);
    this.searchActorsTypeahead = (params2, opts) => this.api.app.bsky.actor.searchActorsTypeahead(params2, opts);
    this.listNotifications = (params2, opts) => this.api.app.bsky.notification.listNotifications(params2, opts);
    this.countUnreadNotifications = (params2, opts) => this.api.app.bsky.notification.getUnreadCount(params2, opts);
  }
  get app() {
    return this.api.app;
  }
  async post(record) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    record.createdAt = record.createdAt || new Date().toISOString();
    return this.api.app.bsky.feed.post.create(
      { repo: this.session.did },
      record
    );
  }
  async deletePost(postUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const postUrip = new AtUri(postUri);
    return await this.api.app.bsky.feed.post.delete({
      repo: postUrip.hostname,
      rkey: postUrip.rkey
    });
  }
  async like(uri2, cid2) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.feed.like.create(
      { repo: this.session.did },
      {
        subject: { uri: uri2, cid: cid2 },
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteLike(likeUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const likeUrip = new AtUri(likeUri);
    return await this.api.app.bsky.feed.like.delete({
      repo: likeUrip.hostname,
      rkey: likeUrip.rkey
    });
  }
  async repost(uri2, cid2) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.feed.repost.create(
      { repo: this.session.did },
      {
        subject: { uri: uri2, cid: cid2 },
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteRepost(repostUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const repostUrip = new AtUri(repostUri);
    return await this.api.app.bsky.feed.repost.delete({
      repo: repostUrip.hostname,
      rkey: repostUrip.rkey
    });
  }
  async follow(subjectDid) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    return await this.api.app.bsky.graph.follow.create(
      { repo: this.session.did },
      {
        subject: subjectDid,
        createdAt: new Date().toISOString()
      }
    );
  }
  async deleteFollow(followUri) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    const followUrip = new AtUri(followUri);
    return await this.api.app.bsky.graph.follow.delete({
      repo: followUrip.hostname,
      rkey: followUrip.rkey
    });
  }
  async upsertProfile(updateFn) {
    if (!this.session) {
      throw new Error("Not logged in");
    }
    let retriesRemaining = 5;
    while (retriesRemaining >= 0) {
      const existing = await this.com.atproto.repo.getRecord({
        repo: this.session.did,
        collection: "app.bsky.actor.profile",
        rkey: "self"
      }).catch((_) => void 0);
      const updated = await updateFn(existing?.data.value);
      if (updated) {
        updated.$type = "app.bsky.actor.profile";
      }
      const validation = profile_exports.validateRecord(updated);
      if (!validation.success) {
        throw validation.error;
      }
      try {
        await this.com.atproto.repo.putRecord({
          repo: this.session.did,
          collection: "app.bsky.actor.profile",
          rkey: "self",
          record: updated,
          swapRecord: existing?.data.cid || null
        });
      } catch (e) {
        if (retriesRemaining > 0 && e instanceof putRecord_exports.InvalidSwapError) {
          retriesRemaining--;
          continue;
        } else {
          throw e;
        }
      }
      break;
    }
  }
  async mute(actor) {
    return this.api.app.bsky.graph.muteActor({ actor });
  }
  async unmute(actor) {
    return this.api.app.bsky.graph.unmuteActor({ actor });
  }
  async updateSeenNotifications(seenAt) {
    seenAt = seenAt || new Date().toISOString();
    return this.api.app.bsky.notification.updateSeen({
      seenAt
    });
  }
  async getPreferences() {
    const prefs = {
      feeds: {
        saved: void 0,
        pinned: void 0
      },
      adultContentEnabled: false,
      contentLabels: {}
    };
    const res = await this.app.bsky.actor.getPreferences({});
    for (const pref of res.data.preferences) {
      if (defs_exports5.isAdultContentPref(pref) && defs_exports5.validateAdultContentPref(pref).success) {
        prefs.adultContentEnabled = pref.enabled;
      } else if (defs_exports5.isContentLabelPref(pref) && defs_exports5.validateAdultContentPref(pref).success) {
        let value = pref.visibility;
        if (value === "show") {
          value = "ignore";
        }
        if (value === "ignore" || value === "warn" || value === "hide") {
          prefs.contentLabels[pref.label] = value;
        }
      } else if (defs_exports5.isSavedFeedsPref(pref) && defs_exports5.validateSavedFeedsPref(pref).success) {
        prefs.feeds.saved = pref.saved;
        prefs.feeds.pinned = pref.pinned;
      }
    }
    return prefs;
  }
  async setSavedFeeds(saved, pinned) {
    return updateFeedPreferences(this, () => ({
      saved,
      pinned
    }));
  }
  async addSavedFeed(v) {
    return updateFeedPreferences(this, (saved, pinned) => ({
      saved: [...saved.filter((uri2) => uri2 !== v), v],
      pinned
    }));
  }
  async removeSavedFeed(v) {
    return updateFeedPreferences(this, (saved, pinned) => ({
      saved: saved.filter((uri2) => uri2 !== v),
      pinned: pinned.filter((uri2) => uri2 !== v)
    }));
  }
  async addPinnedFeed(v) {
    return updateFeedPreferences(this, (saved, pinned) => ({
      saved: [...saved.filter((uri2) => uri2 !== v), v],
      pinned: [...pinned.filter((uri2) => uri2 !== v), v]
    }));
  }
  async removePinnedFeed(v) {
    return updateFeedPreferences(this, (saved, pinned) => ({
      saved,
      pinned: pinned.filter((uri2) => uri2 !== v)
    }));
  }
  async setAdultContentEnabled(v) {
    await updatePreferences(this, (prefs) => {
      const existing = prefs.find(
        (pref) => defs_exports5.isAdultContentPref(pref) && defs_exports5.validateAdultContentPref(pref).success
      );
      if (existing) {
        existing.enabled = v;
      } else {
        prefs.push({
          $type: "app.bsky.actor.defs#adultContentPref",
          enabled: v
        });
      }
      return prefs;
    });
  }
  async setContentLabelPref(key, value) {
    if (value === "show") {
      value = "ignore";
    }
    await updatePreferences(this, (prefs) => {
      const existing = prefs.find(
        (pref) => defs_exports5.isContentLabelPref(pref) && defs_exports5.validateAdultContentPref(pref).success && pref.label === key
      );
      if (existing) {
        existing.visibility = value;
      } else {
        prefs.push({
          $type: "app.bsky.actor.defs#contentLabelPref",
          label: key,
          visibility: value
        });
      }
      return prefs;
    });
  }
};
async function updatePreferences(agent, cb) {
  const res = await agent.app.bsky.actor.getPreferences({});
  const newPrefs = cb(res.data.preferences);
  if (newPrefs === false) {
    return;
  }
  await agent.app.bsky.actor.putPreferences({
    preferences: newPrefs
  });
}
async function updateFeedPreferences(agent, cb) {
  let res;
  await updatePreferences(agent, (prefs) => {
    let feedsPref = prefs.find(
      (pref) => defs_exports5.isSavedFeedsPref(pref) && defs_exports5.validateSavedFeedsPref(pref).success
    );
    if (feedsPref) {
      res = cb(feedsPref.saved, feedsPref.pinned);
      feedsPref.saved = res.saved;
      feedsPref.pinned = res.pinned;
    } else {
      res = cb([], []);
      feedsPref = {
        $type: "app.bsky.actor.defs#savedFeedsPref",
        saved: res.saved,
        pinned: res.pinned
      };
    }
    return prefs.filter((pref) => !defs_exports5.isSavedFeedsPref(pref)).concat([feedsPref]);
  });
  return res;
}


},{}],2:[function(require,module,exports){
const { BskyAgent } = require("@atproto/api");

var agent = new BskyAgent({ service: "https://bsky.social" });
var socket = undefined;

const accounts = {}

document.addEventListener('readystatechange', event => { 
    if (event.target.readyState === "complete") {
        async function crawl(actor) {
            {  // getFollowers
                var params = {'actor':actor,'limit':100}
                var result = undefined;
                do {

                    result = await agent.getFollowers(params);
    
                    const  subject = result['data']['subject'];

                    addToList(subject['handle'],subject['did'])
                    const target_did = subject["did"];
                    socket.send(JSON.stringify({'an':{[target_did] :{'label':subject['handle'],'r':0.5,'g':0.5,'b':0.5 }}}));

                    result['data']['followers'].forEach((element) => {
                        addToList(element['handle'],element['did'])
                        const source_did = element['did'];
                        socket.send(JSON.stringify({'an':{[source_did] :{'label':element['handle'],'r':0.5,'g':0.5,'b':0.5}}}));

                        const edge_id = `${source_did}-->${target_did}`;
                        socket.send(JSON.stringify({'ae':{ [edge_id]: {'source':source_did,'target':target_did,'directed':true}}}));
            
                    });
                    params["cursor"]=result['data']['cursor']
                } while( result['data']['cursor']!==undefined);
            }
            {  // getFollows
                var params = {'actor':actor,'limit':100}
                var result = undefined;
                do {

                    result = await agent.getFollows(params);
    
                    const  subject = result['data']['subject'];
                    addToList(subject['handle'],subject['did'])
                    const source_did = subject["did"];
                    socket.send(JSON.stringify({'an':{[source_did] :{'label':subject['handle'],'r':0.5,'g':0.5,'b':0.5 }}}));

                    result['data']['follows'].forEach((element) => {
                        addToList(element['handle'],element['did'])
                        const target_did = element['did'];
                        socket.send(JSON.stringify({'an':{[target_did] :{'label':element['handle'],'r':0.5,'g':0.5,'b':0.5}}}));

                        const edge_id = `${target_did}-->${source_did}`;
                        socket.send(JSON.stringify({'ae':{ [edge_id]: {'target':target_did,'source':source_did,'directed':true}}}));
            
                    });
                    params["cursor"]=result['data']['cursor']
                } while( result['data']['cursor']!==undefined);
            }
        }
        const accountsList = document.getElementById("accountsList");
        function addToList(handle,did) {
            if(accounts[did]===undefined) {
           
                accounts[did] = document.createElement("div")
                
                accounts[did].id = did;
                accounts[did].innerHTML = `<a href="#_${did}">${handle}</a>`;
                accounts[did].addEventListener("click",async function(){
                        await crawl(did);
                });
                var maxBound = accountsList.childElementCount
                var minBound = 0 
         
                if(accountsList.childElementCount===0) {
                    accountsList.appendChild(accounts[did]);
                    return;
                }
                do{
                    var p = minBound+Math.floor((maxBound-minBound)/2);

                    if(handle < accountsList.children[p].firstChild.innerHTML) {
                            maxBound = p; 
                    } else {
                        minBound = p+1;
                        p=minBound;
                    }
                }while(minBound<maxBound);
                if(p===accountsList.childElementCount) {
                    accountsList.insertAdjacentElement("beforeend",accounts[did]);
                    return;
                }
                accountsList.insertBefore(accounts[did],accountsList.children[p]);
          
            }
        }

        const connectBtn = document.getElementById('connectBsky');
        connectBtn.addEventListener("click",async function(){
            connectBtn.classList.remove(...connectBtn.classList);
            const handle = document.getElementById('handle').value;
            const password = document.getElementById('password').value;
            const resp = await agent.login({
                identifier: handle,
                password: password
                });
            if(resp.success === true) {
                getFollowerBtn.disabled=false;
                connectBtn.classList.add("connected");
            } else {
                connectBtn.classList.add("error");
            }
        });

        const connectWs = document.getElementById('connectWs');
        connectWs.addEventListener("click",async function(){
            connectWs.classList.remove(...connectWs.classList);
            const url = new URL(document.getElementById('urlWs').value);
            socket = new WebSocket(`${url.protocol}//${url.host}/workspace1?operation=updateGraph`);

            const err = (event) => {
                connectWs.classList.remove(...connectWs.classList);
                connectWs.classList.add("error");
            };
            socket.addEventListener("close",err );
            socket.addEventListener("error", err);
            socket.addEventListener("message", (event) => {});
            socket.addEventListener("open", (event) => {
                connectWs.classList.add("connected");
            });
            
        });


        const getFollowerBtn = document.getElementById('getFollowerBtn');
        getFollowerBtn.disabled=true;
        getFollowerBtn.addEventListener("click",async function(e){
            e.stopPropagation();
            e.preventDefault();
            const actors = document.getElementById('actor').value.split('\n').map((e)=>e.trim());
            
        
            actors.forEach(async (actor)=>{
            await crawl(actor)
        });
        });
    
    }

    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {}
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    
});

},{"@atproto/api":1}]},{},[2]);
