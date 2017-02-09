Ext.override(Ext.grid.View, { enableTextSelection: true });
var ErrCode = {
	"0": "请求成功",
	"10001": "invalid data 无效数据",
	"10002": "data type error 数据格式错误",
	"10003": "unauthorized 授权校验未通过",
	"10004": "invalid value 参数错误",
	"10005": "invalid file type 文件类型不符",
	"10006": "upload file failed 上传文件失败",
	"11001": "余位不足",
	"11002": "无效的公司信息",
	"11003": "无效的开放方团期信息",
	"11004": "下单失败",
	"11005": "无效的订单人数",
	"11006": "客户欠款总额超过授信额度，订单状态将自动变更为预留单",
	"11007": "销售欠款总额超过授信额度，订单状态将自动变更为预留单",
	"11008": "订单信息异常",
	"11010": "订单类型不存在，已取消下单请求",
	"11011": "仅允许状态为正常的团才可以下单",
	"11012": "团期信息不存在",
	"11013": "对方版本太低，暂不支持下单!",
	"11014": "出发城市异常",
	"11015": "占位信息异常",
	"11016": "单位名称必须从系统中选择，否则不能添加!",
	"11017": "erpId信息无效",
	"11018": "当前下单人数过多，占位失败，请刷新重试!",
	"11019": "已存在的手机号码，请重试!"
};
var Wb = {
	id : 0,
	get : Ext.getCmp,
	format : Ext.String.format,
	formatNum : Ext.util.Format.number,
	formatDate : Ext.util.Format.date,
	encode : Ext.encode,
	decode : Ext.decode,
	isEmpty : Ext.isEmpty,
	maxInt : 2147483647,
	space : '&nbsp;&nbsp;',
	dateFormat : 'Y-m-d H:i:s.u',
	timeout : 30000,
	pageSize : 50,
	find : function(obj) {
		if (Ext.isObject(obj))
			return obj;
		else
			return Ext.getCmp(obj);
	},
	initialize : function(time, offset) {
		window.Wd = window;
		Ext.BLANK_IMAGE_URL = 'js/index/lincase/images/app/s.gif';
		Ext.QuickTips.init();
		if (time !== null) {
			if (time == -1)
				time = Wb.maxInt;
			Wb.timeout = time;
			Ext.Ajax.timeout = time;
			Ext.data.JsonP.timeout = time;
			Ext.data.Connection.prototype.timeout = time;
			Ext.data.proxy.Server.prototype.timeout = time;
			Ext.form.Basic.prototype.timeout = Math.round(time / 1000);
		}
		Wb.zoneOffset = -offset - (new Date()).getTimezoneOffset();
	},
	initTouch : function(time, offset) {
		window.Wd = window;
		Wb.touchMode = true;
		if (window.LocalTouchLang)
			LocalTouchLang();
		if (time !== null) {
			if (time == -1)
				time = Wb.maxInt;
			Wb.timeout = time;
		}
		Wb.zoneOffset = -offset - (new Date()).getTimezoneOffset();
	},
	checkEnter : function(f, o) {
		var e = Ext.EventObject, b = false;
		if (e.getKey() == e.ENTER) {
			if (o instanceof Ext.form.field.ComboBox) {
				b = true;
				if (o.isExpanded && o.picker.highlightedItem)
					return;
			}
			f();
			if (b)
				o.collapse();
			e.stopEvent();
		}
	},
	dom : function(id) {
		return document.getElementById(id);
	},
	upper : function(s) {
		if (Wb.isEmpty(s))
			return '';
		else
			return s.toUpperCase();
	},
	lower : function(s) {
		if (Wb.isEmpty(s))
			return '';
		else
			return s.toLowerCase();
	},
	toLocal : function(dt) {
		if (dt)
			return Ext.Date.add(dt, Ext.Date.MINUTE, Wb.zoneOffset);
		else
			return dt;
	},
	findRecord : function(store, key, value) {
		var v = null;
		store.each(function(r) {
			if (Wb.upper(r.get(key)) === Wb.upper(value)) {
				v = r;
				return false;
			}
		});
		return v;
	},
	decodeValue : function(json) {
		for ( var s in json)
			json[s] = Wb.decode(json[s]);
	},
	numValidator : function(v) {
		if (Wb.isEmpty(v) || Ext.isNumeric(v))
			return true;
		else
			return Wb.format(Str.invalidValue, v);
	},
	tsValidator : function(v) {
		if (v == '')
			return true;
		var i, f = [ 'Y-m-d', 'Y-n-j', 'Y-m-d H:i:s', 'Y-n-j H:i:s',
				'Y-m-d H:i:s.u', 'Y-n-j H:i:s.u' ];
		for (i = 0; i < 6; i++)
			if (Ext.Date.parse(v, f[i]))
				return true
		return Wb.format(Str.invalidValue, v);
	},
	tmValidator : function(v) {
		if (v == '' || Ext.Date.parse(v, 'H:i:s'))
			return true;
		else
			return Wb.format(Str.invalidValue, v);
	},
	getBindValue : function(combo, v) {
		if (Wb.isEmpty(v))
			return null;
		var o = combo, f = o.displayField || o.valueField, s, b = undefined;
		(o.store.snapshot || o.store.data).each(function(r) {
			s = r.get(f);
			if (s === v) {
				b = r.get(o.valueField || o.displayField);
				return false;
			}
		});
		return b;
	},
	listValidator : function(v) {
		if (Ext.isEmpty(v) || Wb.getBindValue(this, v) !== undefined)
			return true;
		else
			return Wb.format(Str.invalidValue, v);
	},
	isEmptyObj : function(o) {
		for ( var n in o)
			return false;
		return true;
	},
	promptWindow : null,
	promptValues : null,
	promptEditors : null,
	closePrompt : function() {
		if (Wb.promptWindow) {
			Wb.promptWindow.close();
			Wb.promptWindow = null;
		}
	},
	prompt : function(title, config, getValueFunc, autoClose, lblWidth) {
		var win, items = [], i, j = config.length, y = 15, exp;

		function okHandle() {
			if (!Wb.verify(win))
				return;
			var i, j = Wb.promptEditors.length, r, result;
			Wb.promptValues = [];
			for (i = 0; i < j; i++) {
				r = Wb.promptEditors[i].getValue();
				Wb.promptValues.push(r ? r : '');
			}
			result = getValueFunc(Wb.promptValues);
			if (!Ext.isDefined(result) || result)
				if (autoClose !== false)
					win.close();
		}

		if (!lblWidth)
			lblWidth = 105;
		for (i = 0; i < j; i++) {
			items.push( {
				x : 1,
				y : y + 4,
				width : lblWidth,
				text : config[i].text + ':',
				xtype : 'label',
				style : 'text-align:right'
			});
			exp = {
				x : lblWidth + 10,
				y : y,
				width : 375 - lblWidth,
				value : config[i].value,
				validator : config[i].validator,
				readOnly : config[i].readOnly,
				allowBlank : !Ext.isDefined(config[i].allowBlank)
						|| config[i].allowBlank,
				listeners : {
					render : function() {
						Wb.promptEditors.push(this);
					}
				}
			};
			if (config[i].list) {
				Ext.apply(exp, {
					typeAhead : true,
					xtype : 'combo',
					queryMode : 'local',
					triggerAction : 'all',
					store : config[i].list,
					validator : config[i].validator || Wb.listValidator
				});
				if (Ext.isDefined(config[i].list[0].value))
					exp.valueField = 'value';
			} else if (config[i].height){
  			exp.xtype = 'textarea';
  			exp.height = config[i].height;
  			y += config[i].height;
  			y -= 30;
			} else
				exp.xtype = 'textfield';
			if (exp.readOnly) {
				exp.fieldStyle = "background-color:#C0C0C0;background-image:none";
				exp.selectOnFocus = true;
			}
			items.push(exp);
			y += 33;
		}
		y += 67;
		//if (y > 360)
		//	y = 360;
		Wb.promptEditors = [];
		win = new Ext.window.Window( {
			width : 430,
			height : y,
			title : title,
			layout : 'absolute',
			modal : true,
			iconCls : 'property_icon',
			resizable : false,
			autoScroll : true,
			buttons : [ {
				text : Str.ok,
				iconCls : 'ok_icon',
				handler : function() {
					okHandle();
				}
			}, {
				text : Str.cancel,
				iconCls : 'cancel_icon',
				handler : function() {
					win.close();
				}
			} ],
			listeners : {
				render : function(obj) {
					Wb.monEnter(obj, okHandle);
				}
			},
			items : items
		});
		win.show();
		Wb.promptEditors[0].focus(true, true);
		Wb.promptWindow = win;
	},
	getTree : function(el) {
		if (el && el.boundView)
			return Wb.get(el.boundView).ownerCt;
		else
			return null;
	},
	getExcel : function(grid, isAll, preview) {
		var p = {}, m = [], g = Wb.find(grid), u, l, a = g.store.proxy, lx = {}, map = new Ext.util.HashMap();
		function getMap() {
			var i, f, fs = g.store.proxy.reader.getFields();
			for (i in fs) {
				f = fs[i];
				map.add(f.name, f.type ? f.type.type : '');
			}
		}
		function getMeta(result, cs) {
			var i, c, x;
			for (i in cs) {
				c = cs[i];
				if (preview && c.hidden)
					continue;
				if (c.type == 'rowNumber') {
					p.xwl_numText = c.text == '&#160;' ? '' : c.text;
					p.xwl_numWidth = c.width;
				} else {
					x = {
						align : c.align,
						dataIndex : c.dataIndex,
						format : c.excelFormat,
						ptFormat : c.printFormat,
						jsFormat : c.format,
						type : map.get(c.dataIndex),
						width : c.width,
						hidden : c.hidden,
						headerAlign : c.headerAlign,
						wrap : c.autoWrap,
						text : c.text == '&#160;' ? '' : c.text
					};
					if (c.keyName)
						lx[c.dataIndex] = c.keyName;
					if (c.items && c.items.length > 0) {
						x.columns = [];
						getMeta(x.columns, c.items.items);
					}
					result.push(x);
				}
			}
			return result;
		}
		u = g.store.proxy.reader.rawData;
		if (!u)
			return;
		u = u.returnResult;
		if (u !== undefined) {
			Wb.message(Str.result + ": " + u);
			return;
		}
		Ext.apply(p, a.allParams);
		p.xwl_url = a.url || a.api.read;
		p.xwl_dateformat = Ext.form.field.Date.prototype.format;
		p.xwl_timeformat = Ext.form.field.Time.prototype.format;
		p.xwl_thousandSeparator = Ext.util.Format.thousandSeparator;
		p.xwl_decimalSeparator = Ext.util.Format.decimalSeparator;
		p.xwl_sheet = g.exportSheetname;
		if (g.exportTitle == '-')
			p.xwl_title = '';
		else
			p.xwl_title = g.exportTitle || g.title;
		p.xwl_file = g.exportFilename || p.xwl_title;
		p.xwl_feature = g.featureType;
		l = g.store.groupers.items;
		p.xwl_group = l.length > 0 ? l[0].property : '';
		getMap();
		p.xwl_meta = Wb.encode(getMeta(m, g.columns));
		p.__keyMap = Wb.encode(lx);
		if (isAll) {
			p.start = 0;
			p.limit = Wb.maxInt;
		}
		if (preview)
			Wb.submit('main?xwl=preview', p);
		else
			Wb.download('main?xwl=download', p);
	},
	getPagingBar : function(o, g, e, u, q, w) {
		var x, y, ls, n;
		if (o instanceof Ext.grid.Panel) {
			x = o.getDockedItems('pagingtoolbar');
			if (x.length > 0)
				return x[0];
			else
				return null;
		}
		y = o && o.pageSize >= Wb.maxInt || o && o.buffered;
		x = [];
		if (q)
			x.push( {
				iconCls : "printer_icon",
				tooltip : Str.printCurrent,
				xtype : "splitbutton",
				handler : function() {
					Wb.getExcel(g, false, true);
				},
				menu : {
					xtype : "menu",
					items : [ {
						iconCls : 'printer_icon',
						text : Str.printAll,
						handler : function() {
							Wb.getExcel(g, true, true);
						}
					} ]
				}
			});
		if (e)
			x.push( {
				iconCls : "excel_icon",
				tooltip : Str.expCurToExcel,
				xtype : "splitbutton",
				handler : function() {
					Wb.getExcel(g, false);
				},
				menu : {
					xtype : "menu",
					items : [ {
						iconCls : 'excel_icon',
						text : Str.expAllToExcel,
						handler : function() {
							Wb.getExcel(g, true);
						}
					} ]
				}
			});
		if (!y && u) {
			ls = {
				click : function(v) {
					n = Wb.find(g);
					if (n.store) {
						n.store.pageSize = parseInt(v.text, 10);
						Wb.load(n.store);
					}
				}
			};
			x.push( {
				iconCls : "page_icon",
				tooltip : Str.recordPerPage,
				menu : {
					xtype : "menu",
					minWidth : 80,
					listeners : {
						show : function(m) {
							if (o) {
								var i = [ 10, 25, 50, 100, 200 ];
								i = Wb.indexOf(i, o.pageSize);
								if (i == -1)
									Wb.uncheck(m);
								else
									m.items.items[i].setChecked(true);
							}
						}
					},
					items : [ {
						group : "page",
						checked : false,
						text : "10",
						listeners : ls
					}, {
						group : "page",
						checked : true,
						text : "25",
						listeners : ls
					}, {
						group : "page",
						checked : false,
						text : "50",
						listeners : ls
					}, {
						group : "page",
						checked : false,
						text : "100",
						listeners : ls
					}, {
						group : "page",
						checked : false,
						text : "200",
						listeners : ls
					}]
				}
			});
		}
		return {
			xtype : 'pagingtoolbar',
			displayInfo : w,
			store : o,
			items : x,
			listeners : {
				render : function() {
					if (y) {
						var h = this.items.items, i, j = h.length;
						for (i = 0; i < 10; i++)
							h[i].setVisible(false);
						if (o && o.buffered) {
							h[13].setVisible(false);
							h[14].setVisible(false);
						}
					}
				}
			}
		};
	},
	uncheck : function(menu) {
		if (menu.items.length > 0) {
			menu.items.items[0].setChecked(true);
			menu.items.items[0].setChecked(false);
		}
	},
	getNode : function(el) {
		if (el.boundView) {
			var s = Wb.get(el.boundView).getTreeStore();
			return s.getNodeById(el.viewRecordId)
		} else
			return null;
	},
	getDropedNode : function(el, pos) {
		var n = Wb.getNode(el), r;
		if (pos == 'before')
			r = n.previousSibling;
		else if (pos == 'after')
			r = n.nextSibling;
		else
			r = n.lastChild;
		return r;
	},
	indexOf : function(val, s) {
		if (Ext.isEmpty(val))
			return -1;
		var list, i, j;
		if (Ext.isArray(val))
			list = val;
		else
			list = val.split(',');
		j = list.length;
		for (i = 0; i < j; i++)
			if (list[i] === s)
				return i;
		return -1;
	},
	getNamePart : function(s) {
		if (s == null)
			return '';
		var i = s.indexOf('=');

		if (i == -1)
			return s;
		else
			return s.substring(0, i);
	},
	getValuePart : function(s) {
		if (s == null)
			return '';
		var i = s.indexOf('=');

		if (i == -1)
			return '';
		else
			return s.substring(i + 1);
	},
	login : function(hasVC) {
		if (Wd.xwlw__x) {
			Wd.xwlw__x.hasVC = hasVC;
			xwlw__x.win.show();
			return;
		}
		Wd.xwlw__x = {
			hasVC : hasVC
		};
		var x = Wd.xwlw__x, o;
		x.changeVC = function() {
			o = xwlw__x_img;
			if (o.isVisible())
				o.setSrc('main?xwl=13MC0NFI4FRE&' + Wb.getId());
		}
		x.win = new Ext.window.Window(
				{
					width : 405,
					closeAction : 'hide',
					buttons : [
							{
								id : 'xwlw__x_lb',
								text : Str.login,
								iconCls : 'accept_icon',
								xtype : 'button',
								listeners : {
									click : function() {
										if (!Wb.verify(x.win))
											return;
										Wb
												.request( {
													params : {
														username : xwlw__x_user
																.getValue(),
														password : xwlw__x_pwd
																.getValue(),
														verifyCode : xwlw__x_vc
																.getValue()
													},
													url : 'main?xwl=13MC0NFI4FQE',
													failure : function(
															response, options) {
														x.changeVC();
													},
													failureConfirm : function(r) {
														var s = Wb
																.optString(r.responseText);
														if (s
																.indexOf(Str.invalidVc) != -1)
															xwlw__x_vc.focus(
																	true, true);
														else if (s
																.indexOf(Str.invalidPwd) != -1)
															xwlw__x_pwd.focus(
																	true, true);
														else
															xwlw__x_user.focus(
																	true, true);
													},
													success : function() {
														Wb
																.setCookie(
																		'wb.pt.user',
																		xwlw__x_user
																				.getValue());
														x.win.hide();
													}
												});
									}
								}
							}, {
								text : Str.reset,
								iconCls : 'refresh_icon',
								xtype : 'button',
								listeners : {
									click : function() {
										Wb.reset(x.win);
										xwlw__x_user.focus(false, true);
									}
								}
							} ],
					iconCls : 'key_icon',
					autoShow : false,
					title : Str.login,
					height : 247,
					layout : 'absolute',
					buttonAlign : 'center',
					listeners : {
						beforeshow : function(w) {
							var f = x.hasVC;
							xwlw__x_vl.setVisible(f);
							xwlw__x_vc.setVisible(f);
							if (f)
								xwlw__x_img
										.setSrc('main?xwl=13MC0NFI4FRE&' + Wb
												.getId());
							xwlw__x_img.setVisible(f);
							xwlw__x_rfl.setVisible(f);
							w.setHeight(f ? 247 : 220);
						},
						render : function(w) {
							Wb.monEnter(w, function() {
								xwlw__x_lb.fireEvent('click');
							});
						},
						show : function() {
							var u = xwlw__x_user, f = Wb
									.getCookie('wb.pt.user');
							if (Wb.isEmpty(f))
								u.focus(false, 103);
							else {
								u.setValue(f);
								xwlw__x_pwd.focus(false, 103);
							}
						},
						hide : function(w) {
							Wb.reset(w)
						}
					},
					items : [
							{
								src : 'lincase/images/app/key.gif',
								y : 18,
								x : 64,
								xtype : 'image',
								width : 48,
								height : 48
							},
							{
								text : Str.enterLogin,
								width : 200,
								x : 128,
								xtype : 'label',
								y : 32 + 4
							},
							{
								text : Str.username + ':',
								width : 112,
								x : 8,
								xtype : 'label',
								y : 80 + 4,
								style : 'text-align:right'
							},
							{
								id : 'xwlw__x_user',
								allowBlank : false,
								width : 224,
								y : 80,
								x : 128,
								xtype : 'textfield'
							},
							{
								text : Str.password + ':',
								width : 112,
								x : 8,
								xtype : 'label',
								y : 112 + 4,
								style : 'text-align:right'
							},
							{
								id : 'xwlw__x_pwd',
								allowBlank : false,
								inputType : 'password',
								width : 224,
								y : 112,
								x : 128,
								xtype : 'textfield'
							},
							{
								id : 'xwlw__x_vl',
								text : Str.verifyCode + ':',
								width : 112,
								x : 8,
								xtype : 'label',
								y : 144 + 4,
								style : 'text-align:right'
							},
							{
								id : 'xwlw__x_vc',
								maxLength : 5,
								allowBlank : false,
								minLength : 5,
								width : 64,
								y : 144,
								x : 128,
								xtype : 'textfield'
							},
							{
								id : 'xwlw__x_img',
								y : 145,
								x : 196,
								xtype : 'image',
								width : 90,
								height : 20
							},
							{
								id : 'xwlw__x_rfl',
								width : 56,
								html : '<a href="javascript:xwlw__x.changeVC()">' + Str.change + '</a>',
								x : 296,
								xtype : 'label',
								y : 144 + 4
							} ]
				});
		x.win.items.each(function(c) {
			Wd[c.id] = c;
		});
		x.win.show();
	},
	message : function(s, handler, t) {
		if (Wb.touchMode)
			Ext.Msg.show( {
				title : Str.information,
				message : s,
				buttons : Ext.MessageBox.OK,
				fn : handler,
				iconCls : Ext.MessageBox.INFO
			});
		else
			Ext.Msg.show( {
				title : Str.information,
				msg : s,
				buttons : Ext.Msg.OK,
				fn : handler,
				icon : Ext.MessageBox.INFO,
				animateTarget : t
			});
	},
	warning : function(s, handler, t) {
		if (Wb.touchMode)
			Ext.Msg.show( {
				title : Str.warning,
				message : s,
				buttons : Ext.MessageBox.OK,
				fn : handler,
				iconCls : Ext.MessageBox.WARNING
			});
		else
			Ext.Msg.show( {
				title : Str.warning,
				msg : s,
				buttons : Ext.Msg.OK,
				fn : handler,
				icon : Ext.MessageBox.WARNING,
				animateTarget : t
			});
	},
	error : function(s, handler, t) {
		if (Wb.touchMode)
			Ext.Msg.show( {
				title : Str.error,
				message : s,
				buttons : Ext.MessageBox.OK,
				fn : handler,
				iconCls : Ext.MessageBox.ERROR
			});
		else
			Ext.Msg.show( {
				title : Str.error,
				msg : s,
				buttons : Ext.Msg.OK,
				fn : handler,
				icon : Ext.MessageBox.ERROR,
				animateTarget : t
			});
	},
	except : function(s, handler, t) {
		var m, i, j;
		if (Wb.isEmpty(s))
			m = Str.serverNotResp;
		else {
			i = s.indexOf('xwle__start');
			if (i > 0) {
				j = s.indexOf('xwle__end');
				m = s.substring(i + 18, j - 27);
			} else {
				i = s.indexOf('xwlw__login');
				if (i != -1) {
					if (Wb.touchMode)
						Wb.submit('main?xwl=tlogin', {
							xwlhref : Wb.encode(window.location.href)
						}, '_self');
					else
						Wb.login(s.indexOf('xwlw__needLV=true') != -1);
					return;
				} else
					m = s;
			}
		}
		Wb.error(m, handler, t);
	},
	confirm : function(s, handler, p1, p2) {
		if (Wb.touchMode)
			Ext.Msg.show( {
				title : Str.confirm,
				message : s,
				buttons : Ext.MessageBox.OKCANCEL,
				iconCls : Ext.MessageBox.QUESTION,
				fn : function(b) {
					if (b == 'ok')
						handler();
				}
			});
		else {
			if (s instanceof Ext.grid.Panel)
				Wb.confirmGrid(s, handler, p1, p2);
			else
				Ext.Msg.show( {
					title : Str.confirm,
					msg : s,
					buttons : Ext.Msg.OKCANCEL,
					icon : Ext.MessageBox.QUESTION,
					animateTarget : p1,
					fn : function(b) {
						if (b == 'ok')
							handler();
					}
				});
		}
	},
	confirmGrid : function(grid, handler, key, action) {
		var r = Wb.getSelRec(grid), j = r.length, s;
		if (j == 0) {
			Wb.warning(Str.selValid);
			return;
		}
		if (action == null)
			action = Str.deleteStr.toLowerCase();
		if (j == 1 && key)
			s = Wb.format(Str.actionConfirm, action, r[0].get(key));
		else
			s = Wb.format(Str.actionSelConfirm, action, j);
		Wb.confirm(s, handler);
	},
	choose : function(s, handler, t) {
		if (Wb.touchMode)
			Ext.Msg.show( {
				title : Str.confirm,
				message : s,
				buttons : Ext.MessageBox.YESNOCANCEL,
				fn : handler,
				iconCls : Ext.MessageBox.QUESTION
			});
		else
			Ext.Msg.show( {
				title : Str.confirm,
				msg : s,
				buttons : Ext.Msg.YESNOCANCEL,
				fn : handler,
				icon : Ext.MessageBox.QUESTION,
				animateTarget : t
			});
	},
	wait : function(m, t) {
		Ext.Msg.show( {
			msg : m || Str.processing,
			width : 300,
			wait : true,
			waitConfig : {
				interval : 500
			},
			animateTarget : t
		});
	},
	progress : function(i, m, t) {
		if (i == 0)
			Ext.Msg.show( {
				msg : m || Str.processing,
				progressText : '0%',
				width : 300,
				progress : true,
				closable : false,
				animateTarget : t
			});
		else
			Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '%');
	},
	focus : function(comp, cb) {
		setTimeout(function() {
			if (comp.win && !comp.sourceEditMode)
				comp.getWin().focus();
			else
				comp.textareaEl.focus();
			comp.activated = true;
			if (cb)
				cb();
		}, 50);
	},
	setModified : function(obj) {
		if (!obj.isModified) {
			obj.isModified = true;
			obj.setTitle('*' + obj.title);
		}
	},
	delModified : function(obj) {
		if (obj.isModified) {
			obj.isModified = false;
			obj.setTitle(obj.title.substring(1));
		}
	},
	optString : function(s) {
		if (Wb.isEmpty(s))
			return '';
		else
			return s;
	},
	optNum : function(s) {
		return parseFloat(s) || 0;
	},
	mask : function(obj, msg) {
		var m = msg || Str.processing;
		if (Wb.touchMode) {
			if (!Ext.Viewport.maskCount) {
				Ext.Viewport.mask( {
					xtype : 'loadmask',
					indicator : true,
					message : m
				});
				Ext.Viewport.maskCount = 0;
			}
			Ext.Viewport.maskCount++;
		} else {
			if (obj = Wb.find(obj)) {
				obj = obj.el;
				if (!obj.maskCount) {
					obj.mask(m);
					obj.maskCount = 0;
				}
			} else {
				obj = Ext.getBody();
				if (!obj.maskCount) {
					m = obj.mask(m);
					obj.maskCount = 0;
					if (m.getWidth() == 0 || m.getHeight() == 0) {
						m.dom.style.width = '100%';
						m.dom.style.height = '100%';
					}
					m.setStyle('zIndex', 90000);
					m.next().setStyle('zIndex', 90001);
				}
			}
			obj.maskCount++;
		}
	},
	maskBody : function(msg) {
		Wb.mask(null, msg);
	},
	unmask : function(obj) {
		if (Wb.touchMode) {
			if (Ext.Viewport.maskCount)
				Ext.Viewport.maskCount--;
			if (!Ext.Viewport.maskCount)
				Ext.Viewport.unmask();
		} else {
			if (obj)
				obj = Wb.find(obj).el;
			else
				obj = Ext.getBody();
			if (obj.maskCount)
				obj.maskCount--;
			if (!obj.maskCount)
				obj.unmask();
		}
	},
	isEditor : function(dom) {
		return dom.tagName == 'INPUT'
				&& (dom.type == 'text' || dom.type == 'password')
				|| dom.tagName == 'TEXTAREA';
	},
	getRootNode : function(node) {
		var n = node;

		while (n.getDepth() > 0)
			n = n.parentNode;
		return n;
	},
	verifyName : function(name) {
		var c, i, j = name.length;
		for (i = 0; i < j; i++) {
			c = name.charAt(i);
			if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '_' || i > 0
					&& (c >= '0' && c <= '9')))
				return Wb.format(Str.invalidName, name);
		}
		return true;
	},
	getVerifyFunc : function(key, type) {
		return function(v) {
			var k = key, t = type, i, j = k.length;
			if (t)
				t = Str.invalidName;
			else
				t = Str.invalidValue;
			for (i = 0; i < j; i++) {
				if (v.indexOf(k[i]) != -1)
					return Wb.format(t, v);
			}
			return true;
		}
	},
	isAcross : function(src, dst) {
		var i, j = src.length;
		var k, l = dst.length;

		for (i = 0; i < j; i++) {
			if (!Wb.isEmpty(src[i]))
				for (k = 0; k < l; k++) {
					if (src[i] == dst[k])
						return true;
				}
		}
		return false;
	},
	toItemId : function(obj, s) {
		if (obj.id)
			delete obj.id;
		else
			return obj;
		if (s)
			obj.itemId = s;
		function convert(o) {
			var i, x;
			if (o.items) {
				for (i in o.items) {
					x = o.items[i];
					x.itemId = x.id;
					delete x.id;
					convert(x);
				}
			}
		}
		convert(obj);
		return obj;
	},
	setDDText : function(tree, text) {
		tree.getPlugin('ddPlug').dragZone.dragText = text;
	},
	getIconCls : function(p, h) {
		if (Wb.isEmpty(h))
			h = '';
		else
			h = ' title="' + h + '"';
		return '<img class="wb_icon ' + p
				+ '" src="js/index/lincase/images/app/s.gif"' + h + '>';
	},
	getIcon : function(p, h) {
		if (Wb.isEmpty(h))
			h = '';
		else
			h = ' title="' + h + '"';
		return '<img class="wb_icon" src="' + p + '"' + h + '>';
	},
	dateRender : function(v) {
		if (v)
			return Wb.dateToStr(v,
					Ext.Date.format(v, 'Hisu') === '000000000' ? false : null);
		else
			return '';
	},
	timeRender : function(v) {
		if (v)
			return Wb.dateToStr(v, true);
		else
			return '';
	},
	downRender : function(f) {
		return function(a, b, c, d) {
			return Wb.isEmpty(a) ? '(blob)'
					: '<a href=\'javascript:downloadBlob("' + f + '",' + d
							+ ')\'>' + a + '</a>';
		};
	},
	winBtns : function() {
		return [ {
			text : Str.ok,
			iconCls : 'ok_icon',
			handler : Wb.okHandle
		}, {
			text : Str.cancel,
			iconCls : 'cancel_icon',
			handler : Wb.cancelHandle
		} ];
	},
	rd : function(v, m, w, f) {
		if (w)
			m.style = 'white-space:normal;';
		if (f) {
			var x = Ext.util.Format;
			if (f.indexOf('0') == -1)
				return x.date(v, f);
			else
				return x.number(v, f);
		} else if (Ext.isDate(v))
			return Wb.dateRender(v);
		return v === null ? '' : Ext.htmlEncode(v);
	},
	nr : function(a, b, c, d, e, f) {
		b.tdCls = 'x-grid-cell-special';
		var p = f.currentPage, n = c.get('__rowNum');
		if (n)
			return (p > 0 ? p - 1 : 0) * f.pageSize + n;
		else
			return f.indexOfTotal(c) + 1;
	},
	htmlRender : function(v) {
		return Ext.htmlEncode(v);
	},
	setCookie : function(k, n) {
		Ext.util.Cookies.set(k, n, Ext.Date.add(new Date(), Ext.Date.MONTH, 1));
	},
	getCookie : function(n) {
		return Ext.util.Cookies.get(n);
	},
	removeSel : function(a) {
		Wb.remove(a, false, true);
	},
	remove : function(a, b, c) {
		if (!a)
			return;
		var i, j, k, x, y;
		if (a instanceof Ext.grid.Panel) {
			x = a.getSelectionModel();
			y = x.getSelection();
			j = a.store;
			i = j.indexOf(y[0]);
			if (b)
				j.removeAll();
			else
				j.remove(y);
			k = j.getCount() - 1;
			if (i > k)
				i = k;
			//if (i > -1)
			//	a.getView().select(i);
			if (!c)
				Wb.refresh(a, y.length * -1);
		} else {
			j = a.length;
			for (i = j - 1; i >= 0; i--)
				if (a[i] && (a[i] === b || c && a[i][c] === b[c]))
					a.splice(i, 1);
		}
	},
	showNavMenu : function(s, d, b) {
		var c, t, x, y, o, m;
		if (!s.tabItems)
			return;
		if (b)
			o = s;
		else
			o = d;
		s.menu = s.saveMenu;
		if (!s.menu)
			s.menu = Ext.create('Ext.menu.Menu');
		s.menu.removeAll();
		y = s.tabItems.length;
		for (x = y - 1; x >= 0; x--) {
			t = s.tabItems[x];
			m = t instanceof Ext.data.Model;
			if (m) {
				c = t.get('iconCls');
				if (!t.isLeaf())
					c = 'folder_icon';
			} else
				c = t.iconCls;
			s.menu.add( {
				text : m ? t.get('text') : t.title,
				handler : function(p) {
					var i, j = s.saveMenu.items.indexOf(p) + 1, r;
					if (!d.tabItems)
						d.tabItems = [];
					r = d.tabItems;
					r.push(o.saveLastTab);
					for (i = 0; i < j; i++)
						r.push(s.tabItems.pop());
					r.pop();
					while (r.length > 10)
						r.shift();
					o.stopRecNav = true;
					if (m)
						p.tabItem.ownerTree.getView().select(p.tabItem);
					else
						Wb.show(p.tabItem);
					o.stopRecNav = false;
					o.saveLastTab = p.tabItem;
				},
				tabItem : t,
				iconCls : c
			});
		}
		s.showMenu();
		s.saveMenu = s.menu;
		s.menu = null;
		delete s.menu;
	},
	closeNav : function(s, d, p) {
		p.stopRecNav = true;
		Wb.remove(s.tabItems, p, 'id');
		Wb.remove(d.tabItems, p, 'id');
	},
	clearNav : function(s, d) {
		s.tabItems = [];
		d.tabItems = [];
	},
	recNav : function(n, o, b) {
		b.tbChanged = true;
		if (!n || !o || b.stopRecNav || o.stopRecNav)
			return;
		b.saveLastTab = n;
		if (!b.tabItems)
			b.tabItems = [];
		var l = b.tabItems;
		if (l.length > 9)
			l.shift();
		l.push(o);
	},
	navBack : function(b, f) {
		b.tbChanged = false;
		Wb.navBackOn(b, f);
		if (!b.tbChanged)
			Wb.navBackOn(b, f);
	},
	navFwd : function(b, f) {
		b.tbChanged = false;
		Wb.navFwdOn(b, f);
		if (!b.tbChanged)
			Wb.navFwdOn(b, f);
	},
	navBackOn : function(b, f) {
		var r = b.tabItems, t, x;
		if (!r || r.length == 0)
			return;
		t = r.pop();
		if (!f.tabItems)
			f.tabItems = [];
		x = f.tabItems;
		if (x.length > 9)
			x.shift();
		x.push(b.saveLastTab);
		b.stopRecNav = true;
		if (t instanceof Ext.data.Model)
			t.ownerTree.getView().select(t);
		else
			Wb.show(t);
		b.stopRecNav = false;
		b.saveLastTab = t;
	},
	navFwdOn : function(b, f) {
		var r = f.tabItems, t, x;
		if (!r || r.length == 0)
			return;
		t = r.pop();
		x = b.tabItems;
		if (x.length > 9)
			x.shift();
		x.push(b.saveLastTab);
		b.stopRecNav = true;
		if (t instanceof Ext.data.Model)
			t.ownerTree.getView().select(t);
		else
			Wb.show(t);
		b.stopRecNav = false;
		b.saveLastTab = t;
	},
	setStore : function(store) {
		if (Wb.touchMode) {
			if (store.isLoading())
				return false;
			store.getProxy().setExtraParams(
					Ext.apply( {}, store.params, Wb.getValue(store.output)));
		} else {
			if (!(store instanceof Ext.data.TreeStore) && store.isLoading())
				return false;
			Ext.apply(store.proxy.extraParams, store.params, Wb
					.getValue(store.output));
		}
		return true;
	},
	loadPage : function(s, i, p) {
		if (s) {
			if (p) {
				if (!s.params)
					s.params = {};
				Ext.apply(s.params, p);
			}
			s.loadPage(i);
		}
	},
	load : function(s, p) {
		Wb.loadPage(s, 1, p);
	},
	reload : function(s, p) {
		setTimeout(function(){
			Wb.loadPage(s, s.currentPage, p);
		}, 800);
	},
	mapKey : function(v, r) {
		var i;
		for (i in r)
			if (r[i][0] == v)
				return r[i][1];
		return v;
	},
	verifyObj : function(obj, firstObj) {
		var con = firstObj, o;

		if (obj instanceof Ext.form.field.Base && !obj.hidden && !obj.disabled
				&& !obj.validate() && !con)
			con = obj;
		if ((obj instanceof Ext.container.AbstractContainer)
				&& !(obj instanceof Ext.form.CheckboxGroup)) {
			obj.items.each(function(c) {
				o = Wb.verifyObj(c, con);
				if (o && !con)
					con = o;
			});
		}
		return con;
	},
	show : function(o) {
		var x = o, y = o, b = [];
		while (x = x.ownerCt) {
			if (x instanceof Ext.tab.Panel)
				b.push(y);
			y = x;
		}
		while (x = b.pop()) {
			x.ownerCt.setActiveTab(x);
		}
	},
	verify : function(objects) {
		var list = Wb.getList(objects), c, i, j = list.length, con = null;
		for (i = 0; i < j; i++) {
			c = Wb.verifyObj(list[i], null);
			if (c && !con)
				con = c;
		}
		if (con) {
			Wb.show(con);
			con.focus(true, true);
			return false;
		} else
			return true;
	},
	okHandle : function() {
		var w = this.up('window');
		if (w.okHandler)
			w.okHandler(w);
	},
	cancelHandle : function() {
		var w = this.up('window');
		if (w.closeAction == 'hide')
			w.hide();
		else
			w.close();
	},
	toBottom : function(panel) {
		panel.body.dom.scrollTop = panel.body.dom.scrollHeight;
	},
	monEnter : function(obj, fn) {
		if (obj.okHandler || fn) {
			var k = obj.getKeyMap(), t;
			k.on(13, function() {
				if (obj.el.isMasked() || Ext.getBody().isMasked())
					return;
				t = Ext.EventObject.target;
				if (t && t.type == 'textarea')
					return;
				if (fn)
					fn(obj);
				else
					obj.okHandler(obj)
				Ext.EventObject.stopEvent();
			});
		}
	},
	strToDate : function(s) {
		if (s.indexOf('.') == -1)
			return Ext.Date.parse(s, 'Y-m-d H:i:s');
		else
			return Ext.Date.parse(s, Wb.dateFormat);
	},
	toString : function(o) {
		if (o)
			return Ext.Date.format(o, Wb.dateFormat);
		else
			return '';
	},
	dateToStr : function(dt, hasTime) {
		if (Wb.isEmpty(dt))
			return '';
		var f = Ext.form.field.Date.prototype.format, t = Ext.form.field.Time.prototype.format;
		if (hasTime === true)
			f = t;
		else if (hasTime !== false)
			f += ' ' + t;
		if (!Ext.isDate(dt))
			dt = Wb.strToDate(dt);
		return Ext.Date.format(dt, f);
	},
	delNodeConfirm : function(tree, handle, noRoot) {
		var n = Wb.getSelNode(tree);
		if (n && (!noRoot || n != tree.getRootNode()))
			Wb.confirm(Wb.format(Str.delConfirm, n.get('text')), handle);
		else
			Wb.warning(Str.selValid);
	},
	delSelNode : function(tree) {
		var n = Wb.getSelNode(tree);
		if (n) {
			if (n.nextSibling)
				tree.view.select(n.nextSibling);
			else if (n.previousSibling)
				tree.view.select(n.previousSibling);
			else if (n.getDepth() > 0
					&& (n.rootVisible || n.parentNode != tree.getRootNode()))
				tree.view.select(n.parentNode);
			else
				tree.selModel.deselectAll();
			n.remove();
		}
	},
	getSelNode : function(tree, retRoot) {
		var n = tree.getSelectionModel().getSelection();
		if (n && n.length > 0)
			return n[0];
		return retRoot ? tree.getRootNode() : null;
	},
	getSelRec : function(grid) {
		return grid.getSelectionModel().getSelection();
	},
	saveNodePos : function(node) {
		node.savePos = {
			p : node.parentNode,
			s : node.nextSibling
		};
	},
	revertNodePos : function(node) {
		var pos = node.savePos;
		if (pos.s)
			pos.p.insertBefore(node, pos.s);
		else
			pos.p.appendChild(node);
	},
	sort : function(o) {
		o.sort(function(v1, v2) {
			if (Ext.isString(v1) && Ext.isString(v2))
				return v1.toUpperCase().localeCompare(v2.toUpperCase());
			else
				return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
		});
		return o;
	},
	setTitle : function(w, t) {
		var s = w.title, i = s.indexOf(' - ');
		if (i != -1)
			s = s.substring(0, i);
		if (Wb.isEmpty(t))
			w.setTitle(s);
		else
			w.setTitle(s + ' - ' + t);
	},
	ellipsis : function(text, isHtml) {
		var c, i, j = text.length, k = 0, l = 0, s;

		for (i = 0; i < j; i++) {
			c = text.charCodeAt(i);
			if (c < 128)
				k++;
			else
				k += 2;
			l++;
			if (k > 20)
				break;
		}
		s = l > j - 4 ? text : (text.substring(0, l) + '...');
		if (isHtml)
			return Ext.htmlEncode(s);
		else
			return s;
	},
	open : function(url, title, iconCls, params, type) {
		var p = window, t = window.top;
		while (p != t && !p.WBXwlOpen) {
			p = p.parent;
		}
		if (p && p.WBXwlOpen && !Wb.isEmpty(title))
			p.WBXwlOpen(url, title, iconCls, params, type);
		else
			Wb.submit(url, params, null, type);
	},
	isLogout : function() {
		var f = window.top;
		return f && f.Pt && f.Pt.canLogout;
	},
	print : function(s) {
		var p = Wd, t = p.top;
		while (p != t && !p.WBXwlPrint) {
			p = p.parent;
		}
		if (p && p.WBXwlPrint)
			p.WBXwlPrint(s);
	},
	println : function(s) {
		Wb.print(s + '\n');
	},
	getList : function(objects) {
		var list = [];
		if (Ext.isArray(objects))
			list = objects;
		else if (Ext.isObject(objects))
			list.push(objects);
		else {
			var n, items = objects.split(',');
			for (n in items)
				list.push(Wb.get(Ext.String.trim(items[n])));
		}
		return list;
	},
	getId : function() {
		if (Wb.id === 0)
			Wb.id = (new Date()).getTime();
		return Wb.id++;
	},
	request : function(obj, moreParams) {
		var f, r = {}, m = obj.showResult, k = obj.showMask !== false, s = obj.scope
				|| window;
		if (obj.beforerequest && obj.beforerequest.call(s, obj) === false)
			return;
		Ext.copyTo(r, obj, [ 'async', 'disableCaching', 'headers', 'jsonData',
				'scope', 'url', 'withCredentials' ]);
		r.method = obj.method || 'POST';
		if (obj.form) {
			r.form = Wb.get(obj.form).getForm();
			r.isUpload = true;
		}
		r.params = Ext.apply( {}, moreParams);
		Ext.apply(r.params, obj.params, Wb.getValue(obj.output));
		if (obj.timeout === -1)
			r.timeout = Wb.maxInt;
		else if (obj.timeout)
			r.timeout = obj.timeout;
		r.callback = function(a, b, c) {
			if (k)
				Wb.unmask(obj.mask);
			if (obj.callback)
				obj.callback.call(s, a, b, c);
			if (b) {
				if (obj.input)
					Wb.setValue(Wb.decode(c.responseText));
				if (obj.success)
					obj.success.call(s, c, a);
				if (m || obj.result)
					Wb.message(obj.result || Str.operCompleted, function() {
						f = obj.successConfirm;
						if (f)
							f.call(s, c, a);
					});
			} else {
				if (obj.failure)
					obj.failure.call(s, c, a);
				if (m !== false)
					Wb.except(c.responseText, function() {
						f = obj.failureConfirm;
						if (f)
							f.call(s, c, a);
					});
			}
		}
		if (k)
			Wb.mask(obj.mask, obj.message);
		obj.ajaxObject = Ext.Ajax.request(r);
	},
	edit : function(grid, win, key, isText, prefix) {
		var b = grid instanceof Ext.grid.Panel, w;
		if (key && b) {
			w = win;
			var r = Wb.getSelRec(grid), l = grid.store.model.prototype.fields, v = {};
			if (r.length != 1) {
				Wb.warning(Str.selRec);
				return;
			}
			r = r[0];
			grid.selRec = r;
			l.each(function(t) {
				v[t.name] = r.get(t.name);
			});
			Wb.setValue(v, false, prefix);
			w.setTitle(isText ? key : (Str.edit + ' - ' + v[key]));
		} else {
			if (b)
				w = win;
			else
				w = grid;
			w.setTitle(Str.newStr);
		}
		w.isNew = key == null;
		w.show();
	},
	setButton : function(btn) {
		var e = Ext.fly(btn.id + '-btnEl');
		if (e) {
			if (btn.bgImage)
				e.setStyle('background-image', 'url("' + btn.bgImage + '")');
			else
				e.setStyle('background-image', 'none');
			if (btn.bgColor)
				e.setStyle('background-color', btn.bgColor);
		}
	},
	convert : function(v) {
		if (Wb.isEmpty(v))
			return '';
		else if (Ext.isBoolean(v))
			return v ? 1 : 0;
		else if (Ext.isDate(v))
			return Ext.Date.toString(v);
		else if (Ext.isFunction(v))
			return Wb.convert(v());
		else if (Ext.isObject(v) || Ext.isArray(v))
			return Wb.encode(v);
		else
			return v;
	},
	save : function(o, e) {
		var s = e || o.getValue(), d = o.displayField, v = o.valueField, r, t = o.store, x = {};

		if (!s)
			return;
		t.clearFilter();
		r = o.findRecord(d || v, s);
		if (r)
			t.remove(r);
		if (d)
			x[d] = s;
		if (v && v !== d)
			x[v] = s;
		t.insert(0, x);
		if (t.getCount() > 100)
			t.removeAt(100);
		o.collapse();
	},
	like : function(event) {
		var t, b = event.combo, s = event.query, k = b.displayField
				|| b.valueField;
		s = Wb.lower(s);
		b.store.filterBy(function(r) {
			return Wb.lower(r.get(k)).indexOf(s) != -1;
		});
		if (b.store.getCount() > 0) {
			b.expand();
			b.doAutoSelect();
		} else
			b.collapse();
		return false;
	},
	reportError : function(a, b) {
		try {
			var s, d = b.contentWindow.document || b.contentDocument
					|| window.frames[b.id].document;
			if (d) {
				if (d.body) {
					s = Wb.decode(d.body.innerHTML);
					if (!s.success)
						Wb.except(Ext.htmlDecode(s.value));
				}
			}
		} catch (e) {
			Wb.error(Str.serverNotResp);
		}
	},
	getFrame : function() {
		if (!Wb.frame) {
			var fr = document.createElement('iframe'), id = 'xf_' + Wb.getId();
			Ext.fly(fr).set( {
				id : id,
				name : id,
				cls : Ext.baseCSSPrefix + 'hide-display',
				src : Ext.SSL_SECURE_URL
			});
			document.body.appendChild(fr);
			if (document.frames)
				document.frames[id].name = id;
			Ext.fly(fr).on('load', Wb.reportError);
			Wb.frame = fr;
		}
		return Wb.frame;
	},
	getForm : function(params, isUpload) {
		var n, id = 'xwlgform', el, fm = Wb.dom(id);
		if (fm) {
			while (fm.childNodes.length !== 0)
				fm.removeChild(fm.childNodes[0]);
		} else {
			fm = document.createElement('FORM');
			fm.setAttribute('name', id);
			fm.setAttribute('id', id);
			document.body.appendChild(fm);
		}
		if (params) {
			for (n in params) {
				el = document.createElement('input');
				el.setAttribute('name', n);
				el.setAttribute('type', 'hidden');
				el.setAttribute('value', Wb.convert(params[n]));
				fm.appendChild(el);
			}
		}
		if (isUpload)
			fm.encoding = "multipart/form-data";
		else
			fm.encoding = "application/x-www-form-urlencoded";
		return fm;
	},
	getChart : function(chart) {
		Wb.download('main?xwl=13NUIG6TAFSD', {
			data : Ext.draw.engine.SvgExporter.self
					.generate( {}, chart.surface),
			file : 'chart.svg'
		}, true);
	},
	submit : function(url, params, target, type, isUpload) {
		var fm = Wb.getForm(params, isUpload);
		fm.action = url;
		fm.method = type || 'POST';
		fm.target = target || '_blank';
		fm.submit();
	},
	download : function(url, params, isUpload) {
		var fr = Wb.getFrame(), fm = Wb.getForm(params, isUpload);
		fm.action = url + '&_xwlfm=1';
		fm.method = 'POST';
		fm.target = fr.id;
		fm.submit();
	},
	upload : function(p, params) {
		var p = Wb.find(p), r = p.showResult, s, x, g, k = p.showMask !== false, se = r !== false, u = '', b;
		if (p.beforerequest && p.beforerequest.call(p, p) === false)
			return;
		if (p.showProgress) {
			k = false;
			Wb.progressId = Wb.getId();
			u = '&__uploadId=' + Wb.progressId;
			Wb.progress(0);
			Wb.progressTimer = setInterval(function() {
				if (b)
					return;
				b = 1;
				Ext.Ajax.request( {
					url : 'main?xwl=progress',
					timeout : 6000,
					params : {
						progressId : Wb.progressId
					},
					callback : function() {
						b = 0;
					},
					success : function(r) {
						if (Wb.progressTimer !== null) {
							g = Wb.decode(r.responseText).value;
							if (g > 0)
								Wb.progress(g);
						}
					}
				});
			}, 1000);
		}
		if (k)
			Wb.mask(p.maskControl, p.message);
		function hide() {
			if (p.showProgress) {
				if (Wb.progressTimer !== null) {
					clearInterval(Wb.progressTimer);
					Wb.progressTimer = null;
				}
			}
		}

		function dateItemToStr(obj) {
			var n;
			for (n in obj) {
				if (Ext.isDate(obj[n]))
					obj[n] = Wb.toString(obj[n]);
			}
			return obj;
		}

		p.getForm().submit(
				{
					params : dateItemToStr(Ext.apply(Ext.apply( {}, Wb
							.getValue(p), Wb.getValue(p.output)), p.params,
							params)),
					url : p.url + '&_xwlfm=1' + u,
					success : function(f, a) {
						hide();
						if (k)
							Wb.unmask(p.maskControl);
						if (r || p.result)
							Wb.message(p.result || Str.operCompleted);
						else if (p.showProgress)
							Ext.MessageBox.hide();
						x = p.success;
						if (a.result == null)
							Wb.warning(Str.serverNotResp);
						else if (x) {
							a.result.value = Ext.htmlDecode(a.result.value);
							x(f, a, a.result.value);
						}
					},
					failure : function(f, a) {
						hide();
						if (k)
							Wb.unmask(p.maskControl);
						if (se && !a.result) {
							Wb.error(Str.serverNotResp);
							return;
						}
						a.result.value = Ext.htmlDecode(a.result.value);
						s = a.result.value;
						if (se)
							Wb.except(s);
						else if (p.showProgress)
							Ext.MessageBox.hide();
						x = p.failure;
						if (x)
							x(f, a, s);
					}
				});
	},
	clearGrid : function(grid) {
		var g = Wb.find(grid), s = g.store;
		g.headerCt.removeAll();
		s.removeAll();
		s.sorters.clear();
	},
	setGrid : function(grid, store) {
		var g = Wb.find(grid);
		if (!g.columns || g.columns.length == 0)
			g.reconfigure(store, store.proxy.reader.rawData.columns);
	},
	getVal : function(object) {
		var id;
		if (Ext.isObject(object))
			id = object.id;
		else
			id = object;
		return Wb.getValue(object, true)[id];
	},
	getTouchValue : function(objects, cd, prefix) {
		if (Wb.isEmpty(objects))
			return {};
		var list, data = {}, n, id, v, t, u, itemId;
		function getObjVal(obj) {
			id = obj.id;
			itemId = obj._itemId;
			v = null;
			u = true;
			if (obj instanceof Ext.field.Radio)
				v = obj.getGroupValue();
			else if (obj instanceof Ext.field.Checkbox)
				v = obj.isChecked() ? 1 : 0;
			else if (obj instanceof Ext.field.Hidden)
				v = obj._xvalue;
			else if (obj instanceof Ext.dataview.DataView)
				v = Wb.encode(Wb.getRows(obj, obj.outputType === 'all'));
			else if (obj instanceof Ext.field.Select) {
				var record = obj.record;
				v = (record && record.isModel) ? record.get(obj
						.getDisplayField()) : '';
				if (id && id.indexOf('-') == -1)
					data[id + '_text'] = v;
				else if (itemId && itemId.indexOf('-') == -1)
					data[itemId + '_text'] = v;
				v = obj.getValue();
			} else if (obj instanceof Ext.field.Field)
				v = obj.getValue();
			else
				u = false;
			if (u) {
				if (id && id.indexOf('-') == -1)
					data[id] = v;
				else if (itemId && itemId.indexOf('-') == -1)
					data[itemId] = v;
			}
			if (!cd && (obj instanceof Ext.Container)) {
				obj.items.each(function(c) {
					getObjVal(c, data);
				});
			}
		}
		list = Wb.getList(objects)
		for (n in list)
			getObjVal(list[n], data);
		return Wb.delPrefix(data, prefix);
	},
	getValue : function(objects, cd, prefix) {
		if (Wb.touchMode)
			return Wb.getTouchValue(objects, cd, prefix);
		if (Wb.isEmpty(objects))
			return {};
		var list, data = {}, n, id, v, t, u, itemId, isCombo;
		function getObjVal(obj) {
			id = obj.id;
			itemId = obj.itemId;
			v = null;
			u = true;
			if (obj instanceof Ext.form.field.Checkbox)
				v = obj.getValue() ? 1 : 0;
			else if (obj instanceof Ext.form.CheckboxGroup)
				v = Wb.getIndex(obj);
			else if (obj instanceof Ext.form.field.Hidden)
				//v = obj.xvalue;
				v = obj.xvalue ? obj.xvalue : obj.getValue();
			else if (obj instanceof Ext.slider.Single)
				v = obj.getValue();
			else if (obj instanceof Ext.form.field.Base
					|| obj instanceof Ext.ux.form.field.DateTime
					|| obj instanceof Ext.form.field.HtmlEditor) {
				if (obj instanceof Ext.form.field.File)
					u = false;
				else {
					isCombo = obj instanceof Ext.form.field.ComboBox;
					if (isCombo) {
						if (obj.inputEl)
							v = obj.inputEl.dom.value;
						else
							v = '';
						if (id && id.indexOf('-') == -1)
							data[id + '_text'] = v;
						else if (itemId && itemId.indexOf('-') == -1)
							data[itemId + '_text'] = v;
					}
					if (obj.forceList && isCombo)
						v = Wb.getBindValue(obj,
								obj.inputEl ? obj.inputEl.dom.value : '');
					else
						v = obj.getValue();
				}
			} else if (obj instanceof Ext.grid.Panel)
				v = Wb.encode(Wb.getRows(obj, obj.outputType === 'all'));
			else
				u = false;
			if (u) {
				if (id && id.indexOf('-') == -1)
					data[id] = v;
				else if (itemId && itemId.indexOf('-') == -1)
					data[itemId] = v;
			}
			if (!cd && (obj instanceof Ext.container.AbstractContainer)
					&& !(obj instanceof Ext.form.FieldContainer)) {
				obj.items.each(function(c) {
					getObjVal(c, data);
				});
			}
		}
		list = Wb.getList(objects)
		for (n in list)
			getObjVal(list[n], data);
		return Wb.delPrefix(data, prefix);
	},
	setVal : function(obj, value) {
		var id, v = {};
		if (Ext.isObject(obj))
			id = obj.id;
		else
			id = obj;
		v[id] = value;
		Wb.setValue(v);
	},
	reset : function(objects) {
		Ext.suspendLayouts();
		try {
			var list = Wb.getList(objects), o, d, n, v;
			for (n in list) {
				o = list[n];
				if (o) {
					d = o.id;
					if (d) {
						v = {};
						v[d] = '';
						Wb.setValue(v, true);
						if (Wb.touchMode) {
							if (o instanceof Ext.Container) {
								o.items.each(function(c) {
									if (c.id && c.id.indexOf('-') == -1)
										Wb.reset(c);
								});
							}
						} else {
							if ((o instanceof Ext.container.AbstractContainer)
									&& !(o instanceof Ext.form.CheckboxGroup)) {
								o.items.each(function(c) {
									Wb.reset(c);
								});
							}
						}
					}
				}
			}
		} finally {
			Ext.resumeLayouts(true);
		}
	},
	setTouchValue : function(value, reset) {
		var n, v, obj;
		for (n in value) {
			obj = Wb.get(n);
			if (!obj)
				continue;
			v = value[n];
			if (obj instanceof Ext.field.Radio) {
				if (reset)
					obj.reset();
				else
					obj.setGroupValue(v);
			} else if (obj instanceof Ext.field.Checkbox) {
				if (reset)
					obj.reset();
				else
					obj.setChecked(v === 1 || v === true || v === 'on'
							|| v === '1');
			} else if (obj instanceof Ext.field.Hidden) {
				if (reset)
					obj._xvalue = null;
				else
					obj._xvalue = v;
			} else if (obj instanceof Ext.field.DatePicker) {
				if (reset)
					obj.reset();
				else {
					if (Wb.isEmpty(v))
						obj.setValue('');
					else {
						if (Ext.isString(v))
							v = Wb.strToDate(v);
						obj.setValue(v);
					}
				}
			} else if (obj instanceof Ext.dataview.DataView) {
				if (reset) {
					if (obj.getStore())
						obj.getStore().removeAll();
				}
			} else if (obj instanceof Ext.field.Field) {
				if (reset)
					obj.reset();
				else
					obj.setValue(v);
			}
		}
	},
	setValue : function(value, reset, prefix) {
		Ext.suspendLayouts();
		try {
			value = Wb.addPrefix(value, prefix);
			if (Wb.touchMode) {
				Wb.setTouchValue(value, reset)
				return;
			}
			var n, v, obj;
			for (n in value) {
				obj = Wb.get(n);
				if (!obj)
					continue;
				v = value[n];
				if (obj instanceof Ext.form.CheckboxGroup) {
					if (reset) {
						if (!(obj instanceof Ext.form.RadioGroup))
							Wb.setIndex(obj, null);
					} else
						Wb.setIndex(obj, v);
				} else if (obj instanceof Ext.form.field.Hidden) {
					if (reset)
						obj.xvalue = null;
					else
						obj.xvalue = v;
				} else if (obj instanceof Ext.slider.Single) {
					if (reset)
						obj.setValue(obj.minValue || 0);
					else
						obj.setValue(v);
				} else if (obj instanceof Ext.form.field.Checkbox) {
					if (reset)
						obj.reset();
					else
						obj.setValue(v === 1 || v === true || v === 'on'
								|| v === '1');
				} else if (obj instanceof Ext.form.field.Date
						|| obj instanceof Ext.form.field.Time
						|| obj instanceof Ext.ux.form.field.DateTime) {
					if (reset)
						obj.reset();
					else {
						if (Wb.isEmpty(v))
							obj.setValue('');
						else {
							if (Ext.isString(v))
								v = Wb.strToDate(v);
							obj.setValue(v);
						}
					}
				} else if (obj instanceof Ext.form.field.Base
						|| obj instanceof Ext.form.field.HtmlEditor) {
					if (reset)
						obj.reset();
					else {
						if (obj instanceof Ext.form.field.ComboBox){
  						if (obj.store) obj.store.clearFilter(true);
  						obj.setValue((v||v==0)?v+'':v);
						} else {
						  obj.setValue(v);
						}
					}
				} else if (obj instanceof Ext.grid.Panel) {
					if (reset && obj.store)
						obj.store.removeAll();
				} else if (obj instanceof Ext.tree.Panel) {
					if (reset)
						Wb.check(obj, false, false, true);
				}
			}
		} finally {
			Ext.resumeLayouts(true);
		}
	},
	getIndex : function(obj) {
		var a, b, i, j, k;
		if (obj instanceof Ext.grid.Panel) {
			a = obj.getSelectionModel().getSelection();
			if (a.length > 0)
				return obj.store.indexOf(a[0]);
		} else if (obj instanceof Ext.form.CheckboxGroup) {
			a = obj.getBoxes();
			b = obj instanceof Ext.form.RadioGroup;
			k = [];
			j = a.length;
			for (i = 0; i < j; i++) {
				if (b) {
					if (a[i].getValue())
						return i;
				} else
					k.push(a[i].getValue() ? 1 : 0);
			}
			if (!b)
				return k;
		}
		return -1;
	},
	setIndex : function(obj, i) {
		var b = obj.getBoxes(), j, k;
		if (obj instanceof Ext.form.RadioGroup)
			b[i].setValue(true);
		else {
			j = b.length;
			for (k = 0; k < j; k++)
				b[k].setValue(i != null && i[k]);
		}
	},
	startsWith : function(str, s) {
		if (Wb.isEmpty(s))
			return true;
		if (Wb.isEmpty(str))
			return false;
		return str.substring(0, s.length) === s;
	},
	delPrefix : function(o, prefix) {
		if (!prefix)
			return o;
		var s, n = {}, l = prefix.length;
		for (s in o) {
			if (Wb.startsWith(s, prefix))
				n[s.substring(l)] = o[s];
			else
				n[s] = o[s];
		}
		return n;
	},
	addPrefix : function(o, prefix) {
		if (!prefix)
			return o;
		var s, n = {};
		for (s in o)
			n[prefix + s] = o[s];
		return n;
	},
	insert : function(grid, controls, mode, prefix) {
		return Wb.insertValue(grid, Wb.getValue(controls, false, prefix), mode);
	},
	insertValue : function(grid, vals, mode) {
		var i, f, st = grid.store, fs = st.proxy.reader.getFields(), addVals = {}, idx, r, v;

		for (i in fs) {
			f = fs[i];
			v = vals[f.name];
			if (v === undefined)
				v = null;
			addVals[f.name] = v;
		}
		if (Ext.isNumber(mode)) {
			idx = mode;
			mode = true;
		} else
			idx = Wb.getIndex(grid);
		if (mode === true && idx == -1 || mode == null) {
			st.insert(0, addVals);
			idx = 0;
		} else if (mode === true)
			st.insert(idx, addVals);
		else {
			idx = st.getCount();
			st.insert(idx, addVals);
		}
		grid.getSelectionModel().select(idx);
		r = st.getAt(idx);
		if (st.getCount() > st.pageSize) {
			if (mode === false)
				st.removeAt(0);
			else
				st.removeAt(st.pageSize);
		}
		Wb.refresh(grid, 1);
		return r;
	},
	update : function(a, b, c) {
		return Wb.updateValue(a, Wb.getValue(b, false, c));
	},
	updateRecord : function(rec, vals) {
		var st = rec.store, fs = rec.fields, v;
		fs.each(function(t) {
			v = vals[t.name];
			if (v !== undefined)
				rec.set(t.name, v);
		});
		rec.commit();
	},
	updateValue : function(grid, vals) {
		var st = grid.store, fs = st.model.prototype.fields, r = Wb
				.getSelRec(grid)[0], v;
		fs.each(function(t) {
			v = vals[t.name];
			if (v !== undefined)
				r.set(t.name, v);
		});
		r.commit();
		return r;
	},
	toHtml : function(s, b) {
		if (Wb.isEmpty(s)) {
			if (b)
				return '&nbsp;';
			else
				return '';
		}
		var i, j = s.length, l = [];
		for (i = 0; i < j; i++) {
			c = s.charAt(i);
			switch (c) {
			case ' ':
				l.push("&nbsp;");
				break;
			case '"':
				l.push('&quot;');
				break;
			case '<':
				l.push('&lt;');
				break;
			case '>':
				l.push('&gt;');
				break;
			case '&':
				l.push('&amp;');
				break;
			case '\n':
				l.push('<br>');
				break;
			case '\r':
				break;
			case '\t':
				l.push("&nbsp;&nbsp;&nbsp;&nbsp;");
				break;
			default:
				l.push(c);
			}
		}
		return l.join('');
	},
	setMenu : function(el, menu) {
		if (!el.bindedPPMenu) {
			el.on('contextmenu', function(e) {
				menu.showAt(e.getXY());
				e.preventDefault();
			});
			el.bindedPPMenu = true;
		}
	},
	saveOrigin : function(g) {
		g.store.each(function(r) {
			r.__origin = Ext.apply( {}, r.data);
			r.__isNew = undefined;
		});
	},
	getRows : function(grid, isAll) {
		var s, l = [];

		if (Wb.touchMode) {
			if (isAll) {
				grid.getStore().each(function(r) {
					l.push(r.data);
				});
			} else {
				s = grid.getSelection();
				Ext.Array.each(s, function(r) {
					l.push(r.data);
				});
			}
		} else {
			if (isAll) {
				grid.store.each(function(r) {
					l.push(r.data);
				});
			} else {
				s = Wb.getSelRec(grid);
				Ext.Array.each(s, function(r) {
					l.push(r.data);
				});
			}
		}
		return l;
	},
	expFirst : function(x, sel) {
		if (!x.xwlFirstExp) {
			var n = x.getRootNode();
			if (!x.rootVisible)
				n = n.firstChild;
			if (n) {
				if (sel)
					x.view.select(n);
				n.expand();
				x.xwlFirstExp = true;
			}
		}
	},
	selFirst : function(x) {
		var n;
		if (x instanceof Ext.tree.Panel) {
			if (!x.xwlFirstSel) {
				n = x.getRootNode();
				if (!x.rootVisible)
					n = n.firstChild;
				if (n) {
					x.view.select(n);
					x.xwlFirstSel = true;
				}
			}
		} else if (x instanceof Ext.grid.Panel) {
			if (x.store && x.store.getCount() > 0)
				x.getSelectionModel().select(0);
		}
	},
	refresh : function(p1, p2, p3) {
		var a, b, c, n;
		if (p1 instanceof Ext.tree.Panel) {
			if (p1.xwlRefresh)
				return;
			p1.xwlRefresh = 1;
			if (!p2)
				p2 = 'text';
			b = Wb.getSelNode(p1, true);
			a = b.getPath(p2, '\n');
			p1.selModel.deselectAll();
			n = p1.getRootNode();
			p1.store.load( {
				callback : function(x, y, z) {
					if (p1.xwlRefresh)
						delete p1.xwlRefresh;
					if (z)
						p1.selectPath(a, p2, '\n',
								function(u, v) {
									if (!u) {
										if (p1.rootVisible)
											p1.getSelectionModel().select(n);
										else if (n.firstChild)
											p1.getSelectionModel().select(
													n.firstChild);
									}
									if (p3)
										p3(u, v);
								});
				}
			});
		} else if (p1 instanceof Ext.grid.Panel) {
			c = p1.store;
			if (c.getCount() == 0)
				Wb.loadPage(c, Math.max(c.currentPage - 1, 1));
			else {
				a = Wb.getPagingBar(p1);
				if (a) {
					b = 1;
					c.totalCount += p2;
					a.onLoad();
					c.each(function(r) {
						n = r.dirty;
						r.set('__rowNum', b++);
						if (!n)
							r.commit();
					});
				}
			}
		}
	},
	check : function(tree, checked, expand, isAll, cb) {
		var b, s, v, i = 0;
		if (checked)
			b = true;
		else
			b = false;
		s = Wb.getSelNode(tree);
		if (!s || isAll)
			s = tree.getRootNode();
		if (!s)
			return;
		function fx(c) {
			v = c.get('checked');
			if (v !== undefined && v !== null && v != b) {
				c.set('checked', b);
				c.commit();
				tree.fireEvent('checkchange', c, b);
			}
			c.eachChild(function(n) {
				fy(n);
			});
			i--;
			if (i == 0 && cb)
				cb();
		}

		function fy(c) {
			i++;
			if (expand) {
				c.expand(false, function() {
					fx(c);
				});
			} else
				fx(c);
		}
		fy(s);
	},
	commit : function(o) {
		o.each(function(r) {
			if (r.dirty)
				r.commit();
		});
	},
	setColor : function(str, hex, bold){
    return '<span style="color:' + hex + (bold ? ';font-weight:bolder;':'') + '">' + str + '</span>';
    },
  setClass : function(str, cls, format){
    return '<span class="'+cls+'">'+ (format!=undefined ? Wb.formatNum(str, format) : str) +'</span>';
  },
  currency : function(value, sign, decimal, color, bold){
    decimal = decimal || 2;
    if(!color){
      if(/[a-z#]/ig.test(decimal)){
        color = decimal;
        decimal = 2;
      }
    }
    var result = Ext.util.Format.currency(value, sign, decimal);
    if(color){
      if (color.indexOf("#")>=0){
        return Wb.setColor(result, color, bold);
      } else {
        return Wb.setClass(result, color);
      }
    } else {
      return result;
    }
  },
  dateRange : function(begin, end){
	  var b = begin.getValue(), e = end.getValue();
	  if(b)
	    end.setMinValue(b);
	  else
	    end.setMinValue(null);
	  if(e) 
	    begin.setMaxValue(e);
	  else
	    begin.setMaxValue(null);
	},
  clearDateRange : function(begin, end){
	  begin.setMaxValue(null);
	  end.setMinValue(null);
	},
  updateGrid : function(grid, vals, fname){
    var rows = Wb.getSelRec(grid);
    for(var i in rows){
  	for (var j in vals){
        if (rows[i].get(fname)==vals[j][fname]){
          Wb.updateRecord(rows[i], vals[j]);
  	  }
  	}
    }
  },
  dateDiff : function(interval, date1, date2){
    var long = date2.getTime() - date1.getTime();
    switch(interval.toLowerCase()){
      case "y": return parseInt(date2.getFullYear() - date1.getFullYear()); 
      case "m": return parseInt((date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()-date1.getMonth())); 
      case "d": return parseInt(long/1000/60/60/24); 
      case "w": return parseInt(long/1000/60/60/24/7); 
      case "h": return parseInt(long/1000/60/60); 
      case "n": return parseInt(long/1000/60); 
      case "s": return parseInt(long/1000); 
      case "l": return parseInt(long); 
    } 
  },
  dateAdd : function(interval, number, date){ 
    switch(interval.toLowerCase()){ 
      case "y": return new Date(date.setFullYear(date.getFullYear()+number)); 
      case "m": return new Date(date.setMonth(date.getMonth()+number)); 
      case "d": return new Date(date.setDate(date.getDate()+number)); 
      case "w": return new Date(date.setDate(date.getDate()+7*number)); 
      case "h": return new Date(date.setHours(date.getHours()+number)); 
      case "n": return new Date(date.setMinutes(date.getMinutes()+number)); 
      case "s": return new Date(date.setSeconds(date.getSeconds()+number)); 
      case "l": return new Date(date.setMilliseconds(date.getMilliseconds()+number)); 
    }
  },
  setReadOnly : function(cmps, bool, prefix){
    Wb.setAttribute(cmps, bool, prefix, 1);
  },
  setDisabled : function(cmps, bool, prefix){
    Wb.setAttribute(cmps, bool, prefix, 0);
  },
  setAttribute : function(cmps, bool, prefix, type){
    var pre;
    if (Ext.isArray(cmps)){
      if (bool===undefined)
        bool = true;
      Ext.each(cmps, function(){
        if (type==1)
          this.setReadOnly(bool);
        else
          this.setDisabled(boool);
      });
      return;
    } else if (Ext.isObject(cmps)){
      pre = "";
      if (typeof bool == "string"){
        pre = bool;
      }
      for(var i in cmps){
        if (type==1)
          Wb.get(pre+i).setReadOnly(cmps[i]);
        else
          Wb.get(pre+i).setDisabled(cmps[i]);
      }
    } else if (typeof cmps == 'string'){
      if (cmps.indexOf(',')>0){
      } else {
        pre = prefix || "";
        if (type==1)
          Wb.get(pre + cmps).setReadOnly(bool);
        else
          Wb.get(pre + cmps).setDisabled(bool);
      }
    }
  },
  loadModule : function(moduleId, fn){
    return Wb.request({
      url:'main?xwl='+moduleId,
      success:function(r){
        var starts = r.responseText.substring(0,1),
            ends = r.responseText.substring(r.responseText.length-1);
        if (starts == '{' && ends == '}'){
          layer.msg(Wb.decode(r.responseText).msg, {shift:6});
          if (typeof viewport != 'undefined')
            viewport.unmask();
          if (typeof viewport1 != 'undefined')
            viewport1.unmask();
          return;
        } else if ( starts != '<' && ends != '>' ){
          eval(r.responseText);
          if (typeof fn === 'function'){
            return fn();
          } else {
            return null;
          }
        } else {
          if (typeof viewport != 'undefined')
            viewport.unmask();
          if (typeof viewport1 != 'undefined')
            viewport1.unmask();
        }
      }
    });
  },
  autoResizeWindow : function(win, positionTarget){
    var pos = win.getPosition(),
        ow = win.getWidth(), oh = win.getHeight(),
        nw = 0, nh = 0,
        vw = positionTarget ? positionTarget.getWidth() : viewport.getWidth();
    nw = (vw-100)>900 ? 900 : vw-100;
    //if (nw<ow)
    win.setWidth(nw);
    var vh = positionTarget ? positionTarget.getHeight() : viewport.getHeight(),
        ww = win.getWidth();
    nh = (vh>(ww-60) ? ww-60 : vh)-60;
    if(nh<oh)
      win.setHeight(nh);
    var wh = win.getHeight(), wpy = (vh-wh)/2-10, wpx = (vw-ww)/2;
    win.setPosition(wpx > 0 ? wpx : 0, wpy>0 ? wpy : 0);
  },
  openModule : function(moduleName, moduleID, func, mask, positionTarget){
    var fn, maskTarget;
    fn = func;
    maskTarget = mask;
    if (typeof func!=='function'){
      maskTarget = func;
      if (typeof mask === 'function'){
        fn = mask;
      } else {
        fn = null;
      }
    }
    if (maskTarget) maskTarget.mask();
    var win = Wb.get(moduleName);
    if(!win){
      return Wb.loadModule(moduleID, function(){
        var win = Wb.get(moduleName);
        if (win) {
          win.show();
          Wb.autoResizeWindow(win, positionTarget);
          if(typeof fn === 'function') fn(win, true);
        }
      });
    } else if (win.isHidden()){
      win.show();
      if(typeof fn === 'function') fn(win, false);
    } else if (win.isVisible()){
      win.toFront(true);
      if(typeof fn === 'function') fn(win, false);
    }
  },
  max : Ext.Array.max,
  min : Ext.Array.min,
  apply: Ext.apply,
  applyIf: Ext.applyIf,
  console: function(){
    for(var i=0;i<arguments.length;i++){
      var o = arguments[i];
      if (Ext.isObject(o) || Ext.isArray(o))
        o = Ext.encode(o);
      Wb.println(o);
      if(console) console.info(o);
    }
  },
  errCode : ErrCode,
  err : function(code){
  	var s = isNaN(code) ? code : ErrCode[""+code];
    return layer.msg(s, {shift:6});
  }, 
  msg : function(s, opt){
  	return layer.msg(s, opt); 
  },
  insertStore: function(store, data){
    if (!Ext.isArray(data) && !Ext.isObject(data)){
      return 0;
    }
    var rows = Ext.isObject(data) ? [data] : data;
    for (var i = 0; i < rows.length; i++){
      var idx = store.getCount();
      store.insert(idx, {});
      for (var j in rows[i]){
        store.getAt(idx).set(j, rows[i][j]);
      }
    }
    return i;
  }
};
var Xq={toCNPrice:'', isEmpty:'',format:'',error:'',indexOf:'',decode:'',ellipsis:'',encode:'',toString:'',isObject:'',isArray:'',each:'',apply:'',applyIf:'',isDateFormat:'',strToDate:'',toNative:'',getNames:'',has:'',isJson:'',isSame:'',toPrice:'',match:'',test:'',getValue:'',verifyField:'',encodeRegexChar:'',md5:'',md516:'',signMd5:'',replaceVar:'',formatDate:'',htmlEncode:'',splitTrim:'',toSqlIn:'',read:'',cookies:{get:'',set:''},getConn:'',run:'',print:'',printJson:'',request:'',get:'',set:'',exec:'',rollback:'',commit:'',session:{get:'',set:''},getIp:'',hasRole:'',log:'', status_404:'', tpl:{download:'', save:'', print:'', printFile:''}, imageToBase64:'', getRealPath:'', erp:{getNewID:'', refreshEndNum:'', createOrd:'', getAPI:'', postSelfAPI:'', postAPI:''}}, Redis = {get:'',set:'',del:'',exists:'',expire:'',ttl:'',hset:'',hget:'',hexists:'',hdel:'',hlen:''};