/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
!(function (a, b) {
  'function' == typeof define && define.amd
    ? define([], b)
    : 'object' == typeof exports
    ? (module.exports = b())
    : (a.Handlebars = a.Handlebars || b());
})(this, function () {
  var a = (function () {
      'use strict';
      function a(a) {
        this.string = a;
      }
      var b;
      return (
        (a.prototype.toString = function () {
          return '' + this.string;
        }),
        (b = a)
      );
    })(),
    b = (function (a) {
      'use strict';
      function b(a) {
        return i[a];
      }
      function c(a) {
        for (var b = 1; b < arguments.length; b++)
          for (var c in arguments[b])
            Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
        return a;
      }
      function d(a) {
        return a instanceof h
          ? a.toString()
          : null == a
          ? ''
          : a
          ? ((a = '' + a), k.test(a) ? a.replace(j, b) : a)
          : a + '';
      }
      function e(a) {
        return a || 0 === a ? (n(a) && 0 === a.length ? !0 : !1) : !0;
      }
      function f(a, b) {
        return (a ? a + '.' : '') + b;
      }
      var g = {},
        h = a,
        i = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' },
        j = /[&<>"'`]/g,
        k = /[&<>"'`]/;
      g.extend = c;
      var l = Object.prototype.toString;
      g.toString = l;
      var m = function (a) {
        return 'function' == typeof a;
      };
      m(/x/) &&
        (m = function (a) {
          return 'function' == typeof a && '[object Function]' === l.call(a);
        });
      var m;
      g.isFunction = m;
      var n =
        Array.isArray ||
        function (a) {
          return a && 'object' == typeof a ? '[object Array]' === l.call(a) : !1;
        };
      return (
        (g.isArray = n), (g.escapeExpression = d), (g.isEmpty = e), (g.appendContextPath = f), g
      );
    })(a),
    c = (function () {
      'use strict';
      function a(a, b) {
        var d;
        b && b.firstLine && ((d = b.firstLine), (a += ' - ' + d + ':' + b.firstColumn));
        for (var e = Error.prototype.constructor.call(this, a), f = 0; f < c.length; f++)
          this[c[f]] = e[c[f]];
        d && ((this.lineNumber = d), (this.column = b.firstColumn));
      }
      var b,
        c = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
      return (a.prototype = new Error()), (b = a);
    })(),
    d = (function (a, b) {
      'use strict';
      function c(a, b) {
        (this.helpers = a || {}), (this.partials = b || {}), d(this);
      }
      function d(a) {
        a.registerHelper('helperMissing', function () {
          if (1 === arguments.length) return void 0;
          throw new g("Missing helper: '" + arguments[arguments.length - 1].name + "'");
        }),
          a.registerHelper('blockHelperMissing', function (b, c) {
            var d = c.inverse,
              e = c.fn;
            if (b === !0) return e(this);
            if (b === !1 || null == b) return d(this);
            if (k(b))
              return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this);
            if (c.data && c.ids) {
              var g = q(c.data);
              (g.contextPath = f.appendContextPath(c.data.contextPath, c.name)), (c = { data: g });
            }
            return e(b, c);
          }),
          a.registerHelper('each', function (a, b) {
            if (!b) throw new g('Must pass iterator to #each');
            var c,
              d,
              e = b.fn,
              h = b.inverse,
              i = 0,
              j = '';
            if (
              (b.data && b.ids && (d = f.appendContextPath(b.data.contextPath, b.ids[0]) + '.'),
              l(a) && (a = a.call(this)),
              b.data && (c = q(b.data)),
              a && 'object' == typeof a)
            )
              if (k(a))
                for (var m = a.length; m > i; i++)
                  c &&
                    ((c.index = i),
                    (c.first = 0 === i),
                    (c.last = i === a.length - 1),
                    d && (c.contextPath = d + i)),
                    (j += e(a[i], { data: c }));
              else
                for (var n in a)
                  a.hasOwnProperty(n) &&
                    (c &&
                      ((c.key = n),
                      (c.index = i),
                      (c.first = 0 === i),
                      d && (c.contextPath = d + n)),
                    (j += e(a[n], { data: c })),
                    i++);
            return 0 === i && (j = h(this)), j;
          }),
          a.registerHelper('if', function (a, b) {
            return (
              l(a) && (a = a.call(this)),
              (!b.hash.includeZero && !a) || f.isEmpty(a) ? b.inverse(this) : b.fn(this)
            );
          }),
          a.registerHelper('unless', function (b, c) {
            return a.helpers['if'].call(this, b, { fn: c.inverse, inverse: c.fn, hash: c.hash });
          }),
          a.registerHelper('with', function (a, b) {
            l(a) && (a = a.call(this));
            var c = b.fn;
            if (f.isEmpty(a)) return b.inverse(this);
            if (b.data && b.ids) {
              var d = q(b.data);
              (d.contextPath = f.appendContextPath(b.data.contextPath, b.ids[0])),
                (b = { data: d });
            }
            return c(a, b);
          }),
          a.registerHelper('log', function (b, c) {
            var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
            a.log(d, b);
          }),
          a.registerHelper('lookup', function (a, b) {
            return a && a[b];
          });
      }
      var e = {},
        f = a,
        g = b,
        h = '2.0.0';
      e.VERSION = h;
      var i = 6;
      e.COMPILER_REVISION = i;
      var j = {
        1: '<= 1.0.rc.2',
        2: '== 1.0.0-rc.3',
        3: '== 1.0.0-rc.4',
        4: '== 1.x.x',
        5: '== 2.0.0-alpha.x',
        6: '>= 2.0.0-beta.1',
      };
      e.REVISION_CHANGES = j;
      var k = f.isArray,
        l = f.isFunction,
        m = f.toString,
        n = '[object Object]';
      (e.HandlebarsEnvironment = c),
        (c.prototype = {
          constructor: c,
          logger: o,
          log: p,
          registerHelper: function (a, b) {
            if (m.call(a) === n) {
              if (b) throw new g('Arg not supported with multiple helpers');
              f.extend(this.helpers, a);
            } else this.helpers[a] = b;
          },
          unregisterHelper: function (a) {
            delete this.helpers[a];
          },
          registerPartial: function (a, b) {
            m.call(a) === n ? f.extend(this.partials, a) : (this.partials[a] = b);
          },
          unregisterPartial: function (a) {
            delete this.partials[a];
          },
        });
      var o = {
        methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        level: 3,
        log: function (a, b) {
          if (o.level <= a) {
            var c = o.methodMap[a];
            'undefined' != typeof console && console[c] && console[c].call(console, b);
          }
        },
      };
      e.logger = o;
      var p = o.log;
      e.log = p;
      var q = function (a) {
        var b = f.extend({}, a);
        return (b._parent = a), b;
      };
      return (e.createFrame = q), e;
    })(b, c),
    e = (function (a, b, c) {
      'use strict';
      function d(a) {
        var b = (a && a[0]) || 1,
          c = m;
        if (b !== c) {
          if (c > b) {
            var d = n[c],
              e = n[b];
            throw new l(
              'Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (' +
                d +
                ') or downgrade your runtime to an older version (' +
                e +
                ').'
            );
          }
          throw new l(
            'Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (' +
              a[1] +
              ').'
          );
        }
      }
      function e(a, b) {
        if (!b) throw new l('No environment passed to template');
        if (!a || !a.main) throw new l('Unknown template object: ' + typeof a);
        b.VM.checkRevision(a.compiler);
        var c = function (c, d, e, f, g, h, i, j, m) {
            g && (f = k.extend({}, f, g));
            var n = b.VM.invokePartial.call(this, c, e, f, h, i, j, m);
            if (null == n && b.compile) {
              var o = { helpers: h, partials: i, data: j, depths: m };
              (i[e] = b.compile(c, { data: void 0 !== j, compat: a.compat }, b)), (n = i[e](f, o));
            }
            if (null != n) {
              if (d) {
                for (
                  var p = n.split('\n'), q = 0, r = p.length;
                  r > q && (p[q] || q + 1 !== r);
                  q++
                )
                  p[q] = d + p[q];
                n = p.join('\n');
              }
              return n;
            }
            throw new l(
              'The partial ' + e + ' could not be compiled when running in runtime-only mode'
            );
          },
          d = {
            lookup: function (a, b) {
              for (var c = a.length, d = 0; c > d; d++) if (a[d] && null != a[d][b]) return a[d][b];
            },
            lambda: function (a, b) {
              return 'function' == typeof a ? a.call(b) : a;
            },
            escapeExpression: k.escapeExpression,
            invokePartial: c,
            fn: function (b) {
              return a[b];
            },
            programs: [],
            program: function (a, b, c) {
              var d = this.programs[a],
                e = this.fn(a);
              return (
                b || c ? (d = f(this, a, e, b, c)) : d || (d = this.programs[a] = f(this, a, e)), d
              );
            },
            data: function (a, b) {
              for (; a && b--; ) a = a._parent;
              return a;
            },
            merge: function (a, b) {
              var c = a || b;
              return a && b && a !== b && (c = k.extend({}, b, a)), c;
            },
            noop: b.VM.noop,
            compilerInfo: a.compiler,
          },
          e = function (b, c) {
            c = c || {};
            var f = c.data;
            e._setup(c), !c.partial && a.useData && (f = i(b, f));
            var g;
            return (
              a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]),
              a.main.call(d, b, d.helpers, d.partials, f, g)
            );
          };
        return (
          (e.isTop = !0),
          (e._setup = function (c) {
            c.partial
              ? ((d.helpers = c.helpers), (d.partials = c.partials))
              : ((d.helpers = d.merge(c.helpers, b.helpers)),
                a.usePartial && (d.partials = d.merge(c.partials, b.partials)));
          }),
          (e._child = function (b, c, e) {
            if (a.useDepths && !e) throw new l('must pass parent depths');
            return f(d, b, a[b], c, e);
          }),
          e
        );
      }
      function f(a, b, c, d, e) {
        var f = function (b, f) {
          return (
            (f = f || {}), c.call(a, b, a.helpers, a.partials, f.data || d, e && [b].concat(e))
          );
        };
        return (f.program = b), (f.depth = e ? e.length : 0), f;
      }
      function g(a, b, c, d, e, f, g) {
        var h = { partial: !0, helpers: d, partials: e, data: f, depths: g };
        if (void 0 === a) throw new l('The partial ' + b + ' could not be found');
        return a instanceof Function ? a(c, h) : void 0;
      }
      function h() {
        return '';
      }
      function i(a, b) {
        return (b && 'root' in b) || ((b = b ? o(b) : {}), (b.root = a)), b;
      }
      var j = {},
        k = a,
        l = b,
        m = c.COMPILER_REVISION,
        n = c.REVISION_CHANGES,
        o = c.createFrame;
      return (
        (j.checkRevision = d),
        (j.template = e),
        (j.program = f),
        (j.invokePartial = g),
        (j.noop = h),
        j
      );
    })(b, c, d),
    f = (function (a, b, c, d, e) {
      'use strict';
      var f,
        g = a,
        h = b,
        i = c,
        j = d,
        k = e,
        l = function () {
          var a = new g.HandlebarsEnvironment();
          return (
            j.extend(a, g),
            (a.SafeString = h),
            (a.Exception = i),
            (a.Utils = j),
            (a.escapeExpression = j.escapeExpression),
            (a.VM = k),
            (a.template = function (b) {
              return k.template(b, a);
            }),
            a
          );
        },
        m = l();
      return (m.create = l), (m['default'] = m), (f = m);
    })(d, a, c, b, e),
    g = (function (a) {
      'use strict';
      function b(a) {
        (a = a || {}),
          (this.firstLine = a.first_line),
          (this.firstColumn = a.first_column),
          (this.lastColumn = a.last_column),
          (this.lastLine = a.last_line);
      }
      var c,
        d = a,
        e = {
          ProgramNode: function (a, c, d) {
            b.call(this, d), (this.type = 'program'), (this.statements = a), (this.strip = c);
          },
          MustacheNode: function (a, c, d, f, g) {
            if (
              (b.call(this, g), (this.type = 'mustache'), (this.strip = f), null != d && d.charAt)
            ) {
              var h = d.charAt(3) || d.charAt(2);
              this.escaped = '{' !== h && '&' !== h;
            } else this.escaped = !!d;
            (this.sexpr = a instanceof e.SexprNode ? a : new e.SexprNode(a, c)),
              (this.id = this.sexpr.id),
              (this.params = this.sexpr.params),
              (this.hash = this.sexpr.hash),
              (this.eligibleHelper = this.sexpr.eligibleHelper),
              (this.isHelper = this.sexpr.isHelper);
          },
          SexprNode: function (a, c, d) {
            b.call(this, d), (this.type = 'sexpr'), (this.hash = c);
            var e = (this.id = a[0]),
              f = (this.params = a.slice(1));
            (this.isHelper = !(!f.length && !c)),
              (this.eligibleHelper = this.isHelper || e.isSimple);
          },
          PartialNode: function (a, c, d, e, f) {
            b.call(this, f),
              (this.type = 'partial'),
              (this.partialName = a),
              (this.context = c),
              (this.hash = d),
              (this.strip = e),
              (this.strip.inlineStandalone = !0);
          },
          BlockNode: function (a, c, d, e, f) {
            b.call(this, f),
              (this.type = 'block'),
              (this.mustache = a),
              (this.program = c),
              (this.inverse = d),
              (this.strip = e),
              d && !c && (this.isInverse = !0);
          },
          RawBlockNode: function (a, c, f, g) {
            if ((b.call(this, g), a.sexpr.id.original !== f))
              throw new d(a.sexpr.id.original + " doesn't match " + f, this);
            (c = new e.ContentNode(c, g)),
              (this.type = 'block'),
              (this.mustache = a),
              (this.program = new e.ProgramNode([c], {}, g));
          },
          ContentNode: function (a, c) {
            b.call(this, c), (this.type = 'content'), (this.original = this.string = a);
          },
          HashNode: function (a, c) {
            b.call(this, c), (this.type = 'hash'), (this.pairs = a);
          },
          IdNode: function (a, c) {
            b.call(this, c), (this.type = 'ID');
            for (var e = '', f = [], g = 0, h = '', i = 0, j = a.length; j > i; i++) {
              var k = a[i].part;
              if (((e += (a[i].separator || '') + k), '..' === k || '.' === k || 'this' === k)) {
                if (f.length > 0) throw new d('Invalid path: ' + e, this);
                '..' === k ? (g++, (h += '../')) : (this.isScoped = !0);
              } else f.push(k);
            }
            (this.original = e),
              (this.parts = f),
              (this.string = f.join('.')),
              (this.depth = g),
              (this.idName = h + this.string),
              (this.isSimple = 1 === a.length && !this.isScoped && 0 === g),
              (this.stringModeValue = this.string);
          },
          PartialNameNode: function (a, c) {
            b.call(this, c), (this.type = 'PARTIAL_NAME'), (this.name = a.original);
          },
          DataNode: function (a, c) {
            b.call(this, c),
              (this.type = 'DATA'),
              (this.id = a),
              (this.stringModeValue = a.stringModeValue),
              (this.idName = '@' + a.stringModeValue);
          },
          StringNode: function (a, c) {
            b.call(this, c),
              (this.type = 'STRING'),
              (this.original = this.string = this.stringModeValue = a);
          },
          NumberNode: function (a, c) {
            b.call(this, c),
              (this.type = 'NUMBER'),
              (this.original = this.number = a),
              (this.stringModeValue = Number(a));
          },
          BooleanNode: function (a, c) {
            b.call(this, c),
              (this.type = 'BOOLEAN'),
              (this.bool = a),
              (this.stringModeValue = 'true' === a);
          },
          CommentNode: function (a, c) {
            b.call(this, c),
              (this.type = 'comment'),
              (this.comment = a),
              (this.strip = { inlineStandalone: !0 });
          },
        };
      return (c = e);
    })(c),
    h = (function () {
      'use strict';
      var a,
        b = (function () {
          function a() {
            this.yy = {};
          }
          var b = {
              trace: function () {},
              yy: {},
              symbols_: {
                error: 2,
                root: 3,
                program: 4,
                EOF: 5,
                program_repetition0: 6,
                statement: 7,
                mustache: 8,
                block: 9,
                rawBlock: 10,
                partial: 11,
                CONTENT: 12,
                COMMENT: 13,
                openRawBlock: 14,
                END_RAW_BLOCK: 15,
                OPEN_RAW_BLOCK: 16,
                sexpr: 17,
                CLOSE_RAW_BLOCK: 18,
                openBlock: 19,
                block_option0: 20,
                closeBlock: 21,
                openInverse: 22,
                block_option1: 23,
                OPEN_BLOCK: 24,
                CLOSE: 25,
                OPEN_INVERSE: 26,
                inverseAndProgram: 27,
                INVERSE: 28,
                OPEN_ENDBLOCK: 29,
                path: 30,
                OPEN: 31,
                OPEN_UNESCAPED: 32,
                CLOSE_UNESCAPED: 33,
                OPEN_PARTIAL: 34,
                partialName: 35,
                param: 36,
                partial_option0: 37,
                partial_option1: 38,
                sexpr_repetition0: 39,
                sexpr_option0: 40,
                dataName: 41,
                STRING: 42,
                NUMBER: 43,
                BOOLEAN: 44,
                OPEN_SEXPR: 45,
                CLOSE_SEXPR: 46,
                hash: 47,
                hash_repetition_plus0: 48,
                hashSegment: 49,
                ID: 50,
                EQUALS: 51,
                DATA: 52,
                pathSegments: 53,
                SEP: 54,
                $accept: 0,
                $end: 1,
              },
              terminals_: {
                2: 'error',
                5: 'EOF',
                12: 'CONTENT',
                13: 'COMMENT',
                15: 'END_RAW_BLOCK',
                16: 'OPEN_RAW_BLOCK',
                18: 'CLOSE_RAW_BLOCK',
                24: 'OPEN_BLOCK',
                25: 'CLOSE',
                26: 'OPEN_INVERSE',
                28: 'INVERSE',
                29: 'OPEN_ENDBLOCK',
                31: 'OPEN',
                32: 'OPEN_UNESCAPED',
                33: 'CLOSE_UNESCAPED',
                34: 'OPEN_PARTIAL',
                42: 'STRING',
                43: 'NUMBER',
                44: 'BOOLEAN',
                45: 'OPEN_SEXPR',
                46: 'CLOSE_SEXPR',
                50: 'ID',
                51: 'EQUALS',
                52: 'DATA',
                54: 'SEP',
              },
              productions_: [
                0,
                [3, 2],
                [4, 1],
                [7, 1],
                [7, 1],
                [7, 1],
                [7, 1],
                [7, 1],
                [7, 1],
                [10, 3],
                [14, 3],
                [9, 4],
                [9, 4],
                [19, 3],
                [22, 3],
                [27, 2],
                [21, 3],
                [8, 3],
                [8, 3],
                [11, 5],
                [11, 4],
                [17, 3],
                [17, 1],
                [36, 1],
                [36, 1],
                [36, 1],
                [36, 1],
                [36, 1],
                [36, 3],
                [47, 1],
                [49, 3],
                [35, 1],
                [35, 1],
                [35, 1],
                [41, 2],
                [30, 1],
                [53, 3],
                [53, 1],
                [6, 0],
                [6, 2],
                [20, 0],
                [20, 1],
                [23, 0],
                [23, 1],
                [37, 0],
                [37, 1],
                [38, 0],
                [38, 1],
                [39, 0],
                [39, 2],
                [40, 0],
                [40, 1],
                [48, 1],
                [48, 2],
              ],
              performAction: function (a, b, c, d, e, f) {
                var g = f.length - 1;
                switch (e) {
                  case 1:
                    return d.prepareProgram(f[g - 1].statements, !0), f[g - 1];
                  case 2:
                    this.$ = new d.ProgramNode(d.prepareProgram(f[g]), {}, this._$);
                    break;
                  case 3:
                    this.$ = f[g];
                    break;
                  case 4:
                    this.$ = f[g];
                    break;
                  case 5:
                    this.$ = f[g];
                    break;
                  case 6:
                    this.$ = f[g];
                    break;
                  case 7:
                    this.$ = new d.ContentNode(f[g], this._$);
                    break;
                  case 8:
                    this.$ = new d.CommentNode(f[g], this._$);
                    break;
                  case 9:
                    this.$ = new d.RawBlockNode(f[g - 2], f[g - 1], f[g], this._$);
                    break;
                  case 10:
                    this.$ = new d.MustacheNode(f[g - 1], null, '', '', this._$);
                    break;
                  case 11:
                    this.$ = d.prepareBlock(f[g - 3], f[g - 2], f[g - 1], f[g], !1, this._$);
                    break;
                  case 12:
                    this.$ = d.prepareBlock(f[g - 3], f[g - 2], f[g - 1], f[g], !0, this._$);
                    break;
                  case 13:
                    this.$ = new d.MustacheNode(
                      f[g - 1],
                      null,
                      f[g - 2],
                      d.stripFlags(f[g - 2], f[g]),
                      this._$
                    );
                    break;
                  case 14:
                    this.$ = new d.MustacheNode(
                      f[g - 1],
                      null,
                      f[g - 2],
                      d.stripFlags(f[g - 2], f[g]),
                      this._$
                    );
                    break;
                  case 15:
                    this.$ = { strip: d.stripFlags(f[g - 1], f[g - 1]), program: f[g] };
                    break;
                  case 16:
                    this.$ = { path: f[g - 1], strip: d.stripFlags(f[g - 2], f[g]) };
                    break;
                  case 17:
                    this.$ = new d.MustacheNode(
                      f[g - 1],
                      null,
                      f[g - 2],
                      d.stripFlags(f[g - 2], f[g]),
                      this._$
                    );
                    break;
                  case 18:
                    this.$ = new d.MustacheNode(
                      f[g - 1],
                      null,
                      f[g - 2],
                      d.stripFlags(f[g - 2], f[g]),
                      this._$
                    );
                    break;
                  case 19:
                    this.$ = new d.PartialNode(
                      f[g - 3],
                      f[g - 2],
                      f[g - 1],
                      d.stripFlags(f[g - 4], f[g]),
                      this._$
                    );
                    break;
                  case 20:
                    this.$ = new d.PartialNode(
                      f[g - 2],
                      void 0,
                      f[g - 1],
                      d.stripFlags(f[g - 3], f[g]),
                      this._$
                    );
                    break;
                  case 21:
                    this.$ = new d.SexprNode([f[g - 2]].concat(f[g - 1]), f[g], this._$);
                    break;
                  case 22:
                    this.$ = new d.SexprNode([f[g]], null, this._$);
                    break;
                  case 23:
                    this.$ = f[g];
                    break;
                  case 24:
                    this.$ = new d.StringNode(f[g], this._$);
                    break;
                  case 25:
                    this.$ = new d.NumberNode(f[g], this._$);
                    break;
                  case 26:
                    this.$ = new d.BooleanNode(f[g], this._$);
                    break;
                  case 27:
                    this.$ = f[g];
                    break;
                  case 28:
                    (f[g - 1].isHelper = !0), (this.$ = f[g - 1]);
                    break;
                  case 29:
                    this.$ = new d.HashNode(f[g], this._$);
                    break;
                  case 30:
                    this.$ = [f[g - 2], f[g]];
                    break;
                  case 31:
                    this.$ = new d.PartialNameNode(f[g], this._$);
                    break;
                  case 32:
                    this.$ = new d.PartialNameNode(new d.StringNode(f[g], this._$), this._$);
                    break;
                  case 33:
                    this.$ = new d.PartialNameNode(new d.NumberNode(f[g], this._$));
                    break;
                  case 34:
                    this.$ = new d.DataNode(f[g], this._$);
                    break;
                  case 35:
                    this.$ = new d.IdNode(f[g], this._$);
                    break;
                  case 36:
                    f[g - 2].push({ part: f[g], separator: f[g - 1] }), (this.$ = f[g - 2]);
                    break;
                  case 37:
                    this.$ = [{ part: f[g] }];
                    break;
                  case 38:
                    this.$ = [];
                    break;
                  case 39:
                    f[g - 1].push(f[g]);
                    break;
                  case 48:
                    this.$ = [];
                    break;
                  case 49:
                    f[g - 1].push(f[g]);
                    break;
                  case 52:
                    this.$ = [f[g]];
                    break;
                  case 53:
                    f[g - 1].push(f[g]);
                }
              },
              table: [
                {
                  3: 1,
                  4: 2,
                  5: [2, 38],
                  6: 3,
                  12: [2, 38],
                  13: [2, 38],
                  16: [2, 38],
                  24: [2, 38],
                  26: [2, 38],
                  31: [2, 38],
                  32: [2, 38],
                  34: [2, 38],
                },
                { 1: [3] },
                { 5: [1, 4] },
                {
                  5: [2, 2],
                  7: 5,
                  8: 6,
                  9: 7,
                  10: 8,
                  11: 9,
                  12: [1, 10],
                  13: [1, 11],
                  14: 16,
                  16: [1, 20],
                  19: 14,
                  22: 15,
                  24: [1, 18],
                  26: [1, 19],
                  28: [2, 2],
                  29: [2, 2],
                  31: [1, 12],
                  32: [1, 13],
                  34: [1, 17],
                },
                { 1: [2, 1] },
                {
                  5: [2, 39],
                  12: [2, 39],
                  13: [2, 39],
                  16: [2, 39],
                  24: [2, 39],
                  26: [2, 39],
                  28: [2, 39],
                  29: [2, 39],
                  31: [2, 39],
                  32: [2, 39],
                  34: [2, 39],
                },
                {
                  5: [2, 3],
                  12: [2, 3],
                  13: [2, 3],
                  16: [2, 3],
                  24: [2, 3],
                  26: [2, 3],
                  28: [2, 3],
                  29: [2, 3],
                  31: [2, 3],
                  32: [2, 3],
                  34: [2, 3],
                },
                {
                  5: [2, 4],
                  12: [2, 4],
                  13: [2, 4],
                  16: [2, 4],
                  24: [2, 4],
                  26: [2, 4],
                  28: [2, 4],
                  29: [2, 4],
                  31: [2, 4],
                  32: [2, 4],
                  34: [2, 4],
                },
                {
                  5: [2, 5],
                  12: [2, 5],
                  13: [2, 5],
                  16: [2, 5],
                  24: [2, 5],
                  26: [2, 5],
                  28: [2, 5],
                  29: [2, 5],
                  31: [2, 5],
                  32: [2, 5],
                  34: [2, 5],
                },
                {
                  5: [2, 6],
                  12: [2, 6],
                  13: [2, 6],
                  16: [2, 6],
                  24: [2, 6],
                  26: [2, 6],
                  28: [2, 6],
                  29: [2, 6],
                  31: [2, 6],
                  32: [2, 6],
                  34: [2, 6],
                },
                {
                  5: [2, 7],
                  12: [2, 7],
                  13: [2, 7],
                  16: [2, 7],
                  24: [2, 7],
                  26: [2, 7],
                  28: [2, 7],
                  29: [2, 7],
                  31: [2, 7],
                  32: [2, 7],
                  34: [2, 7],
                },
                {
                  5: [2, 8],
                  12: [2, 8],
                  13: [2, 8],
                  16: [2, 8],
                  24: [2, 8],
                  26: [2, 8],
                  28: [2, 8],
                  29: [2, 8],
                  31: [2, 8],
                  32: [2, 8],
                  34: [2, 8],
                },
                { 17: 21, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                { 17: 27, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                {
                  4: 28,
                  6: 3,
                  12: [2, 38],
                  13: [2, 38],
                  16: [2, 38],
                  24: [2, 38],
                  26: [2, 38],
                  28: [2, 38],
                  29: [2, 38],
                  31: [2, 38],
                  32: [2, 38],
                  34: [2, 38],
                },
                {
                  4: 29,
                  6: 3,
                  12: [2, 38],
                  13: [2, 38],
                  16: [2, 38],
                  24: [2, 38],
                  26: [2, 38],
                  28: [2, 38],
                  29: [2, 38],
                  31: [2, 38],
                  32: [2, 38],
                  34: [2, 38],
                },
                { 12: [1, 30] },
                { 30: 32, 35: 31, 42: [1, 33], 43: [1, 34], 50: [1, 26], 53: 24 },
                { 17: 35, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                { 17: 36, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                { 17: 37, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                { 25: [1, 38] },
                {
                  18: [2, 48],
                  25: [2, 48],
                  33: [2, 48],
                  39: 39,
                  42: [2, 48],
                  43: [2, 48],
                  44: [2, 48],
                  45: [2, 48],
                  46: [2, 48],
                  50: [2, 48],
                  52: [2, 48],
                },
                { 18: [2, 22], 25: [2, 22], 33: [2, 22], 46: [2, 22] },
                {
                  18: [2, 35],
                  25: [2, 35],
                  33: [2, 35],
                  42: [2, 35],
                  43: [2, 35],
                  44: [2, 35],
                  45: [2, 35],
                  46: [2, 35],
                  50: [2, 35],
                  52: [2, 35],
                  54: [1, 40],
                },
                { 30: 41, 50: [1, 26], 53: 24 },
                {
                  18: [2, 37],
                  25: [2, 37],
                  33: [2, 37],
                  42: [2, 37],
                  43: [2, 37],
                  44: [2, 37],
                  45: [2, 37],
                  46: [2, 37],
                  50: [2, 37],
                  52: [2, 37],
                  54: [2, 37],
                },
                { 33: [1, 42] },
                { 20: 43, 27: 44, 28: [1, 45], 29: [2, 40] },
                { 23: 46, 27: 47, 28: [1, 45], 29: [2, 42] },
                { 15: [1, 48] },
                {
                  25: [2, 46],
                  30: 51,
                  36: 49,
                  38: 50,
                  41: 55,
                  42: [1, 52],
                  43: [1, 53],
                  44: [1, 54],
                  45: [1, 56],
                  47: 57,
                  48: 58,
                  49: 60,
                  50: [1, 59],
                  52: [1, 25],
                  53: 24,
                },
                {
                  25: [2, 31],
                  42: [2, 31],
                  43: [2, 31],
                  44: [2, 31],
                  45: [2, 31],
                  50: [2, 31],
                  52: [2, 31],
                },
                {
                  25: [2, 32],
                  42: [2, 32],
                  43: [2, 32],
                  44: [2, 32],
                  45: [2, 32],
                  50: [2, 32],
                  52: [2, 32],
                },
                {
                  25: [2, 33],
                  42: [2, 33],
                  43: [2, 33],
                  44: [2, 33],
                  45: [2, 33],
                  50: [2, 33],
                  52: [2, 33],
                },
                { 25: [1, 61] },
                { 25: [1, 62] },
                { 18: [1, 63] },
                {
                  5: [2, 17],
                  12: [2, 17],
                  13: [2, 17],
                  16: [2, 17],
                  24: [2, 17],
                  26: [2, 17],
                  28: [2, 17],
                  29: [2, 17],
                  31: [2, 17],
                  32: [2, 17],
                  34: [2, 17],
                },
                {
                  18: [2, 50],
                  25: [2, 50],
                  30: 51,
                  33: [2, 50],
                  36: 65,
                  40: 64,
                  41: 55,
                  42: [1, 52],
                  43: [1, 53],
                  44: [1, 54],
                  45: [1, 56],
                  46: [2, 50],
                  47: 66,
                  48: 58,
                  49: 60,
                  50: [1, 59],
                  52: [1, 25],
                  53: 24,
                },
                { 50: [1, 67] },
                {
                  18: [2, 34],
                  25: [2, 34],
                  33: [2, 34],
                  42: [2, 34],
                  43: [2, 34],
                  44: [2, 34],
                  45: [2, 34],
                  46: [2, 34],
                  50: [2, 34],
                  52: [2, 34],
                },
                {
                  5: [2, 18],
                  12: [2, 18],
                  13: [2, 18],
                  16: [2, 18],
                  24: [2, 18],
                  26: [2, 18],
                  28: [2, 18],
                  29: [2, 18],
                  31: [2, 18],
                  32: [2, 18],
                  34: [2, 18],
                },
                { 21: 68, 29: [1, 69] },
                { 29: [2, 41] },
                {
                  4: 70,
                  6: 3,
                  12: [2, 38],
                  13: [2, 38],
                  16: [2, 38],
                  24: [2, 38],
                  26: [2, 38],
                  29: [2, 38],
                  31: [2, 38],
                  32: [2, 38],
                  34: [2, 38],
                },
                { 21: 71, 29: [1, 69] },
                { 29: [2, 43] },
                {
                  5: [2, 9],
                  12: [2, 9],
                  13: [2, 9],
                  16: [2, 9],
                  24: [2, 9],
                  26: [2, 9],
                  28: [2, 9],
                  29: [2, 9],
                  31: [2, 9],
                  32: [2, 9],
                  34: [2, 9],
                },
                { 25: [2, 44], 37: 72, 47: 73, 48: 58, 49: 60, 50: [1, 74] },
                { 25: [1, 75] },
                {
                  18: [2, 23],
                  25: [2, 23],
                  33: [2, 23],
                  42: [2, 23],
                  43: [2, 23],
                  44: [2, 23],
                  45: [2, 23],
                  46: [2, 23],
                  50: [2, 23],
                  52: [2, 23],
                },
                {
                  18: [2, 24],
                  25: [2, 24],
                  33: [2, 24],
                  42: [2, 24],
                  43: [2, 24],
                  44: [2, 24],
                  45: [2, 24],
                  46: [2, 24],
                  50: [2, 24],
                  52: [2, 24],
                },
                {
                  18: [2, 25],
                  25: [2, 25],
                  33: [2, 25],
                  42: [2, 25],
                  43: [2, 25],
                  44: [2, 25],
                  45: [2, 25],
                  46: [2, 25],
                  50: [2, 25],
                  52: [2, 25],
                },
                {
                  18: [2, 26],
                  25: [2, 26],
                  33: [2, 26],
                  42: [2, 26],
                  43: [2, 26],
                  44: [2, 26],
                  45: [2, 26],
                  46: [2, 26],
                  50: [2, 26],
                  52: [2, 26],
                },
                {
                  18: [2, 27],
                  25: [2, 27],
                  33: [2, 27],
                  42: [2, 27],
                  43: [2, 27],
                  44: [2, 27],
                  45: [2, 27],
                  46: [2, 27],
                  50: [2, 27],
                  52: [2, 27],
                },
                { 17: 76, 30: 22, 41: 23, 50: [1, 26], 52: [1, 25], 53: 24 },
                { 25: [2, 47] },
                { 18: [2, 29], 25: [2, 29], 33: [2, 29], 46: [2, 29], 49: 77, 50: [1, 74] },
                {
                  18: [2, 37],
                  25: [2, 37],
                  33: [2, 37],
                  42: [2, 37],
                  43: [2, 37],
                  44: [2, 37],
                  45: [2, 37],
                  46: [2, 37],
                  50: [2, 37],
                  51: [1, 78],
                  52: [2, 37],
                  54: [2, 37],
                },
                { 18: [2, 52], 25: [2, 52], 33: [2, 52], 46: [2, 52], 50: [2, 52] },
                {
                  12: [2, 13],
                  13: [2, 13],
                  16: [2, 13],
                  24: [2, 13],
                  26: [2, 13],
                  28: [2, 13],
                  29: [2, 13],
                  31: [2, 13],
                  32: [2, 13],
                  34: [2, 13],
                },
                {
                  12: [2, 14],
                  13: [2, 14],
                  16: [2, 14],
                  24: [2, 14],
                  26: [2, 14],
                  28: [2, 14],
                  29: [2, 14],
                  31: [2, 14],
                  32: [2, 14],
                  34: [2, 14],
                },
                { 12: [2, 10] },
                { 18: [2, 21], 25: [2, 21], 33: [2, 21], 46: [2, 21] },
                {
                  18: [2, 49],
                  25: [2, 49],
                  33: [2, 49],
                  42: [2, 49],
                  43: [2, 49],
                  44: [2, 49],
                  45: [2, 49],
                  46: [2, 49],
                  50: [2, 49],
                  52: [2, 49],
                },
                { 18: [2, 51], 25: [2, 51], 33: [2, 51], 46: [2, 51] },
                {
                  18: [2, 36],
                  25: [2, 36],
                  33: [2, 36],
                  42: [2, 36],
                  43: [2, 36],
                  44: [2, 36],
                  45: [2, 36],
                  46: [2, 36],
                  50: [2, 36],
                  52: [2, 36],
                  54: [2, 36],
                },
                {
                  5: [2, 11],
                  12: [2, 11],
                  13: [2, 11],
                  16: [2, 11],
                  24: [2, 11],
                  26: [2, 11],
                  28: [2, 11],
                  29: [2, 11],
                  31: [2, 11],
                  32: [2, 11],
                  34: [2, 11],
                },
                { 30: 79, 50: [1, 26], 53: 24 },
                { 29: [2, 15] },
                {
                  5: [2, 12],
                  12: [2, 12],
                  13: [2, 12],
                  16: [2, 12],
                  24: [2, 12],
                  26: [2, 12],
                  28: [2, 12],
                  29: [2, 12],
                  31: [2, 12],
                  32: [2, 12],
                  34: [2, 12],
                },
                { 25: [1, 80] },
                { 25: [2, 45] },
                { 51: [1, 78] },
                {
                  5: [2, 20],
                  12: [2, 20],
                  13: [2, 20],
                  16: [2, 20],
                  24: [2, 20],
                  26: [2, 20],
                  28: [2, 20],
                  29: [2, 20],
                  31: [2, 20],
                  32: [2, 20],
                  34: [2, 20],
                },
                { 46: [1, 81] },
                { 18: [2, 53], 25: [2, 53], 33: [2, 53], 46: [2, 53], 50: [2, 53] },
                {
                  30: 51,
                  36: 82,
                  41: 55,
                  42: [1, 52],
                  43: [1, 53],
                  44: [1, 54],
                  45: [1, 56],
                  50: [1, 26],
                  52: [1, 25],
                  53: 24,
                },
                { 25: [1, 83] },
                {
                  5: [2, 19],
                  12: [2, 19],
                  13: [2, 19],
                  16: [2, 19],
                  24: [2, 19],
                  26: [2, 19],
                  28: [2, 19],
                  29: [2, 19],
                  31: [2, 19],
                  32: [2, 19],
                  34: [2, 19],
                },
                {
                  18: [2, 28],
                  25: [2, 28],
                  33: [2, 28],
                  42: [2, 28],
                  43: [2, 28],
                  44: [2, 28],
                  45: [2, 28],
                  46: [2, 28],
                  50: [2, 28],
                  52: [2, 28],
                },
                { 18: [2, 30], 25: [2, 30], 33: [2, 30], 46: [2, 30], 50: [2, 30] },
                {
                  5: [2, 16],
                  12: [2, 16],
                  13: [2, 16],
                  16: [2, 16],
                  24: [2, 16],
                  26: [2, 16],
                  28: [2, 16],
                  29: [2, 16],
                  31: [2, 16],
                  32: [2, 16],
                  34: [2, 16],
                },
              ],
              defaultActions: {
                4: [2, 1],
                44: [2, 41],
                47: [2, 43],
                57: [2, 47],
                63: [2, 10],
                70: [2, 15],
                73: [2, 45],
              },
              parseError: function (a) {
                throw new Error(a);
              },
              parse: function (a) {
                function b() {
                  var a;
                  return (
                    (a = c.lexer.lex() || 1), 'number' != typeof a && (a = c.symbols_[a] || a), a
                  );
                }
                var c = this,
                  d = [0],
                  e = [null],
                  f = [],
                  g = this.table,
                  h = '',
                  i = 0,
                  j = 0,
                  k = 0;
                this.lexer.setInput(a),
                  (this.lexer.yy = this.yy),
                  (this.yy.lexer = this.lexer),
                  (this.yy.parser = this),
                  'undefined' == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                var l = this.lexer.yylloc;
                f.push(l);
                var m = this.lexer.options && this.lexer.options.ranges;
                'function' == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                for (var n, o, p, q, r, s, t, u, v, w = {}; ; ) {
                  if (
                    ((p = d[d.length - 1]),
                    this.defaultActions[p]
                      ? (q = this.defaultActions[p])
                      : ((null === n || 'undefined' == typeof n) && (n = b()),
                        (q = g[p] && g[p][n])),
                    'undefined' == typeof q || !q.length || !q[0])
                  ) {
                    var x = '';
                    if (!k) {
                      v = [];
                      for (s in g[p])
                        this.terminals_[s] && s > 2 && v.push("'" + this.terminals_[s] + "'");
                      (x = this.lexer.showPosition
                        ? 'Parse error on line ' +
                          (i + 1) +
                          ':\n' +
                          this.lexer.showPosition() +
                          '\nExpecting ' +
                          v.join(', ') +
                          ", got '" +
                          (this.terminals_[n] || n) +
                          "'"
                        : 'Parse error on line ' +
                          (i + 1) +
                          ': Unexpected ' +
                          (1 == n ? 'end of input' : "'" + (this.terminals_[n] || n) + "'")),
                        this.parseError(x, {
                          text: this.lexer.match,
                          token: this.terminals_[n] || n,
                          line: this.lexer.yylineno,
                          loc: l,
                          expected: v,
                        });
                    }
                  }
                  if (q[0] instanceof Array && q.length > 1)
                    throw new Error(
                      'Parse Error: multiple actions possible at state: ' + p + ', token: ' + n
                    );
                  switch (q[0]) {
                    case 1:
                      d.push(n),
                        e.push(this.lexer.yytext),
                        f.push(this.lexer.yylloc),
                        d.push(q[1]),
                        (n = null),
                        o
                          ? ((n = o), (o = null))
                          : ((j = this.lexer.yyleng),
                            (h = this.lexer.yytext),
                            (i = this.lexer.yylineno),
                            (l = this.lexer.yylloc),
                            k > 0 && k--);
                      break;
                    case 2:
                      if (
                        ((t = this.productions_[q[1]][1]),
                        (w.$ = e[e.length - t]),
                        (w._$ = {
                          first_line: f[f.length - (t || 1)].first_line,
                          last_line: f[f.length - 1].last_line,
                          first_column: f[f.length - (t || 1)].first_column,
                          last_column: f[f.length - 1].last_column,
                        }),
                        m &&
                          (w._$.range = [
                            f[f.length - (t || 1)].range[0],
                            f[f.length - 1].range[1],
                          ]),
                        (r = this.performAction.call(w, h, j, i, this.yy, q[1], e, f)),
                        'undefined' != typeof r)
                      )
                        return r;
                      t &&
                        ((d = d.slice(0, -1 * t * 2)),
                        (e = e.slice(0, -1 * t)),
                        (f = f.slice(0, -1 * t))),
                        d.push(this.productions_[q[1]][0]),
                        e.push(w.$),
                        f.push(w._$),
                        (u = g[d[d.length - 2]][d[d.length - 1]]),
                        d.push(u);
                      break;
                    case 3:
                      return !0;
                  }
                }
                return !0;
              },
            },
            c = (function () {
              var a = {
                EOF: 1,
                parseError: function (a, b) {
                  if (!this.yy.parser) throw new Error(a);
                  this.yy.parser.parseError(a, b);
                },
                setInput: function (a) {
                  return (
                    (this._input = a),
                    (this._more = this._less = this.done = !1),
                    (this.yylineno = this.yyleng = 0),
                    (this.yytext = this.matched = this.match = ''),
                    (this.conditionStack = ['INITIAL']),
                    (this.yylloc = {
                      first_line: 1,
                      first_column: 0,
                      last_line: 1,
                      last_column: 0,
                    }),
                    this.options.ranges && (this.yylloc.range = [0, 0]),
                    (this.offset = 0),
                    this
                  );
                },
                input: function () {
                  var a = this._input[0];
                  (this.yytext += a),
                    this.yyleng++,
                    this.offset++,
                    (this.match += a),
                    (this.matched += a);
                  var b = a.match(/(?:\r\n?|\n).*/g);
                  return (
                    b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++,
                    this.options.ranges && this.yylloc.range[1]++,
                    (this._input = this._input.slice(1)),
                    a
                  );
                },
                unput: function (a) {
                  var b = a.length,
                    c = a.split(/(?:\r\n?|\n)/g);
                  (this._input = a + this._input),
                    (this.yytext = this.yytext.substr(0, this.yytext.length - b - 1)),
                    (this.offset -= b);
                  var d = this.match.split(/(?:\r\n?|\n)/g);
                  (this.match = this.match.substr(0, this.match.length - 1)),
                    (this.matched = this.matched.substr(0, this.matched.length - 1)),
                    c.length - 1 && (this.yylineno -= c.length - 1);
                  var e = this.yylloc.range;
                  return (
                    (this.yylloc = {
                      first_line: this.yylloc.first_line,
                      last_line: this.yylineno + 1,
                      first_column: this.yylloc.first_column,
                      last_column: c
                        ? (c.length === d.length ? this.yylloc.first_column : 0) +
                          d[d.length - c.length].length -
                          c[0].length
                        : this.yylloc.first_column - b,
                    }),
                    this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - b]),
                    this
                  );
                },
                more: function () {
                  return (this._more = !0), this;
                },
                less: function (a) {
                  this.unput(this.match.slice(a));
                },
                pastInput: function () {
                  var a = this.matched.substr(0, this.matched.length - this.match.length);
                  return (a.length > 20 ? '...' : '') + a.substr(-20).replace(/\n/g, '');
                },
                upcomingInput: function () {
                  var a = this.match;
                  return (
                    a.length < 20 && (a += this._input.substr(0, 20 - a.length)),
                    (a.substr(0, 20) + (a.length > 20 ? '...' : '')).replace(/\n/g, '')
                  );
                },
                showPosition: function () {
                  var a = this.pastInput(),
                    b = new Array(a.length + 1).join('-');
                  return a + this.upcomingInput() + '\n' + b + '^';
                },
                next: function () {
                  if (this.done) return this.EOF;
                  this._input || (this.done = !0);
                  var a, b, c, d, e;
                  this._more || ((this.yytext = ''), (this.match = ''));
                  for (
                    var f = this._currentRules(), g = 0;
                    g < f.length &&
                    ((c = this._input.match(this.rules[f[g]])),
                    !c ||
                      (b && !(c[0].length > b[0].length)) ||
                      ((b = c), (d = g), this.options.flex));
                    g++
                  );
                  return b
                    ? ((e = b[0].match(/(?:\r\n?|\n).*/g)),
                      e && (this.yylineno += e.length),
                      (this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: e
                          ? e[e.length - 1].length - e[e.length - 1].match(/\r?\n?/)[0].length
                          : this.yylloc.last_column + b[0].length,
                      }),
                      (this.yytext += b[0]),
                      (this.match += b[0]),
                      (this.matches = b),
                      (this.yyleng = this.yytext.length),
                      this.options.ranges &&
                        (this.yylloc.range = [this.offset, (this.offset += this.yyleng)]),
                      (this._more = !1),
                      (this._input = this._input.slice(b[0].length)),
                      (this.matched += b[0]),
                      (a = this.performAction.call(
                        this,
                        this.yy,
                        this,
                        f[d],
                        this.conditionStack[this.conditionStack.length - 1]
                      )),
                      this.done && this._input && (this.done = !1),
                      a ? a : void 0)
                    : '' === this._input
                    ? this.EOF
                    : this.parseError(
                        'Lexical error on line ' +
                          (this.yylineno + 1) +
                          '. Unrecognized text.\n' +
                          this.showPosition(),
                        { text: '', token: null, line: this.yylineno }
                      );
                },
                lex: function () {
                  var a = this.next();
                  return 'undefined' != typeof a ? a : this.lex();
                },
                begin: function (a) {
                  this.conditionStack.push(a);
                },
                popState: function () {
                  return this.conditionStack.pop();
                },
                _currentRules: function () {
                  return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                },
                topState: function () {
                  return this.conditionStack[this.conditionStack.length - 2];
                },
                pushState: function (a) {
                  this.begin(a);
                },
              };
              return (
                (a.options = {}),
                (a.performAction = function (a, b, c, d) {
                  function e(a, c) {
                    return (b.yytext = b.yytext.substr(a, b.yyleng - c));
                  }
                  switch (c) {
                    case 0:
                      if (
                        ('\\\\' === b.yytext.slice(-2)
                          ? (e(0, 1), this.begin('mu'))
                          : '\\' === b.yytext.slice(-1)
                          ? (e(0, 1), this.begin('emu'))
                          : this.begin('mu'),
                        b.yytext)
                      )
                        return 12;
                      break;
                    case 1:
                      return 12;
                    case 2:
                      return this.popState(), 12;
                    case 3:
                      return (b.yytext = b.yytext.substr(5, b.yyleng - 9)), this.popState(), 15;
                    case 4:
                      return 12;
                    case 5:
                      return e(0, 4), this.popState(), 13;
                    case 6:
                      return 45;
                    case 7:
                      return 46;
                    case 8:
                      return 16;
                    case 9:
                      return this.popState(), this.begin('raw'), 18;
                    case 10:
                      return 34;
                    case 11:
                      return 24;
                    case 12:
                      return 29;
                    case 13:
                      return this.popState(), 28;
                    case 14:
                      return this.popState(), 28;
                    case 15:
                      return 26;
                    case 16:
                      return 26;
                    case 17:
                      return 32;
                    case 18:
                      return 31;
                    case 19:
                      this.popState(), this.begin('com');
                      break;
                    case 20:
                      return e(3, 5), this.popState(), 13;
                    case 21:
                      return 31;
                    case 22:
                      return 51;
                    case 23:
                      return 50;
                    case 24:
                      return 50;
                    case 25:
                      return 54;
                    case 26:
                      break;
                    case 27:
                      return this.popState(), 33;
                    case 28:
                      return this.popState(), 25;
                    case 29:
                      return (b.yytext = e(1, 2).replace(/\\"/g, '"')), 42;
                    case 30:
                      return (b.yytext = e(1, 2).replace(/\\'/g, "'")), 42;
                    case 31:
                      return 52;
                    case 32:
                      return 44;
                    case 33:
                      return 44;
                    case 34:
                      return 43;
                    case 35:
                      return 50;
                    case 36:
                      return (b.yytext = e(1, 2)), 50;
                    case 37:
                      return 'INVALID';
                    case 38:
                      return 5;
                  }
                }),
                (a.rules = [
                  /^(?:[^\x00]*?(?=(\{\{)))/,
                  /^(?:[^\x00]+)/,
                  /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
                  /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,
                  /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,
                  /^(?:[\s\S]*?--\}\})/,
                  /^(?:\()/,
                  /^(?:\))/,
                  /^(?:\{\{\{\{)/,
                  /^(?:\}\}\}\})/,
                  /^(?:\{\{(~)?>)/,
                  /^(?:\{\{(~)?#)/,
                  /^(?:\{\{(~)?\/)/,
                  /^(?:\{\{(~)?\^\s*(~)?\}\})/,
                  /^(?:\{\{(~)?\s*else\s*(~)?\}\})/,
                  /^(?:\{\{(~)?\^)/,
                  /^(?:\{\{(~)?\s*else\b)/,
                  /^(?:\{\{(~)?\{)/,
                  /^(?:\{\{(~)?&)/,
                  /^(?:\{\{!--)/,
                  /^(?:\{\{![\s\S]*?\}\})/,
                  /^(?:\{\{(~)?)/,
                  /^(?:=)/,
                  /^(?:\.\.)/,
                  /^(?:\.(?=([=~}\s\/.)])))/,
                  /^(?:[\/.])/,
                  /^(?:\s+)/,
                  /^(?:\}(~)?\}\})/,
                  /^(?:(~)?\}\})/,
                  /^(?:"(\\["]|[^"])*")/,
                  /^(?:'(\\[']|[^'])*')/,
                  /^(?:@)/,
                  /^(?:true(?=([~}\s)])))/,
                  /^(?:false(?=([~}\s)])))/,
                  /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,
                  /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,
                  /^(?:\[[^\]]*\])/,
                  /^(?:.)/,
                  /^(?:$)/,
                ]),
                (a.conditions = {
                  mu: {
                    rules: [
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                      21,
                      22,
                      23,
                      24,
                      25,
                      26,
                      27,
                      28,
                      29,
                      30,
                      31,
                      32,
                      33,
                      34,
                      35,
                      36,
                      37,
                      38,
                    ],
                    inclusive: !1,
                  },
                  emu: { rules: [2], inclusive: !1 },
                  com: { rules: [5], inclusive: !1 },
                  raw: { rules: [3, 4], inclusive: !1 },
                  INITIAL: { rules: [0, 1, 38], inclusive: !0 },
                }),
                a
              );
            })();
          return (b.lexer = c), (a.prototype = b), (b.Parser = a), new a();
        })();
      return (a = b);
    })(),
    i = (function (a) {
      'use strict';
      function b(a, b) {
        return { left: '~' === a.charAt(2), right: '~' === b.charAt(b.length - 3) };
      }
      function c(a, b, c, d, i, k) {
        if (a.sexpr.id.original !== d.path.original)
          throw new j(a.sexpr.id.original + " doesn't match " + d.path.original, a);
        var l = c && c.program,
          m = {
            left: a.strip.left,
            right: d.strip.right,
            openStandalone: f(b.statements),
            closeStandalone: e((l || b).statements),
          };
        if ((a.strip.right && g(b.statements, null, !0), l)) {
          var n = c.strip;
          n.left && h(b.statements, null, !0),
            n.right && g(l.statements, null, !0),
            d.strip.left && h(l.statements, null, !0),
            e(b.statements) && f(l.statements) && (h(b.statements), g(l.statements));
        } else d.strip.left && h(b.statements, null, !0);
        return i ? new this.BlockNode(a, l, b, m, k) : new this.BlockNode(a, b, l, m, k);
      }
      function d(a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
          var i = a[c],
            j = i.strip;
          if (j) {
            var k = e(a, c, b, 'partial' === i.type),
              l = f(a, c, b),
              m = j.openStandalone && k,
              n = j.closeStandalone && l,
              o = j.inlineStandalone && k && l;
            j.right && g(a, c, !0),
              j.left && h(a, c, !0),
              o &&
                (g(a, c),
                h(a, c) &&
                  'partial' === i.type &&
                  (i.indent = /([ \t]+$)/.exec(a[c - 1].original) ? RegExp.$1 : '')),
              m && (g((i.program || i.inverse).statements), h(a, c)),
              n && (g(a, c), h((i.inverse || i.program).statements));
          }
        }
        return a;
      }
      function e(a, b, c) {
        void 0 === b && (b = a.length);
        var d = a[b - 1],
          e = a[b - 2];
        return d
          ? 'content' === d.type
            ? (e || !c ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(d.original)
            : void 0
          : c;
      }
      function f(a, b, c) {
        void 0 === b && (b = -1);
        var d = a[b + 1],
          e = a[b + 2];
        return d
          ? 'content' === d.type
            ? (e || !c ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(d.original)
            : void 0
          : c;
      }
      function g(a, b, c) {
        var d = a[null == b ? 0 : b + 1];
        if (d && 'content' === d.type && (c || !d.rightStripped)) {
          var e = d.string;
          (d.string = d.string.replace(c ? /^\s+/ : /^[ \t]*\r?\n?/, '')),
            (d.rightStripped = d.string !== e);
        }
      }
      function h(a, b, c) {
        var d = a[null == b ? a.length - 1 : b - 1];
        if (d && 'content' === d.type && (c || !d.leftStripped)) {
          var e = d.string;
          return (
            (d.string = d.string.replace(c ? /\s+$/ : /[ \t]+$/, '')),
            (d.leftStripped = d.string !== e),
            d.leftStripped
          );
        }
      }
      var i = {},
        j = a;
      return (i.stripFlags = b), (i.prepareBlock = c), (i.prepareProgram = d), i;
    })(c),
    j = (function (a, b, c, d) {
      'use strict';
      function e(a) {
        return a.constructor === h.ProgramNode ? a : ((g.yy = k), g.parse(a));
      }
      var f = {},
        g = a,
        h = b,
        i = c,
        j = d.extend;
      f.parser = g;
      var k = {};
      return j(k, i, h), (f.parse = e), f;
    })(h, g, i, b),
    k = (function (a, b) {
      'use strict';
      function c() {}
      function d(a, b, c) {
        if (null == a || ('string' != typeof a && a.constructor !== c.AST.ProgramNode))
          throw new h(
            'You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + a
          );
        (b = b || {}), 'data' in b || (b.data = !0), b.compat && (b.useDepths = !0);
        var d = c.parse(a),
          e = new c.Compiler().compile(d, b);
        return new c.JavaScriptCompiler().compile(e, b);
      }
      function e(a, b, c) {
        function d() {
          var d = c.parse(a),
            e = new c.Compiler().compile(d, b),
            f = new c.JavaScriptCompiler().compile(e, b, void 0, !0);
          return c.template(f);
        }
        if (null == a || ('string' != typeof a && a.constructor !== c.AST.ProgramNode))
          throw new h(
            'You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + a
          );
        (b = b || {}), 'data' in b || (b.data = !0), b.compat && (b.useDepths = !0);
        var e,
          f = function (a, b) {
            return e || (e = d()), e.call(this, a, b);
          };
        return (
          (f._setup = function (a) {
            return e || (e = d()), e._setup(a);
          }),
          (f._child = function (a, b, c) {
            return e || (e = d()), e._child(a, b, c);
          }),
          f
        );
      }
      function f(a, b) {
        if (a === b) return !0;
        if (i(a) && i(b) && a.length === b.length) {
          for (var c = 0; c < a.length; c++) if (!f(a[c], b[c])) return !1;
          return !0;
        }
      }
      var g = {},
        h = a,
        i = b.isArray,
        j = [].slice;
      return (
        (g.Compiler = c),
        (c.prototype = {
          compiler: c,
          equals: function (a) {
            var b = this.opcodes.length;
            if (a.opcodes.length !== b) return !1;
            for (var c = 0; b > c; c++) {
              var d = this.opcodes[c],
                e = a.opcodes[c];
              if (d.opcode !== e.opcode || !f(d.args, e.args)) return !1;
            }
            for (b = this.children.length, c = 0; b > c; c++)
              if (!this.children[c].equals(a.children[c])) return !1;
            return !0;
          },
          guid: 0,
          compile: function (a, b) {
            (this.opcodes = []),
              (this.children = []),
              (this.depths = { list: [] }),
              (this.options = b),
              (this.stringParams = b.stringParams),
              (this.trackIds = b.trackIds);
            var c = this.options.knownHelpers;
            if (
              ((this.options.knownHelpers = {
                helperMissing: !0,
                blockHelperMissing: !0,
                each: !0,
                if: !0,
                unless: !0,
                with: !0,
                log: !0,
                lookup: !0,
              }),
              c)
            )
              for (var d in c) this.options.knownHelpers[d] = c[d];
            return this.accept(a);
          },
          accept: function (a) {
            return this[a.type](a);
          },
          program: function (a) {
            for (var b = a.statements, c = 0, d = b.length; d > c; c++) this.accept(b[c]);
            return (
              (this.isSimple = 1 === d),
              (this.depths.list = this.depths.list.sort(function (a, b) {
                return a - b;
              })),
              this
            );
          },
          compileProgram: function (a) {
            var b,
              c = new this.compiler().compile(a, this.options),
              d = this.guid++;
            (this.usePartial = this.usePartial || c.usePartial), (this.children[d] = c);
            for (var e = 0, f = c.depths.list.length; f > e; e++)
              (b = c.depths.list[e]), 2 > b || this.addDepth(b - 1);
            return d;
          },
          block: function (a) {
            var b = a.mustache,
              c = a.program,
              d = a.inverse;
            c && (c = this.compileProgram(c)), d && (d = this.compileProgram(d));
            var e = b.sexpr,
              f = this.classifySexpr(e);
            'helper' === f
              ? this.helperSexpr(e, c, d)
              : 'simple' === f
              ? (this.simpleSexpr(e),
                this.opcode('pushProgram', c),
                this.opcode('pushProgram', d),
                this.opcode('emptyHash'),
                this.opcode('blockValue', e.id.original))
              : (this.ambiguousSexpr(e, c, d),
                this.opcode('pushProgram', c),
                this.opcode('pushProgram', d),
                this.opcode('emptyHash'),
                this.opcode('ambiguousBlockValue')),
              this.opcode('append');
          },
          hash: function (a) {
            var b,
              c,
              d = a.pairs;
            for (this.opcode('pushHash'), b = 0, c = d.length; c > b; b++) this.pushParam(d[b][1]);
            for (; b--; ) this.opcode('assignToHash', d[b][0]);
            this.opcode('popHash');
          },
          partial: function (a) {
            var b = a.partialName;
            (this.usePartial = !0),
              a.hash ? this.accept(a.hash) : this.opcode('push', 'undefined'),
              a.context
                ? this.accept(a.context)
                : (this.opcode('getContext', 0), this.opcode('pushContext')),
              this.opcode('invokePartial', b.name, a.indent || ''),
              this.opcode('append');
          },
          content: function (a) {
            a.string && this.opcode('appendContent', a.string);
          },
          mustache: function (a) {
            this.sexpr(a.sexpr),
              a.escaped && !this.options.noEscape
                ? this.opcode('appendEscaped')
                : this.opcode('append');
          },
          ambiguousSexpr: function (a, b, c) {
            var d = a.id,
              e = d.parts[0],
              f = null != b || null != c;
            this.opcode('getContext', d.depth),
              this.opcode('pushProgram', b),
              this.opcode('pushProgram', c),
              this.ID(d),
              this.opcode('invokeAmbiguous', e, f);
          },
          simpleSexpr: function (a) {
            var b = a.id;
            'DATA' === b.type
              ? this.DATA(b)
              : b.parts.length
              ? this.ID(b)
              : (this.addDepth(b.depth),
                this.opcode('getContext', b.depth),
                this.opcode('pushContext')),
              this.opcode('resolvePossibleLambda');
          },
          helperSexpr: function (a, b, c) {
            var d = this.setupFullMustacheParams(a, b, c),
              e = a.id,
              f = e.parts[0];
            if (this.options.knownHelpers[f]) this.opcode('invokeKnownHelper', d.length, f);
            else {
              if (this.options.knownHelpersOnly)
                throw new h('You specified knownHelpersOnly, but used the unknown helper ' + f, a);
              (e.falsy = !0),
                this.ID(e),
                this.opcode('invokeHelper', d.length, e.original, e.isSimple);
            }
          },
          sexpr: function (a) {
            var b = this.classifySexpr(a);
            'simple' === b
              ? this.simpleSexpr(a)
              : 'helper' === b
              ? this.helperSexpr(a)
              : this.ambiguousSexpr(a);
          },
          ID: function (a) {
            this.addDepth(a.depth), this.opcode('getContext', a.depth);
            var b = a.parts[0];
            b
              ? this.opcode('lookupOnContext', a.parts, a.falsy, a.isScoped)
              : this.opcode('pushContext');
          },
          DATA: function (a) {
            (this.options.data = !0), this.opcode('lookupData', a.id.depth, a.id.parts);
          },
          STRING: function (a) {
            this.opcode('pushString', a.string);
          },
          NUMBER: function (a) {
            this.opcode('pushLiteral', a.number);
          },
          BOOLEAN: function (a) {
            this.opcode('pushLiteral', a.bool);
          },
          comment: function () {},
          opcode: function (a) {
            this.opcodes.push({ opcode: a, args: j.call(arguments, 1) });
          },
          addDepth: function (a) {
            0 !== a && (this.depths[a] || ((this.depths[a] = !0), this.depths.list.push(a)));
          },
          classifySexpr: function (a) {
            var b = a.isHelper,
              c = a.eligibleHelper,
              d = this.options;
            if (c && !b) {
              var e = a.id.parts[0];
              d.knownHelpers[e] ? (b = !0) : d.knownHelpersOnly && (c = !1);
            }
            return b ? 'helper' : c ? 'ambiguous' : 'simple';
          },
          pushParams: function (a) {
            for (var b = 0, c = a.length; c > b; b++) this.pushParam(a[b]);
          },
          pushParam: function (a) {
            this.stringParams
              ? (a.depth && this.addDepth(a.depth),
                this.opcode('getContext', a.depth || 0),
                this.opcode('pushStringParam', a.stringModeValue, a.type),
                'sexpr' === a.type && this.sexpr(a))
              : (this.trackIds && this.opcode('pushId', a.type, a.idName || a.stringModeValue),
                this.accept(a));
          },
          setupFullMustacheParams: function (a, b, c) {
            var d = a.params;
            return (
              this.pushParams(d),
              this.opcode('pushProgram', b),
              this.opcode('pushProgram', c),
              a.hash ? this.hash(a.hash) : this.opcode('emptyHash'),
              d
            );
          },
        }),
        (g.precompile = d),
        (g.compile = e),
        g
      );
    })(c, b),
    l = (function (a, b) {
      'use strict';
      function c(a) {
        this.value = a;
      }
      function d() {}
      var e,
        f = a.COMPILER_REVISION,
        g = a.REVISION_CHANGES,
        h = b;
      d.prototype = {
        nameLookup: function (a, b) {
          return d.isValidJavaScriptVariableName(b) ? a + '.' + b : a + "['" + b + "']";
        },
        depthedLookup: function (a) {
          return (this.aliases.lookup = 'this.lookup'), 'lookup(depths, "' + a + '")';
        },
        compilerInfo: function () {
          var a = f,
            b = g[a];
          return [a, b];
        },
        appendToBuffer: function (a) {
          return this.environment.isSimple
            ? 'return ' + a + ';'
            : {
                appendToBuffer: !0,
                content: a,
                toString: function () {
                  return 'buffer += ' + a + ';';
                },
              };
        },
        initializeBuffer: function () {
          return this.quotedString('');
        },
        namespace: 'Handlebars',
        compile: function (a, b, c, d) {
          (this.environment = a),
            (this.options = b),
            (this.stringParams = this.options.stringParams),
            (this.trackIds = this.options.trackIds),
            (this.precompile = !d),
            (this.name = this.environment.name),
            (this.isChild = !!c),
            (this.context = c || { programs: [], environments: [] }),
            this.preamble(),
            (this.stackSlot = 0),
            (this.stackVars = []),
            (this.aliases = {}),
            (this.registers = { list: [] }),
            (this.hashes = []),
            (this.compileStack = []),
            (this.inlineStack = []),
            this.compileChildren(a, b),
            (this.useDepths = this.useDepths || a.depths.list.length || this.options.compat);
          var e,
            f,
            g,
            i = a.opcodes;
          for (f = 0, g = i.length; g > f; f++) (e = i[f]), this[e.opcode].apply(this, e.args);
          if (
            (this.pushSource(''),
            this.stackSlot || this.inlineStack.length || this.compileStack.length)
          )
            throw new h('Compile completed with content left on stack');
          var j = this.createFunctionContext(d);
          if (this.isChild) return j;
          var k = { compiler: this.compilerInfo(), main: j },
            l = this.context.programs;
          for (f = 0, g = l.length; g > f; f++) l[f] && (k[f] = l[f]);
          return (
            this.environment.usePartial && (k.usePartial = !0),
            this.options.data && (k.useData = !0),
            this.useDepths && (k.useDepths = !0),
            this.options.compat && (k.compat = !0),
            d || ((k.compiler = JSON.stringify(k.compiler)), (k = this.objectLiteral(k))),
            k
          );
        },
        preamble: function () {
          (this.lastContext = 0), (this.source = []);
        },
        createFunctionContext: function (a) {
          var b = '',
            c = this.stackVars.concat(this.registers.list);
          c.length > 0 && (b += ', ' + c.join(', '));
          for (var d in this.aliases)
            this.aliases.hasOwnProperty(d) && (b += ', ' + d + '=' + this.aliases[d]);
          var e = ['depth0', 'helpers', 'partials', 'data'];
          this.useDepths && e.push('depths');
          var f = this.mergeSource(b);
          return a
            ? (e.push(f), Function.apply(this, e))
            : 'function(' + e.join(',') + ') {\n  ' + f + '}';
        },
        mergeSource: function (a) {
          for (var b, c, d = '', e = !this.forceBuffer, f = 0, g = this.source.length; g > f; f++) {
            var h = this.source[f];
            h.appendToBuffer
              ? (b = b ? b + '\n    + ' + h.content : h.content)
              : (b &&
                  (d ? (d += 'buffer += ' + b + ';\n  ') : ((c = !0), (d = b + ';\n  ')),
                  (b = void 0)),
                (d += h + '\n  '),
                this.environment.isSimple || (e = !1));
          }
          return (
            e
              ? (b || !d) && (d += 'return ' + (b || '""') + ';\n')
              : ((a += ', buffer = ' + (c ? '' : this.initializeBuffer())),
                (d += b ? 'return buffer + ' + b + ';\n' : 'return buffer;\n')),
            a && (d = 'var ' + a.substring(2) + (c ? '' : ';\n  ') + d),
            d
          );
        },
        blockValue: function (a) {
          this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
          var b = [this.contextName(0)];
          this.setupParams(a, 0, b);
          var c = this.popStack();
          b.splice(1, 0, c), this.push('blockHelperMissing.call(' + b.join(', ') + ')');
        },
        ambiguousBlockValue: function () {
          this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
          var a = [this.contextName(0)];
          this.setupParams('', 0, a, !0), this.flushInline();
          var b = this.topStack();
          a.splice(1, 0, b),
            this.pushSource(
              'if (!' +
                this.lastHelper +
                ') { ' +
                b +
                ' = blockHelperMissing.call(' +
                a.join(', ') +
                '); }'
            );
        },
        appendContent: function (a) {
          this.pendingContent && (a = this.pendingContent + a), (this.pendingContent = a);
        },
        append: function () {
          this.flushInline();
          var a = this.popStack();
          this.pushSource('if (' + a + ' != null) { ' + this.appendToBuffer(a) + ' }'),
            this.environment.isSimple &&
              this.pushSource('else { ' + this.appendToBuffer("''") + ' }');
        },
        appendEscaped: function () {
          (this.aliases.escapeExpression = 'this.escapeExpression'),
            this.pushSource(this.appendToBuffer('escapeExpression(' + this.popStack() + ')'));
        },
        getContext: function (a) {
          this.lastContext = a;
        },
        pushContext: function () {
          this.pushStackLiteral(this.contextName(this.lastContext));
        },
        lookupOnContext: function (a, b, c) {
          var d = 0,
            e = a.length;
          for (
            c || !this.options.compat || this.lastContext
              ? this.pushContext()
              : this.push(this.depthedLookup(a[d++]));
            e > d;
            d++
          )
            this.replaceStack(function (c) {
              var e = this.nameLookup(c, a[d], 'context');
              return b ? ' && ' + e : ' != null ? ' + e + ' : ' + c;
            });
        },
        lookupData: function (a, b) {
          a ? this.pushStackLiteral('this.data(data, ' + a + ')') : this.pushStackLiteral('data');
          for (var c = b.length, d = 0; c > d; d++)
            this.replaceStack(function (a) {
              return ' && ' + this.nameLookup(a, b[d], 'data');
            });
        },
        resolvePossibleLambda: function () {
          (this.aliases.lambda = 'this.lambda'),
            this.push('lambda(' + this.popStack() + ', ' + this.contextName(0) + ')');
        },
        pushStringParam: function (a, b) {
          this.pushContext(),
            this.pushString(b),
            'sexpr' !== b && ('string' == typeof a ? this.pushString(a) : this.pushStackLiteral(a));
        },
        emptyHash: function () {
          this.pushStackLiteral('{}'),
            this.trackIds && this.push('{}'),
            this.stringParams && (this.push('{}'), this.push('{}'));
        },
        pushHash: function () {
          this.hash && this.hashes.push(this.hash),
            (this.hash = { values: [], types: [], contexts: [], ids: [] });
        },
        popHash: function () {
          var a = this.hash;
          (this.hash = this.hashes.pop()),
            this.trackIds && this.push('{' + a.ids.join(',') + '}'),
            this.stringParams &&
              (this.push('{' + a.contexts.join(',') + '}'),
              this.push('{' + a.types.join(',') + '}')),
            this.push('{\n    ' + a.values.join(',\n    ') + '\n  }');
        },
        pushString: function (a) {
          this.pushStackLiteral(this.quotedString(a));
        },
        push: function (a) {
          return this.inlineStack.push(a), a;
        },
        pushLiteral: function (a) {
          this.pushStackLiteral(a);
        },
        pushProgram: function (a) {
          null != a
            ? this.pushStackLiteral(this.programExpression(a))
            : this.pushStackLiteral(null);
        },
        invokeHelper: function (a, b, c) {
          this.aliases.helperMissing = 'helpers.helperMissing';
          var d = this.popStack(),
            e = this.setupHelper(a, b),
            f = (c ? e.name + ' || ' : '') + d + ' || helperMissing';
          this.push('((' + f + ').call(' + e.callParams + '))');
        },
        invokeKnownHelper: function (a, b) {
          var c = this.setupHelper(a, b);
          this.push(c.name + '.call(' + c.callParams + ')');
        },
        invokeAmbiguous: function (a, b) {
          (this.aliases.functionType = '"function"'),
            (this.aliases.helperMissing = 'helpers.helperMissing'),
            this.useRegister('helper');
          var c = this.popStack();
          this.emptyHash();
          var d = this.setupHelper(0, a, b),
            e = (this.lastHelper = this.nameLookup('helpers', a, 'helper'));
          this.push(
            '((helper = (helper = ' +
              e +
              ' || ' +
              c +
              ') != null ? helper : helperMissing' +
              (d.paramsInit ? '),(' + d.paramsInit : '') +
              '),(typeof helper === functionType ? helper.call(' +
              d.callParams +
              ') : helper))'
          );
        },
        invokePartial: function (a, b) {
          var c = [
            this.nameLookup('partials', a, 'partial'),
            "'" + b + "'",
            "'" + a + "'",
            this.popStack(),
            this.popStack(),
            'helpers',
            'partials',
          ];
          this.options.data ? c.push('data') : this.options.compat && c.push('undefined'),
            this.options.compat && c.push('depths'),
            this.push('this.invokePartial(' + c.join(', ') + ')');
        },
        assignToHash: function (a) {
          var b,
            c,
            d,
            e = this.popStack();
          this.trackIds && (d = this.popStack()),
            this.stringParams && ((c = this.popStack()), (b = this.popStack()));
          var f = this.hash;
          b && f.contexts.push("'" + a + "': " + b),
            c && f.types.push("'" + a + "': " + c),
            d && f.ids.push("'" + a + "': " + d),
            f.values.push("'" + a + "': (" + e + ')');
        },
        pushId: function (a, b) {
          'ID' === a || 'DATA' === a
            ? this.pushString(b)
            : 'sexpr' === a
            ? this.pushStackLiteral('true')
            : this.pushStackLiteral('null');
        },
        compiler: d,
        compileChildren: function (a, b) {
          for (var c, d, e = a.children, f = 0, g = e.length; g > f; f++) {
            (c = e[f]), (d = new this.compiler());
            var h = this.matchExistingProgram(c);
            null == h
              ? (this.context.programs.push(''),
                (h = this.context.programs.length),
                (c.index = h),
                (c.name = 'program' + h),
                (this.context.programs[h] = d.compile(c, b, this.context, !this.precompile)),
                (this.context.environments[h] = c),
                (this.useDepths = this.useDepths || d.useDepths))
              : ((c.index = h), (c.name = 'program' + h));
          }
        },
        matchExistingProgram: function (a) {
          for (var b = 0, c = this.context.environments.length; c > b; b++) {
            var d = this.context.environments[b];
            if (d && d.equals(a)) return b;
          }
        },
        programExpression: function (a) {
          var b = this.environment.children[a],
            c = (b.depths.list, this.useDepths),
            d = [b.index, 'data'];
          return c && d.push('depths'), 'this.program(' + d.join(', ') + ')';
        },
        useRegister: function (a) {
          this.registers[a] || ((this.registers[a] = !0), this.registers.list.push(a));
        },
        pushStackLiteral: function (a) {
          return this.push(new c(a));
        },
        pushSource: function (a) {
          this.pendingContent &&
            (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),
            (this.pendingContent = void 0)),
            a && this.source.push(a);
        },
        pushStack: function (a) {
          this.flushInline();
          var b = this.incrStack();
          return this.pushSource(b + ' = ' + a + ';'), this.compileStack.push(b), b;
        },
        replaceStack: function (a) {
          {
            var b,
              d,
              e,
              f = '';
            this.isInline();
          }
          if (!this.isInline()) throw new h('replaceStack on non-inline');
          var g = this.popStack(!0);
          if (g instanceof c) (f = b = g.value), (e = !0);
          else {
            d = !this.stackSlot;
            var i = d ? this.incrStack() : this.topStackName();
            (f = '(' + this.push(i) + ' = ' + g + ')'), (b = this.topStack());
          }
          var j = a.call(this, b);
          e || this.popStack(), d && this.stackSlot--, this.push('(' + f + j + ')');
        },
        incrStack: function () {
          return (
            this.stackSlot++,
            this.stackSlot > this.stackVars.length && this.stackVars.push('stack' + this.stackSlot),
            this.topStackName()
          );
        },
        topStackName: function () {
          return 'stack' + this.stackSlot;
        },
        flushInline: function () {
          var a = this.inlineStack;
          if (a.length) {
            this.inlineStack = [];
            for (var b = 0, d = a.length; d > b; b++) {
              var e = a[b];
              e instanceof c ? this.compileStack.push(e) : this.pushStack(e);
            }
          }
        },
        isInline: function () {
          return this.inlineStack.length;
        },
        popStack: function (a) {
          var b = this.isInline(),
            d = (b ? this.inlineStack : this.compileStack).pop();
          if (!a && d instanceof c) return d.value;
          if (!b) {
            if (!this.stackSlot) throw new h('Invalid stack pop');
            this.stackSlot--;
          }
          return d;
        },
        topStack: function () {
          var a = this.isInline() ? this.inlineStack : this.compileStack,
            b = a[a.length - 1];
          return b instanceof c ? b.value : b;
        },
        contextName: function (a) {
          return this.useDepths && a ? 'depths[' + a + ']' : 'depth' + a;
        },
        quotedString: function (a) {
          return (
            '"' +
            a
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/\u2028/g, '\\u2028')
              .replace(/\u2029/g, '\\u2029') +
            '"'
          );
        },
        objectLiteral: function (a) {
          var b = [];
          for (var c in a) a.hasOwnProperty(c) && b.push(this.quotedString(c) + ':' + a[c]);
          return '{' + b.join(',') + '}';
        },
        setupHelper: function (a, b, c) {
          var d = [],
            e = this.setupParams(b, a, d, c),
            f = this.nameLookup('helpers', b, 'helper');
          return {
            params: d,
            paramsInit: e,
            name: f,
            callParams: [this.contextName(0)].concat(d).join(', '),
          };
        },
        setupOptions: function (a, b, c) {
          var d,
            e,
            f,
            g = {},
            h = [],
            i = [],
            j = [];
          (g.name = this.quotedString(a)),
            (g.hash = this.popStack()),
            this.trackIds && (g.hashIds = this.popStack()),
            this.stringParams &&
              ((g.hashTypes = this.popStack()), (g.hashContexts = this.popStack())),
            (e = this.popStack()),
            (f = this.popStack()),
            (f || e) &&
              (f || (f = 'this.noop'), e || (e = 'this.noop'), (g.fn = f), (g.inverse = e));
          for (var k = b; k--; )
            (d = this.popStack()),
              (c[k] = d),
              this.trackIds && (j[k] = this.popStack()),
              this.stringParams && ((i[k] = this.popStack()), (h[k] = this.popStack()));
          return (
            this.trackIds && (g.ids = '[' + j.join(',') + ']'),
            this.stringParams &&
              ((g.types = '[' + i.join(',') + ']'), (g.contexts = '[' + h.join(',') + ']')),
            this.options.data && (g.data = 'data'),
            g
          );
        },
        setupParams: function (a, b, c, d) {
          var e = this.objectLiteral(this.setupOptions(a, b, c));
          return d
            ? (this.useRegister('options'), c.push('options'), 'options=' + e)
            : (c.push(e), '');
        },
      };
      for (
        var i = 'break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield'.split(
            ' '
          ),
          j = (d.RESERVED_WORDS = {}),
          k = 0,
          l = i.length;
        l > k;
        k++
      )
        j[i[k]] = !0;
      return (
        (d.isValidJavaScriptVariableName = function (a) {
          return !d.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a);
        }),
        (e = d)
      );
    })(d, c),
    m = (function (a, b, c, d, e) {
      'use strict';
      var f,
        g = a,
        h = b,
        i = c.parser,
        j = c.parse,
        k = d.Compiler,
        l = d.compile,
        m = d.precompile,
        n = e,
        o = g.create,
        p = function () {
          var a = o();
          return (
            (a.compile = function (b, c) {
              return l(b, c, a);
            }),
            (a.precompile = function (b, c) {
              return m(b, c, a);
            }),
            (a.AST = h),
            (a.Compiler = k),
            (a.JavaScriptCompiler = n),
            (a.Parser = i),
            (a.parse = j),
            a
          );
        };
      return (g = p()), (g.create = p), (g['default'] = g), (f = g);
    })(f, g, j, k, l);
  return m;
});
