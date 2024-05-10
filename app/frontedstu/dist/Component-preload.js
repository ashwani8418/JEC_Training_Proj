//@ui5-bundle com/ingex/frontedstu/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/ingex/frontedstu/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/ingex/frontedstu/model/models"],function(e,t,i){"use strict";return e.extend("com.ingex.frontedstu.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/ingex/frontedstu/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.ingex.frontedstu.controller.App",{onInit:function(){}})});
},
	"com/ingex/frontedstu/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/Dialog","sap/m/BusyDialog","sap/m/Button"],function(e,t,o,n){"use strict";return e.extend("com.ingex.frontedstu.controller.View1",{onInit:function(){},onPressAdd:function(){let e=this;let n=new sap.ui.layout.form.SimpleForm({content:[new sap.m.Label({text:"First Name"}),new sap.m.Input("inputFirstName"),new sap.m.Label({text:"Last Name"}),new sap.m.Input("inputLastName"),new sap.m.Label({text:"Address"}),new sap.m.Input("inputAddress"),new sap.m.Label({text:"Department"}),new sap.m.Input("inputDepartment")]});let s=new t({width:"auto",title:"Add Student",content:n,beginButton:new o({text:"Save",press:async function(){let t=sap.ui.getCore().byId("inputFirstName").getValue();let o=sap.ui.getCore().byId("inputLastName").getValue();let n=sap.ui.getCore().byId("inputAddress").getValue();let a=sap.ui.getCore().byId("inputDepartment").getValue();console.log("First Name:",t);console.log("Last Name:",o);console.log("Address:",n);console.log("Department:",a);let i={firstName:t,lastName:o,address:n,department:a};let r=await e.createEntries(i);s.close();s.destroy()}}),endButton:new o({text:"Cancel",press:function(){s.close();s.destroy()}})});s.open()},createEntries:async function(e){let t=this.getView().getModel();console.log("Creating Entering.... ",e);console.log("Creating oModel.... ",t);let o=t.bindList("/StudentInfo");let n=await o.create(e);t.refresh();return n},onPressAdd1:function(e){if(!this.oDialog){this.loadFragment({name:"com.ingex.frontedstu.fragments.addRecord"}).then(function(e){this.oDialog=e;this.oDialog.open()}.bind(this))}else{this.oDialog.open()}},onUpdateRecordPress:function(e){let t=e.getSource().getBindingContext().getObject();console.log("oContext ",t);const o={createdAt:t.createdAt,createdBy:t.createdBy,modifiedAt:t.modifiedAt,modifiedBy:t.modifiedAtBy,ID:t.ID,firstName:t.firstName,lastName:t.lastName,address:t.address,department:t.department};this.getView().setModel(new sap.ui.model.json.JSONModel(o),"updateModel");console.log("MOdelData ",this.getView().getModel("updateModel").getData());if(!this.oDialog){this.loadFragment({name:"com.ingex.frontedstu.fragments.addRecord"}).then(function(e){this.oDialog=e;e.bindElement("/updateModel");this.oDialog.open()}.bind(this))}else{this.oDialog.open()}},onCancel:function(){this.oDialog.close()},onUpdateSave:async function(){try{let e=this.getView().getModel("updateModel").getProperty("/ID");let t=this.getView().getModel("updateModel").getProperty("/firstName");let o=this.getView().getModel("updateModel").getProperty("/lastName");let s=this.getView().getModel("updateModel").getProperty("/address");let a=this.getView().getModel("updateModel").getProperty("/department");let i=new n({title:"Updating Record",text:"Please wait..."});let r=this.getOwnerComponent().getModel();let l=new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,e);let d=r.bindList("/StudentInfo",null,null,[l]);let c=await d.requestContexts().then(function(e){console.log(e);e[0].setProperty("firstName",t);e[0].setProperty("lastName",o);e[0].setProperty("address",s);e[0].setProperty("department",a)});i.close();r.refresh();this.onCancel()}catch(e){console.error("Error updating record: ",e)}},onDeleteRecordPress:async function(e){try{let t=e.getSource().getBindingContext();let o=t.getProperty("ID");sap.m.MessageBox.confirm("Are you sure you want to delete this record?",{title:"Confirm Deletion",onClose:async function(e){if(e===sap.m.MessageBox.Action.OK){await this.deleteRecord(o)}}.bind(this)})}catch(e){console.error("Error deleting record: ",e)}},deleteRecord:async function(e){try{let t=this.getView().getModel();let o=new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,e);let n=t.bindList("/StudentInfo",null,null,[o]);let s=await n.requestContexts();console.log("aContexts valuse",s);if(s.length>0){await s[0].delete();t.refresh();sap.m.MessageToast.show("Record deleted successfully")}else{throw new Error("Entity with ID "+ID+" not found.")}}catch(e){console.error("Error deleting record: ",e)}}})});
},
	"com/ingex/frontedstu/fragments/addRecord.fragment.xml":'<core:FragmentDefinition xmlns:form="sap.ui.layout.form" xmlns="sap.m" xmlns:core="sap.ui.core"><Dialog title="Update Student Record"><content><form:SimpleForm ><form:content><Label text="ID" /><Input id="StdID" value="{updateModel>/ID}" editable="false" /><Label text="First Name" /><Input id="inputFirstName" value="{updateModel>/firstName}"/><Label text="Last Name" /><Input id="inputLastName" value="{updateModel>/lastName}"/><Label text="Address" /><Input id="inputAddress" value="{updateModel>/address}" /><Label text="Department" /><Input id="inputDepartment" value="{updateModel>/department}" /></form:content></form:SimpleForm></content><beginButton><Button text="Save" press="onUpdateSave"  type="Success"/></beginButton><endButton><Button text="Cancel" press="onCancel" /></endButton></Dialog></core:FragmentDefinition>\n',
	"com/ingex/frontedstu/i18n/i18n.properties":'# This is the resource bundle for com.ingex.frontedstu\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Student Records\n\n#XFLD,45\nflpTitle=Student Records\n',
	"com/ingex/frontedstu/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.ingex.frontedstu","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.3","toolsId":"0d934820-c15e-43d5-be54-c68684be4ac6"},"dataSources":{"mainService":{"uri":"odata/v4/studentsrv/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"Objects-Display":{"semanticObject":"Objects","action":"Display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.123.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.ingex.frontedstu.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.ingex.frontedstu.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"com.ingex.frontedstu.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"studentrecordsrv"}}',
	"com/ingex/frontedstu/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/ingex/frontedstu/view/App.view.xml":'<mvc:View controllerName="com.ingex.frontedstu.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/ingex/frontedstu/view/View1.view.xml":'<mvc:View controllerName="com.ingex.frontedstu.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"><HBox ><Button text="Add Record" press="onPressAdd"></Button></HBox><FlexBox class="TableContainer"><Table id="StudentTable" items="{/StudentInfo}"><columns ><Column ><Label text="ID"></Label></Column><Column ><Label text="FirstName"></Label></Column><Column ><Label text="LastName"></Label></Column><Column ><Label text="Address"></Label></Column><Column ><Label text="Department"></Label></Column><Column><Label text=""></Label></Column></columns><ColumnListItem ><cells><Text text="{ID}" ></Text></cells><cells><Input value="{firstName}" editable="false"></Input></cells><cells><Input value="{lastName}" editable="false"></Input></cells><cells><Input value="{address}" editable="false"></Input></cells><cells><Input value="{department}" editable="false"></Input></cells><cells><HBox justifyContent="Center" alignItems="Stretch"><Button icon="sap-icon://edit" press="onUpdateRecordPress" class="sapUiSmallMarginLeft"></Button><Button icon="sap-icon://delete" press="onDeleteRecordPress"></Button></HBox></cells></ColumnListItem></Table></FlexBox></Page></mvc:View>\n'
}});
