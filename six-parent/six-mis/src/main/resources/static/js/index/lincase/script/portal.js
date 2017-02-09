var Pt = {
	load : function(a, b) {
		if (a && a.saveUrl && (b || !a.moduleLoaded)) {
			var d = a.iframeId, c = Wb.dom(d);
			if (a.isMasked) {
				Wb.unmask(a);
				a.isMasked = false
			}
			Wb.mask(a, Str.loading);
			a.isMasked = true;
			if (!a.monMaskEvent) {
				a.monMaskEvent = true;
				c.onload = c.onreadystatechange = function() {
					if (this.readyState && this.readyState != "complete") {
						return
					} else {
						if (a.isMasked) {
							setTimeout(function() {
								Wb.unmask(a);
								a.isMasked = false
							}, 50)
						}
					}
				}
			}
			Wb.submit(a.saveUrl, a.params, d, a.openType);
			a.moduleLoaded = true
		}
	},
	moduleTabChange : function(b, a) {
		Pt.load(a)
	},
	run : function(b) {
		if (!b.get("IS_FOLDER")) {
			Pt.savePath();
			var a = "main?xwl=" + b.get("MODULE_ID");
			if (b.get("NEW_WIN")) {
				window.open(a)
			} else {
				WBXwlOpen(a, b.get("text"), b.get("iconCls"))
			}
		}
	},
	savePath : function() {
		if (Pt.pathSaving || Pt.indexPath === "-") {
			return
		}
		var b = Wb.getSelNode(moduleTree), a;
		if (b) {
			a = b.getPath("MODULE_ID", "\n");
			if (a === Pt.savedPath) {
				return
			}
			Pt.savedPath = a;
			Pt.pathSaving = 1;
			Ext.Ajax.request({
				url : "main?xwl=13NOEQY1P3LO",
				params : {
					path : a
				},
				callback : function() {
					delete Pt.pathSaving
				}
			})
		}
	},
	open : function(d, c, l, o, e, i, m, k, n, g) {
		if (e == null && m === undefined) {
			var j = false;
			d.items.each(function(b) {
				if (b.saveUrl === c) {
					d.setActiveTab(b);
					j = true;
					return false
				}
			});
			if (j) {
				return false
			}
		}
		var a = "xi_" + Wb.getId(), f, p;
		f = {
			iconCls : o,
			saveUrl : c,
			iframeId : a,
			layout : "fit",
			params : e,
			hideMode : "offsets",
			openType : i,
			title : Wb.ellipsis(l),
			orgTitle : l,
			listeners : {
				render : function(b) {
					if (b.title !== b.orgTitle) {
						b.ellipsisTip = new Ext.tip.ToolTip({
							target : b.tab.btnWrap,
							html : l
						})
					}
				},
				beforeclose : function(h) {
					try {
						var s, q, b = Wb.dom(h.iframeId).contentWindow;
						if (!b.wb_forceCls) {
							s = b.wb_beforeunload;
							q = s ? s() : null;
							if (q !== null && q !== undefined) {
								Wb.confirm(q + "<br>" + Str.closeConfirm,
										function() {
											b.wb_forceCls = true;
											h.close()
										});
								return false
							}
						}
					} catch (u) {
					}
				},
				beforedestroy : function(b) {
					try {
						var s = b.iframeId, h = Wb.dom(s), r = h.contentWindow.document
								|| h.contentDocument
								|| window.frames[s].document;
						h.src = "";
						r.write("");
						r.close();
						Ext.fly(h).destroy();
						Wb.closeNav(backBtn, forwardBtn, b)
					} catch (q) {
					}
				}
			},
			closable : true,
			html : '<iframe id="'
					+ a
					+ '" name="'
					+ a
					+ '" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>'
		};
		return d.add(f)
	},
	logout : function() {
		var d, a = false;
		moduleTab.items.each(function(b) {
			d = Wb.dom(b.iframeId).contentWindow.wb_beforeunload;
			if (d) {
				d = d();
				if (!a && d !== null && d !== undefined) {
					moduleTab.setActiveTab(b);
					a = true
				}
			}
		});
		function c() {
			Wb.request({
				url : "main?xwl=logout",
				success : function() {
					Pt.canLogout = true;
					window.location = "main"
				}
			})
		}
		if (a) {
			Wb.confirm(Str.closeConfirm, c)
		} else {
			c()
		}
	},
	close : function(b) {
		var c, a = moduleTab;
		c = a.getActiveTab();
		a.items.each(function(d) {
			if (b || c != d) {
				d.close()
			}
		})
	},
	monDbClick : function() {
		var a = moduleTab.getActiveTab();
		if (a.saveUrl && !a.params) {
			window.open(a.saveUrl)
		}
	},
	getDesktop : function() {
		var c, a = moduleTab.items.length, b, d;
		d = [ {
			width : moduleTree.getWidth(),
			index : moduleTab.items.indexOf(moduleTab.getActiveTab())
		} ];
		a = moduleTab.items.length;
		for (c = 0; c < a; c++) {
			b = moduleTab.items.items[c];
			if (b.saveUrl) {
				d.push({
					url : b.saveUrl,
					title : b.title,
					icon : b.iconCls
				})
			}
		}
		return Ext.encode(d)
	},
	openTab : function(a, e, b, d, c) {
		moduleTab=Ext.getCmp("moduleTab");
		moduleTab.setActiveTab(Pt.open(moduleTab, a, e, b, d, c))
	},
	initialize : function() {
		Wd.WBXwlOpen = function(a, e, b, d, c) {
			moduleTab.setActiveTab(Pt.open(moduleTab, a, e, b, d, c))
		}
	},
	finalize : function() {
		if (desktopData != null) {
			var e = desktopData, b, a, c;
			moduleTree.setWidth(e[0].width);
			a = e.length;
			for (b = 1; b < a; b++) {
				c = e[b];
				Pt.open(moduleTab, c.url, c.title, c.icon)
			}
			moduleTab.setActiveTab(e[0].index)
		}
	},
	refresh : function() {
		Pt.load(moduleTab.getActiveTab(), true)
	}
};