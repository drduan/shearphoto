try{
Array.prototype.del = function(a) {
    a.sort();
    for (var b = this.concat([]), c = a.length - 1; c >= 0; c--) b = b.slice(0, a[c]).concat(b.slice(a[c] + 1));
    return b;
}, 

 HTMLImageElement.prototype.loadOnce = function(a) {
    var b = 0;
    this.onload = function() {
        b || a.call(this, null), b++;
    };
}, function(a) {
    var b = {
        lib:[],
        init:function() {
            this.require("config");
        },
        module:function(a, b) {
            this.lib[a] = b.call(null, this);
        },
        require:function(a) {
            var b = this, c = document.createElement("script");
            document.body.appendChild(c), c.src = "./js/module/" + a + ".js", c.onload = c.onerror = function(a) {
                b.handlerror(a);
            };
        },
        handlerror:function() {},
        destroySelf:function(b) {
            throw delete ShearPhoto[a], Error(b);
        },
        reflect:function(a, b, c) {
            return a = this.lib.config.getModuleName(a), this.lib[a].process(b, c);
        },
        reflectEasy:function(a) {
            return a = this.lib.config.getEasyFun(a), this.lib.easy.getFun(a);
        },
        add:function(a, b, c, d, e, f, g, h) {
            return this.lib.addLayer.add(a, b, c, d, e, f, g, h);
        },
        applyMatrix:function() {}
    };
    ShearPhoto[a] = function(b, c, d) {
        if (!(this instanceof ShearPhoto[a])) return new ShearPhoto[a](b, c, d);
        this.startTime = +new Date();
        var e = document.createElement("canvas"), f = e.getContext("2d") , imgWidth , imgHeight;
        isNaN(b) ? (e.width = parseInt(b.width), e.height = parseInt(b.height), c = getComputedStyle(b), 
        imgWidth = parseInt(c.getPropertyValue("width")), imgHeight = parseInt(c.getPropertyValue("height")), 
        isNaN(imgWidth) ? f.drawImage(b, 0, 0) :f.drawImage(b, 0, 0, imgWidth, imgHeight)) :(e.width = b, 
        e.height = c, f.fillStyle = d || "#fff", f.fillRect(0, 0, b, c)), this.canvas = e, 
        this.context = f, this.imgData = f.getImageData(0, 0, e.width, e.height), this.name = a + "_" + Math.random(), 
        this.canvas.id = this.name, this.layers = [], b = document.createElement("canvas"), 
        b.width = e.width, b.height = e.height;
    }, ShearPhoto[a].module = function(a, c) {
        b.module(a, c);
    }, ShearPhoto[a].dorsyMath = function() {
        return b.lib.dorsyMath;
    }, ShearPhoto[a].prototype = {
        act:function(a) {
            var c = [], c = Array.prototype.slice.call(arguments, 1);
            return b.reflect(a, this.imgData, c), this;
        },
        view:function(a, b, c, d, e) {
            var f = this.clone();
            return f.type = 1, this.addLayer(f, "正常", 0, 0), f.act(a, b, c, d, e), this;
        },
        excute:function() {
            var a = this.layers, b = a.length;
            a[b - 1] && 1 == a[b - 1][0].type && (this.imgData = a[b - 1][0].imgData, delete a[b - 1]);
        },
        cancel:function() {
            var a = this.layers, b = a.length;
            a[b - 1] && 1 == a[b - 1][0].type && delete a[b - 1];
        },
        show:function(b, c) {
            var d, e, f, g, h = new ShearPhoto[a](this.canvas.width, this.canvas.height);
            for (h.add(this, "正常", 0, 0, c), this.tempPsLib = h, d = 0; d < this.layers.length; d++) e = this.layers[d], 
            f = e[0].layers, g = e[0], f[f.length - 1] && 1 == f[f.length - 1][0].type && (g = f[f.length - 1][0]), 
            h.add(g, e[1], e[2], e[3], c);
            return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.putImageData(h.imgData, 0, 0), 
            b ? document.querySelector(b).appendChild(this.canvas) :document.body.appendChild(this.canvas), 
            this;
        },
        replace:function(a) {
            return a && (a.onload = function() {}, a.src = this.save()), this;
        },
        add:function() {
            var a, c, d, e, f, g = [];
            for (d = 0; d < arguments.length; d++) if (d) switch (typeof arguments[d]) {
              case "string":
                /\d+%/.test(arguments[d]) ? c = arguments[d].replace("%", "") :/[RGB]+/.test(arguments[d]) ? f = arguments[d] :a = arguments[d];
                break;

              case "number":
                g.push(arguments[d]);
                break;

              case "boolean":
                e = arguments[d];
            }
            return d = g[0] || 0, g = g[1] || 0, this.imgData = b.add(this.imgData, arguments[0].imgData, a || "正常", c / 100 || 1, d, g, e || !1, f || "RGB"), 
            this;
        },
        addLayer:function(a, b, c, d) {
            return this.layers.push([ a, b, c, d ]), this;
        },
        clone:function() {
            var b = new ShearPhoto[a](this.canvas.width, this.canvas.height);
            return b.context.putImageData(this.imgData, 0, 0), b.imgData = b.context.getImageData(0, 0, this.canvas.width, this.canvas.height), 
            b;
        },
        swap:function(a, b) {
            var c = this.layers[a];
            return this.layers[a] = this.layers[b], this.layers[b] = c, this;
        },
        deleteLayers:function(a) {
            this.layers = this.layers.del(a);
        },
        save:function(b, c) {
            var d, e, f, g, h;
            if (!this.layers.length) return c ? (this.context.putImageData(this.imgData, 0, 0), 
            this.canvas.toDataURL(c, .9)) :(this.context.putImageData(this.imgData, 0, 0), this.canvas.toDataURL());
            for (d = new ShearPhoto[a](this.canvas.width, this.canvas.height), d.add(this, "正常", 0, 0, b), 
            this.tempPsLib = d, e = 0; e < this.layers.length; e++) f = this.layers[e], g = f[0].layers, 
            h = f[0], g[g.length - 1] && 1 == g[g.length - 1][0].type && (h = g[g.length - 1][0]), 
            d.add(h, f[1], f[2], f[3], b);
            return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.putImageData(d.imgData, 0, 0), 
            c ? this.canvas.toDataURL(c, .9) :this.canvas.toDataURL();
        },
        drawRect:function() {
            var a, b, c, d, e, f;
            for ((a = document.getElementById("imgRect")) || (a = document.createElement("canvas"), 
            a.id = "imgRect", document.body.appendChild(a), a.width = parseInt(this.canvas.width), 
            a.height = parseInt(this.canvas.height)), b = a.getContext("2d"), b.clearRect(0, 0, a.width, a.height), 
            c = [], d = this.tempPsLib.imgData.data, e = 0, f = d.length; f > e; e++) c[d[e]] ? c[d[e]]++ :c[d[e]] = 1;
            for (b.beginPath(), b.moveTo(0, a.height), e = d = 0; 255 > e; e++) c[e] > d && (d = c[e]);
            for (e = 0; 255 > e; e++) f = c[e] || 0, f = a.height - .8 * (f / d) * a.height, 
            b.lineTo(e / 256 * a.width, f, 1, 1);
            b.lineTo(a.width + 10, a.height), b.fill();
        },
        ps:function(a) {
            var c;
            return c = b.reflectEasy(a).call(this), this.logTime("组合效果" + a), c;
        },
        logTime:function(a) {
            console.log(a + ": " + (+new Date() - this.startTime) / 1e3 + "s");
        },
        ctx:function(a) {
            var b = this.ctxContext;
            return b.putImageData(this.imgData, 0, 0), a.call(b), this.imgData = b.getImageData(0, 0, this.canvas.width, this.canvas.height), 
            this;
        }
    };
}("psLib"), function(a) {
    ShearPhoto[a].module("ImageEnhance", function() {
        return {
            process:function(a) {
                for (var b = a.data, c = 0, d = b.length; d > c; c += 4) ;
                return a.data = b, a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("addLayer", function() {
        return {
            add:function(a, b, c, d, e, f, g, h) {
                var i, j, k, l, m, n, o, p;
                for (g = a.data, i = b.data, e = e || 0, f = f || 0, d = d || 1, h = h || "RGB", 
                /[RGB]+/.test(h) || (h = "RGB"), k = h.replace("R", "0").replace("G", "1").replace("B", "2"), 
                h = a.width, l = i.length, b = b.width, k = [ -1 < k.indexOf("0"), -1 < k.indexOf("1"), -1 < k.indexOf("2") ], 
                o = 0, p = g.length; p > o; o += 4) if (m = o / 4, n = parseInt(m / h), m %= h, 
                n -= f, m -= e, n = n * b + m, n *= 4, n >= 0 && l - 4 > n && b > m && m >= 0) for (m = 0; 3 > m && 0 != i[n + 3]; m++) switch (g[o + 3] = i[n + 3], 
                c) {
                  case "颜色减淡":
                    k[m] && (j = g[o + m] + g[o + m] * i[n + m] / (255 - i[n + m]), g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "变暗":
                    k[m] && (j = g[o + m] < i[n + m] ? g[o + m] :i[n + m], g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "变亮":
                    k[m] && (j = g[o + m] > i[n + m] ? g[o + m] :i[n + m], g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "正片叠底":
                    k[m] && (j = parseInt(g[o + m] * i[n + m] / 255), g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "滤色":
                    k[m] && (j = parseInt(255 - (255 - g[o + m]) * (255 - i[n + m]) / 255), g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "叠加":
                    k[m] && (j = 127.5 >= g[o + m] ? g[o + m] * i[n + m] / 127.5 :255 - (255 - g[o + m]) * (255 - i[n + m]) / 127.5, 
                    g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "强光":
                    k[m] && (j = 127.5 >= i[n + m] ? g[o + m] * i[n + m] / 127.5 :g[o + m] + (255 - g[o + m]) * (i[n + m] - 127.5) / 127.5, 
                    g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "差值":
                    k[m] && (j = g[o + m] > i[n + m] ? g[o + m] - i[n + m] :i[n + m] - g[o + m], g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "排除":
                    k[m] && (j = g[o + m] + i[n + m] - g[o + m] * i[n + m] / 127.5, g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "点光":
                    k[m] && (j = g[o + m] < 2 * i[n + m] - 255 ? 2 * i[n + m] - 255 :g[o + m] < 2 * i[n + m] ? g[o + m] :2 * i[n + m], 
                    g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "颜色加深":
                    k[m] && (j = 255 - 255 * (255 - g[o + m]) / i[n + m], g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "线性加深":
                    k[m] && (j = g[o + m] + i[n + m], j = j > 255 ? j - 255 :0, g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "线性减淡":
                    k[m] && (j = g[o + m] + i[n + m], j = j > 255 ? 255 :j, g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "柔光":
                    k[m] && (j = 127.5 > i[n + m] ? ((2 * i[n + m] - 255) * (255 - g[o + m]) / 65025 + 1) * g[o + m] :(2 * i[n + m] - 255) * (Math.sqrt(g[o + m] / 255) - g[o + m] / 255) + g[o + m], 
                    g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "亮光":
                    k[m] && (j = 127.5 > i[n + m] ? 255 * (1 - (255 - g[o + m]) / (2 * i[n + m])) :g[o + m] / (2 * (1 - i[n + m] / 255)), 
                    g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "线性光":
                    k[m] && (j = g[o + m] + 2 * i[n + m] - 255, j = j > 255 ? 255 :j, g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  case "实色混合":
                    k[m] && (j = i[n + m] < 255 - g[o + m] ? 0 :255, g[o + m] = (1 - d) * g[o + m] + d * j);
                    break;

                  default:
                    k[m] && (j = i[n + m], g[o + m] = (1 - d) * g[o + m] + d * j);
                }
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("brightness", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h;
                for (c = a.data, d = b[0] / 50, e = Math.tan((45 + 44 * ((b[1] || 0) / 50)) * Math.PI / 180), 
                f = 0, g = c.length; g > f; f += 4) for (h = 0; 3 > h; h++) c[f + h] = (c[f + h] - 127.5 * (1 - d)) * e + 127.5 * (1 + d);
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("applyMatrix", function(a) {
        return {
            process:function(b) {
                var c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                for (c = b.data, d = b.width, e = new a.lib.dorsyMath.Matrix([ -2, -4, -4, -4, -2, -4, 0, 8, 0, -4, -4, 8, 24, 8, -4, -4, 0, 8, 0, -4, -2, -4, -4, -4, -2 ], 25, 1), 
                f = [], g = 0, h = c.length; h > g; g += 4) if (i = g / 4, j = parseInt(i / d), 
                k = i % d, 0 != j && 0 != k) {
                    for (l = [ [], [], [] ], m = -2; 3 > m; m++) for (n = j + m, o = -2; 3 > o; o++) for (p = 4 * (n * d + (k + o)), 
                    i = 0; 3 > i; i++) l[i].push(c[p + i]);
                    for (j = new a.lib.dorsyMath.Matrix(l, 3, matrixSize).mutiply(e), i = 0; 3 > i; i++) f[g + i] = j.data[i];
                    f[g + 4] = c[g + 4];
                }
                for (g = 0, h = c.length; h > g; g++) c[g] = f[g] || c[g];
                return b;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("config", function() {
        var a = {
            "灰度处理":"toGray",
            "反色":"toReverse",
            "灰度阈值":"toThresh",
            "高斯模糊":"gaussBlur",
            "亮度":"brightness",
            "浮雕效果":"embossment",
            "查找边缘":"borderline",
            "色相/饱和度调节":"setHSI",
            "马赛克":"mosaic",
            "油画":"oilPainting",
            "腐蚀":"corrode",
            "锐化":"sharp",
            "添加杂色":"noise",
            "曲线":"curve",
            "暗角":"darkCorner",
            "喷点":"dotted"
        }, b = {
            "美肤":"softenFace",
            "素描":"sketch",
            "自然增强":"softEnhancement",
            "紫调":"purpleStyle",
            "柔焦":"soften",
            "复古":"vintage",
            "黑白":"gray",
            "仿lomo":"lomo",
            "亮白增强":"strongEnhancement",
            "灰白":"strongGray",
            "灰色":"lightGray",
            "暖秋":"warmAutumn",
            "木雕":"carveStyle",
            "粗糙":"rough"
        };
        return {
            getModuleName:function(b) {
                return a[b] || b;
            },
            getEasyFun:function(a) {
                return b[a] || a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("corrode", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h, i, j, k;
                for (c = parseInt(b[0]) || 3, d = a.data, e = a.width, f = a.height, g = 0; e > g; g++) for (h = 0; f > h; h++) for (i = parseInt(2 * Math.random() * c) - c, 
                j = parseInt(2 * Math.random() * c) - c, k = h * e + g, i = (h + i) * e + g + j, 
                j = 0; 3 > j; j++) d[4 * k + j] = d[4 * i + j];
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("curve", function(a) {
        return {
            process:function(b, c) {
                var d, e, f, g, h, i, j, k;
                for (d = a.lib.dorsyMath.lagrange(c[0], c[1]), e = b.data, f = b.width, g = b.height, 
                h = 0; f > h; h++) for (i = 0; g > i; i++) for (j = i * f + h, k = 0; 3 > k; k++) e[4 * j + k] = d(e[4 * j + k]);
                return b;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("darkCorner", function(a) {
        return {
            process:function(b, c) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                for (d = parseInt(c[0]) || 3, e = c[1] || 30, f = b.data, g = b.width, h = b.height, 
                i = 2 * g / 3, j = 1 * h / 2, k = a.lib.dorsyMath.distance([ i, j ]), d = k * (1 - d / 10), 
                l = 0; g > l; l++) for (m = 0; h > m; m++) for (n = m * g + l, o = 0; 3 > o; o++) p = f[4 * n + o], 
                q = (a.lib.dorsyMath.distance([ l, m ], [ i, j ]) - d) / (k - d), 0 > q && (q = 0), 
                p = (0 * Math.pow(1 - q, 3) + .06 * q * Math.pow(1 - q, 2) + 3 * .3 * q * q * (1 - q) + 1 * Math.pow(q, 3)) * p * e / 255, 
                f[4 * n + o] -= p;
                return b;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("dorsyMath", function(a) {
        var b = {
            FFT1:function(a) {
                function c() {
                    var g, h, i, j, k, l, m, n, o, p, q;
                    for (e++, g = d / Math.pow(2, e), h = d / g, i = 0; g > i; i++) for (j = i * h, 
                    k = (i + 1) * h - 1, l = e, m = Math.pow(2, l - 1), n = 0; k - m >= j; j++) o = j + m, 
                    p = n * d / Math.pow(2, l), q = p + d / 4, a[j] instanceof b.C || (a[j] = new b.C(a[j])), 
                    a[o] instanceof b.C || (a[o] = new b.C(a[o])), p = a[j].plus(a[o].mutiply(f[p])), 
                    q = a[j].plus(a[o].mutiply(f[q])), a[j] = p, a[o] = q, n++;
                    g > 1 && c();
                }
                for (var d = a.length, e = 0, f = [], g = 0; d > g; g++) f[g] = this.exp(-2 * Math.PI * g / d);
                return c(), a;
            },
            DFT:function() {},
            Matrix:function(a, b, c) {
                var d, e, f = [];
                if (b) {
                    if (isNaN(b) ? (d = /(\d+)\*/.exec(b)[1], b = /\*(\d+)/.exec(b)[1]) :(d = b, b = c), 
                    a[0] && a[0][0]) for (c = 0; d > c; c++) for (f[c] = [], e = 0; b > e; e++) f[c][e] = a[c][e] || 0; else for (c = 0; d > c; c++) for (f[c] = [], 
                    e = 0; b > e; e++) f[c][e] = a[c * b + e] || 0;
                    this.m = d, this.n = b;
                } else this.m = a.length, this.n = a[0].length;
                this.data = f;
            },
            C:function(a, b) {
                this.r = a || 0, this.i = b || 0;
            },
            exp:function(a, c) {
                a = a || 0, c = c || 1;
                var d = new b.C();
                return d.r = c * Math.cos(a), d.i = c * Math.sin(a), d;
            },
            lagrange:function(a, b) {
                var c = a.length;
                return function(d) {
                    var e, f, g, h, i;
                    for (e = 0, f = 0; c > f; f++) {
                        for (g = 1, h = 1, i = 0; c > i; i++) i != f && (g *= a[f] - a[i], h *= d - a[i]);
                        e += b[f] * (h / g);
                    }
                    return e;
                };
            },
            applyMatrix:function(c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
                for (e = e || 0, f = c.data, g = c.width, h = d.length, d = new b.Matrix(d, h, 1), 
                i = [], j = -(Math.sqrt(h) - 1) / 2, k = 0, l = f.length; l > k; k += 4) if (m = k / 4, 
                n = parseInt(m / g), o = m % g, 0 != n && 0 != o) {
                    for (p = [ [], [], [] ], q = j; -j >= q; q++) for (r = n + q, s = j; -j >= s; s++) for (t = 4 * (r * g + (o + s)), 
                    m = 0; 3 > m; m++) p[m].push(f[t + m]);
                    for (n = new a.lib.dorsyMath.Matrix(p, 3, h).mutiply(d), m = 0; 3 > m; m++) i[k + m] = n.data[m];
                    i[k + 4] = f[k + 4];
                }
                for (k = 0, l = f.length; l > k; k++) i[k] && (f[k] = i[k] < e ? i[k] :f[k]);
                return c;
            },
            RGBToHSI:function(a, b, c) {
                var d = (a - b + a - c) / 2 / Math.sqrt((a - b) * (a - b) + (a - c) * (b - c)) || 0, d = Math.acos(d), d = c > b ? 2 * Math.PI - d :d, e = 1 - 3 * Math.min(a, b, c) / (a + b + c);
                return d > 2 * Math.PI && (d = 2 * Math.PI), 0 > d && (d = 0), {
                    H:d,
                    S:e,
                    I:(a + b + c) / 3
                };
            },
            HSIToRGB:function(a, b, c) {
                if (0 > a ? (a %= 2 * Math.PI, a += 2 * Math.PI) :a %= 2 * Math.PI, a <= 2 * Math.PI / 3) var d = c * (1 - b), e = c * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)), f = 3 * c - (e + d); else a <= 4 * Math.PI / 3 ? (a -= 2 * Math.PI / 3, 
                e = c * (1 - b), f = c * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)), d = 3 * c - (f + e)) :(a -= 4 * Math.PI / 3, 
                f = c * (1 - b), d = c * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)), e = 3 * c - (f + d));
                return {
                    R:e,
                    G:f,
                    B:d
                };
            },
            applyInHSI:function(a, b) {
                var c, d, e, f;
                for (c = a.data, d = 0, e = c.length; e > d; d += 4) f = this.RGBToHSI(c[d], c[d + 1], c[d + 2]), 
                b(f), 1 < f.S && (f.S = 1), 0 > f.S && (f.S = 0), f = this.HSIToRGB(f.H, f.S, f.I), 
                c[d] = f.R, c[d + 1] = f.G, c[d + 2] = f.B;
            },
            applyInCoordinate:function() {},
            distance:function(a, c) {
                return c = c || [ 0, 0 ], a = new b.C(a[0], a[1]), c = new b.C(c[0], c[1]), a.minus(c).distance();
            },
            xyToIFun:function(a) {
                return function(b, c, d) {
                    return 4 * (c * a + b) + (d || 0);
                };
            },
            xyCal:function(a, b, c, d, e) {
                var f, g, h;
                for (f = this.xyToIFun(a.width), g = 0; 3 > g; g++) h = f(b, c, g), a[h] = d(a[h]);
                e && (a[h + 1] = e(a[h + 1]));
            }
        };
        return b.Matrix.prototype = {
            plus:function(a) {
                var c, d, e;
                if (this.m != a.m || this.n != a.n) throw Error("矩阵加法行列不匹配");
                for (c = new b.Matrix([], this.m, this.n), d = 0; d < this.m; d++) for (e = 0; e < this.n; e++) c.data[d][e] = this.data[d][e] + a.data[d][e];
                return c;
            },
            minus:function(a) {
                var c, d, e;
                if (this.m != a.m || this.n != a.n) throw Error("矩阵减法法行列不匹配");
                for (c = new b.Matrix([], this.m, this.n), d = 0; d < this.m; d++) for (e = 0; e < this.n; e++) c.data[d][e] = this.data[d][e] - a.data[d][e];
                return c;
            },
            mutiply:function(a) {
                var c, d, e, f, g;
                if (this.n != a.m) throw Error("矩阵乘法行列不匹配");
                for (c = new b.Matrix([], this.m, a.n), d = 0; d < this.m; d++) for (e = 0; e < a.n; e++) {
                    for (f = 0, g = 0; g < this.n; g++) f += this.data[d][g] * a.data[g][e];
                    c.data[d][e] = f;
                }
                return c;
            }
        }, b.C.prototype = {
            plus:function(a) {
                var c = new b.C();
                return c.r = this.r + a.r, c.i = this.i + a.i, c;
            },
            minus:function(a) {
                var c = new b.C();
                return c.r = this.r - a.r, c.i = this.i - a.i, c;
            },
            mutiply:function(a) {
                var c = new b.C();
                return c.r = this.r * a.r - this.i * a.i, c.i = this.r * a.i + this.i * a.r, c;
            },
            divide:function(a) {
                var c = new b.C(), d = a.mutiply(a.conjugated());
                return a = this.mutiply(a.conjugated()), c.r = a.r / d.r, c.i = a.i / d.r, c;
            },
            conjugated:function() {
                return new b.C(this.r, -this.i);
            },
            distance:function() {
                return Math.sqrt(this.r * this.r + this.i * this.i);
            }
        }, b;
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("dotted", function(a) {
        return {
            process:function(b, c) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                for (d = parseInt(c[0]) || 1, e = parseInt(c[1]) || 1, f = b.data, g = b.width, 
                h = b.height, i = 2 * d + 1, j = [], k = e * e, e = -d; d > e; e++) for (l = -d; d > l; l++) e * e + l * l > k && j.push([ e, l ]);
                for (d = a.lib.dorsyMath.xyToIFun(g), e = 0, g = parseInt(g / i); g > e; e++) for (l = 0, 
                k = parseInt(h / i); k > l; l++) for (m = parseInt((e + .5) * i), n = parseInt((l + .5) * i), 
                o = 0; o < j.length; o++) p = m + j[o][0], q = n + j[o][1], f[d(p, q, 3)] = 225, 
                f[d(p, q, 2)] = 225, f[d(p, q, 0)] = 225, f[d(p, q, 1)] = 225;
                return b;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("easy", function() {
        return {
            getFun:function(b) {
                return {
                    softenFace:function() {
                        return this.clone().add(this.act("高斯模糊", 10), "滤色").act("亮度", -10, 5);
                    },
                    sketch:function() {
                        var a = this.act("灰度处理").clone();
                        return this.add(a.act("反色").act("高斯模糊", 8), "颜色减淡").act("锐化", 1);
                    },
                    softEnhancement:function() {
                        return this.act("曲线", [ 0, 190, 255 ], [ 0, 229, 255 ]);
                    },
                    purpleStyle:function() {
                        var a = this.clone();
                        return this.add(a.act("高斯模糊", 3), "正片叠底", "RG");
                    },
                    soften:function() {
                        var a = this.clone();
                        return this.add(a.act("高斯模糊", 6), "变暗");
                    },
                    vintage:function() {
                        return this.clone(), this.act("灰度处理").add(ShearPhoto[a](this.canvas.width, this.canvas.height, "#808080").act("添加杂色").act("高斯模糊", 4).act("色相/饱和度调节", 32, 19, 0, !0), "叠加");
                    },
                    gray:function() {
                        return this.act("灰度处理");
                    },
                    lomo:function() {
                        return this.clone().add(this.clone(), "滤色").add(this.clone(), "柔光").add(this.clone().act("反色"), "正常", "20%", "B").act("暗角", 6, 200);
                    },
                    strongEnhancement:function() {
                        return this.clone().add(this.clone().act("曲线", [ 0, 50, 255 ], [ 0, 234, 255 ]), "柔光");
                    },
                    strongGray:function() {
                        return this.act("灰度处理").act("曲线", [ 0, 61, 69, 212, 255 ], [ 0, 111, 176, 237, 255 ]);
                    },
                    lightGray:function() {
                        return this.act("灰度处理").act("曲线", [ 0, 60, 142, 194, 255 ], [ 0, 194, 240, 247, 255 ]);
                    },
                    warmAutumn:function() {
                        var a = this.clone().act("色相/饱和度调节", 36, 47, 8, !0).act("暗角", 6, 150);
                        return this.add(a, "叠加");
                    },
                    carveStyle:function() {
                        var a = this.clone().act("马赛克").act("查找边缘").act("浮雕效果");
                        return this.add(a, "线性光");
                    },
                    rough:function() {
                        return this.add(ShearPhoto[a](this.canvas.width, this.canvas.height, "#000").act("喷点").act("反色").act("浮雕效果"), "叠加");
                    }
                }[b];
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("embossment", function() {
        return {
            process:function(a) {
                var b, c, d, e, f, g, h, i, j;
                for (b = a.data, c = a.width, d = [], e = 0, f = b.length; f > e; e += 4) if (g = e / 4, 
                h = parseInt(g / c), i = g % c, g = 4 * ((h - 1) * c + (i - 1)), j = 4 * (h + 1) * c + 4 * (i + 1), 
                0 != h && 0 != i) {
                    for (h = 0; 3 > h; h++) d[e + h] = b[g + h] - b[j + h] + 127.5;
                    d[e + 4] = b[e + 4];
                }
                for (e = 0, f = b.length; f > e; e++) b[e] = d[e] || b[e];
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("gaussBlur", function() {
        return {
            process:function(a, b, c) {
                var d, e, f, g, h, i, j = a.data, k = a.width, l = a.height, m = [], n = 0;
                for (b = Math.floor(b) || 3, c = c || b / 3, d = 1 / (Math.sqrt(2 * Math.PI) * c), 
                g = -1 / (2 * c * c), h = 0, c = -b; b >= c; c++, h++) f = d * Math.exp(g * c * c), 
                m[h] = f, n += f;
                for (h = 0, c = m.length; c > h; h++) m[h] /= n;
                for (d = 0; l > d; d++) for (c = 0; k > c; c++) {
                    for (n = e = f = g = 0, i = -b; b >= i; i++) h = c + i, h >= 0 && k > h && (h = 4 * (d * k + h), 
                    e += j[h] * m[i + b], f += j[h + 1] * m[i + b], g += j[h + 2] * m[i + b], n += m[i + b]);
                    h = 4 * (d * k + c), j[h] = e / n, j[h + 1] = f / n, j[h + 2] = g / n;
                }
                for (c = 0; k > c; c++) for (d = 0; l > d; d++) {
                    for (n = e = f = g = 0, i = -b; b >= i; i++) h = d + i, h >= 0 && l > h && (h = 4 * (h * k + c), 
                    e += j[h] * m[i + b], f += j[h + 1] * m[i + b], g += j[h + 2] * m[i + b], n += m[i + b]);
                    h = 4 * (d * k + c), j[h] = e / n, j[h + 1] = f / n, j[h + 2] = g / n;
                }
                return a.data = j, a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("borderline", function(a) {
        return {
            process:function(b) {
                return a.lib.dorsyMath.applyMatrix(b, [ 0, 1, 0, 1, -4, 1, 0, 1, 0 ], 250);
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("mosaic", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h, i, j, k, l, m, n, o;
                for (c = parseInt(b[0]) || 3, d = a.data, e = a.width, f = a.height, c = 2 * c + 1, 
                g = 0, h = parseInt(e / c); h > g; g++) for (i = 0, j = parseInt(f / c); j > i; i++) {
                    for (k = [], l = [ 0, 0, 0 ], m = 0; c > m; m++) for (n = 0; c > n; n++) o = (i * c + m) * e + g * c + n, 
                    l[0] += d[4 * o], l[1] += d[4 * o + 1], l[2] += d[4 * o + 2];
                    for (k[0] = l[0] / (c * c), k[1] = l[1] / (c * c), k[2] = l[2] / (c * c), m = 0; c > m; m++) for (n = 0; c > n; n++) o = (i * c + m) * e + g * c + n, 
                    d[4 * o] = k[0], d[4 * o + 1] = k[1], d[4 * o + 2] = k[2];
                }
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("noise", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h, i, j, k;
                for (c = parseInt(b[0]) || 100, d = a.data, e = a.width, f = a.height, g = 0; e > g; g++) for (h = 0; f > h; h++) for (i = h * e + g, 
                j = 0; 3 > j; j++) k = parseInt(2 * Math.random() * c) - c, d[4 * i + j] += k;
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("oilPainting", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h, i, j, k;
                for (c = parseInt(b[0]) || 16, d = a.data, e = a.width, f = a.height, g = 0; e > g; g++) for (h = 0; f > h; h++) {
                    for (i = h * e + g, j = 0, k = 0; 3 > k; k++) j += d[4 * i + k];
                    for (j /= 3, j = parseInt(j / c) * c, k = 0; 3 > k; k++) d[4 * i + k] = j;
                }
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("setHSI", function(a) {
        return {
            process:function(b, c) {
                return c[0] = c[0] / 180 * Math.PI, c[1] = c[1] / 100 || 0, c[2] = 255 * (c[2] / 100) || 0, 
                c[3] = c[3] || !1, a.lib.dorsyMath.applyInHSI(b, function(a) {
                    c[3] ? (a.H = c[0], a.S = c[1]) :(a.H += c[0], a.S += c[1]), a.I += c[2];
                }), b;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("sharp", function() {
        return {
            process:function(a, b) {
                var c, d, e, f, g, h, i, j, k;
                for (c = b[0] || .6, d = a.data, e = a.width, f = 0, g = d.length; g > f; f += 4) if (h = f / 4, 
                i = parseInt(h / e), j = h % e, 0 != i && 0 != j) for (k = 4 * ((i - 1) * e + (j - 1)), 
                i = 4 * ((i - 1) * e + j), h = 4 * (h - 1), j = 0; 3 > j; j++) d[f + j] += (d[f + j] - (d[i + j] + d[h + j] + d[k + j]) / 3) * c;
                return a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("toGray", function() {
        return {
            process:function(a) {
                var b, c, d, e;
                for (b = a.data, c = 0, d = b.length; d > c; c += 4) e = parseInt((b[c] + b[c + 1] + b[c + 2]) / 3), 
                b[c + 2] = b[c + 1] = b[c] = e;
                return a.data = b, a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("toReverse", function() {
        return {
            process:function(a) {
                for (var b = a.data, c = 0, d = b.length; d > c; c += 4) b[c] = 255 - b[c], b[c + 1] = 255 - b[c + 1], 
                b[c + 2] = 255 - b[c + 2];
                return a.data = b, a;
            }
        };
    });
}("psLib"), function(a) {
    ShearPhoto[a].module("toThresh", function(a) {
        return {
            process:function(b, c) {
                var d, e, f;
                for (b = a.lib.toGray.process(b), d = b.data, c = c[0] || 128, e = 0, f = d.length; f > e; e++) (e + 1) % 4 && (d[e] = d[e] > c ? 255 :0);
                return b.data = d, b;
            }
        };
    });
}("psLib");
}catch(e){}