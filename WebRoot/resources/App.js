Ext.Loader.setConfig({
    enabled: true,
    paths: {
    	"Rds.view": "resources/view",
        "Rds.upc": "resources/upc",
        "Rds.judicial": "resources/judicial",
        "Rds.mail" : "resources/mail",
        "Rds.ux": "resources/ux",
        "Rds.statistic":"resources/statistic",
        "Rds.order":"resources/order",
        "Rds.finance": "resources/finance"
    }
});
Ext.require(['Rds.view.ViewPart']);
Ext.onReady(function() {
	Ext.tip.QuickTipManager.init();
    var proto = Ext.picker.Date.prototype, date = Ext.Date;
    proto.monthNames = date.monthNames;
    proto.dayNames = date.dayNames;
    proto.format = date.defaultFormat;

	Ext.create('Rds.view.ViewPart');
});
