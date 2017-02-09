Ext.define('Plugin.form.ShowImage', {
	extend : 'Ext.Img',
	alias : 'widget.ExtPluginShowImage',
	requires : [ 'Plugin.form.ImageGroupForm' ],
	onRender : function(ct, position) {
		var me = this;
		me.callParent(arguments);
		me.mon(me.el, 'click', me.onClick, me);
		me.mon(me.el, 'mouseover', me.onMouseover, me);
	},
	initComponent : function(a, b, c, d) {
		// this.ImageArray = this.ImageArray; this.photoName
		this.width = this.width || 100;
		this.height = this.height || 100;

		if (this.ImageArray) {
			this.src = this.ImageArray[0].picUrl;
			this.id = "form" + this.ImageArray[0].picUri;
		} else if (this.defaultImageUrl) {
			this.src = this.defaultImageUrl;
			this.id = Ext.id();
		} else {
			this.id = Ext.id();
		}
		this.callParent();
	},
	onMouseover : function(e) {
		//var me = this;
		Ext.getDom(this.id).style.cursor = "pointer";
	},
	onClick : function(e) {
		var imageArrayForm = Ext.create("Plugin.form.ImageGroupForm", {
			// title : 'IMAGE',
			// titleAlign : 'center',
			autoScroll : true,
			customParameter : {
				items : this.getImageGroupData()
			}
		});
		Ext.create("Ext.window.Window", {
			title : this.photoName,
			modal : true,
			autoScroll : true,
			autoShow : true,
			border : false,
			floating : true,
			width : 600,
			anchor : '100%',
			layout : 'form',
			items : [ imageArrayForm ]
		});
	},
	getImageGroupData : function() {
		var me = this;
		var resultImageArray = [];
		var pictureArray = me.ImageArray;
		for (var j = 0; j < pictureArray.length; j++) {
			resultImageArray.push({
				xtype : 'image',
				width : 100,
				height : 100,
				id : j + '_' + pictureArray[j].picUri,
				src : pictureArray[j].picUrl,
				listeners : {
					scope : this,
					el : {
						mouseover : function() {
							Ext.getDom(this.id).style.cursor = "pointer";
						},
						click : function(e, a) {
							var index = this.id.substring(0, 1);
							me.showBigImage(this.id, index);
						}
					}
				}
			});
		}
		return resultImageArray;
	},
	showBigImage : function(idValue, imageArrayIndex) {
		var _this = this;
		var panelId = Ext.id();
		var imageId = Ext.id();
		var degree = 0;
		var _src = Ext.getCmp(idValue).src;
		var bigImageArrayForm = Ext.create("Ext.form.Panel", {
			border : 0,
			layout : 'card',
			id : panelId,
			items : [ {
				xtype : 'image',
				id : imageId,
				src : _src
			} ]
		});

		Ext.create("Ext.window.Window", {
			title : '图片预览',
			modal : true,
			autoShow : true,
			border : false,
			floating : true,
			width : 600,
			height : 600,
			anchor : '100%',
			layout : 'fit',
			items : [ bigImageArrayForm ],
			buttons : [ {
				text : '查看原图',
				handler : function() {
					var imageField = Ext.getCmp(imageId);
					window.open(imageField.src); 
				}
			}, {
				text : '顺时针旋转90°',
				handler : function() {
					degree = degree + 1;
					_this.rotate(document.getElementById(panelId), 90 * degree);
				}

			}, {
				text : '逆时针旋转90°',
				handler : function() {
					degree = degree - 1;
					_this.rotate(document.getElementById(imageId), 90 * degree);
				}

			}, {
				text : '上一张',
				handler : function() {
					var imageLength = _this.ImageArray.length;
					if (imageLength == 0) {
						Ext.messagebox.msg('提示', '本相册只有一张图片');
						return;
					}
					if (imageArrayIndex == 0) {
						Ext.messagebox.msg('提示', '这已经是第一张');
						return;
					}
					imageArrayIndex--;
					var imageField = Ext.getCmp(imageId);
					imageField.setSrc(_this.ImageArray[imageArrayIndex].picUrl);
				}
			}, {
				text : '下一张',
				handler : function() {
					var imageLength = _this.ImageArray.length;
					if (imageLength == 0) {
						Ext.messagebox.msg('提示', '本相册只有一张图片');
						return;
					}
					if (imageArrayIndex == (imageLength - 1)) {
						Ext.messagebox.msg('提示', '这已经是最后一张');
						return;
					}
					imageArrayIndex++;
					var imageField = Ext.getCmp(imageId);
					imageField.setSrc(_this.ImageArray[imageArrayIndex].picUrl);
				}
			} ]
		});
	},
	rotate : function(target, degree) {
		var userAgent = navigator.userAgent, isIE = /msie/i.test(userAgent) && !window.opera, isWebKit = /webkit/i
				.test(userAgent), isFirefox = /firefox/i.test(userAgent);
		if (isWebKit) {
			target.style.webkitTransform = "rotate(" + degree + "deg)";
		} else if (isFirefox) {
			target.style.MozTransform = "rotate(" + degree + "deg)";
		} else if (isIE) {
			// chessDiv.style.filter =
			// "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + degree
			// + ")";
			degree = degree / 180 * Math.PI;
			var sinDeg = Math.sin(degree);
			var cosDeg = Math.cos(degree);

			target.style.filter = "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + cosDeg + ",M12=" + (-sinDeg)
					+ ",M21=" + sinDeg + ",M22=" + cosDeg + ",SizingMethod='auto expand')";
		} else {
			target.style.transform = "rotate(" + degree + "deg)";
		}
	}
});