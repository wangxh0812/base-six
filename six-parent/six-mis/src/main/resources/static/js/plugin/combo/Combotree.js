/**
 * kinjoYang 2014-03
 */
Ext.define("Plugin.combo.Combotree", {
	    extend : "Ext.form.field.Picker",
	    alias : 'widget.combotree',
	    requires : ["Ext.tree.Panel"],
	    _idValue : '',
	    _txtValue : '',
	    initComponent : function() {
		this.callParent();
		var self = this;
		var store = Ext.create('Ext.data.TreeStore', {
			proxy : {
				type : 'ajax',
				url : self.storeUrl,
				reader : {
					type : 'json',
					root : 'data',
					successProperty : 'success'
				}
			},
			nodeParam : 'id',
			root : {
				id : self.rootId,
				text : self.rootText,
				expanded : self.expanded || false
			}
		});
		self.picker = new Ext.tree.Panel({
			id : Ext.id(),
			height : self.treeHeight || 300,
			resizable : false,
			minWidth : 100,
			maxWidth : 400,
			minHeight : 200,
			maxHeight : 500,
			autoScroll : true,
			floating : true,
			focusOnToFront : false,
			shadow : true,
			ownerCt : this.ownerCt,
			useArrows : self.useArrows || true,
			store : store,
			rootVisible : false
		});
		self.picker.on({
			'itemclick' : function(view, rec) {
				if (rec&& ((self.selectMode == 'leaf' && rec.isLeaf() == true) || self.selectMode == 'all')) {
					//self.setRawValue(self._idValue=rec.get('id'));// 隐藏值
					self._idValue = rec.get('text');
					//self.valuefield = rec.get('id');
					self.setValue(self.displayField = self.valuefield = rec.get('text'));// 显示值
					self.up('panel').down("[name='" + self.keyName+ "']").setValue(rec.get('id'));
					self.collapse();
					self.fireEvent('select', self, rec);
				}
			}
		});
	},
	getValue : function() {//获取id值
		return this._idValue;
	},
	getTextValue : function() {//获取text值
		return this._txtValue;
	},
	reLoad : function(id, url) {
		var store = this.picker.getStore();
		var root = this.picker.getRootNode();
		store.proxy.url = url;
		root.set('id', id);
		store.load();
	},
	alignPicker : function() {
		var me = this, picker, isAbove, aboveSfx = '-above';
		if (this.isExpanded) {
			picker = me.getPicker();
			if (me.matchFieldWidth) {
				picker.setWidth(me.bodyEl.getWidth());
			}
			if (picker.isFloating()) {
				picker.alignTo(me.inputEl, "", me.pickerOffset);
				isAbove = picker.el.getY() < me.inputEl.getY();
				me.bodyEl[isAbove ? 'addCls' : 'removeCls']
						(me.openCls + aboveSfx);
				picker.el[isAbove ? 'addCls' : 'removeCls']
						(picker.baseCls + aboveSfx);
			}
		}
	}
});